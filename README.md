# Attiteud

**A small thing that makes a big difference.**

Attiteud is an independent technology company.

The site is one fixed screen: a monochrome dictionary entry for `at·ti·teud`, aligned to a translucent three-level grid. Random translucent rectangles and squares sit on the 96px subgrid, including single-cell blocks. Hovering each letter of the headword shifts it smoothly to strong green. Clicking an empty area adds another random block; blocks can be dragged and snap back to the subgrid. The email is the only link. There is no scrolling, navigation, or imagery. The page is HTML, CSS and a small vanilla script, built with Vite.

## Stack

- Vite
- One self-hosted typeface: Newsreader
- Plain HTML and CSS, with a small vanilla script for the block layer

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

`npm run build` builds the page into `dist/`; the only script should be the small block interaction file.

Check at 1440×900, 1024×768, 768×1024, 390×844, 375×667, 320×568, and 844×390. Confirm the page never scrolls, the grid aligns with the entry, the letter hover turns strong green, clicking adds a block, dragging moves it, the email is the only link, and no images are present.

## Structure

```text
index.html      The dictionary entry
styles.css      Monochrome grid, typography and responsive fit
script.js       Random grid blocks, click to add and drag
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
