import type { CreditAnalysis } from "@/modules/reports/types";

export type AnalyzeReportResponseDto = {
  reportId: string;
  result: string;
};

export type ReportQuestionResponseDto = {
  reply: string;
  conversationId?: string;
};

export function toAnalyzeReportResponse(
  analysis: CreditAnalysis,
  reportId = ""
): AnalyzeReportResponseDto {
  return { reportId, result: analysis.summary };
}

export function toReportQuestionResponse(
  reply: string
): ReportQuestionResponseDto {
  return { reply };
}
