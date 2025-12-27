# Implementation Plan: Company Tracking

**Branch**: `001-company-tracking` | **Date**: 2025-12-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-company-tracking/spec.md`

## Summary

Enable job seekers to add, edit, delete, and track employers with geocoded addresses and application status. Companies display on an interactive map with distance from home. Supports offline access with automatic sync.

**Technical Approach**: Build on ScriptHammer template (Next.js 15, React 19, Supabase) using the existing 5-file component pattern. Add company CRUD operations with Nominatim geocoding and MapLibre GL visualization. Implement offline support via Service Worker caching.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Framework**: Next.js 15 + React 19
**Primary Dependencies**:
- Supabase (auth, database, realtime)
- MapLibre GL (map visualization)
- Nominatim API (geocoding)
- DaisyUI + Tailwind CSS 4 (styling)
**Storage**: Supabase PostgreSQL + IndexedDB (offline cache)
**Testing**: Vitest (unit) + Playwright (e2e) + Pa11y (accessibility)
**Target Platform**: PWA (mobile-first, installable)
**Project Type**: Web application (Next.js static export to GitHub Pages)
**Performance Goals**:
- Map renders in <2 seconds with 100 companies
- Geocoding completes in <3 seconds
- Offline data available immediately
**Constraints**:
- Static hosting (no server-side API routes)
- Offline-capable (Service Worker)
- Mobile-first responsive design
**Scale/Scope**:
- Beta: 5-10 users, 50-100 companies each
- Target: 1000 users, Cleveland TN metro area

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| **Worker Utility** | PASS | Core feature for job seekers to track employers |
| **Community Value** | PASS | Foundation for future shared registry |
| **Reliability** | PASS | Offline support with sync included |
| **Simplicity** | PASS | Follows ScriptHammer 5-file component pattern |
| **Accessibility** | PASS | Pa11y testing required, mobile-first |
| **Static Hosting** | PASS | All operations via Supabase, no server routes |
| **Docker-first Dev** | PASS | Inherits from ScriptHammer |
| **Row-Level Security** | PASS | RLS required on all company tables |

**Pre-Design Gate**: PASSED

## Project Structure

### Documentation (this feature)

```text
specs/001-company-tracking/
├── plan.md              # This file
├── research.md          # Phase 0: Technology decisions
├── data-model.md        # Phase 1: Entity definitions
├── quickstart.md        # Phase 1: Developer setup guide
├── contracts/           # Phase 1: API contracts
│   └── companies.yaml   # OpenAPI spec for company endpoints
└── tasks.md             # Phase 2: Implementation tasks
```

### Source Code (ScriptHammer fork)

```text
src/
├── components/
│   ├── CompanyCard/           # Display company info
│   │   ├── CompanyCard.tsx
│   │   ├── CompanyCard.stories.tsx
│   │   ├── CompanyCard.test.tsx
│   │   ├── CompanyCard.types.ts
│   │   └── index.ts
│   ├── CompanyForm/           # Add/edit company
│   ├── CompanyList/           # Filterable company list
│   ├── CompanyMap/            # MapLibre GL map with markers
│   └── StatusBadge/           # Application status indicator
├── lib/
│   ├── companies/             # Company CRUD operations
│   │   ├── actions.ts         # Supabase operations
│   │   ├── types.ts           # Company types
│   │   └── hooks.ts           # React hooks
│   ├── geocoding/             # Nominatim wrapper
│   │   ├── nominatim.ts
│   │   └── types.ts
│   └── offline/               # Offline sync utilities
│       ├── cache.ts
│       └── sync.ts
├── app/
│   └── companies/
│       └── page.tsx           # Companies page

supabase/
└── migrations/
    └── 002_company_tracking.sql   # Company tables with RLS

tests/
├── unit/
│   └── companies/
├── integration/
│   └── companies/
└── e2e/
    └── company-workflow.spec.ts
```

**Structure Decision**: Web application following ScriptHammer patterns. Components follow 5-file pattern (component, stories, test, types, index). Services in lib/ directory. Supabase migrations extend base schema.

## Complexity Tracking

No constitution violations. Design follows established ScriptHammer patterns.

---

## Phase 0: Research Summary

See [research.md](./research.md) for full details.

**Key Decisions**:
1. **Geocoding**: Nominatim (free, no API key, OSM data)
2. **Mapping**: MapLibre GL (open source, free tiles from OpenFreeMap)
3. **Offline Storage**: IndexedDB via idb-keyval (simple key-value for company cache)
4. **Sync Strategy**: Last-write-wins with conflict notification

## Phase 1: Design Artifacts

- [data-model.md](./data-model.md) - Entity definitions and relationships
- [contracts/companies.yaml](./contracts/companies.yaml) - API contract
- [quickstart.md](./quickstart.md) - Developer setup guide
