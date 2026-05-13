"use client";

import { useState } from "react";

export function PdfUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    setFile(selectedFile);
  }

  async function handleSubmit() {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setResult(data.result);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border bg-card p-6">
      <div>
        <h2 className="text-xl font-semibold">Upload CIBIL Report</h2>

        <p className="text-muted-foreground text-sm">
          Upload your PDF report to analyze your credit health.
        </p>
      </div>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />

      {file && (
        <div className="rounded-md border bg-secondary/40 p-3 text-sm">
          <p className="font-medium">{file.name}</p>

          <p className="text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!file || loading}
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Report"}
      </button>

      {result && (
        <div className="rounded-md border p-4 text-sm whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
}