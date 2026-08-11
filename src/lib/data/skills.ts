export type SkillCategory =
  | "Materials"
  | "Processing"
  | "Characterization"
  | "Properties"
  | "Data/AI"
  | "Business";

export interface Skill {
  id: string;
  name: string;
  nameKo?: string;
  category: SkillCategory;
  usedIn: string[]; // ResearchProject IDs
}

export const SKILLS: Skill[] = [
  // Materials
  { id: "cu-alloy",  name: "Cu Alloys",     nameKo: "구리 합금",     category: "Materials", usedIn: ["res-cu-ni-si", "res-cu-tio2"] },
  { id: "cu-comp",   name: "Cu Composites", nameKo: "Cu 복합재료",   category: "Materials", usedIn: ["res-cu-tio2"] },
  { id: "fe-comp",   name: "Fe Composites", nameKo: "철계 복합재료", category: "Materials", usedIn: ["res-tic-skd11"] },

  // Processing
  { id: "casting",      name: "Casting",              nameKo: "용해 주조",      category: "Processing", usedIn: ["res-cu-ni-si", "res-cu-tio2"] },
  { id: "rolling",      name: "Rolling",              nameKo: "압연",           category: "Processing", usedIn: ["res-cu-ni-si", "res-cu-tio2"] },
  { id: "aging",        name: "Aging Treatment",      nameKo: "시효 처리",      category: "Processing", usedIn: ["res-cu-ni-si"] },
  { id: "int-ox",       name: "Internal Oxidation",   nameKo: "내부산화",       category: "Processing", usedIn: ["res-cu-tio2"] },
  { id: "infiltration", name: "Pressure Infiltration", nameKo: "용융가압함침",  category: "Processing", usedIn: ["res-tic-skd11"] },

  // Characterization
  { id: "sem",  name: "SEM",  nameKo: "주사전자현미경", category: "Characterization", usedIn: ["res-cu-ni-si", "res-cu-tio2", "res-tic-skd11"] },
  { id: "ebsd", name: "EBSD", nameKo: "결정방위분석",   category: "Characterization", usedIn: ["res-cu-ni-si"] },
  { id: "xrd",  name: "XRD",  nameKo: "X선 회절분석",   category: "Characterization", usedIn: ["res-cu-ni-si", "res-cu-tio2", "res-tic-skd11"] },
  { id: "tem",  name: "TEM",  nameKo: "투과전자현미경", category: "Characterization", usedIn: ["res-cu-ni-si"] },

  // Properties
  { id: "tensile",      name: "Tensile Testing",         nameKo: "인장시험",   category: "Properties", usedIn: ["res-cu-ni-si", "res-cu-tio2"] },
  { id: "hardness",     name: "Hardness Testing",         nameKo: "경도 측정",  category: "Properties", usedIn: ["res-cu-ni-si", "res-cu-tio2", "res-tic-skd11"] },
  { id: "conductivity", name: "Electrical Conductivity",  nameKo: "전기전도도", category: "Properties", usedIn: ["res-cu-ni-si", "res-cu-tio2"] },
  { id: "bending",      name: "Bending Strength",         nameKo: "굽힘강도",   category: "Properties", usedIn: ["res-tic-skd11"] },

  // Data / AI
  { id: "gpr",       name: "GPR-ARD",    nameKo: "가우시안 프로세스 회귀", category: "Data/AI", usedIn: ["res-cu-ni-si"] },
  { id: "bert",      name: "BERT / NLP", nameKo: "딥러닝 텍스트 분류",    category: "Data/AI", usedIn: [] },
  { id: "python",    name: "Python",                                         category: "Data/AI", usedIn: [] },
  { id: "claude-ai", name: "Claude AI",  nameKo: "AI 도구 활용",           category: "Data/AI", usedIn: [] },

  // Business
  { id: "biz-model", name: "Business Modeling",           nameKo: "사업 기획",       category: "Business", usedIn: [] },
  { id: "tech-biz",  name: "Technology Commercialization", nameKo: "기술 사업화",     category: "Business", usedIn: [] },
  { id: "startup",   name: "Startup Execution",            nameKo: "스타트업 실행력", category: "Business", usedIn: [] },
];
