import { Wreath } from "@/components/landing/showcase/wreath";
import { Star, HalfStar } from "@/components/landing/showcase/star";

export function Showcase() {
  return (
    <div className="relative mx-auto mt-12 mb-8 grid w-fit grid-cols-3 gap-8 md:my-24 md:gap-20">
      <Wreath>
        <p className="mb-0.5 text-[0.625rem] md:text-base">User Rating</p>
        <div className="flex items-center text-amber-400 [&>svg]:size-2.5 md:[&>svg]:size-5">
          <Star />
          <Star />
          <Star />
          <Star />
          <HalfStar />
        </div>
        <p className="text-xl font-bold md:mt-1.5 md:text-3xl">4.5</p>
      </Wreath>
      <Wreath>
        <p className="text-[0.625rem] md:text-base">Debt Managed</p>
        <p className="mt-1.5 text-center text-xs font-bold md:text-2xl">₹12+ Crores</p>
      </Wreath>
      <Wreath>
        <p className="text-[0.625rem] md:text-base">Empowering</p>
        <p className="mt-1.5 text-center text-xs font-bold text-balance md:text-2xl">
          10k+
          <br />
          Indians
        </p>
      </Wreath>
    </div>
  );
}
