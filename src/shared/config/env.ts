import { AppError } from "@/shared/lib/app-error";

export function getRequiredServerEnv(name: "GEMINI_API_KEY"): string {
  const value = process.env[name];

  if (!value) {
    throw new AppError(
      "The server is missing required AI configuration.",
      500,
      "SERVER_CONFIGURATION_ERROR"
    );
  }

  return value;
}
