---
title: SecondChair — self-hosted legal RAG
summary: A self-hosted, privilege-aware legal retrieval-and-analysis system built with a solo-attorney practice; v1 shipped to production in a seven-day engagement.
date: "2026-06-17"
lenses: [retrieval, fde]
order: 8
---

A legal practice's working knowledge lives across a case-management system, a document store, and the attorney's own memory, and a question rarely maps to one of them cleanly. The hard part is not search; it is that some of what the search would surface is privileged, and the line between what may be returned and what may not is a property of the matter, not of the words in the query. **The class is forward-deployed delivery of a retrieval system whose access rules are part of the retrieval, built by embedding with the customer rather than gathering requirements at a distance.**

## The constraint

Some documents can't leave the building. Attorney–client privilege, sealed records, work product: the moment a corpus is legally un-cloudable, the managed-AI market is off the table, and retrieval gets built on hardware you control. That constraint is not a limitation here; it is the design.

## What it is

A self-hosted retrieval-and-analysis pipeline for legal case files. It pairs vector search with a knowledge graph, exposes the corpus to Claude through an MCP tool server, and runs a multi-pass agent pipeline that produces structured, provenance-checked analysis of a case rather than only retrieved passages. v1 was built and shipped in seven days for a state supreme-court appeal, then rebuilt into the multi-pass system described here: seven days to a shipped v1, three analysis passes, two models right-sized per pass, five tool families.

It is a working system for a solo-attorney practice, self-hosted on a homelab — purpose-built, not a multi-tenant product. Retrieval runs on local GPUs; the reasoning model runs in-session today, and v3 brings it local too.

## The pipeline

Documents are parsed, embedded, and graphed, then read by an analysis pass that can search the corpus while it reasons. Retrieval runs entirely on local GPUs.

- **Case-management sync.** An integration pulls matters and documents from the practice's case-management system into the index, so retrieval reads from the source of truth the attorney already maintains — the index stays a current reflection of the practice's work, not a snapshot taken once.

- **Two stores.** Hybrid dense + sparse + late-interaction retrieval in Qdrant, beside a Neo4j knowledge graph of parties, citations, and timeline, queried with Cypher — match passages and traverse relationships. The two stores answer different questions about the same corpus, and the retrieval layer draws on both.

- **The right model per pass.** Sonnet for high-volume extraction and graph building; Opus reserved for legal reasoning. Both run in-session — no external keys, so a missing model fails loudly.

- **Retrieval during reasoning.** Embedding happens before analysis, so the reasoning pass has live search over the whole corpus while it works — not one prompt's worth of context.

- **Checked, not trusted.** Every finding is validated against retrieved provenance, with automatic retries on failure. The pipeline flags a gap rather than invent a citation.

- **Privilege enforced in retrieval.** Queries run through a seven-filter privilege pipeline that decides what may surface, and document access is a code-level gate. Privilege is part of retrieval, not bolted on after: a result that should not be returned is excluded where results are assembled, not hidden in a display step a different code path could bypass. In this domain returning the wrong thing is a worse failure than returning nothing, so the privilege pipeline and the access gate are the load-bearing choices.

The stack:

- **Vector store** — Qdrant; hybrid dense + sparse + late-interaction (ColBERT), cross-encoder reranked
- **Knowledge graph** — Neo4j; parties, citations, timeline; PageRank + community detection
- **Embeddings / rerank** — BGE-M3 and bge-reranker-v2-m3, GPU-served, local only
- **Reasoning** — in-session Sonnet + Opus, right-sized per pass; moving local (Qwen3) in v3
- **Access layer** — MCP (FastMCP); the case-work query surface and the analysis pass's retrieval
- **Serving / orchestration** — vLLM, Docker Compose, systemd
- **Isolation** — Tailscale mesh, zero public endpoints; storage, embeddings, and retrieval stay on owned hardware

## What v1 taught us

v2 is the current architecture: a rebuild that turned the seven-day v1 from a search tool into a multi-pass analysis pipeline. Pass 1 (Sonnet) extracts and embeds, Pass 2 (Sonnet) builds the graph, Pass 3 (Opus) runs deep analysis with live retrieval over MCP.

v1 shipped in seven days and worked. Running it on a real case exposed the gaps; each became a v2 fix:

- Embedding happened after analysis, so the reasoner couldn't search while reasoning → reordered: embed in Pass 1, Opus gets live MCP retrieval in Pass 3.
- The reranker was configured but never called → cross-encoder rerank wired into the live path.
- Regex extraction, with a silent keyword fallback when no key was present → in-session Sonnet/Opus agents; a missing model fails loudly.
- Vector-only, so no relationship reasoning → Neo4j knowledge graph added beside the vectors.
- Shallow analysis, with citation scores inflated by duplicate filings → richer graph schema plus dedup.

v3 removes the last external dependency. v2's retrieval is already local, but its reasoning still runs on in-session frontier models; v3 swaps them for a self-hosted Qwen3 suite, so nothing leaves owned hardware at all. Models pulled and staged; cutover awaiting go-ahead — v3 staged · gated.

## Engineered for the input

Real court records are not clean PDFs. They are scanned filings — e-file stamps banded across every header, exhibits that are photographs, image-only record returns — and off-the-shelf extraction quietly drops half of it. Extraction was built to assume the worst:

- **A layered fail-loop.** Each page runs through a cascade of fallbacks — native text, then OCR, then vision — so a stamped or scanned page is never silently skipped. Every page is classified and routed to the method that can read it.
- **A tuned threshold.** A words-per-page threshold, tuned on real filings, decides when a page needs OCR — so header-stamped scans stop masquerading as text and slipping through empty.
- **Exhibits become searchable.** Photographs, maps, and site plans route to a vision model and join the searchable record — the exhibits plain extraction would leave invisible.

The result is a record where every page is readable and every exhibit is findable — the hard part of legal retrieval handled at ingest instead of discovered at query time.

## The query surface

The attorney works through a single surface: a case-work MCP server exposed to Claude, so the model can act over the case material rather than only describe it. The same server feeds the analysis pass. The tools group into five families of legal question:

- **Search & retrieval** — hybrid semantic + lexical search, by section, party, date, citation, or similarity.
- **Citation & authority** — authority lookup, citation chains, co-citation clusters, treatment maps across the record.
- **Argument & strategy** — argument maps, counter-arguments, vulnerability assessment, tracing an issue across filings.
- **Document structure** — section and sibling-chunk navigation, full-text retrieval, table-of-authorities extraction.
- **Timeline & procedural** — chronological docket views, filing timelines, and procedural posture, reconstructed from the graph.

The catalog grew from a small implemented core toward a fuller set, then was trimmed to what earns its place. Families are the public view; per-tool detail stays private.

## The engagement

The delivery shape is forward-deployed: embed with the customer, learn the workflow from inside it, and ship a production system fast. The seven days were not a prototype that someone else would later harden — the system that left the engagement is the system that runs. Working embedded with the practice is what made the privilege model correct, because what may surface for a given query is something the practice knows and an outside specification would get wrong. Building it in close working contact collapsed the usual distance between "what was asked for" and "what the work actually needs."

## Where it generalizes

The instance is legal, but the pattern is not. Any domain where retrieval has to respect an access rule that belongs to the record rather than the query — health, finance, regulated records of any kind — has the same shape: an index over a system of record, a hybrid retrieval layer, and an access constraint enforced where results are assembled rather than where they are displayed. And the delivery model travels further than the architecture. Embedding with a customer, reading the workflow from inside it, and shipping a production system in a week is a way of working that applies wherever the gap between a stated requirement and the real need is the thing that sinks projects.

## Status

In production with a solo-attorney practice; the practice has reached the Iowa Supreme Court. Self-hosted on a homelab — purpose-built, not a multi-tenant product. Retrieval runs on local GPUs; reasoning runs in-session today, with the v3 local (Qwen3) cutover staged and gated. Described here as architecture and engagement shape only — no client, attorney, or matter detail, no case content, and no accuracy figures; tool families are the public view, and per-tool detail stays private. The stack (BGE-M3, Qdrant, Neo4j, MCP) and the privilege-aware design are the portable parts; the delivery model — forward-deployed, embedded, seven-day ship — is the point.
