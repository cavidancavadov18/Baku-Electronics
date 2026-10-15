import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readSession } from "@/lib/admin";
import { readSiteContent, writeSiteContent } from "@/lib/site-content";

async function guard() {
  const jar = await cookies();
  return readSession(jar.get("be-admin")?.value);
}

export async function GET() {
  const user = await guard();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, content: readSiteContent() });
}

export async function PUT(request: Request) {
  const user = await guard();
  if (!user?.is_superuser) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await request.json().catch(() => null);
  const content = writeSiteContent(body);
  if (!content) return NextResponse.json({ ok: false }, { status: 400 });
  return NextResponse.json({ ok: true, content });
}
