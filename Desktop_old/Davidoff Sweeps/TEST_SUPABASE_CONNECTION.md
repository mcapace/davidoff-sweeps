# Test Supabase Connection - Tables Exist but PGRST205 Error

Your tables exist! The `PGRST205` error means Supabase API can't access them. Let's test the connection.

## Step 1: Test Direct Connection to Supabase

1. Go to Supabase → **SQL Editor**
2. Run this SQL to test if you can read from the tables:

```sql
-- Test if we can read from email_verifications
SELECT COUNT(*) as count FROM public.email_verifications;

-- Test if we can read from sweepstakes_entries
SELECT COUNT(*) as count FROM public.sweepstakes_entries;
```

3. Both should return `0` (tables are empty, which is fine)

If these queries work, the tables exist and are accessible.

## Step 2: Verify RLS Policies Allow Anon Access

Run this SQL to check RLS policies:

```sql
-- Check RLS policies for email_verifications
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'email_verifications'
ORDER BY policyname;

-- Check RLS policies for sweepstakes_entries
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'sweepstakes_entries'
ORDER BY policyname;
```

You should see:
- For `email_verifications`: 3 policies (insert, select, update)
- For `sweepstakes_entries`: 2 policies (insert, select)

## Step 3: Test API Access via Supabase API

The code uses `.from('sweepstakes_entries')` which queries via PostgREST API. Let's verify the API can access it:

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy your **anon public** key
3. Test the API directly with curl or Postman:

```bash
curl 'https://mkwheoemyraxihpcvptn.supabase.co/rest/v1/sweepstakes_entries?select=*&limit=1' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8"
```

If you get `[]` (empty array) or data, the API can access the table.
If you get `404` or `PGRST205`, the API can't find the table.

## Step 4: Verify Environment Variables Are Actually Loaded

The issue might be that Vercel env vars aren't being loaded. Let's add logging to verify:

1. The code already logs: `[INFO] Supabase client initialized with URL:`
2. Check Vercel Function logs after trying to enter
3. Look for these log messages:
   - `[INFO] Supabase client initialized with URL: https://mkwheoemyraxihpcvptn.supabase.co`
   - `[INFO] Supabase key exists: true`

If you see `[ERROR] Missing SUPABASE_URL` or the URL is wrong, env vars aren't set correctly.

## Step 5: Force Redeploy with Fresh Environment Variables

1. Go to Vercel → **Deployments**
2. Click **⋮** on latest deployment
3. Click **Redeploy**
4. **UNCHECK** "Use existing Build Cache"
5. **UNCHECK** "Reuse deployment environment variables" (if visible)
6. Click **Redeploy**

This forces Vercel to reload environment variables.

## Step 6: Check if Tables Are in Public Schema via API

The tables exist in `public` schema, but maybe PostgREST needs them explicitly referenced. However, `.from('sweepstakes_entries')` should default to `public` schema.

Let me know what you see when you:
1. Test the RLS policies query (Step 2)
2. Test the API curl command (Step 3)
3. Check Vercel logs for the `[INFO]` messages (Step 4)

This will help pinpoint the exact issue!

