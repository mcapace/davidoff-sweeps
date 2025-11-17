# Verify Tables in Supabase - PGRST205 Error

You're still getting `PGRST205` error which means Supabase can't find the tables. Let's verify they exist in the **correct project**.

## Step 1: Verify You're in the Correct Supabase Project

1. Go to: https://supabase.com/dashboard
2. Make sure you're in the project: **davidoff-sweeps** (Project ID: `mkwheoemyraxihpcvptn`)
3. Check the URL should be: `https://supabase.com/dashboard/project/mkwheoemyraxihpcvptn`

## Step 2: Verify Tables Exist in Table Editor

1. Click **Table Editor** in the left sidebar
2. Verify you see both tables:
   - `email_verifications` 
   - `sweepstakes_entries`

3. Click on `sweepstakes_entries` table
4. Click the **Definition** tab
5. Verify it shows in the **`public`** schema (should say `public.sweepstakes_entries`)
6. Verify all columns exist:
   - `id` (uuid)
   - `email` (varchar/text)
   - `first_name` (varchar/text)
   - `last_name` (varchar/text)
   - `date_of_birth` (date)
   - `state` (varchar/text)
   - `verification_token` (varchar/text)
   - `created_at` (timestamptz)
   - `updated_at` (timestamptz)

7. Click on `email_verifications` table
8. Verify it's in the **`public`** schema
9. Verify all columns exist:
   - `id` (uuid)
   - `email` (varchar/text)
   - `token` (varchar/text, unique)
   - `expires_at` (timestamptz)
   - `used` (boolean)
   - `used_at` (timestamptz)
   - `created_at` (timestamptz)

## Step 3: Verify Tables Exist via SQL Query

1. Go to **SQL Editor**
2. Create a new query
3. Run this SQL to verify tables exist:

```sql
-- Check if tables exist in the public schema
SELECT 
    table_schema,
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('email_verifications', 'sweepstakes_entries')
ORDER BY table_name, ordinal_position;
```

4. Click **Run**
5. You should see all columns from both tables listed
6. If you see **NO ROWS**, the tables don't exist - you need to create them

## Step 4: If Tables Don't Exist - Create Them

If the SQL query returns no rows, the tables don't exist. Run these SQL commands:

### Create email_verifications table:

```sql
CREATE TABLE IF NOT EXISTS public.email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_email_verifications_token ON public.email_verifications(token);
CREATE INDEX IF NOT EXISTS idx_email_verifications_email ON public.email_verifications(email);
```

### Create sweepstakes_entries table:

```sql
CREATE TABLE IF NOT EXISTS public.sweepstakes_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  state VARCHAR(2) NOT NULL,
  verification_token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sweepstakes_entries_email ON public.sweepstakes_entries(email);
CREATE INDEX IF NOT EXISTS idx_sweepstakes_entries_created_at ON public.sweepstakes_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_sweepstakes_entries_state ON public.sweepstakes_entries(state);
```

## Step 5: Enable RLS and Create Policies

After creating tables, run this:

```sql
-- Enable RLS
ALTER TABLE public.email_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sweepstakes_entries ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies
DROP POLICY IF EXISTS "Allow anon to insert email_verifications" ON public.email_verifications;
DROP POLICY IF EXISTS "Allow anon to select email_verifications by token" ON public.email_verifications;
DROP POLICY IF EXISTS "Allow anon to update email_verifications by token" ON public.email_verifications;
DROP POLICY IF EXISTS "Allow anon to insert sweepstakes_entries" ON public.sweepstakes_entries;
DROP POLICY IF EXISTS "Allow anon to select own sweepstakes_entries" ON public.sweepstakes_entries;

-- Create policies
CREATE POLICY "Allow anon to insert email_verifications"
  ON public.email_verifications FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow anon to select email_verifications by token"
  ON public.email_verifications FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow anon to update email_verifications by token"
  ON public.email_verifications FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon to insert sweepstakes_entries"
  ON public.sweepstakes_entries FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow anon to select own sweepstakes_entries"
  ON public.sweepstakes_entries FOR SELECT TO anon, authenticated USING (true);
```

## Step 6: Verify Environment Variables Point to Correct Project

1. Go to Vercel → Settings → Environment Variables
2. Verify `SUPABASE_URL` is: `https://mkwheoemyraxihpcvptn.supabase.co`
3. This ensures Vercel is connecting to the correct Supabase project

## Step 7: Redeploy After Any Changes

After creating/verifying tables:
1. Go to Vercel → Deployments
2. Click **⋮** on latest deployment
3. Click **Redeploy**
4. **UNCHECK** "Use existing Build Cache"
5. Click **Redeploy**

Then test again!

