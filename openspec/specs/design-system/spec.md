# design-system Specification

## Purpose
Defines the visual foundation of the portfolio: the type scale, colour tokens, surface treatment, radius and shadow rules, and the shared primitive components that every section is built from.

## Requirements

### Requirement: Type system uses self-hosted variable fonts
The site SHALL load all type from self-hosted variable font files declared with `@font-face` and `font-display: swap`, and SHALL NOT reference a remote font stylesheet at runtime.

#### Scenario: Page renders without a third-party font request
- **WHEN** a visitor loads the page
- **THEN** all text renders using locally served font files
- **AND** no request is made to an external font hosting service

#### Scenario: Font files fail to load
- **WHEN** a font file cannot be fetched
- **THEN** text falls back to the declared system font stack
- **AND** page content remains readable and correctly laid out

### Requirement: Display and body type come from a single family pairing
The site SHALL use exactly one sans-serif family for display and body text and exactly one monospace family for terminal prompts, metadata, and numeric data. No other font family SHALL be declared.

#### Scenario: Font inventory is limited to the two declared families
- **WHEN** the stylesheet is inspected
- **THEN** only the two chosen families are declared as web fonts
- **AND** no superseded family (Inter, Montserrat, JetBrains Mono, Open Sans) is loaded

#### Scenario: Body copy stays within a readable measure
- **WHEN** a paragraph of body text is rendered
- **THEN** its line length is constrained to approximately 65 characters or fewer

#### Scenario: Numeric data uses tabular figures
- **WHEN** a numeric value is displayed as metadata or a count
- **THEN** it is rendered in the monospace family with tabular numerals so digits align

### Requirement: Off-black surface ramp replaces pure black
The site SHALL render on a dark surface ramp whose darkest value is an off-black, and SHALL NOT use pure `#000000` as a page or section background.

#### Scenario: Background is off-black
- **WHEN** the page background is sampled
- **THEN** it is a dark neutral tinted off-black rather than pure black

#### Scenario: Section depth is expressed through the surface ramp
- **WHEN** distinct sections are compared
- **THEN** separation is achieved through steps of the surface ramp
- **AND** no section inverts to a light theme

### Requirement: A single accent colour is used page-wide
The site SHALL use exactly one accent colour, applied consistently to every interactive and emphasis element across all sections. No secondary accent colour SHALL be introduced.

#### Scenario: Accent is consistent across sections
- **WHEN** interactive and emphasis elements in different sections are compared
- **THEN** they all express emphasis through the same single accent colour

#### Scenario: Accent is used only where it carries meaning
- **WHEN** a decorative element that conveys no state or emphasis is rendered
- **THEN** it does not use the accent colour

### Requirement: One radius scale is applied consistently
The site SHALL apply a single documented radius scale, using a larger radius for containers and a smaller radius for controls and tags, and SHALL NOT mix unrelated radius treatments on the same surface type.

#### Scenario: Radii follow the documented rule
- **WHEN** a container and a control inside it are compared
- **THEN** the container uses the larger radius and the control uses the smaller radius

### Requirement: Shadows are tinted to the background hue
The site SHALL tint all elevation shadows toward the hue of the background rather than using untinted pure-black drop shadows.

#### Scenario: Elevated surfaces use tinted shadow
- **WHEN** a raised surface is rendered
- **THEN** its shadow carries the background hue

### Requirement: Shared primitive components are available to all sections
The site SHALL expose shared primitives for section headings, tech tags, repository-visibility badges, and scroll-reveal wrappers so that repeated patterns are implemented once.

#### Scenario: Repeated patterns are implemented once
- **WHEN** a section renders a heading, a tag, or a repository badge
- **THEN** it uses the shared primitive rather than a section-local reimplementation

### Requirement: Eyebrow labels are rationed
The site SHALL use at most one small uppercase tracked eyebrow label per three sections.

#### Scenario: Eyebrow count stays within budget
- **WHEN** all section headers are counted
- **THEN** the number of eyebrow labels does not exceed one per three sections

### Requirement: Copy contains no em-dashes
All user-visible text SHALL avoid the em-dash character, using a period, comma, colon, or hyphen instead.

#### Scenario: Visible copy is em-dash free
- **WHEN** all rendered headings, labels, buttons, captions, and body copy are inspected
- **THEN** no em-dash character appears
