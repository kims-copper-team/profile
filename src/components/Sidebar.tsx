"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/",                label: "Dashboard",        icon: "◈" },
  { href: "/profile/",        label: "Profile",          icon: "◉" },
  { href: "/career/",         label: "Career",           icon: "◎" },
  { href: "/research/",       label: "Research",         icon: "◇" },
  { href: "/publications/",   label: "Publications",     icon: "◆" },
  { href: "/entrepreneurship/", label: "Entrepreneurship", icon: "◈" },
  { href: "/ai/",             label: "AI & Automation",  icon: "◌" },
  { href: "/skills/",         label: "Skills",           icon: "◐" },
  { href: "/applications/",   label: "Applications",     icon: "⚿", locked: true },
];

const FOOTER = [
  { href: "/cv/",      label: "CV / Resume" },
  { href: "/contact/", label: "Contact" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const NavContent = () => (
    <>
      {/* Brand */}
      <div className="px-5 py-4 border-b border-white/[0.07]">
        <Link
          href="/"
          className="text-[11px] font-bold font-mono tracking-[0.15em] text-amber-500/80 hover:text-amber-400 transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          JIH · MATERIALS LAB
        </Link>
        <p className="text-[9px] font-mono text-white/20 mt-0.5 tracking-widest">KIMS · Cu Alloys · AI</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto">
        {NAV.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium mb-0.5 transition-colors ${
                active
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/20"
                  : item.locked
                  ? "text-amber-900/60 hover:text-amber-800/60"
                  : "text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
              }`}
            >
              {active && (
                <span className="absolute left-0 w-0.5 h-6 bg-blue-400 rounded-r-full" style={{ marginLeft: "-8px" }} />
              )}
              <span className="text-[10px] w-3 shrink-0 opacity-60">{item.icon}</span>
              <span>{item.label}</span>
              {item.locked && (
                <span className="ml-auto text-[9px] font-mono text-amber-700/50">AUTH</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 py-3 border-t border-white/[0.07]">
        {FOOTER.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] text-white/25 hover:text-white/60 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="fixed top-0 left-0 h-screen w-[240px] flex flex-col print:hidden z-50 hidden md:flex"
        style={{ background: "#0E1117", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <NavContent />
      </aside>

      {/* Mobile: hamburger button */}
      <button
        className="fixed top-3 left-3 z-50 md:hidden print:hidden p-2 rounded-md"
        style={{ background: "#0E1117", border: "1px solid rgba(255,255,255,0.12)" }}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="메뉴"
      >
        <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileOpen
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="fixed top-0 left-0 h-screen w-[240px] flex flex-col z-50 md:hidden"
            style={{ background: "#0E1117", borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            <NavContent />
          </aside>
        </>
      )}
    </>
  );
}
