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
    title: "Cu–Ni–Si–Co–Cr–Sn 합금 고용화 처리 및 시효 거동 연구",
    materialSystem: "Cu 합금계",
    objective:
      "고용화 처리 온도가 Cu–Ni–Si–Co–Cr–Sn 합금의 냉간 압연 가공 경화 및 시효 거동에 미치는 영향 규명",
    keywords: ["Cu–Ni–Si 합금", "고용화 처리", "냉간 압연", "가공 경화", "석출 경화"],
    processing: ["용해 주조", "고용화 처리", "냉간 압연", "시효 처리"],
    characterization: ["SEM", "EBSD", "XRD", "TEM", "인장시험", "경도 측정", "전기전도도"],
    keyFindings:
      "고용화 처리 온도에 따른 가공 경화 거동 및 시효 후 석출물 분포 차이 규명",
    publicationId: "pub-cu-ni-si-2026",
    status: "Published",
    relatedSkills: ["SEM", "EBSD", "XRD", "TEM", "Cu 합금", "석출 강화", "시효 처리"],
    affiliation: "한국재료연구원",
    period: "2025 – 현재",
  },
  {
    id: "res-cu-tio2",
    title: "Cu–TiO₂ 복합재료 In-situ 내부산화 제조 및 특성 평가",
    materialSystem: "Cu 복합재료",
    objective:
      "In-situ 내부산화법으로 제조한 Cu–TiO₂ 복합재료의 미세조직 및 기계적·전기적 특성 상관관계 규명",
    keywords: ["Cu 복합재료", "TiO₂", "내부산화", "In-situ", "전기전도도"],
    processing: ["Cu-Ti 합금 용해 주조", "In-situ 내부산화", "압연"],
    characterization: ["SEM", "XRD", "경도 측정", "인장시험", "전기전도도"],
    publicationId: "pub-cu-tio2",
    status: "Ongoing",
    relatedSkills: ["SEM", "XRD", "내부산화", "Cu 복합재료"],
    affiliation: "한국재료연구원",
    period: "2025 – 현재",
  },
  {
    id: "res-tic-skd11",
    title: "TiC 강화 SKD11 강 기지 복합재료 뜨임 거동 연구",
    materialSystem: "철계 복합재료",
    objective:
      "가압함침주조로 제조한 TiC 강화 SKD11 강 기지 복합재료의 뜨임 온도에 따른 경도 변화 및 MC 탄화물 재분포 기구 규명",
    keywords: ["TiC", "강 기지 복합재료", "뜨임 거동", "가압함침주조"],
    processing: ["TiC 예비성형체 제조", "가압함침주조 (Pressure Infiltration Casting)"],
    characterization: ["SEM", "TEM-EDS", "XRD", "경도 측정"],
    publicationId: "pub-tic-skd11-2018",
    status: "Published",
    relatedSkills: ["용융가압함침", "SEM", "XRD", "복합재료", "공구강"],
    affiliation: "풍산 주식회사",
    period: "2018 – 2019",
  },
];
