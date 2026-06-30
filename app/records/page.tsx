import Header from '@/components/Header';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export default async function RecordsPage() {
  const supabase = supabaseAdmin();
  const { data } = await supabase
    .from('cs_records_view')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);
  return (
    <main className="page"><div className="container"><Header />
      <section className="card" style={{ padding: 24 }}>
        <h2>CS 생성 기록</h2>
        <p className="help">최근 200개 기록입니다. 모든 직원이 함께 확인할 수 있습니다.</p>
        <div className="tableWrap"><table><thead><tr><th>시간</th><th>작성자</th><th>고객</th><th>키워드</th><th>상품</th><th>메모</th><th>답변</th></tr></thead>
          <tbody>{(data || []).map((r: any) => <tr key={r.id}>
            <td>{new Date(r.created_at).toLocaleString('ko-KR')}</td><td>{r.display_name}</td><td>{r.customer_name}</td><td>{r.category}</td><td>{r.product_name}</td><td>{r.raw_note}</td><td>{r.final_answer}</td>
          </tr>)}</tbody></table></div>
      </section>
    </div></main>
  );
}
