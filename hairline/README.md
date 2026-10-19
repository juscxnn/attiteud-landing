# Hairline figures

The dictionary entry uses a bespoke Hairline figure, `strata`, as **Fig. 1**.
The source is `hairline/strata.js`; the validated standalone bench is
`hairline/strata-bench.html`.

The Ventures view uses Hairline’s `relay` figure as **Fig. 2**, themed in the
site’s dark palette.

`public/hairline/strata.html` is the minimal embed page used by the entry. It is
generated from the skill kernel, the figure source and `hairline/embed-template.html`:

```sh
node hairline/build-embed.mjs
```

The embed reads `?theme=light` or `?theme=dark`; the site uses the dark theme
and matches its plate colour to the raised dark surface.

The Hairline engine and figures are MIT licensed. See `hairline/LICENSE.txt`.

To re-check the figure after an edit, run from the repository root:

```sh
node .agents/skills/hairline-create/build.mjs hairline/strata.js
node .agents/skills/hairline-create/validate.mjs hairline-strata.html
node .agents/skills/hairline-create/look.mjs hairline/strata.js --answer 10,-10,48 --edge 54,74,0 --edge=-74,-54,0
```

The look writes `hairline-strata.html`, `hairline-strata-look.png`, the blind
sheet and the motion strip to the repository root. Move the bench over
`hairline/strata-bench.html` if the figure changed.
