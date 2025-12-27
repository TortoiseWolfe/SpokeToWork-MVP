# Constitution.md
# SpokeToWork - Bicycle-Based Job Hunting

## GOAL

A Progressive Web App that connects job seekers to employment opportunities within cycling distance, removing transportation as a barrier to economic stability in Cleveland, Tennessee and beyond.

## WHY

### Business Value
- **Untapped Market**: 33 million Americans (500K+ in Tennessee) lack reliable car access—ignored by Indeed, LinkedIn, ZipRecruiter
- **Employer Pain Point**: Chronic turnover from commute-related no-shows costs $4K-$15K per entry-level position
- **First-Mover Advantage**: Only platform built specifically for non-car commuters
- **Dual Revenue Streams**: Employer job postings ($50-150) + workforce board contracts ($5K-25K/year) + e-bike referrals
- **Grant Alignment**: WIOA-eligible, Ford Foundation mobility focus, community foundation priorities

### User Impact
- **Workers**: Find jobs within biking distance (2-10 miles), know exact commute before applying
- **Employers**: Access pre-qualified candidates who can reliably show up, reduce turnover
- **Community**: Economic stability through sustainable transportation, reduced car dependency
- **Ecosystem**: E-bike dealers extend worker range, workforce boards achieve placement goals

## WHAT

### Foundation (From ScriptHammer Template)

The following come pre-built from forking ScriptHammer.com:
- **Messaging**: End-to-end encrypted messaging system
- **Authentication**: Email/password + OAuth via Supabase Auth
- **Component System**: 5-file pattern, atomic design, Storybook
- **Testing**: Vitest + Playwright + Pa11y infrastructure
- **PWA**: Offline support, Service Worker, installable
- **Docker**: Development environment
- **CI/CD**: GitHub Actions pipeline

### SpokeToWork-Specific Features

**Company Tracking**
- Add/edit/delete target employers with contact info, notes, status, priority
- Geocode addresses to map locations
- Track application status per company (not_applied → applied → screening → interviewing → offer → closed)
- Filter and sort by status, priority, distance
- Offline support with automatic sync

**Community Company Registry (Multi-Tenant)**
- **Shared Companies**: Community-contributed employer directory (verified, deduplicated)
- **Private Companies**: User's personal additions not yet shared
- **Contribution Workflow**: Users can contribute private companies to shared registry
- **User Tracking**: Personal relationship to shared companies (status, priority, notes)
- This lets job seekers discover employers others have found

**Route Planning**
- Create named routes connecting multiple companies
- Calculate bicycle-specific directions via OpenRouteService
- Show distance, estimated ride time, elevation profile
- Associate companies with routes (ordered sequence)
- Visualize routes on interactive map (MapLibre GL)
- Export routes for navigation apps

**Cleveland GreenWay Integration**
- Trail system data for safe cycling routes
- Prioritize routes using trail network
- Show trail access points near employers

### User Interactions

**Job Seeker Workflow**
1. Sign up → set home location
2. Browse shared company registry OR add private companies
3. See companies plotted on map with distance from home
4. Create route connecting companies for a day's job hunting
5. Get turn-by-turn bicycle directions
6. Update company status as applications progress
7. Contribute discovered employers to shared registry
8. Message other job seekers for tips/coordination

**Employer Workflow (Beta)**
1. Claim company listing in shared registry
2. Post job openings with location + shift times
3. See which workers have the company on their list
4. Provide feedback on platform (for investor documentation)

### Data Model (SpokeToWork-Specific)

These tables extend the ScriptHammer base schema:

```
-- Shared employer registry (community-contributed)
shared_companies
├── id, name, address, lat, lng
├── verified (boolean), contributor_count
├── industry, size_category
├── claimed_by_employer_id (nullable FK)
└── created_at, updated_at

-- User's private companies (not yet shared)
private_companies
├── id, user_id, name, address, lat, lng
├── contact_name, email, phone, notes
├── contributed_to_shared_id (nullable FK)
└── created_at, updated_at

-- User's relationship to any company (shared or private)
user_company_tracking
├── id, user_id
├── shared_company_id OR private_company_id
├── status (not_applied, applied, screening, interviewing, offer, closed)
├── priority (1-5), notes
└── created_at, updated_at

-- Employer accounts (claim their company listing)
employer_profiles
├── id, user_id, shared_company_id
├── verified (boolean), contact_email
└── created_at, updated_at

-- Job postings by employers
job_postings
├── id, employer_id, shared_company_id
├── title, description, shift_times
├── lat, lng (if different from company HQ)
├── status (open, filled, closed)
└── created_at, updated_at

-- Bicycle routes
routes
├── id, user_id, name
├── geometry (GeoJSON LineString)
├── distance_meters, duration_seconds
└── created_at, updated_at

-- Route-company associations
route_companies
├── route_id, company_id, company_type (shared/private)
├── sequence_order
└── created_at
```

### Constraints and Standards

**Inherited from ScriptHammer Template**
- Static hosting (GitHub Pages) → no server-side API routes
- Docker-first development (no local pnpm/npm)
- 5-file component pattern enforced by CI
- TypeScript strict mode
- Supabase for backend (database, auth, edge functions)

**SpokeToWork-Specific Standards**
- Row-Level Security on all company/route tables
- Geocoding required for all company addresses
- Routes must use bicycle-specific routing API
- GreenWay trail data integrated where available

## SUCCESS CRITERIA

### Functional Success (Beta-Ready)
- [ ] User can sign up, set home location
- [ ] Browse shared company registry with map view
- [ ] Add private companies with geocoding
- [ ] Contribute private companies to shared registry
- [ ] Create routes connecting multiple companies
- [ ] Get bicycle directions with distance/time
- [ ] Track application status per company
- [ ] Message other users (from ScriptHammer)
- [ ] Works offline and syncs when reconnected
- [ ] Installable as PWA

### User Success
- [ ] Job seeker discovers employers they didn't know about via shared registry
- [ ] Route planning enables efficient multi-company job hunting trips
- [ ] Users contribute to shared registry (community growth)
- [ ] Application tracking helps users stay organized
- [ ] Users coordinate via messaging (interview tips, employer reviews)

### Quality Success
- [ ] Lighthouse scores ≥ 90 across all categories
- [ ] Zero critical security vulnerabilities
- [ ] All ScriptHammer tests passing
- [ ] SpokeToWork-specific features have test coverage

### Business Success (Beta Launch: End of January 2026)

**Timeline Context**: Investors (TVFCU, CO.LAB) want 12 months of revenue + beta feedback. Revenue must start by Jan 2026 to qualify for Sept 2027 applications.

**Beta Launch Targets (End of Jan 2026)**
- [ ] Deployed and usable
- [ ] Shared registry seeded with 50+ Cleveland employers
- [ ] 5+ worker beta testers actively using platform
- [ ] 3+ employer beta testers posting positions / providing feedback
- [ ] At least one revenue stream active (employer posting OR workforce contract)
- [ ] Feedback collection mechanism in place

**12-Month Runway (Jan 2026 → Jan 2027)**
- [ ] Continuous beta feedback from workers and employers
- [ ] Documented revenue (any amount, 12+ months for TVFCU)
- [ ] Iterate based on user feedback
- [ ] Ready for 3686 pitch (Aug 2026)
- [ ] Ready for TVFCU application (Sept 2027)

## ALL NEEDED CONTEXT

### Cleveland, Tennessee Context
- Population: ~48,000 (Bradley County: ~108,000)
- Less than 1% use public transit
- 16.8% poverty rate (35% above national average)
- Bus service: M-F 6am-7pm only (excludes night/weekend shifts)
- Major employers: Whirlpool, Life Care Centers, Wacker Polysilicon, Bradley County Schools, Tennova Healthcare
- GreenWay Trail System: Key asset for safe cycling routes

### Target User Profile
- Entry-level workers in retail, food service, healthcare
- Single parents needing short, predictable commutes
- Youth entering workforce without driver's licenses
- Returning citizens with license restrictions
- Anyone who can't afford car + insurance + gas

### Cycling Distance Reality
- Walking: 2 miles max practical
- Regular bike: 5 miles comfortable
- E-bike: 10+ miles practical
- Cleveland is relatively flat with trail system

### Competitive Landscape
- Indeed, LinkedIn, ZipRecruiter: Assume car ownership
- Google Maps: Has bike directions but not job-focused
- No direct competitor in workforce-transportation nexus

## IMPLEMENTATION BLUEPRINT

### Starting Point: ScriptHammer Fork

Fork ScriptHammer.com template which provides:
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS 4 + DaisyUI theming
- Supabase integration (auth, database, realtime)
- Messaging system (E2E encrypted)
- Component system with generators
- Testing infrastructure
- Docker development environment
- CI/CD pipeline

### SpokeToWork-Specific Additions

**External API Integrations**
| Service | Purpose | Notes |
|---------|---------|-------|
| OpenRouteService | Bicycle routing | Free tier, cycling-specific |
| Nominatim | Geocoding addresses | Free, no API key |
| MapLibre GL | Map visualization | Open source tiles |

**New Components to Build**
```
src/components/
├── CompanyCard/           # Display company info + status
├── CompanyForm/           # Add/edit company
├── CompanyMap/            # Map with company markers
├── RouteBuilder/          # Create/edit routes
├── RouteMap/              # Display route on map
├── SharedCompanyBrowser/  # Browse community registry
└── ContributionFlow/      # Share private → shared
```

**New Services to Build**
```
src/lib/
├── companies/             # CRUD for private + shared companies
├── routes/                # Route creation + company associations
├── geocoding/             # Nominatim wrapper
└── routing/               # OpenRouteService wrapper
```

**Database Migration (extends ScriptHammer schema)**
```
supabase/migrations/
└── 002_spoketowork_schema.sql   # Company + route tables with RLS
```

## VALIDATION LOOP

### Level 1: ScriptHammer Fork Works
- [ ] Fork created and cloned
- [ ] Docker environment starts
- [ ] All existing ScriptHammer tests pass
- [ ] Messaging system functional
- [ ] Auth flow works

### Level 2: SpokeToWork Features Work

**Worker Features**
- [ ] Add private company with geocoding
- [ ] View companies on map with distance from home
- [ ] Browse shared company registry
- [ ] Contribute private company to shared
- [ ] Create route connecting companies
- [ ] Get bicycle directions via OpenRouteService
- [ ] Track application status
- [ ] View job postings from employers
- [ ] Offline mode works

**Employer Features**
- [ ] Claim company listing
- [ ] Post job openings
- [ ] See workers tracking their company
- [ ] Provide feedback on platform

### Level 3: Quality
- [ ] Lighthouse scores ≥ 90
- [ ] No accessibility violations
- [ ] TypeScript compiles clean
- [ ] SpokeToWork features have tests

### Level 4: Beta Ready
- [ ] Shared registry seeded with Cleveland employers
- [ ] Real Cleveland job seeker completes workflow
- [ ] User discovers new employer via shared registry
- [ ] Route used on actual job hunting trip
- [ ] Demo-ready for 3686 pitch

## GOVERNANCE

### Decision Framework

**Priority Hierarchy (Non-Negotiable)**
1. **Worker utility** - Does this help job seekers find work?
2. **Community value** - Does this grow the shared employer registry?
3. **Reliability** - Does this work offline and sync correctly?
4. **Simplicity** - Does this follow ScriptHammer patterns?
5. **Accessibility** - Can everyone use this?

**Feature Addition Criteria**
1. Does this help job seekers find or reach employers?
2. Does this leverage ScriptHammer's existing capabilities?
3. Does this have clear success criteria?
4. Can this be demoed for 3686?

### What's Deferred (Post-Beta)

**Future Features**
- Route optimization (TSP solver for visit order)
- Calendar integration
- E-bike dealer integration (referral revenue stream)
- Advanced analytics
- Workforce board dashboard

### Evolution Protocol

**Adding Features via SpecKit**
1. `/speckit.specify` - Create spec
2. `/speckit.clarify` - Clarify requirements
3. `/speckit.plan` - Design implementation
4. `/speckit.tasks` - Generate task list
5. `/speckit.implement` - Build it

---

*Constitution Version: 1.0.0*
*Framework: PRP (Product Requirements Prompt)*
*Last Updated: December 2024*
*Maintainer: Jonathan E Pohlner*
*Location Focus: Cleveland, Tennessee*
*Base Template: ScriptHammer.com*
*Prototype Reference: SpokeToWork (28K lines) - for domain knowledge only*

---

## RESOURCES IN THIS REPO

This SpokeToWork-MVP repo is for **planning**, not code. It contains:

```
docs/
├── full-constitution-prp.md    # This document
├── specs/                      # Feature specifications (via SpecKit)
└── research/                   # Cleveland employers, e-bike dealers, etc.

.claude/commands/               # SpecKit slash commands
```

**Related Repositories**
- **ScriptHammer.com** - Template to fork (provides base architecture)
- **SpokeToWork** (prototype) - Reference for domain knowledge
- **SpokeToWork---Business-Development** - Pitch materials, funding strategy
