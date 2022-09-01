# `retext-case-police`

[![NPM](https://img.shields.io/npm/v/@julian_cataldo/retext-case-police)](https://www.npmjs.com/package/@julian_cataldo/retext-case-police)
[![ISC License](https://img.shields.io/npm/l/@julian_cataldo/remark-lint-frontmatter-schema)](./LICENSE)  
[![VS Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?logo=visual%20studio%20code)](https://code.visualstudio.com)
[![unified](https://img.shields.io/badge/uni-fied-0366d6?logo=markdown)](https://unifiedjs.com)  
[![TypeScript](https://img.shields.io/badge/TypeScript-333333.svg?logo=typescript)](http://www.typescriptlang.org/)
[![Prettier](https://img.shields.io/badge/Prettier-333333.svg?logo=prettier)](https://prettier.io)
[![EditorConfig](https://img.shields.io/badge/EditorConfig-333333.svg?logo=editorconfig)](https://editorconfig.org)
[![ESLint](https://img.shields.io/badge/ESLint-3A33D1?logo=eslint)](https://eslint.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

A `retext` plugin for checking popular names casing.

Examples:

- ⚠️ `macbook` → ✅ **`MacBook`**
- ⚠️ `MacOS` → ✅ **`macOS`**
- 🤔…
- ⚠️ `ESBuild` → ✅ **`esbuild`**
- ⚠️ `eslint` → ✅ **`ESLint`**
- 😭…

For:

- [Abbreviates](https://github.com/antfu/case-police/blob/main/dict/abbreviates.json)
- [Brands](https://github.com/antfu/case-police/blob/main/dict/brands.json)
- [General](https://github.com/antfu/case-police/blob/main/dict/general.json)
- [Products](https://github.com/antfu/case-police/blob/main/dict/products.json)
- [Softwares](https://github.com/antfu/case-police/blob/main/dict/softwares.json)

---

Dictionaries are from [`case-police`](https://github.com/antfu/case-police).

# Demo

![Demo screenshot of this retext plugin](./docs/screenshot.png)

# Quick start

## Installation

```sh
pnpm install @julian_cataldo/retext-case-police
```

## Usage

```ts
import retextCasePolice from '@julian_cataldo/retext-case-police';

// …
  .use(retextCasePolice)
// …

// ——————— With options ————v

// Ignore words
  .use(retextCasePolice, { ignore: ['GitHub'] })

```

## To do

- [x] Ignore words
- [ ] Resolve Parcel stripping out `assert { type: 'json' }`
- [ ] Ignore links (e.g `https://` wrongly flagged)
- [ ] Custom dictionaries embedding?

---

See [CHANGELOG.md](./CHANGELOG.md) for release history.

---

🔗  [JulianCataldo.com](https://www.juliancataldo.com)
