# Quick Start - Database Setup

## ✅ Step 1: Create .env.local File

Create a file named `.env.local` in the project root with these contents:

```env
# Supabase Configuration for Davidoff Sweepstakes
NEXT_PUBLIC_SUPABASE_URL=https://mkwheoemyraxihpcvptn.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjI2NzI1NSwiZXhwIjoyMDc3ODQzMjU1fQ.l3K9r2_L6oS8b0m7esSFeKKNMb0fvQoV0c2Lg7A3WwQ

# Resend Email Configuration (get from resend.com)
RESEND_API_KEY=your-resend-api-key-here

# Email Configuration
EMAIL_FROM=noreply@yourdomain.com
EMAIL_REPLY_TO=support@yourdomain.com

# JWT Secret for email verification (generate a random string)
JWT_SECRET=your-secure-random-secret-key-change-this-in-production

# Test email (for bypassing duplicate checks during development)
TEST_EMAIL=mcapace@mshanken.com
```

## ✅ Step 2: Run the SQL Schema in Supabase

1. Go to your Supabase project: https://mkwheoemyraxihpcvptn.supabase.co
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Open the file `supabase-davidoff-schema.sql` in this project
5. Copy ALL the contents
6. Paste into the SQL Editor
7. Click **Run** (or press Cmd/Ctrl + Enter)
8. You should see "Success. No rows returned"

## ✅ Step 3: Verify Tables

Run this query in Supabase SQL Editor:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'davidoff%';
```

You should see:
- `davidoff_sweepstakes_entries`
- `davidoff_analytics_events`

## ✅ Step 4: Test the Connection

1. Make sure `.env.local` is created with your credentials
2. Start dev server: `npm run dev`
3. Submit a test entry through the form
4. Check Supabase → **Table Editor** → `davidoff_sweepstakes_entries`
5. Entry should appear there!

## 🔒 Important Security Notes

- ✅ `.env.local` is already in `.gitignore` - it won't be committed
- ⚠️ **Add these same variables to Vercel** for production:
  - Vercel Dashboard → Your Project → Settings → Environment Variables
  - Add all variables from `.env.local`
- 🔐 The service role key is powerful - keep it secret!

## 📊 Sweepstakes Period

- **Start**: November 13, 2025 at 12:00 AM ET
- **End**: December 31, 2024 at 11:59:59 PM ET

Entries outside this period are automatically rejected.

