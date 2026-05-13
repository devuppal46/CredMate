import { FeaturesCarousel } from "@/components/landing/features/features-carousel";
import { FeaturesTabs } from "@/components/landing/features/features-tabs";
import { Badge } from "@/components/ui/badge";
import { ActivityIcon, ChartNoAxesColumnIcon, SlidersIcon, ZapIcon } from "lucide-react";

export type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
};

const features = [
  {
    icon: <SlidersIcon size={20} />,
    title: "Smart Credit Score Analysis",
    description: "Understand your credit score beyond just numbers.",
    image: "/app-image-.png",
  },
  {
    icon: <ZapIcon size={20} />,
    title: "Personalized AI Roadmap",
    description: "Get a step-by-step plan to improve your credit health.",
    image: "/app-image-1.png",
  },
  {
    icon: <ActivityIcon size={20} />,
    title: "Credit Report Insights",
    description: "Spot problems in your credit report instantly.",
    image: "/app-image-1.png",
  },
  {
    icon: <ChartNoAxesColumnIcon size={20} />,
    title: "Connect with Financial Advisors",
    description: "Get personalized advice to improve your credit health.",
    image: "/app-image-1.png",
  },
] satisfies Feature[];

export function Features() {
  return (
    <div id="features" className="flex w-full flex-col items-center gap-6 px-6 py-10 md:px-10 md:py-20">
      <Badge variant="secondary" className="uppercase">
        Features
      </Badge>
      <h2 className="text-center text-3xl leading-[1.1] font-medium tracking-tight sm:text-5xl">
        CredMate AI<div className="text-muted-foreground">exceptional features</div>
      </h2>
      <p className="mb-3 max-w-lg text-center leading-6 tracking-tight sm:text-xl lg:mb-8">
        We&apos;ve built the ultimate white-label app platform 
      </p>
      <FeaturesCarousel features={features} className="block lg:hidden" />
      <FeaturesTabs features={features} className="hidden lg:block" />
    </div>
  );
}
