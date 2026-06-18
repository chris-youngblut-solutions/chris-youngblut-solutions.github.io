default:
    @just --list

dev:
    pnpm dev

build:
    pnpm build

preview: build
    pnpm preview --host

check:
    pnpm exec astro check

lint:
    pnpm exec biome check .

fmt:
    pnpm exec biome format --write .
