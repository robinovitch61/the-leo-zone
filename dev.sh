#!/usr/bin/env zsh

# this script is for hot building the site in to a `testing` directory
# then you can e.g. `cd testing && http_server` to use browsersync or whatever
#
# run browser-sync (https://www.npmjs.com/package/browser-sync)
# get the external url
# then run this script like `./dev.sh http://192.168.1.41:9000`

thisdir=${0:a:h}

ls $thisdir/**/*{.md,.html,.css,.scss} | grep -v "testing" | entr -c hugo --baseURL "${1:-http://localhost:9000}" --destination $thisdir/testing
