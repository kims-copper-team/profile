"use client";

import { useEffect } from "react";
import { logVisit } from "@/lib/supabaseClient";
import { SKILLS } from "@/lib/data/skills";

const AI_TOOLS = [
  { name: "GPR-ARD", desc: "가우시안 프로세스 회귀(Automatic Relevance Determination) 기반 재료 물성 예측", icon: "📈" },
  { name: "BERT / NLP", desc: "재료 과학 문헌 기반 자연어 처리 및 정보 추출", icon: "📚" },
  { name: "Claude AI", desc: "연구 자동화, 문서 작성, 데이터 분석 워크플로우 통합", icon: "🤖" },
];

export default function AIPage() {
  useEffect(() => { logVisit("/ai"); }, []);

  const aiSkills = SKILLS.filter((s) => s.category === "Data/AI");

  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight mb-1" style={{ letterSpacing: "-0.03em" }}>AI & Automation</h1>
        <p className="text-sm text-slate-500">AI 기반 재료 연구 · 자동화 워크플로우</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {AI_TOOLS.map((tool) => (
          <div
            key={tool.name}
            className="rounded-xl p-5"
            style={{ background: "#fff", border: "1px solid #E2E8F4" }}
          >
            <div className="text-2xl mb-3">{tool.icon}</div>
            <h3 className="font-bold text-slate-800 mb-1">{tool.name}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{tool.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-5" style={{ background: "#fff", border: "1px solid #E2E8F4" }}>
        <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-4">Data / AI 스킬</p>
        <div className="flex flex-wrap gap-2">
          {aiSkills.map((s) => (
            <span
              key={s.id}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium"
              style={{ background: "#FDF4FF", color: "#9333EA" }}
            >
              {s.nameKo ?? s.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
