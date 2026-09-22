import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const cookieName = "muhlah-sama-editor";
const tokenFor = (pin: string) => createHash("sha256").update(`muhlah-sama:${pin}`).digest("hex");
const expectedToken = () => tokenFor(process.env.SAMA_EDITOR_PIN ?? "");

export async function GET(request: NextRequest) {
  const token = request.cookies.get(cookieName)?.value ?? "";
  const expected = expectedToken();
  const authenticated = Boolean(process.env.SAMA_EDITOR_PIN) && token.length === expected.length && timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  return NextResponse.json({ authenticated });
}

export async function POST(request: NextRequest) {
  const { pin } = await request.json().catch(() => ({ pin: "" }));
  const configured = process.env.SAMA_EDITOR_PIN ?? "";
  const valid = configured.length > 0 && String(pin).length === configured.length && timingSafeEqual(Buffer.from(String(pin)), Buffer.from(configured));
  if (!valid) return NextResponse.json({ authenticated: false }, { status: 401 });
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(cookieName, tokenFor(configured), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 60 * 60 * 4, path: "/" });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(cookieName, "", { httpOnly: true, expires: new Date(0), path: "/" });
  return response;
}
