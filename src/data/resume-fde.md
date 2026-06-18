# Chris Youngblut
**Forward-Deployed Engineer**

Portfolio: chris-youngblut-solutions.github.io · linkedin.com/in/chris-youngblut-solutions · christopheryoungblut@gmail.com · Remote (US)

> **Forward-deployed engineer who reads a system by its mechanism and builds the tool that fills the negative space — across industrial automation, trust & safety at platform scale, and managed AI-services.**

---

## Selected work

- **Legal-AI system for a solo-attorney practice** — built the system the practice needed: an MCP (Model Context Protocol) server + a knowledge-graph + vector store with privilege-aware hybrid retrieval (dense + sparse + late-interaction), document-access enforced as a code-level gate. In production; supported a matter that reached the Iowa Supreme Court.
- **Claude Code dev-platform toolkit** — a project-lifecycle promotion ladder (scope → private → public), guardrail hooks, session-continuity, and decision-encoding templates; stands up and governs every project in this list.
- **`workspace-warden`** — Linux workspace-orchestration daemon in Rust (cgroup-v2 freezer, D-Bus IPC, systemd, async state machine; 1,836 LoC, integration-tested on live cgroup slices).
- **`agent-harness`** — an MCP agent-supervision daemon exposing local-LLM / agent runtime as native tools and supervising the serving stack.
- **`opendbc-ag`** — MIT-licensed agricultural CAN/ISOBUS protocol library (2,690 frames, 76 tests, CI scope-policy gates). Public: github.com/chris-youngblut-solutions/opendbc-ag.
- **`voicekb`** — hold-to-talk Wayland dictation: on-device faster-whisper (int8) capture → tiered injection, hardened systemd user units, GNOME toggle; a 0-to-1 build, shipped public. github.com/chris-youngblut-solutions/VoiceKB.

---

## Experience

### Independent AI / Forward-Deployed Engineer — ^Loop Solutions · Nov 2025 – Present
*Embedded client builds, and the infrastructure under them.*
- Embed with a solo-attorney practice and ship a production legal-AI system; author my own dev platform (the toolkit + an MCP agent-supervision daemon) — on owned hardware (multi-GPU servers, a Proxmox cluster, a Tailscale-meshed fleet).
- Provision the infrastructure too: Dell VRTX → Proxmox bootstrap (RACADM/Redfish), Ansible fleet automation with check-mode-first safety discipline, full observability (Prometheus / Grafana / Loki).

### Trust & Safety — TikTok USDS · Apr 2022 – Sep 2025
*Two roles: Account Inquiry Specialist → Risk Analyst. Queues, risk, and big-data systems.*
- Built a root-cause-analysis program on production model misfires — systematic measurement, root-cause tracing, and correction of enforcement decisions on a live ML system at scale.
- Detected an account-takeover campaign via data-driven pattern detection and led the cross-team response; scaled abuse review from <50 to 800+ items/week with a detection pipeline, with no observed enforcement leakage.

### Regional Product Manager — State Farm · Contract · Jan – Apr 2022
- Enterprise IT for State Farm branches — hardware/software lifecycle replacement and technical upgrade integrations across the regional network; hands-on support for branch end users (insurance agents and their staff).

### Agricultural Technology Technician — Youngblut Farmland & Windy Acres Organic Farm · Apr 2019 – Mar 2021
- Precision agriculture — GPS guidance, weather-data modeling, IoT soil/crop sensors; maintained farm machinery and monitoring systems.

### PLC / Production Technician — Pioneer · Feb 2017 – Jan 2019
*Industrial controls and condition-based maintenance.*
- Maintained and troubleshot **pneumatic and hydraulic automation systems** on production lines.
- Built and logged a **preventive-maintenance program** — baseline-and-deviation monitoring to catch failures before they happened.

### Earlier
- Operations Manager — The ROC Gym (2010–15) · Sales Associate — Von Maur (2015–16) · Office Manager — a law firm (2016–17).

---

## Skills

**Build / agents:** Claude Code skills + Agent SDK · MCP (Model Context Protocol) servers · project-lifecycle tooling · Python · Rust (D-Bus, cgroups, systemd) · FastAPI

**AI / infra:** LLM serving (vLLM, multi-GPU routing) · RAG / retrieval-augmented generation (hybrid dense + sparse + late-interaction over a vector + graph store) · GPU performance engineering (ROCm/Vulkan) · Proxmox / Dell iDRAC (RACADM/Redfish) · Ansible / IaC (infrastructure-as-code) · Tailscale · observability

**Domain:** Trust & Safety + abuse/risk at scale · industrial automation (pneumatic/hydraulic) · CAN/ISOBUS · CI/CD + signed releases · technical writing / SOPs
