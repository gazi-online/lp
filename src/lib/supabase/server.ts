import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseServerKey = serviceRoleKey;
const keySource = serviceRoleKey ? "service_role" : "missing";

const configError = !supabaseUrl || !supabaseServerKey
  ? "Missing Supabase config. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
  : null;

export const getSupabaseServer = () => {
  if (configError || !supabaseUrl || !supabaseServerKey) {
    return { client: null, error: configError, keySource, url: supabaseUrl ?? null };
  }

  const client = createClient(supabaseUrl, supabaseServerKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return { client, error: null, keySource, url: supabaseUrl };
};
