#!/usr/bin/env bash
# Siapkan proyek baru supaya hemat token sejak hari pertama.
# Pakai: bash scripts/init-proyek.sh <folder-proyek> [dashboard|landing|landing-sinematik|lanjutan]
# File yang sudah ada tidak ditimpa.
set -euo pipefail

AGENSI="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${1:?Pakai: init-proyek.sh <folder-proyek> [preset]}"
PRESET="${2:-dashboard}"
SRC="$AGENSI/templates/presets/$PRESET.json"
[ -f "$SRC" ] || { echo "Preset tidak dikenal: $PRESET (pilihan: $(ls "$AGENSI/templates/presets" | sed 's/\.json//' | tr '\n' ' '))"; exit 1; }

salin() { # $1 sumber, $2 tujuan
  if [ -e "$2" ]; then echo "lewati  $2 (sudah ada)"; else mkdir -p "$(dirname "$2")"; cp "$1" "$2"; echo "buat    $2"; fi
}

salin "$SRC"                                  "$TARGET/.claude/settings.json"
salin "$AGENSI/templates/proyek/CLAUDE.md"    "$TARGET/CLAUDE.md"
salin "$AGENSI/templates/proyek/docs/pola.md" "$TARGET/docs/pola.md"

[ -f "$TARGET/DESIGN.md" ] || echo "Langkah berikut: minta Claude membuat DESIGN.md (skill design-md + ui-ux-pro-max). Cukup sekali."
