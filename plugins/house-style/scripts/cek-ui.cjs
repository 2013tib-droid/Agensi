#!/usr/bin/env node
// Cek UI otomatis dengan Playwright: buka halaman proyek di lebar HP dan desktop,
// cari masalah yang bisa diukur, simpan screenshot, laporkan dalam teks singkat.
//
// Aktif hanya kalau proyek punya .claude/cek-ui.json, contoh:
//   { "url": "http://localhost:3000", "halaman": ["/", "/ujian"], "lebar": [375, 1440] }
//
// Pakai:
//   node cek-ui.cjs --hook    (dari Stop hook: diam kalau tidak ada masalah)
//   node cek-ui.cjs           (manual: selalu cetak laporan)
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const { createRequire } = require('module');

const MODE_HOOK = process.argv.includes('--hook');
const UI_EXT = /\.(tsx|jsx|ts|js|mjs|vue|svelte|astro|html|css|scss|sass|less|mdx)$/i;
const BATAS_TEMUAN = 5;

function keluar(pesan) {
  if (pesan && !MODE_HOOK) console.log(pesan);
  process.exit(0);
}

function bacaStdin() {
  if (!MODE_HOOK || process.stdin.isTTY) return {};
  try { return JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch { return {}; }
}

function git(args, cwd) {
  try { return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); }
  catch { return null; }
}

// Sidik jari perubahan file UI. null = bukan repo git (selalu cek).
function sidikPerubahanUI(cwd) {
  const status = git(['status', '--porcelain', '--untracked-files=all'], cwd);
  if (status === null) return null;
  const file = status.split('\n').map((l) => l.slice(3).trim()).filter((f) => f && UI_EXT.test(f)).sort();
  if (!file.length) return '';
  const h = crypto.createHash('sha1');
  for (const f of file) {
    h.update(f);
    try { h.update(String(fs.statSync(path.join(cwd, f)).mtimeMs)); } catch { h.update('hapus'); }
  }
  return h.digest('hex');
}

function muatPlaywright(cwd) {
  for (const base of [path.join(cwd, 'package.json'), __filename]) {
    const req = createRequire(base);
    for (const nama of ['playwright', '@playwright/test', 'playwright-core']) {
      try { return req(nama); } catch {}
    }
  }
  return null;
}

async function serverHidup(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    return res.status < 500;
  } catch { return false; }
}

async function cekHalaman(browser, url, lebar, fileShot) {
  const mobile = lebar < 768;
  const context = await browser.newContext({
    viewport: { width: lebar, height: mobile ? 812 : 900 },
    isMobile: mobile,
    hasTouch: mobile,
  });
  const page = await context.newPage();
  const asal = new URL(url).origin;
  const temuan = [];
  const konsol = [];
  const gagal = [];

  page.on('console', (m) => {
    // 'Failed to load resource' sudah tercatat di daftar request gagal.
    if (m.type() === 'error' && !m.text().startsWith('Failed to load resource')) konsol.push(m.text().slice(0, 160));
  });
  page.on('pageerror', (e) => konsol.push(String(e.message || e).slice(0, 160)));
  page.on('response', (r) => {
    if (r.status() >= 400 && r.url().startsWith(asal)) gagal.push(`${r.status()} ${r.url().slice(asal.length) || '/'}`);
  });

  try {
    const res = await page.goto(url, { waitUntil: 'load', timeout: 20000 });
    if (res && res.status() >= 400) temuan.push(`halaman membalas HTTP ${res.status()}`);
    await page.waitForTimeout(600);

    const hasil = await page.evaluate(({ mobile, batas }) => {
      const out = { overflow: null, pelaku: [], gambar: [], kecil: [] };
      const lebarLayar = document.documentElement.clientWidth;
      const scroll = document.scrollingElement || document.documentElement;
      const nama = (el) => {
        let s = el.tagName.toLowerCase();
        if (el.id) s += '#' + el.id;
        else if (el.classList.length) s += '.' + [...el.classList].slice(0, 2).join('.');
        const teks = (el.innerText || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 30);
        return teks ? `${s} "${teks}"` : s;
      };
      const terlihat = (el) => {
        const st = getComputedStyle(el);
        return st.display !== 'none' && st.visibility !== 'hidden' && el.getClientRects().length > 0;
      };

      if (scroll.scrollWidth > lebarLayar + 1) {
        out.overflow = scroll.scrollWidth - lebarLayar;
        for (const el of document.body.querySelectorAll('*')) {
          if (!terlihat(el)) continue;
          const r = el.getBoundingClientRect();
          if (r.right > lebarLayar + 1 && r.width > 0) {
            // Ambil elemen terluar saja: lewati kalau induknya juga melewati batas.
            const p = el.parentElement;
            if (p && p !== document.body && p.getBoundingClientRect().right > lebarLayar + 1) continue;
            out.pelaku.push(`${nama(el)} (+${Math.round(r.right - lebarLayar)}px)`);
            if (out.pelaku.length >= batas) break;
          }
        }
      }

      for (const img of document.images) {
        if (img.complete && img.naturalWidth === 0 && terlihat(img)) {
          out.gambar.push(img.getAttribute('src') || nama(img));
          if (out.gambar.length >= batas) break;
        }
      }

      if (mobile) {
        const sel = 'a[href], button, input:not([type=hidden]), select, textarea, [role=button], [role=tab], [role=checkbox], [role=radio]';
        for (const el of document.querySelectorAll(sel)) {
          if (!terlihat(el) || el.closest('p, li > p')) continue; // tautan di dalam paragraf dikecualikan WCAG
          const r = el.getBoundingClientRect();
          if (r.width > 0 && (r.width < 24 || r.height < 24)) {
            out.kecil.push(`${nama(el)} ${Math.round(r.width)}x${Math.round(r.height)}`);
            if (out.kecil.length >= batas) break;
          }
        }
      }
      return out;
    }, { mobile, batas: BATAS_TEMUAN });

    if (hasil.overflow) {
      temuan.push(`scroll horizontal ${hasil.overflow}px` + (hasil.pelaku.length ? `, penyebab: ${hasil.pelaku.join('; ')}` : ''));
    }
    if (hasil.gambar.length) temuan.push(`gambar gagal dimuat: ${hasil.gambar.join(', ')}`);
    if (hasil.kecil.length) temuan.push(`target sentuh < 24px: ${hasil.kecil.join('; ')}`);

    fs.mkdirSync(path.dirname(fileShot), { recursive: true });
    await page.screenshot({ path: fileShot, fullPage: true });
  } catch (e) {
    temuan.push(`gagal membuka halaman: ${String(e.message || e).split('\n')[0].slice(0, 160)}`);
  }

  if (konsol.length) temuan.push(`error konsol (${konsol.length}): ${[...new Set(konsol)].slice(0, 3).join(' | ')}`);
  if (gagal.length) temuan.push(`request gagal: ${[...new Set(gagal)].slice(0, BATAS_TEMUAN).join(', ')}`);

  await context.close();
  return temuan;
}

(async () => {
  const input = bacaStdin();
  const cwd = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const fileConfig = path.join(cwd, '.claude', 'cek-ui.json');

  // Jangan memblokir dua kali berturut-turut: cegah loop Stop hook.
  if (MODE_HOOK && input.stop_hook_active) keluar();

  if (!fs.existsSync(fileConfig)) {
    keluar('Belum ada .claude/cek-ui.json. Contoh isi: {"url": "http://localhost:3000", "halaman": ["/"], "lebar": [375, 1440]}');
  }
  let config;
  try { config = JSON.parse(fs.readFileSync(fileConfig, 'utf8')); }
  catch (e) { keluar(`.claude/cek-ui.json tidak valid: ${e.message}`); }

  const dasar = String(config.url || 'http://localhost:3000').replace(/\/$/, '');
  const halaman = Array.isArray(config.halaman) && config.halaman.length ? config.halaman : ['/'];
  const lebar = Array.isArray(config.lebar) && config.lebar.length ? config.lebar : [375, 1440];
  const folderHasil = path.join(cwd, '.claude', 'cek-ui');
  const fileState = path.join(folderHasil, '.state');

  // Hook hanya jalan kalau ada file UI yang berubah sejak cek terakhir.
  const sidik = sidikPerubahanUI(cwd);
  if (MODE_HOOK && sidik !== null) {
    if (sidik === '') keluar();
    try { if (fs.readFileSync(fileState, 'utf8') === sidik) keluar(); } catch {}
  }

  if (!(await serverHidup(dasar))) {
    keluar(`Server ${dasar} tidak bisa dihubungi. Jalankan dev server dulu, lalu ulangi.`);
  }

  const pw = muatPlaywright(cwd);
  if (!pw) keluar('Playwright tidak ditemukan. Pasang dengan: npm i -D playwright && npx playwright install chromium');

  let browser;
  try {
    browser = await pw.chromium.launch();
  } catch (e) {
    keluar(`Chromium gagal dijalankan: ${String(e.message || e).split('\n')[0]}`);
  }

  const laporan = [];
  const shots = [];
  let adaMasalah = false;
  for (const p of halaman) {
    for (const w of lebar) {
      const slug = (p.replace(/^\/|\/$/g, '').replace(/[^\w-]+/g, '-') || 'beranda') + `-${w}`;
      const fileShot = path.join(folderHasil, `${slug}.png`);
      const temuan = await cekHalaman(browser, dasar + (p.startsWith('/') ? p : '/' + p), w, fileShot);
      shots.push(path.relative(cwd, fileShot));
      if (temuan.length) {
        adaMasalah = true;
        laporan.push(`${p} @${w}px`);
        for (const t of temuan) laporan.push(`  - ${t}`);
      }
    }
  }
  await browser.close();

  fs.mkdirSync(folderHasil, { recursive: true });
  try { fs.writeFileSync(path.join(folderHasil, '.gitignore'), '*\n'); } catch {}
  if (sidik) fs.writeFileSync(fileState, sidik);

  const kaki = `Screenshot: ${shots.join(', ')} (buka hanya kalau perlu melihat tampilan).`;
  if (MODE_HOOK) {
    if (!adaMasalah) process.exit(0);
    const reason = `cek-ui menemukan masalah di ${dasar}:\n${laporan.join('\n')}\n` +
      `Perbaiki yang memang bug. Kalau sebuah temuan disengaja, sebutkan alasannya singkat lalu selesai.\n${kaki}`;
    process.stdout.write(JSON.stringify({ decision: 'block', reason }));
    process.exit(0);
  }
  console.log(adaMasalah ? `Masalah di ${dasar}:\n${laporan.join('\n')}` : `Tidak ada masalah di ${dasar} (${halaman.length} halaman x ${lebar.length} lebar).`);
  console.log(kaki);
})().catch((e) => {
  // Hook tidak boleh membuat sesi macet karena bug di script ini.
  if (!MODE_HOOK) console.error(e);
  process.exit(0);
});
