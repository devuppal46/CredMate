import Link from "next/link";

export default function ReportsPage() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <section className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Saved credit-report history will appear here once report persistence is connected.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Analyze a report
        </Link>
      </section>
    </main>
  );
}
