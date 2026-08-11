# AGENT.md

Context and conventions for working on this repository. Read before making changes.

## What this is

Personal portfolio and CV for Tobias Sittenauer, linked from a Buy Me a Coffee
profile. It must read as legitimate and complete (Stripe/BMAC review) and satisfy
German legal requirements (Impressum, DSGVO). It also doubles as a CV for clients
and recruiters.

## Stack

- React 19 + TypeScript 6 + Vite 7 + Tailwind 4. Single package at the repo root.
- **vite-react-ssg** (0.9-beta) prerenders every route to static HTML (SSG). No
  runtime server. Compatibility cap: vite-react-ssg supports Vite ≤7 and
  react-router ^6, and `@vitejs/plugin-react` 6 needs Vite 8, so **Vite is held at
  7, react-router at 6, plugin-react at 5**; everything else (React 19, TS 6,
  Tailwind 4.3) is current. Do not bump those three until vite-react-ssg supports
  Vite 8 / react-router 7.
- Served by nginx in a Docker image (`Dockerfile` builds the site, serves `dist`),
  deployed to Kubernetes. `nginx.conf`: pretty URLs, gzip, CSP + security headers,
  `/healthz`.
- No external requests at runtime: no Google Fonts, no analytics, no trackers.
  System font stack.

## Commands

```sh
npm install
npm run dev       # vite dev server
npm run build     # vite-react-ssg → dist (static)
npm run preview   # serve the build
# production image:
docker build -t portfolio . && docker run --rm -p 8080:5000 portfolio  # nginx listens on 5000
```

## Content style rules

- No em dashes anywhere. Use commas, parentheses, or colons. En dashes are fine in
  date ranges.
- Sentence case headings. Direct, no marketing fluff, no AI filler.
- English pages say "GDPR"; German says "DSGVO".
- One accent color (`--accent`, teal) plus `--accent-2` (blue) for open-source tags
  and the section/`hr` dividers. Dark default, light via toggle.

## Where things live

- **Copy / translations:** `src/i18n.ts`, one bilingual dictionary `{en, de}`.
  Plain strings via `t(lang, key)`; a few entries hold inline HTML and are rendered
  with `dangerouslySetInnerHTML` (hero role, about paragraphs, donation note,
  services CTA).
- **Design:** `src/styles.css` holds the Tailwind import and the CSS variables
  (accent colors, dark/light themes). Shared element classes live in `src/ui.tsx`.
- **CV:** `src/content/resume.en.md` / `resume.de.md`, imported with `?raw` and
  rendered by `src/pages/Resume.tsx`. Keep `public/resume.*.md` in sync (download
  links).
- **Pages/routes:** `src/main.tsx` (`/`, `/de`, `/cv`, `/de/cv`, `/imprint`,
  `/privacy`). The DE/EN toggle is a router link between the two URLs.
- **SEO:** `src/seo.tsx` renders per-page `<Head>` (title, canonical, hreflang).
  Legal pages are `noindex`.

## Legal pages

- Impressum and Datenschutz are German only (`src/pages/`).
- Tobias is a private individual (natural person): no company entity, no
  Handelsregister, no USt-IdNr. First person singular (ich/mein, never wir/uns).

## Commits

- Conventional Commits (commitlint): `type(scope): subject`. Short body.
- Do NOT add a Co-Authored-By trailer.