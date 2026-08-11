export interface DashboardMetric {
  key: string;
  label: string;
  value: string;
  sub: string;
  href: string;
  color?: string;
}

export const METRICS: DashboardMetric[] = [
  { key: "materials-exp", label: "재료 개발 실무",  value: "3Y+",  sub: "풍산(2018) · KIMS(2025~)",          href: "/career/",           color: "amber"  },
  { key: "startup-exp",   label: "창업 경력",        value: "3Y+",  sub: "SELLWAVE(2021) · 빌딩몬 병행",       href: "/entrepreneurship/", color: "purple" },
  { key: "pubs",          label: "논문",             value: "3",    sub: "1저자 2건 · 공동1저자 1건",           href: "/publications/",     color: "blue"   },
  { key: "startups",      label: "창업 기업",         value: "2",    sub: "SELLWAVE · 빌딩몬",                   href: "/entrepreneurship/", color: "purple" },
  { key: "mat-systems",   label: "재료 시스템",       value: "4+",   sub: "Cu 합금 · Cu 복합 · Fe계 · TiC",     href: "/research/",         color: "amber"  },
  { key: "current",       label: "현 소속",           value: "KIMS", sub: "한국재료연구원 · 2025–",              href: "/profile/",          color: "green"  },
];
