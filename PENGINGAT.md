# 📌 Pengingat: Repo Agensi

> Catatan singkat buat diri sendiri: repo ini apa, cara pakainya, dan cara menambah skill.

## Ini repo apa?

**Gudang skill** buat Claude. Claude tidak "ingat" antar sesi. Pengetahuannya disimpan di sini sebagai file skill (`SKILL.md`), lalu dipakai di proyek mana pun dengan cara memasang repo ini sebagai **plugin marketplace**.

Isinya ada 14 plugin dan 61 skill UI/UX: gaya pribadi ditambah hasil kurasi dari 15 repo.

| Plugin | Asal | Isi |
|---|---|---|
| `house-style` ⭐ | **milik sendiri** | `landing-page-design` + `figma-designer` + `skill-router`. Prioritas utama |
| `antislop` | miqdadbadjuber/anti-slop | 6 skill filter AI-slop (UI, copy, mobile, a11y, komentar kode) + MCP cek kontras |
| `ui-ux-pro-max` | nextlevelbuilder/ui-ux-pro-max-skill | Database gaya, palet, font, UX per stack |
| `taste-skill` | Leonxlnx/taste-skill | Website perusahaan kelas atas |
| `impeccable` | pbakaus/impeccable | Polish, audit, critique UI |
| `emil-design` | emilkowalski/skills | 17 skill animasi & design engineering |
| `hallmark` | Nutlope/hallmark | Desain yang tidak terlihat buatan AI |
| `gsap` | greensock/gsap-skills | 8 skill resmi GSAP |
| `magic-ui` | magicuidesign/magicui | Komponen animasi Magic UI |
| `scroll-world` | oso95/scroll-world | Landing sinematik berbasis scroll |
| `dimensional-drawing` | enesozturk/dimensional-drawing | Ilustrasi dimensional + motion |
| `open-design-picks` | nexu-io/open-design | 11 skill UI/web pilihan (dari 171) |
| `design-md` | google-labs-code/design.md + VoltAgent/awesome-design-md | Format DESIGN.md + 84 contoh brand |
| `ui-libraries` | DavidHDev/react-bits + DavidHDev/canvas-ui | Cara pasang komponen (kode tidak disalin) |

Panduan "kapan pakai skill mana" ada di skill **[`house-style:skill-router`](plugins/house-style/skills/skill-router/SKILL.md)**, dimuat hanya saat dibutuhkan supaya hemat token.

## 🚀 Cara pakai di proyek baru

**Opsi A: sekali pasang, berlaku di proyek itu (direkomendasikan).**
Di repo proyek baru, buat/isi `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "agensi": { "source": { "source": "github", "repo": "2013tib-droid/agensi" } }
  },
  "enabledPlugins": {
    "house-style@agensi": true,
    "ui-ux-pro-max@agensi": true,
    "taste-skill@agensi": true,
    "impeccable@agensi": true,
    "emil-design@agensi": true,
    "design-md@agensi": true
  }
}
```

Nyalakan hanya plugin yang dibutuhkan proyek itu. Daftar lengkap ada di tabel di atas.

**Opsi B: manual lewat terminal Claude Code.**

```
/plugin marketplace add 2013tib-droid/agensi
/plugin install taste-skill@agensi
```

**Opsi C: di Claude Code web/cloud.** Bilang ke Claude: *"tambahkan repo 2013tib-droid/agensi ke sesi ini dan pakai skill-nya"*.

Catatan:
- Kalau repo `agensi` private, akun GitHub yang dipakai harus punya akses ke repo ini.
- Di dalam repo `agensi` sendiri, semua plugin sudah otomatis aktif lewat `.claude/settings.json`.

## ➕ Cara menambah skill baru

1. Kasih link repo skill-nya ke Claude, lalu bilang: *"tambahkan ke agensi"*.
2. Atau manual:
   - Tambahkan baris repo + `copy`/`license` di `scripts/sync-skills.sh`.
   - Buat `plugins/<nama>/.claude-plugin/plugin.json`.
   - Daftarkan di `.claude-plugin/marketplace.json` dan `.claude/settings.json`.
   - Jalankan `claude plugin validate .`.
3. Update tabel di file ini dan di `plugins/house-style/skills/skill-router/SKILL.md`.

## 🔄 Cara update skill ke versi terbaru

```bash
bash scripts/sync-skills.sh
git add -A && git commit -m "Sync skills dari upstream"
git push
```

Proyek lain akan ikut dapat versi baru saat marketplace di-refresh (`/plugin marketplace update agensi`).

## ⚠️ Hal yang perlu diingat

- **Skill pribadi** (`plugins/house-style/`) tidak disentuh `sync-skills.sh`, jadi aman diedit langsung. Dulu letaknya di `.claude/skills/`, sekarang dipindah ke sini supaya bisa dibawa ke proyek lain.
- **Lisensi:** setiap plugin menyimpan `LICENSE` dan `SOURCE.md` (asal + commit). React Bits dan Canvas UI berlisensi *MIT + Commons Clause*, jadi kodenya tidak disalin dan hanya dipasang lewat `npx shadcn add`. Komponennya tidak boleh dijual ulang sebagai produk.
- **Repo `nexu-io/open-design`** berisi 171 skill. Yang diambil hanya 11 yang relevan untuk UI/web dan isinya lengkap (bukan sekadar penunjuk ke repo lain). Kalau butuh yang lain, tambahkan ke `OD_PICKS` di `scripts/sync-skills.sh`.
- **Skill duplikat dari open-design tidak diambil** (taste, gsap, emil, ui-ux-pro-max). Yang dipakai versi aslinya.
- **Beberapa skill butuh layanan luar:** `scroll-world` butuh Higgsfield, dan `hallmark` sebagian fiturnya pakai Together AI. Cek `SKILL.md`-nya sebelum dipakai.
- **Ukuran repo** sekitar 65 MB, sebagian besar contoh foto di `taste-skill`.

## 📜 Riwayat

| Tanggal | Kejadian |
|---|---|
| 6 Nov 2026 | Skill pribadi `landing-page-design` dan `figma-designer` sudah ada di `.claude/skills/`. |
| 6 Nov 2026 | Repo dijadikan plugin marketplace: 13 plugin dan 55 skill. Skill pribadi dipindah ke `plugins/house-style/`. |
| 6 Nov 2026 | [PR #1](https://github.com/2013tib-droid/Agensi/pull/1) **di-merge ke `main`**. Marketplace siap dipakai di proyek lain lewat `/plugin marketplace add 2013tib-droid/agensi`. |
| 6 Nov 2026 | Tambah plugin `antislop` dari miqdadbadjuber/anti-slop: 14 plugin dan 61 skill. |
| 6 Nov 2026 | Hemat token: tabel skill dan alur kerja dipindah dari `CLAUDE.md` ke skill baru `house-style:skill-router` (dimuat saat perlu), plus "mode hemat". 14 plugin dan 62 skill. |

*Dibuat: 6 November 2026*
