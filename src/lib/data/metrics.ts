export interface DashboardMetric {
  key: string;
  label: string;
  value: string;
  sub: string;
  href: string;
  color?: string;
}

export const METRICS: DashboardMetric[] = [
  { key: "career",     label: "총 경력",       value: "7Y+",  sub: "2018 – 현재",          href: "/career/",       color: "amber" },
  { key: "research",   label: "연구 경력",      value: "3Y+",  sub: "한국재료연구원 포함",    href: "/research/",     color: "green" },
  { key: "pubs",       label: "논문",           value: "3",    sub: "1저자 2건, 공동1저자 1건", href: "/publications/", color: "blue" },
  { key: "startups",   label: "창업",           value: "2",    sub: "SELLWAVE · 빌딩몬",     href: "/entrepreneurship/", color: "purple" },
  { key: "materials",  label: "재료 시스템",     value: "4+",   sub: "Cu, Fe, TiC 계열",      href: "/research/",     color: "amber" },
  { key: "current",    label: "현 소속",         value: "KIMS", sub: "한국재료연구원 · 2025–", href: "/profile/",      color: "green" },
];
