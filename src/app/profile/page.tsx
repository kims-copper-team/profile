"use client";

import { useEffect, useState } from "react";
import { getResumeData, logVisit, type ResumeData } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const [personal, setPersonal] = useState<ResumeData["personal"] | null>(null);

  useEffect(() => {
    logVisit("/profile");
    getResumeData().then((d) => setPersonal(d.personal));
  }, []);

  return (
    <div className="max-w-[800px] mx-auto px-5 sm:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight mb-1" style={{ letterSpacing: "-0.03em" }}>Profile</h1>
        <p className="text-sm text-slate-500">연구자 소개</p>
      </div>

      <div className="rounded-xl p-6" style={{ background: "#fff", border: "1px solid #E2E8F4" }}>
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black"
            style={{ background: "#DBEAFE", color: "#1D4ED8" }}
          >
            {personal?.nameEn?.slice(0, 2).toUpperCase() ?? "JH"}
          </div>
          <div>
            <h2 className="text-xl font-black">{personal?.name ?? "황지인"}</h2>
            {personal?.nameEn && (
              <p className="text-xs font-mono text-slate-400 tracking-widest">{personal.nameEn.toUpperCase()}</p>
            )}
            <p className="text-sm text-slate-500 mt-0.5">{personal?.title ?? "재료 연구원 · 한국재료연구원"}</p>
          </div>
        </div>

        {personal?.summary && (
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-3">소개</p>
            <p className="text-sm text-slate-600 leading-relaxed">{personal.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
