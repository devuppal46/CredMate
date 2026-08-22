import { getGeminiClient } from "@/modules/ai/gemini.client";
import { extractGeneratedText } from "@/modules/ai/parsers/generate-content-text.parser";
import { createReportChatPrompt } from "@/modules/ai/prompts/report-chat.prompt";
import type { ReportQuestionRequest } from "@/modules/ai/types";
import { AppError } from "@/shared/lib/app-error";

export async function answerReportQuestionWithGemini(
  input: ReportQuestionRequest
): Promise<string> {
  const response = await getGeminiClient().models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: [
      {
        role: "user",
        parts: [{ text: createReportChatPrompt(input) }],
      },
    ],
  });

  const reply = extractGeneratedText(response);

  if (!reply) {
    throw new AppError(
      "The AI did not return a reply.",
      502,
      "AI_EMPTY_RESPONSE"
    );
  }

  return reply;
}
