import { createHash, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
export const cookieName = "muhlah-sama-editor";
export const tokenFor = (pin: string) => createHash("sha256").update(`muhlah-sama:${pin}`).digest("hex");
export function editorAuthenticated(request: NextRequest) {
  const pin = process.env.SAMA_EDITOR_PIN;
  const token = request.cookies.get(cookieName)?.value ?? "";
  const expected = tokenFor(pin ?? "");
  return Boolean(pin) && Buffer.byteLength(token) === Buffer.byteLength(expected) && timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}
