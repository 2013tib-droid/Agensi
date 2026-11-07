# 📌 Pengingat: Repo Agensi

> Catatan singkat buat diri sendiri: repo ini apa, cara pakainya, dan cara menambah skill.

## Ini repo apa?

**Gudang skill** buat Claude. Claude tidak "ingat" antar sesi. Pengetahuannya disimpan di sini sebagai file skill (`SKILL.md`), lalu dipakai di proyek mana pun dengan cara memasang repo ini sebagai **plugin marketplace**.

Isinya ada 14 plugin dan 66 skill UI/UX (per 6 Nov 2026): gaya pribadi ditambah hasil kurasi dari 15 repo.

| Plugin | Asal | Isi |
|---|---|---|
| `house-style` ⭐ | **milik sendiri** | `landing-page-design` + `dashboard-design` + `figma-designer` + `ui-router`, plus perintah `/house-style:landing`, `/house-style:polish`, `/house-style:cek-ui`, dan hook cek UI otomatis. Prioritas utama |
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

Panduan "kapan pakai skill mana" ada di skill **[`house-style:ui-router`](plugins/house-style/skills/ui-router/SKILL.md)**. Skill ini dimuat hanya saat dibutuhkan (hemat token) dan ikut terbawa ke proyek lain lewat `house-style@agensi`. `CLAUDE.md` repo ini hanya berisi aturan inti.

Perintah siap pakai (tidak memakan konteks sebelum dipanggil):
- `/house-style:landing [hemat] <apa yang dibangun>`: landing-page-design + taste-skill + polish impeccable.
- `/house-style:polish [audit] <file>`: impeccable + antislop mode *after*. Tambahkan `audit` untuk laporan saja tanpa edit.
- `/house-style:cek-ui [pasang]`: cek tampilan dengan Playwright di lebar HP dan desktop. `pasang` membuat `.claude/cek-ui.json` di proyek, sehingga cek berjalan otomatis (Stop hook) setiap Claude selesai mengubah file UI selagi dev server hidup. Laporannya berupa teks singkat (scroll horizontal, gambar rusak, target sentuh < 24px, error konsol, request gagal). Screenshot disimpan di `.claude/cek-ui/` dan hanya dibuka kalau perlu.

## 🚀 Cara pakai di proyek baru

**Opsi 0: satu perintah, langsung hemat token (paling direkomendasikan).**

```bash
bash scripts/init-proyek.sh ../proyek-baru dashboard
```

Perintah ini menyalin tiga file ke proyek (file yang sudah ada tidak ditimpa):
- `.claude/settings.json`: preset plugin, jadi hanya plugin yang relevan yang aktif.
- `CLAUDE.md`: aturan hemat token dan bagian "Keputusan".
- `docs/pola.md`: daftar komponen yang sudah ada.

Pilihan preset (`templates/presets/`):

| Preset | Untuk | Plugin |
|---|---|---|
| `dashboard` | dashboard, admin, app internal | house-style, design-md, ui-ux-pro-max, impeccable, antislop |
| `landing` | landing page, company site | + taste-skill, emil-design |
| `landing-sinematik` | landing dengan animasi berat | + gsap, scroll-world, magic-ui, ui-libraries |
| `lanjutan` | proyek yang DESIGN.md-nya sudah matang | house-style, impeccable, antislop |

Di Claude Code web/cloud, cukup bilang: *"tambahkan repo 2013tib-droid/agensi, lalu jalankan init-proyek.sh untuk proyek ini dengan preset dashboard"*.

**Opsi A: isi manual.**
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

## 💰 Strategi hemat token (makin lama makin hemat)

Skill **tidak** membuat hemat dengan sendirinya, karena setiap skill yang dimuat menambah token. Yang membuat hemat adalah **tidak memutuskan hal yang sama dua kali**:

1. **Proyek baru:** jalankan `init-proyek.sh`, lalu minta Claude membuat `DESIGN.md`. Ini satu-satunya sesi "mahal".
2. **Setiap fitur:** Claude membaca `DESIGN.md` + `docs/pola.md` (beberapa ratus token), bukan skill (puluhan ribu token).
3. **Akhir fitur:** keputusan dan komponen baru dicatat. Audit `impeccable`/`antislop` sekali per fitur, bukan per layar.
4. **Lintas proyek:** pelajaran yang berlaku umum masuk ke `plugins/house-style/`. Proyek ke-10 langsung mewarisi pelajaran dari 9 proyek sebelumnya.
5. **DESIGN.md sudah matang?** Turunkan ke preset `lanjutan`.

Kebiasaan yang ikut membantu: satu sesi untuk satu fitur (`/clear` saat ganti topik), beri path file yang spesifik, dan minta edit kecil, bukan "tulis ulang halaman ini".

## ➕ Cara menambah skill baru

1. Kasih link repo skill-nya ke Claude, lalu bilang: *"tambahkan ke agensi"*.
2. Atau manual:
   - Tambahkan baris repo + `copy`/`license` di `scripts/sync-skills.sh`.
   - Buat `plugins/<nama>/.claude-plugin/plugin.json`.
   - Daftarkan di `.claude-plugin/marketplace.json` dan `.claude/settings.json`.
   - Jalankan `claude plugin validate .`.
3. Update tabel di file ini dan di skill `house-style:ui-router`, jumlah plugin/skill di atas, dan tambahkan baris di Riwayat.

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
- **Gaya landing page sekarang "vibrant conversion", bukan minimalis.** Alasannya: landing SoalSKD buatan Claude terlihat polos dibanding mockup buatan GPT, karena aturan lama melarang gradasi latar, memaksa judul abu-abu, ikon garis tipis, dan mengosongkan bukti sosial yang datanya belum ada. Kalau butuh gaya minimalis (misalnya tool developer), minta secara eksplisit di prompt.
- **Data contoh wajib diganti sebelum live.** Testimoni, jumlah pengguna, dan harga yang belum ada diisi contoh bertanda `data-contoh="true"` dan tercantum di laporan akhir ("Harus diganti sebelum live"). Cek dengan `grep -rn data-contoh` sebelum rilis.
- **Ukuran repo** sekitar 64 MB (per 6 Nov 2026), sebagian besar contoh foto di `taste-skill`.

## 📜 Riwayat

| Tanggal | Kejadian |
|---|---|
| 6 Nov 2026 | Skill pribadi `landing-page-design` dan `figma-designer` sudah ada di `.claude/skills/`. |
| 6 Nov 2026 | Repo dijadikan plugin marketplace: 13 plugin dan 55 skill. Skill pribadi dipindah ke `plugins/house-style/`. |
| 6 Nov 2026 | [PR #1](https://github.com/2013tib-droid/Agensi/pull/1) **di-merge ke `main`**. Marketplace siap dipakai di proyek lain lewat `/plugin marketplace add 2013tib-droid/agensi`. |
| 6 Nov 2026 | Tambah skill `house-style:ui-router` supaya panduan pemilihan skill ikut terbawa ke proyek lain. Total 56 skill. |
| 6 Nov 2026 | Tambah plugin `antislop` dari miqdadbadjuber/anti-slop. Total 14 plugin dan 62 skill. |
| 6 Nov 2026 | Strategi hemat token: preset plugin per jenis proyek, template proyek (`CLAUDE.md`, `docs/pola.md`), dan `scripts/init-proyek.sh`. |
| 6 Nov 2026 | Tambah skill `house-style:dashboard-design` untuk dashboard dan app (menggantikan `landing-page-design` di layar setelah login). Total 63 skill. |
| 6 Nov 2026 | Hemat token: tabel skill, alur kerja, dan biaya token dipindah dari `CLAUDE.md` ke `house-style:ui-router` saja (dimuat saat perlu), plus "mode hemat" lewat kata `hemat`. Tambah perintah manual `/house-style:landing` dan `/house-style:polish`. Total 65 skill. |
| 6 Nov 2026 | Tambah hook cek UI otomatis (Playwright, Stop hook) dan perintah `/house-style:cek-ui`. Aktif hanya di proyek yang punya `.claude/cek-ui.json`. Total 66 skill. |
| 7 Nov 2026 | Gaya default `landing-page-design` diganti dari minimalis ke "vibrant conversion" (B0): warna brand + aksen, gradasi lembut, mockup HP, foto orang, ikon berwarna, bukti sosial di tiap layar, data contoh ditandai `data-contoh`. `figma-designer` dan `ui-router` ikut disesuaikan. Total 66 skill. |
| 7 Nov 2026 | [PR #13](https://github.com/2013tib-droid/Agensi/pull/13) (gaya "vibrant conversion") **di-merge ke `main`**. |

*Dibuat: 6 November 2026*
