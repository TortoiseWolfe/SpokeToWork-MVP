# Quickstart: Company Tracking Feature

**Feature**: 001-company-tracking
**Prerequisites**: ScriptHammer fork cloned, Docker installed

## Setup

### 1. Start Development Environment

```bash
# From ScriptHammer fork root
docker compose up -d
```

This starts:
- Next.js dev server (http://localhost:3000)
- Supabase local instance (http://localhost:54323)

### 2. Run Database Migration

```bash
# Apply company tracking schema
docker compose exec supabase supabase db push
```

Or manually in Supabase Studio:
1. Open http://localhost:54323
2. Go to SQL Editor
3. Run contents of `supabase/migrations/002_company_tracking.sql`

### 3. Verify Setup

```bash
# Run tests
docker compose exec app pnpm test

# Check Supabase tables exist
docker compose exec supabase psql -c "\dt private_companies"
```

## Development Workflow

### Component Development

1. **Generate component scaffold**:
   ```bash
   docker compose exec app pnpm generate:component CompanyCard
   ```

2. **Develop in Storybook**:
   ```bash
   docker compose exec app pnpm storybook
   ```
   Open http://localhost:6006

3. **Write tests first** (TDD):
   ```bash
   docker compose exec app pnpm test:watch src/components/CompanyCard
   ```

### Feature Flags

During development, use feature flags:

```typescript
// src/lib/features.ts
export const FEATURES = {
  COMPANY_TRACKING: process.env.NEXT_PUBLIC_FF_COMPANY_TRACKING === 'true',
};
```

### Key Files to Create

```
src/
├── components/
│   ├── CompanyCard/
│   ├── CompanyForm/
│   ├── CompanyList/
│   ├── CompanyMap/
│   └── StatusBadge/
├── lib/
│   ├── companies/
│   │   ├── actions.ts      # Supabase CRUD
│   │   ├── hooks.ts        # useCompanies, useCompany
│   │   └── types.ts        # Company, ApplicationStatus
│   ├── geocoding/
│   │   └── nominatim.ts    # geocodeAddress()
│   └── offline/
│       ├── cache.ts        # IndexedDB operations
│       └── sync.ts         # Sync queue management
└── app/
    └── companies/
        └── page.tsx
```

## Testing

### Unit Tests

```bash
# Run all unit tests
docker compose exec app pnpm test

# Run specific test file
docker compose exec app pnpm test src/lib/companies/actions.test.ts

# Watch mode
docker compose exec app pnpm test:watch
```

### E2E Tests

```bash
# Run Playwright tests
docker compose exec app pnpm test:e2e

# Run specific test
docker compose exec app pnpm test:e2e tests/e2e/company-workflow.spec.ts
```

### Accessibility Tests

```bash
# Run Pa11y
docker compose exec app pnpm test:a11y
```

## API Reference

### Supabase Client Usage

```typescript
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

// List companies
const { data, error } = await supabase
  .from('private_companies')
  .select('*')
  .order('created_at', { ascending: false });

// Create company
const { data, error } = await supabase
  .from('private_companies')
  .insert({ name, address, lat, lng })
  .select()
  .single();

// Update company
const { data, error } = await supabase
  .from('private_companies')
  .update({ status: 'applied' })
  .eq('id', companyId)
  .select()
  .single();

// Delete company
const { error } = await supabase
  .from('private_companies')
  .delete()
  .eq('id', companyId);
```

### Geocoding Usage

```typescript
import { geocodeAddress } from '@/lib/geocoding/nominatim';

const result = await geocodeAddress('3570 Keith Street NW, Cleveland, TN');
// { lat: 35.1897, lng: -84.8774, display_name: '...' }
```

### Distance Calculation

```typescript
import { calculateDistance } from '@/lib/geocoding/distance';

const miles = calculateDistance(
  homeLocation.lat, homeLocation.lng,
  company.lat, company.lng
);
```

## Common Tasks

### Add a New Company (Manual Test)

1. Navigate to http://localhost:3000/companies
2. Click "Add Company"
3. Enter: "Life Care Centers of America", "3570 Keith Street NW, Cleveland, TN 37320"
4. Verify geocoding completes
5. Verify company appears on map

### Test Offline Mode

1. Load companies page
2. Open DevTools → Network → Offline
3. Verify companies still visible
4. Update a company status
5. Go back online
6. Verify sync completes

## Troubleshooting

### Geocoding Fails

- Check Nominatim rate limit (1 req/sec)
- Verify address format (include city, state)
- Try alternative address spelling

### Map Not Loading

- Check OpenFreeMap tile server status
- Verify MapLibre GL styles loaded
- Check browser console for CORS errors

### Offline Sync Issues

- Clear IndexedDB: DevTools → Application → IndexedDB → Delete
- Check Service Worker registration
- Verify Supabase connection
