"use client";

export default function ApplicationsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-5 sm:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight mb-1" style={{ letterSpacing: "-0.03em" }}>Applications</h1>
        <p className="text-sm text-slate-500">지원 현황 · 커버레터</p>
      </div>

      <div
        className="rounded-xl p-8 text-center"
        style={{ background: "#fff", border: "1px solid #E2E8F4" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg"
          style={{ background: "#FFFBEB", color: "#D97706" }}
        >
          ⚿
        </div>
        <p className="font-bold text-slate-700 mb-1">로그인이 필요합니다</p>
        <p className="text-sm text-slate-400">이 페이지는 관리자 인증 후 이용 가능합니다.</p>
      </div>
    </div>
  );
}
