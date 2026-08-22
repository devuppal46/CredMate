import type { UserProfile } from "@/modules/users/types";

export function toUserResponse(user: UserProfile) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
  };
}
