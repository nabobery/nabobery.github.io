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
│   ├── blog/     # Markdown posts → /posts/
│   └── projects/ # Project entries → /projects/
├── pages/        # Astro pages (index, about, contact, etc.)
├── components/   # Astro components
├── layouts/      # Page layouts
└── site.config.ts # Site metadata, nav, social links
```

## Content

- **Blog posts**: Add `.md` files to `src/content/blog/` with frontmatter (`title`, `description`, `pubDate`, `tags`, `categories`)
- **Projects**: Add `.md` to `src/content/projects/`; most use `readmeUrl` to pull README content from GitHub at build time (requires network access)

## Deployment

- **Target**: GitHub Pages via `withastro/action`
- **Trigger**: Push to `main` branch runs `.github/workflows/deploy.yml`
- **Manual**: Use `workflow_dispatch` in GitHub Actions
- **Note**: Build fetches remote READMEs — requires network in CI

## Style Config

- `.oxlintrc.json` — Oxlint rules (TypeScript, unicorn, oxc plugins)
- `.oxfmtrc.json` — Oxfmt ignores: `dist/`, `node_modules/`, `.astro/`, `.vscode/`
- `astro.config.mjs` — `trailingSlash: always`, MDX, sitemap integrations
