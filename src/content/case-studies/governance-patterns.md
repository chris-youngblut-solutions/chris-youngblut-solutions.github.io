---
title: Governance patterns — instruments that keep a rule enforced
summary: An adversarial multi-judge review panel and an access control paired with a reconciliation loop — two shapes for turning a declared rule into an enforced one.
date: "2026-06-17"
lenses: [governance, safety]
order: 5
---

Two patterns, one class. **The class is rules that are declared but not enforced — checks that run once and then drift silently.**

## ship-panel — an adversarial review panel

A reusable, args-driven panel: six independent single-axis judges plus a synthesis step. Each judge reviews an artifact on exactly one axis — for example audience-fit, over-claim, sycophancy, or defensibility — and returns a verdict scoped to that axis alone. A seventh pass, the synthesis, reads all six verdicts and reconciles them into one report. The panel runs as the review stage of the ship-prep gate (`/vetit`): an artifact does not ship until that report comes back CLEAR.

### The judges

Each judge is single-axis by design: given the artifact and one question, told to answer that question and no other. The constraint buys decomposition. A reviewer asked to weigh everything at once lets a strength on one dimension paper over a weakness on another, and the failure that gets through is the one that fell between two concerns nobody owned. Six narrow seats remove the averaging: an artifact that reads well but over-claims fails the over-claim judge regardless of how clean it is elsewhere; an artifact that is accurate but pitched at the wrong reader fails the audience-fit judge on its own.

The judges are independent. None sees another's verdict before issuing its own, so there is no anchoring — no judge softens a call because a neighbor was lenient, and none piles on because a neighbor was harsh. Six verdicts arrive as six separate readings of the same artifact.

The judges are adversarial by construction. Each is prompted to find the problem on its axis, not to confirm the artifact is acceptable. Because the default posture is suspicion, silence is a finding: no objection on an axis means the axis was examined and held, not skipped.

### The synthesis

The synthesis is the only seat that sees the whole board. It collects the six verdicts and reconciles them into a single report, sorting findings into what blocks a ship versus what merely advises. A block on any axis holds the artifact; advisories are recorded but do not gate. The output is one document a person reads, not six to merge by hand — decomposition happens inside the panel, recomposition in the synthesis, so the cost of six narrow reviews is paid by the machine, not the reader.

### Args-driven and reusable

The panel takes the artifact as an argument rather than being written against any one thing, so the same six-judge-plus-synthesis shape runs over a repository, a bundle, or a single file. The gate that vets a code repo before it goes public also vets a written bundle or a loose document before release; the axes travel because they concern the artifact's claims and posture, not its file type. A fixed, named set of axes also makes the review repeatable — the same artifact run twice is checked against the same six questions, so a CLEAR verdict means a specific, re-runnable thing rather than a reviewer's mood on a given day.

## access-as-code — an access control with a reconciliation loop

Pair every access control with a standing reconciliation loop that checks the control is doing what it claims. The control is the grant-or-deny mechanism. The loop is a separate, scheduled process that re-verifies, on a cadence, that the set of identities actually holding access still matches the set intended to hold it — and surfaces any difference.

### The two halves

The control alone answers one question at one instant: may this identity in, right now. It does not answer whether the set it currently admits is still the set that should be admitted. Those drift apart over time — a grant outlives the reason it was issued, a role changes without the corresponding access changing, an exception meant to be temporary becomes permanent because nothing removes it. A control with no second half degrades silently; nothing in the grant-or-deny path is responsible for noticing the standing set has gone stale.

The reconciliation loop is that second half. It runs on a cadence independent of any single access event, compares the granted set against the intended set, and emits the delta — entries present that should not be, and entries absent that should be. The loop does not have to revoke automatically to do its job; surfacing the drift converts a silent divergence into a visible, actionable one. The cadence is what does the enforcing: a rule checked only when written is a declaration; a rule re-checked on a schedule is enforced.

### Origin and generalization

The pattern came out of physical facility access: after-hours entry paired with a recurring reconciliation of who held access against who was supposed to. The mechanics were specific to a building; the shape is not. The same two halves apply to data access, system access, and credential issuance — anywhere a grant can outlive its justification. In each case the grant is the easy half to build and the reconciliation loop is the half routinely omitted, which is why the omission is the failure mode the pattern names.

## What they share

Both convert a rule from declared to enforced by making the check a standing process rather than a one-time act. The panel gates output on an explicit, repeatable, multi-axis review; access-as-code gates access on a standing reconciliation against an intended set. The failure mode designed out is the same in each: a check that runs once, or that averages away the thing it should have caught, leaves a gap that widens silently. Running the instrument every time — and decomposing it so nothing falls between concerns — closes the gap.

## Status

ship-panel is in use as the `/vetit` review stage and runs over repositories, bundles, and single files. access-as-code is a pattern, applied across physical and system-access contexts rather than packaged as a single tool.
