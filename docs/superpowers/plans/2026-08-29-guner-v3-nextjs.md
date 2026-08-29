# Güner v3 Next.js Implementation Plan

> Executed inline by the controller (design-heavy migration). Spec: `docs/superpowers/specs/2026-08-29-guner-v3-nextjs-redesign.md`

**Goal:** Migrate the static site to Next.js static export with a light premium design, shadcn/ui, Framer Motion, three.js hero, real product images, and the LineraSoft footer credit.

## Tasks
1. Scaffold: create-next-app (TS, Tailwind, App Router) in repo root; configure `output: 'export'`; install framer-motion, three, @react-three/fiber, @react-three/drei, lucide-react; init shadcn/ui + button/card/badge/input/select. Remove old static HTML files.
2. Assets: generate dark logo variant (Pillow); fetch product/accessory images into `public/products/` with CREDITS.md; copy wordmark.
3. Design tokens: Tailwind theme (stone palette + single orange accent), fonts (Rubik + Nunito Sans via next/font), globals.
4. Shared components: Header (sticky, mobile sheet menu), Footer (with LineraSoft credit), TrustStrip, SectionHead, WaButton helpers, Reveal (Framer Motion wrapper), CountUp stat.
5. Hero3D: react-three-fiber phone built from RoundedBox geometry, slow float/rotate, mouse parallax; static image fallback (reduced-motion / mobile).
6. Pages: `/`, `/teknik-servis` (+wizard), `/takas` (+wizard), `/urunler` (+filter) — content verbatim from v2; metadata + JSON-LD.
7. QA: npm run build (export), serve `out/`, browser check 375/768/1280, console clean, wa.me/tel sweep, commit.
