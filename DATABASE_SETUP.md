# Davidoff Sweepstakes Database Setup

This guide will help you set up a separate Supabase database for the Davidoff Accessories Sweepstakes campaign.

## Step 1: Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Name it something like "Davidoff Sweepstakes" or "Davidoff Campaign"
5. Choose a database password and region
6. Wait for the project to be created

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **service_role key** (this is your `SUPABASE_SERVICE_ROLE_KEY` - keep this secret!)

## Step 3: Create the Database Tables

1. In your Supabase project, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase-davidoff-schema.sql`
4. Click **Run** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

## Step 4: Verify Tables Were Created

Run this query in the SQL Editor to verify:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'davidoff%';
```

You should see:
- `davidoff_sweepstakes_entries`
- `davidoff_analytics_events`

## Step 5: Set Environment Variables

Add these to your `.env.local` file (or Vercel environment variables):

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important**: 
- Never commit `.env.local` to git
- The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security - keep it secret!

## Step 6: Test the Connection

1. Start your development server: `npm run dev`
2. Try submitting a test entry through the form
3. Check your Supabase dashboard → **Table Editor** → `davidoff_sweepstakes_entries`
4. You should see the entry appear

## Database Schema

### `davidoff_sweepstakes_entries`
Stores all sweepstakes entries with:
- Personal information (name, email, phone, address)
- Entry date and IP address
- Email verification status
- Marketing consent

### `davidoff_analytics_events`
Stores analytics events:
- Entry submissions
- Email verifications
- User interactions

## Security Notes

- Row Level Security (RLS) is enabled but set to allow all operations
- For production, you may want to restrict access based on your needs
- The service role key bypasses RLS - only use it server-side

## Troubleshooting

**Entries not appearing?**
- Check that environment variables are set correctly
- Verify tables were created (Step 4)
- Check browser console for errors
- Check Supabase logs in the dashboard

**Email verification not working?**
- Ensure `email_verified` column exists in the table
- Check that the verification token is being generated correctly
- Verify the email verification API route is accessible

## Exporting Data

To export entries for the drawing:

1. Go to Supabase dashboard → **SQL Editor**
2. Run:
```sql
SELECT * FROM davidoff_sweepstakes_entries 
WHERE email_verified = true
ORDER BY entry_date;
```

3. Click "Export" to download as CSV

Or use the export function in your code (if implemented in an admin panel).

