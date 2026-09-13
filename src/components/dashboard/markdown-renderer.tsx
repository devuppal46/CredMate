import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
  compact?: boolean;
}

export function MarkdownRenderer({ content, compact = false }: MarkdownRendererProps) {
  return (
    <div className="max-w-none w-full break-words text-sm leading-snug text-foreground/90 font-normal not-italic">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className={`last:mb-0 leading-relaxed font-normal not-italic ${compact ? "mb-1.5" : "mb-3"}`}>{children}</p>,
          h1: ({ children }) => <h1 className={`font-semibold first:mt-0 text-foreground not-italic ${compact ? "text-base mb-1.5 mt-3" : "text-2xl mb-3 mt-5"}`}>{children}</h1>,
          h2: ({ children }) => <h2 className={`font-semibold first:mt-0 text-foreground not-italic ${compact ? "text-sm mb-1.5 mt-2.5" : "text-xl mb-3 mt-4"}`}>{children}</h2>,
          h3: ({ children }) => <h3 className={`font-semibold first:mt-0 text-foreground not-italic ${compact ? "text-sm mb-1 mt-2" : "text-lg mb-2 mt-3"}`}>{children}</h3>,
          h4: ({ children }) => <h4 className={`font-semibold first:mt-0 text-foreground not-italic ${compact ? "text-xs mb-1 mt-2" : "text-base mb-2 mt-3"}`}>{children}</h4>,
          ul: ({ children }) => <ul className={`list-disc font-normal not-italic ${compact ? "pl-4 mb-1.5 space-y-0.5" : "pl-5 mb-3 space-y-2"}`}>{children}</ul>,
          ol: ({ children }) => <ol className={`list-decimal font-normal not-italic ${compact ? "pl-4 mb-1.5 space-y-0.5" : "pl-5 mb-3 space-y-2"}`}>{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed font-normal not-italic">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-foreground not-italic">{children}</strong>,
          em: ({ children }) => <span className="not-italic font-normal">{children}</span>,
          a: ({ children, href }) => <a href={href} className="text-primary underline underline-offset-4 hover:text-primary/80 not-italic font-normal">{children}</a>,
          blockquote: ({ children }) => <span className="not-italic font-normal">{children}</span>,
          hr: () => null,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}