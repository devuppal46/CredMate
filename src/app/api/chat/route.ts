export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAuthenticatedSession } from "@/modules/auth/services/session.service";
import {
  answerReportQuestion,
} from "@/modules/reports";
import { toPublicError } from "@/shared/lib/app-error";
import { resolveDbUserId } from "@/shared/lib/resolve-user";

export async function POST(req: Request) {
  try {
    const session = await requireAuthenticatedSession();
    const body = await req.json();

    const userId = await resolveDbUserId(session);

    const reply = await answerReportQuestion(body, userId);

    return NextResponse.json(reply);
  } catch (error: unknown) {
    console.error("CHAT API ERROR:", error);
    const { message, status } = toPublicError(error);

    return NextResponse.json({ error: message }, { status });
  }
}
