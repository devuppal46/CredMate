export class AppError extends Error {
  constructor(
    message: string,
    public readonly status: number = 500,
    public readonly code: string = "INTERNAL_SERVER_ERROR"
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function toPublicError(error: unknown): {
  message: string;
  status: number;
} {
  if (error instanceof AppError) {
    return { message: error.message, status: error.status };
  }

  const message =
    error instanceof Error ? error.message : "Internal server error";
  const isQuotaError =
    message.includes("quota") ||
    message.includes("RESOURCE_EXHAUSTED") ||
    message.includes("429");

  if (isQuotaError) {
    return {
      message:
        "Gemini API quota has been exceeded. Please try again later or add a billing-enabled API key.",
      status: 429,
    };
  }

  return { message: "Internal server error", status: 500 };
}
