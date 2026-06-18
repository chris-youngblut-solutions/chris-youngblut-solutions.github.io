---
title: A project-delivery pipeline (mapit → shipit)
summary: A five-stage promotion pipeline (T0 → T1 → T2) implemented as tooling, plus the continuity and decision artifacts that make engagements repeatable.
date: "2026-06-17"
lenses: [fde, delivery]
order: 2
---

A five-stage promotion pipeline, implemented as Claude Code skills, plus the continuity and decision artifacts around it. Each stage is a command; each promotes a project one step along a fixed lifecycle: T0 (scratch, no git) → T1 (private repo) → T2 (public repo). Tier is lifecycle state, not a directory layout — a stage is what moves a project from one state to the next, and each stage adds only the artifacts the next tier requires.

## The lifecycle

There are three tiers and they only move forward.

- **T0** is a scratch container with no `.git` — scope notes, task lists, decision records, and working files, but nothing under version control yet.
- **T1** is a private GitHub repo, scaffolded with the things a real project needs: a license, a pre-commit config, a task runner, and CI.
- **T2** is a public GitHub repo with the additional artifacts a public release requires — contribution and security docs, code ownership, branch protection, and signed releases.

A project enters at T0 and is promoted one tier at a time. Nothing skips a tier, and nothing is demoted; retirement is a separate move (archive the repo) rather than a step backward through the pipeline. Because the path is fixed, the same gates run in the same order on every project.

## The stages

Each stage is a single command. The first two operate on the scratch container; the last three operate on the repo.

- **`/mapit`** — universe-scoping cartography. It produces a wide-net triage catalog of every component, vendor, and technology in an area, scored against fixed constraints (the available hardware, the standing license posture, the active domains). The output is a dated map. This stage is triage only: it deliberately does not pick a winner or commit to a build, so that the option surface is captured before it narrows. It is run before a project candidate exists, when the landscape itself is still unclear.
- **`/pointit`** — promotes one candidate off a map into a T0 dev-scoping container. It seats the container bones — `scope/`, `tasks/`, `adr/`, and `work/` directories — plus a structured scope stub. It explicitly does **not** run `git init`; a T0 container has no `.git` by design, which keeps scoping cheap and reversible. This is the step where a line on a map becomes a concept worth fleshing out.
- **`/sendit`** — promotes T0 → T1. It creates the private repo, symlinks the workspace container back to it, and layers the T1 scaffolding from templates: a license (dual Apache-2.0 / MIT by default), a pre-commit config, a task runner, and CI. It then pushes the repo private. This is the point at which a scoped concept becomes a real, version-controlled project.
- **`/vetit`** — the read-only ship-prep gate between T1 and the public flip. It is artifact-agnostic (it can vet a repo, a bundle, or a single file) and it never edits, remediates, or publishes anything. It runs two passes: an automated sanitization sweep (a denylist grep, a full-history secret scan, and a private-key/credential regex) and a six-judge adversarial review panel with a synthesis pass. It consolidates the result into a dated, re-runnable report with two buckets — BLOCK-publish and ADVISE. The next stage refuses to run until the BLOCK bucket is empty, so the gate is re-run each remediation round until it comes back clear.
- **`/shipit`** — promotes T1 → T2. It layers the tier-2 artifacts (contribution guide, security policy, code ownership), flips the GitHub repo from private to public, moves it into the public part of the substrate, re-points the workspace symlink, and applies the hardening: branch protection, secret scanning, and signed releases. Releases are signed with cosign keyless via Actions OIDC, and an SBOM (syft) plus SLSA provenance ride along at the public tier rather than being separate opt-in decisions.

## The gates

Each stage has a precondition the previous stage establishes, so a project cannot arrive at a stage in the wrong state.

- The map gate is that `/mapit` stays in triage and does not converge into a build decision; the candidate that `/pointit` consumes is chosen deliberately, after the option surface is mapped.
- The T0 gate is the absence of `.git` — scoping happens with no version-control commitment, and `/sendit` is the act that introduces it.
- The ship gate is the hard one: `/shipit` aborts without a clear `/vetit` report. The BLOCK bucket must be empty before the visibility flip can happen, and the same report is re-run after each fix. The denylist that the sanitization pass greps against is a single source of truth, read by both the automated gate and the adversarial panel, so the two checks agree on what counts as a leak.

## The supporting artifacts

The stages move a project forward; three standing artifacts keep the work coherent across sessions and over time.

- **Session continuity** — `/handoff` writes an end-of-session package containing a raw active-context dump, a reasoning dump, and an entrypoint prompt for the next session; `/intake` consumes the oldest pending package first-in-first-out and archives it after reading. A session can resume cold from the package rather than from memory.
- **Decision register** — standing ("locked") decisions are recorded centrally and reviewed on a cadence (15 / 30 / 60 / 180-day buckets), with an append-only ledger of revisions and retirements. A review pass re-opens settled decisions on schedule and walks each one through hold / revise / retire / re-snooze — the inverse of the fork-review pass that closes open questions.
- **Guardrail hooks** — the pre-commit framework (config in `.pre-commit-config.yaml`, installed at first scaffold) runs format, lint, and secret-scanning hooks before a commit lands. The denylist that the ship gate reads is the same source these hooks check against, so a credential is caught at commit time, not only at the ship gate.

## What it produces

A project that runs the full chain arrives at a public repo with a dual license, pre-commit plus CI, a sanitization gate it has passed, branch protection, signed releases, an SBOM, and SLSA provenance. The path is identical every time, and the gates are the same instruments on each run.

## Status

In daily use. Eight repos have shipped through `/sendit → /vetit → /shipit` to public: opendbc-ag (the first), voicekb, gfx1150-bench, dbt-semantic-mcp, kpi-console, agentic-eval-harness, spec-renderer, and okf-pack. The pipeline is the path every public repo here took from idea to release.
