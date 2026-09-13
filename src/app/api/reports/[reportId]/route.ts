import { NextResponse } from "next/server";
import { requireAuthenticatedSession } from "@/modules/auth/services/session.service";
import { PrismaReportRepository } from "@/modules/reports/repositories/prisma-report.repository";
import { resolveDbUserId } from "@/shared/lib/resolve-user";
import { toPublicError } from "@/shared/lib/app-error";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ reportId: string }> }) {
  try {
    const session = await requireAuthenticatedSession();
    const { reportId } = await params;
    const userId = await resolveDbUserId(session);
    const report = await new PrismaReportRepository().findByIdForUser(reportId, userId);
    if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });
    return NextResponse.json({
      reportId: report.id,
      result: report.summary,
      creditScore: report.creditScore,
      creditScoreMax: report.creditScoreMax,
      riskLevel: report.riskLevel,
      debtUtilization: report.debtUtilization,
      createdAt: report.createdAt,
    });
  } catch (error: unknown) {
    const { message, status } = toPublicError(error);
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ reportId: string }> }) {
  try {
    const session = await requireAuthenticatedSession();
    const { reportId } = await params;
    const userId = await resolveDbUserId(session);
    const deleted = await new PrismaReportRepository().deleteForUser(reportId, userId);
    if (!deleted) return NextResponse.json({ error: "Report not found" }, { status: 404 });
    return NextResponse.json({ deleted: true });
  } catch (error: unknown) {
    const { message, status } = toPublicError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
