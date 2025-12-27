# SpokeToWork - Senior UX Review & Recommendations

## Executive Summary

Your prototype demonstrates solid foundational thinking. The overlay pattern for detail views is smart—it preserves context while allowing deep dives. However, the biggest missed opportunity is **not showing the map alongside the list**. For a cycling-focused app, spatial context should be ever-present, not hidden behind a navigation click.

---

## Current Layout Analysis

```
┌──────────────────────────────────────────────────────────────────┐
│  Header (Logo, Nav, Actions)                                     │
├─────────────┬────────────────────────────────────────────────────┤
│             │                                                    │
│   Routes    │   Companies List                                   │
│   Sidebar   │   (Full Width)                                     │
│             │                                                    │
│   220px     │   ~1200px (wastes space on large screens)          │
│             │                                                    │
│             │   ⚠️ Map is on separate page                       │
│             │                                                    │
└─────────────┴────────────────────────────────────────────────────┘
```

**Problems:**
1. List stretches too wide on large screens (reading lines become too long)
2. No spatial reference—users can't see WHERE companies are
3. Route planning feels disconnected from the map
4. "Distance" column exists but lacks visual context

---

## Recommended Layout: List + Map Split View

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Header                                                          56px   │
├────────────┬─────────────────────────────────┬───────────────────────────┤
│            │                                 │                           │
│  Routes    │  Company List                   │  Map Preview              │
│  Sidebar   │  (Scrollable)                   │  (Interactive)            │
│            │                                 │                           │
│  220px     │  ~500-600px                     │  380px (resizable)        │
│            │  • Tighter, scannable           │  • Shows route            │
│  • Route   │  • Distance column with color   │  • Markers for companies  │
│    cards   │  • Click → opens detail panel   │  • Home location          │
│  • Active  │                                 │  • Quick stats            │
│    route   │                                 │  • "Full Map" button      │
│    badge   │                                 │                           │
│            │                                 │                           │
└────────────┴─────────────────────────────────┴───────────────────────────┘
                                               ↑
                                    Selection highlights on map
```

### Key Changes:

1. **Three-column layout** on desktop (collapses intelligently on tablet/mobile)
2. **Map preview always visible** - clicking a company highlights its marker
3. **Distance column color-coded** - green (<3mi), yellow (3-6mi), red (>6mi)
4. **Route stats visible** - total distance, stops, estimated time
5. **"Full Map" button** for dedicated mapping experience

---

## Overlay Hierarchy (What You're Doing Right)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Base View                                                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │   Company List + Map Preview                              │  │
│  │   (Always visible, maintains context)                     │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────┐ Level 1: SlidePanel (Right)              │
│  │                   │ • Company Details                        │
│  │   Detail View     │ • Route Editor                           │
│  │   (420px)         │ • Pushes map, doesn't cover it           │
│  │                   │                                          │
│  └───────────────────┘                                          │
│                                                                 │
│       ┌─────────────────────┐ Level 2: Modal (Centered)         │
│       │                     │ • Edit Company Form                │
│       │   Edit Form         │ • Edit Application Form            │
│       │   (560px)           │ • Dims background                  │
│       │                     │ • Focused task                     │
│       └─────────────────────┘                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Overlay Rules:
- **SlidePanel**: For viewing/browsing details (non-destructive, easy dismiss)
- **Modal**: For editing/creating (focused task, requires explicit save/cancel)
- **Never stack** more than 2 overlay levels

---

## Component Interaction Flow

```
                    ┌─────────────┐
                    │   Routes    │
                    │   Sidebar   │
                    └──────┬──────┘
                           │
              Click Route  │
                           ▼
                    ┌─────────────┐
                    │  Set Active │
                    │    Route    │
                    └──────┬──────┘
                           │
          Filters companies│to this route
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   Company List (filtered)              Map (updates)         │
│   ┌─────────────────────┐             ┌────────────────────┐ │
│   │ Company A     2.3mi │  ─────────▶ │ 🏠                 │ │
│   │ Company B     1.8mi │             │    📍A 📍B         │ │
│   │ Company C     3.1mi │             │        📍C         │ │
│   └─────────────────────┘             │  ───route line───  │ │
│            │                          └────────────────────┘ │
│            │ Click                                           │
│            ▼                                                 │
│   ┌─────────────────────┐                                    │
│   │  SlidePanel Opens   │◀──── Map marker highlights         │
│   │  Company Details    │                                    │
│   └─────────────────────┘                                    │
│            │                                                 │
│            │ Click "Edit"                                    │
│            ▼                                                 │
│   ┌─────────────────────┐                                    │
│   │  Modal Opens        │                                    │
│   │  Edit Company Form  │                                    │
│   └─────────────────────┘                                    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Mobile Layout Considerations

```
Mobile (< 768px)                    Tablet (768-1024px)
┌──────────────────────┐           ┌─────────────────────────────┐
│  Header              │           │  Header                     │
├──────────────────────┤           ├───────────┬─────────────────┤
│                      │           │           │                 │
│  Company List        │           │ Companies │  Map            │
│  (Full width)        │           │ (2/3)     │  (1/3)          │
│                      │           │           │                 │
├──────────────────────┤           │           │                 │
│  Fixed Bottom Bar    │           └───────────┴─────────────────┘
│  [List] [Map] [Route]│           Routes = collapsible drawer
└──────────────────────┘

Tap company → Full screen detail
Tap Map → Full screen map
Swipe → Switch views
```

---

## Specific Component Recommendations

### 1. CompanyListItem (Critical Redesign)

**Current:**
```
┌────────────────────────────────────────────────────────────────┐
│ Company Name          Contact Name          Status    Priority │
│ Full address          Title                                    │
│                       Phone                                    │
└────────────────────────────────────────────────────────────────┘
```

**Recommended:**
```
┌────────────────────────────────────────────────────────────────┐
│ ○ A Plus Pallet Co.                           2.3 mi   [5]    │
│   3379 Old Tasso Rd NE · Buffy Richardson               ●●●●○ │
│   No applications                                        ⋮     │
└────────────────────────────────────────────────────────────────┘
  │                                               │        │
  Route indicator                          Priority    Actions
  (filled if on active route)              (visual)    menu
```

**Changes:**
- Route membership shown visually (dot or checkmark)
- Distance prominent and color-coded
- Priority shown as dots instead of number (more scannable)
- Actions consolidated into overflow menu
- Single line for address + contact (less vertical space)

### 2. MapPreview (New Component)

```
┌───────────────────────────────────────────┐
│  Route Preview              [−] [⊞] [→]  │ ← Collapse / Expand / Full Map
├───────────────────────────────────────────┤
│                                           │
│     🏠 ────── 📍A                         │
│              ╲                            │
│               📍B ────── 📍C              │
│                                           │
│                    📍D (selected)         │
│                     ↓                     │
│              ┌───────────┐                │
│              │ DENSO Mfg │                │
│              │ 8.2 mi    │                │
│              └───────────┘                │
│                                           │
├───────────────────────────────────────────┤
│  34.8 mi    │    5 stops    │   ~2.5 hr  │
├───────────────────────────────────────────┤
│  [↻ Optimize]           [📍 Directions]  │
└───────────────────────────────────────────┘
```

### 3. FilterBar (Simplification)

**Current:** Too many inline filters creating visual noise

**Recommended:**
```
┌─────────────────────────────────────────────────────────────┐
│  [🔍 Search companies...]  [Status ▼]  [Filters ▼]  [83]   │
│                                                             │
│  Active filters: [Priority ×] [< 10 mi ×]     [Clear all]   │
└─────────────────────────────────────────────────────────────┘
```

- Collapse most filters into a dropdown
- Show applied filters as removable chips
- Keep search always visible
- Show result count inline

### 4. StatusBadge (Visual Hierarchy)

```
Application Flow:
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ○ Researching  →  ○ Ready  →  ● Applied  →  ○ Interview  │
│                                      │                     │
│                                      ▼                     │
│                              ┌───────────────┐             │
│                              │ ✓ Offered     │             │
│                              │ ✗ Rejected    │             │
│                              │ − Withdrawn   │             │
│                              └───────────────┘             │
│                                                            │
└────────────────────────────────────────────────────────────┘

Color Coding:
• Gray   = Not started (researching, ready)
• Blue   = In progress (applied, interviewing)
• Green  = Positive (offered, accepted)
• Red    = Negative (rejected)
• Yellow = User action (withdrawn)
```

---

## Information Architecture Improvements

### Current Navigation:
```
Home → Companies → Map (separate)
            ↓
       Company Detail (overlay)
            ↓
       Application Form (overlay)
```

### Recommended Navigation:
```
Dashboard (Home)
    │
    ├── Companies (List + Map split)
    │       ├── Company Detail (slide panel)
    │       │       └── Edit Company (modal)
    │       └── Application Form (modal)
    │
    ├── Routes
    │       ├── Route Detail (slide panel)
    │       │       └── Edit Route (modal)
    │       └── Optimize Route (in-panel)
    │
    └── Full Map
            └── Company Quick View (popup)
```

---

## Accessibility Considerations

1. **Keyboard Navigation**
   - Tab through list items
   - Enter to select/open detail
   - Escape to close overlays
   - Arrow keys to navigate within route list

2. **Screen Reader Support**
   - Announce route distance and company count
   - Describe map markers (not just visual)
   - Live regions for filter result counts

3. **Color Independence**
   - Distance indicators need icon backup (🟢🟡🔴 or ✓⚠✗)
   - Status badges need text labels, not just color
   - Priority should show number AND visual

4. **Reduced Motion**
   - Slide panels can appear instantly
   - Map markers don't need bounce animation
   - Respect `prefers-reduced-motion`

---

## Next Steps

1. **Immediate:** Add map preview to companies page (biggest impact)
2. **Short-term:** Refactor CompanyListItem for better density
3. **Medium-term:** Build Storybook component library
4. **Long-term:** Implement responsive layouts for tablet/mobile

---

## Storybook Development Order

Build in this sequence for maximum reuse:

```
Week 1: Atoms
├── Button variants
├── Input types
├── Badge/StatusDot
└── Typography scale

Week 2: Molecules  
├── FormField
├── CompanyListItem
├── RouteListItem
└── FilterChip

Week 3: Organisms
├── FilterBar
├── MapPreview
├── SlidePanel
└── Modal

Week 4: Templates
├── MainLayout
├── ListMapLayout
└── MobileLayout
```

---

## Questions to Answer Before Building

1. What's the minimum viable map? Static image? Interactive but no routing?
2. How does the app behave with 500+ companies? Pagination or virtual scroll?
3. Should saved routes persist across sessions? (Local storage vs account)
4. What happens when a company is added to multiple routes?
5. Mobile-first or desktop-first development approach?

---

*Review conducted: December 2025*
*Reviewer perspective: Senior UX Engineer with focus on information density and spatial interfaces*
