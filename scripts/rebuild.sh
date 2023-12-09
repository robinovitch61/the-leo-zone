#!/usr/bin/env sh
set -e

# meant to be run alongside serve.sh

thisdir=$(CDPATH="" cd -- "$(dirname -- "$0")" && pwd)
cd "${thisdir}"/..
ip=$(ipconfig getifaddr en0)

# watch all files that aren't in the testing directory and rebuild on changes to ./testing
rg --files | rg -v testing | rg '.md|.html|.css|.scss' | entr -c hugo -D --baseURL http://"${ip}":9000 --destination ./testing
