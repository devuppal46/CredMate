import { prisma } from "@/shared/db/prisma";
import type { UserRepository } from "@/modules/users/repositories/user.repository";
import type { UserProfile } from "@/modules/users/types";

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<UserProfile | null> {
    return prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true, image: true } });
  }

  async findByEmail(email: string): Promise<UserProfile | null> {
    return prisma.user.findUnique({ where: { email }, select: { id: true, email: true, name: true, image: true } });
  }

  async upsert(profile: UserProfile): Promise<UserProfile> {
    // Find existing user by email first — avoids ID conflicts
    const existing = await prisma.user.findUnique({ where: { email: profile.email } });

    if (existing) {
      // Update name/image if changed, return existing user (preserves their original ID)
      return prisma.user.update({
        where: { email: profile.email },
        data: { name: profile.name, image: profile.image },
        select: { id: true, email: true, name: true, image: true },
      });
    }

    // New user — create with the provided ID (token.sub)
    return prisma.user.create({
      data: profile,
      select: { id: true, email: true, name: true, image: true },
    });
  }
}
