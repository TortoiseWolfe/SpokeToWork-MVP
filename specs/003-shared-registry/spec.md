# Feature Specification: Shared Company Registry

**Feature Branch**: `003-shared-registry`
**Created**: 2025-12-27
**Status**: Draft
**Input**: User description: "Shared Company Registry: Community-contributed employer directory with contribution workflow"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Shared Companies (Priority: P1)

A job seeker wants to discover employers that other users have found, expanding their job search beyond their own research.

**Why this priority**: Core value proposition of community features - users benefit from collective knowledge without doing all the research themselves.

**Independent Test**: Can be fully tested by viewing the shared registry and seeing companies contributed by others.

**Acceptance Scenarios**:

1. **Given** a logged-in user, **When** they navigate to the shared registry, **Then** they see a list of community-contributed employers.
2. **Given** a user browsing shared companies, **When** they view a company, **Then** they see name, address, industry, and distance from their home.
3. **Given** a user browsing shared companies, **When** they filter by industry or distance, **Then** the list updates accordingly.

---

### User Story 2 - Add Shared Company to Personal List (Priority: P1)

A job seeker finds a company in the shared registry and wants to track it personally (add notes, set status, priority).

**Why this priority**: Connects shared registry to personal tracking - the core user workflow.

**Independent Test**: Can be tested by adding a shared company to personal list and verifying it appears with tracking options.

**Acceptance Scenarios**:

1. **Given** a user viewing a shared company, **When** they click "Add to My List", **Then** the company is added to their personal tracking.
2. **Given** a user who has added a shared company, **When** they view their personal list, **Then** they can set status, priority, and notes for that company.
3. **Given** a user tracking a shared company, **When** the shared company info updates, **Then** they see the updated info (but their personal notes/status remain).

---

### User Story 3 - Contribute Private Company to Registry (Priority: P2)

A job seeker has discovered an employer (added as private company) and wants to share it with the community.

**Why this priority**: Grows the shared registry - essential for community value but requires private companies feature first.

**Independent Test**: Can be tested by contributing a private company and verifying it appears in shared registry.

**Acceptance Scenarios**:

1. **Given** a user with a private company, **When** they click "Share with Community", **Then** they see a contribution form.
2. **Given** a user contributing a company, **When** they confirm the contribution, **Then** the company appears in the shared registry.
3. **Given** a user who has contributed, **When** they view the shared company, **Then** it shows they are a contributor.
4. **Given** a user contributing a company, **When** they submit, **Then** their private notes are NOT shared (only public info: name, address, industry).

---

### User Story 4 - View Contributor Count (Priority: P3)

A job seeker wants to know how many people have added a shared company to their list (social proof).

**Why this priority**: Nice-to-have social feature - helps validate that a company is worth pursuing.

**Independent Test**: Can be tested by viewing shared company and seeing contributor count.

**Acceptance Scenarios**:

1. **Given** a user viewing a shared company, **When** the company has multiple contributors, **Then** they see the count (e.g., "5 people tracking").
2. **Given** a user viewing contributor count, **When** they hover/tap, **Then** they do NOT see specific user names (privacy).

---

### User Story 5 - Deduplicate Contributions (Priority: P2)

When a user tries to contribute a company that already exists in the registry, the system should detect and handle duplicates.

**Why this priority**: Data quality is essential - duplicate entries degrade the registry value.

**Independent Test**: Can be tested by attempting to contribute a company with same name/address and verifying deduplication.

**Acceptance Scenarios**:

1. **Given** a user contributing a company, **When** a similar company exists in registry, **Then** they are shown the potential match.
2. **Given** a user seeing a potential match, **When** they confirm it's the same company, **Then** they are linked to existing entry (no duplicate created).
3. **Given** a user seeing a potential match, **When** they indicate it's different, **Then** their company is added as new entry.

---

### User Story 6 - Filter Shared Companies (Priority: P2)

A job seeker wants to filter the shared registry by industry, distance, or other criteria.

**Why this priority**: Usability - a long list of companies needs filtering to be useful.

**Independent Test**: Can be tested by applying filters and verifying results match criteria.

**Acceptance Scenarios**:

1. **Given** a user in the shared registry, **When** they filter by industry (e.g., Healthcare), **Then** only healthcare companies are shown.
2. **Given** a user in the shared registry, **When** they filter by distance (e.g., within 5 miles), **Then** only nearby companies are shown.
3. **Given** a user with active filters, **When** they clear filters, **Then** all companies are shown again.

---

### Edge Cases

- What if a contributed company has incorrect information? Allow users to suggest edits (future feature) or flag for review.
- What if a company closes or moves? Shared entries can be marked "needs verification" after a period without activity.
- What if two users contribute the same company simultaneously? Dedupe logic runs on contribution, second user sees existing entry.
- What if user wants to "un-share" a contribution? They can remove their contributor status but company remains if others are tracking it.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST maintain a shared company registry visible to all authenticated users
- **FR-002**: System MUST allow users to browse shared companies with name, address, industry, distance
- **FR-003**: System MUST allow users to add shared companies to their personal tracking list
- **FR-004**: System MUST allow users to contribute private companies to the shared registry
- **FR-005**: System MUST NOT share private user data (notes, status, priority) when contributing
- **FR-006**: System MUST track contributor count per shared company
- **FR-007**: System MUST detect potential duplicates during contribution (by name + address similarity)
- **FR-008**: System MUST allow filtering shared companies by industry
- **FR-009**: System MUST allow filtering shared companies by distance from user's home
- **FR-010**: System MUST link user's personal tracking to shared company (not create copy)
- **FR-011**: System MUST preserve user's personal notes/status when shared company info updates

### Key Entities

- **SharedCompany**: Community-contributed employer. Key attributes: name, address, lat/lng, industry, size_category, contributor_count, verified (boolean), created_at, updated_at.
- **UserCompanyTracking**: User's personal relationship to a shared company. Key attributes: user_id, shared_company_id, status, priority, notes, created_at.
- **Contribution**: Record of who contributed a company. Key attributes: user_id, shared_company_id, contributed_at.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can browse shared registry and find companies within 3 seconds
- **SC-002**: 80% of duplicate contributions are detected before creation
- **SC-003**: Adding shared company to personal list takes under 5 seconds
- **SC-004**: Contributing a private company takes under 30 seconds
- **SC-005**: Shared registry loads within 2 seconds (up to 500 companies)
- **SC-006**: Filter results update within 1 second

## Assumptions

- User has set home location (for distance calculations)
- Private companies feature exists (for contribution workflow)
- Industries are predefined categories (not free text)
- Initial registry will be seeded with Cleveland employers from research docs
- No moderation queue for initial beta (trust contributors)

## Dependencies

- **002-home-location**: Required for distance calculations
- **001-company-tracking**: Private companies to contribute from
