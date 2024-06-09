#!/usr/bin/env sh
set -e

# meant to be run alongside rebuild.sh

thisdir=$(CDPATH="" cd -- "$(dirname -- "$0")" && pwd)
cd "${thisdir}"/../testing

ONLINE="--no-online"
if ping -q -c 1 -W 1 google.com >/dev/null 2>&1; then
  ONLINE=""
fi

browser-sync start \
  -s \
  -f . \
  --no-notify \
  --no-ghost-mode \
  --host "$(ipconfig getifaddr en0 || echo localhost)" \
  --port 9000 \
  --open external \
  $ONLINE
