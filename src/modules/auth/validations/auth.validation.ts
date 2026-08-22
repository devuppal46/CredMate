import { AppError } from "@/shared/lib/app-error";

export function requireUserId(userId: string | undefined): string {
  if (!userId) {
    throw new AppError("Authentication required", 401, "UNAUTHENTICATED");
  }

  return userId;
}
