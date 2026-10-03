# Spec Delta

## Purpose

Defines how quickly and how lightly the site loads and runs, covering bundle weight, font and image delivery, and the removal of the blocking loading experience.

## ADDED Requirements

### Requirement: No blocking loading overlay
The site SHALL NOT display a full-screen loading overlay that delays or hides the page content on first load.

#### Scenario: Content is immediately available
- **WHEN** a visitor loads the page
- **THEN** page content renders without a blocking loading overlay
- **AND** the visitor is never prevented from reading or scrolling

#### Scenario: No artificial minimum delay
- **WHEN** the page resources finish loading quickly
- **THEN** the page becomes usable immediately
- **AND** no fixed minimum display time is imposed

### Requirement: No WebGL rendering on the critical path
The site SHALL NOT render a 3D scene on the page, and the WebGL runtime and its supporting packages SHALL NOT be part of the shipped application bundle.

#### Scenario: WebGL runtime is absent from the bundle
- **WHEN** the production build output is inspected
- **THEN** no WebGL 3D runtime is included
- **AND** the packages required only for 3D rendering are not dependencies of the application

#### Scenario: No canvas is rendered
- **WHEN** the page is loaded
- **THEN** no 3D canvas element is created

### Requirement: Fonts are self-hosted and do not block rendering
Font files SHALL be served from the application's own origin with a swap-based font display strategy, so that text renders in a fallback face rather than remaining invisible while fonts load.

#### Scenario: Text is visible before fonts finish loading
- **WHEN** a font file is slow to arrive
- **THEN** page text is already visible in a fallback face

#### Scenario: Fonts do not trigger layout shift at load
- **WHEN** fonts finish loading after first paint
- **THEN** the layout shift stays within the defined budget

### Requirement: Images declare intrinsic dimensions and lazy-load below the fold
Content images SHALL reserve their space before loading to avoid layout shift, and images below the fold SHALL be lazily loaded.

#### Scenario: Space is reserved for images
- **WHEN** an image has not yet loaded
- **THEN** its space is already reserved so surrounding content does not jump

#### Scenario: Below-the-fold images defer loading
- **WHEN** an image is below the fold
- **THEN** it is not fetched until it approaches the viewport

### Requirement: The largest content element is prioritised
The primary visual element of the initial viewport SHALL be eagerly loaded so it is not deferred behind other requests.

#### Scenario: Hero asset loads eagerly
- **WHEN** the page begins loading
- **THEN** the hero's primary asset is requested with high priority

### Requirement: Continuous animation does not run on a scrolling container
Texture and grain effects SHALL be applied only to fixed, non-interactive layers, and SHALL NOT be attached to scrolling containers.

#### Scenario: Grain overlay is fixed and non-interactive
- **WHEN** a grain or texture effect is applied
- **THEN** it sits on a fixed layer that does not capture pointer events and does not repaint during scroll

### Requirement: Animation work stays on the compositor
Animations SHALL be limited to transform and opacity so they do not force layout or paint on each frame.

#### Scenario: Animations avoid layout-triggering properties
- **WHEN** an animation is applied
- **THEN** it animates only transform and opacity

### Requirement: No runtime network dependency for core presentation
The core layout, typography, colour, and content SHALL render without fetching third-party resources at runtime.

#### Scenario: Core presentation works offline
- **WHEN** third-party requests are blocked
- **THEN** the page still renders its full layout, typography, colour, and content
