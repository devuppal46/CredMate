"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function PdfUpload() {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  const [summary, setSummary] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");

  // Handle PDF selection
  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
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

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;

    setInput("");

    try {
      setChatLoading(true);

      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          summary,
          message: currentInput,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Chat failed");
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);

    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setChatLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">

      {/* Upload Card */}
      <div className="rounded-xl border bg-card p-6">

        <h2 className="text-2xl font-semibold">
          Upload CIBIL Report
        </h2>

        <p className="text-muted-foreground mt-2 text-sm">
          Upload your report and get AI-powered financial insights.
        </p>

        <div className="mt-6 flex flex-col gap-4">

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
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Report"}
          </button>
        </div>
      </div>

      {/* Summary Section */}
      {summary && (
        <div className="rounded-xl border bg-card p-6">

          <h3 className="text-lg font-semibold">
            Financial Summary
          </h3>

          <div className="mt-4 whitespace-pre-wrap text-sm leading-6">
            {summary}
          </div>
        </div>
      )}

      {/* Chat Section */}
      {summary && (
        <div className="rounded-xl border bg-card p-6">

          <h3 className="text-lg font-semibold">
            Ask Follow-up Questions
          </h3>

          {/* Messages */}
          <div className="mt-6 flex max-h-[400px] flex-col gap-4 overflow-y-auto">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                {message.content}
              </div>
            ))}

            {chatLoading && (
              <div className="w-fit rounded-xl bg-secondary px-4 py-3 text-sm">
                Thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="mt-6 flex gap-3">

            <input
              type="text"
              placeholder="How can I improve my score?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-md border bg-background px-4 py-2 text-sm outline-none"
            />

            <button
              onClick={handleSendMessage}
              disabled={chatLoading || !input.trim()}
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}