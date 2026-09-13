export type CreditAnalysis = {
  summary: string;
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
