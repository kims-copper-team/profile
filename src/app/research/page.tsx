"use client";

import { useState } from "react";
import { useEffect } from "react";
import { RESEARCH_PROJECTS, type ResearchProject } from "@/lib/data/research";
import { PUBLICATIONS } from "@/lib/data/publications";
import { logVisit } from "@/lib/supabaseClient";

const STATUS_STYLE = {
  Published:  { bg: "#ECFDF5", text: "#065F46", border: "#6EE7B7", label: "게재" },
  Ongoing:    { bg: "#FFFBEB", text: "#92400E", border: "#FDE68A", label: "진행중" },
  Completed:  { bg: "#EFF6FF", text: "#1E40AF", border: "#BFDBFE", label: "완료" },
};

const SYSTEM_COLORS: Record<string, { fill: string; text: string; bg: string }> = {
  "Cu 합금계":     { fill: "#D97706", text: "#92400E", bg: "#FFFBEB" },
  "Cu 복합재료":   { fill: "#7C3AED", text: "#5B21B6", bg: "#F5F3FF" },
  "철계 복합재료": { fill: "#059669", text: "#065F46", bg: "#ECFDF5" },
};

export default function ResearchPage() {
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => { logVisit("/research"); }, []);

  const systems = Array.from(new Set(RESEARCH_PROJECTS.map((p) => p.materialSystem)));

  const filtered = filter === "all"
    ? RESEARCH_PROJECTS
    : RESEARCH_PROJECTS.filter((p) => p.materialSystem === filter);

  const selectedProject = selected ? RESEARCH_PROJECTS.find((p) => p.id === selected) : null;

  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight mb-1" style={{ letterSpacing: "-0.03em" }}>Research</h1>
        <p className="text-sm text-slate-500">재료 연구 프로젝트 · 총 {RESEARCH_PROJECTS.length}건</p>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
          style={{
            background: filter === "all" ? "#0F172A" : "#F1F5F9",
            color: filter === "all" ? "#fff" : "#64748B",
          }}
        >
          전체 ({RESEARCH_PROJECTS.length})
        </button>
        {systems.map((sys) => {
          const col = SYSTEM_COLORS[sys] ?? { fill: "#64748B", text: "#334155", bg: "#F1F5F9" };
          const isActive = filter === sys;
          return (
            <button
              key={sys}
              onClick={() => setFilter(sys)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: isActive ? col.fill : col.bg,
                color: isActive ? "#fff" : col.text,
                border: `1px solid ${isActive ? col.fill : "transparent"}`,
              }}
            >
              {sys}
            </button>
          );
        })}
      </div>

      {/* Project grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filtered.map((proj) => {
          const sc = STATUS_STYLE[proj.status];
          const col = SYSTEM_COLORS[proj.materialSystem] ?? { fill: "#64748B", text: "#334155", bg: "#F1F5F9" };
          const isSelected = selected === proj.id;
          const pub = proj.publicationId ? PUBLICATIONS.find((p) => p.id === proj.publicationId) : null;

          return (
            <button
              key={proj.id}
              onClick={() => setSelected(isSelected ? null : proj.id)}
              className="text-left rounded-xl p-5 transition-all hover:shadow-md"
              style={{
                background: isSelected ? col.bg : "#fff",
                border: `1px solid ${isSelected ? col.fill + "60" : "#E2E8F4"}`,
              }}
            >
              {/* Top badges */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded"
                  style={{ background: col.bg, color: col.text }}
                >
                  {proj.materialSystem}
                </span>
                <span
                  className="text-[9px] font-semibold px-2 py-0.5 rounded"
                  style={{ background: sc.bg, color: sc.text }}
                >
                  {sc.label}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[14px] font-bold leading-snug text-slate-800 mb-2">{proj.title}</h3>

              {/* Affiliation + period */}
              <p className="text-[11px] font-mono text-slate-400 mb-3">{proj.affiliation} · {proj.period}</p>

              {/* Objective */}
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-3">{proj.objective}</p>

              {/* Keyword chips */}
              <div className="flex flex-wrap gap-1">
                {proj.keywords.slice(0, 4).map((kw) => (
                  <span
                    key={kw}
                    className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                    style={{ background: "#F1F5F9", color: "#64748B" }}
                  >
                    {kw}
                  </span>
                ))}
              </div>

              {/* Publication link */}
              {pub && (
                <div
                  className="mt-3 pt-3 border-t text-[11px] font-medium"
                  style={{ borderColor: "#E2E8F4", color: col.text }}
                >
                  📄 {pub.journal}{pub.year ? ` (${pub.year})` : ""}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelected(null)}
        />
      )}

    </div>
  );
}

function ProjectDetail({ project, onClose }: { project: ResearchProject; onClose: () => void }) {
  const col = SYSTEM_COLORS[project.materialSystem] ?? { fill: "#64748B", text: "#334155", bg: "#F1F5F9" };
  const sc = STATUS_STYLE[project.status];
  const pub = project.publicationId ? PUBLICATIONS.find((p) => p.id === project.publicationId) : null;

  return (
    <div
      className="rounded-xl p-6 shadow-lg"
      style={{ background: col.bg, border: `1.5px solid ${col.fill}40` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded" style={{ background: "#fff", color: col.text }}>
              {project.materialSystem}
            </span>
            <span className="text-[9px] font-semibold px-2 py-0.5 rounded" style={{ background: sc.bg, color: sc.text }}>
              {sc.label}
            </span>
          </div>
          <h2 className="text-lg font-black" style={{ color: col.text }}>{project.title}</h2>
          <p className="text-xs font-mono mt-1" style={{ color: col.text + "80" }}>
            {project.affiliation} · {project.period}
          </p>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1 rounded transition-colors">✕</button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: col.text }}>연구 목표</p>
          <p className="text-sm text-slate-700 leading-relaxed">{project.objective}</p>

          {project.keyFindings && (
            <div className="mt-4">
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: col.text }}>주요 결과</p>
              <p className="text-sm text-slate-700 leading-relaxed">{project.keyFindings}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: col.text }}>공정</p>
            <div className="flex flex-wrap gap-1">
              {project.processing.map((p) => (
                <span key={p} className="text-[11px] px-2 py-0.5 rounded font-medium" style={{ background: "#fff", color: "#374151" }}>{p}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: col.text }}>분석 / 평가</p>
            <div className="flex flex-wrap gap-1">
              {project.characterization.map((c) => (
                <span key={c} className="text-[11px] px-2 py-0.5 rounded font-medium" style={{ background: "#fff", color: "#374151" }}>{c}</span>
              ))}
            </div>
          </div>

          {pub && (
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: col.text }}>관련 논문</p>
              <div className="rounded-lg p-3" style={{ background: "#fff" }}>
                <p className="text-[11px] font-semibold text-slate-700 leading-snug">{pub.titleKo || pub.title}</p>
                <p className="text-[10px] font-mono text-slate-400 mt-1">{pub.journal}{pub.year ? ` · ${pub.year}` : ""}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
