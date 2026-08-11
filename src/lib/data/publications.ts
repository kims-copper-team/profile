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
      "Effect of solution heat treatment temperature on work hardening and aging behavior of Cu–Ni–Si–Co–Cr–Sn alloy",
    titleKo: "Cu–Ni–Si–Co–Cr–Sn 합금의 용체화 처리 온도가 가공 경화 및 시효 거동에 미치는 영향",
    authors: "Ji In Hwang · Hyun Woo Jeong · Munsu Choi · Eun-Ae Choi · Seung Zeon Han",
    journal: "Materials Today Communications",
    year: 2026,
    volume: "53",
    pages: "115461",
    doi: "10.1016/j.mtcomm.2026.115461",
    authorRole: "First",
    status: "Published",
    researchId: "res-cu-ni-si",
    topics: ["Cu–Ni–Si 합금", "용체화 처리", "냉간 압연", "가공 경화", "석출 경화"],
  },
  {
    id: "pub-cu-tio2",
    title: "Mechanical and Electrical Properties of Cu–TiO₂ Composite Fabricated by In-situ Internal Oxidation",
    titleKo: "In-situ 내부산화법으로 제조한 Cu–TiO₂ 복합재료의 기계적·전기적 특성",
    authors: "Ha-Young Moon · Ji In Hwang · Hyun Woo Jeong · Sang-Min Na · Sungwan Lim · Eun-Ae Choi · Seung Zeon Han",
    journal: "Metals and Materials International",
    year: null,
    authorRole: "Co-First",
    status: "Submitted",
    researchId: "res-cu-tio2",
    topics: ["Cu 복합재료", "내부산화", "TiO₂", "전기전도도"],
  },
  {
    id: "pub-brass-2026",
    title: "Natural dealloying of brass driven by dezincification under low-pressure oxidation",
    titleKo: "저압 산화 환경에서 탈아연화에 의한 황동의 자연 탈합금 거동",
    authors: "Seung Zeon Han · Munsu Choi · Ji In Hwang · Jihye Seong · Soo-Hyun Joo",
    journal: "Journal of Alloys and Compounds",
    year: 2026,
    volume: "1058",
    pages: "187039",
    doi: "10.1016/j.jallcom.2026.187039",
    authorRole: "Co-Author",
    status: "Published",
    topics: ["Cu-Zn 황동", "탈아연화", "탈합금", "저압 산화", "기공 형성"],
  },
  {
    id: "pub-tic-skd11-2018",
    title: "Tempering Behavior of TiC-Reinforced SKD11 Steel Matrix Composite",
    titleKo: "TiC 강화 SKD11 강 기지 복합재료의 템퍼링 거동",
    authors: "Ji-In Hwang · Seong Hoon Kim · Yoon-Uk Heo · Dae Ha Kim · Keum-Cheol Hwang · Dong-Woo Suh",
    journal: "Metals and Materials International",
    year: 2018,
    authorRole: "First",
    status: "Published",
    researchId: "res-tic-skd11",
    topics: ["TiC", "강 기지 복합재료", "템퍼링 거동", "경도", "가압함침주조"],
  },
];
