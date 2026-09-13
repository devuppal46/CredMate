import { NextResponse } from "next/server";
import { requireAuthenticatedSession } from "@/modules/auth/services/session.service";
import { PrismaUserRepository } from "@/modules/users/repositories/prisma-user.repository";
import { prisma } from "@/shared/db/prisma";
import { toPublicError } from "@/shared/lib/app-error";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ reportId: string }> }) {
  try {
    const session = await requireAuthenticatedSession();
    const { reportId } = await params;

    // Resolve actual DB user ID by email
    const dbUser = session.user.email
      ? await new PrismaUserRepository().findByEmail(session.user.email)
      : null;
    const userId = dbUser?.id ?? session.user.id;

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
