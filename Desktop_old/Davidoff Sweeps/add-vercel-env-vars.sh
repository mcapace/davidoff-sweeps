#!/bin/bash

# Add Supabase environment variables to Vercel
# Project: davidoff-sweeps
# Supabase Project ID: mkwheoemyraxihpcvptn

echo "Adding Supabase environment variables to Vercel..."
echo ""

# Supabase URL
SUPABASE_URL="https://mkwheoemyraxihpcvptn.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rd2hlb2VteXJheGlocGN2cHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjcyNTUsImV4cCI6MjA3Nzg0MzI1NX0.U6FzuldS2uP2i8PcXB3wzhn1RhsDdNWgCbv29p3L4O8"

echo "Step 1: Adding SUPABASE_URL..."
echo "$SUPABASE_URL" | vercel env add SUPABASE_URL production preview development

echo ""
echo "Step 2: Adding SUPABASE_ANON_KEY..."
echo "$SUPABASE_ANON_KEY" | vercel env add SUPABASE_ANON_KEY production preview development

echo ""
echo "Step 3: Adding NEXT_PUBLIC_SUPABASE_URL (for client-side if needed)..."
echo "$SUPABASE_URL" | vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development

echo ""
echo "Step 4: Adding NEXT_PUBLIC_SUPABASE_ANON_KEY (for client-side if needed)..."
echo "$SUPABASE_ANON_KEY" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development

echo ""
echo "✅ Environment variables added!"
echo ""
echo "⚠️  IMPORTANT: You must redeploy for these to take effect!"
echo "   Option 1: Go to Vercel dashboard → Deployments → Redeploy"
echo "   Option 2: Push a new commit to trigger a new deployment"
