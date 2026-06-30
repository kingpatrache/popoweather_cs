import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { createSession } from '@/lib/session';

export async function POST(req: Request) {
  const form = await req.formData();
  const login_id = String(form.get('login_id') || '').trim();
  const password = String(form.get('password') || '').trim();

  const supabase = supabaseAdmin();
  const { data: user } = await supabase
    .from('app_users')
    .select('id, login_id, display_name, role, password_hash, is_active')
    .eq('login_id', login_id)
    .single();

  if (!user || !user.is_active) return NextResponse.redirect(new URL('/login?error=1', req.url));
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return NextResponse.redirect(new URL('/login?error=1', req.url));

  await createSession({ id: user.id, login_id: user.login_id, display_name: user.display_name, role: user.role });
  return NextResponse.redirect(new URL('/', req.url));
}
