# Feature Specification: Home Location Setup

**Feature Branch**: `002-home-location`
**Created**: 2025-12-27
**Status**: Draft
**Input**: User description: "Home Location Setup: Set and update user's home address for distance calculations"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Set Home Location (Priority: P1)

A new user needs to set their home address so the app can calculate distances to employers.

**Why this priority**: Core functionality - without a home location, distance calculations are impossible. This enables the primary value proposition of the app.

**Independent Test**: Can be fully tested by entering an address and verifying it saves and displays on the map.

**Acceptance Scenarios**:

1. **Given** a logged-in user without a home location set, **When** they navigate to settings or are prompted during onboarding, **Then** they see a form to enter their home address.
2. **Given** a user entering their address, **When** they submit a valid address, **Then** the address is geocoded and saved as their home location.
3. **Given** a user who has set their home, **When** they view the company map, **Then** their home is marked and distances are calculated from it.

---

### User Story 2 - Update Home Location (Priority: P2)

A user moves to a new address and needs to update their home location.

**Why this priority**: Users move; the app must support updates. Less common than initial setup but still essential.

**Independent Test**: Can be tested by changing an existing home address and verifying distances recalculate.

**Acceptance Scenarios**:

1. **Given** a user with an existing home location, **When** they access settings, **Then** they can edit their home address.
2. **Given** a user updating their address, **When** they save, **Then** the new coordinates are stored and all distances update.
3. **Given** a user updating address, **When** they cancel, **Then** the original address is preserved.

---

### User Story 3 - View Home on Map (Priority: P2)

A user wants to see their home location on the map for orientation.

**Why this priority**: Visual confirmation helps users understand the map context and verify their address is correct.

**Independent Test**: Can be tested by checking that home marker appears on map after setting address.

**Acceptance Scenarios**:

1. **Given** a user with a home location set, **When** they view the company map, **Then** their home appears as a distinct marker (different from company markers).
2. **Given** a user clicking their home marker, **When** the popup appears, **Then** it shows their address.

---

### User Story 4 - Onboarding Prompt (Priority: P1)

A new user is prompted to set their home location as part of first-time setup.

**Why this priority**: Users need guidance to set up the app correctly. Without prompting, they may not discover this essential step.

**Independent Test**: Can be tested by logging in as new user and verifying the prompt appears.

**Acceptance Scenarios**:

1. **Given** a new user logging in for the first time, **When** they don't have a home location, **Then** they are prompted to set one before accessing other features.
2. **Given** a user in onboarding, **When** they set their home location, **Then** they can proceed to the main app.
3. **Given** a returning user with home already set, **When** they log in, **Then** they go directly to the main app (no prompt).

---

### Edge Cases

- What happens when a user enters an address that cannot be geocoded? Show error message, suggest corrections, allow retry.
- What happens if geocoding service is unavailable? Queue the request, notify user, allow manual retry later.
- What if user enters a non-US address? Show warning that the app is optimized for Cleveland, TN area but allow saving.
- What if user clears their home location? Disable distance features, prompt to set home again.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to enter a home address (street, city, state, zip)
- **FR-002**: System MUST geocode the address to latitude/longitude coordinates
- **FR-003**: System MUST persist the home location per user account
- **FR-004**: System MUST display a home marker on the map (visually distinct from companies)
- **FR-005**: System MUST allow users to update their home address
- **FR-006**: System MUST prompt new users to set home location during onboarding
- **FR-007**: System MUST use home location as the origin for all distance calculations
- **FR-008**: System MUST recalculate all company distances when home location changes
- **FR-009**: System MUST cache home location for offline access

### Key Entities

- **UserHomeLocation**: The user's starting point for distance calculations. Key attributes: address (string), lat (decimal), lng (decimal), updated_at (timestamp). One per user.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can set their home location in under 30 seconds
- **SC-002**: Geocoding succeeds for 95% of valid Cleveland, TN area addresses
- **SC-003**: Home marker is visible on map within 1 second of page load
- **SC-004**: 100% of new users see the onboarding prompt
- **SC-005**: Distance calculations update within 2 seconds of home location change
- **SC-006**: Home location is available offline after initial load

## Assumptions

- User is authenticated (ScriptHammer provides auth)
- Geocoding uses Nominatim (same as company tracking)
- Single home location per user (no multiple homes)
- Cleveland, TN area is primary focus but any US address accepted
- This feature is a prerequisite for company distance display
