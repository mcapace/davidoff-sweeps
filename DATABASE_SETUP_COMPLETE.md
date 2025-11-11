# Database Setup - Next Steps

Your Supabase credentials have been configured in `.env.local`.

## ✅ Step 1: Run the SQL Schema

1. Go to your Supabase project: https://mkwheoemyraxihpcvptn.supabase.co
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-davidoff-schema.sql`
5. Paste it into the SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. You should see "Success. No rows returned"

## ✅ Step 2: Verify Tables Were Created

Run this query in the SQL Editor:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'davidoff%';
```

You should see:
- `davidoff_sweepstakes_entries`
- `davidoff_analytics_events`

## ✅ Step 3: Set Up Additional Environment Variables

Update `.env.local` with your Resend email configuration:

1. **Resend API Key**: Get from [resend.com](https://resend.com)
2. **Email FROM address**: Your verified sending domain
3. **Email REPLY-TO**: Your support email
4. **JWT_SECRET**: Generate a secure random string (for email verification tokens)

## ✅ Step 4: Test the Connection

1. Start your development server: `npm run dev`
2. Try submitting a test entry through the form
3. Check your Supabase dashboard → **Table Editor** → `davidoff_sweepstakes_entries`
4. You should see the entry appear

## 🔒 Security Notes

- ✅ `.env.local` is in `.gitignore` - it won't be committed
- ⚠️ **Important**: Add these same environment variables to Vercel for production:
  - Go to Vercel project → Settings → Environment Variables
  - Add all variables from `.env.local`
- 🔐 The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security - keep it secret!

## 📊 Viewing Entries

To view all entries in Supabase:
1. Go to **Table Editor** → `davidoff_sweepstakes_entries`
2. You'll see all entries with email verification status

To export entries for the drawing:
```sql
SELECT * FROM davidoff_sweepstakes_entries 
WHERE email_verified = true
ORDER BY entry_date;
```

## 🎯 Sweepstakes Period

The sweepstakes is configured to run from:
- **Start**: November 13, 2025 at 12:00 AM ET
- **End**: December 14, 2025 at 11:59:59 PM ET

Entries submitted outside this period will be rejected automatically.

