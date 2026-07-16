# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and human developers when working with code in this repository.

## Project Overview

`pipeline-js-api-client` is a small browser JavaScript client for the Pipeline CRM API v3 (`https://api.pipelinedeals.com/api/v3`). The npm package name is `PipelineDeals` (legacy org name — the product is Pipeline CRM; never call it "Pipeline Deals" in new code or comments).

It is consumed by `pipeline_deals` as a **git dependency pinned to a version tag**:

```json
"PipelineDeals": "PipelineDeals/pipeline-js-api-client.git#v0.0.7"
```

The build output (`lib/` — CommonJS, the package `main`) is **committed to git**, so consumers install straight from a git ref with no build step. That means source changes ship only when `lib/` is rebuilt and committed.

Package manager: Yarn (Yarn 1 `yarn.lock`; CI runs `yarn install --frozen-lockfile`). Never use npm or pnpm for installs here — the `npm run` calls inside the `build` script are script-chaining only.

## Common Development Commands

```bash
yarn install        # install dependencies

yarn lint           # eslint src (eslint-config-standard)
yarn test           # karma --single-run: Jasmine+Chai+Sinon specs in headless Chrome
yarn build          # lint + clean + rebuild lib/ (CommonJS), es/ (ES modules), dist/ (UMD)
```

Granular build steps (what `yarn build` chains): `clean` (rimraf dist lib), `build:lib` (babel → `lib/`), `build:es` (babel with `BABEL_ENV=es` → `es/`), `build:umd` / `build:umd:min` (webpack → `dist/`).

### Testing

- `yarn test` runs Karma once in ChromeHeadless (needs Chrome installed; Karma discovers it, or set `CHROME_BIN` as CI does).
- Specs live in `spec/src/*_spec.js` (pattern `spec/**/*_spec.js`), bundled through webpack + babel before running (see `karma.conf.js`).
- Watch mode: `npx karma start` (config has `autoWatch: true`, `singleRun: false`).
- There is no per-file CLI filter; to focus, use Jasmine's `fdescribe`/`fit` (remove before committing).
- CI (CircleCI, `.circleci/config.yml`): `cimg/node:18.19-browsers` image, installs Chrome via the browser-tools orb, then `yarn install --frozen-lockfile && yarn test`. That is the entire gate — no separate lint job (lint runs inside `yarn build`, which CI does not run).

## Architecture

```
src/
  index.js            # entry: default-exports Client; named exports IphoneAuth, Requester, makePaginateable
  Client.js           # facade: new Client(auth, apiBase?) + factory methods (people(), companies(), ...)
  Requester.js        # GET/POST/PUT/DELETE wrapper; merges auth into every request
  fetcher.js          # fetch() wrapper: query-string building (qs, bracket arrays), JSON headers,
                      # 2xx check -> ResponseError otherwise, 204 -> {}
  ResponseError.js    # error carrying the raw Response
  makePaginateable.js # wraps a list response in an iterator that fetches subsequent pages
  IphoneAuth.js       # legacy mobile auth endpoint helper
  <Resource>.js       # one class per API resource: Account, Companies, People, Person, Notes,
                      # NoteCategories, Users, Profile, LeadSources, DealLossReasons,
                      # CustomFieldGroups, CustomFieldLabels, CustomFieldLabelDropdownEntries
lib/                  # committed babel CommonJS output (package main) — regenerate, don't hand-edit
spec/src/             # Karma/Jasmine specs (fetcher, Requester, makePaginateable)
```

Request flow: `Client` method → resource class (`__basePath` + `__urlFor`) → `client.request/post/put/delete` → `Requester` (prefixes `apiBase`, merges `auth`) → `fetcher` (builds URL, executes fetch, raises `ResponseError` on non-2xx).

Auth: the `auth` object passed to `new Client(auth)` is spread into the query string of every request (Pipeline CRM API v3 uses `api_key` / `app_key` query params).

## Conventions Observed

- ES modules in `src/`, transpiled by Babel (`.babelrc`: preset-env targeting last 2 Chrome versions, corejs 3 usage polyfills).
- eslint-config-standard style: no semicolons, 2-space indent, space before function parens.
- Resource classes follow one template: constructor stores `__basePath` and `__client`; methods are thin one-liners delegating to the client. Copy an existing resource (e.g. `src/People.js`) when adding one.
- "Private" fields use the `__` double-underscore prefix convention (not `#` private fields).
- List endpoints that paginate go through `makePaginateable` so callers can iterate pages.

## Release Flow (manual)

There is no publish workflow. To release:

1. Make source changes in `src/` with specs.
2. `yarn build` (regenerates `lib/`, `es/`, `dist/`) and commit the regenerated output.
3. Bump `version` in `package.json`.
4. Tag `vX.Y.Z` and push the tag.
5. Bump the pinned ref in the consumer (`pipeline_deals/package.json`) and `yarn install` there.

## Pitfalls

- **Editing `src/` without rebuilding `lib/` ships nothing.** Consumers load the committed `lib/` output. Every behavioral PR should include the regenerated build artifacts.
- **Never hand-edit `lib/`, `es/`, or `dist/`** — they are babel/webpack output and get overwritten by `yarn build`.
- **Tests run in a real (headless) browser**, not Node/jsdom. `fetch` comes from the `whatwg-fetch` UMD polyfill loaded by Karma; Node-only APIs are unavailable in specs.
- **Spec coverage is thin** (fetcher, Requester, makePaginateable only — no per-resource specs). Don't assume green CI validates a resource-class change; check the query/body it produces.
- **`ResponseError` carries the raw `Response`** — the body is not consumed. Callers must call `.json()`/`.text()` themselves if they need error details.
- **The default `apiBase` is the legacy domain** (`api.pipelinedeals.com`); consumers can pass an override as the second `Client` constructor arg.

## Docs

- `README.md` is title-only; this file and the source are the documentation.
- CI: `.circleci/config.yml`. Test config: `karma.conf.js`.
- Pipeline CRM API v3 (the API this wraps): https://app.pipelinecrm.com/api/docs
