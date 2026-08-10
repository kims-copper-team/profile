import { NextRequest, NextResponse } from "next/server";
import { getCareerData, saveCareerData, CareerProject } from "@/lib/serverData";

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;
  const token = authHeader.slice(7);
  const password = process.env.ADMIN_PASSWORD ?? "admin1234";
  return token === password;
}

export async function GET() {
  const data = getCareerData();
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as CareerProject[];
    saveCareerData(body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
