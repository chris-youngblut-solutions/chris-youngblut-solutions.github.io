// Public repositories — the single source for the /repos page. Languages are
// from GitHub; licenses are stated here because GitHub's detector leaves
// dual-licensed repos blank. Each repo points at the project umbrella it sits
// under. Summaries are neutral and sanitization-safe (no client/internal data).
export interface Repo {
  name: string; // exact GitHub repo name (case-sensitive)
  url: string;
  lang: string;
  license: string;
  summary: string;
  project: string; // slug in src/data/projects.ts
}

export const repos: Repo[] = [
  {
    name: "opendbc-ag",
    url: "https://github.com/chris-youngblut-solutions/opendbc-ag",
    lang: "Python",
    license: "MIT",
    summary:
      "Agricultural CAN/ISOBUS protocol library — a DBC corpus mapping raw frames to named signals, scoped to pure-standard PGNs only (ISO 11783 + the J1939 ag subset). Scope is enforced by CI, not review.",
    project: "industrial-off-highway",
  },
  {
    name: "VoiceKB",
    url: "https://github.com/chris-youngblut-solutions/VoiceKB",
    lang: "Python",
    license: "Apache-2.0 / MIT",
    summary:
      "Hold-to-talk local dictation for Wayland on GNOME — CPU-only faster-whisper, audio kept in an in-memory buffer, no network after the one-time model fetch, user-scope only.",
    project: "interfaces",
  },
  {
    name: "gfx1150-bench",
    url: "https://github.com/chris-youngblut-solutions/gfx1150-bench",
    lang: "Shell",
    license: "Apache-2.0 / MIT",
    summary:
      "Reproducible llama.cpp benchmark harness and raw results for the AMD gfx1150 iGPU — a roofline, an 8-model ROCm-vs-Vulkan matrix, and a 2.43× speculative-decoding result.",
    project: "inference-tuning",
  },
  {
    name: "dbt-semantic-mcp",
    url: "https://github.com/chris-youngblut-solutions/dbt-semantic-mcp",
    lang: "Python",
    license: "Apache-2.0 / MIT",
    summary:
      "An MCP server over a governed dbt + MetricFlow semantic layer (DuckDB) — three tools and nine metrics, with lineage back to the dbt nodes and no SQL composed from model or user input.",
    project: "data-bi",
  },
  {
    name: "kpi-console",
    url: "https://github.com/chris-youngblut-solutions/kpi-console",
    lang: "Svelte",
    license: "Apache-2.0 / MIT",
    summary:
      "A SvelteKit metrics console that is itself an MCP client of dbt-semantic-mcp — a catalog, query builder, lineage view, and hand-written SVG charts; every number sourced from the governed layer.",
    project: "data-bi",
  },
  {
    name: "agentic-eval-harness",
    url: "https://github.com/chris-youngblut-solutions/agentic-eval-harness",
    lang: "Python",
    license: "Apache-2.0 / MIT",
    summary:
      "A multi-domain agent-evaluation engine — one plan-act-observe loop over real tools, mechanical (keyless) scoring, deterministic replay, and pluggable domain packs (generic, industrial, trust & safety).",
    project: "agent-infrastructure",
  },
  {
    name: "spec-renderer",
    url: "https://github.com/chris-youngblut-solutions/spec-renderer",
    lang: "HTML",
    license: "Apache-2.0 / MIT",
    summary:
      "A single-file, no-build renderer that compiles LLM-authored specs into self-contained HTML — forms and dashboards from one engine; ships a dependency-free MCP Apps server.",
    project: "agent-infrastructure",
  },
  {
    name: "okf-pack",
    url: "https://github.com/chris-youngblut-solutions/okf-pack",
    lang: "Rust",
    license: "Apache-2.0 / MIT",
    summary:
      "An OKF-compatible knowledge-context format with a bidirectional adapter — reads memory, skills, and vault surfaces into a unified format and exports losslessly; built to drop in as a hot-swappable Spaces pack.",
    project: "agent-infrastructure",
  },
];
