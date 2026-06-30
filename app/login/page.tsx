export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <main className="loginWrap">
      <section className="card loginCard">
        <div className="logo" style={{ marginBottom: 20 }}>
          <span className="logoMark">CS</span>
          <span>스마트스토어 CS AI</span>
        </div>
        <p className="help">관리자: 0000 / 1234<br />직원: 0001 / 1234</p>
        {searchParams.error && <p className="error">아이디 또는 비밀번호가 맞지 않습니다.</p>}
        <form className="form" style={{ padding: 0 }} action="/api/auth/login" method="post">
          <div><label className="label">아이디</label><input className="input" name="login_id" placeholder="0000" required /></div>
          <div><label className="label">비밀번호</label><input className="input" type="password" name="password" placeholder="1234" required /></div>
          <button className="btn btnPrimary" type="submit">로그인</button>
        </form>
      </section>
    </main>
  );
}
