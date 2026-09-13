import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  FileSearch,
  FileText,
  FolderOpen,
  LockKeyhole,
  Plus,
} from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaReportRepository } from "@/modules/reports/repositories/prisma-report.repository";
import { PrismaUserRepository } from "@/modules/users/repositories/prisma-user.repository";
import { DeleteReportButton } from "@/components/reports/delete-report-button";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default async function ReportsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // Resolve actual DB user ID by email
  const dbUser = session.user.email
    ? await new PrismaUserRepository().findByEmail(session.user.email)
    : null;
  const userId = dbUser?.id ?? session.user.id;

  const reports = await new PrismaReportRepository().listForUser(userId);
  const latestReport = reports[0];

  return (
    <div className="min-h-screen bg-muted/20">
      <DashboardHeader />
      <main className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-12">
        <section className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Report library</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your credit analyses</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Review past analyses and continue the conversation whenever you need to.
            </p>
          </div>
          <Button asChild className="shrink-0">
            <Link href="/dashboard">
              <Plus className="size-4" /> New analysis
            </Link>
          </Button>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Report overview">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Saved analyses</p>
              <FolderOpen className="size-4 text-muted-foreground" />
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{reports.length}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Latest analysis</p>
              <CalendarDays className="size-4 text-muted-foreground" />
            </div>
            <p className="mt-3 text-lg font-semibold tracking-tight">
              {latestReport ? formatDate(latestReport.createdAt) : "No reports yet"}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Data access</p>
              <LockKeyhole className="size-4 text-muted-foreground" />
            </div>
            <p className="mt-3 text-lg font-semibold tracking-tight">Private</p>
            <p className="mt-1 text-xs text-muted-foreground">Only available to your account</p>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="saved-analyses-heading">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 id="saved-analyses-heading" className="text-lg font-semibold tracking-tight">Saved analyses</h2>
              <p className="mt-1 text-sm text-muted-foreground">Most recent first</p>
            </div>
            {reports.length > 0 && (
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {reports.length} {reports.length === 1 ? "report" : "reports"}
              </span>
            )}
          </div>

          {reports.length === 0 ? (
            <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-border bg-card p-8 text-center shadow-sm">
              <div className="max-w-sm">
                <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-secondary text-muted-foreground">
                  <FileSearch className="size-5" />
                </div>
                <h3 className="mt-5 font-semibold">No analyses saved yet</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Upload a CIBIL report to get a clear AI-powered credit analysis.
                </p>
                <Button asChild className="mt-5">
                  <Link href="/dashboard">
                    <Plus className="size-4" /> Analyze a report
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              {reports.map((report) => (
                <article
                  key={report.id}
                  className="group flex flex-col gap-5 p-5 transition-colors hover:bg-muted/35 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6"
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-foreground">
                      <FileText className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-medium">Credit report analysis</h3>
                        <span className="text-xs text-muted-foreground">{formatDateTime(report.createdAt)}</span>
                      </div>
                      <p className="mt-2 line-clamp-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                        {report.summary}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard?reportId=${report.id}`}>
                        View <ArrowUpRight className="size-4" />
                      </Link>
                    </Button>
                    <DeleteReportButton reportId={report.id} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
