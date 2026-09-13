import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SettingsPanel } from "@/components/settings/settings-panel";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen bg-muted/20">
      <DashboardHeader />
      <main className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
        <div className="mb-8"><h1 className="text-3xl font-semibold tracking-tight">Settings</h1><p className="mt-2 text-sm text-muted-foreground">Manage your CredMate account.</p></div>
        <SettingsPanel user={session.user} />
      </main>
    </div>
  );
}
