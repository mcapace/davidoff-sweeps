# Clear Vercel Build Cache - Step by Step

The error persists because **Vercel is still using a cached build**. Follow these steps exactly:

## Step 1: Verify Code is Correct on GitHub

1. Go to: `https://github.com/mcapace/davidoff-sweeps`
2. Navigate to: `lib/sweepstakes-entries.ts`
3. Search for: `davidoff_sweepstakes_entries`
4. **Should find: ZERO results** (or only in comments/docs)
5. Verify all `.from()` calls use: `'sweepstakes_entries'`

If you still see `davidoff_sweepstakes_entries` in the actual code, let me know and I'll fix it.

## Step 2: Force Clean Redeploy on Vercel

**Method 1: Via Dashboard (Recommended)**

1. Go to: `https://vercel.com/dashboard`
2. Select project: **davidoff-sweeps**
3. Click **Deployments** tab
4. Find the **latest deployment** (top of list)
5. Click **⋮** (three dots menu on the right)
6. Click **Redeploy**
7. **CRITICAL:** Uncheck ✅ **"Use existing Build Cache"**
8. **CRITICAL:** If you see **"Reuse deployment environment variables"**, leave it checked ✅
9. Click **Redeploy**
10. Wait **3-5 minutes** for deployment to complete
11. Check deployment logs - should show new build without cache

**Method 2: Via CLI**

```bash
cd "/Users/mcapace/Desktop_old/Davidoff Sweeps"
vercel --prod --force --no-cache
```

## Step 3: If Still Not Working - Clear Project Settings

1. Go to Vercel Dashboard → **Settings**
2. Scroll down to **"Build & Development Settings"**
3. Check **"Build Command"** and **"Output Directory"**
4. If you see any cache-related settings, disable them
5. Click **Save**
6. Trigger a new deployment

## Step 4: Verify Deployment Uses Latest Code

After redeployment:

1. Go to **Deployments** tab
2. Click on the **new deployment**
3. Click **"View Build Logs"** or **"View Function Logs"**
4. Search for: `sweepstakes_entries` or `davidoff_sweepstakes_entries`
5. Should see `sweepstakes_entries`, NOT `davidoff_sweepstakes_entries`

## Step 5: Test Again

1. Go to: `https://davidoff.cigaraficionado.com/`
2. Try entering the sweepstakes
3. Check Vercel logs:
   - Go to **Logs** tab
   - Filter by **Error**
   - Look for latest `/api/sweepstakes-entry` error
   - Should NOT see `davidoff_sweepstakes_entries` anymore

## Troubleshooting

**If error still shows `davidoff_sweepstakes_entries` after clean redeploy:**

1. **Check if there's a different file** causing the issue:
   - Search entire codebase for `davidoff_sweepstakes_entries`
   - Check if any other file imports or uses it

2. **Check deployment source:**
   - Vercel Settings → **Git**
   - Verify it's connected to correct repo/branch
   - Should be: `main` branch of `mcapace/davidoff-sweeps`

3. **Manually trigger deployment:**
   - Settings → **Deployments** → **Create Deployment**
   - Select **main** branch
   - Uncheck all cache options
   - Deploy

4. **Contact Vercel support:**
   - If cache persists after all attempts
   - Include deployment URL and error logs

## Quick Check Script

Run this to verify local code is correct:

```bash
cd "/Users/mcapace/Desktop_old/Davidoff Sweeps"
echo "Checking for davidoff_sweepstakes_entries in code files..."
grep -r "davidoff_sweepstakes_entries" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" lib/ app/ 2>/dev/null | grep -v ".git" | grep -v "node_modules" | grep -v ".md" | grep -v ".sh"
```

**Should return:** Nothing (empty result)
**If it returns anything:** That file still has the old name - let me know!

