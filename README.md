# Attiteud

**Software that acts.**

Attiteud is an independent technology company building agentic software, infrastructure, and ventures. Gatekeep is its first public venture.

The site is a single scrollable statement: a live agent field, a thesis on agency, the stack we build, Gatekeep, the company, and contact. A black frame, bone field, and signal orange carry the identity. It is fully prerendered at build time and hydrated on the client.

## Stack

- React 19 + TypeScript
- Vite
- Custom CSS with self-hosted Archivo and IBM Plex Mono
- Canvas agent field, SVG system diagram and Gatekeep signal map
- `react-dom/server` prerendering, no routing dependencies

Archivo and IBM Plex are licensed under the SIL Open Font License. The licenses are included at `public/fonts/ARCHIVO-OFL.txt` and `public/fonts/LICENSE.txt`.

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

Check at 1440×900, 1024×768, 768×1024, 390×844, 375×667, 320×568, and 844×390. Verify the live agent field, the orange menu, keyboard focus, reduced motion, the system diagram, and the Gatekeep link.

## Structure

```text
src/
  sections/     Header, Hero, Thesis, Systems, Venture, Company, Contact, Footer
  components/   Mark, Wordmark, SectionIndex, Reveal, AgentField, SystemDiagram, SignalMap
  App.tsx       Page composition
  entry-server.tsx  SSR entry used by the prerender script
  main.tsx      Hydration / client entry
  index.css     Bone, ink and signal system, responsive layout and motion
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
