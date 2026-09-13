export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAuthenticatedSession } from "@/modules/auth/services/session.service";
import {
  answerReportQuestion,
} from "@/modules/reports";
import { toPublicError } from "@/shared/lib/app-error";

export async function POST(req: Request) {
  try {
    const session = await requireAuthenticatedSession();
    const body = await req.json();
    const reply = await answerReportQuestion(body, session.user.id);

    return NextResponse.json(reply);
  } catch (error: unknown) {
    console.error("CHAT API ERROR:", error);
    const { message, status } = toPublicError(error);

    return NextResponse.json({ error: message }, { status });
  }
}
