# Tasks

## 1. Foundation: tokens, fonts, primitives

- [ ] 1.1 Self-host Geist and Geist Mono variable woff2 files into `public/fonts/`, declare `@font-face` with `font-display: swap`, and preload the two primary files. Verify: no request to an external font host is made at runtime.
- [ ] 1.2 Rewrite `src/index.css` with the token layer: off-black surface ramp, single desaturated red accent, one radius scale, tinted shadows, and a documented z-index scale. Verify: `npm run build` succeeds and the ramp contains no pure `#000000`.
- [ ] 1.3 Remove the Google Fonts `<link>` block and the four superseded families from `index.css`. Verify: grep finds no reference to Inter, Montserrat, JetBrains Mono, or Open Sans.
- [ ] 1.4 Add the shared primitives: `SectionHeader`, `Tag`, `RepoBadge`, `Reveal`, and `SmartImage`. Verify: each renders standalone and `SmartImage` falls back to a typographic panel on image error.
- [ ] 1.5 Add global focus-visible styling, `prefers-reduced-motion` overrides, and press-feedback utilities. Verify: tabbing shows a visible ring on every interactive element.

## 2. Shell and navigation

- [ ] 2.1 Build the page shell in `App.tsx` with semantic landmarks (`header`, `nav`, `main`, `footer`) and the width-constrained container. Verify: one `main` and one `header` exist in the DOM.
- [ ] 2.2 Implement the sticky header with logo link, the four preserved nav labels, and the single primary CTA. Verify: header height is under 80px at desktop and all links sit on one line.
- [ ] 2.3 Track the active section with `useScroll` and mark it with `aria-current="page"` plus a layout-animated indicator. Verify: exactly one link is indicated at a time as sections pass.
- [ ] 2.4 Build the mobile menu with focus trapping, Escape dismissal, and focus restoration to its trigger. Verify: keyboard-only open, navigate, and close works.
- [ ] 2.5 Add the skip link as the first focusable element, hidden until focused. Verify: first Tab focuses it and activating it moves focus to `main`.
- [ ] 2.6 Rebuild the footer with always-visible social links, the terminal motif, and the shared CTA label. Verify: social links are reachable without hover.

## 3. Sections

- [ ] 3.1 Build the hero as an asymmetric split: capped display name, role line, two actions, and a framed project preview. Verify: headline and primary CTA are visible without scrolling at desktop width.
- [ ] 3.2 Build the About section as a sticky facts rail beside a prose column, preserving all existing facts and social links. Verify: status, university, location, focus, and seeking lines are all present.
- [ ] 3.3 Build the Tools section with the tiered grid and a scroll-linked progress rail, preserving all six categories and their tier assignments. Verify: tool counts per category match the original data.
- [ ] 3.4 Build the Current Projects section as large alternating feature rows, replacing pagination. Verify: all three current projects appear in one view.
- [ ] 3.5 Build the Completed Projects section as a filterable index using category filters and Motion `layout` transitions, replacing the carousel. Verify: all ten projects are reachable without paging, and filtering plus clearing both work.
- [ ] 3.6 Add an empty state for a filter selection that yields no projects. Verify: a filter matching nothing shows a clear message rather than blank space.
- [ ] 3.7 Build the Certifications section as a continuous grid with no pagination, preserving all four entries and their credential links. Verify: all four certifications render at once.
- [ ] 3.8 Fix the broken and placeholder image paths for certifications and current projects, and confirm text labels accompany repository visibility icons. Verify: no request for a missing image file is made, and no visibility state is conveyed by icon alone.
- [ ] 3.9 Verify the terminal motif appears in the hero and footer only, and that the eyebrow count stays within one per three sections. Verify: grep and a visual pass confirm both.


## 4. Overlays

- [ ] 4.1 Build a shared overlay primitive implementing focus trap, focus restoration, Escape dismissal, backdrop dismissal, scroll lock, and an accessible name. Verify: all six behaviours work from keyboard and pointer.
- [ ] 4.2 Rebuild the appointment and resume overlays on the primitive, preserving both embed URLs. Verify: each opens, renders its embed, and closes with scrolling restored.
- [ ] 4.3 Verify overlays animate on both open and close and are labelled as modals. Verify: no instant appearance, and the modal role and name are exposed.

## 5. Remove retired code and dependencies

- [ ] 5.1 Delete the retired components: `TargetCursor`, `ClickSpark`, `Preloader` and its CSS, `Scene`, `ui/3d-globe`, `ui/spotlight-new`, `TrueFocus`, `DotGrid`, `ModeToggle`, `StaggeredMenu`, `theme-provider`, `stateful-button`, `ui/button`, `kokonutui/social-button`, and the unused hook. Verify: no file imports any deleted module.
- [ ] 5.2 Drop `three`, `@react-three/fiber`, `@react-three/drei`, `@react-spring/three`, `gsap`, `lottie-web`, `@lordicon/react`, and `@icons-pack/react-simple-icons` from `package.json`. Verify: `npm run build` still succeeds, confirming no stale imports.
- [ ] 5.3 Remove the unused icon JSON assets and the `vite.svg`/`react.svg` leftovers. Verify: `npm run build` succeeds and no asset is referenced.
- [ ] 5.4 Confirm `framer-motion` is not a direct dependency and `motion` is the animation system. Verify: `package.json` lists `motion` and not `framer-motion`.

## 6. Metadata

- [ ] 6.1 Rewrite `index.html` head with title, meta description, Open Graph tags, Twitter card tags, a resolving preview image, viewport, and `theme-color`. Verify: every declared meta tag is present and the preview image resolves.
- [ ] 6.2 Remove the `lordon` CDN script tag and verify user scaling is not disabled. Verify: no CDN script tag remains and the viewport tag permits zoom.

## 7. Verification

- [ ] 7.1 Run `npm run lint` and reach zero errors. Verify: the command exits 0, improving on the 24-error baseline.
- [ ] 7.2 Run `npm run build` and confirm a clean production build with no WebGL runtime in the output. Verify: exit code 0 and no Three.js chunk.
- [ ] 7.3 Verify responsive behaviour at mobile, tablet, and desktop widths, confirming single-column collapse below the medium breakpoint and no horizontal scroll. Verify: manual pass at 375px, 768px, and 1440px.
- [ ] 7.4 Verify `prefers-reduced-motion` collapses every animation to its final state. Verify: emulating the preference shows no entrance, loop, or scroll-linked animation.
- [ ] 7.5 Verify keyboard-only navigation end to end, including skip link, nav, filters, mobile menu, and both overlays. Verify: full traversal with no focus trap and no invisible focus stop.
- [ ] 7.6 Audit visible copy for em-dashes, AI filler phrasing, and CTA label wrapping. Verify: grep finds no em-dash and all labels render on one line.
- [ ] 7.7 Confirm content parity against the original: projects, certifications, tech stack, about facts, nav labels, anchor IDs, and outbound links. Verify: each list matches the pre-redesign source.
