export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { requireAuthenticatedSession } from "@/modules/auth/services/session.service";
import {
  answerReportQuestion,
} from "@/modules/reports";
import { toPublicError } from "@/shared/lib/app-error";
import { PrismaUserRepository } from "@/modules/users/repositories/prisma-user.repository";

export async function POST(req: Request) {
  try {
    const session = await requireAuthenticatedSession();
    const body = await req.json();

    // Resolve the actual DB user ID via email (session.user.id may be Google sub, not DB id)
    const dbUser = session.user.email
      ? await new PrismaUserRepository().findByEmail(session.user.email)
      : null;
    const userId = dbUser?.id ?? session.user.id;

    const reply = await answerReportQuestion(body, userId);

    return NextResponse.json(reply);
  } catch (error: unknown) {
    console.error("CHAT API ERROR:", error);
    const { message, status } = toPublicError(error);

    return NextResponse.json({ error: message }, { status });
  }
}
