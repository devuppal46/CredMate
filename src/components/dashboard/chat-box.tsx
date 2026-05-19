"use client";

import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

interface ChatBoxProps {
  messages: Message[];
  input: string;
  setInput: (val: string) => void;
  loading: boolean;
  onSendMessage: () => void;
  disabled?: boolean;
}

export function ChatBox({ messages, input, setInput, loading, onSendMessage, disabled }: ChatBoxProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background/50 backdrop-blur-sm relative">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-accent" />
          <h2 className="font-semibold tracking-tight">AI Assistant</h2>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center space-y-4 opacity-50">
            <Bot className="size-12 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">No messages yet</p>
              <p className="text-xs text-muted-foreground max-w-[250px]">
                Ask me about your credit score, risk factors, or ways to improve your financial health.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={cn("flex gap-4 max-w-[90%]", msg.role === "user" ? "ml-auto flex-row-reverse" : "")}>
              <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-full shadow-sm", msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground")}>
                {msg.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
              </div>
              <div className={cn("rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm", msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground")}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        
        {loading && (
          <div className="flex gap-4 max-w-[90%]">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-card border border-border text-foreground shadow-sm">
              <Bot className="size-4" />
            </div>
            <div className="rounded-2xl bg-card border border-border px-4 py-3 text-sm flex items-center gap-2 shadow-sm">
              <span className="flex gap-1">
                <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]"></span>
                <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]"></span>
                <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce"></span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-background/80 backdrop-blur-md border-t border-border mt-auto">
        <div className="relative flex items-center bg-card border border-border rounded-xl shadow-sm focus-within:ring-1 focus-within:ring-ring focus-within:border-ring transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? "Upload report to start chatting..." : "Ask a follow-up question..."}
            disabled={disabled}
            className="flex-1 max-h-32 min-h-[44px] bg-transparent px-4 py-3 text-sm outline-none resize-none disabled:opacity-50 placeholder:text-muted-foreground"
            rows={1}
          />
          <Button 
            size="icon" 
            variant="ghost" 
            className="mr-2 size-8 shrink-0 text-primary hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50"
            onClick={onSendMessage}
            disabled={loading || !input.trim() || disabled}
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
