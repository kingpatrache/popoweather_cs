import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

function nextLoginId(users: { login_id: string }[]) {
  const nums = users.map(u => Number(u.login_id)).filter(n => !Number.isNaN(n));
  const max = Math.max(0, ...nums);
  return String(max + 1).padStart(4, '0');
}

export async function POST(req: Request) {
  const session = await getSession();
  if (session?.role !== 'admin') return NextResponse.json({ error: '관리자만 가능합니다.' }, { status: 403 });
  const form = await req.formData();
  const display_name = String(form.get('display_name') || '').trim();
  const phone_last4 = String(form.get('phone_last4') || '').trim();
  if (!display_name || !/^\d{4}$/.test(phone_last4)) return NextResponse.json({ error: '이름과 휴대폰 뒷자리 4자리가 필요합니다.' }, { status: 400 });

  const supabase = supabaseAdmin();
  const { data: users } = await supabase.from('app_users').select('login_id');
  const login_id = nextLoginId(users || []);
  const password_hash = await bcrypt.hash(phone_last4, 10);
  await supabase.from('app_users').insert({ login_id, display_name, role: 'staff', password_hash, is_active: true });
  return NextResponse.redirect(new URL('/admin/users', req.url));
}
