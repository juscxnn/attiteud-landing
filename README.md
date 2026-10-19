# Attiteud

Corporate website for Attiteud, an independent technology company building intelligent software, infrastructure, and businesses. Gatekeep, an AI-native operating system for venture, is the flagship venture.

## Stack

- React 19 + TypeScript
- Vite
- Custom CSS with self-hosted IBM Plex Sans and IBM Plex Mono
- No runtime animation or routing dependencies

IBM Plex is licensed under the SIL Open Font License. The license is included at `public/fonts/LICENSE.txt`.

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
npm run preview
```

## Structure

```text
src/
  components/   Shared wordmark, section label, reveal, and asterisk mark
  sections/     Navigation, Hero, Company, Focus, Ventures, Closing, Footer
  index.css     Design system and responsive layout
index.html      Metadata, structured data, fonts, favicon
public/         Favicons, robots.txt, sitemap.xml, social image
vercel.json     Redirects, SPA rewrite, security headers
```

## Deployment

Production is hosted on Vercel as the `attiteud-landing` project and served at `https://attiteud.com`. Pushes to `main` deploy automatically through the Vercel Git integration.

For a manual deployment from the repository root:

```bash
vercel --prod
```
