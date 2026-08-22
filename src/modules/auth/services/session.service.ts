import { auth } from "@/auth";
import { AppError } from "@/shared/lib/app-error";

export async function requireAuthenticatedSession() {
  const session = await auth();

  if (!session?.user) {
    throw new AppError("Authentication required", 401, "UNAUTHENTICATED");
  }

  return session;
}
