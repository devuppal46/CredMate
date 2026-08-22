import { answerReportQuestionWithGemini } from "@/modules/ai";
import type { AnswerReportQuestionInput } from "@/modules/reports/types";
import { validateReportQuestion } from "@/modules/reports/validations/report.validation";

export async function answerReportQuestion(
  input: AnswerReportQuestionInput
): Promise<string> {
  const question = validateReportQuestion(input);

  return answerReportQuestionWithGemini({
    summary: question.summary,
    question: question.message,
  });
}
