import type { StoredReportAnalysis } from "@/modules/reports/types";

export interface ReportRepository {
  create(
    analysis: Omit<StoredReportAnalysis, "id" | "createdAt">
  ): Promise<StoredReportAnalysis>;
  findByIdForUser(
    reportId: string,
    userId: string
  ): Promise<StoredReportAnalysis | null>;
  listForUser(userId: string): Promise<StoredReportAnalysis[]>;
  deleteForUser(reportId: string, userId: string): Promise<boolean>;
}
