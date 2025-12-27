# Feature Specification: Company Tracking

**Feature Branch**: `001-company-tracking`
**Created**: 2025-12-27
**Status**: Draft
**Input**: User description: "Company Tracking: Add, edit, delete employers with geocoding and application status tracking"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add New Employer (Priority: P1)

A job seeker discovers a potential employer while job hunting and wants to add it to their personal list for tracking.

**Why this priority**: Core functionality - without the ability to add companies, no other features work. This is the foundation of the entire application.

**Independent Test**: Can be fully tested by adding a company with an address and verifying it appears on the user's company list with a map marker.

**Acceptance Scenarios**:

1. **Given** a logged-in user on the company list page, **When** they click "Add Company" and enter company name and address, **Then** the company is saved to their list and the address is converted to map coordinates.
2. **Given** a user adding a company, **When** they enter an invalid or unrecognizable address, **Then** they receive a clear error message and can correct the address.
3. **Given** a user adding a company, **When** they optionally add contact info (name, email, phone) and notes, **Then** this information is saved with the company.

---

### User Story 2 - View Companies on Map (Priority: P1)

A job seeker wants to see all their tracked employers on a map to understand geographic distribution and plan job hunting trips.

**Why this priority**: Visual map view is essential for a bicycle-based job hunting app - users need to see distances at a glance.

**Independent Test**: Can be tested by viewing the map after adding companies and verifying each appears as a clickable marker showing distance from home.

**Acceptance Scenarios**:

1. **Given** a user with companies in their list, **When** they view the map, **Then** each company appears as a marker with distance from home displayed.
2. **Given** a user viewing the map, **When** they click a company marker, **Then** they see company details (name, address, status, distance).
3. **Given** a user who has set their home location, **When** viewing companies, **Then** distances are calculated from home to each company.

---

### User Story 3 - Track Applications per Company (Priority: P2)

A job seeker wants to track multiple job applications at the same company, each with its own status. For example, they might be rejected for a senior role but encouraged to apply for a junior position.

**Why this priority**: Status tracking helps users stay organized across multiple applications, and tracking per-role (not just per-company) reflects real job hunting scenarios.

**Independent Test**: Can be tested by adding multiple applications to one company, each with different statuses, and verifying they display correctly.

**Acceptance Scenarios**:

1. **Given** a user viewing a company, **When** they add a new application with a role title, **Then** the application is saved with its own status tracking.
2. **Given** a user with multiple applications at one company, **When** they update one application's status, **Then** only that application's status changes (others remain unchanged).
3. **Given** a user who was rejected for one role, **When** they add a new application for a different role at the same company, **Then** both applications are tracked separately with their own statuses.
4. **Given** a user with multiple companies, **When** they filter by status, **Then** companies with at least one application matching that status are shown.

**Application Status Values**:
- Researching (tracking company, not yet applied)
- Applied
- Screening
- Interviewing
- Offer
- Rejected
- Withdrawn (user pulled out)

---

### User Story 4 - Edit Company Details (Priority: P2)

A job seeker needs to update information about an employer (new contact, corrected address, additional notes).

**Why this priority**: Information changes over time; users need to keep records accurate.

**Independent Test**: Can be tested by editing any company field and verifying changes persist after page refresh.

**Acceptance Scenarios**:

1. **Given** a user viewing a company, **When** they edit company details and save, **Then** changes are persisted.
2. **Given** a user editing an address, **When** the new address is valid, **Then** map coordinates are recalculated.
3. **Given** a user editing a company, **When** they cancel without saving, **Then** no changes are applied.

---

### User Story 5 - Delete Company (Priority: P3)

A job seeker wants to remove an employer from their list (no longer interested, closed, duplicate).

**Why this priority**: Housekeeping feature - useful but not essential for core job hunting workflow.

**Independent Test**: Can be tested by deleting a company and verifying it no longer appears in list or map.

**Acceptance Scenarios**:

1. **Given** a user viewing a company, **When** they choose to delete it, **Then** they are asked to confirm before deletion.
2. **Given** a user confirming deletion, **When** the company is removed, **Then** it no longer appears in their list or on the map.

---

### User Story 6 - Set Priority Level (Priority: P3)

A job seeker wants to mark certain employers as higher priority to focus their efforts.

**Why this priority**: Helps with organization but application works without priority rankings.

**Independent Test**: Can be tested by setting priority on companies and sorting by priority.

**Acceptance Scenarios**:

1. **Given** a user viewing a company, **When** they set a priority level (1-5), **Then** the priority is saved and displayed.
2. **Given** a user with prioritized companies, **When** they sort by priority, **Then** higher priority companies appear first.

---

### User Story 7 - Offline Access (Priority: P2)

A job seeker is on location (poor connectivity) and needs to view their company list and update status.

**Why this priority**: Users will be out biking to employers - offline capability is critical for field use.

**Independent Test**: Can be tested by going offline, viewing companies, making changes, then reconnecting and verifying sync.

**Acceptance Scenarios**:

1. **Given** a user who has previously loaded their companies, **When** they lose internet connection, **Then** they can still view their company list and map.
2. **Given** a user offline, **When** they update company status or notes, **Then** changes are queued and sync when connection returns.
3. **Given** a user coming back online, **When** queued changes sync, **Then** they receive confirmation of successful sync.

---

### Edge Cases

- What happens when a user enters an address that cannot be geocoded? Show error, allow manual coordinate entry or address correction.
- What happens when a user tries to add a duplicate company? Warn user, allow them to proceed or view existing entry.
- How does the system handle very long notes? Limit note length with clear character count indicator.
- What happens if offline changes conflict with server data? Last-write-wins with notification to user.
- What happens when a user adds the same role title twice at one company? Allow it - they may reapply after being rejected.
- How are companies with zero applications displayed? Show "No applications" or "Researching" indicator in list view.
- What happens when all applications at a company are rejected/withdrawn? Company remains in list; user can add new applications or delete company.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to add companies with name (required) and address (required)
- **FR-002**: System MUST convert company addresses to geographic coordinates (geocoding)
- **FR-003**: System MUST display companies on an interactive map with markers
- **FR-004**: System MUST calculate and display distance from user's home to each company
- **FR-005**: System MUST allow users to edit all company fields (name, address, contact info, notes)
- **FR-006**: System MUST allow users to delete companies with confirmation
- **FR-007**: System MUST allow multiple applications per company, each with its own status
- **FR-008**: System MUST track application status per application (not per company) with defined status values
- **FR-009**: System MUST allow adding applications with role title (required) and notes (optional)
- **FR-010**: System MUST allow filtering companies by application status (shows companies with at least one matching application)
- **FR-011**: System MUST allow sorting companies by distance, priority, or name
- **FR-012**: System MUST allow users to set priority level (1-5) for each company (company-level, not per application)
- **FR-013**: System MUST store company and application data for offline access
- **FR-014**: System MUST queue offline changes and sync when connection is restored
- **FR-015**: System MUST notify users of sync success or conflicts
- **FR-016**: System MUST allow optional company fields: contact name, email, phone, company notes
- **FR-017**: System MUST allow optional application fields: application notes

### Key Entities

- **Company**: Represents an employer the user is tracking. Key attributes: name, address, coordinates (lat/lng), industry, size, contact info (name, email, phone), company notes, priority level (1-5), created date, updated date. A company can have zero or more applications.
- **Application**: Represents a specific job application at a company. Key attributes: role title (required), status, date applied, application notes (optional). Each application tracks a separate position the user has applied for or is researching.
- **User Home Location**: The user's starting point for distance calculations. Key attributes: address, coordinates.
- **Application Status**: The stage of the job application process. Values: researching, applied, screening, interviewing, offer, rejected, withdrawn.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can add a new company in under 30 seconds
- **SC-002**: Geocoding succeeds for 95% of valid US addresses
- **SC-003**: Map displays all companies within 2 seconds of page load (up to 100 companies)
- **SC-004**: Distance calculations are accurate within 0.1 miles
- **SC-005**: Offline mode allows viewing and editing with 100% of data available after initial load
- **SC-006**: Status updates sync within 5 seconds of connectivity restoration
- **SC-007**: Users can filter to specific status in under 2 seconds
- **SC-008**: Zero data loss during offline/online transitions

## Assumptions

- User has already set their home location (separate feature or onboarding step)
- ScriptHammer template provides authentication - users must be logged in
- Companies are private to each user (shared registry is a separate feature)
- Mobile-first responsive design for use while biking/walking
- Cleveland, Tennessee and surrounding area as initial geographic focus
