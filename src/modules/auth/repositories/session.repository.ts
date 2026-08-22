import type { AuthenticatedUser } from "@/modules/auth/types";

export interface SessionRepository {
  getCurrentUser(): Promise<AuthenticatedUser | null>;
}
