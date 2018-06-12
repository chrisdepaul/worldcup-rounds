# Set-up TypeScript and Babel

Use TypeScript for typechecking only. Use Babel for running in dev mode and for transcompilation.

### Install Packages

`yarn add @babel/core @babel/node @babel/preset-env @babel/cli @babel/preset-typescript @babel/plugin-transform-runtime @types/node typescript tsc-watch --dev`

### Create `.babelrc` in root

```
{
  "presets": [["@babel/preset-env", {
      "targets": {
          "node": "4.0.0"
      }
    }],
    "@babel/preset-typescript"
  ],
  "plugins": [
      ["@babel/plugin-transform-runtime", {
        "polyfill": false,
        "regenerator": true
      }
      ]
  ]
}
```

_Note: I'm using node 4.0.0 just to see the transcompilation. You can add configurations to the `@babel/preset-env` such as node and browser versions_

### TypeScript Lint and Config

Add a file named `tslint.json` that looks like the one in this folder.

Add a file named `tsconfig.json` that looks like the one in this folder. `tsconfig.json` has many config options and should be customized depending on the project. Ensure that `"noEmit"` is set to `true`.

```
{
  "compilerOptions": {
    "module": "commonjs",
    "noEmit": true,
    "noImplicitAny": false,
    "moduleResolution": "node",
    "baseUrl": ".",
    "allowJs": true,
    "pretty": true,
    "skipLibCheck": true,
    "lib": ["es2015", "es2016"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.*", "**/*.spec.*"]
}
```

### `package.json` scripts

```
"scripts": {
    "clean:build": "rm -rf dist",
    "build": "yarn clean:build && yarn type && babel src -d dist --extensions '.ts,.tsx,.js,.jsx'",
    "dev": "tsc-watch --onSuccess \"yarn start:dev\"",
    "start:dev": "babel-node --extensions '.ts,.tsx,.js,.jsx' ./src/index.ts",
    "type": "tsc",
    "test": "jest"
}
```

# Add `jest` with TypeScript support

### Install `jest` packages

`yarn add jest @types/jest ts-jest --dev`

\_Note: `ts-jest` is required for typescript projects. `babel-jest`is also required, but it comes with `jest` already.

### Create `jest.config.js`

```
{
  "testPathIgnorePatterns": [
    "<rootDir>/node_modules/",
    "<rootDir>/dist"
  ],
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": ["ts", "js", "node"],
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "transformIgnorePatterns": ["node_modules"]
}
```

_Note: Since we have a .babelrc file, we don't need to explicitly add babel-jest to the transform. This will be done automatically_

### `package.json` scripts

```
{
  "scripts": {
    "test": "jest --config jest.config.json"
  }
}
```

# Mock Functions
