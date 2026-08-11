export type ProjectCategory = "Materials R&D" | "AI & Data" | "Entrepreneurship";
export type ResearchTheme = "Copper & Copper Alloys" | "Steel & Composites";

export interface ProjectOutput {
  type: "publication" | "patent" | "prototype" | "conference" | "program";
  label: string;
  publicationId?: string;
  patentNo?: string;
  note?: string;
}

export interface Project {
  id: string;
  no: number;
  title: string;
  titleKo?: string;
  organization: string;
  organizationFull?: string;
  categories: ProjectCategory[];
  researchTheme?: ResearchTheme;
  role: string;
  period: string;
  status?: "Ongoing" | "Completed";
  material?: string;
  objective: string;
  activities: string[];
  keywords: string[];
  outputs: ProjectOutput[];
  note?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "proj-poongsan-cu",
    no: 1,
    title: "Precipitation-Hardened Copper Alloy Development",
    titleKo: "석출경화형 선도합금 개발",
    organization: "POONGSAN",
    organizationFull: "Poongsan Corporation",
    categories: ["Materials R&D"],
    researchTheme: "Copper & Copper Alloys",
    role: "Researcher",
    period: "2018–2019",
    status: "Completed",
    material: "Copper Alloy",
    objective: "고강도·고전도 동합금 개발; 합금 조성과 제조공정 최적화를 통한 강도와 전기전도도의 균형 확보",
    activities: [
      "Cu계 합금 소재개발",
      "합금 조성 및 제조공정 검토",
      "열처리 및 가공조건에 따른 특성평가",
      "미세조직–물성 관계 분석",
    ],
    keywords: ["Copper Alloy", "Precipitation Hardening", "High Strength", "High Conductivity", "Materials Processing"],
    outputs: [
      {
        type: "patent",
        label: "강도와 도전율이 우수한 동합금 판재의 제조 방법 및 이로부터 제조된 동합금 판재",
        patentNo: "10-2019-0090805",
        note: "정확한 등록 여부 및 발명자 정보는 추후 확인하여 업데이트 예정 (출원인: 풍산)",
      },
    ],
  },
  {
    id: "proj-kims-cu-ni-si",
    no: 2,
    title: "High-Strength and High-Conductivity Cu–Ni–Si Alloy",
    titleKo: "고강도·고전도 Cu–Ni–Si계 합금 연구",
    organization: "KIMS",
    organizationFull: "Korea Institute of Materials Science",
    categories: ["Materials R&D"],
    researchTheme: "Copper & Copper Alloys",
    role: "Post-Master Researcher",
    period: "2025–Present",
    status: "Ongoing",
    material: "Cu–Ni–Si–Co–Cr–Sn Alloy",
    objective: "고강도와 고전도성을 동시에 확보하기 위한 Cu–Ni–Si계 합금의 공정–미세조직–물성 관계 규명 및 공정 최적화",
    activities: [
      "용체화처리 조건 설계",
      "냉간압연 조건 설계",
      "시효 및 pre-aging 조건 설계",
      "OM / SEM / TEM / EBSD / XRD 분석을 통한 미세조직 평가",
      "경도 및 전기전도도 평가",
      "공정–미세조직–물성 상관관계 분석",
    ],
    keywords: ["Cu–Ni–Si", "Precipitation Hardening", "Solution Treatment", "Cold Rolling", "Aging", "Pre-aging", "Microstructure", "Electrical Conductivity"],
    outputs: [
      {
        type: "publication",
        label: "Effect of solution heat treatment temperature on work hardening and aging behavior of Cu–Ni–Si–Co–Cr–Sn alloy · Materials Today Communications · 2026",
        publicationId: "pub-cu-ni-si-2026",
      },
      {
        type: "conference",
        label: "시효 초기 상태 / pre-aging 조건에 따른 후속 시효 거동 분석 — 일본 동 관련 학술대회 발표 예정 (2026)",
      },
    ],
  },
  {
    id: "proj-kims-gpr",
    no: 3,
    title: "AI-Assisted Aging Process Optimization for Cu Alloys",
    titleKo: "AI 보조 Cu 합금 시효공정 최적화",
    organization: "KIMS",
    organizationFull: "Korea Institute of Materials Science",
    categories: ["AI & Data", "Materials R&D"],
    role: "Post-Master Researcher",
    period: "2025–Present",
    status: "Ongoing",
    material: "Cu–Ni–Si–Co–Cr–Sn Alloy",
    objective: "실험 데이터를 활용하여 Cu–Ni–Si계 합금의 시효 및 pre-aging 조건을 효율적으로 탐색하고 최적 조건을 선정. 기존의 반복 실험 중심 방식에서 벗어나 데이터 기반 소재개발 방법론 구축",
    activities: [
      "실험 데이터 수집 및 전처리 (열처리 온도, 시효 시간, 가공조건)",
      "Python을 활용한 GPR-ARD 모델 구축",
      "공정–물성 관계 분석 및 유망 조건 탐색",
      "모델 예측 결과 기반 실험 조건 설계",
      "실험 검증 및 모델 개선 반복",
    ],
    keywords: ["Python", "GPR", "ARD", "Machine Learning", "Process Optimization", "Materials Informatics", "Cu Alloy"],
    outputs: [],
    note: "연구자가 실험을 설계하고 결과를 해석하며, AI/ML은 실험공간을 효율적으로 탐색하는 도구로 활용",
  },
  {
    id: "proj-kims-cu-tio2",
    no: 4,
    title: "Cu–Ti / Cu–TiO₂ Composite by Internal Oxidation",
    titleKo: "내부산화법을 이용한 Cu–TiO₂ 복합재 제조",
    organization: "KIMS",
    organizationFull: "Korea Institute of Materials Science",
    categories: ["Materials R&D"],
    researchTheme: "Copper & Copper Alloys",
    role: "Co-First Author",
    period: "2025–2026",
    status: "Completed",
    material: "Cu–Ti-based Alloys",
    objective: "분말야금 공정 없이 벌크 Cu–Ti계 합금의 내부산화를 통해 TiO₂ 분산 Cu 복합재 제조; Core–rim 미세조직과 전기전도도 향상 관계 규명",
    activities: [
      "Cu–Ti계 선재 제조 및 냉간 신선",
      "885 °C 내부산화 처리 (시간 변수)",
      "Core–rim 구조 형성 분석",
      "OM / SEM / TEM / EDS 분석",
      "Rutile TiO₂ 나노입자 분포 분석",
      "미세조직 변화와 전기전도도 관계 분석",
    ],
    keywords: ["Cu–Ti", "TiO₂", "Internal Oxidation", "Oxide Dispersion", "Core–Rim Structure", "Electrical Conductivity"],
    outputs: [
      {
        type: "publication",
        label: "Mechanical and Electrical Properties of Cu–TiO₂ Composite Fabricated by In-situ Internal Oxidation · Metals and Materials International · Submitted",
        publicationId: "pub-cu-tio2",
      },
    ],
  },
  {
    id: "proj-kims-brass",
    no: 5,
    title: "Natural Dealloying of Brass",
    titleKo: "황동의 자연 탈합금 거동 연구",
    organization: "KIMS",
    organizationFull: "Korea Institute of Materials Science",
    categories: ["Materials R&D"],
    researchTheme: "Copper & Copper Alloys",
    role: "Co-Author",
    period: "2025–2026",
    status: "Completed",
    material: "Brass / Cu–Zn Alloy",
    objective: "저압 산화환경에서 황동의 선택적 Zn 제거 및 natural dealloying 거동 규명",
    activities: [
      "저압 산화 조건 설계 및 실험",
      "선택적 산화에 의한 탈아연화 분석",
      "기공 형성 및 미세조직 변화 관찰",
      "SEM / EDS / XRD 분석",
    ],
    keywords: ["Brass", "Dealloying", "Dezincification", "Selective Oxidation", "Cu–Zn"],
    outputs: [
      {
        type: "publication",
        label: "Natural dealloying of brass driven by dezincification under low-pressure oxidation · Journal of Alloys and Compounds · 2026",
        publicationId: "pub-brass-2026",
      },
    ],
  },
  {
    id: "proj-kims-6n-cu",
    no: 6,
    title: "6N-Grade Ultra-High-Purity Cu for AI Semiconductor Applications",
    titleKo: "AI 반도체용 6N급 초고순도 저탄소 Cu 잉곳 제조 및 품질인증 기반기술 개발",
    organization: "KIMS",
    organizationFull: "Korea Institute of Materials Science",
    categories: ["Materials R&D"],
    researchTheme: "Copper & Copper Alloys",
    role: "Post-Master Researcher",
    period: "2026–Present",
    status: "Ongoing",
    material: "Ultra-High-Purity Copper",
    objective: "AI 반도체용 스퍼터링 타겟 소재로서 6N급 초고순도 저탄소 Cu 잉곳 제조 및 품질인증 기반기술 개발. 불순물·탄소·인듐 제어, 미세조직/텍스처/잔류응력 최적화, 사용 후 타겟 재활용 기반기술 확립",
    activities: [
      "Cu 정련 및 불순물 제어 기술개발",
      "탄소(C) 및 인듐(In) 오염 저감 연구",
      "개재물 분석 및 스퍼터링 품질 영향 분석",
      "결정립 크기·텍스처·잔류응력이 타겟 성능에 미치는 영향 분석",
      "고순도 Cu 타겟 재활용 기반기술 연구",
    ],
    keywords: ["6N Cu", "Ultra-High-Purity Copper", "Semiconductor", "Sputtering Target", "Purification", "Impurity", "Indium", "Carbon", "Recycling"],
    outputs: [],
    note: "정부 R&D 과제 진행 중 (RS-2026-25541543 / RS-2026-25541506). 현재 진행 중이며 성과는 추후 업데이트 예정",
  },
  {
    id: "proj-postech-tic",
    no: 7,
    title: "TiC-Reinforced SKD11 Steel Matrix Composite",
    titleKo: "TiC 강화 SKD11 강 기지 복합재료 템퍼링 거동 연구",
    organization: "POSTECH",
    organizationFull: "Pohang University of Science and Technology",
    categories: ["Materials R&D"],
    researchTheme: "Steel & Composites",
    role: "Graduate Researcher / First Author",
    period: "2017–2018",
    status: "Completed",
    material: "TiC–SKD11 Steel Matrix Composite",
    objective: "TiC 강화 SKD11 강 기지 복합재료의 템퍼링 거동 및 미세조직 변화 분석",
    activities: [
      "가압함침주조법을 이용한 TiC–SKD11 복합재료 제조",
      "템퍼링 온도 및 시간에 따른 경도 변화 분석",
      "SEM / XRD / 경도 시험",
      "미세조직–물성 관계 분석",
    ],
    keywords: ["SKD11", "TiC", "Steel Matrix Composite", "Tempering", "Heat Treatment", "Microstructure"],
    outputs: [
      {
        type: "publication",
        label: "Tempering Behavior of TiC-Reinforced SKD11 Steel Matrix Composite · Metals and Materials International · 2018",
        publicationId: "pub-tic-skd11-2018",
      },
    ],
  },
  {
    id: "proj-sellwave",
    no: 8,
    title: "SELLWAVE — Amazon US Market Entry Platform",
    titleKo: "셀웨이브 — Amazon US 입점 지원 플랫폼",
    organization: "SELLWAVE",
    categories: ["Entrepreneurship", "AI & Data"],
    role: "Founder / CEO",
    period: "2021–2025",
    status: "Completed",
    objective: "국내 판매자의 Amazon US 입점 및 판매를 지원하는 플랫폼 구축 및 운영. BERT 기반 리뷰 분석 기술을 활용하여 상품 및 시장 분석 자동화",
    activities: [
      "비즈니스 모델 개발 및 검증",
      "Amazon US 시장 진입 플랫폼 기획 및 운영",
      "판매자 지원 및 시장 분석",
      "BERT 기반 고객 리뷰 분석 기술 개발",
      "팀 구성 및 사업 운영",
    ],
    keywords: ["Amazon", "E-commerce", "Platform", "BERT", "NLP", "Review Analysis", "AI", "Entrepreneurship"],
    outputs: [
      {
        type: "patent",
        label: "등록 특허 1건",
        note: "특허의 발명의 명칭, 등록번호, 출원일 및 등록일은 확인된 공식 정보 제공 시 업데이트 예정",
      },
    ],
    note: "창업을 통해 시장과 고객을 이해하고, 기술을 사업화하는 역량과 AI/데이터 분석 활용 경험을 축적",
  },
  {
    id: "proj-buildingmon",
    no: 9,
    title: "BUILDINGMON — Smart Pipe Maintenance Technology",
    titleKo: "빌딩몬 — AI 음파센서 기반 배관 유지관리 기술개발",
    organization: "BUILDINGMON",
    organizationFull: "(주)빌딩몬",
    categories: ["Entrepreneurship", "AI & Data"],
    role: "Founder",
    period: "2023–2024",
    status: "Completed",
    objective: "배관 고압세척 및 유지관리 서비스 사업화; AI 음파센서를 활용한 배터리 기반 고압세척기 개발",
    activities: [
      "배관 유지관리 서비스 사업 기획 및 현장 문제 분석",
      "고압세척 장비 개발",
      "AI 기반 음파 신호 분석 기술 개발",
      "센서 기반 배관 상태 평가 시스템 설계",
      "기술 사업화",
    ],
    keywords: ["AI", "Acoustic Sensor", "Pipe Maintenance", "High-pressure Cleaning", "Hardware", "Technology Commercialization"],
    outputs: [
      {
        type: "program",
        label: "2024 대학 특화 청년창업 지원사업 선정 (경남창조경제혁신센터) · 지원금 20,000,000원",
      },
      {
        type: "prototype",
        label: "기술 시제품 개발 및 사업화",
      },
    ],
    note: "특허 출원 없음",
  },
  {
    id: "proj-collab-workspace",
    no: 10,
    title: "AI-Assisted Research Writing & Collaboration Workspace",
    titleKo: "AI 활용 연구 논문 작성 · 협업 워크스페이스",
    organization: "Personal / KIMS",
    categories: ["AI & Data"],
    role: "Product Designer / Developer / User",
    period: "2025–Present",
    status: "Ongoing",
    objective: "여러 연구자가 논문을 동시에 작성하고 본문·Figure·Reference·저자 정보를 하나의 환경에서 관리할 수 있는 연구자 중심 논문 작성 및 협업 워크스페이스 개발",
    activities: [
      "연구 workflow 분석 및 문제 정의",
      "기능 명세 및 데이터 구조 설계",
      "AI를 개발 도구로 활용하여 구현",
      "실제 연구 환경에서 사용 및 검증",
      "사용 피드백 기반 반복 개선",
    ],
    keywords: ["AI", "Claude", "Research Automation", "Collaboration", "Scientific Writing", "Workflow", "Real-time Editing"],
    outputs: [],
    note: "연구자가 실제 문제를 정의하고 기능과 데이터 구조를 설계하며, AI를 개발 도구로 활용하여 구현·검증. 현재 실제 연구에 사용 중",
  },
];

export const CATEGORY_ORDER: ProjectCategory[] = ["Materials R&D", "AI & Data", "Entrepreneurship"];

export const RESEARCH_THEMES: ResearchTheme[] = ["Copper & Copper Alloys", "Steel & Composites"];
