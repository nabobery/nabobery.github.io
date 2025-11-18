# CLAUDE.md

This file provides Claude-specific guidance and context for working with this Hugo-based personal blog and portfolio website.

## Quick Reference

- **Repository**: nabobery.github.io
- **Owner**: Nabobery (Avinash Changrani)
- **Type**: Personal blog and portfolio
- **Tech Stack**: Hugo (Extended) + GitHub Pages
- **Live URL**: https://nabobery.github.io/
- **Main Branch**: `main`
- **Deployment**: Automated via GitHub Actions

## Repository Purpose

This is a personal website serving multiple purposes:

1. **Technical Blog**: Share experiences, challenges, and solutions in computer science
2. **Project Portfolio**: Showcase programming projects with GitHub README integration
3. **Personal Expression**: Anime reviews, video game discussions, and personal thoughts
4. **Professional Presence**: Contact information and professional links

The site reflects the owner's journey as a developer, their interests in technology and anime, and serves as a hub for sharing knowledge with the community.

## Architecture Overview

### Hugo Static Site Generator

This site uses **Hugo Extended** (latest version) for the following capabilities:

- **Fast builds**: Hugo is written in Go and extremely performant
- **Hot reload**: Live browser refresh during development
- **Asset pipeline**: Built-in SCSS processing, minification, and optimization
- **Content organization**: Taxonomies (tags, categories, series, authors)
- **Template system**: Go templates with layouts, partials, and shortcodes
- **Multilingual support**: Though currently English-only, the framework supports i18n

### Theme Architecture

The site uses a **forked version** of Hugo Coder theme:

- **Original**: https://github.com/luizdepra/hugo-coder
- **Fork**: https://github.com/nabobery/hugo-coder.git (as `hugocoder`)
- **Integration**: Git submodule at `/themes/hugocoder`
- **Customization**: Local overrides in `/layouts` directory

**Why forked?** Allows customization while maintaining ability to pull upstream updates.

### Deployment Pipeline

```
Local Development (hugo server)
         ↓
    Commit & Push to main
         ↓
GitHub Actions Workflow Triggered
         ↓
1. Checkout code + submodules
2. Setup Hugo Extended (latest)
3. Build with hugo --minify
4. Deploy to gh-pages branch
         ↓
GitHub Pages serves from gh-pages
         ↓
    Live at nabobery.github.io
```

## Content Strategy

### Content Types

**1. Blog Posts** (`/content/posts/`)
- Personal articles and technical write-ups
- Anime and video game reviews
- Technology discussions and learning experiences
- Format: Standard markdown with YAML frontmatter

**2. Project Pages** (`/content/projects/`)
- Technical project showcases (11 projects currently)
- Often use `{{< github_readme >}}` shortcode to pull content from GitHub
- Examples: Advent of Code, Kaggle Competitions, AI/ML projects
- Format: Markdown with frontmatter + dynamic GitHub README embedding

**3. Static Pages** (`/content/`)
- **About**: Personal introduction and background
- **Contact**: Social links and contact methods (uses `{{< contact >}}` shortcode)

### Taxonomies in Use

The site uses Hugo's taxonomy system for content organization:

```toml
[taxonomies]
category = "categories"  # Broad content groupings
series = "series"       # Related content series
tag = "tags"           # Specific topics/keywords
author = "authors"     # Post authorship (single author currently)
```

**Current usage**:
- Primary author: "Nabobery"
- Categories help organize content by type
- Tags provide topical navigation
- Series can group multi-part content

## Custom Development Patterns

### Shortcode: GitHub README Embedding

**File**: `/layouts/shortcodes/github_readme.html`

**Purpose**: Dynamically fetch and render GitHub README files within project pages.

**How it works**:
1. Takes a `url` parameter pointing to raw GitHub README
2. Uses JavaScript + Marked.js for client-side rendering
3. Calculates reading time dynamically
4. Adds "View on GitHub" link back to repository
5. Styles content to match site theme

**Usage in content**:
```markdown
{{< github_readme url="https://raw.githubusercontent.com/nabobery/repo/main/README.md" >}}
```

**Why this approach?**
- Keeps project documentation DRY (single source of truth)
- README updates automatically reflect on the website
- No manual content duplication between GitHub and site

**Dependencies**:
- Requires `/static/js/marked.min.js` (Markdown parser)
- Client-side JavaScript enabled

### Shortcode: Contact Widget

**File**: `/layouts/shortcodes/contact.html`

**Purpose**: Render social media links configured in `config.toml`.

**How it works**:
1. Reads `[[params.social]]` array from site config
2. Renders Font Awesome icons for each platform
3. Creates styled link buttons
4. Responsive and theme-aware

**Configured platforms**:
- GitHub: https://github.com/nabobery/
- LinkedIn: https://www.linkedin.com/in/avinash-changrani/
- Discord: User ID 406718496609665025
- Email: avinashchangranii99@gmail.com
- dev.to: https://dev.to/nabobery

**Usage**:
```markdown
{{< contact >}}
```

### Custom Layouts: Projects Section

**Files**:
- `/layouts/projects/list.html` - Projects index page
- `/layouts/projects/single.html` - Individual project page
- `/layouts/projects/li.html` - Project list item component

**Features**:
- Box-based card design with shadows
- Hover effects with smooth transitions
- Dark mode support via CSS custom properties
- Displays: title, date, description
- Links to full project pages

**CSS approach**:
- Uses CSS custom properties for theming
- Variables like `--card-background`, `--card-border`
- Allows theme switching without JavaScript
- Responsive design with media queries

## Development Workflow for Claude

### When Making Content Changes

1. **Understand the content type**:
   - Blog post → `/content/posts/filename.md`
   - Project page → `/content/projects/filename.md`
   - Static page → `/content/filename.md`

2. **Create new content with Hugo**:
   ```bash
   hugo new posts/my-new-post.md
   ```
   This uses the archetype at `/archetypes/default.md` to scaffold frontmatter.

3. **Edit frontmatter carefully**:
   - Date format: `2024-01-15T10:00:00+05:30` (ISO 8601 with timezone)
   - Set `draft: false` when ready to publish
   - Add appropriate tags, categories, authors

4. **Test locally**:
   ```bash
   hugo server -D  # Includes drafts
   ```
   Access at http://localhost:1313

5. **Verify build**:
   ```bash
   hugo --minify
   ```
   Check for errors before committing.

### When Modifying Layouts/Templates

1. **Understand Hugo's template lookup order**:
   - Hugo checks `/layouts` first, then `/themes/hugocoder/layouts`
   - Create overrides in `/layouts` to customize without modifying theme

2. **Template syntax**:
   - Go templates: `{{ .Title }}`, `{{ range .Pages }}`
   - Partials: `{{ partial "header.html" . }}`
   - Shortcodes: `{{< shortcode_name param="value" >}}`

3. **Test thoroughly**:
   - Hugo templates fail silently sometimes
   - Check browser console for JavaScript errors
   - Verify both desktop and mobile views

4. **Common template variables**:
   - `.Title` - Page title
   - `.Content` - Page content (rendered markdown)
   - `.Date` - Page date
   - `.Params` - Custom frontmatter parameters
   - `.Site.Params` - Global site parameters from config.toml

### When Updating Configuration

1. **Location**: All config in `config.toml`

2. **Key sections**:
   - Base settings: `baseURL`, `title`, `theme`
   - Parameters: `[params]` - site-wide settings
   - Menus: `[[languages.en.menu.main]]` - navigation items
   - Social: `[[params.social]]` - social media links
   - Taxonomies: `[taxonomies]` - content organization

3. **After changes**:
   - Restart Hugo server (Ctrl+C, then `hugo server -D`)
   - Some changes may require clearing browser cache
   - Config errors can break entire site - validate TOML syntax

### When Working with Theme

1. **Never modify** files in `/themes/hugocoder` directly
   - Changes would be lost on submodule updates
   - Use `/layouts` overrides instead

2. **To update theme**:
   ```bash
   cd themes/hugocoder
   git pull origin main
   cd ../..
   git add themes/hugocoder
   git commit -m "Update theme submodule"
   ```

3. **To customize**:
   - Copy template from theme to `/layouts` with same path
   - Modify the copy
   - Hugo will use your version instead of theme's

## File Structure Deep Dive

```
nabobery.github.io/
│
├── .github/
│   └── workflows/
│       └── gh-pages.yml          # GitHub Actions deployment workflow
│
├── archetypes/
│   └── default.md               # Template for new content (hugo new)
│
├── content/                     # All site content (markdown)
│   ├── about.md                # About page
│   ├── contact.md              # Contact page
│   ├── posts/                  # Blog posts
│   │   ├── helloworld.md
│   │   ├── spy_x_family.md     # Anime review
│   │   └── vivy_fluorite_eyes_song.md
│   └── projects/               # Project showcase (11 files)
│       ├── advent-of-code.md
│       ├── personal-blog.md
│       ├── kaggle-competitions.md
│       ├── project-mads.md
│       ├── project-war.md
│       ├── eduhack.md
│       ├── before-you-sign.md
│       ├── maze-solver-using-ai.md
│       └── attribute-based-pedestrian-detection.md
│
├── layouts/                     # Custom templates (override theme)
│   ├── projects/
│   │   ├── li.html             # Project list item component
│   │   ├── list.html           # Projects index page template
│   │   └── single.html         # Individual project page template
│   └── shortcodes/
│       ├── contact.html        # Social links widget
│       └── github_readme.html  # GitHub README embedder
│
├── resources/
│   └── _gen/                   # Auto-generated assets (SCSS → CSS)
│
├── static/                      # Static assets (served as-is)
│   ├── images/
│   │   ├── avatar.webp         # Profile picture
│   │   └── logos/              # Favicon files
│   └── js/
│       └── marked.min.js       # Markdown parser for GitHub README shortcode
│
├── themes/
│   └── hugocoder/              # Git submodule: forked Hugo Coder theme
│
├── config.toml                  # Hugo configuration (TOML format)
├── .gitignore                  # Git ignore rules (excludes public/, etc.)
├── .gitmodules                 # Git submodule configuration
├── LICENSE                     # MIT License
├── README.md                   # Human-readable documentation
├── AGENTS.md                   # AI agent guidance (this companion file)
└── CLAUDE.md                   # This file - Claude-specific context
```

## Important Conventions

### File Naming

- **Content files**: kebab-case, descriptive: `my-blog-post.md`
- **No spaces**: Use hyphens instead: `advent-of-code.md`, not `advent of code.md`
- **Lowercase**: All filenames should be lowercase
- **Descriptive**: Avoid generic names like `post1.md`, use `spy-x-family-review.md`

### Markdown Style

Following consistent markdown style helps readability:

```markdown
# Heading 1 (page title - usually auto-generated from frontmatter)

## Heading 2 (main sections)

### Heading 3 (subsections)

- Use hyphens for unordered lists
- Not asterisks or plus signs

1. Numbered lists
2. Use sequential numbering

**Bold text** for emphasis

*Italic text* for lighter emphasis

[Link text](https://example.com) for external links

![Alt text](/images/filename.webp) for images
```

### Frontmatter Standards

**Complete example**:
```yaml
---
title: "My Awesome Blog Post"
date: 2024-01-15T10:00:00+05:30
description: "A concise description for SEO and social sharing"
authors: ["Nabobery"]
tags: ["hugo", "web development", "blogging"]
categories: ["Technology"]
series: []
draft: false
---
```

**Field guidelines**:
- `title`: Clear, descriptive, title case
- `date`: ISO 8601 with timezone (+05:30 is IST)
- `description`: 1-2 sentences, SEO-focused
- `authors`: Always include "Nabobery"
- `tags`: Specific topics, lowercase, 2-5 tags recommended
- `categories`: Broad grouping, title case
- `draft`: Set to `false` when ready to publish

### Code Style in Content

When including code blocks in markdown content:

````markdown
```language
code here
```
````

**Always specify language** for proper syntax highlighting:
- `bash` for shell commands
- `javascript` or `js` for JavaScript
- `python` or `py` for Python
- `go` for Go code
- `html` for HTML
- `css` for CSS
- `toml` for TOML config
- `yaml` for YAML frontmatter examples

## Testing and Quality Assurance

### Pre-Commit Checklist

Before committing content or code changes:

- [ ] **Local build succeeds**: `hugo --minify` completes without errors
- [ ] **Content renders correctly**: Check in browser via `hugo server -D`
- [ ] **Frontmatter is valid**: YAML syntax is correct, required fields present
- [ ] **Links work**: Internal and external links resolve properly
- [ ] **Images load**: Static assets are in `/static` and paths are correct
- [ ] **Mobile responsive**: Check on smaller viewport sizes
- [ ] **Draft status**: Set `draft: false` if content is ready for production
- [ ] **No broken shortcodes**: `{{< shortcode >}}` syntax is correct
- [ ] **Config is valid**: If modified, TOML syntax is correct

### Common Pitfalls

**Frontmatter issues**:
- ❌ Using tabs instead of spaces in YAML
- ❌ Missing quotes around strings with special characters
- ❌ Incorrect date format (must be ISO 8601)
- ❌ Missing colon after field name

**Markdown issues**:
- ❌ Not specifying code block language
- ❌ Incorrect shortcode syntax (use `{{<` not `{{`)
- ❌ Broken image paths (remember `/static` maps to site root)

**Build issues**:
- ❌ Modified theme files instead of creating overrides
- ❌ Forgot to update submodules after clone
- ❌ Config.toml syntax errors (unclosed quotes, missing commas)

**Deployment issues**:
- ❌ Pushing to wrong branch (should be `main` for auto-deploy)
- ❌ Committing `/public` directory (it's ignored for a reason)
- ❌ Not checking GitHub Actions workflow status after push

## Understanding the Build Process

### Hugo Build Pipeline

1. **Content Processing**:
   - Reads all `.md` files from `/content`
   - Parses YAML frontmatter
   - Renders markdown to HTML
   - Applies taxonomy processing (tags, categories)

2. **Template Application**:
   - Matches content type to template
   - Checks `/layouts` first, then `/themes/hugocoder/layouts`
   - Processes Go template syntax
   - Includes partials and shortcodes

3. **Asset Pipeline**:
   - Processes SCSS to CSS
   - Minifies CSS, JS, HTML (with `--minify` flag)
   - Optimizes images (if image processing used)
   - Copies `/static` contents to output root

4. **Output Generation**:
   - Creates HTML files in `/public`
   - Generates RSS feeds, sitemaps
   - Creates taxonomy pages (tag pages, category pages)
   - Builds pagination for list pages

5. **Result**:
   - Complete static site in `/public`
   - No database, no server-side code
   - Ready to serve via any static host

### GitHub Actions Workflow

**File**: `.github/workflows/gh-pages.yml`

**Triggers**:
- Any push to `main` branch
- Pull requests (build only, no deploy)

**Steps**:
1. **Checkout** (`actions/checkout@v3`):
   - Clones repository
   - Includes `submodules: true` to fetch theme
   - Uses `fetch-depth: 0` for full git history (needed for `.GitInfo`, `.Lastmod`)

2. **Setup Hugo** (`peaceiris/actions-hugo@v2`):
   - Installs latest Hugo Extended version
   - Extended version required for SCSS processing

3. **Build**:
   - Runs `hugo --minify`
   - Builds site to `/public`
   - Fails workflow if build errors occur

4. **Deploy** (`peaceiris/actions-gh-pages@v3`):
   - Only runs if: `github.ref == 'refs/heads/main'`
   - Uses `GITHUB_TOKEN` for authentication
   - Publishes `/public` to `gh-pages` branch
   - GitHub Pages serves from `gh-pages` branch

**What this means**:
- **Local development**: Work freely, test with `hugo server`
- **Push to feature branch**: Triggers build check (no deploy)
- **Merge to main**: Automatically deploys to production
- **No manual deployment**: Never run `hugo deploy` manually

## Working with Hugo Shortcodes

Shortcodes are Hugo's way of embedding reusable, dynamic content in markdown.

### Syntax

**Without inner content**:
```markdown
{{< shortcode_name param="value" >}}
```

**With inner content**:
```markdown
{{< shortcode_name >}}
Inner markdown or HTML content here
{{< /shortcode_name >}}
```

### Built-in Hugo Shortcodes

Hugo provides several built-in shortcodes:

- `{{< ref "path/to/page.md" >}}` - Reference to another page
- `{{< relref "path/to/page.md" >}}` - Relative reference
- `{{< figure src="/images/pic.jpg" title="Title" >}}` - Enhanced image
- `{{< highlight language >}}code{{< /highlight >}}` - Syntax highlighting
- `{{< tweet user="username" id="123" >}}` - Embed tweet
- `{{< youtube id="video-id" >}}` - Embed YouTube video

### Custom Shortcodes in This Site

**1. GitHub README** (`github_readme.html`):
```markdown
{{< github_readme url="https://raw.githubusercontent.com/user/repo/main/README.md" >}}
```
- Fetches README from GitHub via JavaScript
- Renders with Marked.js
- Adds reading time calculation
- Includes "View on GitHub" link

**2. Contact Widget** (`contact.html`):
```markdown
{{< contact >}}
```
- Renders social links from `config.toml`
- No parameters needed
- Styled with Font Awesome icons

### Creating New Shortcodes

If you need to create a new shortcode:

1. Create file in `/layouts/shortcodes/shortcode-name.html`
2. Use Hugo template syntax
3. Access parameters with `.Get "param_name"`
4. Use in content with `{{< shortcode-name param="value" >}}`

**Example** - simple alert shortcode:
```html
<!-- /layouts/shortcodes/alert.html -->
<div class="alert alert-{{ .Get "type" }}">
  {{ .Inner }}
</div>
```

**Usage**:
```markdown
{{< alert type="warning" >}}
This is a warning message!
{{< /alert >}}
```

## Git Workflow Best Practices

### Branch Strategy

**Main branch** (`main`):
- Production-ready code
- Auto-deploys to live site
- Protect with branch protection rules
- Only merge tested, reviewed code

**Feature branches**:
- Create from `main`: `git checkout -b feature/new-blog-post`
- Naming: `feature/description`, `fix/bug-description`, `content/post-title`
- Test thoroughly before merging
- Delete after merging to keep repo clean

### Commit Messages

Follow conventional commit format:

```
type(scope): brief description

Longer explanation if needed
```

**Types**:
- `feat`: New feature or content
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `content`: Content updates (blog posts, projects)
- `config`: Configuration changes

**Examples**:
```
feat(posts): add Spy x Family anime review
fix(layouts): correct project card hover effect
docs: update README with new setup instructions
content(projects): update Advent of Code project description
config: add new social media link to config.toml
```

### Pull Request Workflow

1. Create feature branch
2. Make changes and test locally
3. Commit with clear messages
4. Push to GitHub
5. Create Pull Request to `main`
6. Verify GitHub Actions build succeeds
7. Review changes in PR
8. Merge to `main`
9. Auto-deployment occurs
10. Verify live site

## Troubleshooting Guide

### Hugo Server Issues

**Problem**: Changes not appearing in browser
**Solutions**:
1. Check if file has `draft: true` (won't show without `-D` flag)
2. Restart Hugo server (Ctrl+C, then `hugo server -D`)
3. Clear browser cache (Shift+Cmd+R or Shift+Ctrl+R)
4. Try `hugo server --disableFastRender`

**Problem**: "Template not found" error
**Solutions**:
1. Check template file path matches Hugo's lookup order
2. Ensure template file has correct extension (`.html`)
3. Verify template syntax is valid Go template code

**Problem**: SCSS not processing
**Solutions**:
1. Ensure Hugo Extended is installed: `hugo version`
2. Check `config.toml` has `enableInlineSass = true`
3. Verify SCSS files are in correct location

### Build Errors

**Problem**: `hugo --minify` fails with frontmatter error
**Solutions**:
1. Check YAML syntax in frontmatter
2. Ensure date format is correct (ISO 8601)
3. Quote strings with colons or special characters
4. Use 2-space indentation, not tabs

**Problem**: Build fails with "shortcode not found"
**Solutions**:
1. Check shortcode file exists in `/layouts/shortcodes/`
2. Verify shortcode name matches filename (without `.html`)
3. Check shortcode syntax in content: `{{<` not `{{`

**Problem**: Images not loading
**Solutions**:
1. Verify images are in `/static/images/`
2. Reference from site root: `/images/filename.ext`
3. Check file extensions match (case-sensitive)
4. Ensure images were committed to git

### Deployment Issues

**Problem**: GitHub Actions workflow fails
**Solutions**:
1. Check workflow logs in GitHub Actions tab
2. Verify `config.toml` syntax is valid
3. Ensure all content files have valid frontmatter
4. Check that theme submodule is properly configured

**Problem**: Site deployed but showing 404
**Solutions**:
1. Verify `baseURL` in `config.toml` is correct
2. Check content files aren't marked as drafts
3. Ensure `gh-pages` branch exists and has content
4. Verify GitHub Pages is enabled in repo settings

**Problem**: Theme not loading on deployed site
**Solutions**:
1. Confirm theme submodule committed: `git submodule status`
2. Check workflow includes `submodules: true` in checkout step
3. Verify theme name in `config.toml` matches directory name

### Content Issues

**Problem**: Syntax highlighting not working
**Solutions**:
1. Specify language in code fence: ````bash`
2. Check `pygmentsCodeFences = true` in config
3. Verify `pygmentsStyle` is set

**Problem**: Taxonomies (tags/categories) not generating pages
**Solutions**:
1. Ensure `[taxonomies]` section exists in `config.toml`
2. Check frontmatter uses correct taxonomy field names
3. Rebuild with `hugo --minify`

**Problem**: GitHub README shortcode not rendering
**Solutions**:
1. Verify `/static/js/marked.min.js` exists
2. Check URL points to raw GitHub content
3. Look for JavaScript errors in browser console
4. Ensure JavaScript is enabled in browser

## Performance Optimization

### Build Performance

Hugo is already extremely fast, but for large sites:

- **Use `.GitInfo` sparingly**: Requires full git history (`fetch-depth: 0`)
- **Limit build scope**: Use `hugo server --renderToDisk=false` for faster dev
- **Cache resources**: Hugo caches in `/resources/_gen`
- **Optimize images**: Use WebP format (like `avatar.webp`)

### Runtime Performance

The static site is inherently fast, but:

- **Minify output**: Always use `hugo --minify` for production
- **Optimize images**: Compress and use modern formats
- **Lazy load**: Consider lazy loading for images below fold
- **CDN**: GitHub Pages includes CDN, no additional config needed
- **HTTP/2**: GitHub Pages supports HTTP/2 automatically

### SEO Optimization

Already implemented:
- ✅ Descriptive titles in frontmatter
- ✅ Meta descriptions via `description` field
- ✅ Clean URLs via Hugo's permalink system
- ✅ Sitemap generation (automatic)
- ✅ RSS feed (automatic)
- ✅ Canonical URLs via `canonifyurls = true`

Consider adding:
- Structured data (JSON-LD) for better search results
- Social media meta tags (Open Graph, Twitter Cards)
- Google Analytics or privacy-friendly alternative
- Webmaster tools verification

## Security Considerations

### Static Site Security

Static sites are inherently more secure than dynamic sites:

- ✅ No server-side code execution
- ✅ No database to compromise
- ✅ No user authentication to attack
- ✅ No form submissions (unless using third-party service)

### GitHub Actions Security

- ✅ Uses `GITHUB_TOKEN` (automatically provided, scoped)
- ✅ No manual secret management needed
- ✅ Workflow only deploys from `main` branch
- ✅ No third-party credentials stored

### Content Security

When adding content:
- Don't commit sensitive information (API keys, passwords)
- Be cautious with third-party JavaScript (like `marked.js` - use CDN with SRI)
- Validate user-generated content if ever added
- Keep dependencies updated (Hugo, theme, libraries)

### Theme Submodule Security

- Pin theme to specific commit (currently: `f69d6d6da728790a5f0bb1c5e2047174bc8f185c`)
- Review theme updates before pulling
- Fork theme to maintain control (already done: `nabobery/hugo-coder`)

## Future Enhancement Ideas

Based on the current structure, potential improvements:

### Content Enhancements
- **Search functionality**: Add client-side search with Fuse.js or Lunr.js
- **Comments**: Integrate Disqus, Utterances (GitHub issues), or giscus
- **Newsletter**: Add newsletter signup (Mailchimp, Buttondown)
- **RSS improvements**: Separate RSS feeds for posts vs projects

### Technical Improvements
- **Image optimization**: Implement Hugo image processing for responsive images
- **Asset bundling**: Use Hugo Pipes for JS/CSS bundling
- **Service worker**: Add offline support with PWA capabilities
- **Dark mode toggle**: Add manual toggle (currently respects system preference)

### Analytics & Monitoring
- **Privacy-friendly analytics**: Plausible, Fathom, or GoatCounter
- **Uptime monitoring**: StatusCake, UptimeRobot
- **Performance monitoring**: Lighthouse CI in GitHub Actions
- **Broken link checker**: Automated link validation

### Content Management
- **CMS integration**: Forestry.io, NetlifyCMS, or Decap CMS
- **Content calendar**: Editorial calendar for blog posts
- **Draft previews**: Deploy previews for draft content
- **Content templates**: More archetypes for different content types

## Claude-Specific Tips

### When User Asks to Create New Content

1. **Determine content type**: Blog post or project page?
2. **Use Hugo new command**: `hugo new posts/title.md` or `hugo new projects/title.md`
3. **Populate frontmatter**: Ensure all required fields are filled
4. **Ask about draft status**: Should this be published immediately?
5. **Test locally**: Always run `hugo server -D` to preview
6. **Commit with clear message**: `content(posts): add new blog post about X`

### When User Asks to Modify Site

1. **Understand the scope**: Content, layout, config, or assets?
2. **Check existing patterns**: Look at similar files first
3. **Create overrides, not modifications**: Don't edit theme files
4. **Test thoroughly**: Both build and dev server
5. **Document changes**: If significant, update AGENTS.md or CLAUDE.md

### When User Asks About Deployment

1. **Explain automation**: Deployment is automatic on push to `main`
2. **Check GitHub Actions**: Guide user to check workflow status
3. **Verify configuration**: Ensure `baseURL` and `publishDir` are correct
4. **Don't suggest manual deployment**: The workflow handles it

### When User Reports Issues

1. **Reproduce locally**: Try to recreate with `hugo server -D`
2. **Check build**: Run `hugo --minify` to see build errors
3. **Review recent changes**: Use `git log` and `git diff`
4. **Check GitHub Actions**: Look at workflow logs
5. **Consult Hugo docs**: https://gohugo.io/documentation/

### When User Wants to Customize Theme

1. **Don't modify theme directly**: Always create overrides in `/layouts`
2. **Copy from theme**: `cp themes/hugocoder/layouts/path/file.html layouts/path/file.html`
3. **Modify copy**: Make changes to the file in `/layouts`
4. **Test**: Restart Hugo server and verify changes
5. **Commit both**: Commit the new override file

## Additional Resources

### Official Documentation
- **Hugo**: https://gohugo.io/documentation/
- **Hugo Coder Theme**: https://github.com/luizdepra/hugo-coder
- **GitHub Pages**: https://docs.github.com/en/pages
- **GitHub Actions**: https://docs.github.com/en/actions

### Useful Tools
- **Hugo Extended**: Required for SCSS processing
- **Marked.js**: JavaScript markdown parser (used in shortcodes)
- **Font Awesome**: Icon library for social links

### Community Resources
- **Hugo Discourse**: https://discourse.gohugo.io/
- **Hugo GitHub**: https://github.com/gohugoio/hugo
- **Hugo Themes**: https://themes.gohugo.io/

### Learning Resources
- **Hugo Quick Start**: https://gohugo.io/getting-started/quick-start/
- **Hugo Templates**: https://gohugo.io/templates/introduction/
- **Go Templates**: https://pkg.go.dev/text/template

## Conclusion

This Hugo-based personal blog is well-structured, automated, and maintainable. The combination of Hugo's speed, GitHub Actions' automation, and GitHub Pages' hosting creates a powerful, free, and performant publishing platform.

**Key takeaways for Claude**:
- Test locally with `hugo server -D` before committing
- Never modify theme files; use `/layouts` overrides
- Deployment is automatic; don't intervene manually
- Follow established conventions for content and code
- Consult this file and AGENTS.md for guidance
- When in doubt, check Hugo docs or ask the user

**Remember**: This site is a personal expression of the owner's journey, interests, and knowledge. Respect the tone, style, and content strategy established in existing posts and pages.
