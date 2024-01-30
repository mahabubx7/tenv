# Type-safe .env variable parser

This package is a type-safe parser for .env files. It is built for node.js based typescript applications.

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

```typescript
import 'dotenv/config'; // peer dependency (if you are using dotenv)
import Env from '@mx7/tenv';

const parsed = process.env as Record<string, string>;
const env = new Env(parsed); // instance of Env class

const port = env.key<number>('PORT', true).integer().unsigned().get();
// or, set a default value instead of make this required
const port = env.key<number>('PORT', 3000).integer().unsigned().get();

console.log(port); // i.e. 3000 as number
```

### More Information

| Method       | Description                                                                                                                                                                                                                                                                                                                  | Action                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `get()`      | Get the value of the environment variable. Should be called at last as chained                                                                                                                                                                                                                                               | value with<br>expected type |
| `key()`      | `key<T = string>(key: string, factor?: boolean \| T)` <br />Define the variable name as `key` & follow next:<br> - set `factor`: `true` if it is required!<br> - set `factor`: `false` or `undefined` (no need to pass) for accepting undefined value if not exists!<br> - set `factor`: `T` (generic) as your default value |                             |
| `email()`    | It will validate the passed string as email                                                                                                                                                                                                                                                                                  |                             |
| `url()`      | It will validate the passed string as url.<br>if it requires IPv6 address, do it as `url({ ipv6: true })`                                                                                                                                                                                                                    |                             |
| `integer()`  | It will validate the passed value as integer                                                                                                                                                                                                                                                                                 |                             |
| `signed()`   | It will validate the passed value as signed number                                                                                                                                                                                                                                                                           |                             |
| `unsigned()` | It will validate the passed value as unsigned number                                                                                                                                                                                                                                                                         |                             |
| `boolean()`  | It will validate the passed value as boolean                                                                                                                                                                                                                                                                                 |                             |

### Author

Made with ❤️ by [@mahabubx7](https://github.com/mahabubx7)

### Changelogs

| Version         | Released At | Description                                                                              |
| --------------- | ----------- | ---------------------------------------------------------------------------------------- |
| v0.7.7 `stable` | 2024-01-31  | First stable release with new feature => default value can attached with `key()` method  |
| v0.7.2 `beta`   | 2024-01-31  | Added more supports and fixes small & minor issues with changes                          |
| v0.7.0 `beta`   | 2024-01-30  | `@mx7/tenv` with nodejs v18.x LTS or later compatible for type-safe .env variable parser |
