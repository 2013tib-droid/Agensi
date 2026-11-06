---
name: landing
description: Bangun landing page atau section web dengan kombinasi skill yang sudah ditentukan dan output singkat. Hanya jalan kalau dipanggil manual.
disable-model-invocation: true
argument-hint: "[hemat] <apa yang dibangun, file target>"
---

# /landing

Permintaan: $ARGUMENTS

## Skill yang dimuat

Muat hanya skill ini, sesuai urutan. Jangan muat skill lain kecuali user memintanya.

1. `house-style:landing-page-design`: aturannya menang kalau bertentangan.
2. `taste-skill:taste-skill`: untuk eksekusi visual.
3. `impeccable:impeccable` mode `polish` pada hasil akhir.

Kalau permintaan diawali `hemat`, cukup langkah 1 dan 2.

## Aturan kerja

- Baca `DESIGN.md` dan `docs/pola.md` proyek kalau ada, dan ikuti tokennya. Kalau tidak ada, pakai token Part B dari `landing-page-design`. Jangan membuat `DESIGN.md` baru kecuali diminta.
- Pertanyaan intake dari `landing-page-design`: tanyakan sekaligus dalam satu pesan, hanya yang jawabannya belum ada di permintaan atau proyek. Kalau permintaan sudah cukup jelas, langsung kerjakan dan tulis asumsi dalam satu baris.
- Baca hanya file yang disebut user dan file yang perlu diubah. Jangan menjelajah repo.
- Maksimal satu efek motion "wow" per halaman.
- Sebelum selesai, jalankan build atau lint proyek kalau ada.

- Komponen baru yang layak dipakai ulang: tambahkan satu baris ke `docs/pola.md` kalau file itu ada.

## Jawaban akhir

Maksimal 5 baris: file yang diubah, asumsi yang diambil, dan hasil build. Tanpa ringkasan ulang isi halaman.
