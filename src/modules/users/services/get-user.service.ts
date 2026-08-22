import type { UserRepository } from "@/modules/users/repositories/user.repository";
import type { UserProfile } from "@/modules/users/types";

export async function getUser(
  repository: UserRepository,
  userId: string
): Promise<UserProfile | null> {
  return repository.findById(userId);
}
