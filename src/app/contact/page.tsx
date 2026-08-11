"use client";

import { useEffect } from "react";
import { logVisit } from "@/lib/supabaseClient";

export default function ContactPage() {
  useEffect(() => { logVisit("/contact"); }, []);

  return (
    <div className="max-w-[600px] mx-auto px-5 sm:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight mb-1" style={{ letterSpacing: "-0.03em" }}>Contact</h1>
        <p className="text-sm text-slate-500">연락처</p>
      </div>

      <div className="rounded-xl p-6" style={{ background: "#fff", border: "1px solid #E2E8F4" }}>
        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">소속</p>
            <p className="text-sm text-slate-700 font-medium">한국재료연구원 (KIMS)</p>
            <p className="text-xs text-slate-400 font-mono">Korea Institute of Materials Science</p>
          </div>
          <div className="border-t border-slate-100 pt-4">
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">위치</p>
            <p className="text-sm text-slate-700">경상남도 창원시</p>
          </div>
        </div>
      </div>
    </div>
  );
}
