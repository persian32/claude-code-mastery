# TODO 앱 개발 진행 계획

> 기술 스택: 순수 HTML/CSS/JS + TailwindCSS | 데이터 저장: localStorage

## 프로젝트 구조
```
todo-app/
├── index.html          # 메인 마크업
├── css/
│   └── style.css       # Tailwind로 부족한 커스텀 스타일
├── js/
│   ├── main.js         # 앱 초기화, 이벤트 위임
│   ├── store.js        # localStorage 읽기/쓰기 (데이터 계층)
│   ├── render.js       # DOM 렌더링 (뷰 계층)
│   └── filter.js       # 필터/정렬 로직
└── README.md
```

## 데이터 모델
```js
{
  id: 'uuid',          // crypto.randomUUID()
  title: '할 일 제목',
  done: false,         // 완료 여부
  category: '업무',    // 카테고리
  tags: ['긴급'],      // 태그 배열
  priority: 'high',    // high | medium | low
  dueDate: '2026-06-10',
  createdAt: 1234567890
}
```

## 개발 단계 체크리스트

- [x] **1단계** — HTML 골격 + Tailwind CDN 연결
- [ ] **2단계** — `store.js`: localStorage CRUD 함수
- [ ] **3단계** — `render.js`: 목록 렌더링
- [ ] **4단계** — 추가/완료/삭제 기본 동작 연결 (이벤트 위임)
- [ ] **5단계** — 카테고리·태그·마감일·우선순위 입력 확장
- [ ] **6단계** — `filter.js`: 필터·정렬·검색 (검색 디바운싱)
- [ ] **7단계** — 반응형 + 접근성(ARIA, 키보드) + 스타일 다듬기
- [ ] **8단계** — README 작성

## 기능 범위

| 기능 | 세부 내용 |
|------|-----------|
| 기본 CRUD | 추가 · 완료 토글 · 인라인 수정 · 삭제 |
| 필터 | 상태(전체/진행중/완료), 카테고리, 태그 |
| 정렬 | 마감일순, 우선순위순, 생성일순 |
| 카테고리/태그 | 입력 시 지정, 태그별 칩 표시 |
| 마감일·우선순위 | 날짜 선택, 우선순위 색상 배지, 마감 임박/초과 강조 |

## 코딩 규칙 (CLAUDE.md 준수)
- 들여쓰기 2칸 스페이스, 작은따옴표 사용
- 변수명·함수명 카멜케이스
- 이벤트 위임 활용
- 모바일 우선 반응형 (< 768px 단일 컬럼)
