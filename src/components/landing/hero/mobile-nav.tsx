import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Menu, LogOut, LayoutDashboard, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { logout } from "@/actions/auth";

type Props = {
  items: {
    label: string;
    href: string;
  }[];
  className?: string;
  session: Session | null;
};

export function MobileNav({ items, className, session }: Props) {
  return (
    <nav className={cn("flex w-full max-w-7xl items-center justify-between gap-4", className)}>
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={140} height={54} />
      </Link>
      <Drawer direction="top">
        <DrawerTrigger className="relative -m-2 cursor-pointer p-2">
          <span className="sr-only">Open menu</span>
          <Menu className="h-6 w-6" />
        </DrawerTrigger>
        <DrawerContent className="flex flex-col gap-4 p-8">
          <DrawerTitle className="sr-only">Menu</DrawerTitle>
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="text-lg font-medium">
              {item.label}
            </Link>
          ))}
          <div className="my-2 h-px bg-border w-full" />
          {session?.user ? (
            <>
              <div className="flex items-center gap-3 mb-2">
                {session.user.image ? (
                  <Image src={session.user.image} alt="Avatar" width={32} height={32} className="rounded-full" />
                ) : (
                  <div className="p-2 bg-secondary rounded-full">
                    <User className="size-5" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{session.user.name}</p>
                  <p className="text-xs text-muted-foreground">{session.user.email}</p>
                </div>
              </div>
              <Link href="/dashboard" className="flex items-center gap-2 text-lg font-medium">
                <LayoutDashboard className="size-5" />
                Dashboard
              </Link>
              <form action={logout}>
                <button type="submit" className="flex items-center gap-2 text-lg font-medium text-red-500 w-full text-left">
                  <LogOut className="size-5" />
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="text-lg font-medium text-primary">
              Sign In
            </Link>
          )}
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
