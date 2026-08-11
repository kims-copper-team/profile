export type CareerCategory = "Industry" | "Startup" | "Research";

export interface CareerEntry {
  id: string;
  company: string;
  companyEn?: string;
  role: string;
  category: CareerCategory;
  startYear: number;
  startMonth: number;
  endYear: number | null;
  endMonth: number | null;
  description: string[];
  achievements?: string[];
  lane: number; // 0 = main, 1 = parallel (for overlapping periods)
}

export interface CareerEvent {
  year: number;
  month: number;
  type: "award" | "cert" | "publication";
  label: string;
}

export const CAREER_ENTRIES: CareerEntry[] = [
  {
    id: "poongsan",
    company: "풍산 주식회사",
    companyEn: "Poongsan Corporation",
    role: "연구원",
    category: "Industry",
    startYear: 2018,
    startMonth: 3,
    endYear: 2019,
    endMonth: 12,
    description: [
      "구리 합금 소재 연구개발 (Cu-Cr, Cu-Zr 계열)",
      "신선·압연 공정 최적화 연구",
      "재료 물성 평가 (인장강도, 경도, 전기전도도)",
    ],
    lane: 0,
  },
  {
    id: "dagochyeo",
    company: "(주)다고쳐",
    companyEn: "DAGOCHYEO",
    role: "팀원",
    category: "Startup",
    startYear: 2020,
    startMonth: 1,
    endYear: 2021,
    endMonth: 6,
    description: [
      "생활 수리 서비스 O2O 플랫폼 스타트업 팀원",
      "사업 운영 지원 및 고객 발굴(B2C) 참여",
      "서비스 모델 검토 및 운영 프로세스 개선",
    ],
    lane: 0,
  },
  {
    id: "sellwave",
    company: "SELLWAVE",
    companyEn: "SELLWAVE",
    role: "창업자 / CEO",
    category: "Startup",
    startYear: 2021,
    startMonth: 7,
    endYear: 2025,
    endMonth: 4,
    description: [
      "AI 기반 음향 방출(Acoustic Emission) 균열 감지 기술 창업",
      "딥러닝 음향 신호 분류 모델 개발 (BERT 아키텍처 응용)",
      "MVP 개발 → 투자 유치 → 양산 시제품 제작",
      "특허 출원 및 기술 사업화",
    ],
    achievements: [
      "정부 지원 과제 수주 (중소기업부, 과기부)",
    ],
    lane: 0,
  },
  {
    id: "buildingmon",
    company: "(주)빌딩몬",
    companyEn: "BUILDINGMON",
    role: "창업자",
    category: "Startup",
    startYear: 2023,
    startMonth: 3,
    endYear: 2024,
    endMonth: 9,
    description: [
      "IoT 기반 건물 구조 건전성 모니터링 플랫폼 공동 창업",
      "진동·가속도 센서 데이터 처리 시스템 설계",
      "PoC 수행 및 고객사 실증 테스트",
      "BERT 기반 텍스트 분류로 이상 리포트 자동화",
    ],
    lane: 1, // overlaps with SELLWAVE
  },
  {
    id: "kims",
    company: "한국재료연구원",
    companyEn: "KIMS (Korea Institute of Materials Science)",
    role: "위촉연구원 (Post-Master Researcher)",
    category: "Research",
    startYear: 2025,
    startMonth: 3,
    endYear: null,
    endMonth: null,
    description: [
      "Cu 합금 석출 강화 기구 연구 (Cu–Ni–Si–Co–Cr–Sn 계열)",
      "SEM/EBSD/XRD/TEM 분석을 통한 미세조직 평가",
      "GPR-ARD(가우시안 프로세스 회귀) 적용 재료 물성 예측",
      "AI 기반 합금 조성 최적화 연구",
    ],
    lane: 0,
  },
];

export const CAREER_EVENTS: CareerEvent[] = [
  { year: 2022, month: 6,  type: "award",       label: "수상 1건" },
  { year: 2023, month: 4,  type: "cert",        label: "자격증 1건" },
  { year: 2024, month: 3,  type: "award",       label: "수상 1건" },
];
