"use client";

import { useEffect, useState, useMemo } from "react";

type VisitEntry = {
  ts: string;
  ip: string;
  page: string;
  ua: string;
  ref: string;
};

type IpStat = {
  ip: string;
  count: number;
  pages: string[];
  lastSeen: string;
  firstSeen: string;
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
  const d = new Date(ts);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

const PAGE_LABEL: Record<string, string> = {
  "/": "홈",
  "/resume": "이력서",
  "/career": "경력기술서",
};

function isLocal(ip: string) {
  return ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.") || ip.startsWith("10.");
}

interface Props {
  password: string;
}

export default function VisitorLog({ password }: Props) {
  const [logs, setLogs] = useState<VisitEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterIp, setFilterIp] = useState<string | null>(null);
  const [filterPage, setFilterPage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/visitors?limit=1000", {
      headers: { Authorization: `Bearer ${password}` },
    })
      .then((r) => r.json())
      .then((data) => setLogs(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [password]);

  const filtered = useMemo(() => {
    return logs.filter((e) => {
      if (filterIp && e.ip !== filterIp) return false;
      if (filterPage && e.page !== filterPage) return false;
      return true;
    });
  }, [logs, filterIp, filterPage]);

  const stats = useMemo(() => {
    const total = logs.length;
    const todayCount = logs.filter((e) => isToday(e.ts)).length;
    const uniqueIps = new Set(logs.map((e) => e.ip)).size;

    const ipMap = new Map<string, IpStat>();
    for (const e of logs) {
      const existing = ipMap.get(e.ip);
      if (existing) {
        existing.count++;
        if (!existing.pages.includes(e.page)) existing.pages.push(e.page);
        if (e.ts > existing.lastSeen) existing.lastSeen = e.ts;
        if (e.ts < existing.firstSeen) existing.firstSeen = e.ts;
      } else {
        ipMap.set(e.ip, { ip: e.ip, count: 1, pages: [e.page], lastSeen: e.ts, firstSeen: e.ts });
      }
    }
    const ipStats = Array.from(ipMap.values()).sort((a, b) => b.count - a.count);

    return { total, todayCount, uniqueIps, ipStats };
  }, [logs]);

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-gray-400 text-sm">불러오는 중...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "총 방문수", value: stats.total.toLocaleString() },
          { label: "오늘 방문", value: stats.todayCount.toLocaleString() },
          { label: "고유 IP", value: stats.uniqueIps.toLocaleString() },
        ].map((s) => (
          <div key={s.label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Active filters */}
      {(filterIp || filterPage) && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">필터:</span>
          {filterIp && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-mono text-xs">
              IP: {filterIp}
              <button onClick={() => setFilterIp(null)} className="hover:text-blue-900 ml-1">×</button>
            </span>
          )}
          {filterPage && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs">
              페이지: {PAGE_LABEL[filterPage] ?? filterPage}
              <button onClick={() => setFilterPage(null)} className="hover:text-green-900 ml-1">×</button>
            </span>
          )}
          <button onClick={() => { setFilterIp(null); setFilterPage(null); }} className="text-gray-400 hover:text-gray-700 ml-1">
            전체 초기화
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* IP ranking */}
        <div className="lg:col-span-1">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">IP별 방문 현황</h3>
          <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
            {stats.ipStats.length === 0 && (
              <p className="text-sm text-gray-400 py-4 text-center">방문 기록 없음</p>
            )}
            {stats.ipStats.map((stat) => (
              <button
                key={stat.ip}
                onClick={() => setFilterIp(filterIp === stat.ip ? null : stat.ip)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  filterIp === stat.ip
                    ? "bg-gray-900 text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs truncate">
                    {isLocal(stat.ip) ? "🏠 " : ""}
                    {stat.ip}
                  </span>
                  <span className={`shrink-0 text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                    filterIp === stat.ip ? "bg-white/20" : "bg-gray-200 text-gray-600"
                  }`}>
                    {stat.count}
                  </span>
                </div>
                <div className={`text-xs mt-0.5 ${filterIp === stat.ip ? "text-gray-300" : "text-gray-400"}`}>
                  {stat.pages.map((p) => PAGE_LABEL[p] ?? p).join(" · ")} · {formatTime(stat.lastSeen)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Visit log table */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              방문 로그 {filtered.length > 0 && <span className="text-gray-300">({filtered.length}건)</span>}
            </h3>
            {/* Page filter */}
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
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">IP</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">페이지</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">브라우저</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">유입</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((e, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap text-xs">
                          <span title={new Date(e.ts).toLocaleString("ko-KR")}>
                            {formatTime(e.ts)}
                          </span>
                        </td>
                        <td className="px-4 py-2.5">
                          <button
                            onClick={() => setFilterIp(filterIp === e.ip ? null : e.ip)}
                            className={`font-mono text-xs px-2 py-0.5 rounded transition-colors ${
                              filterIp === e.ip
                                ? "bg-gray-900 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                            title={isLocal(e.ip) ? "로컬(내부) 접속" : e.ip}
                          >
                            {isLocal(e.ip) ? "🏠 " : ""}
                            {e.ip}
                          </button>
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
                        <td className="px-4 py-2.5 text-gray-500 text-xs whitespace-nowrap">
                          {parseDevice(e.ua)}
                        </td>
                        <td className="px-4 py-2.5 text-gray-400 text-xs max-w-[120px] truncate" title={e.ref}>
                          {e.ref ? (
                            (() => {
                              try { return new URL(e.ref).hostname; } catch { return e.ref; }
                            })()
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
