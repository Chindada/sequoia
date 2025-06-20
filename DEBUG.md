# DEBUG IN VSCODE

## Pre-requisites

- Make sure `$GH_PAT` is set in your environment

```sh
echo "//npm.pkg.github.com/:_authToken=$GH_PAT" >> ~/.npmrc
echo "@chindada:registry=https://npm.pkg.github.com/" >> ~/.npmrc
```

- or login with npm and set the scope

```sh
npm login --scope=@chindada --auth-type=legacy --registry=https://npm.pkg.github.com
```

```sh
pnpm remove @chindada/panther
pnpm add @chindada/panther

# or
pnpm remove @chindada/panther
pnpm add git+ssh://git@github.com:chindada/panther.git#main
```

```sh
pnpm vue-i18n-extract report \
    --vueFiles './src/**/*.?(ts|js|vue)' \
    --languageFiles './src/locales/*.?(json|yml|yaml)' \
    --remove true \
    --exclude 'success' \
    --exclude 'info' \
    --exclude 'warn' \
    --exclude 'error'
```

## Make .vscode folder

```bash
mkdir .vscode
```

## Add this to launch.json

```sh
echo '{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "dev",
            "type": "node",
            "request": "launch",
            "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/vite",
            "runtimeArgs": [
                "dev"
            ],
        },
        {
            "type": "chrome",
            "request": "launch",
            "name": "chrome",
            "url": "http://localhost:5173",
            "webRoot": "${workspaceFolder}",
        }
    ],
    "compounds": [
        {
            "name": "integrated",
            "configurations": [
                "dev",
                "chrome"
            ],
            "stopAll": true
        }
    ]
}
' > .vscode/launch.json

echo '{
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "tsconfig.json": "tsconfig.*.json, env.d.ts",
    "vite.config.*": "jsconfig*, vitest.config.*, cypress.config.*, playwright.config.*",
    "package.json": "package-lock.json, pnpm*, .yarnrc*, yarn*, .eslint*, eslint*, .oxlint*, oxlint*, .prettier*, prettier*, .editorconfig"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "editor.formatOnSave": true
}
' > .vscode/settings.json
```
