import { NextRequest, NextResponse } from "next/server";
import { getResumeData, saveResumeData, ResumeData } from "@/lib/serverData";

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;
  return authHeader.slice(7) === (process.env.ADMIN_PASSWORD ?? "admin1234");
}

export async function GET() {
  const data = await getResumeData();
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = (await req.json()) as ResumeData;
    await saveResumeData(body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
