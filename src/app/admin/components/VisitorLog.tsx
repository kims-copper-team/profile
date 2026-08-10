"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";

type VisitEntry = {
  ts: string;
  page: string;
  ua: string;
  ref: string;
};

function parseDevice(ua: string): string {
  if (!ua) return "알 수 없음";
  if (/bot|crawl|spider|slurp|headless/i.test(ua)) return "🤖 봇";
  const mobile = /Mobile|Android|iPhone|iPad/i.test(ua);
  let browser = "기타";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/i.test(ua)) browser = "Opera";
  else if (/Chrome\//i.test(ua)) browser = "Chrome";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Safari\//i.test(ua)) browser = "Safari";
  return `${mobile ? "📱" : "🖥"} ${browser}`;
}

function formatTime(ts: string): string {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}시간 전`;
  return d.toLocaleDateString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function isToday(ts: string): boolean {
  return new Date(ts).toDateString() === new Date().toDateString();
}

const PAGE_LABEL: Record<string, string> = {
  "/": "홈",
  "/resume": "이력서",
  "/career": "경력기술서",
};

export default function VisitorLog() {
  const [logs, setLogs] = useState<VisitEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPage, setFilterPage] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("visitor_logs")
      .select("ts, page, ua, ref")
      .order("ts", { ascending: false })
      .limit(1000)
      .then(({ data }) => {
        setLogs(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    if (!filterPage) return logs;
    return logs.filter((e) => e.page === filterPage);
  }, [logs, filterPage]);

  const stats = useMemo(() => {
    const total = logs.length;
    const todayCount = logs.filter((e) => isToday(e.ts)).length;

    const pageCount: Record<string, number> = {};
    for (const e of logs) {
      pageCount[e.page] = (pageCount[e.page] ?? 0) + 1;
    }

    const browserCount: Record<string, number> = {};
    for (const e of logs) {
      const b = parseDevice(e.ua);
      browserCount[b] = (browserCount[b] ?? 0) + 1;
    }
    const browsers = Object.entries(browserCount).sort((a, b) => b[1] - a[1]);

    return { total, todayCount, pageCount, browsers };
  }, [logs]);

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-gray-400 text-sm">불러오는 중...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "총 방문수", value: stats.total.toLocaleString() },
          { label: "오늘 방문", value: stats.todayCount.toLocaleString() },
          { label: "페이지 종류", value: Object.keys(stats.pageCount).length.toString() },
        ].map((s) => (
          <div key={s.label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Page / Browser breakdown */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">페이지별 방문</h3>
            <div className="space-y-1.5">
              {Object.entries(stats.pageCount)
                .sort((a, b) => b[1] - a[1])
                .map(([page, count]) => (
                  <button
                    key={page}
                    onClick={() => setFilterPage(filterPage === page ? null : page)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      filterPage === page ? "bg-gray-900 text-white" : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span>{PAGE_LABEL[page] ?? page}</span>
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                        filterPage === page ? "bg-white/20" : "bg-gray-200 text-gray-600"
                      }`}>{count}</span>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">브라우저</h3>
            <div className="space-y-1.5">
              {stats.browsers.map(([browser, count]) => (
                <div key={browser} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-sm">
                  <span className="text-gray-700">{browser}</span>
                  <span className="text-xs font-semibold bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visit log table */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              방문 로그{filtered.length > 0 && <span className="text-gray-300 ml-1">({filtered.length}건)</span>}
            </h3>
            <div className="flex gap-1">
              {Object.entries(PAGE_LABEL).map(([path, label]) => (
                <button
                  key={path}
                  onClick={() => setFilterPage(filterPage === path ? null : path)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    filterPage === path ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
              {filterPage && (
                <button onClick={() => setFilterPage(null)} className="px-2.5 py-1 text-xs text-gray-400 hover:text-gray-700">
                  초기화
                </button>
              )}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-sm text-gray-400">방문 기록이 없습니다.</div>
            ) : (
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 whitespace-nowrap">시간</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">페이지</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">브라우저</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">유입</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((e, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap text-xs">
                          <span title={new Date(e.ts).toLocaleString("ko-KR")}>{formatTime(e.ts)}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            e.page === "/resume" ? "bg-blue-50 text-blue-700" :
                            e.page === "/career" ? "bg-green-50 text-green-700" :
                            "bg-gray-100 text-gray-600"
                          }`}>
                            {PAGE_LABEL[e.page] ?? e.page}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-gray-500 text-xs whitespace-nowrap">{parseDevice(e.ua)}</td>
                        <td className="px-4 py-2.5 text-gray-400 text-xs max-w-[120px] truncate" title={e.ref}>
                          {e.ref ? (
                            (() => { try { return new URL(e.ref).hostname; } catch { return e.ref; } })()
                          ) : (
                            <span className="text-gray-300">직접</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
