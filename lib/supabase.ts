import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export function createClient() {
  let supabaseUrl = process.env.SUPABASE_URL;
  let supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;
  
  if (!supabaseUrl) {
    supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  }
  if (!supabaseKey) {
    supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  }
  
  if (!supabaseUrl) {
    supabaseUrl = 'https://mkwheoemyraxihpcvptn.supabase.co';
  }

  if (!supabaseUrl) {
    console.error('[ERROR] Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL');
    throw new Error('Supabase not configured: Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL environment variable');
  }

  if (!supabaseKey) {
    console.error('[ERROR] Missing SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    throw new Error('Supabase not configured: Missing SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
  }

  console.log('[INFO] Supabase client initialized with URL:', supabaseUrl);
  console.log('[INFO] Supabase key exists:', !!supabaseKey);

  return createSupabaseClient(supabaseUrl, supabaseKey);
}
