# motion Specification

## Purpose
Defines the animation layer: which Motion primitives carry the page's motion, which interactions receive a transition, and the contract that every animation honours a reduced-motion preference.

## Requirements

### Requirement: Motion is the animation system
The site SHALL use the Motion library as its animation system and SHALL NOT introduce a competing animation library or hand-rolled animation loops driven by React state.

#### Scenario: No competing animation library is used
- **WHEN** the source is inspected
- **THEN** animation is driven by a single animation system
- **AND** the legacy `framer-motion` package is not a direct dependency

#### Scenario: No scroll handlers drive React state
- **WHEN** the page scrolls
- **THEN** no animation is driven by a scroll event handler updating component state on every frame

### Requirement: Every animation is reduced-motion aware
Every animated element SHALL honour the operating system's reduced-motion preference by rendering its final state immediately, with no transform, no fade, and no looping animation.

#### Scenario: Reduced motion disables entrance animations
- **WHEN** the reduced-motion preference is enabled and the page loads
- **THEN** all content is rendered in its final state
- **AND** no entrance animation plays

#### Scenario: Reduced motion disables scroll-linked effects
- **WHEN** the reduced-motion preference is enabled and the visitor scrolls
- **THEN** no parallax, scroll-linked transform, or scrubbed animation occurs

#### Scenario: Reduced motion disables looping animation
- **WHEN** the reduced-motion preference is enabled
- **THEN** no infinite or perpetual animation runs anywhere on the page

### Requirement: Continuous values do not re-render the React tree
Pointer-driven and scroll-driven values SHALL be expressed as animation values outside the React render cycle, so that continuous interaction does not trigger a re-render per frame.

#### Scenario: Pointer movement does not re-render
- **WHEN** a visitor moves the pointer across an interactive element
- **THEN** the component tree does not re-render per movement event

### Requirement: Scroll reveals are viewport-triggered and fire once
Content that animates in on scroll SHALL be triggered by viewport entry rather than by scroll position arithmetic, and SHALL animate at most once per element.

#### Scenario: Reveal plays once on entry
- **WHEN** a section scrolls into view
- **THEN** its reveal animation plays
- **AND** scrolling past it again does not replay the animation

### Requirement: Layout changes animate as layout transitions
When a change reorders or resizes a set of visible elements, such as when a project filter changes the displayed set, the change SHALL be animated as a layout transition rather than as a crossfade.

#### Scenario: Filter change animates position
- **WHEN** a visitor changes the project filter
- **THEN** surviving items animate to their new positions

### Requirement: Overlays animate in and out
The scheduling and resume overlays SHALL animate on both open and close, and SHALL NOT appear or disappear instantly.

#### Scenario: Overlay has an exit animation
- **WHEN** a visitor dismisses an overlay
- **THEN** the overlay animates out before it is removed

### Requirement: The previous custom cursor and click-spark effect are not present
The site SHALL NOT hide the native pointer, and SHALL NOT render a decorative click-spark effect on click.

#### Scenario: Native cursor remains visible
- **WHEN** a visitor moves the pointer over the page
- **THEN** the native pointer remains visible

#### Scenario: Clicking does not emit decorative particles
- **WHEN** a visitor clicks anywhere on the page
- **THEN** no decorative particle burst is rendered

### Requirement: Motion is limited to transitions and state changes
The site SHALL NOT run perpetual decorative animation loops that do not communicate state, hierarchy, or feedback.

#### Scenario: Static sections remain static
- **WHEN** a section holds no interactive state
- **THEN** it does not animate continuously

### Requirement: Animations clean up after themselves
Every animation driven by a subscription or listener SHALL release its resources when the component unmounts or its dependency changes.

#### Scenario: No leaked listeners on unmount
- **WHEN** a component with an animation unmounts
- **THEN** its animation and its subscriptions are torn down
