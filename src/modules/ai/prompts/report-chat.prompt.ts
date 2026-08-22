export function createReportChatPrompt(input: {
  summary: string;
  question: string;
}): string {
  return [
    "You are a financial credit advisor AI.",
    "",
    "Use the following CIBIL analysis as context:",
    input.summary,
    "",
    "User question:",
    input.question,
    "",
    "Give a practical, concise, easy-to-understand answer. Do not invent financial facts that are not in the analysis.",
  ].join("\n");
}
