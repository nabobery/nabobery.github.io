# nabobery.github.io

Source for [Nabobery](https://github.com/nabobery/)’s public website at [nabobery.github.io](https://nabobery.github.io): a static **blog**, **project portfolio**, and supporting pages (**about**, **contact**). Content is authored in Markdown / MDX; the site ships as plain HTML.

## Tech stack

| Layer             | Details                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**     | [Astro 6](https://astro.build/), static output                                                                                                  |
| **Language**      | TypeScript (`pnpm check`)                                                                                                                       |
| **Content**       | Astro Content Collections (`src/content.config.ts`, Zod) — [docs](https://docs.astro.build/en/guides/content-collections/)                      |
| **Authoring**     | `@astrojs/mdx`                                                                                                                                  |
| **Feed & SEO**    | `@astrojs/rss`, `@astrojs/sitemap`                                                                                                              |
| **Lint / format** | [Oxlint](https://oxc.rs/), [Oxfmt](https://oxc.rs/) (see `.oxlintrc.json`, `.oxfmtrc.json`)                                                     |
| **Hosting**       | [GitHub Pages](https://pages.github.com/) via a custom GitHub Actions workflow — [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) |

Runtime dependencies include `marked` and `sanitize-html` for embedding remote GitHub READMEs on project pages at build time.

## Repository layout

| Concern                              | Path                                        | Public routes                                |
| ------------------------------------ | ------------------------------------------- | -------------------------------------------- |
| Blog posts                           | `src/content/blog/`                         | `/posts/`, `/posts/<id>/`                    |
| Projects                             | `src/content/projects/`                     | `/projects/`, `/projects/<id>/`              |
| Tag taxonomy (`tags` in frontmatter) | Blog + project content under `src/content/` | `/tags/`, `/tags/<slug>/`                    |
| Pages & endpoints                    | `src/pages/`                                | e.g. `/`, `/about/`, `/contact/`, `/rss.xml` |
| Navigation & site copy               | [`src/site.config.ts`](src/site.config.ts)  | —                                            |

Build output directory: **`dist/`**. URLs use trailing slashes (`trailingSlash: 'always'` in `astro.config.mjs`).

## Prerequisites

- **Node.js** ≥ **22.12.0** (`package.json` → `engines`)
- **Node.js / pnpm tooling** pinned in `package.json` (`devEngines.runtime` and `packageManager`)
- **pnpm 11.x** (lockfile-managed; avoid mixing npm/yarn)

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # writes dist/
pnpm preview      # serve dist/ locally
```

## Scripts

| Script           | Purpose                  |
| ---------------- | ------------------------ |
| `pnpm dev`       | Development server       |
| `pnpm build`     | Production build         |
| `pnpm preview`   | Preview `dist/`          |
| `pnpm check`     | Astro + TypeScript check |
| `pnpm lint`      | Oxlint                   |
| `pnpm lint:fix`  | Oxlint with autofix      |
| `pnpm fmt`       | Format with Oxfmt        |
| `pnpm fmt:check` | Verify formatting (CI)   |

## Deployment

Configure **GitHub Pages** to publish from **GitHub Actions**. Merges to **`main`** run the deploy workflow linked above.

The workflow now uses the standard Pages artifact flow instead of `withastro/action`. `package.json` is the source of truth for the Node and pnpm versions used in CI, and `pnpm-workspace.yaml` enables pnpm 11 build-script approval with a 24-hour release delay.

Project entries may set **`readmeUrl`** (raw GitHub markdown). **Build** and **CI** need outbound HTTPS to `raw.githubusercontent.com` where those URLs are used.

## Further documentation

For structure, tagging, and operational detail intended for contributors and automation see **[`AGENTS.md`](AGENTS.md)**.
