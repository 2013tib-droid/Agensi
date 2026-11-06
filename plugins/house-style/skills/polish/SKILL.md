---
name: polish
description: Audit dan rapikan UI yang sudah ada dengan impeccable lalu antislop mode after, dengan output singkat. Hanya jalan kalau dipanggil manual.
disable-model-invocation: true
argument-hint: "[audit] <file atau halaman target>"
---

# /polish

Target: $ARGUMENTS

## Skill yang dimuat

Muat hanya skill ini. Jangan muat skill lain kecuali user memintanya.

1. `house-style:landing-page-design`: patokan aturan visual. Aturannya menang kalau bertentangan.
2. `impeccable:impeccable` mode `audit`, lalu `polish`.
3. `antislop:antislop` + `antislop:antislop-ui`. Menjalankan perintah ini berarti user sudah memilih antislop mode `after` untuk sesi ini, jadi jangan tanyakan mode lagi.

Kalau target diawali `audit`, hanya laporkan temuan dan jangan edit file.

## Aturan kerja

- Baca hanya file target dan file yang langsung diimpor olehnya.
- Perbaiki temuan berdampak paling besar dulu: aksesibilitas, layout patah di mobile, lalu pelanggaran aturan `house-style`, lalu kosmetik.
- Jangan mengubah copy, struktur section, atau perilaku kecuali itu temuannya.
- Sebelum selesai, jalankan build atau lint proyek kalau ada.

## Jawaban akhir

Daftar singkat, satu baris per perbaikan (`file: apa yang diubah`), maksimal 10 baris. Temuan yang tidak diperbaiki ditulis terpisah beserta alasannya.
