"use client";

import { useState } from "react";
import { PdfUpload } from "@/components/dashboard/pdf-upload";
import { ChatBox, type Message } from "@/components/dashboard/chat-box";
import { Brain, FileText, User, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";

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

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Brain className="size-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">CredMate AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#" className="flex items-center gap-2 text-foreground transition-colors">
            <LayoutDashboard className="size-4" /> Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <FileText className="size-4" /> Reports
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Settings className="size-4" /> Settings
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-sm border border-border cursor-pointer hover:bg-secondary/80 transition-colors">
            <User className="size-4" />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex flex-1 overflow-hidden">
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1fr_450px]">
          {/* Left Panel */}
          <div className="flex flex-col gap-6 overflow-y-auto p-6 lg:p-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">Financial Analysis Overview</h1>
              <p className="text-sm text-muted-foreground">
                Upload your CIBIL report to get AI-powered insights and risk assessment.
              </p>
            </div>
            
            <PdfUpload 
              file={file} 
              loading={loading} 
              onFileChange={handleFileChange} 
              onAnalyze={handleAnalyze} 
              summary={summary}
            />
          </div>

          {/* Right Panel */}
          <div className="border-l border-border bg-card/30 flex flex-col h-full overflow-hidden shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] dark:shadow-none lg:block hidden">
            <ChatBox 
              messages={messages}
              input={input}
              setInput={setInput}
              loading={chatLoading}
              onSendMessage={handleSendMessage}
              disabled={!summary}
            />
          </div>

          {/* Mobile Right Panel (Rendered Below) */}
          <div className="lg:hidden h-[600px] border-t border-border bg-card/30 flex flex-col">
            <ChatBox 
              messages={messages}
              input={input}
              setInput={setInput}
              loading={chatLoading}
              onSendMessage={handleSendMessage}
              disabled={!summary}
            />
          </div>
        </div>
      </main>
    </div>
  );
}