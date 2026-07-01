// @ts-check

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// Interim host = GitHub Pages user-site (chris-youngblut-solutions.github.io),
// served at the root, so `base` stays "/" (the default). When the same build
// later moves to the self-hosted VRTX/Cloudflare host, only `site` changes.
export default defineConfig({
  site: "https://chris-youngblut-solutions.github.io",
  output: "static",
  // About became the landing (2026-07-01); keep the old route resolving.
  redirects: { "/about": "/" },
  integrations: [react(), sitemap()],
  prefetch: { defaultStrategy: "viewport" },
  // Prism (class-based) instead of Shiki (inline styles) so case-study code
  // blocks stay CSP-compatible (no unsafe-inline for styles).
  markdown: { syntaxHighlight: "prism" },
  // Strict CSP (Astro 6 stable). Astro hashes its own bundled scripts/styles +
  // inline scripts and emits a <meta> CSP with matching sha256 hashes — no
  // `unsafe-inline`. Incompatible with <ClientRouter /> view transitions
  // (dropped in Base.astro). GitHub Pages can't set HTTP headers, so the
  // structural directives the Caddy host would serve are added to the same
  // <meta> here via `directives`. (`frame-ancestors` + HSTS can't be enforced
  // through <meta>; accepted on Pages — they return with the Caddy host.)
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
    },
  },
});
