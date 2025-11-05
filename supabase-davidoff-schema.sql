-- Supabase database schema for Davidoff Accessories Sweepstakes
-- Run this in your Supabase SQL editor
-- This is a separate database schema to avoid conflicts with other campaigns

-- ============================================
-- Davidoff Sweepstakes Entries Table
-- ============================================
CREATE TABLE IF NOT EXISTS davidoff_sweepstakes_entries (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  agree_to_rules BOOLEAN NOT NULL DEFAULT false,
  agree_to_emails BOOLEAN NOT NULL DEFAULT false,
  email_verified BOOLEAN NOT NULL DEFAULT false,
  entry_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_davidoff_entries_email ON davidoff_sweepstakes_entries(email);
CREATE INDEX IF NOT EXISTS idx_davidoff_entries_entry_date ON davidoff_sweepstakes_entries(entry_date);
CREATE INDEX IF NOT EXISTS idx_davidoff_entries_created_at ON davidoff_sweepstakes_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_davidoff_entries_email_verified ON davidoff_sweepstakes_entries(email_verified);

-- Enable Row Level Security
ALTER TABLE davidoff_sweepstakes_entries ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (adjust based on your security needs)
CREATE POLICY "Allow all operations on davidoff_sweepstakes_entries" 
ON davidoff_sweepstakes_entries
FOR ALL USING (true);

-- ============================================
-- Davidoff Analytics Events Table
-- ============================================
CREATE TABLE IF NOT EXISTS davidoff_analytics_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_agent TEXT,
  ip_address TEXT,
  metadata JSONB
);

-- Create indexes for analytics
CREATE INDEX IF NOT EXISTS idx_davidoff_analytics_timestamp ON davidoff_analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_davidoff_analytics_type ON davidoff_analytics_events(type);

-- Enable RLS for analytics
ALTER TABLE davidoff_analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policy for analytics
CREATE POLICY "Allow all operations on davidoff_analytics_events" 
ON davidoff_analytics_events
FOR ALL USING (true);

-- ============================================
-- Verification: Check tables were created
-- ============================================
-- Run this to verify tables exist:
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' AND table_name LIKE 'davidoff%';

