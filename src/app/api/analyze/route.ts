export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAuthenticatedSession } from "@/modules/auth/services/session.service";
import { analyzeReport, toAnalyzeReportResponse } from "@/modules/reports";
import { toPublicError } from "@/shared/lib/app-error";

export async function POST(req: Request) {
  try {
    await requireAuthenticatedSession();

    const formData = await req.formData();
    const analysis = await analyzeReport({
      file: formData.get("file"),
    });

    return NextResponse.json(toAnalyzeReportResponse(analysis));
  } catch (error: unknown) {
    console.error("ANALYZE API ERROR:", error);
    const { message, status } = toPublicError(error);

    return NextResponse.json({ error: message }, { status });
  }
}
