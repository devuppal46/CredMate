export type CreditAnalysis = {
  summary: string;
};

export type AnalyzeReportInput = {
  file: FormDataEntryValue | null;
};

export type AnswerReportQuestionInput = {
  summary: string;
  message: string;
};

export type StoredReportAnalysis = CreditAnalysis & {
  id: string;
  userId: string;
  createdAt: Date;
};
