import type { UserProfile } from "@/modules/users/types";

export interface UserRepository {
  findById(id: string): Promise<UserProfile | null>;
  upsert(profile: UserProfile): Promise<UserProfile>;
}
