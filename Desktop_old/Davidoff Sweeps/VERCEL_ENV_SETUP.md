# Vercel Environment Variables Setup

## Supabase Project Details:
- **Project ID:** `mkwheoemyraxihpcvptn`
- **Project Name:** `davidoff-sweeps`
- **Supabase URL:** `https://mkwheoemyraxihpcvptn.supabase.co`
- **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8`

## Quick Setup (Using Script):

```bash
cd "/Users/mcapace/Desktop_old/Davidoff Sweeps"
./add-vercel-env-vars.sh
```

## Manual Setup (Via Vercel CLI):

### Option 1: Interactive CLI (Recommended)

```bash
cd "/Users/mcapace/Desktop_old/Davidoff Sweeps"

# Add SUPABASE_URL
vercel env add SUPABASE_URL production preview development
# When prompted, paste: https://mkwheoemyraxihpcvptn.supabase.co

# Add SUPABASE_ANON_KEY  
vercel env add SUPABASE_ANON_KEY production preview development
# When prompted, paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8

# Add NEXT_PUBLIC_SUPABASE_URL (for client-side)
vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development
# When prompted, paste: https://mkwheoemyraxihpcvptn.supabase.co

# Add NEXT_PUBLIC_SUPABASE_ANON_KEY (for client-side)
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development
# When prompted, paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8
```

### Option 2: Via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select project: **davidoff-sweeps**
3. Go to **Settings** → **Environment Variables**
4. Click **Add New** for each variable:

#### Variable 1:
- **Key:** `SUPABASE_URL`
- **Value:** `https://mkwheoemyraxihpcvptn.supabase.co`
- **Environments:** ☑ Production ☑ Preview ☑ Development
- Click **Save**

#### Variable 2:
- **Key:** `SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8`
- **Environments:** ☑ Production ☑ Preview ☑ Development
- Click **Save**

#### Variable 3 (Optional, for client-side):
- **Key:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://mkwheoemyraxihpcvptn.supabase.co`
- **Environments:** ☑ Production ☑ Preview ☑ Development
- Click **Save**

#### Variable 4 (Optional, for client-side):
- **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8`
- **Environments:** ☑ Production ☑ Preview ☑ Development
- Click **Save**

## Verify Variables Are Set:

```bash
vercel env ls
```

You should see all 4 variables listed.

## ⚠️ CRITICAL: Redeploy After Adding Variables

Environment variables **ONLY** take effect after a new deployment!

### Option 1: Redeploy via Dashboard
1. Go to Vercel Dashboard → **Deployments**
2. Click **⋮** (three dots) on the latest deployment
3. Click **Redeploy**

### Option 2: Trigger New Deployment
```bash
# Make a small change and push
git commit --allow-empty -m "Trigger redeploy for env vars"
git push origin main
```

## Test After Deployment:

1. Try submitting a sweepstakes entry
2. Check browser console - should NOT see 500 errors
3. Check Vercel Function logs:
   - Go to **Deployments** → Latest → **Functions** → `/api/sweepstakes-entry` → **Logs**

## Troubleshooting:

If you still see 500 errors after adding variables and redeploying:

1. **Verify variables exist:**
   ```bash
   vercel env ls
   ```

2. **Check function logs** in Vercel dashboard for specific error messages

3. **Check variable names:** Make sure there are no typos (e.g., `SUPABASE_URL` not `SUPABASE-URL`)

4. **Verify Supabase tables exist:**
   - `email_verifications`
   - `sweepstakes_entries`
   
   See `SUPABASE_SETUP_FROM_SCRATCH.md` if you need to recreate them.

