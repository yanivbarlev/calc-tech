import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase client. Uses the service_role key, which bypasses RLS.
// NEVER import this from a "use client" component.

let cached: SupabaseClient | null = null;

export function getServerSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
