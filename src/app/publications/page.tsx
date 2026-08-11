"use client";

import { useState } from "react";
import { useEffect } from "react";
import { PUBLICATIONS, type AuthorRole, type PubStatus, type JournalIndex } from "@/lib/data/publications";
import { logVisit } from "@/lib/supabaseClient";

const ROLE_STYLE: Record<AuthorRole, { bg: string; text: string; border: string; label: string }> = {
  First:       { bg: "#EFF6FF", text: "#1E40AF", border: "#BFDBFE", label: "1저자" },
  "Co-First":  { bg: "#ECFDF5", text: "#065F46", border: "#6EE7B7", label: "공동1저자" },
  "Co-Author": { bg: "#F5F3FF", text: "#5B21B6", border: "#DDD6FE", label: "공저자" },
};

const STATUS_STYLE: Record<PubStatus, { bg: string; text: string; label: string }> = {
  Published:        { bg: "#ECFDF5", text: "#065F46", label: "게재" },
  Submitted:        { bg: "#FFFBEB", text: "#92400E", label: "심사중" },
  "In Preparation": { bg: "#F5F3FF", text: "#5B21B6", label: "준비중" },
};

const INDEX_STYLE: Record<JournalIndex, { bg: string; text: string }> = {
  SCI:    { bg: "#FEF3C7", text: "#92400E" },
  SCIE:   { bg: "#FEF3C7", text: "#92400E" },
  SCOPUS: { bg: "#F3F4F6", text: "#374151" },
};

type FilterRole = AuthorRole | "all";
type FilterStatus = PubStatus | "all";

export default function PublicationsPage() {
  const [roleFilter, setRoleFilter] = useState<FilterRole>("all");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { logVisit("/publications"); }, []);

  const filtered = PUBLICATIONS.filter((p) => {
    const roleOk = roleFilter === "all" || p.authorRole === roleFilter;
    const statusOk = statusFilter === "all" || p.status === statusFilter;
    return roleOk && statusOk;
  });

  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight mb-1" style={{ letterSpacing: "-0.03em" }}>Publications</h1>
        <p className="text-sm text-slate-500">학술 논문 · 총 {PUBLICATIONS.length}편</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 mb-6">
        {(["First", "Co-First", "Co-Author"] as AuthorRole[]).map((role) => {
          const count = PUBLICATIONS.filter((p) => p.authorRole === role).length;
          const rs = ROLE_STYLE[role];
          return (
            <div
              key={role}
              className="rounded-xl p-4"
              style={{ background: rs.bg, border: `1px solid ${rs.border}` }}
            >
              <p className="text-2xl font-black" style={{ color: rs.text }}>{count}</p>
              <p className="text-[10px] font-bold tracking-widest uppercase mt-1" style={{ color: rs.text + "99" }}>
                {rs.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        <div className="flex gap-1.5">
          {(["all", "First", "Co-First", "Co-Author"] as FilterRole[]).map((r) => {
            const isActive = roleFilter === r;
            const rs = r !== "all" ? ROLE_STYLE[r] : null;
            return (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all"
                style={{
                  background: isActive ? (rs?.text ?? "#0F172A") : (rs?.bg ?? "#F1F5F9"),
                  color: isActive ? "#fff" : (rs?.text ?? "#64748B"),
                  border: `1px solid ${isActive ? (rs?.text ?? "#0F172A") : "transparent"}`,
                }}
              >
                {r === "all" ? "전체" : ROLE_STYLE[r].label}
              </button>
            );
          })}
        </div>
        <div className="flex gap-1.5 ml-2">
          {(["all", "Published", "Submitted", "In Preparation"] as FilterStatus[]).map((s) => {
            const isActive = statusFilter === s;
            const ss = s !== "all" ? STATUS_STYLE[s] : null;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all"
                style={{
                  background: isActive ? (ss?.text ?? "#0F172A") : (ss?.bg ?? "#F1F5F9"),
                  color: isActive ? "#fff" : (ss?.text ?? "#64748B"),
                  border: `1px solid ${isActive ? (ss?.text ?? "#0F172A") : "transparent"}`,
                }}
              >
                {s === "all" ? "전체" : STATUS_STYLE[s].label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Publication list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            해당하는 논문이 없습니다
          </div>
        )}
        {filtered.map((pub, idx) => {
          const rs = ROLE_STYLE[pub.authorRole];
          const ss = STATUS_STYLE[pub.status];
          const isExpanded = expanded === pub.id;

          return (
            <div
              key={pub.id}
              className="rounded-xl overflow-hidden transition-all"
              style={{ background: "#fff", border: `1px solid ${isExpanded ? rs.border : "#E2E8F4"}` }}
            >
              <button
                className="w-full text-left p-5"
                onClick={() => setExpanded(isExpanded ? null : pub.id)}
              >
                <div className="flex items-start gap-3">
                  {/* Index */}
                  <span
                    className="mt-0.5 text-[11px] font-black font-mono shrink-0 w-6 text-center"
                    style={{ color: "#CBD5E1" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1 min-w-0">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded"
                        style={{ background: rs.bg, color: rs.text, border: `1px solid ${rs.border}` }}
                      >
                        {rs.label}
                      </span>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded"
                        style={{ background: ss.bg, color: ss.text }}
                      >
                        {ss.label}
                      </span>
                      {pub.year && (
                        <span className="text-[10px] font-mono text-slate-400">{pub.year}</span>
                      )}
                      {pub.indexed && (
                        <span
                          className="text-[9px] font-black tracking-[0.08em] px-1.5 py-0.5 rounded"
                          style={{ background: INDEX_STYLE[pub.indexed].bg, color: INDEX_STYLE[pub.indexed].text }}
                        >
                          {pub.indexed}
                        </span>
                      )}
                      {pub.impactFactor && (
                        <span className="text-[10px] font-mono text-slate-400">
                          IF {pub.impactFactor.toFixed(1)}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <p className="text-[13px] font-bold leading-snug text-slate-800 mb-1">
                      {pub.titleKo || pub.title}
                    </p>
                    {pub.titleKo && (
                      <p className="text-[11px] text-slate-400 leading-snug italic mb-1.5">{pub.title}</p>
                    )}

                    {/* Journal */}
                    <p className="text-[11px] font-mono text-slate-400">{pub.journal}</p>
                  </div>

                  {/* Expand chevron */}
                  <span
                    className="text-slate-300 shrink-0 mt-1 transition-transform"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    ▾
                  </span>
                </div>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div
                  className="px-5 pb-5 border-t"
                  style={{ borderColor: rs.border, background: rs.bg }}
                >
                  <div className="pt-4 space-y-3">
                    <div>
                      <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: rs.text }}>저자</p>
                      <p className="text-[12px] text-slate-600">{pub.authors}</p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: rs.text }}>학술지</p>
                      <p className="text-[12px] text-slate-600 font-medium">
                        {pub.journal}
                        {pub.year ? `, ${pub.year}` : ""}
                        {pub.volume ? `, ${pub.volume}` : ""}
                        {pub.pages ? `, pp. ${pub.pages}` : ""}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {pub.indexed && (
                          <span
                            className="text-[9px] font-black tracking-[0.08em] px-1.5 py-0.5 rounded"
                            style={{ background: INDEX_STYLE[pub.indexed].bg, color: INDEX_STYLE[pub.indexed].text }}
                          >
                            {pub.indexed}
                          </span>
                        )}
                        {pub.impactFactor && (
                          <span className="text-[11px] font-mono text-slate-500">
                            IF {pub.impactFactor.toFixed(1)}{pub.ifYear ? ` (${pub.ifYear})` : ""}
                          </span>
                        )}
                      </div>
                    </div>

                    {pub.doi && (
                      <div>
                        <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: rs.text }}>DOI</p>
                        <p className="text-[12px] font-mono text-blue-600">{pub.doi}</p>
                      </div>
                    )}

                    {pub.topics.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: rs.text }}>키워드</p>
                        <div className="flex flex-wrap gap-1">
                          {pub.topics.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] px-2 py-0.5 rounded font-medium"
                              style={{ background: "#fff", color: "#374151" }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
