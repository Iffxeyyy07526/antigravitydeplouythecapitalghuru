import { createClient } from '@supabase/supabase-js';

// Use import.meta.env for Vite or fall back to process.env defined in vite.config.ts
const supabaseUrl = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'undefined' && supabaseAnonKey !== 'undefined');

if (!isConfigured) {
  console.error('CRITICAL ERROR: Supabase configuration is missing. Ensure VITE_NEXT_PUBLIC_SUPABASE_URL and VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
}

// Create the client (will fail gracefully if keys are missing/invalid)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);

export const isSupabaseConfigured = isConfigured;
