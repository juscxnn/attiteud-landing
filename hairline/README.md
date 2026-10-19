# Hairline figures

The live site uses Hairline’s `relay` figure in the Ventures view.

The bespoke `strata` study is archived here as a standalone piece: source
`hairline/strata.js`, validated bench `hairline/strata-bench.html`. It is not
currently mounted on the site.

The Hairline engine and figures are MIT licensed. See `hairline/LICENSE.txt`.

To re-check the archived figure, run from the repository root:

```sh
node .agents/skills/hairline-create/build.mjs hairline/strata.js
node .agents/skills/hairline-create/validate.mjs hairline-strata.html
node .agents/skills/hairline-create/look.mjs hairline/strata.js --answer 10,-10,48 --edge 54,74,0 --edge=-74,-54,0
```

The look writes `hairline-strata.html`, `hairline-strata-look.png`, the blind
sheet and the motion strip to the repository root. Move the bench over
`hairline/strata-bench.html` if the figure changes.
