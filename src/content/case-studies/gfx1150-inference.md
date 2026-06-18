---
title: Inference tuning on a handheld iGPU (gfx1150)
summary: "A controlled performance study on an AMD handheld iGPU: roofline, an 8-model ROCm-vs-Vulkan matrix, and a 2.43× speculative-decoding result."
date: "2026-06-17"
lenses: [ai-infra, inference]
order: 6
repo:
  name: gfx1150-bench
  url: https://github.com/chris-youngblut-solutions/gfx1150-bench
---

A controlled performance study of local LLM inference on an AMD handheld iGPU (gfx1150). It fixes the hardware ceiling with a roofline analysis, measures how close two llama.cpp backends get to it across an eight-model matrix, and quantifies the one lever that beats the ceiling. The harness and the raw results are public as `gfx1150-bench`.

## The device

The target is a single OneXPlayer X1 Pro handheld: an AMD Ryzen AI 9 HX 370 (Strix Point, Zen 5) with a Radeon 890M integrated GPU — gfx1150, RDNA 3.5, 16 compute units. Memory is LPDDR5x rated at 120 GB/s theoretical, measured at about 96 GB/s under Vulkan. The whole study is pinned to one software stack so every number is comparable: kernel 6.19.12 (6.17 carried a roughly 10% RADV decode regression), Mesa 25.3.6 RADV, and llama.cpp build b9282 compiled with `-DGGML_NATIVE=ON -DGGML_LTO=ON`. TDP runs at the platform default — stable, not maximized — and the GPU clock is locked with `power_dpm_force_performance_level=high` for every run.

## Why a controlled re-baseline

An earlier Vulkan-vs-ROCm comparison on this device (4B: 23.6 vs 10.1 t/s generation) was not trustworthy, for two reasons.

First, the GPU clock was uncontrolled. `pp_dpm_sclk` showed the iGPU parked at 600–625 MHz against a 2900 MHz ceiling while `power_dpm` sat at `auto`, so runs were not reliably at full clock. Second, the comparison used K-quant weights (Q5_K_M / Q4_K_M), which carry per-backend dequantization variance; benchmark scoreboards standardize on Q4_0 — the simplest quant, most uniformly optimized across backends — to isolate the backend rather than the quant.

Re-running under the pinned, clock-locked environment changed the conclusions materially. Vulkan 4B token generation went 23.6 → 34.2 t/s (+45%); 14B/Q4_K_M went 5.9 → 9.3 (+58%); and ROCm went 10.1 → 24.7 (+144% — it had been hurt more by the parked clock). The original "Vulkan wins decisively" reading had overstated the gap roughly threefold. The methodology note treats this as the point of the work: the headline difference between two runtimes was mostly an uncontrolled-environment artifact.

## The roofline

Token generation streams the entire model once per token, so it is memory-bandwidth-bound: the ceiling is bandwidth divided by bytes read per token. At the measured ~96 GB/s that fixes a per-model wall.

| Model / quant | Weights | tg ceiling |
|---|---:|---:|
| 4B Q4_0 | 2.36 GB | ~40.6 t/s |
| 14B Q4_0 | 8.51 GB | ~11.3 t/s |

On this device the wall is fixed — it moves only with faster RAM or a wider bus. A 256-bit Strix Halo part reaches about 53 t/s where this 128-bit Strix Point part reaches about 22 on the same workload. With the wall fixed, optimization is the work of closing the gap to it, not finding more headroom. Prefill (prompt processing) is compute-bound and sits against a separate, higher ceiling.

## The backend matrix

`bench-matrix.sh` sweeps `llama-bench` across backend (Vulkan / ROCm-HIP) × quant (Q4_0 through F16) × flash-attention (`-fa 0/1`) × RADV environment flags, three repetitions each, reporting `pp512` (prefill) and `tg128` (generation). The full mode covers eight models — six Qwen3-4B quants and two Qwen2.5-Coder-14B quants — and writes a labelled CSV plus a raw log to `results/`. Each cell below is the best value that model reached across the swept environment passes (baseline / `nogttspill` / `+bfloat16`).

| Model | wt GB | tg ceiling | Vulkan tg | % roof | ROCm tg | Vulkan pp | ROCm pp |
|---|---:|---:|---:|---:|---:|---:|---:|
| 4B/Q4_0 | 2.36 | 40.6 | 34.18 | 84% | 24.72 | 671 | 831 |
| 4B/Q4_K_M | 2.49 | 38.5 | 32.41 | 84% | 21.86 | 647 | 671 |
| 4B/Q5_K_M | 2.88 | 33.3 | 28.82 | 87% | 19.44 | 657 | 709 |
| 4B/Q6_K | 3.30 | 29.1 | 25.17 | 87% | 18.54 | 614 | 445 |
| 4B/Q8_0 | 4.27 | 22.5 | 19.62 | 87% | 14.87 | 653 | 765 |
| 4B/F16 | 8.05 | 11.9 | 9.74 | 82% | 8.90 | 401 | 540 |
| 14B/Q4_0 | 8.51 | 11.3 | 10.27 | 91% | 8.28 | 196 | 269 |
| 14B/Q4_K_M | 8.98 | 10.7 | 9.30 | 87% | 7.42 | 178 | 212 |

The split is consistent across the matrix. Vulkan wins token generation in every cell — by +9% to +48%, where the F16 outlier accounts for the +9% and the quant cells run +24% to +48%. ROCm wins prompt processing in every cell but one (the exception is 4B/Q6_K, where Vulkan also wins prefill) — by +4% to +37%. The practical reading: chat-shaped workloads favor Vulkan, long-context prefill favors ROCm.

Two numbers frame the ceiling. Vulkan token generation sits at 82–91% of the memory-bandwidth wall in every cell, which means flag- and kernel-level optimization is effectively exhausted on this device — further single-stream gains require either breaking the wall or moving it. The quant ladder behaves exactly as a bandwidth-bound workload should: Vulkan 4B tg falls 34.2 → 32.4 → 28.8 → 25.2 → 19.6 → 9.7 across Q4_0 → Q4_K_M → Q5_K_M → Q6_K → Q8_0 → F16, tracking weight size.

The sweep also settled three environment questions. Flash attention is a win in every configuration tested on this RDNA 3.5 / Mesa 25.3.6 / b9282 stack — the older "AMD iGPU flash-attention falls back to CPU" behavior does not reproduce, so `-fa 1` stays on. `RADV_PERFTEST=nogttspill` regresses large models (4B/Q8_0 tg −10%, 14B/Q4_K_M tg −11%) and is a wash on small ones, so it is dropped from the recommended baseline. `RADV_PERFTEST=bfloat16` is noise (≤0.6% on Q4_0) and is also dropped. The best-known-good configuration is Vulkan, Q4_0, no RADV flags, `-ngl 99 -fa 1`, clock locked high, on the pinned build.

## Speculative decoding — breaking the wall

The single lever that beats the bandwidth ceiling is speculative decoding, and the important framing is what it is and is not. This is a tuning-and-benchmark result measured against upstream llama.cpp binaries (`llama-completion` and `llama-speculative`) — a configuration sweep and a measurement, not a patch, a daemon, or any inference code written here.

`spec-bench.sh` runs a 14B/Q4_0 target with a 1.5B/Q4_0 draft, both fully offloaded (`-ngl 99 -ngld 99`), `-fa 1`, at `-c 1024`, sweeping draft-max ∈ {4, 8, 16} against the no-draft baseline. The draft has to come from the same family and tokenizer as the target; the Qwen2.5-Coder family ships a 1.5B sibling, which is why the spec probe uses Coder while the backend matrix sweeps the newer Qwen3-4B.

| config | tg t/s | accept % | speedup |
|---|---:|---:|---:|
| 14B/Q4_0 baseline | 9.54 | — | 1.00× |
| + 1.5B draft, dmax=4 | 18.42 | 74.2% | 1.93× |
| + 1.5B draft, dmax=8 | 18.71 | 77.8% | 1.96× |
| + 1.5B draft, dmax=16 | 23.17 | 71.7% | 2.43× |

One verify pass over the 14B amortizes across roughly 11 accepted tokens at dmax=16, so the result exceeds the single-stream bandwidth ceiling rather than approaching it. dmax=16 beats dmax=8 despite a lower accept rate (71.7% vs 77.8%): the per-batch amortization outweighs the wasted draft tokens. In end-to-end terms the 14B moves from 9.5 to 23.2 t/s — past the dense 4B/Q8_0 (19.6) and near the 4B/Q5_K_M (28.8), which brings 14B generation into interactive range on the handheld.

## Untested levers

Three levers are named in the methodology but deliberately not measured here. A TDP raise: the memory clock caps at 937 MHz at the default power budget, and a higher budget might widen bandwidth — moving the wall itself — but that needs a deliberate platform-power change and thermal headroom on a handheld. MoE models: low-active-parameter mixtures read only the active experts per token, so generation tracks active parameters rather than total, structurally dodging the wall. Longer-context speculative decoding: the probe is pinned at `-c 1024` by the default 13.5 GiB GTT ceiling, which lifts only by raising `amdgpu.gttsize`.

## Scope

The contribution is the measurement, the runtime-and-phase carve-out, the corrected baseline, and a harness anyone can re-run — not new inference code. The 2.43× is a result obtained by configuring and tuning upstream binaries; a daemon-side speculative-decode integration is deferred, not built. Numbers transfer to other gfx1150 devices only to the extent their memory and TDP match this one, and `results/` paths are scrubbed to relative form, so a re-run embeds the operator's own paths.

## Status

Public. The reproducible harness is `gfx1150-bench` (github.com/chris-youngblut-solutions/gfx1150-bench): the two benchmark scripts, the pinned methodology note, and the raw CSVs, logs, and summaries the tables above are derived from. The backend carve-out and the speculative-decoding result reproduce from it given the listed models and a clock-locked gfx1150 device. Dual-licensed Apache-2.0 OR MIT.
