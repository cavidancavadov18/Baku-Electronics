import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { listUsers, readSession } from "@/lib/admin";

export async function GET() {
  const jar = await cookies();
  const user = readSession(jar.get("be-admin")?.value);
  if (!user?.is_superuser) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, users: listUsers() });
}
