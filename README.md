# 개발자 웹 이력서 (포트폴리오)

[`ROADMAP.md`](./ROADMAP.md)에 정의된 반응형 개발자 웹 이력서입니다.
**빌드 도구 없이** HTML5 + CSS3 + 바닐라 JavaScript + TailwindCSS(CDN)로 구현했습니다.

## ✨ 주요 기능

- 📱 **반응형** — 모바일 / 태블릿 / 데스크톱 대응
- 🌙 **다크모드** — 토글 + `localStorage` 저장 + 시스템 설정 자동 감지
- ⌨️ **타이핑 효과** — Hero 섹션 문구 자동 타이핑
- 📊 **스킬 프로그레스 바** — 스크롤 진입 시 애니메이션
- 🎬 **스크롤 reveal** — 섹션 등장 애니메이션 (IntersectionObserver)
- 🗂 **프로젝트 필터링 + 모달** — 카테고리 필터, 카드 클릭 상세 모달(포커스 트랩)
- 🔗 **SNS 섹션** — GitHub / LinkedIn / Twitter(X) / Instagram / Blog / Email
- ✅ **연락 폼 검증** — 이름·이메일·메시지 유효성 검사 (mailto 전송)
- ♿ **접근성** — 시맨틱 마크업, ARIA, 스킵 링크, 키보드 내비, `prefers-reduced-motion`
- 🔍 **SEO** — 메타 태그, Open Graph / Twitter 카드, JSON-LD 구조화 데이터

## 📁 구조

```
.
├── index.html       # 단일 페이지 (모든 섹션)
├── css/style.css    # 커스텀 스타일 / 애니메이션
├── js/main.js       # 인터랙션 로직
├── assets/
│   ├── images/      # 프로필 · 프로젝트 이미지 (현재 picsum placeholder)
│   └── icons/       # 아이콘 (현재 인라인 SVG 사용)
├── ROADMAP.md       # 프로젝트 로드맵
└── README.md
```

## 🚀 실행

빌드/설치 과정 없이 바로 동작합니다.

```bash
# 방법 1: 파일을 브라우저로 바로 열기
open index.html

# 방법 2: 로컬 서버로 서빙 (권장 — 상대경로/모듈 안정적)
python3 -m http.server 8000
# → http://localhost:8000 접속
```

> TailwindCSS는 CDN으로 로드되므로 **인터넷 연결이 필요**합니다.

## ✏️ 콘텐츠 수정 가이드

모든 콘텐츠는 현재 로드맵 예시 데이터(홍길동)로 채워져 있습니다. 아래 위치를 수정하세요.

| 항목 | 위치 |
| --- | --- |
| 이름 / 직책 / 소개 | `index.html` — Hero, About 섹션 |
| 타이핑 문구 | `js/main.js` — `initTyping()`의 `phrases` 배열 |
| 스킬 / 퍼센트 | `index.html` — Skills 섹션 `data-percent` |
| 경력 | `index.html` — Experience 섹션 |
| 프로젝트 | `index.html` — `.project-card`의 `data-*` 속성 |
| 학력 | `index.html` — Education 섹션 |
| **SNS 링크** | `index.html` — `#connect` 섹션 및 Footer의 `href` |
| 프로필/프로젝트 이미지 | `assets/images/`에 추가 후 `src` 경로 교체 (현재 `picsum.photos`) |
| SEO 메타 / OG | `index.html` `<head>` |

## 🌐 배포

정적 사이트이므로 어디서나 배포 가능합니다.

- **GitHub Pages**: 저장소 Settings → Pages → 브랜치 지정
- **Netlify / Vercel**: 저장소 연결 후 빌드 명령 없이 루트 배포

## 🎯 성공 지표 (로드맵 기준)

- Lighthouse 성능 90+ / SEO 90+ / 접근성 85+
- 로딩 3초 이내, 모바일 반응형 완벽 지원
