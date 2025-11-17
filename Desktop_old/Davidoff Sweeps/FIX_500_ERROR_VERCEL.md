# Fix 500 Error in Vercel

The 500 error is happening because the API route can't connect to Supabase. This is most likely due to missing environment variables in Vercel.

## Step 1: Check Vercel Environment Variables

1. Go to your Vercel dashboard: https://vercel.com
2. Select your project: `davidoff-sweeps`
3. Go to **Settings** → **Environment Variables**
4. Make sure you have ALL of these variables set for **Production**, **Preview**, and **Development**:

### Required Environment Variables:

```
SUPABASE_URL=https://mkwheoemyraxihpcvptn.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8
```

**OR** (alternative naming):

```
NEXT_PUBLIC_SUPABASE_URL=https://mkwheoemyraxihpcvptn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8
```

## Step 2: How to Add Environment Variables in Vercel

### Option A: Via Vercel Dashboard

1. Go to **Settings** → **Environment Variables**
2. Click **Add New**
3. Enter the key: `SUPABASE_URL`
4. Enter the value: `https://mkwheoemyraxihpcvptn.supabase.co`
5. Select all environments: ☑ Production ☑ Preview ☑ Development
6. Click **Save**
7. Repeat for `SUPABASE_ANON_KEY` with the key value above

### Option B: Via Vercel CLI

```bash
cd "/Users/mcapace/Desktop_old/Davidoff Sweeps"

# Add for all environments
vercel env add SUPABASE_URL production preview development
# When prompted, paste: https://mkwheoemyraxihpcvptn.supabase.co

vercel env add SUPABASE_ANON_KEY production preview development
# When prompted, paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8
```

## Step 3: Redeploy After Adding Variables

After adding/updating environment variables, you **MUST** redeploy:

1. Go to **Deployments** tab in Vercel
2. Click the **3 dots** (⋮) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger a new deployment

**Important:** Environment variable changes only take effect after a new deployment!

## Step 4: Check Vercel Logs

1. Go to **Deployments** → Click on the latest deployment
2. Click **Functions** tab
3. Click on `/api/sweepstakes-entry`
4. Check the **Logs** tab for error messages

Look for errors like:
- `[500] Missing Supabase environment variables`
- `[500] Failed to create Supabase client`
- `Supabase not configured`

## Step 5: Verify Database Tables Exist

Make sure these tables exist in Supabase:

1. `email_verifications` - for email verification tokens
2. `sweepstakes_entries` - for storing entries

If you need to recreate them, see `SUPABASE_SETUP_FROM_SCRATCH.md`

## Common Issues:

1. **Variables not set for all environments** - Make sure Production, Preview, AND Development are checked
2. **Typos in variable names** - Double-check spelling: `SUPABASE_URL` not `SUPABASE-URL` or `SUPABASEURL`
3. **Missing redeploy** - Environment variables only work after a new deployment
4. **Wrong variable values** - Make sure you're using the correct Supabase URL and anon key from your Supabase dashboard

## Quick Test:

After adding variables and redeploying, try entering the sweepstakes again. The 500 error should be gone if the environment variables are set correctly.

