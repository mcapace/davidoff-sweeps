# Debug 500 Error - Sweepstakes Entry Failing

You're seeing a **500 error** from `/api/sweepstakes-entry`. This is a server-side error.

## Step 1: Check Vercel Function Logs (Most Important!)

This will show you the EXACT error:

1. Go to: https://vercel.com/dashboard
2. Select project: **davidoff-sweeps**
3. Go to **Deployments** tab
4. Click on the **latest deployment**
5. Click on the **Functions** tab
6. Find `/api/sweepstakes-entry` in the list
7. Click on it
8. Click the **Logs** tab
9. Try entering the sweepstakes again (while keeping the logs open)
10. **Copy the error message** you see in the logs

The error message will tell us exactly what's wrong. Common errors:
- `Supabase not configured: Missing SUPABASE_URL` → Environment variables not set
- `Database connection error` → Wrong URL/key
- `relation "sweepstakes_entries" does not exist` → Tables not created
- `new row violates row-level security policy` → RLS blocking insert

## Step 2: Verify Environment Variables

Even if you added them before, check they're actually set:

1. Go to **Settings** → **Environment Variables**
2. Verify these **4 variables** exist and are set for **ALL environments** (Production, Preview, Development):
   - `SUPABASE_URL` = `https://mkwheoemyraxihpcvptn.supabase.co`
   - `SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8`
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://mkwheoemyraxihpcvptn.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8`

## Step 3: Redeploy After Adding/Changing Variables

**⚠️ CRITICAL:** Environment variables ONLY work after a new deployment!

### Option A: Via Dashboard (Easiest)
1. Go to **Deployments**
2. Click **⋮** (three dots) on the latest deployment
3. Click **Redeploy**
4. **UNCHECK** "Use existing Build Cache"
5. Click **Redeploy**

### Option B: Trigger via Git
```bash
cd "/Users/mcapace/Desktop_old/Davidoff Sweeps"
git commit --allow-empty -m "Redeploy for env vars"
git push origin main
```

## Step 4: Check Browser Network Tab

1. Open browser **Developer Tools** (F12)
2. Go to **Network** tab
3. Try submitting the sweepstakes entry again
4. Find the `/api/sweepstakes-entry` request
5. Click on it
6. Go to **Response** tab
7. Check what error message is returned

## What to Share With Me

Please share:
1. **The exact error message** from Vercel Function Logs (Step 1)
2. Whether environment variables are set (Step 2)
3. Whether you redeployed after setting them (Step 3)
4. The response body from the Network tab (Step 4)

This will help me identify the exact issue and fix it.

