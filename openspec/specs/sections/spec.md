# sections Specification

## Purpose
Defines the six content sections and the rules for presenting project and certification content, including how visitors filter and explore that content.

## Requirements

### Requirement: All six content sections are present
The site SHALL present a hero, an about section, a tools section, a current projects section, a completed projects section, and a certifications section, in that order, each with its existing anchor identifier preserved.

#### Scenario: Sections render in order with stable anchors
- **WHEN** the page is loaded
- **THEN** the six sections appear in the documented order
- **AND** each exposes its established anchor identifier

### Requirement: Existing content is preserved
Project titles, descriptions, technology tags, category labels, repository visibility, certifications, and about-section facts SHALL be carried into the redesign unchanged.

#### Scenario: Project data is carried over intact
- **WHEN** a project from the previous site is inspected
- **THEN** its title, description, technology tags, category, and repository visibility are present and unchanged

#### Scenario: Certification data is carried over intact
- **WHEN** a certification from the previous site is inspected
- **THEN** its title, issuer, year, image, and credential link are present and unchanged

### Requirement: Completed projects are filterable without pagination
The completed projects section SHALL render all projects in a single continuous view and SHALL provide filters by project category, replacing the previous paginated carousel.

#### Scenario: All projects are reachable without paging
- **WHEN** the completed projects section is opened
- **THEN** every project is reachable in one view without navigating between pages

#### Scenario: Filtering narrows the visible set
- **WHEN** a visitor selects a category filter
- **THEN** only projects in that category are shown
- **AND** the filter control reflects the active selection

#### Scenario: Filtering is reversible
- **WHEN** a visitor clears or changes the active filter
- **THEN** the full project set is shown again

#### Scenario: Empty filter result is communicated
- **WHEN** a filter selection yields no projects
- **THEN** a clear empty state explains that no projects match, rather than a blank area

### Requirement: Filters are keyboard operable
Project filter controls SHALL be operable by keyboard and SHALL expose their selected state programmatically.

#### Scenario: Filters respond to keyboard activation
- **WHEN** a keyboard user activates a filter control
- **THEN** the corresponding filter is applied

#### Scenario: Selected filter is exposed
- **WHEN** a filter is active
- **THEN** that control exposes its pressed or selected state

### Requirement: Certifications render without pagination
The certifications section SHALL display all certifications in a single continuous grid, replacing the previous paginated carousel, and SHALL provide a working link to each credential.

#### Scenario: All certifications are visible at once
- **WHEN** the certifications section is opened
- **THEN** every certification is present without navigating between pages

#### Scenario: Credential link opens externally and safely
- **WHEN** a visitor activates a credential link
- **THEN** the credential opens in a new tab
- **AND** the new context cannot access the originating page

### Requirement: Repository visibility is communicated
Each project SHALL display whether its repository is public or private using a text label in addition to an icon.

#### Scenario: Visibility is not conveyed by icon alone
- **WHEN** a project card is inspected
- **THEN** its repository visibility is stated in text

### Requirement: Private repositories do not offer a source link
Projects whose repository is private SHALL NOT render a link to the source repository.

#### Scenario: Private project omits the source link
- **WHEN** a private project is rendered
- **THEN** no link to its source repository is present

#### Scenario: Public project links to its source
- **WHEN** a public project is rendered
- **THEN** a link to its source repository is present and opens in a new tab

### Requirement: Scheduling and resume experiences are reachable
The hero SHALL provide a call to action that opens the appointment scheduling experience and a secondary call to action that opens the resume viewer, both dismissible and keyboard accessible.

#### Scenario: Scheduling experience opens and closes
- **WHEN** a visitor opens the scheduling experience and then dismisses it
- **THEN** the experience closes and page scrolling is restored

#### Scenario: Resume experience opens and closes
- **WHEN** a visitor opens the resume viewer and then dismisses it
- **THEN** the viewer closes and page scrolling is restored

### Requirement: The terminal motif is concentrated
The terminal prompt motif SHALL appear only in the hero and the footer, and SHALL NOT be repeated as a label above section headings elsewhere on the page.

#### Scenario: Terminal motif is limited to two sections
- **WHEN** the page is reviewed
- **THEN** the terminal prompt appears in the hero and the footer only

### Requirement: Social links are always visible
Social profile links SHALL be visible without requiring a hover interaction to reveal them.

#### Scenario: Social links do not depend on hover
- **WHEN** a visitor uses a keyboard or touch device
- **THEN** the social links are reachable without triggering a hover state
