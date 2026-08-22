import { getGeminiClient } from "@/modules/ai/gemini.client";
import { extractGeneratedText } from "@/modules/ai/parsers/generate-content-text.parser";
import { creditAnalysisPrompt } from "@/modules/ai/prompts/credit-analysis.prompt";
import type { CreditAnalysisRequest } from "@/modules/ai/types";
import { AppError } from "@/shared/lib/app-error";

export async function analyzePdfWithGemini(
  input: CreditAnalysisRequest
): Promise<string> {
  const response = await getGeminiClient().models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "application/pdf",
              data: input.pdfBase64,
            },
          },
          { text: creditAnalysisPrompt },
        ],
      },
    ],
  });

  const summary = extractGeneratedText(response);

  if (!summary) {
    throw new AppError(
      "The AI did not return an analysis for this report.",
      502,
      "AI_EMPTY_RESPONSE"
    );
  }

  return summary;
}
