# Proposal

## Why

The portfolio works but reads as a themed effect rather than a designed product. The terminal motif is applied uniformly across every section (five near-identical `edison@server:~$` prompts), so it stops carrying meaning, and the page is held together by a large set of surface-level effects: a custom cursor, a global click-spark canvas, a 2.5s blocking preloader, a WebGL sphere and globe, and looping background spotlights. These compete with the content, hide the native cursor, add a heavy WebGL dependency, and are inaccessible to keyboard and reduced-motion users.

Separately, `npm run lint` fails on `main` with 24 pre-existing errors, and `src/components/ui/3d-globe.tsx` plus `Scene.tsx` mix Three.js with Motion in the same tree, which the design guidelines explicitly forbid.

This is a visual and interaction overhaul with content preserved. The goal is a portfolio that reads as one coherent system, where the terminal language is concentrated in a few high-impact places instead of repeated everywhere, and where motion is motivated and accessible.

## What Changes

- **New design system foundation.** Self-hosted Geist and Geist Mono variable fonts with `font-display: swap`, replacing the four competing families (Inter, Montserrat, JetBrains Mono, Open Sans) and removing the Google Fonts `<link>`. Tokenised off-black surface ramp, single desaturated red accent, one radius scale, one shadow model.
- **Terminal motif concentrated, not repeated.** The `edison@server:~$` prompt is retained in the hero and the footer only. It is removed from About, Tech Stack, Current Projects, Completed Projects, and Certifications, so the sections that keep it mean something.
- **Removes surface-level effect layer.** Retires the custom `TargetCursor` (which hid the native cursor site-wide), the global `ClickSpark` canvas, the blocking `Preloader`, the looping background `Spotlight`, and the WebGL hero sphere and About globe. Motion is retained as the animation system but applied to meaningful transitions instead.
- **Restructures section layouts for variety.** Six sections currently reuse three or four layout families. The redesign gives each section a distinct one, including an asymmetric hero, a scroll-linked stack section, an index-led projects layout, and a marquee-free horizontal certification rail.
- **Replaces the paginated card carousel.** Completed Projects and Certifications currently paginate 6 and 4 items behind chevrons with filled progress bars. Projects become a filterable index with a Motion `layout` transition; Certifications become a single continuous grid with no pagination.
- **Accessibility and semantics.** Skip-to-content link, visible focus rings on all interactive elements, `aria-label` and `alt` text coverage, `aria-current` on the active nav item, keyboard-operable mobile menu and filters, and semantic landmarks (`header`, `nav`, `main`, `section`, `footer`).
- **Motion respects `prefers-reduced-motion`.** Every animated element degrades to a static final state, and the preloader no longer blocks first paint or locks scroll.
- **Performance.** Removing the WebGL scenes drops `three`, `@react-three/fiber`, `@react-three/drei`, and `@react-spring/three` from the render path, alongside a lighter initial bundle and no blocking overlay.
- **Metadata.** Adds `description`, Open Graph, and Twitter card meta tags to `index.html`, plus a themed `color-scheme`.

Content, anchor IDs (`#hero`, `#about`, `#stack`, `#current-projects`, `#projects`, `#certifications`), nav labels, project and certification data, the Google Calendar appointment modal, and the FlowCV resume modal are all preserved.

## Capabilities

### New Capabilities
- `design-system`: Typography, colour, surface, radius, shadow, and z-index tokens, plus the shared primitive components every section builds on.
- `page-layout`: Page shell, responsive grid and container system, section composition, and the layout family each section uses.
- `navigation`: Sticky header, active-section tracking, desktop and mobile navigation, and the smooth-scroll behaviour between anchors.
- `sections`: The six content sections and the presentation and interaction rules for the project and certification content they render.
- `motion`: The animation layer, covering the Motion primitives in use, the transitions each interaction gets, and the `prefers-reduced-motion` contract.
- `accessibility`: Skip link, focus management, keyboard operability, contrast targets, semantic structure, and image alternative text.
- `performance`: Bundle and runtime budgets, image and font delivery, and the removal of the blocking preloader.
- `metadata`: Document title, description, social sharing cards, viewport, and browser theme colour.

### Modified Capabilities
None. This project has no existing specs under `openspec/specs/`, so every capability below is introduced by this change.

## Impact

- **Rewritten:** `src/index.css`, `src/App.tsx`, and all files under `src/components/sections/`.
- **Removed:** `TargetCursor.tsx`, `ClickSpark.tsx`, `Preloader.tsx`, `Preloader.css`, `Scene.tsx`, `ui/3d-globe.tsx`, `ui/spotlight-new.tsx`, `TrueFocus.tsx`, and other components left unused by the redesign.
- **Updated:** `index.html` (fonts, meta tags), `package.json` and `package-lock.json` (dependencies dropped once their last consumer is removed).
- **Dependencies:** no new packages. `motion` remains the animation system; `framer-motion` is not installed.
- **Preserved:** all section anchor IDs, nav labels, project and certification data, both modals, all outbound links, and `public/` assets.
- **Out of scope:** backend, deployment, analytics, and the Google Calendar and FlowCV embed internals.
