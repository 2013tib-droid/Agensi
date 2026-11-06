# Agensi: gudang skill UI/UX

Repo ini berisi skill Claude Code (dikemas sebagai plugin marketplace `agensi`) untuk membangun aplikasi dengan UI yang bagus. Repo ini bukan aplikasi.

## Prioritas

Plugin `house-style` adalah gaya pribadi pemilik repo, jadi aturannya **menang** kalau bertentangan dengan skill lain:
- `house-style:landing-page-design`: untuk landing page, marketing site, dan web UI apa pun.
- `house-style:figma-designer`: untuk semua pekerjaan di Figma lewat Figma MCP.
- `house-style:ui-router`: peta "kapan pakai skill mana" yang ikut terbawa ke proyek lain (CLAUDE.md ini tidak ikut terbawa). Isinya harus sama dengan tabel dan alur kerja di bawah.

## Kapan pakai skill mana

| Kebutuhan | Skill utama | Pendukung |
|---|---|---|
| Landing page / web UI (selalu dulu) | `house-style:landing-page-design` | skill lain di bawah |
| Desain di Figma | `house-style:figma-designer` | `design-md:design-md` |
| Mulai proyek baru, tentukan gaya visual | `ui-ux-pro-max:ui-ux-pro-max` | `design-md:design-md` (simpan hasilnya ke DESIGN.md) |
| "Bikin mirip Stripe / Linear / Apple" | `design-md:design-md` (lihat `references/brands/`) | `ui-ux-pro-max:design-system` |
| Landing page / company website kelas atas | `taste-skill:taste-skill` | `hallmark:hallmark`, `open-design-picks:frontend-design` |
| Buang "AI slop" (UI, copy, layout mobile, aksesibilitas, komentar kode) | `antislop:antislop` (core, selalu dimuat bersama) | `antislop:antislop-ui`, `antislop:antislop-copywriting`, `antislop:antislop-layoutmobile`, `antislop:antislop-human`, `antislop:antislop-code` |
| Polish, audit, kritik UI yang sudah ada | `impeccable:impeccable` | `open-design-picks:web-design-guidelines`, `open-design-picks:redesign-skill` |
| Animasi & micro-interaction | `emil-design:animate`, `emil-design:emil-design-eng` | `emil-design:animation-performance`, `/emil-design:review-animations` |
| Animasi kompleks, timeline, scroll | `gsap:gsap-core`, `gsap:gsap-scrolltrigger` | `gsap:gsap-react` |
| Hero sinematik "terbang lewat dunia" saat scroll | `scroll-world:scroll-world` | `gsap:gsap-scrolltrigger` |
| Komponen animasi siap pakai (React) | `magic-ui:magic-ui`, `ui-libraries:react-bits` | |
| Efek shader/kanvas di atas halaman | `ui-libraries:canvas-ui` | |
| Ilustrasi/gambar dimensional | `dimensional-drawing:dimensional-drawing` | `dimensional-drawing:dimensional-drawing-motion` |
| Gaya spesifik | `open-design-picks:brutalist-skill` / `minimalist-skill` / `soft-skill` | |
| Brief desain sebelum mulai | `open-design-picks:design-brief` | |
| Screenshot → kode | `open-design-picks:image-to-code-skill` | |
| Brand, banner, slide | `ui-ux-pro-max:brand`, `ui-ux-pro-max:banner-design`, `ui-ux-pro-max:slides` | |

Skill yang hanya bisa dipanggil manual (pakai `/`): `/emil-design:pick-ui-library`, `/emil-design:prototype`, `/emil-design:review-animations`.

## Alur kerja default untuk UI baru

1. Cek `DESIGN.md` di root proyek. Kalau belum ada, buat dulu (`design-md` + `ui-ux-pro-max`).
2. Bangun layar dengan `taste-skill` / `hallmark` / `frontend-design`, mengikuti token DESIGN.md.
3. Tambah motion seperlunya (`emil-design`, `gsap`, `react-bits`, `magic-ui`), maksimal satu atau dua efek "wow" per halaman.
4. Polish dan audit dengan `impeccable` sebelum dianggap selesai, lalu saring dengan `antislop` (mode *after*) supaya tidak ada sisa AI slop.

## Aturan repo

- Isi `plugins/*` (kecuali `house-style/`, `design-md/skills/design-md/SKILL.md`, dan `ui-libraries/`) adalah salinan upstream. Jangan diedit manual; update lewat `bash scripts/sync-skills.sh`.
- Skill baru: buat folder `plugins/<nama>/` dengan `.claude-plugin/plugin.json` + `skills/<skill>/SKILL.md`, lalu daftarkan di `.claude-plugin/marketplace.json` dan `.claude/settings.json`. Cek dengan `claude plugin validate .`.
- Setiap plugin wajib menyimpan `LICENSE` dan `SOURCE.md` dari sumbernya.
- Setelah menambah, menghapus, atau mengganti skill/plugin: perbarui tabel "Kapan pakai skill mana" di file ini dan di `plugins/house-style/skills/ui-router/SKILL.md`, lalu di `PENGINGAT.md` perbarui tabel plugin, jumlah plugin/skill beserta tanggalnya, dan tambahkan satu baris di bagian Riwayat.
