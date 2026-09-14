export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAuthenticatedSession } from "@/modules/auth/services/session.service";
import { analyzeReport, toAnalyzeReportResponse } from "@/modules/reports";
import { toPublicError } from "@/shared/lib/app-error";
import { PrismaReportRepository } from "@/modules/reports/repositories/prisma-report.repository";
import { PrismaUserRepository } from "@/modules/users/repositories/prisma-user.repository";
import { AppError } from "@/shared/lib/app-error";

export async function POST(req: Request) {
  let stage = "authentication";

  try {
    const session = await requireAuthenticatedSession();
    if (!session.user.id || !session.user.email) {
      throw new AppError("Authenticated user profile is incomplete.", 401, "USER_PROFILE_INCOMPLETE");
    }

    stage = "account sync";
    const user = await new PrismaUserRepository().upsert({
      id: session.user.id,
      email: session.user.email,
      name: session.user.name ?? null,
      image: session.user.image ?? null,
    });

    stage = "file upload";
    const formData = await req.formData();

    stage = "AI analysis";
    const analysis = await analyzeReport({
      file: formData.get("file"),
    });

    stage = "saving report";
    const report = await new PrismaReportRepository().create({ userId: user.id, ...analysis });
    return NextResponse.json(toAnalyzeReportResponse(analysis, report.id));
  } catch (error: unknown) {
    console.error("ANALYZE API ERROR", { stage, error });
    const { message, status } = toPublicError(error);

    if (status === 500) {
      const fallback = {
        authentication: "Your session could not be verified. Please sign in again.",
        "account sync": "Your account could not be prepared right now. Please try again shortly.",
        "file upload": "We couldn't read the uploaded file. Please choose the PDF again and retry.",
        "AI analysis": "We couldn't complete this report analysis. Make sure the PDF is unlocked and readable, then try again.",
        "saving report": "Your analysis was completed but could not be saved. Please try again shortly.",
      } as const;

      return NextResponse.json({ error: fallback[stage as keyof typeof fallback] }, { status: 503 });
    }

    return NextResponse.json({ error: message }, { status });
  }
}
