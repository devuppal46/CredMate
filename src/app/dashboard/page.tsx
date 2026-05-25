"use client";

import { useState } from "react";
import { PdfUpload } from "@/components/dashboard/pdf-upload";
import { ChatBox, type Message } from "@/components/dashboard/chat-box";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { FinancialSummary } from "@/components/dashboard/financial-summary";

export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

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
    } catch (error: any) {
      console.error(error);
      alert(error.message);
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
        body: JSON.stringify({ summary, message: currentInput }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Chat failed");
      }
      const assistantMessage: Message = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
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
        <div className="flex-1 shrink-0">
          <PdfUpload 
            file={file} 
            loading={loading} 
            onFileChange={handleFileChange} 
            onAnalyze={handleAnalyze} 
          />
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
      disabled={!summary}
    />
  );

  return (
    <DashboardLayout 
      leftPanel={leftPanelContent}
      rightPanel={rightPanelContent}
    />
  );
}