import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link";

function AccordionItemFAQs(props: React.ComponentProps<typeof AccordionItem>) {
  return (
    <AccordionItem
      {...props}
      className={cn(
        "bg-secondary/30 data-[state=open]:bg-card data-[state=open]:border-border rounded-lg border border-transparent px-5 py-2 transition-colors data-[state=open]:shadow-sm lg:px-7",
        props.className,
      )}
    />
  );
}

function AccordionTriggerFAQs(props: React.ComponentProps<typeof AccordionTrigger>) {
  return (
    <AccordionTrigger
      {...props}
      className={cn("[&[data-state=open]>svg]:text-foreground text-base lg:text-lg", props.className)}
    />
  );
}

function AccordionContentFAQs(props: React.ComponentProps<typeof AccordionContent>) {
  return <AccordionContent {...props} className={cn("text-muted-foreground lg:text-base", props.className)} />;
}

export function FAQs() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-2 md:gap-14 md:px-10 md:py-20">
      <div className="flex w-full flex-col gap-6">
        <Badge variant="secondary" className="mb-2 uppercase">
          FAQ
        </Badge>

        <h2 className="text-3xl leading-[1.1] font-medium tracking-tight sm:text-5xl">
          Frequently
          <br />
          Asked <span className="text-muted-foreground">Questions</span>
        </h2>

        <p className="max-w-lg text-xs leading-6 tracking-tight sm:text-base">
          Everything you need to know about CredMate and your credit health.
        </p>

        <Button className="w-fit" size="lg" asChild>
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>

      <Accordion type="single" collapsible defaultValue="credit-score" className="grid w-full gap-4">
        <AccordionItemFAQs value="credit-score">
          <AccordionTriggerFAQs>
            How does CredMate help improve my credit score?
          </AccordionTriggerFAQs>

          <AccordionContentFAQs>
            <p>
              CredMate analyzes your credit behavior and gives personalized suggestions like reducing utilization,
              managing EMIs better, and avoiding common mistakes that hurt your score.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>

        <AccordionItemFAQs value="security">
          <AccordionTriggerFAQs>
            Is my financial data safe with CredMate?
          </AccordionTriggerFAQs>

          <AccordionContentFAQs>
            <p>
              Yes. Your financial data is encrypted and securely processed. We never sell your personal information to
              third parties.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>

        <AccordionItemFAQs value="ai-insights">
          <AccordionTriggerFAQs>
            What kind of insights does the AI provide?
          </AccordionTriggerFAQs>

          <AccordionContentFAQs>
            <p>
              The AI explains your credit report in simple language, identifies risky financial habits, and recommends
              practical actions to improve your financial health.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>

        <AccordionItemFAQs value="eligibility">
          <AccordionTriggerFAQs>
            Can CredMate predict loan eligibility?
          </AccordionTriggerFAQs>

          <AccordionContentFAQs>
            <p>
              CredMate helps estimate your financial readiness and highlights factors that may affect loan approvals,
              giving you better clarity before applying.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
      </Accordion>
    </div>
  );
}