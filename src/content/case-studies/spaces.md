---
title: Spaces — a desktop platform that freezes and thaws whole workspaces
summary: Organizes a machine into Spaces — each with its own apps, layout, and local-model context — that freeze and thaw on a keystroke. GNOME + Hyprland from a shared core.
date: "2026-06-17"
lenses: [platforms, fde]
order: 1
---

Spaces is a desktop platform that organizes a machine into compartments ("Spaces"), each with its own apps, window layout, and local-model context. A keystroke summons a takeover surface; selecting a Space switches to it with its apps launched and snapped into a panel grid. Background Spaces freeze — their processes suspended, GPU and RAM reclaimed — and thaw on return with state intact. It runs on GNOME and Hyprland from a shared core, currently on an X1 Pro handheld and a fleet dev box.

## The unit of organization

A Space is a named work context: a set of apps, a window layout, and a local-model assignment, held together as one switchable unit. The desktop holds several. One Space is foreground at a time; the rest are dormant. Switching between them is a single selection, not a manual reopening of windows and a re-tiling of the screen.

The state that defines a Space lives in data, not in running processes. A Space is described by a `.space` manifest — which apps it launches, how they place into the layout grid, and what local-model context it carries. That description is the durable artifact; the running windows are a projection of it. Because the definition is data, a Space can be authored, edited, and re-summoned without the apps being open at edit time.

This is an organizational model, not an enforcement one. A Space groups and switches; it does not wall its contents off from the rest of the machine. The boundary between Spaces is a layout and lifecycle boundary, not a security one. (See Status — the per-Space sandbox is design intent, not built.)

## What it does

- Summons a takeover surface on a keystroke (rides GNOME's Activities press — no Super rebind, no custom compositor).
- Presents a per-Space configurable menu and a panel grid; real OS windows snap into the grid's zones.
- Switches Spaces: each Space's apps launch and place onto its own workspace.
- Freezes a background Space's processes via the cgroup-v2 freezer and reclaims GPU/RAM; thaws on return without state loss.
- Serves open-weight models locally (llama.cpp/Vulkan on the handheld iGPU; vLLM on the fleet).

## The summon-and-switch loop

The interaction is one loop: summon, pick, place, leave. A keystroke brings up a takeover surface — a full-screen menu of the available Spaces and their per-Space actions. Selecting a Space resolves it: its apps launch if they are not already running, and the live OS windows snap into the zones its layout defines. Leaving a Space, or summoning another, returns to the surface.

On GNOME the summon rides the existing Activities press rather than claiming a new global shortcut. There is no Super-key rebind and no custom compositor — the surface is a GNOME shell extension layered over the stock session, so the rest of the desktop keeps working as it did. The panel grid is a real tiling layout over real OS windows: the windows snapped into a Space's zones are the same windows the window manager owns, repositioned, not reparented copies or embedded views.

## How it works

- **Shared core, native front-ends.** The Space data model and the zone/layout math live in one Rust core with no UI dependency. Each platform has a native front-end over that core: a GNOME shell extension and a Hyprland layer-shell renderer.
- **Window-manager adapter.** Placement goes through a `WindowManagerAdapter` trait. Hyprland is driven directly; GNOME is driven by a companion that translates the contract to Mutter's `move_resize_frame` (GNOME exposes no external window-control API).
- **warden.** A Rust daemon (~1,800 LoC, D-Bus IPC, systemd-managed, integration-tested against real systemd slices) suspends idle Spaces with the cgroup-v2 freezer and reclaims GPU/RAM. Freeze only — no namespace isolation.
- **`.space` manifest.** A shared schema: the front-end reads the layout, warden owns the launch, the console authors it. A Space is defined in data, not code.

## The shared core and the adapter seam

The platform-independent work — the Space data model and the zone and layout math that decides where a window goes — is one Rust crate with no UI dependency. It computes placement; it does not know how a window is moved. Two platforms sit on top of that one core: a GNOME shell extension and a Hyprland layer-shell renderer. The same core math drives both.

The gap between "where a window should go" and "make the window go there" is the `WindowManagerAdapter` trait. Each platform supplies an implementation. Hyprland accepts placement commands directly, so its adapter drives the compositor without an intermediary. GNOME exposes no external window-control API, so its adapter routes through a companion that translates the core's placement contract into Mutter's `move_resize_frame` calls — the move/resize primitive GNOME's window manager does expose. The trait is the seam that lets a single layout engine target two different window managers without the core knowing which one it is talking to.

## Freeze and thaw

A Space the user has left does not need CPU, GPU, or RAM. warden is the Rust daemon that takes them back. It is roughly 1,800 lines, speaks D-Bus for IPC, and is managed by systemd; its tests run against real systemd slices rather than mocks. When a Space goes to the background, warden suspends its processes through the cgroup-v2 freezer — the kernel mechanism that stops a control group's tasks without killing them — and reclaims the GPU and RAM the Space held. On return, warden thaws the group and the Space resumes with its state intact, because the processes were paused, not terminated.

Freeze is a lifecycle action, not an isolation one. The freezer suspends a group's scheduling; it does not put the group in its own namespace, restrict what it can see, or sandbox its data. warden reclaims resources from an idle Space; it does not contain a running one. That distinction is deliberate and is the line between what is shipped and what is still design intent.

## Local models

Each Space can carry a local open-weight model as part of its context, served on the machine rather than over a network. The serving backend follows the hardware: on the X1 Pro handheld the model runs on the integrated GPU through llama.cpp on Vulkan; on the fleet dev box it runs through vLLM. The model assignment is part of a Space's definition, so summoning a Space brings up its model context alongside its apps and layout.

## Status

- **Shipped (dogfooding on the X1 Pro):** the shared core and zone math; the WM-adapter seam (Hyprland); warden freeze/thaw; the GNOME surface v0 (menu → launch → snap → freeze → thaw, GNOME 49.6/Wayland); local open-weight serving; the Cabin design system.
- **In build:** a Space as a dedicated GNOME workspace (the allocator); multi-monitor placement; daemon hardening for daily use; lightweight authoring and a one-command fleet install.
- **Not yet built:** the per-Space sandbox / data boundary / ACL. Spaces are organizational, not enforced — warden freezes a Space, it does not isolate one. The boundary is the design intent for keeping a local model scoped to one Space; it is not implemented.

## Licensing

Open-core, two tiers:

- **Substrate — Apache-2.0 OR MIT:** warden, the WM adapters, the GNOME companion. Usable independently.
- **Product — AGPL-3.0 + commercial dual:** the host / control plane. Third-party packages run as separate processes over IPC and do not link the host crate, so they fall outside the AGPL derivative-works boundary; a commercial license covers embedding the host without AGPL obligations.
