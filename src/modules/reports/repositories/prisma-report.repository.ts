import { prisma } from "@/shared/db/prisma";
import type { ReportRepository } from "@/modules/reports/repositories/report.repository";
import type { StoredReportAnalysis } from "@/modules/reports/types";

type AnalysisJson = {
  summary: string;
  creditScore?: number | null;
  creditScoreMax?: number;
  riskLevel?: string;
  debtUtilization?: number | null;
};

function toStoredReport(report: {
  id: string;
  userId: string;
  createdAt: Date;
  analysis: unknown;
}): StoredReportAnalysis {
  const a = report.analysis as AnalysisJson;
  const riskLevel = ["Low", "Medium", "High"].includes(a.riskLevel ?? "")
    ? (a.riskLevel as "Low" | "Medium" | "High")
    : "Unknown";
  return {
    id: report.id,
    userId: report.userId,
    createdAt: report.createdAt,
    summary: a.summary ?? "",
    creditScore: a.creditScore ?? null,
    creditScoreMax: a.creditScoreMax ?? 900,
    riskLevel,
    debtUtilization: a.debtUtilization ?? null,
  };
}

export class PrismaReportRepository implements ReportRepository {
  async create(analysis: Omit<StoredReportAnalysis, "id" | "createdAt">): Promise<StoredReportAnalysis> {
    const report = await prisma.report.create({
      data: {
        userId: analysis.userId,
        analysis: {
          summary: analysis.summary,
          creditScore: analysis.creditScore,
          creditScoreMax: analysis.creditScoreMax,
          riskLevel: analysis.riskLevel,
          debtUtilization: analysis.debtUtilization,
        },
      },
      select: { id: true, userId: true, createdAt: true, analysis: true },
    });
    return toStoredReport(report);
  }

  async findByIdForUser(reportId: string, userId: string): Promise<StoredReportAnalysis | null> {
    const report = await prisma.report.findFirst({
      where: { id: reportId, userId },
      select: { id: true, userId: true, createdAt: true, analysis: true },
    });
    return report ? toStoredReport(report) : null;
  }

  async listForUser(userId: string): Promise<StoredReportAnalysis[]> {
    const reports = await prisma.report.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, userId: true, createdAt: true, analysis: true },
    });
    return reports.map(toStoredReport);
  }

  async deleteForUser(reportId: string, userId: string): Promise<boolean> {
    const result = await prisma.report.deleteMany({ where: { id: reportId, userId } });
    return result.count > 0;
  }
}
