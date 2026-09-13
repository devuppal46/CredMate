import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { logout } from "@/modules/auth/services/auth.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SettingsPanelProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

function getInitials(name?: string | null) {
  const initials = name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return initials?.toUpperCase() || "CM";
}

export function SettingsPanel({ user }: SettingsPanelProps) {
  const displayName = user.name || "CredMate member";

  return (
    <div className="space-y-6">
      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-lg font-semibold">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={`${displayName} profile picture`}
                  width={56}
                  height={56}
                  className="size-full object-cover"
                />
              ) : (
                getInitials(user.name)
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium">{displayName}</p>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {user.email || "Email not available"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-accent" /> Signed in with Google
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="size-4 text-accent" /> Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-6 text-muted-foreground">Use a private device when reviewing credit reports.</p>
            <form action={logout} className="w-full">
              <Button variant="outline" className="w-full" type="submit">
                <LogOut className="size-4" /> Sign out
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="size-4 text-accent" /> Your report data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-6 text-muted-foreground">Review or delete saved analyses from your report history.</p>
            <Button asChild className="w-full">
              <Link href="/reports">
                Open report history <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
