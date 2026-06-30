import Link from 'next/link';
import { getSession } from '@/lib/session';

export default async function Header() {
  const user = await getSession();
  return (
    <div className="header">
      <Link href="/" className="logo">
        <span className="logoMark">CS</span>
        <span>스마트스토어 CS AI</span>
      </Link>
      <div className="nav">
        <Link href="/">답변 생성</Link>
        <Link href="/records">기록</Link>
        {user?.role === 'admin' && <Link className="primary" href="/admin/users">직원 관리</Link>}
        <form action="/api/auth/logout" method="post"><button type="submit">로그아웃</button></form>
      </div>
    </div>
  );
}
