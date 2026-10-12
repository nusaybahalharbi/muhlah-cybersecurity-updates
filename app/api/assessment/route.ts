import { NextRequest, NextResponse } from "next/server";
import { editorAuthenticated } from "@/lib/editor-auth";
import { assessmentKey, readAssessment, redis, saveScript, validMutation, validateAssessment } from "@/lib/shared-store";
export const dynamic = "force-dynamic";
const headers = {"Cache-Control":"no-store, max-age=0"};
export async function GET() {
  try { return NextResponse.json(await readAssessment(),{headers}); }
  catch { return NextResponse.json({error:"Shared assessment could not be loaded. Retry before editing."},{status:503,headers}); }
}
export async function PATCH(request: NextRequest) {
  if (!editorAuthenticated(request)) return NextResponse.json({error:"Your editor session expired. Unlock editing again."},{status:401,headers});
  const origin=request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({error:"Invalid request origin."},{status:403,headers});
  const body=await request.json().catch(()=>null);
  if (!validMutation(body)) return NextResponse.json({error:"Invalid control, maturity or revision."},{status:400,headers});
  try {
    const [saved, raw] = await redis(["EVAL",saveScript,1,assessmentKey,body.revision,body.id,JSON.stringify(body.value),new Date().toISOString(),body.mutationId]);
    const assessment=validateAssessment(JSON.parse(raw));
    return NextResponse.json(saved ? assessment : {error:"Another editor saved a newer update. Latest data loaded; review it and retry your change.",assessment},{status:saved?200:409,headers});
  } catch { return NextResponse.json({error:"Save could not be confirmed. Refresh to check the shared value before retrying."},{status:503,headers}); }
}
