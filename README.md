# quinn.center

The website of the Quinn Center for Animal Welfare Innovation: one page, a blog, and a newsletter
archive, built with [Astro](https://astro.build) as a static site. No database, no framework
JavaScript, one script for the phone menu.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # writes dist/
npm run preview    # serves dist/ for a last look
```

Node 22 (`.nvmrc`).

## Write a post

Posts are Markdown files with a few lines of frontmatter. Copy the template and rename it; the
file name is the URL.

| Kind | Folder | URL |
|---|---|---|
| Blog | `src/content/blog/` | `/blog/<file-name>/` |
| Newsletter | `src/content/newsletter/` | `/newsletter/<file-name>/` |

```yaml
---
title: "Sentence case, please"
date: 2026-11-15
description: "One or two sentences for the list page, the feed, and search engines."
draft: false          # true keeps it out of the build
author: "Firstname Lastname"   # optional
---
```

Files starting with `_` are templates and never build (`_example.md` in each folder). A build
fails on a missing or mistyped field, on purpose. Both kinds appear in `/feed.xml`, newest first,
and the newest three on the home page. The Blog link in the header appears with the first
published post.

## Edit the site

| What | Where |
|---|---|
| Home page copy and sections | `src/pages/index.astro` |
| Organization facts: name, email, Discord, GitHub, tagline, description | `src/site.ts` |
| Leadership (name, role, bio; an empty bio is hidden) | `src/data/team.json` |
| Header links and footer | `src/components/Header.astro`, `src/components/Footer.astro` |
| Colors, type, layout | `src/styles/global.css` (the brand tokens are at the top) |
| Fonts (self-hosted, SIL OFL) | `public/fonts/`, `src/styles/fonts.css` |
| Logos and icons | `public/brand/`, `public/favicon*`, `public/apple-touch-icon.png` |
| Headers served by Cloudflare | `public/_headers` |

A photo of Quinn: put it in `public/images/` and set `quinnPhoto` in `src/site.ts` to its path.

## Newsletter signup

The subscribe form posts to [Buttondown](https://buttondown.com). Create the account, then set
`newsletter.buttondown` in `src/site.ts` to the Buttondown username. Until it is set, the site shows
a "Subscribe by email" button that opens a message to the contact address instead, so nothing is
broken before the account exists.

Each newsletter issue is published here first; the same Markdown is then pasted into a Buttondown
email. The site is the archive.

## Brand

The brand guide lives with the organization's documents. The parts this site uses: royal purple
`#513793`, indigo `#2F3A8C`, silver lavender `#CACDE2`, cream `#F7F3EC`, ink `#2A2723`; Fraunces
for headlines, Source Sans 3 for everything else; sentence case; links underlined; white text only
on purple or ink. The reversed (white) lockup goes only on purple or dark grounds.

## Deploy

The build is a folder of files (`dist/`). Either host works:

- **Cloudflare Workers (static assets):** `wrangler.jsonc` is ready; connect the repository in the
  Cloudflare dashboard with build command `npm run build` and deploy command `npx wrangler deploy`,
  or run those two locally. `public/_headers` sets the security headers.
- **GitHub Pages:** publish `dist/` with the official Astro action (`withastro/action`) and add a
  `CNAME` file containing `quinn.center` to `public/`.

CI (`.github/workflows/ci.yml`) builds every pull request and push to `main` and keeps the output as
an artifact for a week; it deploys nothing.
