# accessibility Specification

## Purpose
Defines the accessibility contract for the site: keyboard operability, focus visibility and management, contrast, semantic structure, and image alternative text.

## Requirements

### Requirement: A skip link is provided
The site SHALL provide a skip link as the first focusable element that moves focus directly to the main content region.

#### Scenario: Skip link is the first stop for keyboard users
- **WHEN** a keyboard user presses Tab from the top of the page
- **THEN** the skip link receives focus

#### Scenario: Skip link moves focus to main content
- **WHEN** the skip link is activated
- **THEN** focus moves to the main content region
- **AND** the page scrolls to that region

#### Scenario: Skip link is hidden until focused
- **WHEN** the skip link is not focused
- **THEN** it is not visible
- **AND** it does not displace the page layout

### Requirement: Every interactive element has a visible focus indicator
Every link, button, and control SHALL show a clearly visible focus indicator when focused by keyboard, with sufficient contrast against its background.

#### Scenario: Focus is visible on navigation links
- **WHEN** a keyboard user tabs through the primary navigation
- **THEN** each focused link shows a visible focus indicator

#### Scenario: Focus is visible on all controls
- **WHEN** a keyboard user tabs through buttons, filters, and menu controls
- **THEN** each focused control shows a visible focus indicator

### Requirement: Overlays trap focus and restore it on close
The scheduling and resume overlays SHALL move focus inside when opened, SHALL keep focus within the overlay while it is open, and SHALL return focus to the element that opened it when closed.

#### Scenario: Focus enters the overlay
- **WHEN** an overlay opens
- **THEN** focus moves to a sensible element inside the overlay

#### Scenario: Focus is restored on close
- **WHEN** an overlay closes
- **THEN** focus returns to the control that opened it

#### Scenario: Tab does not escape the overlay
- **WHEN** focus is at the last focusable element inside an open overlay and Tab is pressed
- **THEN** focus stays within the overlay

### Requirement: Overlays are dismissible and labelled
Each overlay SHALL be dismissible by the Escape key and by activating the backdrop, and SHALL expose an accessible name and the modal role.

#### Scenario: Escape dismisses the overlay
- **WHEN** an overlay is open and the Escape key is pressed
- **THEN** the overlay closes

#### Scenario: Backdrop dismissal works
- **WHEN** a visitor activates the backdrop outside the overlay content
- **THEN** the overlay closes

#### Scenario: Overlay exposes an accessible name
- **WHEN** an overlay is inspected by assistive technology
- **THEN** it exposes the modal role and an accessible name

### Requirement: Background scrolling is suspended while an overlay is open
While an overlay is open, the page behind it SHALL NOT scroll, and scrolling SHALL be restored when the overlay closes.

#### Scenario: Page does not scroll behind an open overlay
- **WHEN** an overlay is open and the visitor attempts to scroll
- **THEN** the page content behind it does not move

#### Scenario: Scrolling is restored on close
- **WHEN** the overlay closes
- **THEN** the page scrolls normally again

### Requirement: Text contrast meets WCAG AA
All body text and interactive labels SHALL meet a contrast ratio of at least 4.5:1 against their background, and large display text SHALL meet at least 3:1.

#### Scenario: Body text is readable
- **WHEN** body copy is measured against its background
- **THEN** the contrast ratio is at least 4.5:1

#### Scenario: Muted text remains readable
- **WHEN** secondary and metadata text is measured against its background
- **THEN** the contrast ratio is at least 4.5:1

#### Scenario: Accent text is readable
- **WHEN** accent-coloured text is used
- **THEN** the contrast ratio against its background is at least 4.5:1

### Requirement: Interactive targets meet minimum size
Interactive controls SHALL present a hit area of at least 44 by 44 pixels.

#### Scenario: Controls are large enough to tap
- **WHEN** a control is measured
- **THEN** its hit area is at least 44 by 44 pixels

### Requirement: Meaningful images have descriptive alternative text
Every image that conveys content SHALL carry alternative text describing that content, and purely decorative images SHALL be marked as decorative so they are not announced.

#### Scenario: Content images are described
- **WHEN** an image conveys information such as a project preview
- **THEN** it carries alternative text describing it

#### Scenario: Decorative images are not announced
- **WHEN** an image is purely decorative
- **THEN** it is marked as decorative

### Requirement: Call to action labels fit on one line
Call to action labels SHALL NOT wrap onto multiple lines at desktop widths.

#### Scenario: Labels do not wrap at desktop
- **WHEN** call to action buttons are inspected at desktop width
- **THEN** each label renders on a single line

### Requirement: External links are safe and announced
Links that open in a new tab SHALL set a safe relationship and SHALL indicate that they open externally.

#### Scenario: New-tab links are safe
- **WHEN** a link opens in a new tab
- **THEN** the relationship prevents the new context from controlling the original page

#### Scenario: New-tab links are announced
- **WHEN** a link opens in a new tab
- **THEN** assistive technology is informed that a new tab opens
