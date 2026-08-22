type GeminiResponseShape = {
  text?: unknown;
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

export function extractGeneratedText(response: unknown): string {
  if (typeof response !== "object" || response === null) {
    return "";
  }

  const result = response as GeminiResponseShape;

  if (typeof result.text === "string" && result.text.trim()) {
    return result.text.trim();
  }

  return (
    result.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .filter(Boolean)
      .join("\n")
      .trim() ?? ""
  );
}
