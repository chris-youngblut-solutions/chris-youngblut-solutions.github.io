# chris-youngblut-solutions.github.io

Source for my portfolio, served at <https://chris-youngblut-solutions.github.io>.

A static [Astro](https://astro.build) site built in the Cabin design system — day/night theming,
self-hosted fonts, and a strict Content-Security-Policy (no inline scripts or styles). It hosts the
project catalog, the case-study write-ups, a note on how I co-author with Claude, and a résumé. The
same build later moves to a self-hosted host; only the host changes.

## Develop

```sh
pnpm install
pnpm dev                  # local dev server
pnpm build                # static build → dist/
pnpm check                # astro check
pnpm exec biome check .   # lint + format
```

GitHub Pages builds and deploys `main` via `.github/workflows/deploy.yml`.
