export const careerData = [
  {
    id: "proj-1",
    title: "B2B SaaS 통합 관리 플랫폼",
    company: "테크스타트업 주식회사",
    period: "2023.03 – 2024.06",
    role: "시니어 프론트엔드 개발자 / 프론트엔드 리드",
    teamSize: "개발 6명 (FE 3, BE 2, DevOps 1)",
    overview:
      "중소기업 대상 인사/급여/회계를 통합 관리하는 SaaS 플랫폼. 월 활성 사용자 5,000명 이상 서비스.",
    techStack: ["Next.js 14", "TypeScript", "React Query", "Tailwind CSS", "Zustand", "Storybook"],
    responsibilities: [
      "프론트엔드 아키텍처 설계 및 기술 스택 선정",
      "디자인 시스템 및 공통 컴포넌트 라이브러리 구축 (50+ 컴포넌트)",
      "무한 스크롤, 가상 스크롤 적용으로 대용량 데이터 렌더링 성능 개선",
      "CI/CD 파이프라인 구축 (GitHub Actions + Vercel)",
    ],
    achievements: [
      "페이지 로드 타임 3.2초 → 1.1초로 66% 단축",
      "Lighthouse 성능 점수 58점 → 92점 개선",
      "디자인 시스템 도입으로 신규 화면 개발 속도 40% 향상",
      "QA 버그 발생률 35% 감소",
    ],
    challenges:
      "대용량 엑셀 데이터(10만 행+)를 브라우저에서 렌더링할 때 심각한 성능 저하 문제가 있었습니다. 가상 스크롤(react-virtualized)과 Web Worker를 활용한 오프스레드 파싱으로 해결했습니다.",
  },
  {
    id: "proj-2",
    title: "실시간 물류 추적 대시보드",
    company: "테크스타트업 주식회사",
    period: "2022.01 – 2023.02",
    role: "풀스택 개발자",
    teamSize: "개발 4명 (FE 2, BE 2)",
    overview:
      "전국 물류 차량의 실시간 위치 및 배송 상태를 모니터링하는 관리자 대시보드. WebSocket 기반 실시간 데이터 처리.",
    techStack: ["React", "TypeScript", "Kakao Maps API", "Socket.io", "Node.js", "Redis"],
    responsibilities: [
      "Kakao Maps API 연동 실시간 차량 위치 시각화",
      "Socket.io 기반 WebSocket 통신 구현",
      "Redis Pub/Sub를 활용한 실시간 이벤트 처리",
      "차트 라이브러리(Recharts) 커스터마이징으로 배송 통계 시각화",
    ],
    achievements: [
      "동시 접속자 200명 환경에서 안정적 실시간 데이터 처리",
      "배송 현황 조회 시간 기존 수동 전화 확인 대비 90% 단축",
      "관리자 업무 효율 30% 향상 (사용자 설문 기준)",
    ],
    challenges:
      "초기에 WebSocket 연결이 불안정하여 데이터 유실 문제가 발생했습니다. 지수 백오프 재연결 로직과 Redis Pub/Sub로 메시지 큐를 구성해 안정성을 확보했습니다.",
  },
  {
    id: "proj-3",
    title: "전사 내부 개발자 도구 포털",
    company: "(주) 이노베이션",
    period: "2021.06 – 2021.12",
    role: "풀스택 개발자",
    teamSize: "개발 3명",
    overview:
      "사내 API 문서, 코드 스니펫, 배포 현황을 통합 관리하는 개발자 포털. 개발팀 내부 생산성 향상 목적.",
    techStack: ["Vue.js 3", "Node.js", "Express", "PostgreSQL", "Docker"],
    responsibilities: [
      "Vue.js 3 Composition API 기반 SPA 개발",
      "마크다운 렌더링 기반 API 문서 뷰어 구현",
      "Docker Compose를 활용한 개발/운영 환경 통일",
      "사용자 인증/권한 관리 모듈 개발",
    ],
    achievements: [
      "개발팀 30명이 일 평균 15회 이상 활용하는 핵심 도구로 정착",
      "API 문서 검색 시간 평균 10분 → 1분으로 90% 단축",
    ],
    challenges:
      "팀원마다 개발 환경이 달라 '내 로컬에선 되는데' 이슈가 잦았습니다. Docker Compose로 환경을 표준화하고 README에 셋업 가이드를 상세히 작성해 온보딩 시간을 1주 → 1일로 단축했습니다.",
  },
];
