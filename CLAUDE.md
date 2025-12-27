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
└── design/
    └── wireframes/             # Interactive UI designs (GitHub Pages)

specs/
├── 001-company-tracking.md     # Track employers, geocoding, status
├── 002-home-location.md        # User home address for distances
├── 003-shared-registry.md      # Community employer directory
├── 004-route-planning.md       # Bicycle routes between companies
└── 005-employer-features.md    # Job postings, applicant management
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

## Key Context

- **Beta target**: End of January 2026
- **Location focus**: Cleveland, Tennessee
- **Tech stack** (for implementation repo): Next.js 15, React 19, Supabase, MapLibre GL
- **Base template**: ScriptHammer.com (messaging, auth, components included)

## Related Repositories

- **ScriptHammer.com** - Template to fork for implementation
- **SpokeToWork** - Legacy prototype (28K lines) for domain reference
- **SpokeToWork---Business-Development** - Pitch materials, funding

## Conversation Starters

Useful prompts for working on SpokeToWork:

### Architecture
- "What's the best approach for [feature] given the ScriptHammer template constraints?"
- "Help me design the database schema for [feature]"

### Mapping & Routes
- "How should I integrate OpenRouteService for bicycle routing?"
- "How do I calculate a bikeability score from route data?"
- "Integrate the Cleveland GreenWay trail system into route planning"

### Job Data
- "How should I handle companies that don't have exact street addresses?"
- "What's the best geocoding approach for Cleveland, TN addresses?"

### User Validation
- "What metrics should I track during beta testing?"
- "Draft questions for user interviews with Cleveland job seekers"
