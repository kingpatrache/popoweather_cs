import Header from '@/components/Header';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export default async function UsersPage() {
  const user = await getSession();
  if (user?.role !== 'admin') redirect('/');
  const supabase = supabaseAdmin();
  const { data } = await supabase.from('app_users').select('id, login_id, display_name, role, is_active, created_at').order('login_id');
  return (
    <main className="page"><div className="container"><Header />
      <div className="grid">
        <section className="card form">
          <h2>직원 추가</h2>
          <form className="form" style={{ padding: 0 }} action="/api/admin/users" method="post">
            <div><label className="label">직원 이름</label><input className="input" name="display_name" placeholder="예: 박지은" required /></div>
            <div><label className="label">휴대폰 뒷자리</label><input className="input" name="phone_last4" placeholder="예: 5678" maxLength={4} required /></div>
            <button className="btn btnPrimary" type="submit">직원 아이디 자동 생성</button>
          </form>
          <p className="help">새 직원 아이디는 0002, 0003처럼 자동으로 1씩 증가합니다.</p>
        </section>
        <section className="card" style={{ padding: 24 }}>
          <h2>직원 목록</h2>
          <div className="tableWrap"><table><thead><tr><th>아이디</th><th>이름</th><th>권한</th><th>상태</th></tr></thead><tbody>
            {(data || []).map((u: any) => <tr key={u.id}><td>{u.login_id}</td><td>{u.display_name}</td><td>{u.role}</td><td>{u.is_active ? '사용중' : '정지'}</td></tr>)}
          </tbody></table></div>
        </section>
      </div>
    </div></main>
  );
}
