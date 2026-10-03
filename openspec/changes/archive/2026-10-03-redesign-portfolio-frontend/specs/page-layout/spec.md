# Spec Delta

## Purpose

Defines the page shell, the responsive container and grid system, and the distinct layout family each content section uses so the page reads as a composed system rather than a repeated card grid.

## ADDED Requirements

### Requirement: Page is built from semantic landmarks
The site SHALL expose its structure through a header, a navigation landmark, a single main landmark, section elements per content area, and a footer.

#### Scenario: Landmarks are present and uniquely identifiable
- **WHEN** a screen reader enumerates the document landmarks
- **THEN** one header, one main, and one footer are present
- **AND** each content area is a labelled section

### Requirement: Content is width-constrained
All section content SHALL sit inside a centred container with a maximum width, so that content does not stretch edge to edge on wide viewports.

#### Scenario: Wide viewport is constrained
- **WHEN** the viewport is wider than the container maximum
- **THEN** content is centred and the container stops widening
- **AND** gutters remain on both sides

### Requirement: Each section uses a distinct layout family
Sections SHALL NOT reuse the same layout family more than twice across the page, and no more than two consecutive sections SHALL use an image-plus-text split.

#### Scenario: Layout families vary across the page
- **WHEN** the page sections are reviewed in order
- **THEN** at least four distinct layout families are used
- **AND** no more than two consecutive sections share an image-plus-text split

### Requirement: Hero is asymmetric and fits the initial viewport
The hero SHALL use an asymmetric split composition, SHALL fit within the initial viewport without requiring a scroll to reach the primary call to action, and SHALL NOT use more than four text elements.

#### Scenario: Primary action is visible without scrolling
- **WHEN** a visitor loads the page at desktop width
- **THEN** the hero headline and primary call to action are visible without scrolling

#### Scenario: Hero avoids centred symmetry
- **WHEN** the hero is inspected at desktop width
- **THEN** content is aligned asymmetrically rather than centred on both axes

### Requirement: Full-height sections use dynamic viewport units
Any section sized to the viewport SHALL use dynamic viewport units rather than fixed viewport units, so mobile browser chrome does not cause layout shift.

#### Scenario: Mobile viewport shift is avoided
- **WHEN** a mobile browser's address bar collapses or expands
- **THEN** no content is clipped or jumps

### Requirement: Breakpoints collapse asymmetric layouts on small screens
Every multi-column or asymmetric layout SHALL declare an explicit single-column layout below the medium breakpoint.

#### Scenario: Mobile layout is single column
- **WHEN** the viewport is narrower than the medium breakpoint
- **THEN** every section renders as a single column
- **AND** no horizontal scrolling is required to read content

### Requirement: Interactive elements show pressed feedback
Buttons, links, and controls SHALL provide a visible active state that simulates a physical press.

#### Scenario: Press feedback is visible
- **WHEN** an interactive element is pressed
- **THEN** it visibly shifts or scales to acknowledge the press

### Requirement: Icon usage is consistent
All interface icons SHALL come from a single icon library at a single standardised stroke width, and SHALL NOT be hand-authored as inline SVG paths.

#### Scenario: Icons share one family and stroke width
- **WHEN** icons across the page are compared
- **THEN** they are drawn in the same family at the same stroke width
