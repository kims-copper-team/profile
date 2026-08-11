"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getResumeData, logVisit, type ResumeData } from "@/lib/supabaseClient";

const ELEMENTS = [
  { symbol: "Fe", name: "Iron",      number: 26, color: "#60a5fa" },
  { symbol: "Ni", name: "Nickel",    number: 28, color: "#f59e0b" },
  { symbol: "Ti", name: "Titanium",  number: 22, color: "#a78bfa" },
  { symbol: "Al", name: "Aluminum",  number: 13, color: "#34d399" },
  { symbol: "Cu", name: "Copper",    number: 29, color: "#fb923c" },
  { symbol: "Cr", name: "Chromium",  number: 24, color: "#f472b6" },
];

function ElementCard({ symbol, name, number, color }: { symbol: string; name: string; number: number; color: string }) {
  return (
    <div
      className="w-[72px] h-[72px] rounded-lg flex flex-col items-center justify-center relative cursor-default select-none transition-all duration-200 hover:scale-105"
      style={{
        background: `${color}10`,
        border: `1px solid ${color}30`,
        boxShadow: `0 0 12px ${color}10`,
      }}
    >
      <span className="absolute top-1.5 left-2 text-[9px] font-mono" style={{ color: `${color}80` }}>{number}</span>
      <span className="text-xl font-bold" style={{ color }}>{symbol}</span>
      <span className="text-[9px] mt-0.5" style={{ color: `${color}80` }}>{name}</span>
    </div>
  );
}

function HexGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.03 }}>
      <defs>
        <pattern id="hexgrid" x="0" y="0" width="60" height="104" patternUnits="userSpaceOnUse">
          <polygon points="30,2 58,17 58,47 30,62 2,47 2,17" fill="none" stroke="#d97706" strokeWidth="1" />
          <polygon points="30,54 58,69 58,99 30,114 2,99 2,69" fill="none" stroke="#d97706" strokeWidth="1" />
          <polygon points="60,28 88,43 88,73 60,88 32,73 32,43" fill="none" stroke="#d97706" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexgrid)" />
    </svg>
  );
}

export default function Home() {
  const [personal, setPersonal] = useState<ResumeData["personal"] | null>(null);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    logVisit("/");
    getResumeData().then((d) => setPersonal(d.personal));
    const t = setInterval(() => setBlink((v) => !v), 900);
    return () => clearInterval(t);
  }, []);

  if (!personal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1117]">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[11px] font-mono tracking-[0.3em] text-amber-500/60">LOADING PROFILE...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white relative overflow-hidden">
      <HexGrid />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 70%)" }} />

      {/* Status bar */}
      <div className="relative border-b border-white/[0.06] px-4 sm:px-8 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3 text-[11px] font-mono text-gray-500">
          <span className="text-amber-500/80 tracking-[0.2em]">MATERIALS LAB</span>
          <span className="text-white/10">│</span>
          <span>PORTFOLIO</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className={`w-1.5 h-1.5 rounded-full transition-opacity duration-300 bg-green-400 ${blink ? "opacity-100" : "opacity-40"}`} />
          <span className="text-green-400/80">ONLINE</span>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Hero */}
        <div className="mb-12">
          <p className="text-[11px] font-mono text-amber-500/60 tracking-[0.35em] mb-4">
            ◆ RESEARCHER PROFILE
          </p>
          <h1
            className="text-5xl sm:text-7xl font-bold tracking-tight mb-3 leading-none"
            style={{ textShadow: "0 0 60px rgba(217,119,6,0.25)" }}
          >
            {personal.name || "이름 없음"}
          </h1>
          {personal.nameEn && (
            <p className="text-gray-500 font-mono text-sm mb-4 tracking-widest">{personal.nameEn.toUpperCase()}</p>
          )}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-amber-500 to-transparent" />
            <p className="text-amber-400 text-base sm:text-lg font-medium">{personal.title}</p>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-5 mb-5">

          {/* Overview + Contact */}
          <div className="lg:col-span-2 rounded-xl p-6 sm:p-7"
               style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-[10px] font-mono text-gray-600 tracking-[0.25em] mb-4">// OVERVIEW</p>
            {personal.summary ? (
              <p className="text-gray-300 leading-relaxed text-sm">{personal.summary}</p>
            ) : (
              <p className="text-gray-600 text-sm italic">어드민에서 자기소개를 입력하세요.</p>
            )}

            <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-[10px] font-mono text-gray-600 tracking-[0.25em] mb-4">// CONTACT</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {personal.email && (
                  <a href={`mailto:${personal.email}`}
                     className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-amber-400 transition-colors group">
                    <span className="font-mono text-amber-600/50 group-hover:text-amber-500 text-xs shrink-0">→</span>
                    {personal.email}
                  </a>
                )}
                {personal.phone && (
                  <div className="flex items-center gap-2.5 text-sm text-gray-400">
                    <span className="font-mono text-amber-600/50 text-xs shrink-0">→</span>
                    {personal.phone}
                  </div>
                )}
                {personal.location && (
                  <div className="flex items-center gap-2.5 text-sm text-gray-400">
                    <span className="font-mono text-amber-600/50 text-xs shrink-0">→</span>
                    {personal.location}
                  </div>
                )}
                {personal.github && (
                  <a href={personal.github} target="_blank" rel="noreferrer"
                     className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-amber-400 transition-colors group">
                    <span className="font-mono text-amber-600/50 group-hover:text-amber-500 text-xs shrink-0">→</span>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Stat readouts */}
          <div className="flex flex-row lg:flex-col gap-4">
            {[
              { key: "CAREER",   value: "5Y+",                   sub: "총 경력" },
              { key: "PROJECTS", value: "10+",                   sub: "참여 프로젝트" },
              { key: "LOCATION", value: personal.location || "—", sub: "현재 위치" },
            ].map((s) => (
              <div key={s.key}
                   className="flex-1 rounded-xl px-5 py-4"
                   style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-[9px] font-mono tracking-[0.2em] mb-1.5" style={{ color: "rgba(217,119,6,0.5)" }}>
                  {s.key}
                </p>
                <p className="text-2xl sm:text-3xl font-bold"
                   style={{ textShadow: "0 0 20px rgba(217,119,6,0.3)" }}>
                  {s.value}
                </p>
                <p className="text-[11px] text-gray-600 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Elements */}
        <div className="rounded-xl p-6 mb-8"
             style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[10px] font-mono text-gray-600 tracking-[0.25em] mb-5">// KEY ELEMENTS</p>
          <div className="flex flex-wrap gap-3">
            {ELEMENTS.map((el) => <ElementCard key={el.symbol} {...el} />)}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/resume/"
            className="px-7 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
            style={{
              border: "1px solid rgba(217,119,6,0.5)",
              color: "#f59e0b",
              background: "rgba(217,119,6,0.07)",
              boxShadow: "0 0 20px rgba(217,119,6,0.08)",
            }}
          >
            이력서 열람 →
          </Link>
          <Link
            href="/career/"
            className="px-7 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-all duration-200"
            style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}
          >
            경력기술서 열람 →
          </Link>
        </div>

      </div>
    </div>
  );
}
