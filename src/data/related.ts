// Cross-links between the two content models: project umbrellas
// (/projects/<slug>, src/data/projects.ts) and the deep case studies
// (/writing/<slug>, src/content/case-studies/). Several themes appear as BOTH
// a short umbrella and a long case study; these maps wire short ↔ deep so the
// two sections aren't siloed. One umbrella may map to several case studies.
export const projectToCaseStudies: Record<string, string[]> = {
  "inference-tuning": ["gfx1150-inference"],
  interfaces: ["spaces"],
  "governance-trust-safety": ["governance-patterns", "rca-enforcement-model"],
  "industrial-off-highway": ["industrial-edge"],
  "dev-pipeline": ["pipeline-methodology"],
  "data-bi": ["cartography-and-graphs"],
};

// Reverse index: case-study slug → its umbrella slug.
export const caseStudyToProject: Record<string, string> = Object.fromEntries(
  Object.entries(projectToCaseStudies).flatMap(([project, studies]) =>
    studies.map((study) => [study, project]),
  ),
);
