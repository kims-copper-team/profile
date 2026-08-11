"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getResumeData, logVisit, type ResumeData } from "@/lib/supabaseClient";
import { METRICS } from "@/lib/data/metrics";
import { PUBLICATIONS } from "@/lib/data/publications";
import { CAREER_ENTRIES } from "@/lib/data/career";
import { SKILLS } from "@/lib/data/skills";

const COLOR: Record<string, { bg: string; text: string; border: string }> = {
  amber:  { bg: "#FFFBEB", text: "#D97706", border: "#FDE68A" },
  green:  { bg: "#ECFDF5", text: "#059669", border: "#6EE7B7" },
  blue:   { bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE" },
  purple: { bg: "#F5F3FF", text: "#7C3AED", border: "#DDD6FE" },
};

const ROLE_COLOR = {
  First:      { bg: "#EFF6FF", text: "#1E40AF" },
  "Co-First": { bg: "#ECFDF5", text: "#065F46" },
  "Co-Author":{ bg: "#F5F3FF", text: "#5B21B6" },
};

const STATUS_COLOR: Record<string, { bg: string; text: string }> = {
  Published:      { bg: "#ECFDF5", text: "#065F46" },
  Submitted:      { bg: "#FFFBEB", text: "#92400E" },
  "In Preparation": { bg: "#F5F3FF", text: "#5B21B6" },
};

// Mini Gantt for dashboard
const CHART_START = 2018;
const CHART_END = 2027;
const TOTAL_YEARS = CHART_END - CHART_START;

function MiniGantt() {
  const VW = 600;
  const ML = 32;
  const IW = VW - ML - 16;
  const BAR_H = 14;
  const AXIS_Y = 110;

  const yearToX = (y: number, m = 1) =>
    ML + ((y - CHART_START + (m - 1) / 12) / TOTAL_YEARS) * IW;

  const catColor = {
    Industry: "#D97706",
    Startup:  "#7C3AED",
    Research: "#059669",
  };

  const years = Array.from({ length: TOTAL_YEARS + 1 }, (_, i) => CHART_START + i);

  return (
    <svg viewBox={`0 0 ${VW} 130`} style={{ width: "100%", display: "block" }}>
      {/* grid */}
      {years.map((y) => (
        <line key={y}
          x1={yearToX(y)} y1={10} x2={yearToX(y)} y2={AXIS_Y - 2}
          stroke="#E2E8F4" strokeWidth={1} />
      ))}

      {/* bars */}
      {CAREER_ENTRIES.map((e) => {
        const x1 = yearToX(e.startYear, e.startMonth);
        const x2 = yearToX(e.endYear ?? 2027, e.endMonth ?? 1);
        const y = 40 + e.lane * (BAR_H + 6);
        const col = catColor[e.category];
        return (
          <g key={e.id}>
            <rect x={x1} y={y} width={x2 - x1} height={BAR_H} rx={3} fill={col} opacity={0.85} />
            {x2 - x1 > 30 && (
              <text x={x1 + 4} y={y + 10} fontSize={8} fill="white" fontWeight="600">
                {e.company.replace("주식회사", "").replace("(주)", "").trim()}
              </text>
            )}
          </g>
        );
      })}

      {/* axis */}
      <line x1={ML} y1={AXIS_Y} x2={VW - 16} y2={AXIS_Y} stroke="#CBD5E1" strokeWidth={1.5} />
      {years.filter((y) => y % 2 === 0).map((y) => (
        <g key={y}>
          <line x1={yearToX(y)} y1={AXIS_Y} x2={yearToX(y)} y2={AXIS_Y + 4} stroke="#94A3B8" strokeWidth={1} />
          <text x={yearToX(y)} y={AXIS_Y + 13} textAnchor="middle" fontSize={8} fill="#94A3B8" fontFamily="monospace">
            {String(y).slice(2)}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function DashboardPage() {
  const [personal, setPersonal] = useState<ResumeData["personal"] | null>(null);

  useEffect(() => {
    logVisit("/");
    getResumeData().then((d) => setPersonal(d.personal));
  }, []);

  const topSkills = SKILLS.filter((s) => s.usedIn.length > 0).slice(0, 12);

  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8 space-y-6">

      {/* ── Profile strip ── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl p-5 sm:p-6"
        style={{ background: "#fff", border: "1px solid #E2E8F4" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-black shrink-0"
            style={{ background: "#DBEAFE", color: "#1D4ED8" }}
          >
            {personal ? (personal.nameEn?.slice(0, 2).toUpperCase() || "JH") : "JH"}
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight" style={{ letterSpacing: "-0.03em" }}>
              {personal?.name || "황지인"}
            </h1>
            {personal?.nameEn && (
              <p className="text-xs font-mono text-slate-400 tracking-widest">{personal.nameEn.toUpperCase()}</p>
            )}
            <p className="text-sm text-slate-500 mt-0.5">{personal?.title || "재료 연구원 · 한국재료연구원 · Cu 합금 / AI-assisted Materials"}</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href="/cv/"
            className="px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors"
            style={{ background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE" }}
          >
            이력서 →
          </Link>
          <Link
            href="/career/"
            className="px-4 py-2 rounded-lg text-[13px] font-medium text-slate-500 hover:text-slate-800 transition-colors"
            style={{ border: "1px solid #E2E8F4", background: "#F8FAFC" }}
          >
            경력 →
          </Link>
        </div>
      </div>

      {/* ── Metric cards ── */}
      <div>
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-3">Career Metrics</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {METRICS.map((m) => {
            const c = COLOR[m.color ?? "blue"];
            return (
              <Link
                key={m.key}
                href={m.href}
                className="rounded-xl p-4 hover:shadow-md transition-shadow"
                style={{ background: "#fff", border: "1px solid #E2E8F4" }}
              >
                <p className="text-[9px] font-bold tracking-[0.1em] uppercase mb-1.5" style={{ color: c.text }}>{m.label}</p>
                <p className="text-2xl font-black tracking-tight" style={{ color: "#0F172A" }}>{m.value}</p>
                <p className="text-[10px] text-slate-400 mt-1 leading-tight">{m.sub}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Timeline + Publications ── */}
      <div className="grid lg:grid-cols-5 gap-4">

        {/* Career mini timeline */}
        <div
          className="lg:col-span-3 rounded-xl p-5"
          style={{ background: "#fff", border: "1px solid #E2E8F4" }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400">Career Timeline</p>
            <Link href="/career/" className="text-[11px] font-medium text-blue-500 hover:text-blue-700">전체 보기 →</Link>
          </div>
          <MiniGantt />
          <div className="flex gap-4 mt-3">
            {[
              { label: "Industry", color: "#D97706" },
              { label: "Startup",  color: "#7C3AED" },
              { label: "Research", color: "#059669" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                <span className="text-[10px] text-slate-400">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent publications */}
        <div
          className="lg:col-span-2 rounded-xl p-5"
          style={{ background: "#fff", border: "1px solid #E2E8F4" }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400">Recent Publications</p>
            <Link href="/publications/" className="text-[11px] font-medium text-blue-500 hover:text-blue-700">전체 →</Link>
          </div>
          <div className="space-y-4">
            {PUBLICATIONS.map((pub) => {
              const rc = ROLE_COLOR[pub.authorRole];
              const sc = STATUS_COLOR[pub.status];
              return (
                <div key={pub.id} className="group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: rc.bg, color: rc.text }}>
                      {pub.authorRole === "Co-First" ? "공동1저자" : pub.authorRole === "First" ? "1저자" : "공저자"}
                    </span>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ background: sc.bg, color: sc.text }}>
                      {pub.status === "Published" ? "게재" : pub.status === "Submitted" ? "심사중" : "준비중"}
                    </span>
                  </div>
                  <p className="text-[12px] font-semibold leading-snug line-clamp-2 text-slate-700 group-hover:text-blue-700 transition-colors">
                    {pub.titleKo || pub.title}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    {pub.journal}{pub.year ? ` · ${pub.year}` : ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Skills summary ── */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#fff", border: "1px solid #E2E8F4" }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400">Core Skills</p>
          <Link href="/skills/" className="text-[11px] font-medium text-blue-500 hover:text-blue-700">전체 →</Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {topSkills.map((s) => {
            const catColors: Record<string, string> = {
              Materials:        "#FFFBEB",
              Processing:       "#EFF6FF",
              Characterization: "#ECFDF5",
              Properties:       "#F5F3FF",
              "Data/AI":        "#FDF4FF",
              Business:         "#F0F9FF",
            };
            const catText: Record<string, string> = {
              Materials:        "#D97706",
              Processing:       "#2563EB",
              Characterization: "#059669",
              Properties:       "#7C3AED",
              "Data/AI":        "#9333EA",
              Business:         "#0891B2",
            };
            return (
              <span
                key={s.id}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                style={{ background: catColors[s.category], color: catText[s.category] }}
              >
                {s.nameKo || s.name}
              </span>
            );
          })}
        </div>
      </div>

    </div>
  );
}
