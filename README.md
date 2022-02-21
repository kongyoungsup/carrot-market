# Getting Started

## REACT 18rc 버젼 설치

npm i next@latest react@rc react-dom@rc

## git

https://github.com/kongyoungsup/carrot-market.git

## Tailwind CSS설치 및 초기화 (postcss, autoprefixer)

npm install -D tailwindcss postcss autoprefixer

### 초기화

npx tailwindcss init -p

### 파일 수정

1. tailwind.config.js
<!-- module.exports = {
      content: [     //## page 폴더 / **(모든폴더) / *.{(사용할 파일)})
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}"
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }; -->

2. styles/globals.css - 삽입
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

## PRISMA 설치 & 셋팅

### prisma, vscode 익스텐션 설치

### npm 설치

<!-- 설치: npm i prisma -D (Developer Dependency) -->

npm i prisma -D

<!-- Prisma CLI를 호출 -->

npx prisma

<!-- Prisma 스키마 파일 템플릿을 생성하여 Prisma 프로젝트를 설정 -->

npx prisma init
// 루트 디렉터리에 .env파일 을 만듭니다.
// prisma이라는 파일을 포함하는 이라는 새 디렉토리를 생성

1. .env 파일의 DATABASE_URL이 기존 데이터베이스를 가리키도록 설정합니다.
2. schema.prisma의 datasource 의 provider를 공급자 데이터베이스와 일치하도록 설정합니다(postgresql, mysql, sqlite, sqlserver 또는 mongodb).
3. prisma db pull을 실행하여 데이터베이스 스키마를 Prisma 스키마로 전환합니다.
4. Prisma generate를 실행하여 Prisma 클라이언트를 생성합니다. 그런 다음 데이터베이스 쿼리를 시작할 수 있습니다.

## planet scale cli 설치

local@ brew install planetscale/tap/pscale

local@ brew install mysql-client

  <!-- // pscale is a CLI library 설치 확인 -->

pscale

  <!-- // 로그인 -->

pscale auth login

  <!-- // 리전 리스트 확인 -->

pscale region list

  <!-- // 데이터베이스 생성 -->

pscale database create carrot-market --region ap-northeast

  <!-- // ** 데이터 베이스 연결 (실시간으로 커넥팅 시켜둬야함) -->

pscale connect carrot-market

## Planet scale & Prisma 동기화

  <!-- // prisma 데이터베이스 연동 .env 파일 수정 -->

DATABASE_URL="mysql://127.0.0.1:3306/carrot-market"

  <!-- // schema.prisma 파일의 스키마를 planetScale 서버에 동기화 -->

npx prisma db push

  <!-- // ** prisma studio 열기 -->

npx prisma studio

  <!-- // prisma client 설치 -->

npm i @prisma/client

- libs > clients.ts 파일에 임포트

<!-- // 코드에서 Prisma Client 자동완성기능 -->

npx prisma generate

- to ./node_modules/@prisma/client

## react-hook-form 설치

- npm install react-hook-form --legacy-peer-deps

## 절대 경로 만들기

- tsconfig.json (compilerOptions) 추가
  "paths": {
  "@libs/_": ["libs/_"],
  "@components/_": ["components/_"],
  }

  pscale branch promote carrot-market main

  pscale deploy-request create carrot-market main

## Twillo 만들기 (mms) \*비번 x2

1. 회원가입
2. 키 받아오기..
   twilio_SID="ACf5b2d08b6ef6cdfcddd07545582e0a26"
   twilio_TOKEN="092ea3d5093d14a61657cd4ca26705de"
   twilio_MMS_SID="MGe62a08e0869fdfbd5ffdf984fc304567"
3. 라이브러리 설치

- $ npm install twilio

## sendgrid (email)

- 회원가입이 안됨..ㅅㅂ
- nodemailer로 대체 함

## iron-session (쿠키 저장)

- npm add iron-session
- 세션 기간은 기본적으로 14일
- libs/server/withSession.tsx
- api/users/enter.tsx
- api/users/confirm.tsx
- api/users/me.tsx

## https://next-auth.js.org/ 사용자 인증 라이브러리.. 한번써볼것

## API 인증 핸들러 만들기(libs>server)

- withHandler.tsx 를 수정.. 페이지별로 로그인된 사용자를 구분

## 캐시에 유저 인증 데이터 저장하기

- libs/client/useUser.ts
- 로그인 하지 않았다면 login 페이지로 이동
- 캐싱시스템

## !SWR

- npm install swr --legacy-peer-deps //reacr 18 베타버젼일 경우..
- libs/client/useUser.ts
- 전역설정: app.js (SWRConfig)