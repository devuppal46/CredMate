import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { UserMenu } from "@/components/auth/user-menu";

type Props = {
  items: {
    label: string;
    href: string;
  }[];
  className?: string;
  session: Session | null;
};

export function DesktopNav({ items, className, session }: Props) {
  return (
    <nav className={cn("mx-auto flex w-full max-w-7xl items-center justify-between gap-4", className)}>
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={140} height={54} />
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="gap-8">
          {items.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink href={item.href}>{item.label}</NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      {session?.user ? (
        <UserMenu user={session.user} />
      ) : (
        <Button asChild>
          <Link href="/login">Sign In</Link>
        </Button>
      )}
    </nav>
  );
}
