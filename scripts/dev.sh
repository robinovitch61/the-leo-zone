#!/usr/bin/env sh
set -e

thisdir=$(CDPATH="" cd -- "$(dirname -- "$0")" && pwd)
rootdir="${thisdir}"/..
cd "${rootdir}"

ip=$(ipconfig getifaddr en0 || echo localhost)

ONLINE="--no-online"
if ping -q -c 1 -W 1 google.com >/dev/null 2>&1; then
  ONLINE=""
fi

# start browser-sync in the background
browser-sync start \
  -s "${rootdir}"/testing \
  -f "${rootdir}"/testing \
  --no-notify \
  --no-ghost-mode \
  --host "${ip}" \
  --port 9000 \
  --open external \
  $ONLINE &

BROWSERSYNC_PID=$!
trap 'kill $BROWSERSYNC_PID 2>/dev/null' EXIT INT TERM

# watch source files and rebuild on changes
rg --files | rg -v testing | rg '.md|.html|.css|.scss' | entr -c sh -c \
  "uv run scripts/render-terminals.py && hugo -D --baseURL http://${ip}:9000 --destination ./testing"
