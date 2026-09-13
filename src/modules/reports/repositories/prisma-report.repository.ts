import { prisma } from "@/shared/db/prisma";
import type { ReportRepository } from "@/modules/reports/repositories/report.repository";
import type { StoredReportAnalysis } from "@/modules/reports/types";

export class PrismaReportRepository implements ReportRepository {
  async create(analysis: Omit<StoredReportAnalysis, "id" | "createdAt">): Promise<StoredReportAnalysis> {
    return prisma.report.create({ data: { userId: analysis.userId, analysis: { summary: analysis.summary } }, select: { id: true, userId: true, createdAt: true, analysis: true } }).then((report) => ({ id: report.id, userId: report.userId, createdAt: report.createdAt, summary: (report.analysis as { summary: string }).summary }));
  }

  async findByIdForUser(reportId: string, userId: string): Promise<StoredReportAnalysis | null> {
    const report = await prisma.report.findFirst({ where: { id: reportId, userId }, select: { id: true, userId: true, createdAt: true, analysis: true } });
    return report ? { id: report.id, userId: report.userId, createdAt: report.createdAt, summary: (report.analysis as { summary: string }).summary } : null;
  }

  async listForUser(userId: string): Promise<StoredReportAnalysis[]> {
    const reports = await prisma.report.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, select: { id: true, userId: true, createdAt: true, analysis: true } });
    return reports.map((report) => ({ id: report.id, userId: report.userId, createdAt: report.createdAt, summary: (report.analysis as { summary: string }).summary }));
  }

  async deleteForUser(reportId: string, userId: string): Promise<boolean> {
    const result = await prisma.report.deleteMany({ where: { id: reportId, userId } });
    return result.count > 0;
  }
}
