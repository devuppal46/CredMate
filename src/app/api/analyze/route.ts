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
      Extract the following data from this CIBIL report:

      1. Credit Score
      2. Total outstanding debt
      3. Number of default accounts
      4. EMI burden
      5. Overall financial health summary

      Keep the response concise and readable.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            data: Buffer.from(bytes).toString("base64"),
            mimeType: "application/pdf",
          },
        },
        {
          text: extractionPrompt,
        },
      ],
    });

    return NextResponse.json({
      result: response.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}