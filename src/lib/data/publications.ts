export type AuthorRole = "First" | "Co-First" | "Co-Author";
export type PubStatus = "Published" | "Submitted" | "In Preparation";

export interface Publication {
  id: string;
  title: string;
  titleKo?: string;
  authors: string;
  journal: string;
  year: number | null;
  volume?: string;
  pages?: string;
  authorRole: AuthorRole;
  doi?: string;
  status: PubStatus;
  researchId?: string;
  topics: string[];
}

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub-cu-ni-si-2026",
    title:
      "Microstructure and Mechanical Properties of Cu–Ni–Si–Co–Cr–Sn Alloy with Aging Treatment",
    titleKo: "시효 처리에 따른 Cu–Ni–Si–Co–Cr–Sn 합금의 미세조직 및 기계적 특성",
    authors: "Ji In Hwang, ...",
    journal: "Materials Today Communications",
    year: 2026,
    authorRole: "First",
    status: "Published",
    researchId: "res-cu-ni-si",
    topics: ["Cu 합금", "석출 강화", "시효 처리", "EBSD", "기계적 특성"],
  },
  {
    id: "pub-cu-tio2",
    title: "Mechanical and Electrical Properties of Cu–TiO₂ Composite Fabricated by In-situ Internal Oxidation",
    titleKo: "In-situ 내부산화법으로 제조한 Cu–TiO₂ 복합재료의 기계적·전기적 특성",
    authors: "Ji In Hwang, ...",
    journal: "Metals and Materials International",
    year: null,
    authorRole: "Co-First",
    status: "Submitted",
    researchId: "res-cu-tio2",
    topics: ["Cu 복합재료", "분말야금", "TiO₂", "전기전도도"],
  },
  {
    id: "pub-tic-skd11-2018",
    title: "Tempering Behavior of TiC-Reinforced SKD11 Steel Matrix Composite",
    titleKo: "TiC 강화 SKD11 강 기지 복합재료의 뜨임 거동",
    authors: "Ji-In Hwang · Seong Hoon Kim · Yoon-Uk Heo · Dae Ha Kim · Keum-Cheol Hwang · Dong-Woo Suh",
    journal: "Metals and Materials International",
    year: 2018,
    authorRole: "First",
    status: "Published",
    researchId: "res-tic-skd11",
    topics: ["TiC", "강 기지 복합재료", "뜨임 거동", "경도", "가압함침주조"],
  },
];
