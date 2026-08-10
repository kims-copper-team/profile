"use client";

import { useEffect, useState } from "react";
import type { ResumeData, CareerProject } from "@/lib/serverData";
import dynamic from "next/dynamic";

const ResumeEditor = dynamic(() => import("./components/ResumeEditor"), { ssr: false });
const CareerEditor = dynamic(() => import("./components/CareerEditor"), { ssr: false });

type Tab = "resume" | "career";

async function apiFetch(url: string, method: string, password: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${password}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<Tab>("resume");
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [careerData, setCareerData] = useState<CareerProject[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const login = async () => {
    setAuthError("");
    setLoading(true);
    try {
      const res = await fetch("/api/data/resume", {
        headers: { Authorization: `Bearer ${inputPw}` },
      });
      if (res.status === 401) {
        setAuthError("비밀번호가 틀렸습니다.");
      } else {
        const data = await res.json();
        setResumeData(data);
        setPassword(inputPw);
        sessionStorage.setItem("adminPw", inputPw);
      }
    } catch {
      setAuthError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // Restore session
  useEffect(() => {
    const saved = sessionStorage.getItem("adminPw");
    if (saved) {
      setInputPw(saved);
    }
  }, []);

  // Load career data when tab switches
  useEffect(() => {
    if (!password || tab !== "career" || careerData !== null) return;
    setLoading(true);
    apiFetch("/api/data/career", "GET", password)
      .then((r) => r.json())
      .then((d) => setCareerData(d))
      .finally(() => setLoading(false));
  }, [tab, password, careerData]);

  const saveResume = async (data: ResumeData) => {
    setSaving(true);
    try {
      const res = await apiFetch("/api/data/resume", "PUT", password, data);
      if (!res.ok) throw new Error();
      setResumeData(data);
      showToast("success", "이력서가 저장되었습니다.");
    } catch {
      showToast("error", "저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const saveCareer = async (data: CareerProject[]) => {
    setSaving(true);
    try {
      const res = await apiFetch("/api/data/career", "PUT", password, data);
      if (!res.ok) throw new Error();
      setCareerData(data);
      showToast("success", "경력기술서가 저장되었습니다.");
    } catch {
      showToast("error", "저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    setPassword("");
    setInputPw("");
    setResumeData(null);
    setCareerData(null);
    sessionStorage.removeItem("adminPw");
  };

  // ---- Login screen ----
  if (!password) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <div className="mb-6 text-center">
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white mx-auto mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">어드민</h1>
              <p className="text-sm text-gray-500 mt-1">이력서 관리 페이지</p>
            </div>

            <div className="space-y-3">
              <input
                type="password"
                value={inputPw}
                onChange={(e) => setInputPw(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && login()}
                placeholder="비밀번호"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                autoFocus
              />
              {authError && <p className="text-sm text-red-500">{authError}</p>}
              <button
                onClick={login}
                disabled={loading || !inputPw}
                className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium text-sm hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "확인 중..." : "로그인"}
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              기본 비밀번호: <code className="bg-gray-100 px-1 rounded">admin1234</code>
              <br />
              <span className="text-gray-300">(.env.local의 ADMIN_PASSWORD로 변경)</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ---- Admin dashboard ----
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">어드민</h1>
          <p className="text-sm text-gray-500 mt-0.5">이력서 / 경력기술서 관리</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            사이트 보기 →
          </a>
          <button
            onClick={logout}
            className="text-sm text-gray-400 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* Main tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200 pb-0">
        {([["resume", "이력서"], ["career", "경력기술서"]] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors -mb-px border border-transparent ${
              tab === key
                ? "bg-white border-gray-200 border-b-white text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-b-2xl rounded-tr-2xl border border-gray-200 p-6 sm:p-8">
        {loading && (
          <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
            불러오는 중...
          </div>
        )}

        {!loading && tab === "resume" && resumeData && (
          <ResumeEditor initial={resumeData} onSave={saveResume} saving={saving} />
        )}

        {!loading && tab === "career" && careerData && (
          <CareerEditor initial={careerData} onSave={saveCareer} saving={saving} />
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white transition-all ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.type === "success" ? "✓ " : "✗ "}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
