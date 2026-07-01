// Project umbrellas — the single source for the landing grid and the full-page
// write-ups (/projects/[slug]). Bodies are neutral functional register (per
// exposure/STYLE.md): declarative present, what-it-is + how-it-works, plain
// boundaries, no selling/defending. SANITIZED at the data level: no internal
// IPs/topology; family/client kept general; SecondChair = architecture +
// engagement only, no privilege data / client specifics; spec-decoding is a
// measured benchmark, not a shipped daemon. Numbers come from the public repos.
// Dates are placeholders — confirm.

export interface Sub {
  name: string;
  summary: string;
}
export interface Block {
  label: string;
  kind: "prose" | "list" | "layers";
  // prose: paragraphs; list: bullets; layers: "name — desc" stacked bands.
  // Inline **bold** and `code` supported (rendered by src/components/Blocks.astro).
  items: string[];
}
export interface Project {
  slug: string;
  date: string;
  name: string;
  tag?: string;
  what: string; // one-line lead
  body: string[]; // neutral-register prose paragraphs (fallback when `blocks` is absent)
  blocks?: Block[]; // structured/scannable variant — supersedes `body` on the project page
  subs?: Sub[];
}

export const projects: Project[] = [
  {
    slug: "ai-infrastructure",
    date: "2025–26",
    name: "AI Infrastructure",
    what: "the compute fleet and the local inference and training stack that runs on it",
    body: [
      "Four compute nodes, each chosen for a distinct job, linked over a private tailnet. A OneXPlayer X1 Pro handheld (AMD Strix, gfx1150) is the portable development and local-inference node. A dual-RTX-3090 desktop holds the vector and graph stores and serves models through vLLM. An NVIDIA GB10 (Grace Blackwell) desktop is the large-memory node, sized for the biggest models the fleet runs. A Dell PowerEdge VRTX chassis with three blades on Proxmox is being provisioned as the always-on host for services and this site; that provisioning is in progress, not finished.",
      "The nodes are spread across physical locations rather than concentrated in one rack. The tailnet stitches them into a single reachable surface, so a workload can land on whichever machine fits it: the handheld for iteration and on-device inference, the 3090s for serving and the stores that back retrieval, the GB10 when memory is the constraint, and the VRTX for anything that needs to stay up once that node is online.",
      "The AMD handheld is a consumer APU, so its role is portable work and local inference under a power and thermal budget, not sustained heavy serving. The two RTX 3090s give enough combined VRAM to host vector and graph databases alongside a vLLM serving process. The GB10's large unified memory makes it the node for models that don't fit elsewhere. The VRTX is the only piece built for continuous uptime, so it is the target for hosted services and the site rather than any of the desktops.",
      "On top of the fleet runs the local inference and training stack, split into two vendor tracks that share one goal: run capable models on hardware that is not a datacenter. The AMD track targets the gfx1150 handheld iGPU; the NVIDIA track targets the dual-3090 and Grace-Blackwell desktops.",
      "On AMD the work is ROCm-first PyTorch plus a controlled llama.cpp performance study on the gfx1150 handheld. The study fixes the device's memory-bandwidth ceiling with a roofline analysis, measures how close two backends get to it across an eight-model matrix, and quantifies the one lever that beats the ceiling. The headline split: Vulkan wins token generation in every cell, ROCm wins prompt processing in nearly every cell — chat-shaped workloads favor Vulkan, long-context prefill favors ROCm. A speculative-decoding pass on a 14B target with a 1.5B draft measures 2.43× at the best draft-max setting. That figure is a tuning-and-benchmark result obtained by configuring and measuring upstream llama.cpp binaries — a measurement, not a daemon or a patch written here; a daemon-side integration is deferred, not built. The reproducible harness, the pinned methodology, and the raw results are public as gfx1150-bench; the numbers and tables live in the linked case study rather than being repeated here.",
      "On NVIDIA the focus is multi-GPU serving rather than single-device tuning. The dual 3090s serve models through vLLM, with a hand-written FastAPI router in front that handles model placement and concurrency — which GPU a request lands on, how concurrent load is spread. The Grace-Blackwell (GB10) node is the large-memory machine, the place for the largest models that do not fit comfortably on the 3090s. There is no public repo for the NVIDIA side; it runs on the fleet.",
    ],
    blocks: [
      {
        label: "the nodes",
        kind: "layers",
        items: [
          "X1 Pro handheld — OneXPlayer X1 Pro (AMD Strix, gfx1150); the portable development and local-inference node, a consumer APU run under a power and thermal budget.",
          "dual-3090 desktop — 2× RTX 3090; holds the vector and graph stores and serves models through vLLM.",
          "GB10 desktop — NVIDIA GB10 (Grace Blackwell); the large-memory node, sized for the biggest models the fleet runs.",
          "VRTX chassis — Dell PowerEdge VRTX, three blades on Proxmox; the always-on host for services and this site.",
        ],
      },
      {
        label: "placing workloads",
        kind: "prose",
        items: [
          "The four nodes are spread across physical locations rather than concentrated in one rack, and a private tailnet stitches them into a single reachable surface. A workload lands on whichever machine fits it: the handheld for iteration and on-device inference, the 3090s for serving and the stores that back retrieval, the GB10 when memory is the constraint, and the VRTX for anything that needs to stay up once that node is online.",
          "The handheld's role is portable work and local inference, not sustained heavy serving. The two 3090s give enough combined VRAM to host the vector and graph databases alongside a vLLM serving process. The GB10's large unified memory makes it the node for models that don't fit elsewhere. The VRTX is the only piece built for continuous uptime, so it is the target for hosted services and the site rather than any of the desktops.",
        ],
      },
      {
        label: "the tracks",
        kind: "layers",
        items: [
          "AMD (gfx1150) — ROCm-first PyTorch plus a controlled llama.cpp performance study on the gfx1150 handheld iGPU.",
          "NVIDIA serving — a multi-GPU vLLM stack with a hand-written FastAPI router on the dual 3090s, plus the Grace-Blackwell (GB10) node for larger models.",
        ],
      },
      {
        label: "the AMD tuning study",
        kind: "prose",
        items: [
          "On AMD the work is ROCm-first PyTorch plus a controlled llama.cpp performance study on the gfx1150 handheld. The study fixes the device's memory-bandwidth ceiling with a roofline analysis, measures how close two backends get to it across an eight-model matrix, and quantifies the one lever that beats the ceiling. The headline split: **Vulkan wins token generation** in every cell while **ROCm wins prompt processing** in nearly every cell — chat-shaped workloads favor Vulkan, long-context prefill favors ROCm.",
          "A speculative-decoding pass on a 14B target with a 1.5B draft **measures 2.43×** at the best draft-max setting. That figure is a tuning-and-benchmark result obtained by configuring and measuring upstream `llama.cpp` binaries — a measurement, not a daemon or a patch written here; a daemon-side integration is deferred, not built. The harness, pinned methodology, and raw results are public as [gfx1150-bench ↗](https://github.com/chris-youngblut-solutions/gfx1150-bench); the numbers and tables live in the linked case study rather than being repeated here.",
        ],
      },
      {
        label: "the NVIDIA serving side",
        kind: "prose",
        items: [
          "On NVIDIA the focus is multi-GPU serving rather than single-device tuning. The dual 3090s serve models through **vLLM**, with a **hand-written FastAPI router** in front that handles model placement and concurrency — which GPU a request lands on, how concurrent load is spread.",
          "The Grace-Blackwell (GB10) node is the large-memory machine, the place for the largest models that do not fit comfortably on the 3090s. There is no public repo for the NVIDIA side; it runs on the fleet.",
        ],
      },
      {
        label: "status",
        kind: "prose",
        items: [
          "The VRTX is being provisioned as the always-on host for services and this site; that provisioning is in progress, not finished.",
        ],
      },
    ],
    subs: [
      {
        name: "AMD handheld",
        summary: "OneXPlayer X1 Pro (Strix, gfx1150) — portable dev + local-inference node.",
      },
      { name: "Dual-3090 node", summary: "2× RTX 3090 — vector/graph stores + vLLM serving." },
      {
        name: "Grace-Blackwell",
        summary: "NVIDIA GB10 (Grace Blackwell) desktop — large-memory node.",
      },
      {
        name: "VRTX cluster",
        summary:
          "Dell PowerEdge VRTX, 3 blades on Proxmox — the self-host node for this site + services (provisioning).",
      },
      {
        name: "AMD (gfx1150)",
        summary:
          "ROCm-first PyTorch; a llama.cpp ROCm-vs-Vulkan benchmark (Vulkan wins decode, ROCm wins prefill) with 2.43× speculative decoding measured.",
      },
      {
        name: "NVIDIA (3090 / GB10)",
        summary:
          "A multi-GPU vLLM serving stack with a hand-written FastAPI router on the 3090s; the Grace-Blackwell node for larger models.",
      },
    ],
  },
  {
    slug: "agent-infrastructure",
    date: "2026",
    name: "Production agents & evaluation",
    what: "tooling to run, measure, and extend AI agents",
    body: [
      "Four pieces sit under this umbrella, each at a different stage. The agent-harness is a headless daemon to run, supervise, and observe local LLMs and agent loops across a small fleet of machines. The agentic-eval-harness is a multi-domain evaluation engine that scores agent quality against committed golden-case sets, and is public. spec-renderer is a single-file, no-build renderer that compiles LLM-authored specs into self-contained HTML — one engine for both forms and dashboards, including the eval harness's scorecards — and is public. okf-pack is an OKF-compatible knowledge-context format with a bidirectional adapter (Rust), built to drop in as a hot-swappable Spaces pack, and is public.",
      "The eval engine runs one agentic plan-act-observe loop over real tools, then scores how it does. The loop runs on the Anthropic SDK with offline, deterministic tools and explicit stop conditions: a submit_answer tool call is the only success path, alongside a turn cap and a tool-error budget. The engine is domain-agnostic; everything domain-specific lives in a domain pack selected with --domain, and adding a pack is additive — the loop, runner, and scoring code do not change.",
      "Three packs ship in the repo. generic exercises a calculator, a file-search-and-read pair over a committed document corpus, and CSV aggregation queries (22 cases). industrial is a CAN/ISOBUS edge decode and diagnostics agent — frame decode, signal query, fault checks, a deterministic safety-bound gate, and sensor fusion — with decode ground-truth drawn from a curated public-standard signal subset derived from the MIT-licensed opendbc-ag over a synthetic bus-log corpus (17 cases). trust_safety is a content-enforcement agent over a fully synthetic, generic policy: policy lookup, classification, root-cause tracing, appeal adjudication, a deterministic leakage gate, and QC sampling (18 cases). The trust_safety pack is methodology-only — the policy, content items, appeals, misfires, and rater sets are all fabricated, with abstract marker tokens in benign filler sentences and no real policy text or harmful content.",
      "Scoring is mechanical, not model-judged. Each case carries a checker — numeric with tolerance, exact, regex, or set-F1 — and the tools it is expected to use. The rubric awards 1.0 for a correct answer, 0.5 when the answer is wrong but every expected tool was called (right plan, wrong execution), and 0.0 otherwise; set cases score their F1. Cases roll up by metric, and a failed hard-gate case — such as a safety-bound violation — fails the whole run regardless of the pass count. Because there is no LLM judge, the entire path is keyless-testable.",
      "The loop is backend-agnostic. The live backend calls the API and can record the full conversation — model turns plus the tools' outputs — to JSONL; the replay backend re-runs the recorded turns through the identical loop and tool code with no key and no network. The tools are deterministic, so a replayed run reproduces its scorecard and recorded outputs exactly. Each run appends a scorecard to per-domain history, and a report command diffs the two most recent runs and names regressions; a minimum-pass floor lets the same command gate CI. The repo carries committed live and replay scorecards and transcripts for all three domains, and a suite of 64 tests covers the engine, tools, scoring, regression diff, and replay without a key.",
      "The toolset is offline by design, trading breadth for reproducibility: no web access, no mutation, fixed committed fixtures per domain. The loop is single-agent and single-task. Scores are model-version sensitive, so the scorecard records the model id and runs are compared within the same model. The engine is dual-licensed Apache-2.0 OR MIT.",
    ],
    blocks: [
      {
        label: "the pieces",
        kind: "layers",
        items: [
          "agent-harness — a headless daemon to run, supervise, and observe local LLMs and agent loops across a small fleet.",
          "agentic-eval-harness — a multi-domain evaluation engine that scores agent quality against committed golden-case sets. [Public ↗](https://github.com/chris-youngblut-solutions/agentic-eval-harness)",
          "spec-renderer — a single-file, no-build renderer that compiles LLM-authored specs into self-contained HTML; one engine renders both forms and dashboards, including this harness's scorecards. [Public ↗](https://github.com/chris-youngblut-solutions/spec-renderer)",
          "okf-pack — an OKF-compatible knowledge-context format with a bidirectional adapter (Rust), built to drop in as a hot-swappable Spaces pack. [Public ↗](https://github.com/chris-youngblut-solutions/okf-pack)",
        ],
      },
      {
        label: "the eval loop",
        kind: "prose",
        items: [
          "The eval engine runs one agentic plan-act-observe loop over real tools, then scores how it does. It runs on the Anthropic SDK with offline, deterministic tools and explicit stop conditions: a `submit_answer` tool call is the only success path, alongside a turn cap and a tool-error budget.",
          "The engine is domain-agnostic — everything domain-specific lives in a domain pack selected with `--domain`, and adding a pack is additive: the loop, runner, and scoring code do not change.",
        ],
      },
      {
        label: "domain packs",
        kind: "list",
        items: [
          "**generic** — a calculator, file-search-and-read over a committed corpus, and CSV aggregation (22 cases).",
          "**industrial** — a CAN/ISOBUS decode and diagnostics agent (frame decode, signal query, fault checks, a deterministic safety-bound gate, sensor fusion); decode ground-truth from a public-standard signal subset derived from the MIT-licensed opendbc-ag over a synthetic bus-log corpus (17 cases).",
          "**trust_safety** — a content-enforcement agent over a fully synthetic, generic policy (lookup, classification, root-cause tracing, appeal adjudication, a leakage gate, QC sampling; 18 cases). Methodology-only: the policy, content, appeals, and rater sets are all fabricated — no real policy text or harmful content.",
        ],
      },
      {
        label: "scoring",
        kind: "prose",
        items: [
          "Scoring is mechanical, not model-judged. Each case carries a checker — numeric with tolerance, exact, regex, or set-F1 — and the set of tools it is expected to call. The rubric awards 1.0 for a correct answer, 0.5 when the answer is wrong but every expected tool was called (right plan, wrong execution), and 0.0 otherwise; set cases score their F1. A failed hard-gate case, such as a safety-bound violation, fails the whole run regardless of the pass count. Because nothing is model-judged, the entire path is keyless-testable.",
        ],
      },
      {
        label: "replay & testing",
        kind: "prose",
        items: [
          "The loop is backend-agnostic. The live backend calls the API and can record the full conversation — model turns plus tool outputs — to JSONL; the replay backend re-runs the recorded turns through the identical loop and tool code with no key and no network. The tools are deterministic, so a replayed run reproduces its scorecard exactly.",
          "A report command diffs the two most recent runs and names regressions, with a minimum-pass floor that lets the same command gate CI. The repo carries committed live and replay scorecards for all three domains, and 64 tests cover the engine, tools, scoring, regression diff, and replay — all without a key.",
        ],
      },
      {
        label: "scope",
        kind: "list",
        items: [
          "Offline by design — no web access, no mutation, fixed committed fixtures per domain.",
          "Single-agent, single-task — no multi-agent coordination, streaming, or cross-task memory.",
          "Model-version sensitive — the scorecard records the model id, and runs are compared within the same model.",
          "Dual-licensed Apache-2.0 OR MIT.",
        ],
      },
    ],
    subs: [
      {
        name: "agentic-eval-harness",
        summary:
          "Multi-domain eval engine + packs (generic, industrial, trust & safety); 57 golden cases, 64 tests, committed live + replay scorecards. Public.",
      },
      {
        name: "spec-renderer",
        summary:
          "A single-file, no-build renderer for LLM-authored specs — forms + dashboards from one engine; renders the eval harness scorecards. Public.",
      },
      {
        name: "agent-harness",
        summary:
          "A headless daemon to run, supervise, and observe local LLMs + agent loops across the fleet.",
      },
      {
        name: "okf-pack",
        summary:
          "An OKF-compatible knowledge-context format + bidirectional adapter (Rust), as a hot-swappable pack.",
      },
    ],
  },
  {
    slug: "data-bi",
    date: "2026",
    name: "Data & semantic layer",
    what: "governed metrics and typed knowledge graphs — single-sourced numbers",
    body: [
      "Two tracks sit under this umbrella. One is a single-sourced metrics path, built as two public repositories; the other is a knowledge-cartography track covered by its own case study and only summarized here.",
      "The metrics path starts from one rule: a metric is defined once, and nothing downstream composes its own SQL. A dbt + MetricFlow semantic layer over a DuckDB warehouse holds nine governed metrics including revenue, units sold, gross profit, order count, average order value, and on-time shipment rate. Each is declared in MetricFlow YAML, with the business rules (revenue counts completed orders only; a new customer is a first non-cancelled order) living in the YAML and the mart SQL rather than in any consumer. The warehouse is a full dbt medallion stack — synthetic seed data through staging, intermediate, and mart models — exercised by the project's dbt build and test suite. The data is a deterministic synthetic set of roughly four thousand orders in a single DuckDB file: the patterns transfer, but cloud-warehouse scale, orchestration, and Spark-scale pipelines are out of scope.",
      "Two consumers read that same layer. An MCP server (Python, stdio transport) exposes three tools — list_metrics, query_metric, and describe_lineage — so an MCP host can answer a natural-language KPI question by picking metrics from the catalog and reading lineage back to the dbt nodes a number came from. No SQL is composed from model or user input, and adding a metric is a YAML change, not server code. The query interface deliberately omits MetricFlow's where-filter syntax.",
      "The second consumer is kpi-console, a SvelteKit 2 / Svelte 5 application that is itself an MCP client of that server. It hosts the MCP client in its server routes, so the browser talks only to the console's own API and never touches the warehouse file directly. It surfaces a catalog, a query builder, a lineage view, and charts drawn as hand-written SVG geometry — about forty lines, no chart library and no UI framework, with the semantic layer standing in for a data model. It carries a PWA floor (installable manifest and icon) and supports one chart shape. Because both consumers read the same governed definitions, the human surface and the agent surface return the same numbers. Both repositories are public and dual-licensed Apache-2.0 OR MIT at version 0.1.0.",
      "The second track is knowledge cartography: a schema-first method that catalogs an unfamiliar domain before any build, plus typed graphs that make a real corpus queryable. That track has its own case study, which covers the method, the graph schemas, and the maturity of each artifact; it is not duplicated here.",
    ],
    blocks: [
      {
        label: "the stack",
        kind: "layers",
        items: [
          "semantic layer — a dbt + MetricFlow semantic layer over a DuckDB warehouse holding nine governed metrics, each declared in MetricFlow YAML.",
          "dbt-semantic-mcp — Python MCP server, stdio transport; three tools (list_metrics, query_metric, describe_lineage) that read the same layer and trace lineage back to the dbt nodes. [Public ↗](https://github.com/chris-youngblut-solutions/dbt-semantic-mcp)",
          "kpi-console — a SvelteKit 2 / Svelte 5 application that is itself an MCP client of that server; catalog, query builder, lineage view, and hand-written SVG charts. [Public ↗](https://github.com/chris-youngblut-solutions/kpi-console)",
        ],
      },
      {
        label: "single source",
        kind: "prose",
        items: [
          "The metrics path starts from one rule: a metric is defined once, and nothing downstream composes its own SQL. The business rules — revenue counts completed orders only; a new customer is a first non-cancelled order — live in the MetricFlow YAML and the mart SQL rather than in any consumer.",
          "Both consumers read the same governed definitions, so the human surface and the agent surface return the same numbers. Adding a metric is a YAML change, not server code. No SQL is composed from model or user input, and the query interface deliberately omits MetricFlow's where-filter syntax. Both repositories are public and dual-licensed Apache-2.0 OR MIT at version 0.1.0.",
        ],
      },
      {
        label: "the warehouse",
        kind: "prose",
        items: [
          "The warehouse is a full dbt medallion stack — synthetic seed data through staging, intermediate, and mart models — exercised by the project's dbt build and test suite. The data is a deterministic synthetic set of roughly four thousand orders in a single DuckDB file.",
          "kpi-console hosts the MCP client in its server routes, so the browser talks only to the console's own API and never touches the warehouse file directly. The patterns transfer, but cloud-warehouse scale, orchestration, and Spark-scale pipelines are out of scope.",
        ],
      },
      {
        label: "cartography track",
        kind: "prose",
        items: [
          "A second track under this umbrella is knowledge cartography: a schema-first method that catalogs an unfamiliar domain before any build, plus typed graphs that make a real corpus queryable. That track has its **own case study**, covering the method, the graph schemas, and the maturity of each artifact, and is not duplicated here.",
        ],
      },
    ],
    subs: [
      {
        name: "kpi-console",
        summary:
          "SvelteKit metrics console — an MCP client of dbt-semantic-mcp; catalog, query builder, SVG charts, lineage. Public.",
      },
      {
        name: "dbt-semantic-mcp",
        summary:
          "MCP server over a governed dbt + MetricFlow semantic layer (DuckDB); 3 tools, 9 metrics. Public.",
      },
      {
        name: "knowledge graph",
        summary:
          "Cartography over large corpora — galaxy-map, mechanism-graph, dev-tel-graph. Concept.",
      },
    ],
  },
  {
    slug: "industrial-off-highway",
    date: "2024–26",
    name: "Ag / Industrial",
    what: "protocol tooling and retrofits for ag and off-highway equipment",
    body: [
      "Off-highway equipment runs on CAN and ISOBUS buses with far less open tooling than automotive has. Cars have inspectable protocol libraries and capture workflows; agricultural and off-highway machines mostly don't. The work here is a public protocol library plus field diagnostic and teaching work on real equipment.",
      "opendbc-ag is the public anchor: an MIT-licensed agricultural CAN/ISOBUS protocol library, modeled on comma.ai's automotive opendbc, and the first repo through the project-delivery pipeline. It is a corpus of CAN DBC files that map raw frames to named signals, scoped to pure-standard PGNs only — ISO 11783 (ISOBUS) public summaries and the SAE J1939 ag-relevant subset, with no reverse-engineered proprietary OEM definitions. The corpus spans three DBC files from distinct public sources, totaling 2,690 unique PGNs and 2,780 signals; the signal count is honest about its shape — most signals are PGN-level placeholders from the bulk source awaiting community enrichment, while the developed signal-level definitions live in the smaller hand-curated and library-derived files. Each DBC is generated by a dedicated extractor through a reproducible two-stage pipeline, and every signal carries a comment naming its public source so provenance traces back to the original page or code.",
      "Scope is enforced by CI rather than by review. Workflows reject any PGN in the proprietary ranges and any PGN that appears in more than one DBC file, run the test suite across a Python version matrix, and auto-regenerate the coverage matrix on change — so a contributor can open a pull request and the build, not a maintainer, rejects scope violations. The repository also ships a legal-context document situating the public-standards-only scope against the ag repair-rights landscape, explicit that it is context and not legal advice. It is MIT-licensed with permissive runtime dependencies.",
      "Around the library is field work, kept general here: protocol sensing across agricultural and adjacent equipment domains, and a sprayer retrofit covering a GPS-dropout diagnostic and a field curriculum for the firmware-flash procedure. Those field artifacts are method and documentation rather than public software; the linked case study carries their detail. Equipment, brand, and firmware-version specifics are kept general throughout.",
    ],
    blocks: [
      {
        label: "the gap",
        kind: "prose",
        items: [
          "Off-highway equipment runs on CAN and ISOBUS buses with far less open tooling than automotive has. Cars have inspectable protocol libraries and capture workflows; agricultural and off-highway machines mostly don't.",
          "The work here is a public protocol library plus field diagnostic and teaching work on real equipment.",
        ],
      },
      {
        label: "the artifacts",
        kind: "layers",
        items: [
          "opendbc-ag — a public MIT-licensed CAN/ISOBUS protocol library; the first Tier-2 release.",
          "protocol sensing — sensing across equipment protocols (ag, auto, adjacent).",
          "RavenViper — a family-farm sprayer retrofit, kept general.",
        ],
      },
      {
        label: "the public anchor",
        kind: "prose",
        items: [
          "[opendbc-ag ↗](https://github.com/chris-youngblut-solutions/opendbc-ag) is an MIT-licensed agricultural CAN/ISOBUS protocol library, modeled on comma.ai's automotive `opendbc`, and the first repo through the project-delivery pipeline. It is a corpus of CAN DBC files mapping raw frames to named signals, scoped to pure-standard PGNs only — ISO 11783 (ISOBUS) public summaries and the SAE J1939 ag-relevant subset, with no reverse-engineered proprietary OEM definitions. The corpus spans three DBC files from distinct public sources, totaling **2,690 unique PGNs** and **2,780 signals**; most signals are PGN-level placeholders from the bulk source awaiting community enrichment, while the developed signal-level definitions live in the smaller hand-curated and library-derived files. Each DBC is generated by a dedicated extractor through a reproducible two-stage pipeline, and every signal carries a comment naming its public source so provenance traces back.",
          "Scope is **enforced by CI rather than by review**. Workflows reject any PGN in the proprietary ranges and any PGN that appears in more than one DBC file, run the test suite across a Python version matrix, and auto-regenerate the coverage matrix on change — so the build, not a maintainer, rejects scope violations. The repo also ships a legal-context document situating the public-standards-only scope against the ag repair-rights landscape, explicit that it is context and not legal advice. It is MIT-licensed with permissive runtime dependencies.",
        ],
      },
      {
        label: "the field work",
        kind: "prose",
        items: [
          "Around the library is field work, kept general here: protocol sensing across agricultural and adjacent equipment domains, and a sprayer retrofit covering a GPS-dropout diagnostic and a field curriculum for the firmware-flash procedure. These are method and documentation rather than public software, and the linked **case study** carries their detail. Equipment, brand, and firmware-version specifics are kept general throughout.",
        ],
      },
    ],
    subs: [
      { name: "opendbc-ag", summary: "Public CAN/ISOBUS protocol library — first Tier-2 release." },
      {
        name: "protocol sensing",
        summary: "Sensing across equipment protocols (ag, auto, adjacent).",
      },
      { name: "RavenViper", summary: "A family-farm sprayer retrofit (kept general)." },
    ],
  },
  {
    slug: "governance-trust-safety",
    date: "2024–26",
    name: "Trust, safety & governance",
    what: "methods and gates that keep AI and releases auditable",
    body: [
      "Methods and gates from production trust-and-safety and release work, built to keep a rule enforced. The pieces are a release-review panel, the branch-protection and signing configuration behind every public release, and a root-cause method for enforcement quality.",
      "The release-review side centers on ship-panel: a reusable, args-driven panel of six independent single-axis judges plus a synthesis step. Each judge reviews one axis alone — for example audience-fit, over-claim, or defensibility — and returns a verdict scoped to that axis; none sees another's call before issuing its own. A seventh synthesis pass reconciles the six verdicts into one report and sorts findings into what blocks a ship versus what only advises. It runs as the review stage of the ship-prep gate, takes the artifact as an argument, and so runs the same way over a repository, a bundle, or a single file. The two-governance-patterns case study covers the panel's decomposition and reuse in full.",
      "Around the panel sits the release-gate configuration that turns 'is this safe to ship' into a gate rather than a judgment call. Public repositories use branch protection and required status checks, so a change cannot land until its checks pass, and the public tier signs every release — cosign keyless signing through CI, an SBOM, and SLSA provenance riding along with the artifact. These are wired into the repositories the public projects ship from.",
      "The third piece is a root-cause-analysis method for enforcement quality from trust-and-safety work: trace a misclassification to its cause, correct it, and close the loop so the same class of error is caught next time. It is described as a method here — employer-agnostic, with the specifics kept general.",
    ],
    blocks: [
      {
        label: "the instruments",
        kind: "layers",
        items: [
          "ship-panel — a reusable, args-driven release-review panel of six independent single-axis judges plus a synthesis step.",
          "release gates — branch protection, required status checks, and signed-release config behind every public release.",
          "enforcement RCA — a root-cause method for enforcement quality from trust-and-safety work, kept employer-agnostic.",
        ],
      },
      {
        label: "ship-panel",
        kind: "prose",
        items: [
          "The release-review side centers on ship-panel: six independent single-axis judges plus a synthesis step. Each judge reviews one axis alone — for example audience-fit, over-claim, or defensibility — and returns a verdict scoped to that axis; none sees another's call before issuing its own. A seventh synthesis pass reconciles the six verdicts into one report and sorts findings into what **blocks** a ship versus what only **advises**.",
          "It runs as the review stage of the ship-prep gate, takes the artifact as an argument, and so runs the same way over a repository, a bundle, or a single file. The two-governance-patterns case study covers the panel's decomposition and reuse in full.",
        ],
      },
      {
        label: "release gates",
        kind: "prose",
        items: [
          "Around the panel sits the release-gate configuration that turns 'is this safe to ship' into a gate rather than a judgment call. Public repositories use branch protection and required status checks, so a change cannot land until its checks pass.",
          "The public tier signs every release — cosign keyless signing through CI, an SBOM, and SLSA provenance riding along with the artifact. These are wired into the repositories the public projects ship from.",
        ],
      },
      {
        label: "enforcement RCA",
        kind: "prose",
        items: [
          "The third piece is a root-cause-analysis method for enforcement quality from trust-and-safety work: trace a misclassification to its cause, correct it, and close the loop so the same class of error is caught next time. It is described as a method here — employer-agnostic, with the specifics kept general.",
        ],
      },
    ],
    subs: [
      {
        name: "ship-panel",
        summary: "An adversarial multi-judge release gate (method); backs the eval harness.",
      },
      {
        name: "release gates",
        summary:
          "Branch protection, required checks, and signed-release config in the public repos.",
      },
      {
        name: "enforcement RCA",
        summary:
          "A root-cause + accuracy-recovery method for enforcement quality (employer-agnostic).",
      },
    ],
  },
  {
    slug: "dev-pipeline",
    date: "2026",
    name: "CI/CD",
    what: "a governed scoping-to-ship pipeline run as repeatable skills",
    body: [
      "A governed pipeline that takes a project from a blank scoping question to a signed public release, implemented as a chain of Claude Code skills. Each stage is a single command, and each promotes a project one step along a fixed lifecycle: T0 (scratch, no version control) to T1 (a private repo) to T2 (a public repo). Tier is lifecycle state rather than a directory layout, and the chain only moves forward — nothing skips a tier, and retirement is a separate move rather than a step backward.",
      "The five stages are /mapit, /pointit, /sendit, /vetit, and /shipit. The first two operate on a scratch container: /mapit catalogs the option surface for a problem area without picking a winner, and /pointit promotes one candidate into a scoping container with no git. The last three operate on the repo: /sendit stands up the private repo with its scaffolding, /vetit runs the read-only ship-prep gate, and /shipit flips the repo public and applies the hardening. Each stage adds only the artifacts the next tier requires, so the same gates run in the same order on every project.",
      "/vetit is the gate the public flip depends on. It runs an automated sanitization sweep — a denylist grep, a full-history secret scan, and a credential regex — plus an adversarial review panel, and consolidates the result into a re-runnable report with a BLOCK bucket and an ADVISE bucket. /shipit refuses to run until the BLOCK bucket is empty, and the same denylist the gate reads is the source the pre-commit hooks check against, so a credential is caught at commit time as well as at the gate.",
      "A project that runs the full chain arrives at a public repo with a dual license, pre-commit plus CI, a sanitization gate it has passed, branch protection, and signed releases — cosign keyless signing with an SBOM and SLSA provenance at the public tier. The pipeline is in daily use; eight repos have shipped through it to public: opendbc-ag, voicekb, gfx1150-bench, dbt-semantic-mcp, kpi-console, agentic-eval-harness, spec-renderer, and okf-pack. The case study covers the stages, gates, and supporting continuity and decision artifacts stage by stage.",
    ],
    blocks: [
      {
        label: "the stages",
        kind: "layers",
        items: [
          "/mapit — catalogs the option surface for a problem area without picking a winner.",
          "/pointit — promotes one candidate into a scoping container with no git.",
          "/sendit — stands up the private repo with its scaffolding.",
          "/vetit — runs the read-only ship-prep gate.",
          "/shipit — flips the repo public and applies the hardening.",
        ],
      },
      {
        label: "the chain",
        kind: "prose",
        items: [
          "A governed pipeline that takes a project from a blank scoping question to a signed public release, implemented as a chain of Claude Code skills. Each stage is a single command, and each promotes a project one step along a fixed lifecycle: T0 (scratch, no version control) to T1 (a private repo) to T2 (a public repo).",
          "Tier is lifecycle state rather than a directory layout, and the chain only moves forward — nothing skips a tier, and retirement is a separate move rather than a step backward. The first two stages operate on a scratch container; the last three operate on the repo. Each stage adds only the artifacts the next tier requires, so the same gates run in the same order on every project.",
        ],
      },
      {
        label: "the gate",
        kind: "prose",
        items: [
          "`/vetit` is the gate the public flip depends on. It runs an automated sanitization sweep — a denylist grep, a full-history secret scan, and a credential regex — plus an adversarial review panel, and consolidates the result into a re-runnable report with a BLOCK bucket and an ADVISE bucket.",
          "`/shipit` refuses to run until the BLOCK bucket is empty. The same denylist the gate reads is the source the pre-commit hooks check against, so a credential is caught at commit time as well as at the gate.",
        ],
      },
      {
        label: "a finished run",
        kind: "prose",
        items: [
          "A project that runs the full chain arrives at a public repo with a dual license, pre-commit plus CI, a sanitization gate it has passed, branch protection, and signed releases — cosign keyless signing with an SBOM and SLSA provenance at the public tier.",
          "The pipeline is in daily use; eight repos have shipped through it to public: opendbc-ag, voicekb, gfx1150-bench, dbt-semantic-mcp, kpi-console, agentic-eval-harness, spec-renderer, and okf-pack.",
        ],
      },
    ],
    subs: [
      { name: "mapit → shipit", summary: "The /mapit → /pointit → /sendit → /shipit skill chain." },
      { name: "signed releases", summary: "cosign keyless + SBOM + SLSA at the public tier." },
    ],
  },
  {
    slug: "interfaces",
    date: "2026",
    name: "UX",
    what: "human-facing surfaces — voice, a design language, and a desktop platform layer",
    body: [
      "Three human-facing surfaces sit here: a voice input method, the design language this site is built in, and a desktop platform layer.",
      "voicekb is hold-to-talk dictation for Wayland on GNOME. Hold a hotkey, speak, release, and the transcript lands in whatever input is focused. The engine is CPU-only faster-whisper (medium.en, int8); while the hotkey is held, audio is captured to an in-memory ring buffer at 16 kHz mono, transcribed on release, and the buffer is zeroed. Nothing is written to disk, and no network socket is opened after the one-time model fetch. It runs entirely at user scope: no root, no sudo daemon, no polkit or Secure-Boot changes, and any systemd unit it installs is a user unit only.",
      "Text injection is a tiered fallback chain: wtype for native Wayland, xdotool for Xwayland clients, and a clipboard copy via wl-copy as a last resort when neither succeeds. Native-Wayland GNOME apps that don't run under Xwayland can't accept injected keystrokes, so for those the transcript lands on the clipboard for a manual paste, while Xwayland clients receive it directly. voicekb also ships a GNOME QuickSettings toggle that turns it into a background user service. The current toggle starts and stops the service, so each start pays the model-load cost; an always-up daemon with a GSettings-gated hotkey is a named future upgrade rather than something built. The repository is public, dual-licensed Apache-2.0 or MIT.",
      "Cabin is the design system the rest is built on, and this site runs on it. It is a warm, paper-forward visual language: a paper palette, a serif display face, day and night theming, and a component set expressed as design tokens plus components. It is the shared surface layer that keeps the catalog and write-ups coherent rather than a one-off theme.",
      "Spaces is a configurable desktop platform that reshapes one Linux machine into named work contexts, each with its own apps, window layout, and local-model assignment, summoned and switched on a keystroke, with background contexts frozen to reclaim GPU and RAM and thawed on return. It runs on GNOME and Hyprland from a shared core. Spaces has its own case study covering the architecture, the freeze-and-thaw daemon, and what is and isn't shipped; that page carries the detail rather than this one.",
    ],
    blocks: [
      {
        label: "the surfaces",
        kind: "layers",
        items: [
          "voicekb — hold-to-talk local dictation for Wayland on GNOME. [repo ↗](https://github.com/chris-youngblut-solutions/VoiceKB)",
          "Cabin — the warm, paper-forward design language this site runs on.",
          "Spaces — a configurable desktop platform layer over one Linux machine.",
        ],
      },
      {
        label: "voicekb",
        kind: "prose",
        items: [
          "Hold a hotkey, speak, release, and the transcript lands in whatever input is focused. The engine is CPU-only faster-whisper (`medium.en`, int8); while the hotkey is held, audio is captured to an in-memory ring buffer at 16 kHz mono, transcribed on release, and the buffer is zeroed. Nothing is written to disk, and no network socket is opened after the one-time model fetch.",
          "Text injection is a tiered fallback chain: `wtype` for native Wayland, `xdotool` for Xwayland clients, and a clipboard copy via `wl-copy` as a last resort. Native-Wayland GNOME apps that don't run under Xwayland can't accept injected keystrokes, so for those the transcript lands on the clipboard for a manual paste, while Xwayland clients receive it directly.",
          "It runs entirely at **user scope**: no root, no sudo daemon, no polkit or Secure-Boot changes, and any systemd unit it installs is a user unit only. A GNOME QuickSettings toggle turns it into a background user service; each start pays the model-load cost, and an always-up daemon with a GSettings-gated hotkey is a named future upgrade rather than something built. The repository is public, dual-licensed Apache-2.0 or MIT.",
        ],
      },
      {
        label: "Cabin & Spaces",
        kind: "list",
        items: [
          "**Cabin** is the design system the rest is built on, and **this site runs on it** — a paper palette, a serif display face, day and night theming, and a component set expressed as design tokens plus components. It is the shared surface layer that keeps the catalog and write-ups coherent rather than a one-off theme.",
          "**Spaces** reshapes one Linux machine into named work contexts — each with its own apps, window layout, and local-model assignment, summoned on a keystroke, with background contexts frozen to reclaim GPU and RAM and thawed on return. It runs on GNOME and Hyprland from a shared core, and **has its own case study** covering the architecture, the freeze-and-thaw daemon, and what is and isn't shipped.",
        ],
      },
    ],
    subs: [
      {
        name: "voicekb",
        summary:
          "Hold-to-talk local dictation for Wayland/GNOME — CPU-only faster-whisper, audio kept in RAM, no network after model fetch. Public.",
      },
      {
        name: "Cabin",
        summary:
          "The warm, paper-forward design system this site runs on — tokens + components, day/night theming.",
      },
      {
        name: "Spaces",
        summary: "A configurable operating-platform layer over the Linux desktop.",
      },
    ],
  },
  {
    slug: "secondchair",
    date: "2024–26",
    name: "Forward-deployed delivery",
    what: "embedded customer delivery — SecondChair, a privilege-aware legal-AI system shipped to a solo practice in seven days, in production",
    body: [
      "SecondChair is a retrieval system built for a solo-attorney practice and delivered in a seven-day engagement. It runs in production and has supported a matter that reached the Iowa Supreme Court. An integration syncs matters and documents from the practice's case-management system into the index.",
      "On top of the index sits a privilege-aware retrieval layer: BGE-M3 hybrid retrieval (dense + sparse + late-interaction) over a Qdrant vector store and a Neo4j graph queried with Cypher, with privilege filters that enforce what may surface for a given query. A set of MCP tools puts case-work actions in front of Claude, so the attorney works through a single surface rather than across separate systems.",
      "Client and matter details are confidential; this describes the architecture and the shape of the engagement only.",
    ],
    blocks: [
      {
        label: "the stack",
        kind: "layers",
        items: [
          "case-management sync — pulls matters and documents from the practice's case-management system into the index.",
          "privilege-aware retrieval — BGE-M3 hybrid retrieval (dense + sparse + late-interaction) over a Qdrant vector store and a Neo4j graph (Cypher); privilege filters enforce what may surface for a given query.",
          "MCP case-work tools — case-work actions put in front of Claude, so the attorney works through a single surface rather than across separate systems.",
        ],
      },
      {
        label: "engagement",
        kind: "prose",
        items: [
          "Built for a solo-attorney practice and delivered in a **seven-day engagement**; it runs in production and has supported a matter that reached the Iowa Supreme Court. Client, attorney, and matter details are confidential — this describes the architecture and the shape of the engagement only.",
        ],
      },
    ],
    subs: [
      {
        name: "Case-management sync",
        summary: "Pulls matters and documents from the practice's case-management system.",
      },
      {
        name: "RAG retrieval",
        summary:
          "BGE-M3 hybrid retrieval (dense + sparse + late-interaction) over Qdrant + Neo4j (Cypher), with privilege filters.",
      },
      {
        name: "MCP case-work tools",
        summary: "Case-work actions exposed to Claude via MCP.",
      },
      {
        name: "7-day client ship",
        summary:
          "Built and delivered to a solo-attorney practice in a seven-day engagement; in production.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
