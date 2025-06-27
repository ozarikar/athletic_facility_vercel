// lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Add these logs for debugging on Vercel
console.log('[supabaseClient] Initializing...');
console.log('[supabaseClient] process.env.SUPABASE_URL is:', process.env.SUPABASE_URL);
console.log('[supabaseClient] process.env.SUPABASE_ANON_KEY is set:', !!process.env.SUPABASE_ANON_KEY);

// Use the new server-side variables. The NEXT_PUBLIC_ ones can be a fallback.
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  // Update the error message to be more precise
  throw new Error('Missing Supabase URL. Set SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL in environment variables.');
}
if (!supabaseAnonKey) {
  throw new Error('Missing Supabase Anon Key. Set SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);