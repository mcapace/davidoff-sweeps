# Add Environment Variables to Vercel

## Supabase Credentials:

- **Project URL:** `https://mkwheoemyraxihpcvptn.supabase.co`
- **Anon/Public Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8`
- **Service Role Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjI2NzI1NSwiZXhwIjoyMDc3ODQzMjU1fQ.l3K9r2_L6oS8b0m7esSFeKKNMb0fvQoV0c2Lg7A3WwQ`
- **Publishable Key:** `sb_publishable_qvYLFhfpN94fKXGKUPacZw_k5AIx-cK`

## Option 1: Via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Select project: **davidoff-sweeps**
3. Go to **Settings** → **Environment Variables**
4. Click **Add New** for each variable:

### Variable 1: SUPABASE_URL
- **Key:** `SUPABASE_URL`
- **Value:** `https://mkwheoemyraxihpcvptn.supabase.co`
- **Environments:** ☑ Production ☑ Preview ☑ Development
- Click **Save**

### Variable 2: SUPABASE_ANON_KEY
- **Key:** `SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8`
- **Environments:** ☑ Production ☑ Preview ☑ Development
- Click **Save**

### Variable 3: NEXT_PUBLIC_SUPABASE_URL (for client-side)
- **Key:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://mkwheoemyraxihpcvptn.supabase.co`
- **Environments:** ☑ Production ☑ Preview ☑ Development
- Click **Save**

### Variable 4: NEXT_PUBLIC_SUPABASE_ANON_KEY (for client-side)
- **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8`
- **Environments:** ☑ Production ☑ Preview ☑ Development
- Click **Save**

## Option 2: Via Vercel CLI (Interactive)

Run these commands one at a time - it will prompt you to paste the value:

```bash
cd "/Users/mcapace/Desktop_old/Davidoff Sweeps"

# Add SUPABASE_URL for all environments
vercel env add SUPABASE_URL production
# When prompted, paste: https://mkwheoemyraxihpcvptn.supabase.co
vercel env add SUPABASE_URL preview
# When prompted, paste: https://mkwheoemyraxihpcvptn.supabase.co
vercel env add SUPABASE_URL development
# When prompted, paste: https://mkwheoemyraxihpcvptn.supabase.co

# Add SUPABASE_ANON_KEY for all environments
vercel env add SUPABASE_ANON_KEY production
# When prompted, paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8
vercel env add SUPABASE_ANON_KEY preview
# When prompted, paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8
vercel env add SUPABASE_ANON_KEY development
# When prompted, paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8

# Add NEXT_PUBLIC_SUPABASE_URL for all environments
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# When prompted, paste: https://mkwheoemyraxihpcvptn.supabase.co
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
# When prompted, paste: https://mkwheoemyraxihpcvptn.supabase.co
vercel env add NEXT_PUBLIC_SUPABASE_URL development
# When prompted, paste: https://mkwheoemyraxihpcvptn.supabase.co

# Add NEXT_PUBLIC_SUPABASE_ANON_KEY for all environments
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# When prompted, paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
# When prompted, paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development
# When prompted, paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8
```

## Verify Variables Were Added:

```bash
vercel env ls
```

You should see all 4 variables listed for each environment (production, preview, development).

## ⚠️ CRITICAL: Redeploy After Adding Variables

**Environment variables ONLY take effect after a new deployment!**

### Option 1: Redeploy via Dashboard
1. Go to Vercel Dashboard → **Deployments**
2. Click **⋮** (three dots) on the latest deployment
3. Click **Redeploy**
4. Make sure **Use existing Build Cache** is **UNCHECKED**

### Option 2: Trigger New Deployment
```bash
git commit --allow-empty -m "Trigger redeploy for env vars"
git push origin main
```

## Test After Deployment:

1. Try submitting a sweepstakes entry
2. Check browser console - should NOT see 500 errors anymore
3. The entry should be saved successfully

## If You Still See Errors:

1. Check Vercel Function logs:
   - Go to **Deployments** → Latest → **Functions** → `/api/sweepstakes-entry` → **Logs**
   - Look for specific error messages

2. Verify variables are set:
   ```bash
   vercel env ls
   ```

3. Make sure you redeployed AFTER adding the variables

