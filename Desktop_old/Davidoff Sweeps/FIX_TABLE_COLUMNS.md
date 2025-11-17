# Fix Missing Columns in Supabase Tables

I can see your tables exist, but they're missing some required columns. Let's add them.

## Step 1: Go to Supabase SQL Editor

1. Go to: https://supabase.com/dashboard
2. Select project: **davidoff-sweeps**
3. Click **SQL Editor** in the left sidebar
4. Click **New query**

## Step 2: Fix `email_verifications` Table

Your table is missing `used` and `used_at` columns. Add them:

**Copy and paste this SQL:**

```sql
-- Add missing columns to email_verifications table
ALTER TABLE email_verifications 
ADD COLUMN IF NOT EXISTS used BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS used_at TIMESTAMPTZ;

-- Add UNIQUE constraint to token if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'email_verifications_token_key'
    ) THEN
        ALTER TABLE email_verifications ADD CONSTRAINT email_verifications_token_key UNIQUE (token);
    END IF;
END $$;
```

**Then:**
1. Click **Run** (or press Cmd/Ctrl + Enter)
2. ✅ Should see "Success. No rows returned"

## Step 3: Verify `sweepstakes_entries` Table Structure

1. Click **Table Editor** in the left sidebar
2. Click on `sweepstakes_entries` table
3. Click the **Definition** tab
4. Verify it has these columns:
   - `id` (uuid, primary key)
   - `email` (text/varchar)
   - `first_name` (text/varchar)
   - `last_name` (text/varchar)
   - `date_of_birth` (date)
   - `state` (text/varchar)
   - `verification_token` (text/varchar)
   - `created_at` (timestamptz)
   - `updated_at` (timestamptz)

If any columns are missing, run this SQL:

```sql
-- Add missing columns to sweepstakes_entries table
ALTER TABLE sweepstakes_entries 
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS verification_token TEXT,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
```

## Step 4: Verify RLS Policies

1. In Table Editor, click on `email_verifications` table
2. Click **RLS policies** button
3. Verify you have these policies:
   - "Allow anon to insert email_verifications"
   - "Allow anon to select email_verifications by token"
   - "Allow anon to update email_verifications by token"

4. Click on `sweepstakes_entries` table
5. Click **RLS policies** button
6. Verify you have these policies:
   - "Allow anon to insert sweepstakes_entries"
   - "Allow anon to select own sweepstakes_entries"

If policies are missing, run this SQL:

```sql
-- Enable RLS on both tables
ALTER TABLE email_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE sweepstakes_entries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for clean setup)
DROP POLICY IF EXISTS "Allow anon to insert email_verifications" ON email_verifications;
DROP POLICY IF EXISTS "Allow anon to select email_verifications by token" ON email_verifications;
DROP POLICY IF EXISTS "Allow anon to update email_verifications by token" ON email_verifications;
DROP POLICY IF EXISTS "Allow anon to insert sweepstakes_entries" ON sweepstakes_entries;
DROP POLICY IF EXISTS "Allow anon to select own sweepstakes_entries" ON sweepstakes_entries;

-- Create policies for email_verifications
CREATE POLICY "Allow anon to insert email_verifications"
  ON email_verifications FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow anon to select email_verifications by token"
  ON email_verifications FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow anon to update email_verifications by token"
  ON email_verifications FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- Create policies for sweepstakes_entries
CREATE POLICY "Allow anon to insert sweepstakes_entries"
  ON sweepstakes_entries FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow anon to select own sweepstakes_entries"
  ON sweepstakes_entries FOR SELECT TO anon, authenticated USING (true);
```

**Then:**
1. Click **Run**
2. ✅ Should see "Success. No rows returned"

## Step 5: Verify Table Structure

1. Go back to **Table Editor**
2. Click on `email_verifications` table
3. Click the **Definition** tab
4. Verify it now has:
   - `id` (uuid)
   - `email` (varchar/text)
   - `token` (varchar/text)
   - `expires_at` (timestamptz)
   - `used` (boolean) ← **Should be here now**
   - `used_at` (timestamptz) ← **Should be here now**
   - `created_at` (timestamptz)

5. Click on `sweepstakes_entries` table
6. Verify it has all required columns

## Step 6: Test Again

1. Go back to your website
2. Try entering the sweepstakes again
3. Check Vercel Function logs if it still fails

The error should be fixed now! ✅

