# 스마트스토어 CS AI

네이버 스마트스토어 판매자용 CS 답변 생성 웹앱입니다.

## 기능

- 관리자/직원 로그인
- 관리자 아이디: `0000`, 비밀번호: `1234`
- 첫 직원 아이디: `0001`, 비밀번호: `1234`
- 추가 직원 아이디 자동 증가: `0002`, `0003`...
- 추가 직원 비밀번호: 휴대폰번호 뒷자리 4자리
- CS 답변 100자 이내 생성
- 생성 기록 전체 자동 저장
- 전체 직원 기록 공유

## 색상

신뢰감을 주는 3개 중심 색상만 사용합니다.

- 파랑: 주요 버튼, 핵심 액션
- 초록: 완료/성공 상태
- 흰색/밝은 회색: 배경과 카드

## 설치

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Supabase 설정

1. Supabase 프로젝트 생성
2. SQL Editor 열기
3. `supabase/schema.sql` 내용을 복사해서 실행
4. 프로젝트 URL과 Service Role Key를 `.env.local`에 입력

## OpenAI 설정

`.env.local`에 API 키를 넣습니다.

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
```

## Vercel 배포

1. GitHub에 이 폴더 업로드
2. Vercel에서 GitHub 저장소 연결
3. Environment Variables에 `.env.example`의 값을 입력
4. Deploy 클릭

## 운영 주의

`1234` 비밀번호는 테스트용입니다. 실제 운영 전에는 관리자 비밀번호 변경 기능을 추가하거나 초기 비밀번호를 바꾸세요.
