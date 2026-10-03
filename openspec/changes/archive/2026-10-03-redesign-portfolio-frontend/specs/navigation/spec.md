# Spec Delta

## Purpose

Defines how visitors move through the page: the sticky header, how the active section is tracked and indicated, the desktop and mobile navigation presentations, and how anchor navigation scrolls to content.

## ADDED Requirements

### Requirement: Sticky header exposes primary navigation
The site SHALL provide a sticky header containing a link back to the top of the page, the primary navigation links, and a single primary call to action.

#### Scenario: Header remains available while scrolling
- **WHEN** a visitor scrolls down the page
- **THEN** the header remains visible and reachable

#### Scenario: Header stays within the height budget
- **WHEN** the header is measured at desktop width
- **THEN** its height does not exceed 80 pixels

### Requirement: Primary navigation links remain on one line at desktop
The primary navigation SHALL render all of its links on a single horizontal line at desktop widths, and SHALL collapse to a menu control below the desktop breakpoint.

#### Scenario: Desktop navigation is single line
- **WHEN** the viewport is at least the desktop breakpoint
- **THEN** all navigation links appear on one line
- **AND** no link wraps onto a second row

#### Scenario: Small viewports get a menu control
- **WHEN** the viewport is below the desktop breakpoint
- **THEN** links are not displayed inline
- **AND** a menu control is provided to reach them

### Requirement: Active section is tracked and indicated
As the visitor scrolls, the navigation SHALL indicate which section is currently in view, and SHALL expose that state programmatically.

#### Scenario: Active section updates on scroll
- **WHEN** a section scrolls into the active position
- **THEN** its navigation link becomes visually indicated
- **AND** exactly one link is indicated at a time

#### Scenario: Active state is exposed to assistive technology
- **WHEN** the active section changes
- **THEN** the corresponding navigation link exposes the current-page state

### Requirement: Navigation labels match the existing set
The primary navigation SHALL expose the labels About, Tools, Projects, and Certifications, each linking to its corresponding section anchor.

#### Scenario: Labels are unchanged
- **WHEN** the primary navigation is inspected
- **THEN** it contains exactly the labels About, Tools, Projects, and Certifications

### Requirement: Anchor navigation scrolls to the target section
Activating a navigation link SHALL scroll the viewport to the corresponding section rather than performing a full page navigation.

#### Scenario: Link scrolls without a page load
- **WHEN** a visitor activates a navigation link
- **THEN** the page scrolls to the target section
- **AND** the document is not reloaded

#### Scenario: Target section is not hidden beneath the header
- **WHEN** a visitor arrives at a section via an anchor link
- **THEN** the section heading is fully visible and not obscured by the sticky header

### Requirement: Mobile menu is keyboard operable
The mobile menu SHALL open and close via keyboard, SHALL be dismissible with the Escape key, and SHALL return focus to its trigger when closed.

#### Scenario: Menu opens from the keyboard
- **WHEN** a keyboard user activates the menu control
- **THEN** the menu opens and focus moves into it

#### Scenario: Escape closes the menu
- **WHEN** the menu is open and the Escape key is pressed
- **THEN** the menu closes
- **AND** focus returns to the menu control

#### Scenario: Selecting a link closes the menu
- **WHEN** a visitor selects a navigation link from the open mobile menu
- **THEN** the menu closes and the page scrolls to the target section

### Requirement: The contact call to action is reachable from the header
The header SHALL expose exactly one primary call to action that opens the appointment scheduling experience, and the same action SHALL be available in the hero and footer using one consistent label.

#### Scenario: Contact intent has a single label
- **WHEN** the header, hero, and footer call to actions are compared
- **THEN** they all use the same label for the scheduling intent

#### Scenario: Primary action opens scheduling
- **WHEN** a visitor activates the header call to action
- **THEN** the appointment scheduling experience opens
