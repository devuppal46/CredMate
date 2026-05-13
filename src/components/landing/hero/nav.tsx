import { MobileNav } from "@/components/landing/hero/mobile-nav";
import { DesktopNav } from "@/components/landing/hero/desktop-nav";

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

export function Nav() {
  return (
    <>
      <MobileNav className="flex md:hidden" items={navItems} />
      <DesktopNav className="hidden md:flex" items={navItems} />
    </>
  );
}
