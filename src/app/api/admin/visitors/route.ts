import { NextRequest, NextResponse } from "next/server";
import { readVisitLogs } from "@/lib/visitLog";

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;
  return authHeader.slice(7) === (process.env.ADMIN_PASSWORD ?? "admin1234");
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? 1000), 3000);
  const logs = await readVisitLogs(limit);
  return NextResponse.json(logs);
}
