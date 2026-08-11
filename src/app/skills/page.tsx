"use client";

import { useState } from "react";
import { useEffect } from "react";
import { SKILLS, type SkillCategory } from "@/lib/data/skills";
import { logVisit } from "@/lib/supabaseClient";

const CAT_STYLE: Record<SkillCategory, { bg: string; text: string; border: string; label: string }> = {
  Materials:        { bg: "#FFFBEB", text: "#D97706", border: "#FDE68A", label: "소재" },
  Processing:       { bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE", label: "공정" },
  Characterization: { bg: "#ECFDF5", text: "#059669", border: "#6EE7B7", label: "분석" },
  Properties:       { bg: "#F5F3FF", text: "#7C3AED", border: "#DDD6FE", label: "물성" },
  "Data/AI":        { bg: "#FDF4FF", text: "#9333EA", border: "#E9D5FF", label: "데이터/AI" },
  Business:         { bg: "#F0F9FF", text: "#0891B2", border: "#BAE6FD", label: "비즈니스" },
};

const CATEGORIES = Object.keys(CAT_STYLE) as SkillCategory[];

export default function SkillsPage() {
  const [filter, setFilter] = useState<SkillCategory | "all">("all");

  useEffect(() => { logVisit("/skills"); }, []);

  const filtered = filter === "all" ? SKILLS : SKILLS.filter((s) => s.category === filter);
  const grouped = CATEGORIES.reduce<Record<SkillCategory, typeof SKILLS>>((acc, cat) => {
    acc[cat] = filtered.filter((s) => s.category === cat);
    return acc;
  }, {} as Record<SkillCategory, typeof SKILLS>);

  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8">

      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight mb-1" style={{ letterSpacing: "-0.03em" }}>Skills</h1>
        <p className="text-sm text-slate-500">기술 스택 · 총 {SKILLS.length}개</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
          style={{
            background: filter === "all" ? "#0F172A" : "#F1F5F9",
            color: filter === "all" ? "#fff" : "#64748B",
          }}
        >
          전체
        </button>
        {CATEGORIES.map((cat) => {
          const cs = CAT_STYLE[cat];
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(isActive ? "all" : cat)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: isActive ? cs.text : cs.bg,
                color: isActive ? "#fff" : cs.text,
                border: `1px solid ${isActive ? cs.text : cs.border}`,
              }}
            >
              {cs.label}
            </button>
          );
        })}
      </div>

      {/* Grouped skills */}
      <div className="space-y-5">
        {CATEGORIES.map((cat) => {
          const skills = grouped[cat];
          if (skills.length === 0) return null;
          const cs = CAT_STYLE[cat];
          return (
            <div key={cat} className="rounded-xl p-5" style={{ background: "#fff", border: "1px solid #E2E8F4" }}>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: cs.bg, color: cs.text, border: `1px solid ${cs.border}` }}
                >
                  {cs.label}
                </span>
                <span className="text-[11px] text-slate-400">{skills.length}개</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <div
                    key={s.id}
                    className="px-3 py-2 rounded-lg transition-all"
                    style={{ background: cs.bg, border: `1px solid ${cs.border}` }}
                  >
                    <p className="text-[12px] font-semibold" style={{ color: cs.text }}>{s.nameKo ?? s.name}</p>
                    {s.nameKo && s.name !== s.nameKo && (
                      <p className="text-[9px] font-mono text-slate-400 mt-0.5">{s.name}</p>
                    )}
                    {s.usedIn.length > 0 && (
                      <p className="text-[9px] text-slate-400 mt-0.5">연구 {s.usedIn.length}건</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
