import type { CreditAnalysis } from "@/modules/reports/types";

export type AnalyzeReportResponseDto = {
  reportId: string;
  result: string;
  creditScore: number | null;
  creditScoreMax: number;
  riskLevel: "Low" | "Medium" | "High" | "Unknown";
  debtUtilization: number | null;
};

export type ReportQuestionResponseDto = {
  reply: string;
  conversationId?: string;
};

export function toAnalyzeReportResponse(
  analysis: CreditAnalysis,
  reportId = ""
): AnalyzeReportResponseDto {
  return {
    reportId,
    result: analysis.summary,
    creditScore: analysis.creditScore,
    creditScoreMax: analysis.creditScoreMax,
    riskLevel: analysis.riskLevel,
    debtUtilization: analysis.debtUtilization,
  };
}

export function toReportQuestionResponse(
  reply: string
): ReportQuestionResponseDto {
  return { reply };
}
