// Problem-class bookends for the case studies (the "Writing" section). Each
// entry carries exactly two blocks: `the problem` (the lead — the CLASS of
// problem being solved) and `where it generalizes` (the close — the layer where
// the same shape recurs). The full detail in between is the markdown body at
// src/content/case-studies/<slug>.md, which the page renders between these two
// blocks. This file owns only the bookends.
// Neutral register. Keyed by case-study slug (the file id).
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
        label: "where it generalizes",
        kind: "prose",
        items: [
          "This is the **SDLC / release-governance layer** — the gates between a developer's commit and a signed public artifact. The same shape recurs anywhere code has to ship under review. Eight repos have shipped through it to public.",
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
        label: "where it generalizes",
        kind: "prose",
        items: [
          "This is the **BI / knowledge layer** — cataloging a domain or corpus so it is queryable: the discovery step before a data or vendor decision, the scoping pass over an unfamiliar stack, the retrieval substrate under a knowledge product.",
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
        label: "where it generalizes",
        kind: "prose",
        items: [
          "This is the **model-quality / risk-ops layer** — the MLOps and QA loop the moment a model makes live decisions. Described method-only: no platform name, no platform-internal data, no accuracy figures; portable to any live system whose decisions can be adjudicated against a ground truth.",
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
        label: "where it generalizes",
        kind: "prose",
        items: [
          "This is the **governance / compliance layer** — release review plus access reconciliation: IAM and change-control. The patterns travel because they are about an artifact's claims and an access set's drift, not a file type or a building.",
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
          'Running capable LLM inference on hardware that isn\'t a datacenter means fighting a physical ceiling — and most "X beats Y" backend comparisons are really measuring an uncontrolled environment. The class is **resource optimization under a hard constraint**: getting real throughput out of consumer or owned hardware, and knowing which gains are real.',
        ],
      },
      {
        label: "where it generalizes",
        kind: "prose",
        items: [
          "This is the **AI-infra / cost layer** — getting capable inference out of constrained or owned hardware: the on-prem-versus-cloud cost decision, and the engineering under a managed-inference offering. The harness is public as gfx1150-bench; the carve-out and the 2.43× reproduce on a clock-locked gfx1150.",
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
        label: "where it generalizes",
        kind: "prose",
        items: [
          "This is the **OT / edge layer** — where operational technology meets IT: making industrial buses inspectable and field procedures repeatable — asset-management and edge-diagnostic work. opendbc-ag is public; the field diagnostic and curriculum are method and documentation, kept general.",
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
        label: "where it generalizes",
        kind: "prose",
        items: [
          "This is the **endpoint / workspace layer** — one machine reshaped into switchable work contexts with their resources reclaimed: endpoint standardization that scales across a fleet. Shipped and dogfooded on an X1 Pro (GNOME surface v0: menu → launch → snap → freeze → thaw).",
        ],
      },
    ],
  },
};
