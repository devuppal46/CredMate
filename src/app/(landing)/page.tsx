import { Hero } from "@/components/landing/hero/hero";
import { Showcase } from "@/components/landing/showcase/showcase";
import { Quote } from "@/components/landing/quote/quote";
import { Features } from "@/components/landing/features/features";
import { Testimonials } from "@/components/landing/testimonials/testimonials";
import { FAQs } from "@/components/landing/faqs/faqs";
import { Footer } from "@/components/landing/footer/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Showcase />
      <Quote />
      <Features />
      <Testimonials />
      <FAQs />
      <Footer />
    </>
  );
}