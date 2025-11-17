# Immediate Fix - Force Clean Redeploy

The code is **already fixed** - all references now use `sweepstakes_entries`. The error is from Vercel's cached build.

## ✅ Code is Fixed

I verified:
- ✅ `app/api/sweepstakes-entry/route.ts` uses `sweepstakes_entries` 
- ✅ `lib/sweepstakes-entries.ts` uses `sweepstakes_entries` (all 3 occurrences)

## 🔧 Force Clean Redeploy on Vercel

**Option 1: Via Vercel Dashboard (Recommended)**

1. Go to **Vercel Dashboard** → `davidoff-sweeps` project
2. Click **Deployments** tab
3. Find the **latest deployment**
4. Click **⋮** (three dots menu) → **Redeploy**
5. **UNCHECK** ✅ "Use existing Build Cache"
6. Click **Redeploy**

This forces Vercel to:
- Pull latest code from GitHub
- Rebuild from scratch (no cache)
- Use the updated table names

**Option 2: Via Git Push (Automatic)**

The latest code with fixes is already pushed to GitHub. You can:
1. Make a small change (e.g., add a comment) and push
2. Or just wait - Vercel will eventually pick up the changes

**Option 3: Via Vercel CLI**

```bash
cd "/Users/mcapace/Desktop_old/Davidoff Sweeps"
vercel --prod --force
```

## ⏱️ After Redeploy

1. Wait **2-3 minutes** for deployment to complete
2. Check deployment logs for any errors
3. Test the sweepstakes entry form
4. Check Vercel logs - error should now show `sweepstakes_entries` instead of `davidoff_sweepstakes_entries`

## 🐛 If Error Persists After Clean Redeploy

If you still see `davidoff_sweepstakes_entries` after a clean redeploy:

1. **Check Vercel Environment Variables:**
   - Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set
   - Verify they're set for Production, Preview, AND Development

2. **Check RLS Policies in Supabase:**
   - Go to Supabase SQL Editor
   - Run: `SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'sweepstakes_entries';`
   - Should show `rowsecurity = true` and have policies allowing `anon` access

3. **Check Supabase API Directly:**
   ```bash
   curl 'https://mkwheoemyraxihpcvptn.supabase.co/rest/v1/sweepstakes_entries?select=*&limit=1' \
     -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8" \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8"
   ```
   - Should return `[]` or data, NOT `404` or `PGRST205`

## ✅ Summary

**The fix is already in the code!** Just force a clean redeploy to clear Vercel's cache.

