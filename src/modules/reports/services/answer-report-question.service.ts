import { answerReportQuestionWithGemini } from "@/modules/ai";
import type { AnswerReportQuestionInput } from "@/modules/reports/types";
import { validateReportQuestion } from "@/modules/reports/validations/report.validation";
import { PrismaReportRepository } from "@/modules/reports/repositories/prisma-report.repository";
import { AppError } from "@/shared/lib/app-error";

export async function answerReportQuestion(
  input: AnswerReportQuestionInput,
  userId: string
): Promise<string> {
  const question = validateReportQuestion(input);
  const report = await new PrismaReportRepository().findByIdForUser(question.reportId, userId);
  if (!report) throw new AppError("Report not found.", 404, "REPORT_NOT_FOUND");

  return answerReportQuestionWithGemini({
    summary: report.summary,
    question: question.message,
  });
}
