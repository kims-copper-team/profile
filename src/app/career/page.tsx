"use client";

import { useState } from "react";
import { CAREER_ENTRIES, CAREER_EVENTS, type CareerEntry } from "@/lib/data/career";
import { logVisit } from "@/lib/supabaseClient";
import { useEffect } from "react";

// ── Chart constants ──────────────────────────────────────────────────────────
const CHART_START = 2018;
const CHART_END   = 2027;
const TOTAL_YEARS = CHART_END - CHART_START;

const VW = 900;  // SVG viewBox width
const ML = 56;   // left margin
const MR = 16;   // right margin
const IW = VW - ML - MR;  // inner width

const BAR_H   = 28;
const LANE_GAP = 10;
const LANE_Y   = [148, 148 + BAR_H + LANE_GAP]; // lane 0, lane 1
const AXIS_Y   = LANE_Y[1] + BAR_H + 28;
const VH       = AXIS_Y + 28;  // total SVG height

const yearToX = (year: number, month = 1) =>
  ML + ((year - CHART_START + (month - 1) / 12) / TOTAL_YEARS) * IW;

// ── Category styling ─────────────────────────────────────────────────────────
const CAT_STYLE = {
  Industry: { fill: "#D97706", bg: "#FFFBEB", text: "#92400E", border: "#FDE68A", label: "산업 R&D" },
  Startup:  { fill: "#7C3AED", bg: "#F5F3FF", text: "#5B21B6", border: "#DDD6FE", label: "스타트업" },
  Research: { fill: "#059669", bg: "#ECFDF5", text: "#065F46", border: "#6EE7B7", label: "연구" },
};

const EVENT_STYLE = {
  award:       { color: "#EC4899", emoji: "🏆" },
  cert:        { color: "#3B82F6", emoji: "📋" },
  publication: { color: "#059669", emoji: "📄" },
};

// ── Main component ────────────────────────────────────────────────────────────
export default function CareerPage() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => { logVisit("/career"); }, []);

  const selectedEntry = selected ? CAREER_ENTRIES.find((e) => e.id === selected) : null;

  const years = Array.from({ length: TOTAL_YEARS + 1 }, (_, i) => CHART_START + i);

  // Alternating event row heights so labels don't collide
  const eventRowY: Record<string, number> = {};
  let lastRow = 0;
  CAREER_EVENTS.forEach((ev) => {
    const key = `${ev.year}-${ev.type}`;
    eventRowY[key] = lastRow === 0 ? 30 : 58;
    lastRow = lastRow === 0 ? 1 : 0;
  });

  return (
    <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight mb-1" style={{ letterSpacing: "-0.03em" }}>Career</h1>
        <p className="text-sm text-slate-500">2018 – 현재 · 총 {CAREER_ENTRIES.length}개 직장</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-5">
        {(Object.entries(CAT_STYLE) as [keyof typeof CAT_STYLE, typeof CAT_STYLE.Industry][]).map(([key, s]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: s.fill }} />
            <span className="text-xs text-slate-500">{s.label}</span>
          </div>
        ))}
        <div className="ml-3 flex gap-3">
          {(Object.entries(EVENT_STYLE) as [string, typeof EVENT_STYLE.award][]).map(([key, s]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="text-xs">{s.emoji}</span>
              <span className="text-xs text-slate-400">
                {key === "award" ? "수상" : key === "cert" ? "자격증" : "논문"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Gantt Chart ── */}
      <div
        className="rounded-xl overflow-hidden mb-6"
        style={{ background: "#fff", border: "1px solid #E2E8F4" }}
      >
        <div style={{ overflowX: "auto" }}>
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            style={{ display: "block", width: "100%", minWidth: "600px" }}
          >
            {/* Vertical grid lines */}
            {years.map((y) => (
              <line
                key={y}
                x1={yearToX(y)} y1={10}
                x2={yearToX(y)} y2={AXIS_Y - 4}
                stroke="#F1F5F9"
                strokeWidth={y % 2 === 0 ? 1.5 : 1}
              />
            ))}

            {/* Today line */}
            {(() => {
              const now = new Date();
              const x = yearToX(now.getFullYear(), now.getMonth() + 1);
              return (
                <g>
                  <line x1={x} y1={10} x2={x} y2={AXIS_Y - 4} stroke="#2563EB" strokeWidth={1.5} strokeDasharray="4,3" opacity={0.4} />
                  <text x={x} y={8} textAnchor="middle" fontSize={8} fill="#2563EB" opacity={0.7} fontWeight="600">TODAY</text>
                </g>
              );
            })()}

            {/* ── Event markers (above bars) ── */}
            {CAREER_EVENTS.map((ev) => {
              const x = yearToX(ev.year, ev.month);
              const key = `${ev.year}-${ev.type}`;
              const rowY = eventRowY[key] ?? 44;
              const style = EVENT_STYLE[ev.type];
              return (
                <g key={key}>
                  <line x1={x} y1={rowY + 14} x2={x} y2={LANE_Y[0] - 2} stroke={style.color} strokeWidth={1} strokeDasharray="3,3" opacity={0.4} />
                  <text x={x + 6} y={rowY + 12} fontSize={9} fill={style.color} fontWeight="600">
                    {style.emoji} {ev.label}
                  </text>
                </g>
              );
            })}

            {/* ── Career bars ── */}
            {CAREER_ENTRIES.map((e) => {
              const x1 = yearToX(e.startYear, e.startMonth);
              const x2 = yearToX(e.endYear ?? (new Date().getFullYear()), e.endMonth ?? (new Date().getMonth() + 1));
              const barY = LANE_Y[e.lane];
              const style = CAT_STYLE[e.category];
              const isSelected = selected === e.id;
              const barW = Math.max(x2 - x1, 2);

              return (
                <g
                  key={e.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelected(selected === e.id ? null : e.id)}
                >
                  {/* Bar */}
                  <rect
                    x={x1} y={barY}
                    width={barW} height={BAR_H}
                    rx={4}
                    fill={style.fill}
                    opacity={isSelected ? 1 : 0.82}
                    stroke={isSelected ? "white" : "none"}
                    strokeWidth={isSelected ? 2 : 0}
                  />
                  {/* Bar text (only if wide enough) */}
                  {barW > 20 && (
                    <text
                      x={x1 + 7} y={barY + BAR_H / 2 + 4}
                      fontSize={9} fill="white" fontWeight="700"
                    >
                      {e.company.replace("주식회사", "").replace("(주)", "").trim()}
                    </text>
                  )}

                  {/* "직" flag + company label above bar */}
                  <rect
                    x={x1 - 1} y={barY - 24}
                    width={17} height={18}
                    rx={3} fill={style.fill}
                  />
                  {/* Triangle connector */}
                  <polygon
                    points={`${x1 - 1},${barY - 6} ${x1 + 16},${barY - 6} ${x1 + 7},${barY}`}
                    fill={style.fill}
                  />
                  <text
                    x={x1 + 7.5} y={barY - 10}
                    textAnchor="middle" fontSize={8}
                    fill="white" fontWeight="800"
                  >
                    직
                  </text>
                  {/* Company name label */}
                  <text
                    x={x1 + 22} y={barY - 9}
                    fontSize={10} fill="#374151" fontWeight={isSelected ? "700" : "600"}
                  >
                    {e.company}
                  </text>
                </g>
              );
            })}

            {/* ── X Axis ── */}
            <line x1={ML} y1={AXIS_Y} x2={VW - MR} y2={AXIS_Y} stroke="#CBD5E1" strokeWidth={1.5} />
            {years.map((y) => (
              <g key={y}>
                <line
                  x1={yearToX(y)} y1={AXIS_Y}
                  x2={yearToX(y)} y2={AXIS_Y + 5}
                  stroke="#CBD5E1" strokeWidth={y % 2 === 0 ? 1.5 : 1}
                />
                <text
                  x={yearToX(y)} y={AXIS_Y + 16}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#94A3B8"
                  fontFamily="monospace"
                  fontWeight={y % 2 === 0 ? "600" : "400"}
                >
                  {String(y).slice(2)}
                </text>
              </g>
            ))}

          </svg>
        </div>
      </div>

      {/* ── Selected entry detail card ── */}
      {selectedEntry && <EntryDetail entry={selectedEntry} onClose={() => setSelected(null)} />}

      {/* ── Entry list ── */}
      <div className="space-y-3">
        {CAREER_ENTRIES.slice().reverse().map((e) => {
          const style = CAT_STYLE[e.category];
          const period = `${e.startYear}.${String(e.startMonth).padStart(2, "0")} – ${
            e.endYear ? `${e.endYear}.${String(e.endMonth ?? 1).padStart(2, "0")}` : "현재"
          }`;
          return (
            <button
              key={e.id}
              onClick={() => setSelected(selected === e.id ? null : e.id)}
              className="w-full text-left rounded-xl p-5 transition-all hover:shadow-md"
              style={{
                background: selected === e.id ? style.bg : "#fff",
                border: `1px solid ${selected === e.id ? style.border : "#E2E8F4"}`,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded shrink-0"
                    style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
                  >
                    {style.label}
                  </span>
                  <div>
                    <p className="font-bold text-[15px] text-slate-800">{e.company}</p>
                    {e.companyEn && e.companyEn !== e.company && (
                      <p className="text-[10px] font-mono text-slate-400 tracking-wide mt-0.5">{e.companyEn}</p>
                    )}
                    <p className="text-sm text-slate-500 mt-0.5">{e.role}</p>
                  </div>
                </div>
                <p className="text-xs font-mono text-slate-400 shrink-0">{period}</p>
              </div>
              {selected === e.id && (
                <div className="mt-4 pt-4 border-t" style={{ borderColor: style.border }}>
                  <ul className="space-y-1.5">
                    {e.description.map((d, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-600">
                        <span className="text-slate-300 mt-0.5 shrink-0">·</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  {e.achievements && e.achievements.length > 0 && (
                    <div className="mt-3 pt-3 border-t" style={{ borderColor: style.border }}>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">성과</p>
                      <ul className="space-y-1">
                        {e.achievements.map((a, i) => (
                          <li key={i} className="flex gap-2 text-sm" style={{ color: style.text }}>
                            <span className="shrink-0">✓</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EntryDetail({ entry, onClose }: { entry: CareerEntry; onClose: () => void }) {
  const style = CAT_STYLE[entry.category];
  const period = `${entry.startYear}.${String(entry.startMonth).padStart(2, "0")} – ${
    entry.endYear ? `${entry.endYear}.${String(entry.endMonth ?? 1).padStart(2, "0")}` : "현재"
  }`;

  return (
    <div
      className="rounded-xl p-6 mb-4 shadow-lg"
      style={{ background: style.bg, border: `1.5px solid ${style.border}` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded mb-2 inline-block"
            style={{ background: "white", color: style.text }}
          >
            {style.label}
          </span>
          <h2 className="text-xl font-black" style={{ color: style.text }}>{entry.company}</h2>
          <p className="text-sm font-medium" style={{ color: style.text + "AA" }}>{entry.role}</p>
          <p className="text-xs font-mono mt-1" style={{ color: style.text + "80" }}>{period}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded"
        >
          ✕
        </button>
      </div>
      <ul className="space-y-2">
        {entry.description.map((d, i) => (
          <li key={i} className="flex gap-2 text-sm text-slate-700">
            <span className="mt-0.5 shrink-0" style={{ color: style.text }}>→</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
      {entry.achievements && entry.achievements.length > 0 && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: style.border }}>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: style.text }}>성과</p>
          {entry.achievements.map((a, i) => (
            <div key={i} className="flex gap-2 text-sm mb-1" style={{ color: style.text }}>
              <span>✓</span><span>{a}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
