export const runtime = "nodejs";

import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { summary, message } = body;

    const prompt = `
      You are a financial credit advisor AI.

      Here is the user's CIBIL analysis:

      ${summary}

      User question:
      ${message}

      Give a practical, concise, easy-to-understand answer.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    return NextResponse.json({
      reply: response.text,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}