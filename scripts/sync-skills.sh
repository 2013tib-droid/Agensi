#!/usr/bin/env bash
# Tarik ulang skill dari repo sumber (upstream) ke folder plugins/.
# Pakai:  bash scripts/sync-skills.sh            (clone ke folder sementara)
#         SRC=/path/folder-clone bash scripts/sync-skills.sh   (pakai clone yang sudah ada)
# Plugin buatan sendiri (design-md, ui-libraries) TIDAK disentuh script ini.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${SRC:-$(mktemp -d)}"

REPOS=(
  nextlevelbuilder/ui-ux-pro-max-skill
  Leonxlnx/taste-skill
  pbakaus/impeccable
  emilkowalski/skills
  Nutlope/hallmark
  greensock/gsap-skills
  magicuidesign/magicui
  oso95/scroll-world
  enesozturk/dimensional-drawing
  nexu-io/open-design
  VoltAgent/awesome-design-md
  google-labs-code/design.md
)

for r in "${REPOS[@]}"; do
  d="$SRC/${r//\//_}"
  if [ ! -d "$d" ]; then
    git clone -q --depth 1 "https://github.com/$r" "$d"
  fi
done

# copy <repo_dir> <path_di_repo> <plugin> <path_di_plugin>
copy() {
  local src="$SRC/$1/$2" dst="$ROOT/plugins/$3/$4"
  rm -rf "$dst"; mkdir -p "$(dirname "$dst")"
  cp -R "$src" "$dst"
}

# rev <repo_dir> -> commit hash yang disalin
rev() { git -C "$SRC/$1" rev-parse --short HEAD; }

# reset <plugin> : hapus isi plugin hasil salinan (kecuali manifest)
reset() { rm -rf "$ROOT/plugins/$1/skills" "$ROOT/plugins/$1/.claude"; mkdir -p "$ROOT/plugins/$1"; }

# license <repo_dir> <plugin> <upstream>
license() {
  local f; f=$(ls "$SRC/$1"/LICENSE* | head -1)
  cp "$f" "$ROOT/plugins/$2/LICENSE"
  printf 'Disalin dari https://github.com/%s (commit %s) pada %s.\nLisensi asli: lihat LICENSE di folder ini.\n' \
    "$3" "$(rev "$1")" "$(date +%Y-%m-%d)" > "$ROOT/plugins/$2/SOURCE.md"
}

# --- ui-ux-pro-max: struktur .claude/skills dipertahankan (SKILL.md memanggil ${CLAUDE_PLUGIN_ROOT}/.claude/skills/...)
reset ui-ux-pro-max
copy nextlevelbuilder_ui-ux-pro-max-skill .claude/skills ui-ux-pro-max .claude/skills
license nextlevelbuilder_ui-ux-pro-max-skill ui-ux-pro-max nextlevelbuilder/ui-ux-pro-max-skill

# --- taste-skill
reset taste-skill
copy Leonxlnx_taste-skill skills/taste-skill taste-skill skills/taste-skill
license Leonxlnx_taste-skill taste-skill Leonxlnx/taste-skill

# --- impeccable: struktur .claude/skills dipertahankan
reset impeccable
copy pbakaus_impeccable .claude/skills/impeccable impeccable .claude/skills/impeccable
license pbakaus_impeccable impeccable pbakaus/impeccable

# --- emil-design
reset emil-design
copy emilkowalski_skills skills emil-design skills
cp "$SRC/emilkowalski_skills/ui-cheatsheet.md" "$SRC/emilkowalski_skills/performance-cheatsheet.md" "$ROOT/plugins/emil-design/"
license emilkowalski_skills emil-design emilkowalski/skills

# --- hallmark
reset hallmark
copy Nutlope_hallmark skills/hallmark hallmark skills/hallmark
license Nutlope_hallmark hallmark Nutlope/hallmark

# --- gsap
reset gsap
copy greensock_gsap-skills skills gsap skills
license greensock_gsap-skills gsap greensock/gsap-skills

# --- magic-ui
reset magic-ui
copy magicuidesign_magicui skills/magic-ui magic-ui skills/magic-ui
license magicuidesign_magicui magic-ui magicuidesign/magicui

# --- scroll-world
reset scroll-world
copy oso95_scroll-world skills/scroll-world scroll-world skills/scroll-world
license oso95_scroll-world scroll-world oso95/scroll-world

# --- dimensional-drawing
reset dimensional-drawing
copy enesozturk_dimensional-drawing skills dimensional-drawing skills
license enesozturk_dimensional-drawing dimensional-drawing enesozturk/dimensional-drawing

# --- open-design: hanya skill UI/web yang berisi instruksi lengkap (bukan stub penunjuk upstream)
OD_PICKS=(brutalist-skill minimalist-skill soft-skill design-brief frontend-design
          web-design-guidelines redesign-skill image-to-code-skill motion-design login-flow faq-page)
reset open-design-picks
for s in "${OD_PICKS[@]}"; do
  copy nexu-io_open-design "skills/$s" open-design-picks "skills/$s"
done
license nexu-io_open-design open-design-picks nexu-io/open-design

# --- design-md: referensi (spec Google + koleksi DESIGN.md VoltAgent). SKILL.md ditulis sendiri.
REF="$ROOT/plugins/design-md/skills/design-md/references"
rm -rf "$REF"; mkdir -p "$REF/examples"
cp "$SRC/google-labs-code_design.md/docs/spec.md" "$REF/spec.md"
for e in "$SRC"/google-labs-code_design.md/examples/*/; do
  n=$(basename "$e"); mkdir -p "$REF/examples/$n"; cp "$e/DESIGN.md" "$REF/examples/$n/DESIGN.md"
done
cp -R "$SRC/VoltAgent_awesome-design-md/design-md" "$REF/brands"
cp "$SRC/google-labs-code_design.md/LICENSE" "$ROOT/plugins/design-md/LICENSE-google-design-md"
cp "$SRC/VoltAgent_awesome-design-md/LICENSE" "$ROOT/plugins/design-md/LICENSE-awesome-design-md"
printf 'references/spec.md & references/examples: https://github.com/google-labs-code/design.md (commit %s), Apache-2.0\nreferences/brands: https://github.com/VoltAgent/awesome-design-md (commit %s), MIT\nSKILL.md: ditulis untuk repo agensi.\nDisalin pada %s.\n' \
  "$(rev google-labs-code_design.md)" "$(rev VoltAgent_awesome-design-md)" "$(date +%Y-%m-%d)" > "$ROOT/plugins/design-md/SOURCE.md"

echo "Selesai. Cek perubahan: git -C \"$ROOT\" status"
