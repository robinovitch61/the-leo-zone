#!/usr/bin/env sh
set -e

# meant to be run alongside rebuild.sh

thisdir=$(CDPATH="" cd -- "$(dirname -- "$0")" && pwd)
cd "${thisdir}"/../testing
browser-sync start \
  -s \
  -f . \
  --no-notify \
  --no-ghost-mode \
  --host "$(ipconfig getifaddr en0)" \
  --port 9000 \
  --open external