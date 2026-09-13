export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAuthenticatedSession } from "@/modules/auth/services/session.service";
import { analyzeReport, toAnalyzeReportResponse } from "@/modules/reports";
import { toPublicError } from "@/shared/lib/app-error";
import { PrismaReportRepository } from "@/modules/reports/repositories/prisma-report.repository";

export async function POST(req: Request) {
  try {
    const session = await requireAuthenticatedSession();

    const formData = await req.formData();
    const analysis = await analyzeReport({
      file: formData.get("file"),
    });

    const report = await new PrismaReportRepository().create({ userId: session.user.id, summary: analysis.summary });
    return NextResponse.json(toAnalyzeReportResponse(analysis, report.id));
  } catch (error: unknown) {
    console.error("ANALYZE API ERROR:", error);
    const { message, status } = toPublicError(error);

    return NextResponse.json({ error: message }, { status });
  }
}
