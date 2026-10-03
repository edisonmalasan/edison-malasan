# metadata Specification

## Purpose
Defines the document head: the page title, the description used by search and link previews, social sharing metadata, and the browser chrome treatment.

## Requirements

### Requirement: The document declares a title and description
The document SHALL declare a title identifying the site owner and role, and a description summarising what the site offers.

#### Scenario: Title is present and descriptive
- **WHEN** the document head is inspected
- **THEN** a non-empty title identifying the site owner is present

#### Scenario: Description is present
- **WHEN** the document head is inspected
- **THEN** a non-empty meta description is present

### Requirement: Social sharing metadata is declared
The document SHALL declare Open Graph and Twitter card metadata including a title, description, and preview image, so that shared links render a correct card.

#### Scenario: Open Graph metadata is present
- **WHEN** the document head is inspected
- **THEN** Open Graph title, description, type, and image metadata are present

#### Scenario: Twitter card metadata is present
- **WHEN** the document head is inspected
- **THEN** Twitter card metadata including a preview image is present

### Requirement: Preview images resolve to real assets
Every declared preview image SHALL reference a file that exists in the application, so that link unfurls do not render broken.

#### Scenario: Declared preview image resolves
- **WHEN** a declared preview image path is requested
- **THEN** it resolves to an existing asset

### Requirement: Viewport and theme colour are declared
The document SHALL declare a responsive viewport and a browser theme colour matching the site's surface, so browser chrome does not clash with the page.

#### Scenario: Theme colour matches the page surface
- **WHEN** the browser chrome is rendered
- **THEN** its colour matches the site's background surface

### Requirement: The viewport is not artificially zoom-locked
The document SHALL NOT disable user scaling.

#### Scenario: Pinch zoom is permitted
- **WHEN** a visitor attempts to zoom the page
- **THEN** zoom is permitted
