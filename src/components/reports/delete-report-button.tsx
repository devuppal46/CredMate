"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

export function DeleteReportButton({ reportId }: { reportId: string }) {
  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    if (!window.confirm("Delete this report and its conversation history?")) return;
    setLoading(true);
    const response = await fetch(`/api/reports/${reportId}`, { method: "DELETE" });
    if (response.ok) window.location.reload();
    else setLoading(false);
  }
  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
      aria-label="Delete report"
      title="Delete report"
    >
      {loading ? <span className="text-xs">…</span> : <Trash2 className="size-4" />}
    </button>
  );
}
