import { AppError } from "@/shared/lib/app-error";
import type { AnswerReportQuestionInput } from "@/modules/reports/types";

const MAX_REPORT_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_QUESTION_LENGTH = 2_000;

export function validatePdfReport(file: FormDataEntryValue | null): File {
  if (!file || !(file instanceof File)) {
    throw new AppError("No file uploaded", 400, "REPORT_FILE_REQUIRED");
  }

  const isPdf =
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    throw new AppError(
      "Please upload a PDF file",
      400,
      "REPORT_FILE_INVALID_TYPE"
    );
  }

  if (file.size > MAX_REPORT_SIZE_BYTES) {
    throw new AppError(
      "PDF files must be 10 MB or smaller.",
      413,
      "REPORT_FILE_TOO_LARGE"
    );
  }

  return file;
}

export function validateReportQuestion(
  payload: unknown
): AnswerReportQuestionInput {
  if (typeof payload !== "object" || payload === null) {
    throw new AppError("Invalid request body", 400, "INVALID_REQUEST");
  }

  const { summary, message } = payload as Record<string, unknown>;

  if (typeof summary !== "string" || !summary.trim()) {
    throw new AppError(
      "An analysis summary is required before chatting.",
      400,
      "REPORT_SUMMARY_REQUIRED"
    );
  }

  if (
    typeof message !== "string" ||
    !message.trim() ||
    message.length > MAX_QUESTION_LENGTH
  ) {
    throw new AppError(
      "Please enter a question of up to 2,000 characters.",
      400,
      "REPORT_QUESTION_INVALID"
    );
  }

  return {
    summary: summary.trim(),
    message: message.trim(),
  };
}
