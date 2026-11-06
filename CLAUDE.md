# Agensi: gudang skill UI/UX

Repo ini berisi skill Claude Code (dikemas sebagai plugin marketplace `agensi`) untuk membangun aplikasi dengan UI yang bagus. Repo ini bukan aplikasi.

## Prioritas

Aturan plugin `house-style` (gaya pribadi pemilik repo) **menang** kalau bertentangan dengan skill lain.

- Web UI / landing page: `house-style:landing-page-design`
- Figma: `house-style:figma-designer`
- Pilih skill lain dan alur kerja UI baru: muat `house-style:skill-router`
- Kata `hemat` di prompt: satu skill utama saja, tanpa audit, jawaban singkat (detail di `skill-router`)

## Aturan repo

- Isi `plugins/*` (kecuali `house-style/`, `design-md/skills/design-md/SKILL.md`, dan `ui-libraries/`) adalah salinan upstream. Jangan diedit manual; update lewat `bash scripts/sync-skills.sh`.
- Skill baru: buat folder `plugins/<nama>/` dengan `.claude-plugin/plugin.json` + `skills/<skill>/SKILL.md`, lalu daftarkan di `.claude-plugin/marketplace.json`, `.claude/settings.json`, dan tabel di `house-style:skill-router`. Cek dengan `claude plugin validate .`.
- Setiap plugin wajib menyimpan `LICENSE` dan `SOURCE.md` dari sumbernya.
