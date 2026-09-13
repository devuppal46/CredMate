export type CreditAnalysis = {
  summary: string;
  creditScore: number | null;
  creditScoreMax: number;
  riskLevel: "Low" | "Medium" | "High" | "Unknown";
  debtUtilization: number | null;
};

export type AnalyzeReportInput = {
  file: FormDataEntryValue | null;
};

export type AnswerReportQuestionInput = {
  reportId: string;
  message: string;
  conversationId?: string;
};

export type StoredReportAnalysis = CreditAnalysis & {
  id: string;
  userId: string;
  createdAt: Date;
};
