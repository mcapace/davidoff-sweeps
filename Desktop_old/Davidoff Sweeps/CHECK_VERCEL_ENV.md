# Check Vercel Environment Variables

The build is working, but entries are failing. This is most likely because **Vercel environment variables are not set** or **not accessible server-side**.

## Quick Check - Verify Environment Variables in Vercel

1. Go to https://vercel.com/dashboard
2. Select your project: **davidoff-sweeps**
3. Go to **Settings** → **Environment Variables**
4. Verify these 4 variables are set for **ALL environments** (Production, Preview, Development):
   - `SUPABASE_URL` = `https://mkwheoemyraxihpcvptn.supabase.co`
   - `SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8`
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://mkwheoemyraxihpcvptn.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8`

## ⚠️ CRITICAL: Redeploy After Adding/Updating Variables

**Environment variables ONLY take effect after a new deployment!**

### Option 1: Redeploy via Dashboard
1. Go to **Deployments**
2. Click **⋮** (three dots) on the latest deployment
3. Click **Redeploy**
4. Make sure **Use existing Build Cache** is **UNCHECKED**

### Option 2: Trigger New Deployment
```bash
cd "/Users/mcapace/Desktop_old/Davidoff Sweeps"
git commit --allow-empty -m "Trigger redeploy for env vars"
git push origin main
```

## Check Vercel Function Logs

1. Go to **Deployments** → Latest → **Functions**
2. Click on `/api/sweepstakes-entry`
3. Click **Logs** tab
4. Look for error messages when you try to enter

Common errors you might see:
- `Supabase not configured: Missing SUPABASE_URL` → Environment variable not set
- `Database connection error` → Supabase URL/key incorrect
- `Invalid verification token` → Email verification not working
- `You have already entered` → Entry already exists
- `You must be 21 years or older` → Age validation failing

## Test After Deployment

1. Try submitting a sweepstakes entry
2. Open browser **Developer Tools** (F12) → **Console** tab
3. Look for any error messages in the console
4. Check the **Network** tab → Find the `/api/sweepstakes-entry` request → Check the response

## If Still Failing

Please check the Vercel Function logs and share:
1. The exact error message from the logs
2. The response from the Network tab in browser DevTools
3. Any console errors

This will help identify the specific issue.

