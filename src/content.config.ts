import { defineCollection } from "astro:content";
import { z } from "astro:schema";
import { glob } from "astro/loaders";

// Case studies — the "Writing" section. The markdown body holds the verified
// detail. The problem-class lead (the problem → mapping the universe → the
// solution stack → obstacles & nuance → where it lands) lives in
// src/data/case-study-mechanisms.ts, keyed by slug, so the structured content
// is type-checked rather than authored as fragile nested frontmatter.
const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    lenses: z.array(z.string()).default([]),
    order: z.number().default(99),
    repo: z.object({ name: z.string(), url: z.string() }).optional(),
  }),
});

export const collections = { caseStudies };
