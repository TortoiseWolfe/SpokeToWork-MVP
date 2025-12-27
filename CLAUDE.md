# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a **specifications repository** for SpokeToWork, a bicycle-based job hunting app for Cleveland, Tennessee. It contains planning artifacts, not implementation code.

**Implementation happens in a separate ScriptHammer.com fork.**

## Repository Structure

```
docs/
├── full-constitution-prp.md    # Product vision, scope, success criteria
├── research/                   # Cleveland employers, e-bike dealers
└── design/                     # UX review, component library, wireframes

specs/
├── 001-company-tracking/       # Track employers, geocoding, status
├── 002-home-location/          # User home address for distances
├── 003-shared-registry/        # Community employer directory
└── 004-route-planning/         # Bicycle routes between companies
```

## SpecKit Workflow

This repo uses SpecKit for structured feature planning:

```bash
# Install/update SpecKit (Docker required)
./specify

# Feature workflow
/speckit.specify    # Create feature specification
/speckit.clarify    # Clarify requirements
/speckit.plan       # Design implementation approach
/speckit.tasks      # Generate task list
```

Each spec directory contains:
- `spec.md` - Feature specification (user stories, requirements)
- `plan.md` - Technical plan (if created)
- `checklists/requirements.md` - Quality validation

## Key Context

- **Beta target**: End of January 2026
- **Location focus**: Cleveland, Tennessee
- **Tech stack** (for implementation repo): Next.js 15, React 19, Supabase, MapLibre GL
- **Base template**: ScriptHammer.com (messaging, auth, components included)

## Related Repositories

- **ScriptHammer.com** - Template to fork for implementation
- **SpokeToWork** - Legacy prototype (28K lines) for domain reference
- **SpokeToWork---Business-Development** - Pitch materials, funding
