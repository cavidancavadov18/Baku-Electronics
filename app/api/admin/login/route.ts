import { NextResponse } from "next/server";
import { authenticate, publicUser, signSession } from "@/lib/admin";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { username?: string; password?: string } | null;
  const user = authenticate(String(body?.username ?? ""), String(body?.password ?? ""));
  if (!user) return NextResponse.json({ ok: false, error: "İstifadəçi adı və ya şifrə yanlışdır." }, { status: 401 });
  const response = NextResponse.json({ ok: true, user: publicUser(user) });
  response.cookies.set("be-admin", signSession(user.username), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
