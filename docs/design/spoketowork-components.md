# SpokeToWork - Atomic Component Library

## Component Hierarchy

```
src/
├── components/
│   ├── atoms/           # Smallest building blocks
│   ├── molecules/       # Combinations of atoms
│   ├── organisms/       # Complex UI sections
│   ├── templates/       # Page layouts
│   └── pages/           # Full page compositions
```

---

## 1. ATOMS (Foundational Elements)

### Typography
| Component | Props | Usage |
|-----------|-------|-------|
| `Heading` | level (1-6), children, className | Page titles, section headers |
| `Text` | size (sm/md/lg), weight, color, children | Body text, labels |
| `Label` | htmlFor, required, children | Form field labels |

### Buttons
| Component | Props | Usage |
|-----------|-------|-------|
| `Button` | variant (primary/secondary/ghost/danger), size, icon, disabled, onClick | All clickable actions |
| `IconButton` | icon, ariaLabel, size, variant | Toolbar actions, close buttons |
| `LinkButton` | href, external, children | Navigation, external links |

### Form Inputs
| Component | Props | Usage |
|-----------|-------|-------|
| `TextInput` | label, placeholder, value, onChange, error, required | Text fields |
| `Select` | label, options, value, onChange, placeholder | Dropdowns |
| `Checkbox` | label, checked, onChange, indeterminate | Toggle options |
| `RadioGroup` | name, options, value, onChange | Single selection |
| `DatePicker` | label, value, onChange, minDate, maxDate | Date selection |
| `TextArea` | label, value, onChange, rows, maxLength | Multi-line input |
| `SearchInput` | placeholder, value, onChange, onClear | Search fields |

### Visual Elements
| Component | Props | Usage |
|-----------|-------|-------|
| `Badge` | variant (status/priority/count), children | Status indicators |
| `StatusDot` | status (active/inactive/planning/applied/rejected) | Quick status visual |
| `Avatar` | src, name, size | User/company avatars |
| `Icon` | name, size, color | All iconography |
| `Divider` | orientation, spacing | Visual separation |
| `Tooltip` | content, position, children | Contextual help |

### Map Elements
| Component | Props | Usage |
|-----------|-------|-------|
| `MapMarker` | type (home/company/selected), label | Location pins |
| `MapPopup` | children, position | Marker information |
| `RoutePolyline` | coordinates, color, dashed | Route visualization |

---

## 2. MOLECULES (Composed Components)

### Navigation
| Component | Props | Usage |
|-----------|-------|-------|
| `NavLink` | href, icon, label, active | Navigation items |
| `NavGroup` | title, children, collapsible | Grouped nav items |
| `Breadcrumb` | items | Location context |

### Cards & List Items
| Component | Props | Usage |
|-----------|-------|-------|
| `CompanyListItem` | company, isSelected, onSelect, onEdit | Company row in list |
| `RouteListItem` | route, isActive, onSelect, onEdit, onDelete | Route in sidebar |
| `ApplicationListItem` | application, onEdit, onDelete | Application in panel |

### Form Groups
| Component | Props | Usage |
|-----------|-------|-------|
| `FormField` | label, error, required, children | Wrapper for inputs |
| `AddressInput` | value, onChange, onGeocode | Address with geocoding |
| `ContactFields` | contact, onChange | Name, title, phone, email group |
| `UrlField` | label, value, onChange, validateUrl | URL input with validation |

### Data Display
| Component | Props | Usage |
|-----------|-------|-------|
| `StatCard` | label, value, icon, trend | Metrics display |
| `PropertyRow` | label, value, copyable | Key-value display |
| `PriorityIndicator` | level (1-5), showLabel | Priority visualization |
| `StatusBadgeGroup` | statuses | Multiple status badges |

### Interactive
| Component | Props | Usage |
|-----------|-------|-------|
| `FilterChip` | label, active, onToggle, onRemove | Active filter display |
| `SortableItem` | id, children, onDragEnd | Draggable list item |
| `ActionMenu` | items, trigger | Dropdown actions |
| `ConfirmDialog` | title, message, onConfirm, onCancel | Destructive confirmations |

---

## 3. ORGANISMS (Complex Sections)

### Layout
| Component | Props | Usage |
|-----------|-------|-------|
| `AppHeader` | user, onMenuClick | Top navigation bar |
| `Sidebar` | collapsed, onToggle, children | Left navigation panel |
| `SlidePanel` | open, onClose, title, width, children | Right detail panels |
| `Modal` | open, onClose, title, size, children | Centered overlays |
| `PageHeader` | title, subtitle, actions, breadcrumbs | Page title section |

### Lists & Tables
| Component | Props | Usage |
|-----------|-------|-------|
| `CompanyList` | companies, selectedId, filters, onSelect | Main company listing |
| `RoutePanel` | routes, activeRouteId, onSelect, onCreate | Route management |
| `ApplicationList` | applications, onAdd, onEdit | Applications section |

### Forms
| Component | Props | Usage |
|-----------|-------|-------|
| `CompanyForm` | company, onSave, onCancel | Full company editor |
| `ApplicationForm` | application, company, onSave, onCancel | Application editor |
| `RouteForm` | route, companies, onSave, onOptimize | Route editor |

### Maps
| Component | Props | Usage |
|-----------|-------|-------|
| `MapPreview` | center, markers, routes, height, interactive | Embedded map view |
| `FullScreenMap` | companies, routes, homeLocation, filters | Dedicated map page |
| `LocationPicker` | value, onChange, address | Map-based location selection |

### Filters & Search
| Component | Props | Usage |
|-----------|-------|-------|
| `FilterBar` | filters, onFilterChange, onSearch | Main filter controls |
| `ActiveFilters` | filters, onRemove, onClear | Applied filter display |
| `ExportMenu` | formats, onExport, count | Export options |

---

## 4. TEMPLATES (Page Layouts)

### `MainLayout`
```
┌─────────────────────────────────────────────────────────┐
│ AppHeader                                               │
├────────────┬────────────────────────────────────────────┤
│            │                                            │
│  Sidebar   │  Main Content Area                         │
│  (Routes)  │                                            │
│            │                                            │
│            │                                            │
└────────────┴────────────────────────────────────────────┘
```

### `SplitViewLayout`
```
┌─────────────────────────────────────────────────────────┐
│ AppHeader                                               │
├────────────┬──────────────────────────┬─────────────────┤
│            │                          │                 │
│  Sidebar   │  Primary Content         │  Detail Panel   │
│            │  (List or Map)           │  (SlidePanel)   │
│            │                          │                 │
└────────────┴──────────────────────────┴─────────────────┘
```

### `ListMapLayout` (RECOMMENDED NEW LAYOUT)
```
┌─────────────────────────────────────────────────────────┐
│ AppHeader                                               │
├────────────┬────────────────────┬───────────────────────┤
│            │                    │                       │
│  Sidebar   │  Company List      │  Map Preview          │
│  (Routes)  │  (scrollable)      │  (resizable)          │
│            │                    │                       │
│            │                    │                       │
└────────────┴────────────────────┴───────────────────────┘
```

---

## 5. STORYBOOK ORGANIZATION

```
stories/
├── Introduction.mdx
├── Foundations/
│   ├── Colors.stories.tsx
│   ├── Typography.stories.tsx
│   ├── Spacing.stories.tsx
│   └── Icons.stories.tsx
├── Atoms/
│   ├── Button.stories.tsx
│   ├── Input.stories.tsx
│   ├── Badge.stories.tsx
│   ├── StatusDot.stories.tsx
│   └── ...
├── Molecules/
│   ├── CompanyListItem.stories.tsx
│   ├── RouteListItem.stories.tsx
│   ├── FilterChip.stories.tsx
│   └── ...
├── Organisms/
│   ├── CompanyList.stories.tsx
│   ├── RoutePanel.stories.tsx
│   ├── MapPreview.stories.tsx
│   ├── SlidePanel.stories.tsx
│   └── ...
└── Pages/
    ├── CompaniesPage.stories.tsx
    ├── MapPage.stories.tsx
    └── ...
```

---

## Component State Specifications

### Company States
- `active` - Currently in business, accepting applications
- `inactive` - Closed or not hiring
- `archived` - User removed from active list

### Application States
- `researching` - Gathering information
- `ready` - Prepared to apply
- `applied` - Application submitted
- `interviewing` - In interview process
- `offered` - Received offer
- `accepted` - Accepted position
- `rejected` - Application rejected
- `withdrawn` - User withdrew application

### Route States
- `planning` - Building route, not finalized
- `active` - Currently being used
- `completed` - All stops visited
- `archived` - No longer needed

---

## Interaction Patterns

### Panel Behavior
1. **SlidePanel** - Opens from right, pushes content or overlays
2. **Modal** - Centered, dims background, for focused tasks
3. **Drawer** - Full-height, for navigation or filters on mobile

### Selection States
- Single click: Select item, show preview
- Double click: Open edit form
- Right click: Context menu with actions

### Drag & Drop
- Route reordering: Drag handle on left
- Visual feedback: Ghost element, drop zone highlight
- Accessibility: Keyboard reorder with arrow keys

