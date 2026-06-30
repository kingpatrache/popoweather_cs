import { createClient } from '@supabase/supabase-js';

export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY가 없습니다.');
  return createClient(url, key, { auth: { persistSession: false } });
}
