import { Badge } from "@/components/ui/badge";
import { TestimonialMarquee } from "@/components/landing/testimonials/testimonial-marquee";

export type Testimonial = {
  name: string;
  date: string;
  title: string;
  content: string;
  avatar?: string;
  rating: number;
};

const testimonials = [
  {
    name: "Rohit Mehra",
    date: "Mar 12",
    title: "Understood my credit mistakes",
    content:
      `"CredMate showed me exactly why my score kept dropping. I fixed two bad habits within a month and already saw improvement."`,
    rating: 5,
  },
  {
    name: "Priya Sharma",
    date: "Apr 2",
    title: "Made repayments less stressful",
    content:
      `"The spending insights and reminders helped me stop missing due dates. My finances finally feel under control."`,
    rating: 4,
  },
  {
    name: "Arjun Verma",
    date: "Mar 25",
    title: "Actually useful financial advice",
    content:
      `"Most apps just push loans. CredMate explained my report in simple terms and gave practical steps I could follow immediately."`,
    rating: 5,
  },
  {
    name: "Neha Khan",
    date: "Apr 10",
    title: "Loved the AI explanations",
    content:
      `"I asked questions about credit utilization and loan eligibility, and the AI explained everything clearly without complicated jargon."`,
    rating: 4,
  },
] satisfies Testimonial[];

export function Testimonials() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-10 md:py-20">
      <Badge variant="secondary" className="mb-2 uppercase">
        Testimonial
      </Badge>
      <h2 className="text-center text-3xl leading-[1.1] font-medium tracking-tight sm:text-5xl">
        Don&apos;t Take<div className="text-muted-foreground">Our Word for It</div>
      </h2>
      {/* <p className="mb-3 max-w-lg text-center leading-6 tracking-tight sm:text-xl lg:mb-8">
        We&apos;ve built the ultimate white-label app platform so you can focus on growing your brand—not building tech
      </p> */}
      <div className="relative w-[calc(100%+3rem)] overflow-x-hidden py-4 lg:w-full">
        <TestimonialMarquee testimonials={testimonials} className="mb-4" />
        <TestimonialMarquee testimonials={testimonials} reverse />
      </div>
    </div>
  );
}
