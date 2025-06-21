#!/bin/bash

set -e

VERSION=v1.0
CURRENT_COMMIT=$(git rev-parse HEAD)

echo "{" >version.json
echo "  \"version\": \"$VERSION\"," >>version.json
echo "  \"commit\": \"$CURRENT_COMMIT\"" >>version.json
echo "}" >>version.json

rm -rf dist
pnpm install
pnpm build

docker buildx build \
    -t ghcr.io/chindada/sequoia:$VERSION .
docker system prune --volumes -f
