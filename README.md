# FE Architecture Lab

## 레이어 규직(초안)

- Service(비훅/IO): fetch, DTO 변환만
- Business Hook: 캐시/동시성/낙관적 업데이트, 도메인 규칙
- ViewModel: 파생값/표현(서버 DTO -> 화면 친화 객체)
- View : 마크업/스타일만, props 사용
- 상태 : 서버 = TanStack Query, UI=Zustand, 파생값=저장금지
- 예외 : 서비스에서 throw, 훅에서 정책(재시도/토스트), 뷰는 표시만
