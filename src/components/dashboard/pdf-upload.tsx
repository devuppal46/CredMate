"use client";

import { UploadCloud, FileText, CheckCircle, Activity, ShieldCheck, BarChart3, AlertCircle, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";

interface PdfUploadProps {
  file: File | null;
  loading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAnalyze: () => void;
  summary: string;
}

export function PdfUpload({ file, loading, onFileChange, onAnalyze, summary }: PdfUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const event = {
        target: { files: e.dataTransfer.files }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onFileChange(event);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {!summary ? (
        <Card className="border-dashed border-2 bg-card/50 hover:bg-card/80 transition-colors duration-300">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <UploadCloud className="size-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Upload CIBIL Report</h3>
            <p className="mb-6 text-sm text-muted-foreground max-w-sm">
              Drag and drop your PDF report here, or click to browse. We'll extract and analyze your financial profile securely.
            </p>
            <input 
              type="file" 
              accept=".pdf" 
              className="hidden" 
              ref={inputRef} 
              onChange={onFileChange} 
            />
            <Button onClick={() => inputRef.current?.click()} variant="outline" className="mb-4">
              Browse Files
            </Button>
            
            {file && (
              <div className="mt-4 flex w-full max-w-md items-center justify-between rounded-lg border border-border bg-background p-3 shadow-sm">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="size-5 shrink-0 text-primary" />
                  <div className="flex flex-col items-start overflow-hidden text-left">
                    <span className="truncate text-sm font-medium w-[200px]">{file.name}</span>
                    <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                </div>
                <Button onClick={onAnalyze} disabled={loading} size="sm" className="shrink-0">
                  {loading ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Status & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-primary text-primary-foreground border-transparent shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Activity className="size-16" />
              </div>
              <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full gap-2">
                <div>
                  <p className="text-primary-foreground/80 text-sm font-medium mb-1">Credit Score</p>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-4xl font-bold tracking-tight">742</h4>
                    <span className="text-sm">/ 900</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm bg-black/20 w-fit px-2.5 py-1 rounded-full backdrop-blur-md">
                  <CheckCircle className="size-4" /> Good Standing
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardContent className="p-6 flex flex-col justify-between h-full gap-2">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted-foreground text-sm font-medium">Risk Level</p>
                    <ShieldCheck className="size-5 text-success" />
                  </div>
                  <h4 className="text-2xl font-bold">Low Risk</h4>
                </div>
                <div className="mt-4 w-full bg-secondary rounded-full h-2">
                  <div className="bg-success h-2 rounded-full w-[25%]"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6 flex flex-col justify-between h-full gap-2">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted-foreground text-sm font-medium">Debt Utilization</p>
                    <BarChart3 className="size-5 text-accent" />
                  </div>
                  <h4 className="text-2xl font-bold">28%</h4>
                </div>
                <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                  <AlertCircle className="size-3" /> Below recommended 30% limit
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Summary */}
          <Card className="shadow-sm border-border flex-1">
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="size-5 text-primary" />
                AI Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                {summary.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}