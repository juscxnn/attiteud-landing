# Attiteud

**Attiteud is a small thing that makes a big difference.**

Corporate site for an independent technology company building intelligent software, infrastructure, and businesses. Gatekeep, an AI-native operating system for venture, is the flagship venture.

The site is a fixed, no-scroll dark “dictionary entry”: the landing view is the word entry for `attiteud`, and Company / Ventures / Contact are one-screen views switched in place.

## Stack

- React 19 + TypeScript
- Vite
- Custom CSS with self-hosted IBM Plex Sans and IBM Plex Mono
- `@lucasmarkes/hairline` for the interactive isometric figures
- No page scrolling and no routing dependencies

IBM Plex is licensed under the SIL Open Font License. The license is included at `public/fonts/LICENSE.txt`. Hairline is MIT licensed; see `hairline/LICENSE.txt`.

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

The no-scroll shell should be checked at 1440×900, 1440×800, 1024×768, 768×1024, 390×844, 375×667, 320×568, and 844×390.

## Structure

```text
src/
  views/        Entry, Company, Ventures and Contact views
  sections/     Persistent navigation and footer rail
  components/   Wordmark, strata figure, relay figure, asterisk mark
  index.css     Dark design system, view transitions and responsive fit
hairline/       Bespoke Hairline figure source, bench, template and license
public/         Favicons, fonts, robots.txt, sitemap.xml, social image, embed
index.html      Metadata, structured data, fonts, favicon
vercel.json     Redirects, SPA rewrite, security headers
```

Views are all rendered in the DOM. Inactive views are `inert` and hidden from assistive technology; navigating changes the URL hash without scrolling.

## Deployment

Production is hosted on Vercel as the `attiteud-landing` project and served at `https://attiteud.com`. Pushes to `main` deploy automatically through the Vercel Git integration.

For a manual deployment from the repository root:

```bash
vercel --prod
```
