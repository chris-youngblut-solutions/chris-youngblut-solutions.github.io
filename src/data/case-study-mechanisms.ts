// Problem-class leads for the case studies (the "Writing" section). Each entry
// re-leads its writeup the way the operator works a problem: state the CLASS of
// problem, chunk it by mapping the universe (mode-c cartography), form the
// solution as a stack that fills the negative space, name the obstacles and
// nuance, then place the layer in an MSP / BI / enterprise stack it resolves.
// Neutral register. The verified detail lives in the markdown body
// (src/content/case-studies/<slug>.md); this file owns only the lead. Keyed by
// case-study slug (the file id).
//
// Sanitization is load-bearing: trust & safety stays method-only (no platform
// name, no internal data, no accuracy figures); the legal practice is
// capability-only ("a solo-attorney practice", no client/matter content, generic
// "vector + graph store"); equipment specifics stay general. Facts mirror the
// verified bodies.
import type { Block } from "./projects";

export interface CaseStudyMechanism {
  blocks: Block[];
}

export const caseStudyMechanisms: Record<string, CaseStudyMechanism> = {
  "pipeline-methodology": {
    blocks: [
      {
        label: "the problem",
        kind: "prose",
        items: [
          "Solo and small-team delivery has no guardrails: a standard that should hold on every release — no secrets, scoped changes, a real license, signed artifacts — rides on the maker remembering to check it, and erodes under time and turnover. The class is **release safety that depends on attention** rather than on a gate.",
        ],
      },
      {
        label: "mapping the universe",
        kind: "prose",
        items: [
          "The option space runs from ad-hoc (\"ship when it feels ready\") to heavyweight enterprise SDLC. Chunked, the real surface is: where version control should enter, what each tier of maturity actually requires, which checks are mechanizable versus judgment, and where a leak or scope-creep can slip in. Mapping that first is what lets the same gates run on every project instead of being re-decided per repo.",
        ],
      },
      {
        label: "the solution stack",
        kind: "layers",
        items: [
          "/mapit — universe-scoping cartography: a scored triage catalog of an area before any build decision.",
          "/pointit — promote one candidate into a T0 scratch container (no git, reversible).",
          "/sendit — T0 → T1 private repo with the scaffolding: dual license, pre-commit, task runner, CI.",
          "/vetit — the read-only ship-prep gate: denylist grep + full-history secret scan + a six-judge panel → BLOCK / ADVISE.",
          "/shipit — T1 → T2 public with the hardening: branch protection, signed releases, SBOM + SLSA provenance.",
        ],
      },
      {
        label: "obstacles & nuance",
        kind: "list",
        items: [
          "The gate has to be un-skippable — `/shipit` aborts without a clear `/vetit`, and the denylist the gate greps is the same source the pre-commit hooks check, so a leak is caught at commit time **and** at the gate.",
          "Tier is lifecycle state, not a directory — nothing skips a tier, and retirement is a separate move, so the same gates run in the same order every time.",
          "Continuity is part of delivery — session handoff/intake and a cadence-reviewed decision register keep the work coherent across cold starts.",
        ],
      },
      {
        label: "where it lands",
        kind: "prose",
        items: [
          "This is the **SDLC / release-governance layer** — the gates an enterprise puts between a developer's commit and a signed public artifact, packaged as a repeatable delivery kit an MSP could run per client. Eight repos have shipped through it to public.",
        ],
      },
    ],
  },

  "cartography-and-graphs": {
    blocks: [
      {
        label: "the problem",
        kind: "prose",
        items: [
          "Before you can build in an unfamiliar domain — or trust a large corpus — you have to know its shape, and most teams jump straight to a tool or a vendor pick without ever mapping the surface. The class is **decision-under-unfamiliarity**: scoping a landscape, or making a messy corpus answerable, before committing to a build.",
        ],
      },
      {
        label: "mapping the universe",
        kind: "prose",
        items: [
          "The method is mode-c cartography: catalog every component, vendor, and technology in an area, scored against the constraints that actually apply, **before** any build decision — the map is the deliverable, not a recommendation. For a corpus the same instinct goes typed: define the node and edge types first, parse the real corpus into exactly those, then query across the result, so the structure is queryable rather than a diagram.",
        ],
      },
      {
        label: "the solution stack",
        kind: "layers",
        items: [
          "galaxy-map — a wide-net `/mapit` triage catalog per area, scored against fixed constraints, written before a candidate is chosen.",
          "mechanism-graph — a typed KuzuDB graph over a de-identified career-evidence corpus: 93 mechanisms, 10 domains, 316 evidence nodes under a versioned schema.",
          "dev-tel-graph — the same schema-first method on a different corpus and a different graph engine, testing that the approach transfers (spike stage).",
        ],
      },
      {
        label: "obstacles & nuance",
        kind: "list",
        items: [
          "The schema is the design — separating the invariant from the method lets one disposition be traced across domains and time, which a flat document set can't do without manual cross-referencing.",
          "The query that justifies the structure returns the cluster mechanisms spanning three-plus domains in 24 ms — a single traversal, because the cross-domain relationships are first-class edges.",
          "De-identified: no client data is in the graph; the mechanisms and evidence are abstracted from their original engagements.",
        ],
      },
      {
        label: "where it lands",
        kind: "prose",
        items: [
          "This is the **BI / knowledge layer** — cataloging a domain or corpus so it is queryable: the discovery step before an enterprise data or vendor decision, the scoping pass an MSP runs on a new client's stack, the retrieval substrate under a knowledge product.",
        ],
      },
    ],
  },

  "rca-enforcement-model": {
    blocks: [
      {
        label: "the problem",
        kind: "prose",
        items: [
          "A model that makes live decisions is wrong in ways that drift, and the wrongness compounds silently unless something measures it on a cadence. The class is **decision-quality on a moving target**: any production system whose adjudicable outputs degrade as inputs, policy, and the world shift.",
        ],
      },
      {
        label: "mapping the universe",
        kind: "prose",
        items: [
          "The failure surface chunks by where a wrong decision originates — an input, a feature, a threshold, or a rule — and by symptom versus cause. The choice that organizes everything is to build the error taxonomy by **cause, not symptom**, so one fix closes a whole class of errors instead of one case at a time, and the work stops chasing symptoms that keep reappearing.",
        ],
      },
      {
        label: "the solution stack",
        kind: "layers",
        items: [
          "measure against ground truth — adjudicate a sample independently of what the model did; the disagreements are the baseline.",
          "taxonomize by cause — group the errors by what is going wrong underneath, not by what the wrong decision looked like.",
          "trace to root cause — follow a representative error back through the decision path to an actionable origin.",
          "feed the correction back — change the enforcement logic, re-measure with the same instrument; confirmed only when the class shrinks and no new one opens.",
          "hold the loop — re-run on a cadence so a closed class can't silently reopen.",
        ],
      },
      {
        label: "obstacles & nuance",
        kind: "list",
        items: [
          "The instrument is held fixed across a fix, so an improvement is comparable rather than anecdotal — and a regression shows up as movement against a known reference, not a fresh investigation.",
          "The sample bounds the result — an error pattern that never enters the sample isn't addressed; the ground-truth adjudication is the load-bearing step.",
          "It reduces recurring, cause-shared errors; it is not a substitute for the model work that changes what the system can decide in the first place.",
        ],
      },
      {
        label: "where it lands",
        kind: "prose",
        items: [
          "This is the **model-quality / risk-ops layer** — the MLOps and QA loop an enterprise needs the moment a model makes live decisions. Described method-only: no platform name, no platform-internal data, no accuracy figures; portable to any live system whose decisions can be adjudicated against a ground truth.",
        ],
      },
    ],
  },

  "governance-patterns": {
    blocks: [
      {
        label: "the problem",
        kind: "prose",
        items: [
          "A rule that is checked once, or checked by one broad review, leaves a gap that widens silently — a grant outlives its reason, an over-claim slips past a reviewer weighing everything at once. The class is **policy that erodes between checks**: release safety, compliance, access control.",
        ],
      },
      {
        label: "mapping the universe",
        kind: "prose",
        items: [
          "Two failure shapes recur. One: a single reviewer averages away the weakness that falls between two concerns nobody owned. Two: an access control answers \"may this identity in, now?\" but never \"is the set it admits still the set that should be admitted?\" The resolution in both is to make the check a **standing, decomposed process** rather than a one-time act.",
        ],
      },
      {
        label: "the solution stack",
        kind: "layers",
        items: [
          "ship-panel — six independent, adversarial single-axis judges plus a synthesis pass; runs as the `/vetit` review stage over a repo, a bundle, or a single file; nothing ships until the report is CLEAR.",
          "access-as-code — every access control paired with a scheduled reconciliation loop that compares the granted set to the intended set and surfaces the drift.",
        ],
      },
      {
        label: "obstacles & nuance",
        kind: "list",
        items: [
          "The judges are independent (no anchoring) and adversarial (silence on an axis is a finding, not a skip); the synthesis is the only seat that sees the whole board, so the reader gets one report, not six.",
          "The reconciliation loop doesn't have to auto-revoke — surfacing the drift is what converts a silent divergence into an actionable one; the cadence is what makes the policy bite.",
        ],
      },
      {
        label: "where it lands",
        kind: "prose",
        items: [
          "This is the **governance / compliance layer** — release review plus access reconciliation, the IAM and change-control an enterprise audits and an MSP operates. The patterns travel because they are about an artifact's claims and an access set's drift, not a file type or a building.",
        ],
      },
    ],
  },

  "gfx1150-inference": {
    blocks: [
      {
        label: "the problem",
        kind: "prose",
        items: [
          "Running capable LLM inference on hardware that isn't a datacenter means fighting a physical ceiling — and most \"X beats Y\" backend comparisons are really measuring an uncontrolled environment. The class is **resource optimization under a hard constraint**: getting real throughput out of consumer or owned hardware, and knowing which gains are real.",
        ],
      },
      {
        label: "mapping the universe",
        kind: "prose",
        items: [
          "The lever space is backend (ROCm vs Vulkan), quant, flash-attention, RADV flags, and clock state — plus one structural escape, speculative decoding. Mapping it starts by pinning the ceiling: a roofline analysis fixes the memory-bandwidth wall, so every result reads as a fraction of a known limit instead of an absolute that hides the environment.",
        ],
      },
      {
        label: "the solution stack",
        kind: "layers",
        items: [
          "roofline — fix the memory-bandwidth wall for the device (~96 GB/s measured), giving a per-model token-generation ceiling.",
          "the backend matrix — sweep backend × quant × flash-attn × RADV flags across eight models; Vulkan wins token generation everywhere (82–91% of the wall), ROCm wins prefill nearly everywhere.",
          "speculative decoding — the one lever that beats the wall: a 14B target with a 1.5B draft measures 2.43× at the best draft-max.",
        ],
      },
      {
        label: "obstacles & nuance",
        kind: "list",
        items: [
          "The corrected baseline **is** the finding — an earlier \"Vulkan wins decisively\" read was mostly a parked GPU clock plus a per-backend quant artifact; re-running clock-locked on Q4_0 cut the gap roughly threefold.",
          "The 2.43× is a tuning-and-benchmark result measured against upstream `llama.cpp` binaries, not a daemon written here — a daemon-side integration is deferred, not built.",
          "The wall moves only with faster RAM or a wider bus; with it fixed, optimization is closing a known gap, not finding more headroom.",
        ],
      },
      {
        label: "where it lands",
        kind: "prose",
        items: [
          "This is the **AI-infra / cost layer** — getting capable inference out of constrained or owned hardware: the on-prem-versus-cloud cost decision an enterprise faces and the managed-inference offering an MSP builds. The harness is public as gfx1150-bench; the carve-out and the 2.43× reproduce on a clock-locked gfx1150.",
        ],
      },
    ],
  },

  "industrial-edge": {
    blocks: [
      {
        label: "the problem",
        kind: "prose",
        items: [
          "Off-highway equipment runs on CAN and ISOBUS buses with far less open tooling than cars have, so a captured bus is opaque and a field fix lives only in the head of whoever worked it out. The class is **closed-tooling domains**: making an opaque machine readable, and a one-time repair repeatable.",
        ],
      },
      {
        label: "mapping the universe",
        kind: "prose",
        items: [
          "The surface splits into the protocol side — what is public-standard versus proprietary OEM, and where a redistributable corpus can legally live — and the field side — a signal path with several possible upstream causes. Mapping the protocol space first is what bounds the build to pure-standard PGNs, a scope that stays unambiguous across every plausible repair-rights outcome.",
        ],
      },
      {
        label: "the solution stack",
        kind: "layers",
        items: [
          "opendbc-ag — an MIT-licensed agricultural CAN/ISOBUS DBC corpus, pure-standard PGNs only (2,690 PGNs, 2,780 signals across three public-source files), every signal commented with its origin.",
          "raven-viper — a GPS-dropout diagnostic that isolates an intermittent fault along receiver → bus → steering controller to a located cause (method; equipment kept general).",
          "sprayer-apprenticeship — a documentation-only curriculum turning the firmware-flash fix into a step-by-step procedure with failure modes and a check at each stage.",
        ],
      },
      {
        label: "obstacles & nuance",
        kind: "list",
        items: [
          "Scope is enforced by CI, not review — workflows reject any proprietary-range or cross-file-duplicate PGN across a Python version matrix, so the build rejects scope violations without a maintainer reading every line.",
          "The signal count is honest about its shape — most are PGN-level placeholders from the bulk public source awaiting enrichment; the developed signal-level definitions live in the hand-curated files.",
        ],
      },
      {
        label: "where it lands",
        kind: "prose",
        items: [
          "This is the **OT / edge layer** — where operational technology meets IT: making industrial buses inspectable and field procedures repeatable, the asset-management and edge-diagnostic work an MSP or an enterprise OT team owns. opendbc-ag is public; the field diagnostic and curriculum are method and documentation, kept general.",
        ],
      },
    ],
  },

  spaces: {
    blocks: [
      {
        label: "the problem",
        kind: "prose",
        items: [
          "A single machine has to serve many unrelated work contexts, and switching between them means manually reopening apps, re-tiling windows, and paying for idle ones in GPU and RAM. The class is **one surface, many contexts**: reshaping a machine to a use without forking the logic per platform.",
        ],
      },
      {
        label: "mapping the universe",
        kind: "prose",
        items: [
          "The build space spans full virtualization (heavy) to manual window management (no leverage). Chunked, the real seams are: how a context is described (data, not running processes), how windows are placed (one engine across different window managers), and how an idle context releases its resources without losing state. The invariant to factor out is the layout/placement math; everything platform-specific goes behind an adapter.",
        ],
      },
      {
        label: "the solution stack",
        kind: "layers",
        items: [
          "shared core — the Space data model and the zone/layout math in one Rust crate with no UI dependency.",
          "WM-adapter seam — a `WindowManagerAdapter` trait drives both Hyprland (directly) and GNOME (through a companion translating to Mutter's `move_resize_frame`).",
          "warden — a ~1,800-line Rust daemon that freezes an idle Space via the cgroup-v2 freezer and reclaims GPU/RAM, thawing with state intact.",
          "the .space manifest — a Space is defined in data; the running windows are a projection of it.",
        ],
      },
      {
        label: "obstacles & nuance",
        kind: "list",
        items: [
          "Freeze is a lifecycle boundary, not an isolation one — warden reclaims resources from an idle Space; it does not sandbox a running one. The per-Space data boundary is named design intent, not built.",
          "GNOME exposes no external window-control API — the companion is the only way to drive Mutter from outside, riding the existing Activities press rather than claiming a new global shortcut.",
        ],
      },
      {
        label: "where it lands",
        kind: "prose",
        items: [
          "This is the **endpoint / workspace layer** — one machine reshaped into switchable work contexts with their resources reclaimed: the standardization an enterprise wants on a managed endpoint and an MSP runs across a fleet. Shipped and dogfooded on an X1 Pro (GNOME surface v0: menu → launch → snap → freeze → thaw).",
        ],
      },
    ],
  },
};
