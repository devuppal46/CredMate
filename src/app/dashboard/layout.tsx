import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground overflow-hidden">
      <DashboardHeader />
      {children}
    </div>
  );
}
