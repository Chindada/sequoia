# Contributing

## Tools

### Conventional Commit

- install git cz tool global

```sh
npm install -g commitizen
npm install -g cz-conventional-changelog
npm install -g conventional-changelog-cli
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

### Pre-commit

- install pre-commit

```sh
pip3 install pre-commit
```

```sh
pre-commit autoupdate
pre-commit install
pre-commit run --all-files
```

### Modify CHANGELOG

- git-chglog

```sh
brew tap git-chglog/git-chglog
brew install git-chglog
```

- new tag in default branch

```sh
VERSION=0.0.0
npm version --no-git-tag-version --no-commit-hooks $VERSION
git add .
git commit -m "Release v$VERSION"
git tag -a v$VERSION -m "Release v$VERSION"
git-chglog -o CHANGELOG.md
git fetch --prune --prune-tags origin
git reset --soft HEAD~1
```

```sh
VERSION=0.0.0
git tag -a v$VERSION -m "Release v$VERSION"
git push -u origin --tags
git push -u origin --all
```

### Find ignored files

```sh
find . -type f  | git check-ignore --stdin
```

### Generate icons

```sh
pnpm electron-icon-maker --input=[abs]/mojave-web/src/assets/png/logo.png --output=./ds
```

### Electron build

```sh
pnpm build-ds && pnpm electron-builder build --mac --publish=never --config.buildVersion=private
```

### Vue snippets

```vue
<script setup lang="ts"></script>

<template></template>

<style lang="scss" scoped></style>
```
