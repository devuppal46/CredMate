import { PrismaUserRepository } from "@/modules/users/repositories/prisma-user.repository";

/**
 * Resolves the actual DB user ID from the session.
 * session.user.id is token.sub (Google sub) which may differ from the DB user's ID
 * for users created before the auth fix. Email is the stable bridge.
 */
export async function resolveDbUserId(session: {
  user: { id: string; email?: string | null };
}): Promise<string> {
  if (!session.user.email) return session.user.id;
  const dbUser = await new PrismaUserRepository().findByEmail(session.user.email);
  return dbUser?.id ?? session.user.id;
}
