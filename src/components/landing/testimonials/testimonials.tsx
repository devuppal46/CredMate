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
    name: "Aditya Roy",
    date: "Jan 15",
    title: "Finally got my car loan approved",
    content: `"I was rejected twice by banks and didn't know why. CredMate's report pointed out an old unpaid bill I completely forgot about. Cleared it, and my score shot up."`,
    rating: 5,
  },
  {
    name: "Sneha Kapoor",
    date: "Feb 1",
    title: "Stopped the EMI panic",
    content: `"I used to panic every time salary day came near. The AI helped me restructure my payments so I'm not broke by the 5th of the month. A genuine lifesaver."`,
    rating: 4,
  },
  {
    name: "Faizan Ahmed",
    date: "Jan 20",
    title: "Better than spammy credit apps",
    content: `"Other apps just try to sell me credit cards. CredMate actually analyzed my debt and told me how to close my personal loan 6 months early to save interest."`,
    rating: 5,
  },
  {
    name: "Karthik N.",
    date: "Feb 8",
    title: "The chat feature is brilliant",
    content: `"I didn't understand what 'credit utilization' meant until I asked the AI. It explained it in simple Hindi/English and helped me fix my card usage habits."`,
    rating: 4,
  },
] satisfies Testimonial[];

export function Testimonials() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-14 md:py-25">
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
