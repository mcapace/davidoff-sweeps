# Fix PGRST205 Error - Create Missing Tables

The error `PGRST205` means the tables don't exist in Supabase. You need to create them.

## Step 1: Go to Supabase SQL Editor

1. Go to: https://supabase.com/dashboard
2. Select project: **davidoff-sweeps** (or project ID: `mkwheoemyraxihpcvptn`)
3. Click **SQL Editor** in the left sidebar
4. Click **New query**

## Step 2: Create `email_verifications` Table

**Copy and paste this SQL:**

```sql
-- Create email_verifications table
CREATE TABLE IF NOT EXISTS email_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    used BOOLEAN DEFAULT false,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_verifications_token ON email_verifications(token);
CREATE INDEX IF NOT EXISTS idx_email_verifications_email ON email_verifications(email);
```

**Then:**
1. Click **Run** (or press Cmd/Ctrl + Enter)
2. ✅ Should see "Success. No rows returned"

## Step 3: Create `sweepstakes_entries` Table

**Copy and paste this SQL:**

```sql
-- Create sweepstakes_entries table
CREATE TABLE IF NOT EXISTS sweepstakes_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    state TEXT NOT NULL,
    verification_token TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_sweepstakes_entries_email ON sweepstakes_entries(email);
CREATE INDEX IF NOT EXISTS idx_sweepstakes_entries_created_at ON sweepstakes_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_sweepstakes_entries_state ON sweepstakes_entries(state);
```

**Then:**
1. Click **Run**
2. ✅ Should see "Success. No rows returned"

## Step 4: Enable Row Level Security (RLS)

**Copy and paste this SQL:**

```sql
-- Enable Row Level Security on both tables
ALTER TABLE email_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE sweepstakes_entries ENABLE ROW LEVEL SECURITY;
```

**Then:**
1. Click **Run**
2. ✅ Should see success message

## Step 5: Create RLS Policies for `email_verifications`

**Copy and paste this SQL:**

```sql
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anon to insert email_verifications" ON email_verifications;
DROP POLICY IF EXISTS "Allow anon to select email_verifications by token" ON email_verifications;
DROP POLICY IF EXISTS "Allow anon to update email_verifications by token" ON email_verifications;

-- Policy: Allow inserting new verification records
CREATE POLICY "Allow anon to insert email_verifications"
  ON email_verifications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow selecting verification records by token
CREATE POLICY "Allow anon to select email_verifications by token"
  ON email_verifications
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Allow updating verification records (to mark as used)
CREATE POLICY "Allow anon to update email_verifications by token"
  ON email_verifications
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
```

**Then:**
1. Click **Run**
2. ✅ Should see success message

## Step 6: Create RLS Policies for `sweepstakes_entries`

**Copy and paste this SQL:**

```sql
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anon to insert sweepstakes_entries" ON sweepstakes_entries;
DROP POLICY IF EXISTS "Allow anon to select own sweepstakes_entries" ON sweepstakes_entries;

-- Policy: Allow inserting new entries
CREATE POLICY "Allow anon to insert sweepstakes_entries"
  ON sweepstakes_entries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow selecting entries (for duplicate checking)
CREATE POLICY "Allow anon to select own sweepstakes_entries"
  ON sweepstakes_entries
  FOR SELECT
  TO anon, authenticated
  USING (true);
```

**Then:**
1. Click **Run**
2. ✅ Should see success message

## Step 7: Verify Tables Were Created

1. In Supabase dashboard, click **Table Editor** in the left sidebar
2. You should see both tables:
   - `email_verifications`
   - `sweepstakes_entries`

## Step 8: Test Again

1. Go back to your website
2. Try entering the sweepstakes again
3. It should work now! ✅

## If Still Failing

If you still get errors after creating the tables:
1. Check Vercel Function logs again for the new error message
2. Make sure you ran ALL the SQL commands (Steps 2-6)
3. Verify the tables exist in Supabase Table Editor

