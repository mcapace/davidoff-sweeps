# Test Database Connection

Since you've already created the schema in Supabase, let's verify everything is working:

## Quick Test

1. **Make sure `.env.local` exists** with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://mkwheoemyraxihpcvptn.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjI2NzI1NSwiZXhwIjoyMDc3ODQzMjU1fQ.l3K9r2_L6oS8b0m7esSFeKKNMb0fvQoV0c2Lg7A3WwQ
   ```

2. **Start the dev server**: `npm run dev`

3. **Test the form**:
   - Go to http://localhost:3000
   - Fill out and submit the sweepstakes form
   - Check Supabase → **Table Editor** → `davidoff_sweepstakes_entries`
   - You should see the entry appear

4. **Test email verification**:
   - Check your email for the verification link
   - Click the verification link
   - Check Supabase again - `email_verified` should be `true`

## Verify Tables in Supabase

Run this in Supabase SQL Editor to check:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'davidoff%';

-- Check table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'davidoff_sweepstakes_entries';
```

You should see all the columns including `email_verified`.

## Troubleshooting

**If entries don't appear:**
- Check browser console for errors
- Check Supabase logs (Settings → Logs)
- Verify environment variables are loaded (restart dev server after creating .env.local)

**If verification doesn't work:**
- Check that `email_verified` column exists
- Verify the email verification API route is accessible
- Check server logs for errors

