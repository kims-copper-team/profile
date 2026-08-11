"use client";

import { useState, useEffect } from "react";
import { logVisit } from "@/lib/supabaseClient";
import {
  PROJECTS,
  CATEGORY_ORDER,
  RESEARCH_THEMES,
  type Project,
  type ProjectCategory,
} from "@/lib/data/projects";

const CAT_STYLE: Record<ProjectCategory, { bg: string; text: string; border: string }> = {
  "Materials R&D":    { bg: "#ECFDF5", text: "#065F46", border: "#6EE7B7" },
  "AI & Data":        { bg: "#EFF6FF", text: "#1E40AF", border: "#BFDBFE" },
  "Entrepreneurship": { bg: "#F5F3FF", text: "#5B21B6", border: "#DDD6FE" },
};

const OUTPUT_ICON: Record<string, string> = {
  publication: "◆",
  patent:      "◉",
  conference:  "◇",
  prototype:   "◎",
  program:     "◈",
};

function StatusBadge({ status }: { status?: "Ongoing" | "Completed" }) {
  if (!status) return null;
  const style =
    status === "Ongoing"
      ? { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" }
      : { bg: "#F8FAFC", text: "#475569", border: "#E2E8F4" };
  return (
    <span
      className="text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full"
      style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
    >
      {status === "Ongoing" ? "진행중" : "완료"}
    </span>
  );
}

function ProjectCard({ project, defaultOpen }: { project: Project; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <div
      className="rounded-xl transition-shadow"
      style={{ background: "#fff", border: "1px solid #E2E8F4" }}
    >
      {/* Header row */}
      <button
        className="w-full text-left px-5 py-4 flex items-start gap-3"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className="mt-0.5 text-[11px] font-black font-mono shrink-0 w-6 h-6 rounded flex items-center justify-center"
          style={{ background: "#F1F5F9", color: "#64748B" }}
        >
          {String(project.no).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            {project.categories.map((cat) => {
              const s = CAT_STYLE[cat];
              return (
                <span
                  key={cat}
                  className="text-[9px] font-bold tracking-[0.08em] uppercase px-1.5 py-0.5 rounded"
                  style={{ background: s.bg, color: s.text }}
                >
                  {cat}
                </span>
              );
            })}
            <StatusBadge status={project.status} />
          </div>
          <p className="text-[14px] font-bold text-slate-800 leading-snug">{project.title}</p>
          {project.titleKo && (
            <p className="text-[11px] text-slate-400 mt-0.5">{project.titleKo}</p>
          )}
          <div className="flex flex-wrap gap-3 mt-1.5">
            <span className="text-[11px] text-slate-500 font-medium">{project.organization}</span>
            <span className="text-[11px] text-slate-400 font-mono">{project.period}</span>
            <span className="text-[11px] text-slate-400">{project.role}</span>
          </div>
        </div>
        <span className="text-slate-300 shrink-0 text-lg leading-none mt-0.5">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* Expanded body */}
      {open && (
        <div
          className="px-5 pb-5 space-y-4"
          style={{ borderTop: "1px solid #F1F5F9" }}
        >
          {/* Objective */}
          <div className="pt-4">
            <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-1.5">Objective</p>
            <p className="text-[13px] text-slate-600 leading-relaxed">{project.objective}</p>
          </div>

          {/* Material */}
          {project.material && (
            <div>
              <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-1">Material</p>
              <p className="text-[12px] font-mono text-slate-600">{project.material}</p>
            </div>
          )}

          {/* Activities */}
          {project.activities.length > 0 && (
            <div>
              <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-2">Main Activities</p>
              <ul className="space-y-1">
                {project.activities.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] text-slate-600">
                    <span className="mt-1 w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outputs */}
          {project.outputs.length > 0 && (
            <div>
              <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-2">Outputs</p>
              <div className="space-y-2">
                {project.outputs.map((o, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[10px] shrink-0 mt-0.5" style={{ color: "#94A3B8" }}>
                      {OUTPUT_ICON[o.type] ?? "·"}
                    </span>
                    <div>
                      <p className="text-[12px] text-slate-600">{o.label}</p>
                      {o.patentNo && (
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5">출원번호: {o.patentNo}</p>
                      )}
                      {o.note && (
                        <p className="text-[10px] text-amber-600 mt-0.5">{o.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Keywords */}
          {project.keywords.length > 0 && (
            <div>
              <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-2">Keywords</p>
              <div className="flex flex-wrap gap-1.5">
                {project.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-[10px] px-2 py-0.5 rounded font-mono"
                    style={{ background: "#F8FAFC", color: "#64748B", border: "1px solid #E2E8F4" }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Note */}
          {project.note && (
            <p className="text-[11px] text-slate-400 italic leading-relaxed border-l-2 pl-3" style={{ borderColor: "#E2E8F4" }}>
              {project.note}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

type View = "category" | "theme";
type ActiveCat = ProjectCategory | "all";

export default function ProjectsPage() {
  const [view, setView] = useState<View>("category");
  const [activeCat, setActiveCat] = useState<ActiveCat>("all");

  useEffect(() => { logVisit("/projects"); }, []);

  const totalByCategory = (cat: ProjectCategory) =>
    PROJECTS.filter((p) => p.categories.includes(cat)).length;

  return (
    <div className="max-w-[1000px] mx-auto px-5 sm:px-8 py-8 space-y-8">

      {/* ── Page header ── */}
      <div>
        <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-slate-400 mb-1">Career Dashboard · Projects</p>
        <h1 className="text-2xl font-black tracking-tight" style={{ letterSpacing: "-0.03em" }}>
          Research & Projects
        </h1>
        <p className="text-sm text-slate-500 mt-1.5 max-w-xl leading-relaxed">
          Materials R&D, entrepreneurship, and AI-assisted research — project activities and their outputs.
          Publications, patents, and conference contributions are listed separately.
        </p>
      </div>

      {/* ── Career narrative strip ── */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#fff", border: "1px solid #E2E8F4" }}
      >
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-400 mb-4">Career Arc</p>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: "Graduate Research", sub: "POSTECH", color: "#059669" },
            { arrow: true },
            { label: "Industrial R&D", sub: "POONGSAN", color: "#D97706" },
            { arrow: true },
            { label: "Startup Operations", sub: "DAGOCHYEO", color: "#7C3AED" },
            { arrow: true },
            { label: "Entrepreneurship & AI", sub: "SELLWAVE · BUILDINGMON", color: "#7C3AED" },
            { arrow: true },
            { label: "Advanced Materials R&D", sub: "KIMS · Cu Alloys · AI", color: "#059669", current: true },
          ].map((item, i) =>
            "arrow" in item ? (
              <span key={i} className="text-slate-300 text-sm">→</span>
            ) : (
              <div
                key={i}
                className="rounded-lg px-3 py-2 text-center"
                style={{
                  background: item.current ? "#ECFDF5" : "#F8FAFC",
                  border: `1px solid ${item.current ? "#6EE7B7" : "#E2E8F4"}`,
                }}
              >
                <p className="text-[11px] font-bold" style={{ color: item.color }}>{item.label}</p>
                <p className="text-[9px] font-mono text-slate-400 mt-0.5">{item.sub}</p>
              </div>
            )
          )}
        </div>
        <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
          창업 기간은 연구경력의 단절이 아닌, 시장과 고객 이해 · 기술 사업화 · AI 도구 활용 역량을 축적한 시기이며,
          현재 이 경험을 재료개발에 집중적으로 적용하고 있습니다.
        </p>
      </div>

      {/* ── Summary stats ── */}
      <div className="grid grid-cols-3 gap-3">
        {CATEGORY_ORDER.map((cat) => {
          const s = CAT_STYLE[cat];
          return (
            <div
              key={cat}
              className="rounded-xl p-4"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
            >
              <p className="text-[9px] font-bold tracking-[0.1em] uppercase mb-1" style={{ color: s.text }}>{cat}</p>
              <p className="text-2xl font-black" style={{ color: "#0F172A" }}>{totalByCategory(cat)}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">projects</p>
            </div>
          );
        })}
      </div>

      {/* ── View toggle + filter ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1" style={{ background: "#F1F5F9", borderRadius: "8px", padding: "3px" }}>
          {(["category", "theme"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => { setView(v); setActiveCat("all"); }}
              className="text-[11px] font-medium px-3 py-1.5 rounded-md transition-colors"
              style={{
                background: view === v ? "#fff" : "transparent",
                color: view === v ? "#0F172A" : "#94A3B8",
                boxShadow: view === v ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              }}
            >
              {v === "category" ? "By Category" : "By Research Theme"}
            </button>
          ))}
        </div>

        {view === "category" && (
          <div className="flex flex-wrap gap-1.5">
            {(["all", ...CATEGORY_ORDER] as (ActiveCat)[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className="text-[11px] font-medium px-3 py-1 rounded-full transition-colors"
                style={{
                  background: activeCat === cat ? "#0F172A" : "#F1F5F9",
                  color: activeCat === cat ? "#fff" : "#64748B",
                }}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Project list ── */}
      {view === "category" ? (
        <div className="space-y-3">
          {PROJECTS
            .filter((p) => activeCat === "all" || p.categories.includes(activeCat as ProjectCategory))
            .map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Materials R&D by theme */}
          {RESEARCH_THEMES.map((theme) => {
            const themed = PROJECTS.filter(
              (p) => p.categories.includes("Materials R&D") && p.researchTheme === theme
            );
            if (themed.length === 0) return null;
            return (
              <div key={theme}>
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-slate-400">{theme}</p>
                  <div className="flex-1 h-px" style={{ background: "#E2E8F4" }} />
                </div>
                <div className="space-y-3">
                  {themed.map((p) => <ProjectCard key={p.id} project={p} />)}
                </div>
              </div>
            );
          })}

          {/* Non-Materials-R&D projects grouped */}
          {(["AI & Data", "Entrepreneurship"] as ProjectCategory[]).map((cat) => {
            const catProjects = PROJECTS.filter(
              (p) => p.categories.includes(cat) && !p.categories.includes("Materials R&D")
            );
            if (catProjects.length === 0) return null;
            const s = CAT_STYLE[cat];
            return (
              <div key={cat}>
                <div className="flex items-center gap-3 mb-3">
                  <p
                    className="text-[10px] font-bold tracking-[0.14em] uppercase"
                    style={{ color: s.text }}
                  >
                    {cat}
                  </p>
                  <div className="flex-1 h-px" style={{ background: "#E2E8F4" }} />
                </div>
                <div className="space-y-3">
                  {catProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
