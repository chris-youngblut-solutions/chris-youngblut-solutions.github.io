---
title: Enforcement RCA — a root-cause program for a live ML model
summary: A repeatable root-cause-analysis program for a live ML enforcement system. Methodology only — no platform-internal data.
date: "2026-06-17"
lenses: [trust-safety, governance]
order: 4
---

A root-cause-analysis (RCA) program for a production machine-learning system that makes enforcement decisions. It measures where the model's decisions are wrong, groups those errors by cause, traces each cause back through the decision path, feeds a correction into the enforcement logic, and re-runs the same measurement on a cadence so the loop stays closed.

## The method

The program is five steps, run in order, then repeated. Each step has one job and hands a defined output to the next.

- **Measure against ground truth.** Take a sample of the model's production decisions and adjudicate each one against the correct outcome — what the decision should have been, decided independently of what the model did. The disagreements are the errors. Recording them this way gives a baseline that is a fact about the model's behavior, not an impression of it. Everything downstream is measured against this same baseline.

- **Build an error taxonomy by cause, not symptom.** Sort the errors into classes, and choose the classes by what is going wrong underneath rather than by what the wrong decision looked like. Two decisions that look unrelated on the surface can share a single origin; two that look identical can come from different places. Grouping by cause is what lets one fix close a whole class instead of one case at a time, and it keeps the work from chasing symptoms that keep reappearing.

- **Trace to root cause.** For each class, follow a representative error backward through the decision path to where it actually originates — the point where the input, a feature, a threshold, or a rule first sends the decision the wrong way. The trace ends at a cause specific enough to act on, not at a restatement of the symptom.

- **Feed the correction back.** Translate each root cause into a concrete change in the enforcement logic. Then re-measure with the same instrument: the change is confirmed only when the targeted class shrinks and no new class opens in its place. A fix that closes one class while creating another is not an improvement, and measuring both sides the same way is what makes that visible.

- **Hold the loop.** Re-run the measurement on a cadence rather than treating it as a one-time audit. The model, its inputs, and the world it decides over all drift; a fix that held last quarter can erode, and a class that was closed can reopen. Standing measurement is what catches a regression while it is small instead of after it has compounded.

## Why these choices

Three decisions carry the program, and each is a deliberate trade.

The taxonomy is organized by cause because the alternative — grouping by what the error looked like — scales with the number of cases, not the number of problems. A cause-first taxonomy turns a long list of individual misfires into a short list of fixable origins, and it is the difference between patching cases and closing classes.

The measurement instrument is held fixed across a fix. Using the same sampling and the same adjudication before and after means an improvement is comparable rather than anecdotal — a change in the number reflects a change in the model, not a change in how it was measured. It also makes a regression legible: when the same instrument reports the class growing again, that is a signal and not noise.

The loop is standing rather than one-shot because an enforcement model lives in a moving target. A single audit describes the model on the day it ran; a cadence describes the trend. The cost is the recurring work of re-measuring, and the program accepts that cost as the price of catching drift early.

## What the cadence catches

Holding the loop surfaces three things a one-time pass cannot. It catches **regressions** — a previously closed class reopening as inputs shift. It catches **new classes** — error patterns that did not exist at the last measurement because the model, the policy it encodes, or the distribution it sees has changed. And it catches **fixes that did not hold** — corrections that moved the number once and then eroded. Because each pass uses the same instrument as the baseline, these show up as movement against a known reference rather than as a fresh investigation each time.

## Boundaries

The program is a method, and its honest limits are part of it. It improves the classes it measures; an error pattern that never enters the sample is not addressed by it, so the quality of the sample bounds the quality of the result. The adjudication against ground truth is the load-bearing step — if "the correct outcome" is decided poorly, every downstream number inherits the error. And the loop reduces recurring, cause-shared errors efficiently; it is not a substitute for the model work that changes what the system can decide in the first place.

## Status

Run in production Trust & Safety at platform scale. Described here as methodology only — no platform name, no platform-internal data, policy, tooling, or case content, and no accuracy figures. The method is portable to any live ML system that makes adjudicable decisions against a ground truth. Employer attribution, public on the résumé, can be added at placement; the body is kept employer-agnostic.
