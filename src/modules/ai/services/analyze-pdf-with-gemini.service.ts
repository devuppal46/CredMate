import { getGeminiClient } from "@/modules/ai/gemini.client";
import { extractGeneratedText } from "@/modules/ai/parsers/generate-content-text.parser";
import { creditAnalysisPrompt } from "@/modules/ai/prompts/credit-analysis.prompt";
import type { CreditAnalysisRequest } from "@/modules/ai/types";
import type { CreditAnalysis } from "@/modules/reports/types";
import { AppError } from "@/shared/lib/app-error";

export async function analyzePdfWithGemini(
  input: CreditAnalysisRequest
): Promise<CreditAnalysis> {
  const response = await getGeminiClient().models.generateContent({
    model: "gemini-3.6-flash",
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

  const raw = extractGeneratedText(response);

  if (!raw) {
    throw new AppError(
      "The AI did not return an analysis for this report.",
      502,
      "AI_EMPTY_RESPONSE"
    );
  }

  // Strip possible markdown code fences (```json ... ```)
  const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

  try {
    const parsed = JSON.parse(cleaned);
    const riskLevel = ["Low", "Medium", "High"].includes(parsed.riskLevel)
      ? (parsed.riskLevel as "Low" | "Medium" | "High")
      : "Unknown";

    return {
      creditScore: typeof parsed.creditScore === "number" ? Math.round(parsed.creditScore) : null,
      creditScoreMax: typeof parsed.creditScoreMax === "number" ? Math.round(parsed.creditScoreMax) : 900,
      riskLevel,
      debtUtilization: typeof parsed.debtUtilization === "number" ? Math.round(parsed.debtUtilization) : null,
      summary: typeof parsed.summary === "string" && parsed.summary.trim() ? parsed.summary.trim() : cleaned,
    };
  } catch {
    // JSON parse failed — treat entire response as summary with unknown metrics
    return {
      creditScore: null,
      creditScoreMax: 900,
      riskLevel: "Unknown",
      debtUtilization: null,
      summary: raw,
    };
  }
}
