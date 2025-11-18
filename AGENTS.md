# AGENTS.md

This file provides guidance for AI coding agents working with this Hugo-based personal blog and portfolio website.

## Project Overview

This is a static site built with Hugo and deployed to GitHub Pages. It features blog posts, project showcases, and personal information.

- **Site Generator**: Hugo (Extended version)
- **Theme**: Hugo Coder (forked as `hugocoder`)
- **Deployment**: GitHub Pages via GitHub Actions
- **Content**: Markdown files in `/content`
- **Live Site**: https://nabobery.github.io/

## Development Workflow

### Local Development

Always use the Hugo development server while working on the site:

```bash
hugo server -D
```

This starts the server with drafts enabled and watches for file changes. Access the site at `http://localhost:1313`.

**Common Hugo Server Options:**
- `-D` - Include draft content
- `--disableFastRender` - Full rebuilds on changes
- `--port=1313` - Specify port (default: 1313)
- `--browser` - Auto-open in browser
- `--buildFuture` - Include future-dated content
- `--buildExpired` - Include expired content

### Theme Management

The Hugo Coder theme is managed as a git submodule at `/themes/hugocoder`:
- **Repository**: https://github.com/nabobery/hugo-coder.git
- **Commit**: f69d6d6da728790a5f0bb1c5e2047174bc8f185c

When cloning or pulling theme updates:
```bash
git submodule update --init --recursive
```

## Content Management

### Creating New Content

Use Hugo's archetype system to create new content:

```bash
# New blog post
hugo new posts/my-post-title.md

# New project page
hugo new projects/my-project.md

# New page
hugo new page-name.md
```

### Content Structure

```
content/
├── about.md          # About page
├── contact.md        # Contact page
├── posts/            # Blog posts
│   └── *.md
└── projects/         # Project showcases
    └── *.md
```

### Frontmatter Format

All content files use YAML frontmatter:

```yaml
---
title: "Your Title Here"
date: 2024-01-15T10:00:00+05:30
description: "Brief description for SEO and previews"
authors: ["Nabobery"]
tags: ["tag1", "tag2"]
categories: ["category"]
draft: false
---
```

**Supported taxonomies**: `authors`, `tags`, `categories`, `series`

## Custom Shortcodes

### GitHub README Shortcode

Fetches and renders GitHub README files client-side:

```markdown
{{< github_readme url="https://raw.githubusercontent.com/user/repo/main/README.md" >}}
```

Used extensively in project pages. Requires `marked.js` library (already included).

### Contact Shortcode

Renders social media links from site config:

```markdown
{{< contact >}}
```

## Build and Deployment

### Local Build

Build the static site locally:

```bash
hugo --minify
```

Output goes to `/public` directory (git-ignored).

### Automated Deployment

**DO NOT manually deploy.** The site auto-deploys via GitHub Actions when you push to the `main` branch.

**Workflow**: `.github/workflows/gh-pages.yml`
- Triggers on push to `main` branch
- Builds with `hugo --minify`
- Deploys to `gh-pages` branch
- Uses Hugo Extended latest version

## Configuration

### Main Config

All site configuration is in `config.toml`:

```toml
baseURL = 'https://nabobery.github.io/'
title = "Nabobery"
theme = "hugocoder"
languageCode = 'en-us'
```

**Key Parameters** (`[params]`):
- `author` - Site author name
- `description` - Site meta description
- `avatarURL` - Profile picture path
- `colorScheme` - "auto", "dark", or "light"
- `dateFormat` - Display format for dates
- `enableTwemoji` - Twitter emoji support

**Menu Items** (`[[languages.en.menu.main]]`):
1. About (weight: 1)
2. Blog (weight: 2)
3. Projects (weight: 3)
4. Contact me (weight: 5)

**Social Links** (`[[params.social]]`):
- GitHub, LinkedIn, Discord, Email, dev.to

### Modifying Configuration

When you change `config.toml`, restart the Hugo server for changes to take effect:
```bash
# Stop server with Ctrl+C, then:
hugo server -D
```

## Layout Customization

Custom layouts override theme defaults:

```
layouts/
├── projects/          # Custom project templates
│   ├── li.html       # List item template
│   ├── list.html     # List page template
│   └── single.html   # Single project template
└── shortcodes/       # Reusable content components
    ├── contact.html
    └── github_readme.html
```

**To customize**:
1. Copy template from `themes/hugocoder/layouts/...`
2. Paste to `layouts/...` with same path structure
3. Modify as needed

## Static Assets

```
static/
├── images/           # Images served as-is
│   ├── avatar.webp  # Profile picture
│   └── logos/       # Favicon files
└── js/              # JavaScript files
    └── marked.min.js
```

Files in `/static` are served at the site root. Access with `/images/filename.ext`.

## Testing

Before committing content changes:

1. **Build locally** to check for errors:
   ```bash
   hugo --minify
   ```

2. **Review in browser** with dev server:
   ```bash
   hugo server -D
   ```

3. **Check generated HTML** (optional):
   ```bash
   ls -la public/
   ```

4. **Validate links** (if link checker installed):
   ```bash
   # Example with external tool
   htmlproofer ./public --disable-external
   ```

## Common Commands

| Command | Purpose | Use During Development |
|---------|---------|----------------------|
| `hugo server -D` | Start dev server with drafts | ✅ Yes - always |
| `hugo new content/posts/title.md` | Create new content | ✅ Yes |
| `hugo --minify` | Build production site | ✅ Yes - for testing |
| `git submodule update --init` | Update theme submodule | ✅ Yes - after clone |
| `hugo deploy` | Manual deployment | ❌ No - automated via CI |

## Code Conventions

### File Naming

- **Content files**: Use kebab-case: `my-blog-post.md`
- **Image files**: Use descriptive names: `avatar.webp`, not `img1.webp`
- **Lowercase only**: All filenames should be lowercase

### Markdown Style

- **Headings**: Use ATX style (`#` not underlines)
- **Lists**: Use `-` for unordered lists
- **Links**: Use reference-style for repeated URLs
- **Images**: Include alt text: `![Alt text](url)`
- **Code blocks**: Always specify language: ````markdown` ```bash

### TOML/YAML

- **Indentation**: 2 spaces (YAML), not tabs
- **Arrays**: Use inline format for short arrays: `["tag1", "tag2"]`
- **Strings**: Quote strings with spaces or special characters

## Troubleshooting

### Common Issues

**Theme not loading**:
```bash
git submodule update --init --recursive
```

**Changes not appearing**:
1. Check if file is marked `draft: true`
2. Restart Hugo server: `Ctrl+C` then `hugo server -D`
3. Try with `--disableFastRender` flag

**Build errors**:
- Check frontmatter YAML syntax (colons, indentation)
- Verify shortcode syntax (double curly braces)
- Ensure all required frontmatter fields are present

**404 errors in production**:
- Verify `baseURL` in `config.toml` matches deployment URL
- Check that content files aren't drafts
- Ensure `canonifyurls = true` in config

## Git Workflow

1. **Create feature branch**: `git checkout -b feature/description`
2. **Make changes**: Edit content, layouts, or config
3. **Test locally**: `hugo server -D` and review in browser
4. **Build test**: `hugo --minify` to check for errors
5. **Commit**: `git add .` and `git commit -m "Clear message"`
6. **Push**: `git push origin feature/description`
7. **Create PR**: Merge to `main` after review
8. **Auto-deploy**: GitHub Actions deploys to production

## Additional Resources

- **Hugo Docs**: https://gohugo.io/documentation/
- **Hugo Coder Theme**: https://github.com/luizdepra/hugo-coder
- **GitHub Pages**: https://pages.github.com/
- **Site README**: See `README.md` for setup and general information

## Notes for Agents

- **Never commit** the `/public` directory (it's git-ignored)
- **Always test** content changes with `hugo server -D` before committing
- **Preserve** existing frontmatter structure when editing content
- **Use shortcodes** for dynamic content (GitHub READMEs, contact info)
- **Restart server** after config changes
- **Keep theme** as submodule; don't modify files in `/themes` directly
- **Follow conventions** for file naming and markdown style
- **Check build** success in GitHub Actions after pushing to main
