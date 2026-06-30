# 스마트스토어 CS AI

네이버 스마트스토어 대량 CS 문의를 빠르게 처리하기 위한 내부용 AI 답변 생성 웹앱입니다.

## 기능

- 관리자/직원 로그인
- CS 답변 생성
- 한글 100자 이내 답변
- 전체 생성 기록 자동 저장
- 직원 전체 기록 공유
- 관리자 직원 추가
- 직원 아이디 자동 증가: 0002, 0003...
- 신규 직원 비밀번호: 휴대폰번호 뒷자리

## 사용 색상

- 파랑 `#2563EB`: 신뢰, 안정감
- 초록 `#03C75A`: 네이버/커머스 친화감
- 차콜 `#1F2937`: 전문성, 가독성

## 1. Supabase 설정

1. Supabase 프로젝트를 만듭니다.
2. SQL Editor에 들어갑니다.
3. `supabase/schema.sql` 내용을 붙여넣고 실행합니다.

초기 로그인 정보:

- 관리자: 아이디 `0000`, 비밀번호 `1234`
- 직원 1: 아이디 `0001`, 비밀번호 `1234`

## 2. 환경변수 설정

`.env.example`을 참고해서 `.env.local`을 만듭니다.

```env
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=long-random-secret
```

## 3. 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 4. GitHub에 올리기

```bash
git init
git add .
git commit -m "initial smartstore cs ai app"
git branch -M main
git remote add origin 깃허브_저장소_URL
git push -u origin main
```

## 5. Vercel 배포

1. Vercel에서 GitHub 저장소를 연결합니다.
2. Environment Variables에 `.env.local`과 같은 값을 등록합니다.
3. Deploy 버튼을 누릅니다.

## 주의

- `OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`는 절대 GitHub에 올리면 안 됩니다.
- `1234` 비밀번호는 테스트용입니다. 실제 운영 전에는 꼭 변경하세요.
- 고객명, 문의 내용은 개인정보가 될 수 있으니 외부에 공유하지 마세요.
