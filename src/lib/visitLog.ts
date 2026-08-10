import fs from "fs";
import path from "path";
import { headers } from "next/headers";

const LOG_FILE = path.join(process.cwd(), "data", "visitors.jsonl");
const MAX_LINES = 3000;

export type VisitEntry = {
  ts: string;
  ip: string;
  page: string;
  ua: string;
  ref: string;
};

export async function logVisit(page: string) {
  try {
    const h = await headers();
    const forwarded = h.get("x-forwarded-for");
    const ip =
      (forwarded ? forwarded.split(",")[0].trim() : null) ??
      h.get("x-real-ip") ??
      "::1";

    const entry: VisitEntry = {
      ts: new Date().toISOString(),
      ip,
      page,
      ua: h.get("user-agent") ?? "",
      ref: h.get("referer") ?? "",
    };

    fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
    fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n", "utf-8");

    const stat = fs.statSync(LOG_FILE);
    if (stat.size > 2 * 1024 * 1024) trimOldEntries();
  } catch {
    // never crash the page due to logging failure
  }
}

function trimOldEntries() {
  try {
    const lines = fs.readFileSync(LOG_FILE, "utf-8").split("\n").filter(Boolean);
    if (lines.length > MAX_LINES) {
      fs.writeFileSync(LOG_FILE, lines.slice(-MAX_LINES).join("\n") + "\n", "utf-8");
    }
  } catch {}
}

export function readVisitLogs(limit = 1000): VisitEntry[] {
  try {
    if (!fs.existsSync(LOG_FILE)) return [];
    const lines = fs.readFileSync(LOG_FILE, "utf-8").split("\n").filter(Boolean);
    return lines
      .slice(-limit)
      .reverse()
      .map((l) => JSON.parse(l) as VisitEntry);
  } catch {
    return [];
  }
}
