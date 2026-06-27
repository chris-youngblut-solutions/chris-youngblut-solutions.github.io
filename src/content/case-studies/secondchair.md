---
title: SecondChair — a forward-deployed legal-AI system
summary: A privilege-aware legal retrieval system embedded with a solo-attorney practice and shipped to production in a seven-day engagement.
date: "2026-06-17"
lenses: [retrieval, fde]
order: 8
---

A legal practice's working knowledge lives across a case-management system, a document store, and the attorney's own memory, and a question rarely maps to one of them cleanly. The hard part is not search; it is that some of what the search would surface is privileged, and the line between what may be returned and what may not is a property of the matter, not of the words in the query. **The class is forward-deployed delivery of a retrieval system whose access rules are part of the retrieval, built by embedding with the customer rather than gathering requirements at a distance.**

The system was built for a solo-attorney practice and delivered in a seven-day engagement, embedded with the practice rather than specified from outside. It runs in production, and the practice has reached the Iowa Supreme Court. The shape of the work is the point as much as the architecture: map the customer's workflow from inside the practice, decide what the system has to do from how the practice actually moves, and ship a production system on that footing inside a week.

## The architecture

The system is a stack, each layer with one job, handing a defined surface to the next.

- **Case-management sync.** An integration pulls matters and documents from the practice's case-management system into the index, so the retrieval layer reads from the same source of truth the attorney already maintains rather than a separate copy that drifts. The sync is what keeps the index a current reflection of the practice's work instead of a snapshot taken once.

- **Privilege-aware hybrid retrieval.** On top of the index sits a BGE-M3 hybrid retrieval layer — dense, sparse, and late-interaction signals combined — over a Qdrant vector store and a Neo4j knowledge graph queried with Cypher. The dense and sparse signals cover semantic and lexical match; the graph carries the relationships between matters, documents, and parties that a flat vector search cannot express. The two stores answer different questions about the same corpus, and the retrieval layer draws on both.

- **A seven-filter privilege pipeline.** Retrieval runs through a sequence of privilege filters that decide what may surface for a given query. Privilege is enforced as part of retrieval rather than bolted on after, so the constraint is structural: a result that should not be returned is excluded where the results are assembled, not hidden in a later display step that a different code path could bypass. Document access is a code-level gate, which means the rule about what may surface is expressed in the system's logic, not left to convention.

- **MCP case-work tools exposed to Claude.** A set of case-work actions is exposed to Claude through MCP, so the attorney works through a single surface and the model can act over the case material rather than only describe it. The tools put the practice's own actions in front of the model; the work happens in one place instead of across separate systems.

The privilege pipeline and the code-level access gate are the load-bearing choices. A retrieval system that is accurate but indifferent to privilege is the wrong system for this customer, because in this domain returning the wrong thing is a worse failure than returning nothing. Enforcing access where retrieval happens, rather than where results are shown, is what makes the constraint hold under a code path the original author did not anticipate.

## The engagement

The delivery shape is forward-deployed: embed with the customer, learn the workflow from inside it, and ship a production system fast. The seven days were not a prototype that someone else would later harden — the system that left the engagement is the system that runs. Working embedded with the practice is what made the privilege model correct, because what may surface for a given query is something the practice knows and an outside specification would get wrong. Building it in close working contact collapsed the usual distance between "what was asked for" and "what the work actually needs."

## Where it generalizes

The instance is legal, but the pattern is not. Any domain where retrieval has to respect an access rule that belongs to the record rather than the query — health, finance, regulated records of any kind — has the same shape: an index over a system of record, a hybrid retrieval layer, and an access constraint enforced where results are assembled rather than where they are displayed. And the delivery model travels further than the architecture. Embedding with a customer, reading the workflow from inside it, and shipping a production system in a week is a way of working that applies wherever the gap between a stated requirement and the real need is the thing that sinks projects.

## Status

In production with a solo-attorney practice; the practice has reached the Iowa Supreme Court. Described here as architecture and engagement shape only — no client, attorney, or matter detail, no case content, and no accuracy figures. The stack (BGE-M3, Qdrant, Neo4j, MCP) and the privilege-aware design are the portable parts; the delivery model — forward-deployed, embedded, seven-day ship — is the reviewer-facing point.
