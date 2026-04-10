import { createClient } from '@supabase/supabase-js';

// Use import.meta.env for Vite or fall back to process.env defined in vite.config.ts
const supabaseUrl = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'undefined' && supabaseAnonKey !== 'undefined';

if (!isConfigured) {
  console.error('Supabase configuration is missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in the Secrets panel.');
}

// Create a dummy client if not configured to prevent crashes, 
// but we'll check isConfigured before making calls.
export const supabase = createClient(
  supabaseUrl || 'https://jhzknnbzwvzzetodkbnt.supabase.co', 
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoemtubmJ6d3Z6emV0b2RrYm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NjcwMDIsImV4cCI6MjA5MTI0MzAwMn0.ImvDjOaYpUwVr_oSwStsA-WddViIXjEtnwansy99vo0'
);

export const isSupabaseConfigured = !!isConfigured;
