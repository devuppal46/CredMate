import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaReportRepository } from "@/modules/reports/repositories/prisma-report.repository";
import { DeleteReportButton } from "@/components/reports/delete-report-button";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default async function ReportsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const reports = await new PrismaReportRepository().listForUser(session.user.id);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="p-6 md:p-10">
      <section className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">Review and revisit your saved credit analyses.</p>
          </div>
          <Link href="/dashboard" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
            Analyze report
          </Link>
        </div>
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5"><p className="text-sm text-muted-foreground">Total reports</p><p className="mt-2 text-3xl font-semibold">{reports.length}</p></div>
          <div className="rounded-2xl border border-border bg-card p-5"><p className="text-sm text-muted-foreground">Latest analysis</p><p className="mt-2 text-lg font-semibold">{reports[0] ? reports[0].createdAt.toLocaleDateString() : "—"}</p></div>
        </div>
        {reports.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <p className="text-sm text-muted-foreground">No reports yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <article key={report.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground">{report.createdAt.toLocaleString()}</p>
                  <div className="flex items-center gap-4">
                    <Link href={`/dashboard?reportId=${report.id}`} className="text-sm font-medium text-primary hover:underline">Open</Link>
                    <DeleteReportButton reportId={report.id} />
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 whitespace-pre-wrap text-sm text-foreground">{report.summary}</p>
              </article>
            ))}
          </div>
        )}
      </section>
      </main>
    </div>
  );
}
