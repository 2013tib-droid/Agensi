---
name: cek-ui
description: Cek tampilan proyek dengan Playwright di lebar HP dan desktop, atau pasang cek otomatisnya. Hanya jalan kalau dipanggil manual.
disable-model-invocation: true
argument-hint: "[pasang] [halaman...]"
---

# /cek-ui

Argumen: $ARGUMENTS

Script: `${CLAUDE_PLUGIN_ROOT}/scripts/cek-ui.cjs`. Script ini membuka setiap halaman di setiap lebar layar, lalu melaporkan dalam teks: scroll horizontal beserta elemen penyebabnya, gambar rusak, target sentuh < 24px di HP, error konsol, dan request yang gagal. Screenshot disimpan di `.claude/cek-ui/`.

## Kalau `.claude/cek-ui.json` belum ada, atau argumen diawali `pasang`

1. Tentukan URL dev server dari `package.json` (Next.js 3000, Vite 5173, Astro 4321) atau dari `CLAUDE.md` proyek.
2. Tentukan halaman utama dari folder route (`app/`, `pages/`, `src/routes/`), maksimal 5 halaman. Halaman yang disebut di argumen didahulukan.
3. Tulis `.claude/cek-ui.json`:
   ```json
   { "url": "http://localhost:3000", "halaman": ["/"], "lebar": [375, 1440] }
   ```
4. Tambahkan satu baris di "Keputusan" `CLAUDE.md` proyek: cek UI otomatis aktif, laporannya muncul saat Claude selesai kalau file UI berubah dan dev server sedang jalan.

Setelah file ini ada, Stop hook plugin `house-style` berjalan otomatis setiap Claude selesai bekerja. Hook hanya jalan kalau ada file UI yang berubah dan dev server hidup. Kalau tidak ada masalah, hook diam.

## Menjalankan cek

1. Pastikan dev server hidup. Kalau mati, jalankan di background dengan perintah dev proyek, lalu tunggu sampai URL membalas.
2. Jalankan `node "${CLAUDE_PLUGIN_ROOT}/scripts/cek-ui.cjs"`.
3. Perbaiki temuan yang memang bug. Temuan yang disengaja cukup disebut alasannya.
4. Buka screenshot hanya kalau laporan teks tidak cukup untuk memahami masalahnya, dan dahulukan screenshot lebar HP. Satu screenshot memakan ribuan token, sedangkan laporan teks hanya puluhan.

## Jawaban akhir

Maksimal 5 baris: jumlah temuan, apa yang diperbaiki, dan apa yang dibiarkan beserta alasannya.
