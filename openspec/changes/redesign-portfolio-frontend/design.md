# Design

## Context

See `proposal.md` for motivation and the `specs/` directory for requirements. What follows covers the technical constraints and decisions.

**Current state.** A single-page Vite + React 19 + TypeScript app with Tailwind v4. All content lives inline in section components (`Projects.tsx`, `CurrentProject.tsx`, `Certification.tsx`, `TechStack.tsx`, `About.tsx`). Motion is already a dependency and already used correctly in places via `whileInView` and `AnimatePresence`.

**Constraints discovered during exploration:**

- `npm run lint` fails on `main` with 24 pre-existing errors, concentrated in components the redesign retires (`TargetCursor.tsx`, `DotGrid.tsx`, `TrueFocus.tsx`, `use-outside-click.tsx`, `StaggeredMenu.tsx`). Retiring these files removes most of the debt. Whatever survives must be clean, so the redesign ends with lint at zero rather than inheriting a broken baseline.
- `index.html` loads four font families from Google Fonts via `<link>`, a render-blocking third-party request.
- Assets in `public/` are large: `logo.png` is 515 KB, `EdisonYellowBG.png` is 1.3 MB, `halperin-hotel.jpg` is 391 KB.
- Four certification entries point at image files that do not exist in `public/` (`/placeholder-ibm-cert.jpg`, `/placeholder-fcc-js-cert.jpg`, `/placeholder-fcc-cert.jpg`).
- Two current projects use `/current-projects/placeholder.png`, a generic placeholder rather than a real screenshot.
- `Scene.tsx` mixes `@react-spring/three` and `@react-three/drei` with a Motion-driven parent. The design guidelines forbid mixing render-loop-owning libraries in one tree; they also fight over the same frames.

**Environment note.** `node_modules` shipped corrupt (`motion/dist/react.d.ts` absent, `hermes-parser` missing generated files) because postinstall scripts were blocked. Resolved by approving the `esbuild` script and reinstalling. Worth knowing that a fresh clone needs a clean `npm install` before lint and build mean anything.

## Goals / Non-Goals

**Goals:**

- One design system expressed as tokens, with no per-section one-off values.
- Motion that communicates state and hierarchy, not decoration.
- Zero lint errors, zero TypeScript errors, and a clean production build.
- Accessibility that passes keyboard-only navigation and reduced-motion checks by construction.
- Preserve every piece of content and every working link.

**Non-Goals:**

- No new dependencies. `motion`, `lucide-react`, and the Tailwind v4 Vite plugin already cover everything needed. In particular `framer-motion` is not installed and no second animation library is added.
- No CMS, no routing, no backend. The site stays a single page.
- No change to the Google Calendar or FlowCV embed URLs.
- Not optimising every image byte. The large assets are addressed where they affect the critical path; a full image pipeline is a separate concern.

## Decisions

### Design direction: concentrated terminal, not distributed terminal

The existing `edison@server:~$` prompt appears in five section headers. That repetition is why it reads as decoration. Concentrating it in the hero and footer, where it frames the identity and the contact path, restores its meaning at zero design cost.

*Alternative considered:* drop the motif entirely. Rejected. It is the site's recognisable signature, and the redesign preservation rules favour keeping what already works.

### Typography: self-hosted Geist and Geist Mono

Inter is discouraged as a default, and the current four-family mix means nothing is deliberate. Geist pairs a clean grotesque with a matched mono, covers both needs in one family decision, and is available as variable woff2 files to download and self-host.

*Alternative considered:* keep Inter and JetBrains Mono. Rejected, Inter is on the discouraged list with no brand justification here. *Alternative considered:* add a serif for editorial contrast. Rejected, serif is discouraged absent a genuine editorial brief.

Self-hosting rather than `<link>` removes the render-blocking third-party request and satisfies the performance spec.

### Colour: one desaturated red on a cool off-black ramp

The brand is already red on black. Per the preservation rules, red stays. What changes is discipline: the ramp moves off pure `#000000` to a cool near-black, and the accent settles to a single desaturated red rather than the current spread of `red-500`, `red-600`, and `#e53535` used interchangeably.

*Alternative considered:* switch to a different accent entirely. Rejected, that is a brand change, not a redesign, and it is not ours to make.


### Retiring the effect layer

The custom cursor, click-spark canvas, looping background spotlights, and blocking preloader are removed. Each is individually defensible; together they hide the native cursor, add a `requestAnimationFrame` loop that runs for the life of the page, block first paint for a fixed 2.5 seconds, and re-render on every pointer event.

The preloader deserves specific mention: it imposed a minimum display time regardless of how fast the page loaded, and locked the visitor out of the content to show a CSS rocket animation. Removing it is the clearest accessibility and performance win in this change.

### Retiring WebGL

The 3D sphere and globe are removed. Three.js is roughly 150 KB gzipped before any scene code, it renders a decorative object carrying no information, and it competes for the same frames as Motion. Removing it lets `three`, `@react-three/fiber`, `@react-three/drei`, and `@react-spring/three` be dropped from `package.json`.

*Alternative considered:* keep the sphere as a lazy-loaded island below the fold. Rejected. It still ships the whole runtime, still fights Motion for frames, and still carries the mixing violation. The hero gets a real visual instead.

### Replacing the 3D hero with a typographic hero plus real work

The design guidelines require the hero to carry a real visual and ban text-plus-gradient-blob placeholders. Rather than reach for stock photography, the hero uses the owner's own project imagery: real, specific, and it does the job of showing capability. The hero becomes an asymmetric split, oversized name and role on the left against a framed project preview on the right.

This also resolves the "no oversized H1 that just screams" tell. The name is large because it is a personal portfolio, but the scale is capped and paired with a role line and two actions rather than floating alone.

### Section layout families

Six sections currently share roughly three layout families, which is why the page feels repetitive. Each section gets a distinct one:

| Section | Layout family |
|---|---|
| Hero | Asymmetric split, oversized type against a framed project preview |
| About | Sticky-column narrative: facts rail beside a prose column |
| Tools | Tiered grid with a scroll-linked progress rail |
| Current Projects | Large feature rows, image leading, alternating offset |
| Completed Projects | Index-led filterable grid with layout transitions |
| Certifications | Dense uniform certificate grid, no pagination |

Two consecutive image-plus-text splits at most, satisfying the zigzag cap.


### Motion vocabulary

Motion is used for four things only, each with a stated reason:

1. **Scroll-linked progress** on the tools section, showing position within a long list. *Communicates: where am I in this list.*
2. **Layout transitions** when the project filter changes the visible set. *Communicates: what changed, and what stayed.*
3. **Enter and exit** on the two overlays. *Communicates: the surface opened or closed.*
4. **Viewport reveals** on section headers, fired once. *Communicates: narrative order.*

Everything else is a CSS transition on hover, focus, and active states, which is cheaper and needs no JavaScript.

Scroll position is read with Motion's `useScroll`, never a `window` scroll listener feeding React state. Pointer and hover physics use `useMotionValue`, keeping continuous values out of the render cycle.

`useReducedMotion` gates all four. Under reduced motion, reveals render at their final state, the scroll-linked transform is disabled, and overlays still fade, because a 150 ms opacity change is not vestibular-triggering.

### Accessibility as structure, not patch

The skip link, focus-visible rings, focus trap, focus restoration, and scroll lock are implemented once in a shared overlay primitive that both modals use, rather than per-modal. The existing modals each reimplement Escape handling and body-overflow locking independently, which is where those features usually drift.

`aria-current="page"` on the active nav item, `aria-pressed` on filter toggles, and text labels beside the repository visibility icons so visibility is not conveyed by icon alone.

### Content fixes surfaced during exploration

Four certification images and two current-project images point at missing or generic files. Missing files render as broken images; generic placeholders misrepresent the work. These are corrected to resolve to real files, and the image component handles a load failure by falling back to a typographic panel rather than a broken frame.

## Risks / Trade-offs

- **Losing the WebGL hero is a visible change.** Some visitors may have considered the 3D sphere a feature. → Mitigated by replacing it with a real project preview carrying more information than a decorative sphere did. Flagged explicitly in the summary so the owner can object.
- **Dropping dependencies could break a component kept by mistake.** → Mitigated by removing files and their imports together, then confirming the production build succeeds with the packages absent from `package.json`. A stale import fails the build loudly.
- **Self-hosted fonts add committed binary files.** → Mitigated by subsetting to the woff2 variable files actually used, two files total.
- **Retiring `TargetCursor` removes a signature interaction.** → Mitigated by restoring the native cursor, which the guidelines call out as accessibility-hostile, and by the pointer now being usable to select text.
- **Large images remain.** `logo.png` at 515 KB and `EdisonYellowBG.png` at 1.3 MB are still large. → Mitigated by lazy-loading below-the-fold images and eagerly loading only the hero asset. Full byte-level optimisation is out of scope and flagged in the summary.
- **Six new section components is a large diff.** → Mitigated by building them on shared primitives so the visual system lives in one place, and by keeping each commit scoped to a coherent group of sections.

## Migration Plan

Single-branch change on `feat/frontend`. The redesign is a front-end-only rewrite with no routing and no persisted state, so there is no data migration.

Order of operations: design tokens and fonts, then shell and navigation, then sections in page order, then overlays and accessibility wiring, then removal of retired files and dependencies, then verification.

Rollback is `git revert` on the branch. Nothing outside `src/`, `index.html`, `package.json`, and `public/` changes.

## Open Questions

None. Every decision that would have affected the specs or the task breakdown was resolved during exploration.
