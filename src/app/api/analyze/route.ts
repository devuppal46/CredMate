export const runtime = "nodejs";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const extractionPrompt = `
      Extract the following information from this CIBIL report:

      1. Credit Score
      2. Total outstanding debt
      3. Number of default or written-off accounts
      4. Monthly EMI burden
      5. Overall financial health summary

      Keep the response concise, readable, and structured.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: [
        {
          role: "user",

          parts: [
            {
              inlineData: {
                mimeType: "application/pdf",
                data: Buffer.from(bytes).toString("base64"),
              },
            },

            {
              text: extractionPrompt,
            },
          ],
        },
      ],
    });

    return NextResponse.json({
      result: response.text || "No response generated",
    });

  } catch (error: any) {
    console.error("ANALYZE API ERROR:", error);

    return NextResponse.json(
      {
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}