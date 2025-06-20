#!/bin/bash
set -e

rm -rf dist
rm -rf node_modules
rm -rf pnpm-lock.yaml

pnpm i
pnpm ncu --peer -u

pnpm i
pnpm lint
pnpm format
pnpm build

git add package.json
git add pnpm-lock.yaml
