# Attiteud

**A small thing that makes a big difference.**

Attiteud is an independent technology company.

The site is one fixed light-blue screen: a small teardrop-spoked asterisk and serif `A.` mark, the company name, the slogan, and a single email link. A soft cloud drifts slowly across the background and loops without a seam. There is no scrolling, navigation, or JavaScript. The page is plain HTML and CSS, built with Vite.

## Stack

- Vite
- One self-hosted typeface: Newsreader
- Plain HTML and CSS

Newsreader is licensed under the SIL Open Font License. The license is included at `public/fonts/NEWSREADER-OFL.txt`.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

`npm run build` builds the page into `dist/`.

Check at 1440×900, 1024×768, 768×1024, 390×844, 375×667, 320×568, and 844×390. Confirm the page never scrolls, the logo, name, slogan, and email all fit, the cloud layer and favicon load, the email is the only link, and the cloud stops moving when reduced motion is requested.

## Structure

```text
index.html        The title page
styles.css        Paper palette, typography and responsive fit
public/
  favicon.png     The asterisk mark, transparent
  clouds.webp     The drifting cloud layer
  fonts/          Newsreader roman, italic and license
  robots.txt
  sitemap.xml
vercel.json       Redirects and security headers
```

## Deployment

Production is hosted on Vercel as the `attiteud-landing` project and served at `https://attiteud.com`. Pushes to `main` deploy automatically through the Vercel Git integration.

For a manual deployment from the repository root:

```bash
vercel --prod
```
