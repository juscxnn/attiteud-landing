# Attiteud

**A small thing that makes a big difference.**

Attiteud is an independent technology company.

The site is one fixed screen: a dictionary entry for `at·ti·teud`, paired with a hairline operating dial. There is no navigation, no scrolling, and no second view. The dial carries **Develop / Own / Operate** around the Attiteud asterisk, cycling through the three steps.

## Stack

- React 19 + TypeScript
- Vite
- Custom CSS with self-hosted Newsreader and IBM Plex Mono
- SVG and CSS motion, no animation dependencies
- `react-dom/server` prerendering

Newsreader and IBM Plex are licensed under the SIL Open Font License. The licenses are included at `public/fonts/NEWSREADER-OFL.txt` and `public/fonts/LICENSE.txt`.

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

`npm run build` type-checks, builds the client, then runs `scripts/prerender.mjs` to render the site into `dist/index.html`. The client hydrates that markup.

Check at 1440×900, 1024×768, 768×1024, 390×844, 375×667, 320×568, and 844×390. Confirm the page never scrolls, the operating dial cycles, clicking a step selects it, and reduced motion stops the dial.

## Structure

```text
src/
  components/   Asterisk, OperatingDial
  App.tsx       The single-screen entry and operating model
  entry-server.tsx  SSR entry used by the prerender script
  main.tsx      Hydration / client entry
  index.css     Deep-green dictionary layout, dial and responsive fit
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
