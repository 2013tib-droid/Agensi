---
name: dashboard-design
description: "House rules for dashboards, admin panels, internal tools, and app screens: app shell, KPI cards, data tables, filters, forms, charts, and empty/loading/error states, plus a compact copy of the house-style visual tokens. Use this instead of landing-page-design whenever the screen is a logged-in product UI rather than a marketing page, including CRUD pages, settings, analytics, and back office tools."
---

# Dashboard design

Aturan `house-style` untuk UI aplikasi. Skill ini **menggantikan** `landing-page-design` untuk layar di balik login, jadi jangan muat keduanya. Bagian landing page (hero, copy konversi, tagline reveal, scroll reveal, SEO) tidak berlaku di sini.

Urutan prioritas: permintaan pengguna > `DESIGN.md` proyek > skill ini > skill lain.

## 0. Sebelum mulai

1. Baca `DESIGN.md` dan `docs/pola.md`. Pakai ulang shell, tabel, dan form yang sudah ada.
2. Kalau belum jelas, tanyakan dalam satu batch: siapa penggunanya (peran), tiga tugas paling sering, entitas data utama, perkiraan jumlah baris, dan perangkat utama. Kalau tidak dijawab, asumsikan, tulis asumsinya dalam satu baris, lalu lanjut.
3. Bangun per layar. Setelah selesai, catat komponen baru di `docs/pola.md`.

## 1. Token visual (ringkasan house-style)

- **Font:** Geist atau Manrope, satu saja. Geist Mono untuk ID, kode, atau angka yang butuh rata. Jangan pakai Inter, Roboto, Arial, Open Sans, Helvetica. Tanpa italic.
- **Ukuran teks:** hanya skala Tailwind, tanpa nilai arbitrer. Kepadatan default dashboard memakai 14px.
  - Judul halaman: Heading 5 (`text-2xl` semibold)
  - Judul panel/kartu: Title 3–4 (`text-base`/`text-sm` medium)
  - Teks dan sel tabel: Body 6 (`text-sm` regular)
  - Header tabel dan label: Caption 3–4 (`text-xs` semibold/medium)
  - Nilai KPI: Heading 4–5
  - Definisikan sebagai class bernama (`heading-5`, `body-6`, `caption-4`).
- **Angka:** `tabular-nums`, rata kanan di tabel.
- **Spacing:** hanya 0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96 px. Gap grid 16 atau 24, padding panel 16 atau 24.
- **Radius:** hanya nilai Tailwind. Untuk elemen bersarang dengan jarak di bawah 32px, radius dalam = radius luar − jarak (dipakai kalau hasilnya > 2).
- **Latar:** datar, tanpa gradien. Kartu diberi border di semua sisi atau tidak sama sekali. Garis pemisah antarbaris tabel boleh.
- **Dark mode:** hanya `#000000` `#181818` `#1F1F1F` `#272727` `#313131` `#131209`.
- **Ikon:** Phosphor, Solar, atau Iconamoon. Jangan pakai Material.
- **Motion:** kurva `cubic-bezier(0.22,1,0.36,1)`, hover 200–300ms, hanya `transform`/`opacity`, dan hormati `prefers-reduced-motion`. Data jangan diberi animasi masuk. Dashboard harus terasa cepat, bukan sinematik.
- **Bahasa:** sentence case, tanpa tanda hubung di dalam kalimat, tanpa tanda seru. Error menyebut apa yang gagal dan apa langkah berikutnya.

## 2. App shell

- **Sidebar** 240–256px yang bisa diciutkan menjadi 64px (ikon + tooltip). Maksimal 7 item utama, dikelompokkan. Halaman aktif selalu ditandai.
- **Topbar** 56–64px: breadcrumb, pencarian global (⌘K), notifikasi, menu pengguna.
- **Header halaman:** judul + satu kalimat konteks di kiri, satu tombol utama di kanan. Hanya satu aksi utama per halaman.
- **Lebar konten:** tabel dan grafik boleh selebar layar, form maksimal ±640px.
- **Hak akses:** sembunyikan fitur yang tidak boleh diakses. Kalau aksi terlihat tapi tidak bisa dijalankan, nonaktifkan dan beri tooltip alasannya.

## 3. KPI

- Maksimal 3–5 kartu di atas, berisi hal yang benar-benar dipantau. Jangan membuat dinding angka.
- Setiap kartu memuat label, nilai, perubahan dengan arah dan periodenya (misalnya "▲ 4,7% vs 30 hari lalu"), dan sparkline kalau berguna.
- Warna tidak boleh menjadi satu-satunya sinyal. Selalu sertakan ikon panah atau tanda.

## 4. Tabel

- Kolom identitas di kiri, angka rata kanan, aksi baris (menu ⋯) di kolom terakhir.
- Tinggi baris 40–48px. Header lengket (sticky) dengan indikator sort dan `aria-sort`.
- Teks panjang dipotong dengan tooltip. Tanggal ditampilkan relatif ("2 jam lalu") dengan tanggal lengkap di tooltip.
- Di atas ±50 baris pakai pagination dari server. Di atas ±1.000 baris yang dirender sekaligus, pakai virtualisasi.
- Pilih banyak baris memunculkan action bar ("3 dipilih · Ekspor · Hapus").
- Bedakan tiga kondisi kosong: belum ada data (ajak membuat yang pertama), filter tanpa hasil (tombol hapus filter), dan tidak punya akses.
- Di layar sempit, tabel di-scroll horizontal di dalam kontainernya sendiri (halaman tidak ikut melebar), atau diubah menjadi daftar kartu.

## 5. Filter dan pencarian

- Bar filter di atas tabel. Filter aktif tampil sebagai chip, dengan tombol "Hapus semua".
- Simpan state filter, sort, dan halaman di URL query supaya bisa dibagikan dan bertahan saat refresh.
- Pencarian memakai debounce ±300ms. Tampilkan jumlah hasilnya.

## 6. Form

- Satu kolom, label di atas field, teks bantuan di bawahnya. Field wajib atau opsional ditandai dengan konsisten.
- Validasi saat blur dan saat submit. Error ditampilkan inline di field terkait, lalu fokus pindah ke error pertama.
- Tombol simpan punya state loading dan nonaktif. Peringatkan kalau ada perubahan yang belum disimpan saat pengguna meninggalkan halaman.
- **Aksi destruktif:** kalau bisa dibatalkan, pakai toast "Undo". Kalau tidak bisa dibatalkan, minta konfirmasi dengan menulis nama item.
- Form panjang dibagi per bagian dengan judul. Wizard hanya dipakai kalau langkahnya memang berurutan.

## 7. Grafik

- Kalau skill `dataviz` tersedia, ikuti skill itu untuk warna dan mark.
- Satu grafik menjawab satu pertanyaan, dan judulnya menyatakan pertanyaan itu.
- Pilih jenis grafik sesuai data: tren waktu dengan garis, perbandingan antarkategori dengan batang horizontal, komposisi dengan stacked bar. Pie hanya untuk 5 potong atau kurang. Tanpa 3D.
- Sumbu diberi satuan. Tooltip menampilkan nilai persis. Satu seri memakai warna yang sama di semua halaman.

## 8. State

- **Loading:** skeleton dengan bentuk yang sama seperti hasil akhirnya, per widget. Jangan memakai satu spinner untuk seluruh halaman.
- **Error:** dilokalisasi per widget, disertai tombol "Coba lagi". Satu widget yang gagal tidak boleh menjatuhkan seluruh halaman.
- **Mutasi:** pakai optimistic update kalau aman. Hasil proses asinkron dilaporkan lewat toast yang spesifik ("Faktur INV-2381 terkirim ke Dana").
- **Fokus:** ring fokus selalu terlihat. Tabel, menu, dan dialog bisa dipakai dengan keyboard. Esc menutup dialog.

## 9. Responsif

Target utama ≥1280px. Di 390px: sidebar berubah menjadi drawer, filter pindah ke sheet, tabel mengikuti aturan di §4, dan aksi utama tetap terlihat. Tidak boleh ada scroll horizontal di level halaman.

## 10. Data contoh

Data contoh harus realistis. Hindari angka bulat, buat tanggal bervariasi, dan pakai nama lengkap yang sesuai wilayah pengguna. Untuk produk Indonesia, pakai format lokal: `Rp 1.250.000`, `12,5%`, `6 Nov 2026`. Untuk produk nyata, jangan mengarang fakta. Pakai placeholder `{{…}}`.

## Checklist sebelum selesai

- [ ] Semua ukuran teks, spacing, dan radius ada di token §1
- [ ] Satu aksi utama per halaman, halaman aktif ditandai di navigasi
- [ ] Tabel: angka rata kanan + tabular, sort, tiga jenis kondisi kosong, aman di 390px
- [ ] Filter dan pencarian tersimpan di URL
- [ ] Skeleton, error per widget, dan toast spesifik
- [ ] Keyboard dan ring fokus berfungsi, warna bukan satu-satunya sinyal
- [ ] Komponen baru dicatat di `docs/pola.md`
