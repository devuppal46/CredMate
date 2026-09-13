import { NextResponse } from "next/server";
import { requireAuthenticatedSession } from "@/modules/auth/services/session.service";
import { PrismaReportRepository } from "@/modules/reports/repositories/prisma-report.repository";
import { PrismaUserRepository } from "@/modules/users/repositories/prisma-user.repository";
import { toPublicError } from "@/shared/lib/app-error";

export const runtime = "nodejs";

async function resolveDbUserId(session: { user: { id: string; email?: string | null } }): Promise<string> {
  if (!session.user.email) return session.user.id;
  const dbUser = await new PrismaUserRepository().findByEmail(session.user.email);
  return dbUser?.id ?? session.user.id;
}

export async function GET(_request: Request, { params }: { params: Promise<{ reportId: string }> }) {
  try {
    const session = await requireAuthenticatedSession();
    const { reportId } = await params;
    const userId = await resolveDbUserId(session);
    const report = await new PrismaReportRepository().findByIdForUser(reportId, userId);
    if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });
    return NextResponse.json({ reportId: report.id, result: report.summary, createdAt: report.createdAt });
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
