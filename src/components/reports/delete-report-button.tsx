"use client";

import { useState } from "react";

export function DeleteReportButton({ reportId }: { reportId: string }) {
  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    if (!window.confirm("Delete this report and its conversation history?")) return;
    setLoading(true);
    const response = await fetch(`/api/reports/${reportId}`, { method: "DELETE" });
    if (response.ok) window.location.reload();
    else setLoading(false);
  }
  return <button type="button" onClick={handleDelete} disabled={loading} className="text-sm text-destructive hover:underline disabled:opacity-50">{loading ? "Deleting…" : "Delete"}</button>;
}
