// Mechanism-view leads for the case studies (the "Writing" section). Each entry
// re-leads its writeup from how the work operates: the disposition (the reusable
// pattern), the class of problem it solves (generalized), where it shows up
// across domains (the cross-domain proof), and the proof (the concrete artifact).
// Neutral register — the mechanism frame is the lead, not hype. The verified
// detail lives in the markdown body (src/content/case-studies/<slug>.md); this
// file owns only the lead. Keyed by case-study slug (the file id).
//
// Sanitization is load-bearing here: trust & safety stays method-only (no
// platform name, no internal data, no accuracy figures); the legal practice is
// capability-only ("a solo-attorney practice", no client/matter content);
// equipment specifics stay general. Facts mirror the verified bodies.
import type { Block } from "./projects";

export interface CaseStudyMechanism {
  framing: string;
  blocks: Block[];
}

export const caseStudyMechanisms: Record<string, CaseStudyMechanism> = {
  "pipeline-methodology": {
    framing:
      "FDE roles ask for reusable delivery assets — deployment kits, cookbooks, repeatable engagement scaffolding. This is the pipeline I use to take a project from a blank scoping question to a signed, hardened public release, and the artifacts that make it repeatable.",
    blocks: [
      {
        label: "the disposition",
        kind: "prose",
        items: [
          "Encode the rule as a gate. Take a standard that normally rides on attention — something a person has to remember to check — and make it a machine-checked step that runs every time, so the gate does the work vigilance used to.",
        ],
      },
      {
        label: "the class of problem",
        kind: "prose",
        items: [
          "Any standard that erodes under scale, time, or turnover because it depends on attention: release safety, compliance, quality thresholds, cost ceilings, credential hygiene. Wherever “we’ll review for it” is the only enforcement, the standard drifts.",
        ],
      },
      {
        label: "where it shows up",
        kind: "layers",
        items: [
          "this pipeline — `/shipit` refuses to flip a repo public until `/vetit`’s BLOCK bucket is empty, and the denylist the gate greps is the same source the pre-commit hooks check, so a leak is caught at commit time and at the gate.",
          "opendbc-ag — CI rejects any out-of-range or duplicated PGN automatically; the build, not a maintainer, enforces scope.",
          "a solo-attorney legal practice — quality thresholds enforced as retrieval gates rather than a final read-through (capability only).",
          "industrial preventive maintenance — a baseline-and-deviation check that catches a failure before it happens, not after.",
        ],
      },
      {
        label: "the proof",
        kind: "prose",
        items: [
          "Eight repos have shipped through `/sendit → /vetit → /shipit` to public, each arriving with a dual license, pre-commit plus CI, a sanitization gate it has passed, branch protection, and signed releases. The path is identical every run; the gates are the same instruments each time.",
        ],
      },
    ],
  },

  "cartography-and-graphs": {
    framing:
      "Two recurring demands in the roles I target: mapping unfamiliar systems, and knowledge-graph / retrieval work. These are the artifacts that show both — a wide-net cartography method and two typed graphs over real corpora.",
    blocks: [
      {
        label: "the disposition",
        kind: "prose",
        items: [
          "Map the surface before committing to a path, and build the instrument that does the seeing rather than just looking. The method is schema-first: define the node and edge types before touching the data, parse a real corpus into exactly those types, then query across the result — so the structure is queryable, not a diagram.",
        ],
      },
      {
        label: "the class of problem",
        kind: "prose",
        items: [
          "Any problem that starts with an unfamiliar landscape or an unstructured corpus: technology and vendor scoping, domain onboarding, retrieval and knowledge-graph work, cross-domain pattern recognition. The recurring need is to make a large, messy surface answerable before deciding what to build on it.",
        ],
      },
      {
        label: "where it shows up",
        kind: "layers",
        items: [
          "galaxy-map — a wide-net `/mapit` triage catalog of every component, vendor, and technology in an area, scored against fixed constraints, written before any build decision.",
          "mechanism-graph — a typed KuzuDB graph over a de-identified career-evidence corpus; a cross-domain probe returns the cluster mechanisms spanning three-plus domains in 24 ms.",
          "dev-tel-graph — the same schema-first method on a different corpus and a different graph engine, testing that the approach transfers; spike stage.",
        ],
      },
      {
        label: "the proof",
        kind: "prose",
        items: [
          "The graphs are real and queryable: mechanism-graph holds 93 mechanisms, 10 domains, 6 through-lines, and 316 evidence nodes under a versioned schema that separates the invariant from the method, and the cross-domain query that justifies the structure runs as a single traversal. The corpus is de-identified — no client data.",
        ],
      },
    ],
  },

  "rca-enforcement-model": {
    framing:
      "Trust & Safety and AI-governance roles ask for a way to make a live model’s decisions measurably better and keep them there. This is the method, run in production at scale, for finding where an enforcement model is wrong, fixing the cause, and holding the line on a cadence. It is described as a repeatable program, employer-agnostic, with no platform-internal data.",
    blocks: [
      {
        label: "the disposition",
        kind: "prose",
        items: [
          "Trace an error to its cause, fix the cause, and stand up a measurement loop so the same class can’t quietly reopen. Group failures by what is going wrong underneath rather than by what the wrong outcome looked like, so one fix closes a whole class instead of one case at a time.",
        ],
      },
      {
        label: "the class of problem",
        kind: "prose",
        items: [
          "Any system that makes adjudicable decisions against a ground truth and drifts over time: live-ML decision quality, enforcement and risk, and — the same shape, earlier — multi-layer hardware and equipment fault-finding. The recurring need is to keep a moving system correct, not to correct it once.",
        ],
      },
      {
        label: "where it shows up",
        kind: "layers",
        items: [
          "trust & safety — a root-cause program on a production enforcement model: measure against ground truth, build a cause-first taxonomy, trace, feed the correction back, hold the loop on a cadence (method-only).",
          "handheld GPU inference — a multi-layer re-baseline that traced an apparent runtime gap to an uncontrolled clock and a quant artifact, not the backend (gfx1150-bench).",
          "industrial equipment — an intermittent GPS-dropout fault isolated along the signal path to a located cause rather than a guess.",
          "preventive maintenance — baseline-and-deviation tracking that catches a fault while it is small.",
        ],
      },
      {
        label: "the proof",
        kind: "prose",
        items: [
          "Run in production trust & safety at platform scale, described here as a repeatable five-step program — employer-agnostic, with no platform name, no platform-internal data, and no accuracy figures. The method is portable to any live system whose decisions can be adjudicated against a ground truth.",
        ],
      },
    ],
  },

  "governance-patterns": {
    framing:
      "Governance and AI-safety roles ask for instruments that make a policy actually hold. Two I build and reuse: a multi-judge adversarial panel that audits output before it ships, and an access-control-plus-reconciliation pattern that makes an access rule bite.",
    blocks: [
      {
        label: "the disposition",
        kind: "prose",
        items: [
          "Make a rule something that runs as a standing process, not a one-time act — and when the check is a judgment, decompose it into independent single-axis reviews so nothing falls between two concerns nobody owned. The recomposition is paid by the machine; the reader gets one report.",
        ],
      },
      {
        label: "the class of problem",
        kind: "prose",
        items: [
          "Any place a check averages away the thing it should have caught, or runs only once: release review, compliance and risk, access control, content adjudication. The failure mode the pattern names is the silent gap a single, broad, one-shot check leaves behind.",
        ],
      },
      {
        label: "where it shows up",
        kind: "layers",
        items: [
          "ship-panel — six independent, adversarial single-axis judges plus a synthesis pass; runs as the `/vetit` review stage over a repo, a bundle, or a single file, and an artifact does not ship until the report is CLEAR.",
          "access-as-code — every access control paired with a scheduled reconciliation loop that compares the granted set against the intended set and surfaces the drift; originated in physical facility access, generalizes to data, system, and credential access.",
          "release gates — branch protection, required checks, and signed releases wired into every public repo, so “safe to ship” is a gate rather than a judgment call.",
        ],
      },
      {
        label: "the proof",
        kind: "prose",
        items: [
          "ship-panel is in use as the review stage of the ship gate and runs unchanged across repositories, bundles, and single files; the same six-axis shape backs every public release here. access-as-code is applied across physical and system-access contexts as a pattern rather than a single packaged tool.",
        ],
      },
    ],
  },

  "gfx1150-inference": {
    framing:
      "AI-infrastructure roles ask for inference optimization on real hardware. This is a benchmark-and-tuning study on a handheld AMD iGPU (Radeon 890M, gfx1150): a roofline analysis, an 8-model ROCm-vs-Vulkan matrix, and a 2.43× speculative-decoding result, with a reproducible harness published as gfx1150-bench.",
    blocks: [
      {
        label: "the disposition",
        kind: "prose",
        items: [
          "Fix the physical ceiling first, then measure everything against it. A roofline analysis pins the memory-bandwidth wall for the device, every backend and quant is measured as a fraction of that wall, and the one lever that beats the wall is isolated — so optimization becomes closing a known gap rather than chasing headroom that isn’t there.",
        ],
      },
      {
        label: "the class of problem",
        kind: "prose",
        items: [
          "Resource optimization under a hard constraint: getting real inference out of consumer hardware, cost-performance tradeoffs, and routing a workload to the backend that fits it. The recurring move is to separate a genuine limit from a fixable inefficiency before spending effort.",
        ],
      },
      {
        label: "where it shows up",
        kind: "layers",
        items: [
          "gfx1150 backend matrix — Vulkan wins token generation in every cell, ROCm wins prompt processing in nearly every cell, so chat-shaped work routes to Vulkan and long-context prefill to ROCm; generation sits at 82–91% of the bandwidth wall.",
          "speculative decoding — the one lever that beats the wall: a 14B target with a 1.5B draft measures 2.43× at the best draft-max, a tuning-and-benchmark result against upstream binaries, not a daemon written here.",
          "multi-GPU serving — a hand-written FastAPI router in front of vLLM on dual 3090s, placing each request on the GPU that fits.",
        ],
      },
      {
        label: "the proof",
        kind: "prose",
        items: [
          "The harness, the pinned methodology, and the raw CSVs are public as gfx1150-bench; the backend carve-out and the 2.43× reproduce from it on a clock-locked gfx1150 device. The corrected baseline is the point of the work — an earlier “Vulkan wins decisively” reading was mostly an uncontrolled-clock artifact.",
        ],
      },
    ],
  },

  "industrial-edge": {
    framing:
      "Industrial-automation and edge roles ask for hands-on work where OT meets IT — field equipment, buses, edge devices. This pairs a CAN/GPS diagnostic on agricultural spray equipment with a curriculum that taught the firmware-flash procedure, alongside the public CAN-protocol library that backs the domain.",
    blocks: [
      {
        label: "the disposition",
        kind: "prose",
        items: [
          "Bring inspectable tooling to a domain that doesn’t have it, and decompose a field failure along its signal path to a located cause. Where automotive has open protocol libraries and capture workflows, off-highway equipment mostly doesn’t — so the work is to build the missing corpus and write the fix down so others can run it.",
        ],
      },
      {
        label: "the class of problem",
        kind: "prose",
        items: [
          "Domains with closed or opaque tooling and hands-on OT/IT work: protocol reverse-mapping to public standards, bus-level diagnostics on real equipment, and turning a one-time fix into a teachable procedure. The recurring need is to make an opaque machine readable and its repair repeatable.",
        ],
      },
      {
        label: "where it shows up",
        kind: "layers",
        items: [
          "opendbc-ag — an MIT-licensed agricultural CAN/ISOBUS DBC corpus (pure-standard PGNs only) that makes a captured ag bus readable; scope enforced by CI, not review.",
          "raven-viper — an intermittent GPS-dropout fault on a self-propelled sprayer isolated along receiver → bus → steering controller to a located cause (method; equipment kept general).",
          "sprayer-apprenticeship — a documentation-only curriculum that turns the firmware-flash fix into a step-by-step procedure with failure modes and a check at each stage.",
          "industrial automation — the earlier ground for the same disposition: pneumatic and hydraulic systems and preventive maintenance, read at the mechanism level.",
        ],
      },
      {
        label: "the proof",
        kind: "prose",
        items: [
          "opendbc-ag is public, MIT-licensed, and the first repo through the delivery pipeline: 2,690 PGNs and 2,780 signals across three DBC files from distinct public sources, every signal commented with its public origin, and three CI workflows — one runs the test suite across a Python 3.10–3.13 matrix, another rejects proprietary-range and duplicate PGNs — so scope is enforced by the build, not review. The field diagnostic and curriculum are method and documentation, kept general.",
        ],
      },
    ],
  },

  spaces: {
    framing:
      "The forward-deployed roles I’m pursuing keep describing the same build: a configurable platform that adapts one surface to many contexts — agentic platforms, control planes, package hosts. Spaces is that pattern.",
    blocks: [
      {
        label: "the disposition",
        kind: "prose",
        items: [
          "Factor the invariant into a shared core and put everything platform-specific behind an adapter seam, so one engine targets very different backends without knowing which it’s driving. The durable artifact is data — a Space is defined by a manifest, and the running windows are a projection of it.",
        ],
      },
      {
        label: "the class of problem",
        kind: "prose",
        items: [
          "Any problem where one capability has to run across heterogeneous surfaces or contexts without forking the logic: a configurable platform that adapts one surface to many uses, control planes, multi-backend tooling. It is the same shape the forward-deployed roles describe — one platform, many deployments.",
        ],
      },
      {
        label: "where it shows up",
        kind: "layers",
        items: [
          "Spaces' WM-adapter seam — one Rust core drives both Hyprland (directly) and GNOME (through a companion translating to Mutter’s `move_resize_frame`) behind a single `WindowManagerAdapter` trait.",
          "the eval harness — one domain-agnostic engine; each domain is a pack behind a `--domain` seam, added without touching the loop, runner, or scoring.",
          "multi-GPU serving — a hand-written FastAPI router puts one interface in front of vLLM across the GPUs, placing each request on the GPU that fits.",
        ],
      },
      {
        label: "the proof",
        kind: "prose",
        items: [
          "Shipped and dogfooded on an X1 Pro handheld: the shared core and zone math, the Hyprland adapter, warden’s freeze/thaw, and a GNOME surface v0 that runs the full loop (menu → launch → snap → freeze → thaw) on GNOME 49.6/Wayland. The per-Space sandbox is named design intent, not built — Spaces organize, they don’t yet isolate.",
        ],
      },
    ],
  },
};
