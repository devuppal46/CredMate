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

  const message = error instanceof Error ? error.message : "Internal server error";
  const normalizedMessage = message.toLowerCase();
  const isQuotaError =
    normalizedMessage.includes("quota") ||
    normalizedMessage.includes("resource_exhausted") ||
    normalizedMessage.includes("429");

  if (isQuotaError) {
    return {
      message:
        "Gemini API quota has been exceeded. Please try again later or add a billing-enabled API key.",
      status: 429,
    };
  }

  if (
    normalizedMessage.includes("api key") ||
    normalizedMessage.includes("permission_denied") ||
    normalizedMessage.includes("unauthenticated") ||
    normalizedMessage.includes("forbidden")
  ) {
    return {
      message: "The AI service is not available right now. Please try again later.",
      status: 503,
    };
  }

  if (
    normalizedMessage.includes("deadline") ||
    normalizedMessage.includes("timed out") ||
    normalizedMessage.includes("timeout")
  ) {
    return {
      message: "The analysis took too long. Please try a smaller PDF or try again.",
      status: 504,
    };
  }

  if (
    normalizedMessage.includes("pdf") ||
    normalizedMessage.includes("document") ||
    normalizedMessage.includes("inline data") ||
    normalizedMessage.includes("invalid argument") ||
    normalizedMessage.includes("unable to process")
  ) {
    return {
      message: "We couldn't read that PDF. Upload an unlocked, readable CIBIL report and try again.",
      status: 422,
    };
  }

  if (
    normalizedMessage.includes("p1001") ||
    normalizedMessage.includes("database") ||
    normalizedMessage.includes("connection")
  ) {
    return {
      message: "Your report could not be saved right now. Please try again shortly.",
      status: 503,
    };
  }

  return { message: "Internal server error", status: 500 };
}
