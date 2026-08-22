"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { logout } from "@/modules/auth/services/auth.actions";

type UserMenuProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 rounded-full border border-border bg-secondary hover:bg-secondary/70 transition-colors px-3 py-1.5 text-sm font-medium focus:outline-none"
      >
        {user.image ? (
          <Image src={user.image} alt="Avatar" width={20} height={20} className="rounded-full" />
        ) : (
          <User className="size-4" />
        )}
        <span className="max-w-[100px] truncate">{user.name?.split(" ")[0] || "User"}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-background p-1 shadow-md z-50">
          <div className="px-3 py-2 text-sm text-foreground mb-1 border-b border-border">
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 w-full rounded-sm px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-2 w-full rounded-sm px-3 py-2 text-sm text-red-500 hover:bg-secondary transition-colors"
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
