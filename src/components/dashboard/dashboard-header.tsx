import { FileText, User, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";

export async function DashboardHeader() {
  const session = await auth();

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
        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button 
              type="submit" 
              className="flex items-center justify-center gap-2 rounded-full border border-border bg-secondary hover:bg-secondary/70 transition-colors px-3 py-1.5 text-sm font-medium"
            >
              {session.user.image ? (
                <Image src={session.user.image} alt="Avatar" width={20} height={20} className="rounded-full" />
              ) : (
                <User className="size-4" />
              )}
              <span className="max-w-[100px] truncate">{session.user.name?.split(' ')[0]}</span>
            </button>
          </form>
        ) : (
          <Link href="/login" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}