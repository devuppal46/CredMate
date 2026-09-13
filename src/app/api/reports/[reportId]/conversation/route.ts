import { NextResponse } from "next/server";
import { requireAuthenticatedSession } from "@/modules/auth/services/session.service";
import { resolveDbUserId } from "@/shared/lib/resolve-user";
import { prisma } from "@/shared/db/prisma";
import { toPublicError } from "@/shared/lib/app-error";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ reportId: string }> }) {
  try {
    const session = await requireAuthenticatedSession();
    const { reportId } = await params;

    const userId = await resolveDbUserId(session);

    const conversation = await prisma.conversation.findFirst({
      where: { reportId, userId },
      orderBy: { updatedAt: "desc" },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });
    if (!conversation) return NextResponse.json({ conversationId: null, messages: [] });
    return NextResponse.json({
      conversationId: conversation.id,
      messages: conversation.messages.map((message) => ({ role: message.role.toLowerCase(), content: message.content })),
    });
  } catch (error: unknown) {
    const { message, status } = toPublicError(error);
    return NextResponse.json({ error: message }, { status });
  }
}
