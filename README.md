# nabobery.github.io

Personal site and blog for [Nabobery](https://github.com/nabobery/), built with [Astro](https://astro.build/) and deployed to [GitHub Pages](https://pages.github.com/) via [withastro/action](https://github.com/withastro/action).

- **Blog:** Markdown in `src/content/blog/` (routes under `/posts/`)
- **Projects:** Metadata in `src/content/projects/`; most pages pull README content from GitHub at build time (`readmeUrl` in frontmatter)
- **Site config:** `src/site.config.ts` (nav, social links, SEO helpers)

## Commands

| Command          | Action                                                                |
| ---------------- | --------------------------------------------------------------------- |
| `pnpm install`   | Install dependencies                                                  |
| `pnpm dev`       | Dev server (default port 4321)                                        |
| `pnpm build`     | Output static site to `dist/`                                         |
| `pnpm preview`   | Preview production build                                              |
| `pnpm lint`      | [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) (TypeScript/JS) |
| `pnpm lint:fix`  | Oxlint with safe fixes                                                |
| `pnpm fmt`       | [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) (format)      |
| `pnpm fmt:check` | Verify formatting (e.g. in CI)                                        |

Config: `.oxlintrc.json`, `.oxfmtrc.json`. Oxfmt ignores `dist/`, `node_modules/`, `.astro/`, `.vscode/` (see `.oxfmtrc.json`).

## Deployment

Repository **Settings → Pages**: source **GitHub Actions** (not a legacy `gh-pages` branch). Workflow: `.github/workflows/deploy.yml`.

Production README fetches require network access during `pnpm build` (for example in CI).

## Credits

Started from the official Astro blog template. Theme styling inherits the minimal “Bear Blog”-inspired starter.
