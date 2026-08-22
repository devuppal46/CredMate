import { analyzePdfWithGemini } from "@/modules/ai";
import type {
  AnalyzeReportInput,
  CreditAnalysis,
} from "@/modules/reports/types";
import { validatePdfReport } from "@/modules/reports/validations/report.validation";

export async function analyzeReport(
  input: AnalyzeReportInput
): Promise<CreditAnalysis> {
  const file = validatePdfReport(input.file);
  const bytes = await file.arrayBuffer();

  const summary = await analyzePdfWithGemini({
    pdfBase64: Buffer.from(bytes).toString("base64"),
  });

  return { summary };
}
