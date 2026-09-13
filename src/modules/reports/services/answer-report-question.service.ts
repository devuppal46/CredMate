import { answerReportQuestionWithGemini } from "@/modules/ai";
import type { AnswerReportQuestionInput } from "@/modules/reports/types";
import { validateReportQuestion } from "@/modules/reports/validations/report.validation";
import { PrismaReportRepository } from "@/modules/reports/repositories/prisma-report.repository";
import { AppError } from "@/shared/lib/app-error";
import { prisma } from "@/shared/db/prisma";

export async function answerReportQuestion(
  input: AnswerReportQuestionInput,
  userId: string
 ): Promise<{ reply: string; conversationId: string }> {
  const question = validateReportQuestion(input);
  const report = await new PrismaReportRepository().findByIdForUser(question.reportId, userId);
  if (!report) throw new AppError("Report not found.", 404, "REPORT_NOT_FOUND");

  const conversation = question.conversationId
    ? await prisma.conversation.findFirst({ where: { id: question.conversationId, userId, reportId: question.reportId } })
    : await prisma.conversation.create({ data: { userId, reportId: question.reportId, title: question.message.slice(0, 80) } });
  if (!conversation) throw new AppError("Conversation not found.", 404, "CONVERSATION_NOT_FOUND");
  await prisma.message.create({ data: { conversationId: conversation.id, role: "USER", content: question.message } });

  const reply = await answerReportQuestionWithGemini({
    summary: report.summary,
    question: question.message,
  });
  await prisma.message.create({ data: { conversationId: conversation.id, role: "ASSISTANT", content: reply } });
  return { reply, conversationId: conversation.id };
}
