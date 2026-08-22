import { GoogleGenAI } from "@google/genai";
import { getRequiredServerEnv } from "@/shared/config/env";

let client: GoogleGenAI | undefined;

export function getGeminiClient(): GoogleGenAI {
  if (!client) {
    client = new GoogleGenAI({
      apiKey: getRequiredServerEnv("GEMINI_API_KEY"),
    });
  }

  return client;
}
