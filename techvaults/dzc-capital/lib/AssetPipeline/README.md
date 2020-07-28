## Asset Pipeline

A simple opinionated and non-extendable tool for managing assets. Has the following features
- Install dependencies
- Build source(src) into destination(any)
- Watch for file changes for rebuild

## Notes

- Ensure all paths provided in CLI and config files are absolute paths

## Components

- Babel
- Webpack
- Typsescript
- Sass

## Setup

- Initialize the assets folder with `yarn init`
- Add asset configuration file `asset.config.js`

```js

module.exports = {
    exlude: [ 'lib' ], // folder names to not read
    destination: '/path/to/dest/directory'
}

```

- Add typescript configuration file `tsconfig.json`

```json

{
    "compilerOptions": {
        "sourceMap": true,
        "removeComments": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules"
    ]
}

```
- Add convenient scripts in package.json

```json
{
    "scripts": {
        "build": "yarn asset build",
        "watch": "cross-env NODE_ENV=development yarn asset watch",
        "asset": "cross-env NODE_PATH=$(pwd)/node_modules yarn setup node /path/to/manage.js --root $(pwd)"
    }
}
```

- Install needed dependenies

```bash

$ yarn add cross-env --dev
$ yarn asset

```

- Manage other necessary dependenies as you would normally with `yarn`
