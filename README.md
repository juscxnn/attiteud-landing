# Attiteud

**A small thing that makes a big difference.**

Attiteud is an independent technology company.

The site is one fixed screen: a monochrome dictionary entry for `at·ti·teud` on a translucent three-level grid. Hovering each letter of the headword shifts it to a lighter tone. The email is the only link. There is no scrolling, navigation, imagery, or client-side JavaScript. The page is plain HTML and CSS, built with Vite.

## Stack

- Vite
- One self-hosted typeface: Newsreader
- Plain HTML and CSS; no JavaScript runtime

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

`npm run build` builds the static page into `dist/`. There should be no JavaScript assets in the output.

Check at 1440×900, 1024×768, 768×1024, 390×844, 375×667, 320×568, and 844×390. Confirm the page never scrolls, contains no image or navigation, and the only link is the email.

## Structure

```text
index.html      The dictionary entry
styles.css      Monochrome typography and responsive fit
public/
  fonts/        Newsreader roman, italic and license
  robots.txt
  sitemap.xml
vercel.json     Redirects, SPA rewrite, security headers
```

## Deployment

Production is hosted on Vercel as the `attiteud-landing` project and served at `https://attiteud.com`. Pushes to `main` deploy automatically through the Vercel Git integration.

For a manual deployment from the repository root:

```bash
vercel --prod
```
