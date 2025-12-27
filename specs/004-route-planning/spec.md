# Feature Specification: Route Planning

**Feature Branch**: `004-route-planning`
**Created**: 2025-12-27
**Status**: Draft
**Input**: User description: "Route Planning: Create bicycle routes connecting multiple companies with directions and time estimates"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create Route from Companies (Priority: P1)

A job seeker wants to plan a day of job hunting by creating a route that connects multiple employers they want to visit.

**Why this priority**: Core feature - enables efficient multi-stop job hunting trips, the primary use case for route planning.

**Independent Test**: Can be fully tested by selecting companies and generating a route with directions.

**Acceptance Scenarios**:

1. **Given** a user with companies on their list, **When** they select multiple companies, **Then** they can create a named route connecting them.
2. **Given** a user creating a route, **When** they add companies to the route, **Then** the companies appear in an ordered sequence.
3. **Given** a user with a route, **When** they save the route, **Then** it persists and appears in their saved routes list.

---

### User Story 2 - View Route on Map (Priority: P1)

A job seeker wants to see their route visually on a map to understand the path and distances.

**Why this priority**: Visual map display is essential for understanding the route before heading out.

**Independent Test**: Can be tested by viewing a saved route and seeing it displayed on the map.

**Acceptance Scenarios**:

1. **Given** a user with a saved route, **When** they view the route, **Then** it displays on the map as a connected path.
2. **Given** a user viewing a route on map, **When** they see the route, **Then** each company is marked with a numbered stop.
3. **Given** a user viewing a route, **When** they see the path, **Then** it follows bicycle-appropriate roads and trails.

---

### User Story 3 - Get Turn-by-Turn Directions (Priority: P1)

A job seeker wants step-by-step bicycle directions for their route.

**Why this priority**: Actionable directions are required to actually use the route while cycling.

**Independent Test**: Can be tested by generating directions and verifying step-by-step instructions appear.

**Acceptance Scenarios**:

1. **Given** a user viewing a route, **When** they request directions, **Then** they see turn-by-turn instructions.
2. **Given** a user viewing directions, **When** they see each step, **Then** it includes distance and street/trail name.
3. **Given** a user with directions, **When** they navigate, **Then** they can see which step they're on.

---

### User Story 4 - View Route Summary (Priority: P1)

A job seeker wants to see total distance, estimated ride time, and elevation profile for their route.

**Why this priority**: Summary info helps users decide if a route is feasible for their fitness level and time available.

**Independent Test**: Can be tested by viewing route summary and verifying distance/time/elevation are shown.

**Acceptance Scenarios**:

1. **Given** a user viewing a route, **When** they see the summary, **Then** total distance in miles is displayed.
2. **Given** a user viewing a route, **When** they see the summary, **Then** estimated ride time is displayed.
3. **Given** a user viewing a route, **When** they see the summary, **Then** elevation gain/loss is displayed.

---

### User Story 5 - Reorder Stops (Priority: P2)

A job seeker wants to change the order of companies in their route.

**Why this priority**: Users may want to optimize order based on interview times or preferences.

**Independent Test**: Can be tested by reordering stops and verifying route recalculates.

**Acceptance Scenarios**:

1. **Given** a user editing a route, **When** they drag a company to a new position, **Then** the order updates.
2. **Given** a user who reorders stops, **When** they save, **Then** the route recalculates with new directions.

---

### User Story 6 - Start Route from Home (Priority: P2)

A job seeker wants their route to start from home, not the first company.

**Why this priority**: Realistic routes start from where the user lives.

**Independent Test**: Can be tested by creating a route and verifying home is included as starting point.

**Acceptance Scenarios**:

1. **Given** a user creating a route, **When** they choose to start from home, **Then** home is added as the first waypoint.
2. **Given** a route starting from home, **When** directions are generated, **Then** the first leg goes from home to the first company.

---

### User Story 7 - Edit Saved Route (Priority: P2)

A job seeker wants to modify an existing route (add/remove companies, rename).

**Why this priority**: Routes evolve as users add or remove companies from their list.

**Independent Test**: Can be tested by editing a saved route and verifying changes persist.

**Acceptance Scenarios**:

1. **Given** a user with a saved route, **When** they edit it, **Then** they can add or remove companies.
2. **Given** a user editing a route, **When** they rename it, **Then** the new name is saved.
3. **Given** a user editing a route, **When** they remove a company, **Then** the route recalculates.

---

### User Story 8 - Delete Route (Priority: P3)

A job seeker wants to remove a route they no longer need.

**Why this priority**: Housekeeping feature - useful but not critical.

**Independent Test**: Can be tested by deleting a route and verifying it's removed.

**Acceptance Scenarios**:

1. **Given** a user with saved routes, **When** they delete a route, **Then** they are asked to confirm.
2. **Given** a user confirming deletion, **When** the route is deleted, **Then** it no longer appears in their list.

---

### Edge Cases

- What if a company in the route is deleted from user's list? Remove from route, notify user, recalculate.
- What if routing service is unavailable? Show cached route if available, or error with retry option.
- What if route is too long (50+ miles)? Warn user but allow saving.
- What if no bicycle-safe route exists between two points? Fall back to road route with warning.
- What if user has no companies on their list? Prompt them to add companies first.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to create named routes connecting multiple companies
- **FR-002**: System MUST calculate bicycle-specific directions between waypoints
- **FR-003**: System MUST display routes on an interactive map
- **FR-004**: System MUST show numbered stop markers for each company on the route
- **FR-005**: System MUST provide turn-by-turn directions with street names
- **FR-006**: System MUST calculate and display total route distance in miles
- **FR-007**: System MUST estimate and display total ride time
- **FR-008**: System MUST display elevation profile (gain/loss)
- **FR-009**: System MUST allow users to reorder stops in a route
- **FR-010**: System MUST optionally include home as starting point
- **FR-011**: System MUST allow editing saved routes (add/remove companies, rename)
- **FR-012**: System MUST allow deleting routes with confirmation
- **FR-013**: System MUST persist routes for offline access
- **FR-014**: System MUST recalculate route when companies are added, removed, or reordered

### Key Entities

- **Route**: A named sequence of companies to visit. Key attributes: name, user_id, created_at, updated_at.
- **RouteCompany**: Association between route and company with order. Key attributes: route_id, company_id, sequence_order.
- **RouteGeometry**: Calculated path data. Key attributes: route_id, geometry (GeoJSON), distance_meters, duration_seconds, elevation_gain, elevation_loss.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Route calculation completes within 5 seconds for up to 10 stops
- **SC-002**: Route displays on map within 2 seconds
- **SC-003**: Turn-by-turn directions are accurate and match calculated path
- **SC-004**: Distance estimates are accurate within 5% of actual
- **SC-005**: Time estimates assume 12 mph average cycling speed
- **SC-006**: Routes are available offline after initial load
- **SC-007**: Users can create a route in under 60 seconds

## Assumptions

- User has companies in their tracking list to add to routes
- User has set home location (for "start from home" option)
- Bicycle routing via OpenRouteService (free tier)
- Cleveland area has reasonable bicycle infrastructure
- GreenWay trail integration is future enhancement (post-beta)

## Dependencies

- **001-company-tracking**: Companies to include in routes
- **002-home-location**: Starting point for routes
