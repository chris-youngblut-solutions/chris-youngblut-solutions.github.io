---
title: System cartography — schema-first maps and typed graphs
summary: A wide-net cartography method that catalogs an unfamiliar domain before any build, and two typed graphs that make a corpus queryable.
date: "2026-06-17"
lenses: [retrieval, mapping]
order: 3
---

Three related artifacts: a cartography method that catalogs an unfamiliar domain before any build, and two typed graphs that make a corpus queryable. **The class is schema-first structure: define the node and edge types before touching the data, parse a real corpus into exactly those types, then query across the result.** Each artifact applies that method to a different kind of corpus — an unfamiliar technology domain, a career-evidence corpus, a telemetry vault — and at a different stage of maturity.

## Cartography (galaxy-map)

The `/mapit` method produces a universe map: a wide-net triage catalog of every component, vendor, and technology in an area, written before any build decision is made. The output is a dated document per area.

The map is the deliverable, not a recommendation. Deciding which component to adopt is a separate, later step — the map exists to make that decision possible by establishing the full surface of options first. Each entry is scored against the constraints that actually apply to the work: the hardware on hand, the standing license posture, and the domains already in play. The catalog stays wide — nothing is filtered out prematurely — while still flagging what fits.

This is the lightest-weight of the three artifacts and the only one with no graph behind it: the structure lives in the document's schema (component, vendor, technology, score) rather than in a database. It is the front of the pipeline — a domain is mapped before any candidate is promoted into a build. Several maps exist; the count is tracked elsewhere rather than asserted here.

## mechanism-graph (KuzuDB)

A typed knowledge graph over a career-evidence corpus, built on KuzuDB.

The schema is the design. Nodes are typed — mechanisms, domains, career phases, through-lines, meta-patterns, and evidence — and the central modeling choice separates the invariant from the method. A *disposition* (the underlying invariant a mechanism expresses) is modeled as a distinct thing from the method that expresses it, so the same disposition can be traced across different domains and across time. The schema itself is versioned; the type definitions evolve under version control rather than drifting implicitly.

Ingestion is a disposition-preserving parser: it reads the real corpus and lands each item as the node type the schema declares, without flattening the disposition/method distinction the schema is built to hold.

The populated graph holds 93 mechanisms (74 deep + 19 cluster), 10 domains, 4 career phases, 6 through-lines, 5 meta-patterns, and 316 evidence nodes, joined by 67 `COMPOUNDS_WITH` edges. The query that justifies the structure is a cross-domain probe — find the cluster mechanisms that span three or more domains across both past and present. It returns 10 such mechanisms in 24 ms. Over a flat document set the same probe would require manual cross-referencing; here it is a single traversal, because the cross-domain relationships are first-class edges.

The corpus is de-identified. No client data is present in the graph; the mechanisms and evidence are abstracted from their original engagements.

## dev-tel-graph

A graph layer over a personal telemetry vault — the sibling of mechanism-graph, built on a different graph engine than its KuzuDB.

It applies the same schema-first method to a different corpus (telemetry rather than career evidence) on a different engine, which is part of why it exists: it tests whether the typed-graph approach transfers across both the corpus and the underlying store. It is at spike stage — enough to exercise the method, not a finished artifact.

## What they share

The schema-first method is the through-line: define the node and edge types, parse a real corpus into them, then query across it. In each case the result is queryable, not a diagram.

The three sit at different points on one axis. galaxy-map maps an unfamiliar domain before a build; mechanism-graph and dev-tel-graph make a known corpus queryable after the fact. galaxy-map carries its structure in a document schema; the two graphs carry it in a typed store.

## Status

galaxy-map: in use; multiple universe maps produced. mechanism-graph: full corpus ingested, schema versioned, the cross-domain probe gate met at 24 ms. dev-tel-graph: spike stage. A public retrieval demo — mechanism-graph plus a vector-retrieval layer — is the candidate next step; it is not yet built.
