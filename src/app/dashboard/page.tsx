"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PdfUpload } from "@/components/dashboard/pdf-upload";
import { ChatBox, type Message } from "@/components/dashboard/chat-box";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { FinancialSummary } from "@/components/dashboard/financial-summary";

export default function DashboardPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-background" aria-busy="true" />}
    >
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState("");
  const [summary, setSummary] = useState("");
  const [reportId, setReportId] = useState("");
  const [conversationId, setConversationId] = useState("");
  
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const requestedReportId = searchParams.get("reportId");
    if (!requestedReportId || requestedReportId === reportId) return;
    fetch(`/api/reports/${requestedReportId}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load report");
        return response.json();
      })
      .then((data) => {
        setReportId(data.reportId);
        setSummary(data.result);
        fetch(`/api/reports/${data.reportId}/conversation`)
          .then((conversationResponse) => conversationResponse.json())
          .then((conversation) => {
            setConversationId(conversation.conversationId ?? "");
            setMessages(conversation.messages ?? []);
          })
          .catch(() => {
            setConversationId("");
            setMessages([]);
          });
      })
      .catch(() => undefined);
  }, [searchParams, reportId]);

  // Handle PDF selection
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }
    setFile(selectedFile);
  }

  // Analyze uploaded PDF
  async function handleAnalyze() {
    if (!file) return;
    try {
      setLoading(true);
      setAnalysisError("");
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }
      setSummary(data.result);
      setReportId(data.reportId);
      router.replace(`/dashboard?reportId=${data.reportId}`, { scroll: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Analysis failed";
      setAnalysisError(message);
    } finally {
      setLoading(false);
    }
  }

  // Send follow-up chat message
  async function handleSendMessage() {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    try {
      setChatLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, conversationId: conversationId || undefined, message: currentInput }),
      });
      const data = await response.json();
      if (data.conversationId) setConversationId(data.conversationId);
      if (!response.ok) {
        throw new Error(data.error || "Chat failed");
      }
      const assistantMessage: Message = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: unknown) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Chat failed");
    } finally {
      setChatLoading(false);
    }
  }

  const leftPanelContent = (
    <div className="flex flex-col gap-6 p-6 lg:py-8 lg:pl-8 lg:pr-6 h-full">
      <div className="flex flex-col gap-2 shrink-0">
        <h1 className="text-2xl font-semibold tracking-tight">Financial Analysis Overview</h1>
        <p className="text-sm text-muted-foreground">
          Upload your CIBIL report to get AI-powered insights and risk assessment.
        </p>
      </div>
      
      {!summary ? (
        <div className="flex-1 shrink-0 space-y-3">
          <PdfUpload 
            file={file} 
            loading={loading} 
            onFileChange={handleFileChange} 
            onAnalyze={handleAnalyze} 
          />
          {analysisError && (
            <p role="alert" className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {analysisError}
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <MetricsGrid />
          <FinancialSummary summary={summary} />
        </div>
      )}
    </div>
  );

  const rightPanelContent = (
    <ChatBox 
      messages={messages}
      input={input}
      setInput={setInput}
      loading={chatLoading}
      onSendMessage={handleSendMessage}
      disabled={!reportId}
    />
  );

  return (
    <DashboardLayout 
      leftPanel={leftPanelContent}
      rightPanel={rightPanelContent}
    />
  );
}
