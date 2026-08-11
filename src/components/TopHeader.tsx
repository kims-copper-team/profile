"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const LABELS: Record<string, string> = {
  "/":                  "Dashboard",
  "/profile/":          "Profile",
  "/career/":           "Career",
  "/research/":         "Research",
  "/publications/":     "Publications",
  "/entrepreneurship/": "Entrepreneurship",
  "/ai/":               "AI & Automation",
  "/skills/":           "Skills",
  "/applications/":     "Applications",
"/contact/":          "Contact",
  "/admin/":            "Admin",
};

export default function TopHeader() {
  const pathname = usePathname();

  // normalize to trailing slash
  const normalized = pathname.endsWith("/") ? pathname : pathname + "/";
  const label = LABELS[normalized] ?? LABELS[pathname] ?? "";

  return (
    <header
      className="sticky top-0 z-40 print:hidden flex items-center justify-between px-6 md:px-8"
      style={{
        height: "52px",
        background: "rgba(247,249,252,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #E2E8F4",
      }}
    >
      <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-slate-400 select-none">
        {label}
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/admin/"
          className="text-[11px] font-medium text-slate-400 hover:text-slate-700 transition-colors"
        >
          Admin
        </Link>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-blue-600"
          style={{ background: "#EFF6FF" }}
        >
          JH
        </div>
      </div>
    </header>
  );
}
