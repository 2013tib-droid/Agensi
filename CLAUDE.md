# Agensi: gudang skill UI/UX

Repo ini berisi skill Claude Code (dikemas sebagai plugin marketplace `agensi`) untuk membangun aplikasi dengan UI yang bagus. Repo ini bukan aplikasi.

## Prioritas

Aturan plugin `house-style` (gaya pribadi pemilik repo) **menang** kalau bertentangan dengan skill lain.

- Landing page, marketing site, web UI publik: `house-style:landing-page-design`
- Dashboard, admin panel, layar setelah login: `house-style:dashboard-design`
- Figma: `house-style:figma-designer`
- Pilih skill lain, alur kerja UI baru, biaya token per skill: muat `house-style:ui-router` (satu-satunya sumber tabel "kapan pakai skill mana")
- Kata `hemat` di prompt: satu skill utama saja, tanpa audit, jawaban singkat (detail di `ui-router`)

## Hemat token di repo ini

- Proyek memakai preset dari `templates/presets/` (dipasang dengan `scripts/init-proyek.sh`). Template catatan proyek ada di `templates/proyek/`.
- Folder `references/` jangan dibaca utuh (hallmark 6 MB, design-md 3,3 MB). Ambil satu file yang relevan saja.
- Pelajaran lintas proyek masuk ke `plugins/house-style/`.

## Aturan repo

- Isi `plugins/*` (kecuali `house-style/`, `design-md/skills/design-md/SKILL.md`, dan `ui-libraries/`) adalah salinan upstream. Jangan diedit manual; update lewat `bash scripts/sync-skills.sh`.
- Skill baru: buat folder `plugins/<nama>/` dengan `.claude-plugin/plugin.json` + `skills/<skill>/SKILL.md`, lalu daftarkan di `.claude-plugin/marketplace.json` dan `.claude/settings.json`. Cek dengan `claude plugin validate .`.
- Setiap plugin wajib menyimpan `LICENSE` dan `SOURCE.md` dari sumbernya.
- Setelah menambah, menghapus, atau mengganti skill/plugin: perbarui tabel di `plugins/house-style/skills/ui-router/SKILL.md`, lalu di `PENGINGAT.md` perbarui tabel plugin, jumlah plugin/skill beserta tanggalnya, dan tambahkan satu baris di bagian Riwayat.
