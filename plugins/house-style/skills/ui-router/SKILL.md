---
name: ui-router
description: "Picks which agensi UI/UX skill to use, in what order, and which rules win when skills disagree. Use this skill FIRST, before loading any other design skill, whenever a task involves building, styling, animating, redesigning, auditing or polishing a UI, website, landing page, app screen, component, Figma design, design system, DESIGN.md, brand asset or illustration — even when the user names no skill. Also use it when unsure which of the agensi skills (house-style, antislop, ui-ux-pro-max, design-md, taste-skill, hallmark, impeccable, emil-design, gsap, open-design-picks, magic-ui, ui-libraries, scroll-world, dimensional-drawing) fits."
---

# UI router: memilih skill agensi

Skill ini hanya peta. Ia tidak berisi aturan desain. Baca, pilih skill yang tepat, lalu muat skill itu.

## Aturan prioritas

1. **`house-style` selalu menang.** Kalau aturan skill lain bertentangan dengan `house-style:landing-page-design` atau `house-style:figma-designer`, ikuti `house-style`. Ini juga berlaku untuk `antislop`: ia filter penyaring slop, bukan sumber gaya.
2. **`DESIGN.md` proyek menang atas selera skill lain.** Token warna, font, spacing, dan radius di `DESIGN.md` dipakai apa adanya, kecuali bertentangan dengan aturan `house-style`.
3. **Muat seperlunya.** Pakai satu skill utama per tugas, tambah pendukung hanya kalau memang dibutuhkan. Jangan memuat beberapa skill "pembangun halaman" (taste-skill, hallmark, frontend-design) sekaligus: pilih satu.
4. **Hanya pakai skill yang aktif.** Proyek bisa menyalakan sebagian plugin saja. Kalau skill pilihan tidak tersedia, pakai pendukungnya atau lanjut dengan `house-style` saja. Jangan mengarang isi skill yang tidak termuat.

## Kapan pakai skill mana

| Kebutuhan | Skill utama | Pendukung |
|---|---|---|
| Landing page / web UI apa pun (selalu dulu) | `house-style:landing-page-design` | skill lain di bawah |
| Desain di Figma | `house-style:figma-designer` | `design-md:design-md` |
| Mulai proyek baru, tentukan gaya visual | `ui-ux-pro-max:ui-ux-pro-max` | `design-md:design-md` (simpan hasilnya ke `DESIGN.md`) |
| "Bikin mirip Stripe / Linear / Apple" | `design-md:design-md` (lihat `references/brands/`) | `ui-ux-pro-max:design-system` |
| Landing page / company website kelas atas | `taste-skill:taste-skill` | `hallmark:hallmark`, `open-design-picks:frontend-design` |
| Buang "AI slop" (UI, copy, layout mobile, aksesibilitas, komentar kode) | `antislop:antislop` (core, selalu dimuat bersama) | `antislop:antislop-ui`, `antislop:antislop-copywriting`, `antislop:antislop-layoutmobile`, `antislop:antislop-human`, `antislop:antislop-code` |
| Polish, audit, kritik UI yang sudah ada | `impeccable:impeccable` | `open-design-picks:web-design-guidelines`, `open-design-picks:redesign-skill` |
| Animasi & micro-interaction | `emil-design:animate`, `emil-design:emil-design-eng` | `emil-design:animation-performance`, `/emil-design:review-animations` |
| Animasi kompleks, timeline, scroll | `gsap:gsap-core`, `gsap:gsap-scrolltrigger` | `gsap:gsap-react` |
| Hero sinematik "terbang lewat dunia" saat scroll | `scroll-world:scroll-world` (butuh Higgsfield) | `gsap:gsap-scrolltrigger` |
| Komponen animasi siap pakai (React) | `magic-ui:magic-ui`, `ui-libraries:react-bits` | |
| Efek shader/kanvas di atas halaman | `ui-libraries:canvas-ui` | |
| Ilustrasi/gambar dimensional | `dimensional-drawing:dimensional-drawing` | `dimensional-drawing:dimensional-drawing-motion` |
| Gaya spesifik | `open-design-picks:brutalist-skill` / `minimalist-skill` / `soft-skill` | |
| Brief desain sebelum mulai | `open-design-picks:design-brief` | |
| Screenshot → kode | `open-design-picks:image-to-code-skill` | |
| Halaman FAQ / alur login | `open-design-picks:faq-page`, `open-design-picks:login-flow` | |
| Brand, banner, slide | `ui-ux-pro-max:brand`, `ui-ux-pro-max:banner-design`, `ui-ux-pro-max:slides` | |
| Komponen shadcn/ui + Tailwind | `ui-ux-pro-max:ui-styling` | |
| App mobile web terasa native | `emil-design:mobile-native` | |
| React Native / Expo animasi | `emil-design:animate-expo` | |
| Uji UI dengan data ekstrem | `emil-design:break-ui` | |

Skill yang hanya bisa dipanggil manual oleh pengguna (pakai `/`): `/emil-design:pick-ui-library`, `/emil-design:prototype`, `/emil-design:review-animations`. Sarankan ke pengguna kalau cocok, jangan panggil sendiri.

## Alur kerja default untuk UI baru

1. Cek `DESIGN.md` di root proyek. Kalau belum ada, buat dulu (`design-md` + `ui-ux-pro-max`).
2. Bangun layar dengan `house-style:landing-page-design` sebagai aturan dasar, ditambah satu dari `taste-skill` / `hallmark` / `frontend-design`, mengikuti token `DESIGN.md`.
3. Tambah motion seperlunya (`emil-design`, `gsap`, `react-bits`, `magic-ui`), maksimal satu atau dua efek "wow" per halaman.
4. Polish dan audit dengan `impeccable` sebelum dianggap selesai, lalu saring dengan `antislop` (mode *after*) supaya tidak ada sisa AI slop.

## Catatan lisensi

React Bits dan Canvas UI berlisensi MIT + Commons Clause: pasang lewat `npx shadcn add`, jangan salin kodenya ke repo lain, dan komponennya tidak boleh dijual ulang sebagai produk.
