#!/bin/sh
# Bundles the shadow worlds with pinned tools, outside the Jekyll source tree.
set -eu
SCRATCH=${SCRATCH:-/tmp/memory-shadow-build}
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
mkdir -p "$SCRATCH/src"
cd "$SCRATCH"
if ! node -e 'const fs=require("node:fs"); const version=n=>JSON.parse(fs.readFileSync("node_modules/"+n+"/package.json","utf8")).version; process.exit(version("three")==="0.186.1" && version("esbuild")==="0.28.2" ? 0 : 1)' 2>/dev/null; then
  npm install --no-save --package-lock=false --ignore-scripts three@0.186.1 esbuild@0.28.2
fi
cp "$HERE"/src/*.js "$SCRATCH/src/"
"$SCRATCH/node_modules/.bin/esbuild" src/memory-3d.js --bundle --minify --format=esm --target=es2020 --legal-comments=eof --outfile="$ROOT/assets/js/memory-3d.js"
cp "$SCRATCH/node_modules/three/LICENSE" "$ROOT/assets/js/memory-3d.LICENSE.txt"
gzip -c "$ROOT/assets/js/memory-3d.js" | wc -c | awk '{print "gzip bytes:", $1}'
