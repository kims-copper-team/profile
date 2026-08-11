import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "황지인 · Materials Researcher",
  description: "한국재료연구원 재료연구원. Cu 합금 · AI 기반 소재 개발 · 기술 사업화",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.className} antialiased`} style={{ background: "#F7F9FC", color: "#0F172A" }}>
        <Sidebar />
        <div className="md:ml-[240px] flex flex-col min-h-screen">
          <TopHeader />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
