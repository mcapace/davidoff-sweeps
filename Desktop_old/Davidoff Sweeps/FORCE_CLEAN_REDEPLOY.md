# Force Clean Redeploy - Fix 500 Error

The error is still showing because Vercel is using a **cached build**. We need to force a clean redeploy.

## Step 1: Force Clean Redeploy on Vercel

1. Go to **Vercel Dashboard** → Your project (`davidoff-sweeps`)
2. Click **Deployments** tab
3. Find the **latest deployment** (the one with the most recent timestamp)
4. Click the **⋮** (three dots) menu on the right
5. Click **Redeploy**
6. **IMPORTANT:** Uncheck **"Use existing Build Cache"**
7. Click **Redeploy**

This forces Vercel to:
- Pull the latest code from GitHub
- Rebuild everything from scratch
- Use the updated `lib/sweepstakes-entries.ts` with correct table names

## Step 2: Verify RLS Policies Allow Access

The 404 errors from Supabase suggest RLS might be blocking access. Let's verify:

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Run this SQL to check RLS policies:

```sql
-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('email_verifications', 'sweepstakes_entries');

-- Check policies exist and allow anon access
SELECT 
    tablename,
    policyname,
    cmd as command,
    roles,
    qual as using_expression,
    with_check as with_check_expression
FROM pg_policies
WHERE tablename IN ('email_verifications', 'sweepstakes_entries')
ORDER BY tablename, policyname;
```

**Expected Results:**
- `rowsecurity` should be `true` for both tables
- You should see policies for `anon` and/or `authenticated` roles
- Policies should allow `INSERT`, `SELECT`, and `UPDATE` operations

## Step 3: If RLS Policies Are Missing, Create Them

If you don't see policies, run this SQL:

```sql
-- Enable RLS if not already enabled
ALTER TABLE public.email_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sweepstakes_entries ENABLE ROW LEVEL SECURITY;

-- Allow anon to insert email_verifications
CREATE POLICY "Allow anon insert email_verifications"
ON public.email_verifications
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anon to select email_verifications by token and email
CREATE POLICY "Allow anon select email_verifications"
ON public.email_verifications
FOR SELECT
TO anon
USING (true);

-- Allow anon to update email_verifications (to mark as used)
CREATE POLICY "Allow anon update email_verifications"
ON public.email_verifications
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

-- Allow anon to insert sweepstakes_entries
CREATE POLICY "Allow anon insert sweepstakes_entries"
ON public.sweepstakes_entries
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anon to select sweepstakes_entries (to check for duplicates)
CREATE POLICY "Allow anon select sweepstakes_entries"
ON public.sweepstakes_entries
FOR SELECT
TO anon
USING (true);
```

## Step 4: Test API Directly

After redeploying, test if the Supabase API is accessible:

```bash
curl 'https://mkwheoemyraxihpcvptn.supabase.co/rest/v1/sweepstakes_entries?select=*&limit=1' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8"
```

**Expected Result:** Should return `[]` (empty array) or actual data, NOT `404`.

If you get `404`, the table doesn't exist or RLS is blocking access.

## Step 5: Wait for Deployment

After redeploying with cache cleared:
1. Wait **2-3 minutes** for deployment to complete
2. Check deployment logs for any build errors
3. Test the sweepstakes entry form again
4. Check Vercel logs - the error should now show `sweepstakes_entries` instead of `davidoff_sweepstakes_entries`

## Quick Summary

**Most likely issue:** Build cache is using old code. **Solution:** Redeploy with cache disabled.

**Secondary issue:** RLS policies might be missing or blocking access. **Solution:** Create policies using SQL above.

