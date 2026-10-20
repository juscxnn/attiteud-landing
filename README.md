# Attiteud

**The future is built deliberately.**

Corporate site for an independent technology company building intelligent software, infrastructure, and businesses. Gatekeep, an AI-native operating system for venture, is the first public venture.

The site is a single, scrollable editorial page: a full-screen statement, a manifesto, the company, its focus, Gatekeep, independence, and contact. It is fully prerendered at build time and hydrated on the client.

## Stack

- React 19 + TypeScript
- Vite
- Custom CSS with self-hosted Newsreader and IBM Plex Sans / Mono
- `@lucasmarkes/hairline` for the Relay figure
- `react-dom/server` prerendering, no routing dependencies

Newsreader and IBM Plex are licensed under the SIL Open Font License. The licenses are included at `public/fonts/NEWSREADER-OFL.txt` and `public/fonts/LICENSE.txt`. Hairline is MIT licensed; see `public/hairline-license.txt`.

## Development

```bash
npm install
npm run dev
```

## Build and validation

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` type-checks, builds the client, then runs `scripts/prerender.mjs` to render the site into `dist/index.html`. The client hydrates that markup. Confirm the built HTML contains the page content, not only the root placeholder.

Check at 1440×900, 1024×768, 768×1024, 390×844, 375×667, 320×568, and 844×390. Verify keyboard focus, the mobile menu, reduced motion, and the Gatekeep link.

## Structure

```text
src/
  sections/     Header, Hero, Manifesto, Company, Focus, Venture, Independence, Contact, Footer
  components/   Wordmark, Reveal, Asterisk, RelayFigure
  App.tsx       Page composition
  entry-server.tsx  SSR entry used by the prerender script
  main.tsx      Hydration / client entry
  index.css     Dark editorial design system and responsive layout
scripts/
  prerender.mjs Injects the rendered page into dist/index.html
public/         Favicons, fonts, licenses, robots.txt, sitemap.xml, social image
index.html      Metadata, structured data, font preloads, favicon
vercel.json     Redirects, SPA rewrite, security headers
```

## Deployment

Production is hosted on Vercel as the `attiteud-landing` project and served at `https://attiteud.com`. Pushes to `main` deploy automatically through the Vercel Git integration.

For a manual deployment from the repository root:

```bash
vercel --prod
```
