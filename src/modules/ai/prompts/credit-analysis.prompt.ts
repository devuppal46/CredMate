export const creditAnalysisPrompt = [
  "Analyze this CIBIL report and return a concise, readable Markdown report.",
  "",
  "Include these sections:",
  "1. Credit Score",
  "2. Total outstanding debt",
  "3. Number of default or written-off accounts",
  "4. Monthly EMI burden",
  "5. Overall financial health summary",
  "",
  "Only state values supported by the report. Clearly label unavailable data as Not Found.",
].join("\n");
