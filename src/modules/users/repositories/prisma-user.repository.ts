import { prisma } from "@/shared/db/prisma";
import type { UserRepository } from "@/modules/users/repositories/user.repository";
import type { UserProfile } from "@/modules/users/types";

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<UserProfile | null> {
    return prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true, image: true } });
  }

  async upsert(profile: UserProfile): Promise<UserProfile> {
    return prisma.user.upsert({
      where: { id: profile.id },
      create: profile,
      update: { email: profile.email, name: profile.name, image: profile.image },
      select: { id: true, email: true, name: true, image: true },
    });
  }
}
