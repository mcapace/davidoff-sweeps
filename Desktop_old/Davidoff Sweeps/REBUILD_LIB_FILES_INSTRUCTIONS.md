# Rebuild lib/analytics.ts and lib/sweepstakes-entries.ts

The files have been created, but due to cloud sync timeouts, you need to manually commit them. 

## Files to commit:
- `lib/analytics.ts` - Updated to use `createClient()` instead of importing `supabase`
- `lib/sweepstakes-entries.ts` - Updated to use `createClient()` and includes `insertSweepstakesEntry` function

## Once the cloud sync completes (wait 5-10 minutes), run:

```bash
cd "/Users/mcapace/Desktop_old/Davidoff Sweeps"
git add lib/analytics.ts lib/sweepstakes-entries.ts
git commit -m "Fix: Update analytics and sweepstakes-entries to use createClient() and add insertSweepstakesEntry function"
git push origin main
```

## File Contents:

### lib/analytics.ts
See file content below - this file uses `createClient()` function from `./supabase` instead of importing `supabase` directly.

### lib/sweepstakes-entries.ts  
See file content below - this file:
1. Uses `createClient()` function from `./supabase` instead of importing `supabase` directly
2. Exports `insertSweepstakesEntry` function that matches what the API route expects

