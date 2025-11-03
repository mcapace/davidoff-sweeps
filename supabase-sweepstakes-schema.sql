-- Supabase database schema for sweepstakes entries
-- Run this in your Supabase SQL editor

-- Create sweepstakes_entries table
CREATE TABLE IF NOT EXISTS sweepstakes_entries (
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
  entry_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sweepstakes_entries_email ON sweepstakes_entries(email);
CREATE INDEX IF NOT EXISTS idx_sweepstakes_entries_entry_date ON sweepstakes_entries(entry_date);
CREATE INDEX IF NOT EXISTS idx_sweepstakes_entries_created_at ON sweepstakes_entries(created_at);

-- Enable Row Level Security
ALTER TABLE sweepstakes_entries ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations
CREATE POLICY "Allow all operations on sweepstakes_entries" ON sweepstakes_entries
FOR ALL USING (true);

-- Create analytics_events table (optional, for tracking)
CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_agent TEXT,
  ip_address TEXT,
  metadata JSONB
);

-- Create index for analytics
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(type);

-- Enable RLS for analytics
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policy for analytics
CREATE POLICY "Allow all operations on analytics_events" ON analytics_events
FOR ALL USING (true);

