import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground w-full break-words">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed max-w-full text-foreground/90">{children}</p>,
          h1: ({ children }) => <h1 className="text-2xl font-semibold mb-3 mt-5 first:mt-0 text-foreground tracking-tight">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 mt-4 first:mt-0 text-foreground tracking-tight">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-medium mb-2 mt-3 first:mt-0 text-foreground tracking-tight">{children}</h3>,
          h4: ({ children }) => <h4 className="text-base font-medium mb-2 mt-3 first:mt-0 text-foreground tracking-tight">{children}</h4>,
          ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-2">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed text-foreground/90">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          a: ({ children, href }) => <a href={href} className="text-primary underline underline-offset-4 hover:text-primary/80">{children}</a>,
          blockquote: ({ children }) => <blockquote className="my-3 border-l-2 border-primary/50 pl-4 italic text-muted-foreground">{children}</blockquote>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}