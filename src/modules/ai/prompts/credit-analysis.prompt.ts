export const creditAnalysisPrompt = [
  "Analyze this CIBIL report and return a single valid JSON object. Do not wrap it in markdown code blocks.",
  "",
  "The JSON must have exactly these fields:",
  "- creditScore: integer or null (the CIBIL score, e.g. 742)",
  "- creditScoreMax: integer, usually 900",
  "- riskLevel: one of \"Low\", \"Medium\", \"High\", or \"Unknown\"",
  "- debtUtilization: integer percentage or null (e.g. 28 for 28%)",
  "- summary: string (a concise Markdown report covering credit score, outstanding debt, default/written-off accounts, monthly EMI burden, and overall financial health)",
  "",
  "Only use values supported by the report. Use null for unavailable numeric fields.",
  "Return ONLY the raw JSON object, no extra text before or after.",
].join("\n");
