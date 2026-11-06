# Agensi: gudang skill UI/UX

Repo ini berisi skill Claude Code (dikemas sebagai plugin marketplace `agensi`) untuk membangun aplikasi dengan UI yang bagus. Repo ini bukan aplikasi.

## Prioritas

Plugin `house-style` adalah gaya pribadi pemilik repo, jadi aturannya **menang** kalau bertentangan dengan skill lain:
- `house-style:landing-page-design`: untuk landing page, marketing site, dan web UI publik.
- `house-style:dashboard-design`: untuk dashboard, admin panel, dan layar aplikasi setelah login.
- `house-style:figma-designer`: untuk semua pekerjaan di Figma lewat Figma MCP.
- `house-style:ui-router`: peta "kapan pakai skill mana" yang ikut terbawa ke proyek lain (CLAUDE.md ini tidak ikut terbawa). Isinya harus sama dengan tabel dan alur kerja di bawah.

## Kapan pakai skill mana

| Kebutuhan | Skill utama | Pendukung |
|---|---|---|
| Landing page / web UI publik (selalu dulu) | `house-style:landing-page-design` | skill lain di bawah |
| Dashboard, admin panel, app internal, layar setelah login | `house-style:dashboard-design` (gantikan `landing-page-design`) | `impeccable:impeccable` untuk audit |
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

1. Cek `DESIGN.md` di root proyek. Kalau belum ada, buat dulu (`design-md` + `ui-ux-pro-max`). Ini hanya dilakukan **sekali per proyek**.
2. Bangun layar mengikuti token DESIGN.md. Pakai `taste-skill` / `hallmark` / `frontend-design` hanya untuk landing page atau saat DESIGN.md belum menjawab.
3. Tambah motion seperlunya (`emil-design`, `gsap`, `react-bits`, `magic-ui`), maksimal satu atau dua efek "wow" per halaman. Dashboard umumnya tidak perlu.
4. Saat **fitur selesai** (bukan per layar), audit file yang berubah dengan `impeccable`, lalu `antislop` (mode *after*).
5. Catat hasilnya: keputusan visual ke `DESIGN.md`, komponen baru ke `docs/pola.md`.

## Hemat token

Skill menambah token setiap kali dimuat. Penghematan datang dari tidak memuat ulang keputusan yang sudah dicatat.

- **Biaya kira-kira per skill** (1 token ≈ 4 karakter): `antislop` ~13k, `antislop-ui` ~7k, `scroll-world` ~12k, `image-to-code-skill` ~9k, `house-style:*` ~5,5k, `taste-skill` ~5k, `ui-ux-pro-max` ~4k, `impeccable` ~3k, `design-md` ~0,6k.
- **Proyek memakai preset** dari `templates/presets/` (dipasang dengan `scripts/init-proyek.sh`). Plugin yang tidak aktif tidak memakan konteks.
- **Folder `references/` jangan dibaca utuh** (hallmark 6 MB, design-md 3,3 MB). Ambil satu file yang relevan saja.
- **Siklus yang membuat proyek makin hemat:** DESIGN.md + `docs/pola.md` + bagian "Keputusan" di CLAUDE.md proyek. Sesi berikutnya cukup membaca file kecil itu tanpa memuat ulang skill. Template ada di `templates/proyek/`.
- **Pelajaran lintas proyek** (berlaku di semua proyek) masuk ke `plugins/house-style/`, supaya proyek berikutnya langsung mendapatkannya.

## Aturan repo

- Isi `plugins/*` (kecuali `house-style/`, `design-md/skills/design-md/SKILL.md`, dan `ui-libraries/`) adalah salinan upstream. Jangan diedit manual; update lewat `bash scripts/sync-skills.sh`.
- Skill baru: buat folder `plugins/<nama>/` dengan `.claude-plugin/plugin.json` + `skills/<skill>/SKILL.md`, lalu daftarkan di `.claude-plugin/marketplace.json` dan `.claude/settings.json`. Cek dengan `claude plugin validate .`.
- Setiap plugin wajib menyimpan `LICENSE` dan `SOURCE.md` dari sumbernya.
- Setelah menambah, menghapus, atau mengganti skill/plugin: perbarui tabel "Kapan pakai skill mana" di file ini dan di `plugins/house-style/skills/ui-router/SKILL.md`, lalu di `PENGINGAT.md` perbarui tabel plugin, jumlah plugin/skill beserta tanggalnya, dan tambahkan satu baris di bagian Riwayat.
