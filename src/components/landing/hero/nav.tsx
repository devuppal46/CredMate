import { MobileNav } from "@/components/landing/hero/mobile-nav";
import { DesktopNav } from "@/components/landing/hero/desktop-nav";
import { Session } from "next-auth";

const navItems = [
  {
    label: "Features",
    href: "/#features",
  },
  {
    label: "Pricing",
    href: "/#pricing",
  },
  {
    label: "FAQs",
    href: "/#FAQs",
  },
];

type NavProps = {
  session: Session | null;
};

export function Nav({ session }: NavProps) {
  return (
    <>
      <MobileNav className="flex md:hidden" items={navItems} session={session} />
      <DesktopNav className="hidden md:flex" items={navItems} session={session} />
    </>
  );
}
