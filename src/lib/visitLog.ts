import { headers } from "next/headers";
import { getSupabaseClient, isSupabaseConfigured } from "./supabase";
import fs from "fs";
import path from "path";

export type VisitEntry = {
  ts: string;
  ip: string;
  page: string;
  ua: string;
  ref: string;
};

const LOG_FILE = path.join(process.cwd(), "data", "visitors.jsonl");

export async function logVisit(page: string) {
  try {
    const h = await headers();
    const forwarded = h.get("x-forwarded-for");
    const ip =
      (forwarded ? forwarded.split(",")[0].trim() : null) ??
      h.get("x-real-ip") ??
      "::1";
    const ua = h.get("user-agent") ?? "";
    const ref = h.get("referer") ?? "";

    if (isSupabaseConfigured()) {
      const db = getSupabaseClient();
      await db.from("visitor_logs").insert({ ip, page, ua, ref });
    } else {
      // Fallback: file-based logging
      fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
      fs.appendFileSync(LOG_FILE, JSON.stringify({ ts: new Date().toISOString(), ip, page, ua, ref }) + "\n");
    }
  } catch {
    // never crash the page
  }
}

export async function readVisitLogs(limit = 1000): Promise<VisitEntry[]> {
  if (isSupabaseConfigured()) {
    const db = getSupabaseClient();
    const { data, error } = await db
      .from("visitor_logs")
      .select("ts, ip, page, ua, ref")
      .order("ts", { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data.map((row) => ({
      ts: row.ts as string,
      ip: row.ip as string,
      page: row.page as string,
      ua: row.ua as string,
      ref: row.ref as string,
    }));
  }

  // Fallback: file-based
  try {
    if (!fs.existsSync(LOG_FILE)) return [];
    const lines = fs.readFileSync(LOG_FILE, "utf-8").split("\n").filter(Boolean);
    return lines.slice(-limit).reverse().map((l) => JSON.parse(l) as VisitEntry);
  } catch {
    return [];
  }
}
