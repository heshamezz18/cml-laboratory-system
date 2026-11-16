# CML Laboratory System

Public source repository for Colors Medical Laboratories’ bilingual operations workspace.

## GitHub Pages demo

A standalone portfolio demo is published from `docs/` on GitHub Pages. It uses fictional records, runs without login or a backend, and keeps edits in memory until reload. PDF uploads and real access management are disabled. It must not be used for real patient data.

The editable demo source is in `demo/`. To rebuild: run `npm ci` inside `demo/`, then `npx esbuild main.tsx --bundle --minify --jsx=automatic --define:process.env.NODE_ENV=\'"production"\' --outfile=../docs/app.js`. Commit the rebuilt `docs/` assets to update the demo.

## Current features
- Arabic/English switch with persistent preference and RTL layout.
- CML logo and visual identity.
- Sample registration, search and filtering by test, company and status.
- Case details, barcode labels, PDF results and supporting documents.
- Incoming/outgoing partner workflows, messages and team tasks.
- Server-enforced roles, read-only customer service, partner isolation and audit records.

## Current implementation
React and TypeScript on Vinext/Vite, with Cloudflare D1 for records and R2 for documents. The current preview still depends on Sites authentication and hosting. This source snapshot is **not yet a Vercel deployment or Windows installer**.

## Next milestones
1. Replace platform authentication with CML-owned accounts and sessions.
2. Migrate storage and server runtime for an independent hosted preview.
3. Keep GitHub Pages for the public portfolio demo; production hosting is a separate decision.
4. Package a Windows application connected to the laboratory LAN server.

See [DESKTOP_TRANSITION.md](DESKTOP_TRANSITION.md) for the internal deployment target and [DEVELOPMENT.md](DEVELOPMENT.md) for current development setup.

## Development
Requires Node.js >=22.13.0. Run `npm run install:ci`, then `npm run dev`. See DEVELOPMENT.md for local database migrations and the preview authentication model.

Checks: `npx tsc --noEmit`, `node tests/access.mjs`, and `npm run build`.

## Data and access
This repository contains application source only. Patient records, uploaded PDFs, database files, credentials and local runtime state must not be committed. Real laboratory use requires deployment validation, tested backup/restore and approved access roles.

## Source provenance
Imported from the bilingual CML preview source at commit `bc3861827c7bda3d35cbf088b2a86f5c11f39868`. Future changes can be tracked and reviewed here.
