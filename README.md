# Type-safe .env variable parser

This package is a type-safe parser for.env files. It is built for node.js based typescript applications.

### Installation

**Recommending NodeJS v18.x (LTS) or later**

> This package cannot load the environment variables itself. You need to use something like `dotenv` or latest NodeJs built-in env-file loader

```bash
$ npm i @mx7/tenv
# or
$ yarn add @mx7/tenv
# or
$ pnpm add @mx7/tenv
```

### Sample Usages

**ESM**

```typescript
import 'dotenv/config'; // peer dependency (if you are using dotenv)
import Env from '@mx7/tenv';

const parsed = process.env as Record<string, string>;
const env = new Env(parsed); // instance of Env class

const port = env.key<number>('PORT', true).integer().unsigned().get();

console.log(port); // i.e. 3000 as number
```

**CommonJs**

```typescript
require('dotenv').config(); // peer dependency (if you are using dotenv)
const Env = require('@mx7/tenv');

const parsed = process.env as Record<string, string>;
const env = new Env(parsed); // instance of Env class

const port = env.key<number>('PORT', true).integer().unsigned().get();

console.log(port); // i.e. 3000 as number
```

### More Information

| Method       | Description                                                                                                                        | Action                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `get()`      | Get the value of the environment variable. Should be called at last as chained                                                     | value with<br>expected type |
| `key()`      | `key<T = string>(key: string, required?: boolean)` <br />Define the variable name as `key` & pass true next to it if it's required | `n/a`                       |
| `email()`    | It will validate the passed string as email                                                                                        | `n/a`                       |
| `url()`      | It will validate the passed string as url.<br>if it requires IPv6 address, do it as `url({ ipv6: true })`                          | `n/a`                       |
| `integer()`  | It will validate the passed value as integer                                                                                       | `n/a`                       |
| `signed()`   | It will validate the passed value as signed number                                                                                 | `n/a`                       |
| `unsigned()` | It will validate the passed value as unsigned number                                                                               | `n/a`                       |
| `boolean()`  | It will validate the passed value as boolean                                                                                       | `n/a`                       |

### Author

Made with ❤️ by [@mahabubx7](https://github.com/mahabubx7)

### Changelogs

| Version       | Released At | Description                                                                              |
| ------------- | ----------- | ---------------------------------------------------------------------------------------- |
| v0.7.0 `beta` | 2024-01-30  | `@mx7/tenv` with nodejs v18.x LTS or later compatible for type-safe .env variable parser |
