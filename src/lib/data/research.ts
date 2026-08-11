export type ResearchStatus = "Ongoing" | "Completed" | "Published";

export interface ResearchProject {
  id: string;
  title: string;
  materialSystem: string;
  objective: string;
  keywords: string[];
  processing: string[];
  characterization: string[];
  keyFindings?: string;
  publicationId?: string;
  status: ResearchStatus;
  relatedSkills: string[];
  affiliation: string;
  period: string;
}

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: "res-cu-ni-si",
    title: "Cu–Ni–Si–Co–Cr–Sn 합금 석출 강화 연구",
    materialSystem: "Cu 합금계",
    objective:
      "다원계 Cu 합금의 시효 처리 조건별 석출물 형성 기구와 강도–전도도 trade-off 최적화",
    keywords: ["Cu 합금", "석출 강화", "시효 처리", "강도", "전기전도도"],
    processing: ["용해 주조", "고온 압연", "고용화 처리", "시효 처리"],
    characterization: ["SEM", "EBSD", "XRD", "TEM", "인장시험", "경도 측정", "전기전도도"],
    keyFindings:
      "최적 시효 조건에서 δ-Ni₂Si 석출물 분포 제어로 고강도(≥700 MPa)·고전도(≥40 %IACS) 동시 달성",
    publicationId: "pub-cu-ni-si-2026",
    status: "Published",
    relatedSkills: ["SEM", "EBSD", "XRD", "TEM", "Cu 합금", "석출 강화", "시효 처리"],
    affiliation: "한국재료연구원",
    period: "2025 – 현재",
  },
  {
    id: "res-cu-tio2",
    title: "Cu–TiO₂ 복합재료 분말야금 제조 및 특성 평가",
    materialSystem: "Cu 복합재료",
    objective:
      "TiO₂ 강화재 첨가에 따른 분말야금 Cu 복합재료의 미세조직 및 기계적·전기적 특성 상관관계 규명",
    keywords: ["Cu 복합재료", "TiO₂", "분말야금", "소결", "전기전도도"],
    processing: ["분말 혼합", "냉간 등방압 성형 (CIP)", "소결", "압연"],
    characterization: ["SEM", "XRD", "경도 측정", "인장시험", "전기전도도"],
    publicationId: "pub-cu-tio2",
    status: "Ongoing",
    relatedSkills: ["SEM", "XRD", "분말야금", "소결", "Cu 복합재료"],
    affiliation: "한국재료연구원",
    period: "2025 – 현재",
  },
  {
    id: "res-tic-skd11",
    title: "TiC–SKD11 공구강 복합재료 SPS 소결 연구",
    materialSystem: "철계 복합재료",
    objective:
      "방전 플라즈마 소결(SPS)로 제조한 TiC 강화 SKD11 공구강 복합재료의 기계적 특성 평가",
    keywords: ["복합재료", "공구강", "TiC", "SPS", "소결"],
    processing: ["분말 혼합", "SPS (방전 플라즈마 소결)"],
    characterization: ["SEM", "XRD", "경도 측정", "굽힘강도"],
    publicationId: "pub-tic-skd11-2018",
    status: "Published",
    relatedSkills: ["SPS", "SEM", "XRD", "복합재료", "공구강"],
    affiliation: "풍산 주식회사",
    period: "2018 – 2019",
  },
];
