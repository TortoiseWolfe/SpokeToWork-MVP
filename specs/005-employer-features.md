# Feature Specification: Employer Features

**Feature Branch**: `005-employer-features`
**Created**: 2025-12-27
**Status**: Draft
**Input**: User description: "Employer Features: Claim company listing, post job openings, see workers tracking, provide feedback"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Claim Company Listing (Priority: P1)

An employer wants to claim their company in the shared registry to manage their listing and post jobs.

**Why this priority**: Core employer onboarding - without claiming, employers can't access any other features.

**Independent Test**: Can be fully tested by an employer claiming an existing shared company and gaining management access.

**Acceptance Scenarios**:

1. **Given** an employer viewing their company in the shared registry, **When** they click "Claim This Business", **Then** they see a verification flow.
2. **Given** an employer in the claim flow, **When** they provide verification (email domain match or manual review), **Then** they are linked as the company owner.
3. **Given** an employer who has claimed a company, **When** they view the listing, **Then** they see management options (edit info, post jobs).

---

### User Story 2 - Post Job Opening (Priority: P1)

An employer wants to post a job opening so job seekers can discover it.

**Why this priority**: Primary value for employers - posting jobs is why they would use the platform.

**Independent Test**: Can be tested by posting a job and verifying it appears to job seekers.

**Acceptance Scenarios**:

1. **Given** an employer with a claimed company, **When** they create a job posting, **Then** they can enter title, description, and shift times.
2. **Given** an employer posting a job, **When** they specify a different work location, **Then** that location is used instead of company HQ.
3. **Given** an employer with an active posting, **When** job seekers browse, **Then** they see the posting with distance from their home.

---

### User Story 3 - Manage Job Postings (Priority: P2)

An employer wants to update or close their job postings as positions are filled.

**Why this priority**: Jobs change status - employers need to keep listings current.

**Independent Test**: Can be tested by editing and closing a job posting.

**Acceptance Scenarios**:

1. **Given** an employer with active postings, **When** they view their dashboard, **Then** they see all their job postings with status.
2. **Given** an employer editing a posting, **When** they update details, **Then** changes are reflected to job seekers.
3. **Given** an employer closing a posting, **When** they mark it filled or closed, **Then** it no longer appears to job seekers.

---

### User Story 4 - See Workers Tracking (Priority: P2)

An employer wants to see how many job seekers have their company on their list (interest signal).

**Why this priority**: Provides value to employers - understanding candidate interest without revealing private data.

**Independent Test**: Can be tested by viewing tracker count for a claimed company.

**Acceptance Scenarios**:

1. **Given** an employer with a claimed company, **When** they view their dashboard, **Then** they see how many workers are tracking their company.
2. **Given** an employer viewing tracker count, **When** they look for details, **Then** they do NOT see individual worker names or profiles (privacy).
3. **Given** an employer with job postings, **When** they view posting stats, **Then** they see views and "interested" count per posting.

---

### User Story 5 - Provide Platform Feedback (Priority: P1)

An employer wants to provide feedback on the platform for beta testing purposes.

**Why this priority**: Critical for beta - investor documentation requires employer feedback.

**Independent Test**: Can be tested by submitting feedback and verifying it's recorded.

**Acceptance Scenarios**:

1. **Given** an employer on the platform, **When** they access feedback form, **Then** they can rate their experience and leave comments.
2. **Given** an employer submitting feedback, **When** they submit, **Then** they receive confirmation and feedback is stored.
3. **Given** platform admins, **When** they review feedback, **Then** they see all employer submissions with timestamps.

---

### User Story 6 - Edit Company Information (Priority: P2)

An employer wants to update their company's information in the shared registry.

**Why this priority**: Company info changes - employers should be able to keep it accurate.

**Independent Test**: Can be tested by editing company info and verifying changes appear in registry.

**Acceptance Scenarios**:

1. **Given** an employer with a claimed company, **When** they edit company details, **Then** they can update address, industry, and size.
2. **Given** an employer saving changes, **When** the address changes, **Then** the location is re-geocoded.
3. **Given** an employer editing, **When** changes are saved, **Then** all job seekers see updated info.

---

### Edge Cases

- What if multiple people try to claim the same company? First verified claim wins; others can request access from owner.
- What if an employer claims a company that doesn't exist in registry? They can add it directly (bypasses contribution flow).
- What if claimed company info conflicts with community contributions? Employer-verified info takes precedence.
- What if employer account is deleted? Company remains in registry but becomes unclaimed.
- What if employer posts job with past date? Validate shift times are in future.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow employers to claim companies in the shared registry
- **FR-002**: System MUST verify employer claims (email domain match or manual approval)
- **FR-003**: System MUST allow claimed company owners to post job openings
- **FR-004**: System MUST require job postings to have title, description, and shift times
- **FR-005**: System MUST allow job postings to specify work location different from company HQ
- **FR-006**: System MUST display job postings to job seekers with distance from home
- **FR-007**: System MUST allow employers to edit and close job postings
- **FR-008**: System MUST show employers how many workers are tracking their company (count only)
- **FR-009**: System MUST NOT reveal individual worker identities to employers
- **FR-010**: System MUST provide feedback collection mechanism for employers
- **FR-011**: System MUST allow employers to edit their claimed company's information
- **FR-012**: System MUST re-geocode when company address is updated

### Key Entities

- **EmployerProfile**: Links user account to claimed company. Key attributes: user_id, shared_company_id, verified (boolean), contact_email, created_at.
- **JobPosting**: A job opening posted by an employer. Key attributes: employer_id, shared_company_id, title, description, shift_times, lat/lng (if different from HQ), status (open/filled/closed), created_at, updated_at.
- **EmployerFeedback**: Beta feedback from employers. Key attributes: employer_id, rating, comments, created_at.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Employer can claim a company in under 2 minutes (excluding verification wait)
- **SC-002**: Job posting creation takes under 3 minutes
- **SC-003**: Job seekers see new postings within 1 minute of creation
- **SC-004**: Tracker count updates within 5 minutes of changes
- **SC-005**: 100% of beta employers can submit feedback
- **SC-006**: 3+ employer beta testers actively using platform by end of Jan 2026

## Assumptions

- Employers sign up with same auth system as workers (ScriptHammer)
- Email domain verification is primary claim method (e.g., @lifecare.com for Life Care Centers)
- Manual verification available for employers without matching email domains
- Job postings are free during beta (paid feature post-beta)
- No applicant tracking in beta - just visibility of interest

## Dependencies

- **003-shared-registry**: Companies must exist in shared registry to be claimed
