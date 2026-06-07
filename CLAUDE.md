# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙
- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## 프로젝트 개요
개발자 웹 이력서(포트폴리오) 웹사이트 개발 프로젝트입니다. 순수 HTML, CSS, JavaScript와 TailwindCSS를 사용하여 반응형 웹사이트를 구축합니다.

## 기술 스택
- **HTML5**: 시맨틱 마크업 구조
- **CSS3**: 스타일링 및 애니메이션
- **JavaScript (ES6+)**: 인터랙티브 기능 구현
- **TailwindCSS**: 유틸리티 기반 스타일링 프레임워크

## 프로젝트 구조
```
portfolio-resume/
├── index.html          # 메인 HTML 파일
├── css/
│   ├── style.css      # 커스텀 CSS 스타일
│   └── tailwind.css   # Tailwind 설정
├── js/
│   └── main.js        # JavaScript 기능 구현
├── assets/
│   ├── images/        # 프로필 사진, 프로젝트 이미지
│   └── icons/         # 아이콘 파일
└── README.md          # 프로젝트 문서
```

## 개발 명령어
현재 순수 HTML/CSS/JavaScript 프로젝트로 별도의 빌드 도구가 없습니다.

### TailwindCSS 설정 (추후 설정 시)
```bash
# TailwindCSS CDN 사용 또는 npm 설치
npm init -y
npm install -D tailwindcss
npx tailwindcss init

# CSS 빌드 (watch 모드)
npx tailwindcss -i ./css/tailwind.css -o ./css/output.css --watch
```

### 개발 서버 실행
```bash
# Python 사용 시
python -m http.server 8000

# Node.js live-server 사용 시
npx live-server

# VS Code Live Server 확장 사용 권장
```

## 주요 섹션 구성
1. **Header**: 네비게이션 메뉴 및 개인정보
2. **Hero Section**: 프로필 이미지와 간단한 소개
3. **About Section**: 상세 자기소개
4. **Skills Section**: 기술 스택 및 숙련도
5. **Experience Section**: 경력 사항
6. **Projects Section**: 포트폴리오 프로젝트
7. **Education Section**: 학력 정보
8. **Contact Section**: 연락처 정보
9. **Footer**: 저작권 및 추가 링크

## 코딩 규칙

### HTML
- 시맨틱 태그 사용 (header, nav, main, section, article, footer)
- BEM 방법론을 따른 클래스 네이밍
- 접근성을 위한 ARIA 레이블 포함

### CSS/TailwindCSS
- 모바일 우선 반응형 디자인
- TailwindCSS 유틸리티 클래스 우선 사용
- 커스텀 스타일은 style.css에 작성
- CSS 변수를 활용한 테마 관리

### JavaScript
- ES6+ 문법 사용
- 모듈 패턴으로 코드 구조화
- 이벤트 위임 활용
- 성능을 위한 디바운싱/쓰로틀링 적용

## 성능 목표
- Lighthouse 성능 점수: 90+
- 첫 화면 로딩 시간: 3초 이내
- SEO 점수: 90+
- 접근성 점수: 85+

## 반응형 브레이크포인트
- 모바일: < 768px
- 태블릿: 768px - 1024px  
- 데스크톱: > 1024px

## Git 워크플로우
```bash
# 기능 개발
git checkout -b feature/기능명
git add .
git commit -m "기능: 설명"

# 버그 수정
git checkout -b fix/버그명
git add .
git commit -m "수정: 설명"

# 문서 업데이트
git add .
git commit -m "문서: 설명"
```

## 배포
- GitHub Pages 기본 배포
- 대안: Netlify, Vercel

## 테스트
- 크로스 브라우저 테스트 (Chrome, Firefox, Safari, Edge)
- 다양한 디바이스에서 반응형 테스트
- Lighthouse를 통한 성능 측정
- Wave 도구를 통한 접근성 검사

# 추가 지침
- git 워크플로우 @docs/git-instructions.md
- 변수명, 함수명은 카멜케이스 규칙을 사용하세요.



2칸 들여쓰기, React 컴포넌트는 PascalCase, API 호출은 async/await, 에러는 try-catch, 테스트는 Jest 사용

# 코딩 스타일
- 들여쓰기: 2칸 스페이스
- 따옴표: 작은따옴표 사용

# React 규칙
- 컴포넌트명: PascalCase (예: UserProfile)
- Props명: camelCase (예: userName)

# 비동기 처리
- API 호출: async/await 패턴 사용
- 에러 처리: try-catch 블록 필수

# 테스팅
- 테스트 도구: Jest 사용
- 테스트 파일: .test.js 확장자