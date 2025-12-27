# Research: Company Tracking

**Feature**: 001-company-tracking
**Date**: 2025-12-27

## Technology Decisions

### 1. Geocoding Service

**Decision**: Nominatim (OpenStreetMap)

**Rationale**:
- Free with no API key required
- Uses OpenStreetMap data (good US coverage)
- Cleveland, TN addresses well-represented
- Client-side calls allowed (CORS-enabled public instances)
- Aligns with constitution constraint: no server-side API routes

**Alternatives Considered**:
| Service | Why Rejected |
|---------|--------------|
| Google Maps Geocoding | Requires API key, billing setup, server-side recommended |
| Mapbox Geocoding | Requires API key, free tier limited |
| HERE Geocoding | Requires API key, more enterprise-focused |

**Usage Pattern**:
```
GET https://nominatim.openstreetmap.org/search
?q={address}
&format=json
&limit=1
&countrycodes=us
```

**Rate Limit**: 1 request/second (implement debounce on address input)

---

### 2. Map Visualization

**Decision**: MapLibre GL JS + OpenFreeMap tiles

**Rationale**:
- Open source (fork of Mapbox GL before license change)
- Free vector tiles from OpenFreeMap
- High performance (WebGL-based)
- Good React integration via react-map-gl
- Marker clustering built-in
- No API key required

**Alternatives Considered**:
| Library | Why Rejected |
|---------|--------------|
| Mapbox GL | Requires API key, usage-based pricing |
| Leaflet | Raster tiles, less performant for many markers |
| Google Maps | Requires API key, billing, heavier SDK |

**Tile Source**: `https://tiles.openfreemap.org/styles/liberty/{z}/{x}/{y}.png`

---

### 3. Offline Storage

**Decision**: IndexedDB via idb-keyval

**Rationale**:
- Simple key-value API (sufficient for company cache)
- Large storage capacity (browser-dependent, typically 50MB+)
- Works with Service Worker for offline access
- Lightweight library (2KB gzipped)

**Alternatives Considered**:
| Storage | Why Rejected |
|---------|--------------|
| localStorage | 5MB limit, synchronous (blocks UI) |
| PouchDB | Overkill for simple cache, adds 45KB |
| Dexie.js | More complex API than needed |

**Cache Strategy**:
- Cache companies on first load
- Update cache on every sync
- Serve from cache when offline
- Clear cache on logout

---

### 4. Offline Sync Strategy

**Decision**: Last-write-wins with user notification

**Rationale**:
- Simple to implement and understand
- Conflicts are rare (single user editing own data)
- User notified of any overwrites
- Aligns with PWA best practices

**Sync Flow**:
1. User makes change offline → stored in pending queue
2. Connection restored → sync pending changes
3. If server data newer → notify user, apply server version
4. Clear pending queue on success

**Conflict Detection**:
- Compare `updated_at` timestamps
- Server wins if server timestamp > local timestamp
- Show toast notification on conflict resolution

---

### 5. Distance Calculation

**Decision**: Haversine formula (client-side)

**Rationale**:
- Accurate for short distances (under 50 miles)
- No external API needed
- Instant calculation
- Cleveland area is relatively flat (elevation not critical)

**Formula** (miles):
```typescript
function haversine(lat1, lon1, lat2, lon2): number {
  const R = 3959; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
```

---

## Integration Notes

### Supabase RLS Policies

Companies table requires Row-Level Security:
- Users can only read/write their own companies
- `user_id` must match `auth.uid()`

```sql
CREATE POLICY "Users can manage own companies"
ON private_companies
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
```

### Three-Column Layout

Per UX Review (docs/design/SpokeToWork-UX-Review.md):
- Routes sidebar (future feature)
- Company list (scrollable)
- Map preview (always visible)

For this feature, implement:
- Company list (left/center)
- Map (right, always visible)
- Slide panel for company details
- Modal for add/edit forms

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Nominatim rate limiting | Debounce input, cache geocoded addresses |
| Offline data conflicts | Last-write-wins with notification |
| Map tile loading slow | Show skeleton, lazy load markers |
| Large company lists | Virtual scrolling if >50 companies |
