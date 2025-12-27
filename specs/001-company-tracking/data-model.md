# Data Model: Company Tracking

**Feature**: 001-company-tracking
**Date**: 2025-12-27

## Entities

### PrivateCompany

Represents an employer tracked by a single user (not yet shared to community registry).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | Yes | Primary key |
| user_id | UUID | Yes | Owner (FK to auth.users) |
| name | string | Yes | Company name |
| address | string | Yes | Full street address |
| lat | decimal | Yes | Latitude (from geocoding) |
| lng | decimal | Yes | Longitude (from geocoding) |
| contact_name | string | No | Contact person name |
| contact_email | string | No | Contact email |
| contact_phone | string | No | Contact phone |
| notes | text | No | User notes (max 2000 chars) |
| status | enum | Yes | Application status |
| priority | integer | Yes | Priority level (1-5, default 3) |
| created_at | timestamp | Yes | Creation timestamp |
| updated_at | timestamp | Yes | Last update timestamp |

**Status Enum Values**:
- `not_applied` (default)
- `applied`
- `screening`
- `interviewing`
- `offer`
- `closed`

---

### UserHomeLocation

User's home address for distance calculations.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| user_id | UUID | Yes | Primary key (FK to auth.users) |
| address | string | Yes | Full street address |
| lat | decimal | Yes | Latitude |
| lng | decimal | Yes | Longitude |
| updated_at | timestamp | Yes | Last update timestamp |

---

### OfflineChange (Client-side only)

Pending changes queued for sync. Stored in IndexedDB, not Supabase.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique change ID |
| entity_type | string | 'company' |
| entity_id | UUID | Company ID |
| action | string | 'create', 'update', 'delete' |
| payload | object | Changed data |
| timestamp | number | When change was made |

---

## Relationships

```
auth.users (from Supabase)
    │
    ├── 1:N ──► private_companies
    │           (user owns many companies)
    │
    └── 1:1 ──► user_home_locations
                (user has one home location)
```

---

## State Transitions

### Application Status Flow

```
not_applied ──► applied ──► screening ──► interviewing ──► offer
     │              │            │              │            │
     │              │            │              │            │
     └──────────────┴────────────┴──────────────┴────────────┘
                                 │
                                 ▼
                              closed
```

**Transition Rules**:
- Any status can transition to `closed`
- Forward transitions are typical but not enforced
- Users can revert to any previous status

---

## Validation Rules

### PrivateCompany

| Field | Rule |
|-------|------|
| name | Required, 1-200 characters |
| address | Required, 1-500 characters |
| lat | Required, -90 to 90 |
| lng | Required, -180 to 180 |
| contact_email | Optional, valid email format |
| contact_phone | Optional, valid phone format |
| notes | Optional, max 2000 characters |
| priority | Required, 1-5 |

### UserHomeLocation

| Field | Rule |
|-------|------|
| address | Required, 1-500 characters |
| lat | Required, -90 to 90 |
| lng | Required, -180 to 180 |

---

## Indexes

```sql
-- Fast lookup by user
CREATE INDEX idx_companies_user ON private_companies(user_id);

-- Fast filtering by status
CREATE INDEX idx_companies_status ON private_companies(user_id, status);

-- Geospatial queries (future optimization)
CREATE INDEX idx_companies_location ON private_companies(lat, lng);
```

---

## Row-Level Security

```sql
-- private_companies: Users can only access their own
ALTER TABLE private_companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own companies"
ON private_companies FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- user_home_locations: Users can only access their own
ALTER TABLE user_home_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own home location"
ON user_home_locations FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
```

---

## Migration Script Preview

```sql
-- 002_company_tracking.sql

-- Application status enum
CREATE TYPE application_status AS ENUM (
  'not_applied', 'applied', 'screening',
  'interviewing', 'offer', 'closed'
);

-- Private companies table
CREATE TABLE private_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  address VARCHAR(500) NOT NULL,
  lat DECIMAL(10, 7) NOT NULL,
  lng DECIMAL(10, 7) NOT NULL,
  contact_name VARCHAR(200),
  contact_email VARCHAR(254),
  contact_phone VARCHAR(20),
  notes TEXT CHECK (char_length(notes) <= 2000),
  status application_status NOT NULL DEFAULT 'not_applied',
  priority SMALLINT NOT NULL DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User home locations table
CREATE TABLE user_home_locations (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  address VARCHAR(500) NOT NULL,
  lat DECIMAL(10, 7) NOT NULL,
  lng DECIMAL(10, 7) NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_companies_user ON private_companies(user_id);
CREATE INDEX idx_companies_status ON private_companies(user_id, status);

-- RLS
ALTER TABLE private_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_home_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own companies" ON private_companies
FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users manage own home" ON user_home_locations
FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER companies_updated_at
BEFORE UPDATE ON private_companies
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER home_location_updated_at
BEFORE UPDATE ON user_home_locations
FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```
