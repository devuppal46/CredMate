import { Brain } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MarkdownRenderer } from "./markdown-renderer";

interface FinancialSummaryProps {
  summary: string;
}

export function FinancialSummary({ summary }: FinancialSummaryProps) {
  return (
    <Card className="shadow-sm border-border bg-card flex flex-col">
      <CardHeader className="py-3 px-5 border-b border-border">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground tracking-tight leading-none">
          <Brain className="size-4 text-primary" />
          AI Financial Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pt-4 pb-5">
        <MarkdownRenderer content={summary} />
      </CardContent>
    </Card>
  );
}