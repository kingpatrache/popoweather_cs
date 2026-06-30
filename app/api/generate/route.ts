import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

function cut100(text: string) {
  return text.replace(/\s+/g, ' ').trim().slice(0, 100);
}

export async function POST(req: Request) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  const body = await req.json();
  const customerName = String(body.customer_name || '').trim();
  const category = String(body.category || '').trim();
  const productName = String(body.product_name || '').trim();
  const rawNote = String(body.raw_note || '').trim();

  if (!category || !rawNote) return NextResponse.json({ error: '키워드와 직원 메모가 필요합니다.' }, { status: 400 });

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
  const maskedName = customerName ? '{{고객명}}' : '고객님';

  const prompt = `너는 네이버 스마트스토어 CS 담당자다.\n직원의 거친 메모를 고객에게 보낼 정중한 답변으로 바꿔라.\n조건: 한글 100자 이내, 존댓말, 확인 안 된 일정/보상/환불 약속 금지, 바로 붙여넣기 가능한 문장만 출력.\n고객명: ${maskedName}\n키워드: ${category}\n상품명: ${productName || '없음'}\n직원 메모: ${rawNote}`;

  const completion = await openai.responses.create({
    model,
    input: prompt,
    temperature: 0.4,
    store: false
  });

  let answer = cut100(completion.output_text || '');
  if (customerName) answer = answer.replaceAll('{{고객명}}', customerName);

  const supabase = supabaseAdmin();
  const { error } = await supabase.from('cs_records').insert({
    created_by: user.id,
    customer_name: customerName,
    category,
    product_name: productName,
    raw_note: rawNote,
    generated_answer: answer,
    final_answer: answer,
    model_name: model,
    status: '생성 완료'
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ answer });
}
