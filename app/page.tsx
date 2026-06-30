import Header from '@/components/Header';

const categories = ['품절','재입고','배송 지연','배송 문의','출고 문의','주문 취소','주소 변경','옵션 변경','교환','반품','환불','오배송','상품 불량','사이즈 문의','단순 변심'];

export default function HomePage() {
  return (
    <main className="page"><div className="container"><Header />
      <div className="grid">
        <section className="card form">
          <h2>CS 답변 만들기</h2>
          <div><label className="label">고객명</label><input id="customerName" className="input" placeholder="예: 김민지" /></div>
          <div><label className="label">문의 키워드</label><select id="category" className="select">{categories.map(c => <option key={c}>{c}</option>)}</select></div>
          <div><label className="label">상품명</label><input id="productName" className="input" placeholder="예: 여름 반팔 티셔츠" /></div>
          <div><label className="label">직원 메모</label><textarea id="rawNote" className="textarea" placeholder="예: 아 미안 ㅎㅎ 매진이야" /></div>
          <button id="generateBtn" className="btn btnPrimary">답변 만들기</button>
          <p className="help">답변은 한글 100자 이내로 생성되고, 생성 즉시 자동 저장됩니다.</p>
        </section>
        <section className="card result">
          <span className="badge">생성 결과</span>
          <div id="resultBox" className="resultBox">아직 생성된 답변이 없습니다.</div>
          <div className="actions">
            <button id="copyBtn" className="btn btnGhost">복사하기</button>
            <button id="regenBtn" className="btn btnGhost">다시 만들기</button>
          </div>
        </section>
      </div>
      <script dangerouslySetInnerHTML={{__html: `
        let lastPayload = null;
        async function generate(){
          const payload = {
            customer_name: document.getElementById('customerName').value,
            category: document.getElementById('category').value,
            product_name: document.getElementById('productName').value,
            raw_note: document.getElementById('rawNote').value
          };
          lastPayload = payload;
          const box = document.getElementById('resultBox');
          box.textContent = '답변을 만드는 중입니다...';
          const res = await fetch('/api/generate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
          const data = await res.json();
          box.textContent = data.answer || data.error || '생성 실패';
        }
        document.getElementById('generateBtn').addEventListener('click', generate);
        document.getElementById('regenBtn').addEventListener('click', () => lastPayload ? generate() : null);
        document.getElementById('copyBtn').addEventListener('click', async () => {
          const text = document.getElementById('resultBox').textContent;
          await navigator.clipboard.writeText(text);
          alert('복사되었습니다.');
        });
      `}} />
    </div></main>
  );
}
