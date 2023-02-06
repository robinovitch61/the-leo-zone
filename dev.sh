#!/usr/bin/env zsh

# this script is for hot building the site in to a `testing` directory
# then you can e.g. `cd testing && http_server` to use browsersync or whatever

thisdir=${0:a:h}

ls $thisdir/**/*{.md,.html} | grep -v "testing" | entr -c hugo --destination $thisdir/testing
