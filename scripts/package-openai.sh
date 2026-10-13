#!/usr/bin/env bash
# Builds the upload ZIP for the OpenAI Plugin Directory (platform.openai.com/plugins).
#
#   scripts/package-openai.sh [output-dir]   default: dist/
#
# Packs an explicit file list under a top-level compelling/ folder; nothing else from the
# checkout (git history, scripts, other client manifests) ends up in the archive.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$(mkdir -p "${1:-$ROOT/dist}" && cd "${1:-$ROOT/dist}" && pwd)"

node "$ROOT/scripts/sync-manifests.mjs" --check

NAME="$(node -p "require('$ROOT/plugin.json').name")"
VERSION="$(node -p "require('$ROOT/plugin.json').version")"
ZIP="$OUT_DIR/$NAME-plugin-$VERSION-submission.zip"

FILES=(plugin.json mcp.json .codex-plugin/plugin.json .mcp.json README.md LICENSE assets/logo.png)
while IFS= read -r f; do FILES+=("${f#"$ROOT"/}"); done < <(
  find "$ROOT/skills" -type f \( -name SKILL.md -o -path '*/agents/openai.yaml' \) | sort
)

STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
for f in "${FILES[@]}"; do
  mkdir -p "$STAGE/$NAME/$(dirname "$f")"
  cp "$ROOT/$f" "$STAGE/$NAME/$f"
done

rm -f "$ZIP"
(cd "$STAGE" && zip -qrX "$ZIP" "$NAME")

echo "$ZIP"
echo "files: ${#FILES[@]}  sha256: $(shasum -a 256 "$ZIP" | cut -d' ' -f1)"
