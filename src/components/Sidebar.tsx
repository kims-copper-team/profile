"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/",                  label: "Dashboard",        icon: "◈" },
  { href: "/profile/",          label: "Profile",          icon: "◉" },
  { href: "/career/",           label: "Career",           icon: "◎" },
  { href: "/research/",         label: "Research",         icon: "◇" },
  { href: "/publications/",     label: "Publications",     icon: "◆" },
  { href: "/entrepreneurship/", label: "Entrepreneurship", icon: "◈" },
  { href: "/ai/",               label: "AI & Automation",  icon: "◌" },
  { href: "/skills/",           label: "Skills",           icon: "◐" },
  { href: "/applications/",     label: "Applications",     icon: "⚿", locked: true },
];

const FOOTER = [
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
      <div className="px-5 py-4" style={{ borderBottom: "1px solid #E2E8F4" }}>
        <Link
          href="/"
          className="text-[11px] font-bold font-mono tracking-[0.15em] transition-colors"
          style={{ color: "#D97706" }}
          onClick={() => setMobileOpen(false)}
        >
          JIH · MATERIALS LAB
        </Link>
        <p className="text-[9px] font-mono mt-0.5 tracking-widest" style={{ color: "#94A3B8" }}>
          KIMS · Cu Alloys · AI
        </p>
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
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium mb-0.5 transition-colors relative"
              style={{
                background: active ? "#EFF6FF" : "transparent",
                color: active ? "#2563EB" : item.locked ? "#D97706" : "#64748B",
                border: active ? "1px solid #BFDBFE" : "1px solid transparent",
              }}
            >
              {active && (
                <span
                  className="absolute left-0 w-0.5 h-5 rounded-r-full"
                  style={{ background: "#2563EB", marginLeft: "-1px" }}
                />
              )}
              <span className="text-[10px] w-3 shrink-0" style={{ opacity: 0.5 }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.locked && (
                <span className="ml-auto text-[9px] font-mono" style={{ color: "#F59E0B" }}>AUTH</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 py-3" style={{ borderTop: "1px solid #E2E8F4" }}>
        {FOOTER.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] transition-colors"
            style={{ color: "#94A3B8" }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );

  const sidebarStyle = { background: "#FFFFFF", borderRight: "1px solid #E2E8F4" };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="fixed top-0 left-0 h-screen w-[240px] flex flex-col print:hidden z-50 hidden md:flex"
        style={sidebarStyle}
      >
        <NavContent />
      </aside>

      {/* Mobile: hamburger button */}
      <button
        className="fixed top-3 left-3 z-50 md:hidden print:hidden p-2 rounded-md"
        style={{ background: "#fff", border: "1px solid #E2E8F4" }}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="메뉴"
      >
        <svg className="w-5 h-5" fill="none" stroke="#64748B" viewBox="0 0 24 24">
          {mobileOpen
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="fixed top-0 left-0 h-screen w-[240px] flex flex-col z-50 md:hidden"
            style={sidebarStyle}
          >
            <NavContent />
          </aside>
        </>
      )}
    </>
  );
}
