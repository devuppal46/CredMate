import type { CreditAnalysis } from "@/modules/reports/types";

export type AnalyzeReportResponseDto = {
  result: string;
};

export type ReportQuestionResponseDto = {
  reply: string;
};

export function toAnalyzeReportResponse(
  analysis: CreditAnalysis
): AnalyzeReportResponseDto {
  return { result: analysis.summary };
}

export function toReportQuestionResponse(
  reply: string
): ReportQuestionResponseDto {
  return { reply };
}
