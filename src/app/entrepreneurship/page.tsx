"use client";

import { useEffect } from "react";
import { logVisit } from "@/lib/supabaseClient";
import { CAREER_ENTRIES } from "@/lib/data/career";

export default function EntrepreneurshipPage() {
  useEffect(() => { logVisit("/entrepreneurship"); }, []);

  const startups = CAREER_ENTRIES.filter((e) => e.category === "Startup");

  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight mb-1" style={{ letterSpacing: "-0.03em" }}>Entrepreneurship</h1>
        <p className="text-sm text-slate-500">창업 · 기술 사업화 경험 · {startups.length}개 회사</p>
      </div>

      <div className="space-y-4">
        {startups.slice().reverse().map((e) => {
          const period = `${e.startYear}.${String(e.startMonth).padStart(2, "0")} – ${
            e.endYear ? `${e.endYear}.${String(e.endMonth ?? 1).padStart(2, "0")}` : "현재"
          }`;
          return (
            <div
              key={e.id}
              className="rounded-xl p-5"
              style={{ background: "#fff", border: "1px solid #E2E8F4" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <p className="font-bold text-[15px] text-slate-800">{e.company}</p>
                  {e.companyEn && <p className="text-[10px] font-mono text-slate-400 tracking-wide">{e.companyEn}</p>}
                  <p className="text-sm text-slate-500 mt-0.5">{e.role}</p>
                </div>
                <p className="text-xs font-mono text-slate-400 shrink-0">{period}</p>
              </div>
              <ul className="space-y-1.5">
                {e.description.map((d, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-slate-300 mt-0.5 shrink-0">·</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              {e.achievements && e.achievements.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">성과</p>
                  <ul className="space-y-1">
                    {e.achievements.map((a, i) => (
                      <li key={i} className="flex gap-2 text-sm text-purple-700">
                        <span className="shrink-0">✓</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
