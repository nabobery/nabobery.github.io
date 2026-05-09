# AGENTS.md — nabobery.github.io

## Quick Start

```bash
pnpm install    # Node >=22.12.0 required
pnpm dev        # localhost:4321
pnpm build      # outputs to dist/
```

## Tech Stack

- **Astro 6.x** (static site generator)
- **TypeScript** — type-check with `pnpm check`
- **pnpm** — package manager (NOT npm/yarn)
- **Oxlint + Oxfmt** — NOT ESLint/Prettier. Run `pnpm lint` and `pnpm fmt`
- **MDX** — supported for blog content
- **Fonts** — system UI stack (Hugo Coder–style); legacy Atkinson `.woff` files remain in `src/fonts/` unused

## Commands

| Command          | Action                   |
| ---------------- | ------------------------ |
| `pnpm dev`       | Dev server (port 4321)   |
| `pnpm build`     | Build to `dist/`         |
| `pnpm preview`   | Preview production build |
| `pnpm check`     | Astro type-check         |
| `pnpm lint`      | Oxlint (TypeScript/JS)   |
| `pnpm lint:fix`  | Oxlint with auto-fix     |
| `pnpm fmt`       | Oxfmt formatter          |
| `pnpm fmt:check` | Verify formatting        |

## Project Structure

```
src/
├── content/
│   ├── blog/        # Markdown/MDX → /posts/, /posts/{id}/
│   └── projects/    # Markdown/MDX → /projects/, /projects/{id}/
├── pages/
│   ├── tags/        # Taxonomy: index + [tag].astro → /tags/, /tags/{slug}/
│   ├── posts/       # Blog index + entry routes
│   └── projects/    # Projects index + entry routes
├── lib/
│   ├── readme.ts    # README fetch + sanitize at build time
│   └── tag-utils.ts # Tag slugs + index stats (blog + projects)
├── components/
├── layouts/
├── styles/
├── content.config.ts # Zod schemas for collections (`tags`, `categories`, etc.)
└── site.config.ts   # SITE_*, MAIN_NAV (includes Tags → /tags/), SOCIAL_LINKS
```

## Content

- **Blog posts**: Add `.md` / `.mdx` under `src/content/blog/` with frontmatter (`title`, `description`, `pubDate`, optional `tags`, `categories`, `heroImage`, …). **`tags`** feed `/tags/` and `/tags/{slug}/` (URLs use normalized slugs from labels; simple lowercase tokens like `programming` match legacy Hugo `/tags/programming/`).
- **Projects**: Add `.md` / `.mdx` under `src/content/projects/`; optional **`tags`** use the same taxonomy as blog posts. Most entries use **`readmeUrl`** for GitHub raw README → rendered HTML at build (requires network in CI/local build).

## Deployment

- **Target**: GitHub Pages via `withastro/action`
- **Trigger**: Push to `main` branch runs `.github/workflows/deploy.yml`
- **Manual**: Use `workflow_dispatch` in GitHub Actions
- **Note**: Build fetches remote READMEs — requires network in CI

## Style Config

- `.oxlintrc.json` — Oxlint rules (TypeScript, unicorn, oxc plugins)
- `.oxfmtrc.json` — Oxfmt ignores: `dist/`, `node_modules/`, `.astro/`, `.vscode/`
- `astro.config.mjs` — `site`, `trailingSlash: "always"`, `@astrojs/mdx`, `@astrojs/sitemap`; new static routes under `/tags/` are included in generated sitemaps alongside posts and projects

### Feeds & discovery

- **RSS**: `src/pages/rss.xml.js` → `/rss.xml` (blog collection)
