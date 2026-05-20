import { FileText, User, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Plain logo without background */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="CredMate"
            width={120}
            height={36}
            priority
            className="h-10 w-auto dark:invert"
          />
        </Link>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
        <Link href="#" className="flex items-center gap-2 text-foreground transition-colors">
          <LayoutDashboard className="size-4" /> Dashboard
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
          <FileText className="size-4" /> Reports
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
          <Settings className="size-4" /> Settings
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-sm border border-border cursor-pointer hover:bg-secondary/80 transition-colors">
          <User className="size-4" />
        </div>
      </div>
    </header>
  );
}