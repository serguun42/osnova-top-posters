# Osnova Top Posters

Frontend for [Osnova Top Posters](https://serguun42.ru/osnova-top-posters/) built with React 18. Based on [Cacher-Frontend-React](https://github.com/serguun42/cacher-frontend-react).

## Configuration, building and launching

All configuration, npm and webpack scripts are modified ones from `react-scripts eject` with specific purposes of this project.

### Commands

- `npm i --production` – Install only necessary npm dependencies. Or install everything with `npm i` for development.
- `npm run start` – Start dev server. Files `.env.dtf` and `.env.tj` will not be used so consider creating [local environment file](#local-environment)
- `npm run build:SITE` – [More about environment and builds](#sites-build-environment)
- `npm run lint` – Check project with `eslint`
- `npm run generate-openapi-redoc` – Build static Redoc API – [more about API](#api)

### Sites build environment

- `npm run build:tj` – Generate TJournal version of frontend using environment file [`.env.tj`](./.env.tj)
- `npm run build:dtf` – Generate DTF version of frontend using environment file [`.env.dtf`](./.env.dtf)

Files [`.env.dtf`](./.env.dtf) and [`.env.tj`](./.env.tj) contain environment variables for building scripts and for client usage. Some of those env variables:

| name                          | description/type                                                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `REACT_APP_VERSION`           | Same as in [`package.json`](./package.json). Used for client cache control                                              |
| `BUILD_PATH`                  | Build directory for webpack output                                                                                      |
| `GENERATE_SOURCEMAP`          | Explicitly set to `false` (but modification in [`webpack.config.js`](./config/webpack.config.js#L32) allows to skip it) |
| `PUBLIC_URL`                  | Root of project                                                                                                         |
| `REACT_APP_SITE_CODE`         | `dtf` or `tj`                                                                                                           |
| `REACT_APP_SITE_SHORT`        | `DTF` or `TJ`                                                                                                           |
| `REACT_APP_SITE_LONG`         | `DTF` or `TJournal`                                                                                                     |
| `REACT_APP_SITE_LINK`         | `dtf.ru` or `tjournal.ru`                                                                                               |
| `REACT_APP_PRIMARY_COLOR`     | Hex color, used in [manifest](./config/manifest.template.json) and [`index.html`](./public/index.html) templates        |
| `REACT_APP_CDN_DOMAIN`        | Origin of Osnova's CDN                                                                                                  |

You may pass more variables, see standard `react-scripts` and `webpack` docs.

### Local environment

You may create own local env (e.g. [.env.development.local](./.env.development.local)). It needs everything from [build env](#sites-build-environment) and contains optional values:

- set `HTTPS=true` to use https on local development server. If applied, set `SSL_CRT_FILE` and `SSL_KEY_FILE` as paths to certificate and key files.
- `PORT` – port of dev server.
- `DISABLE_ESLINT_PLUGIN=true` – disables esling plugin for webpack (warning overlay).

### Manifest and PWA

Manifest is built with `npm run build` from [template](./config/manifest.template.json) in [`scripts/build`](./scripts/build.js#L213). PWA is controlled by [Service Worker](./public/service-worker.js) (*Cache first for static, network first for API*) and [`cache.js`](./src/util/cache.js).

---

### [BSL-1.0 License](./LICENSE)
