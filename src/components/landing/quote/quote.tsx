import React from "react";

export function Quote() {
  return (
    <figure className="mx-auto flex max-w-3xl flex-col items-center px-4 py-12 text-center">
      <blockquote className="text-3xl leading-[1.1] font-medium tracking-tighter text-balance md:text-5xl md:text-wrap">
        <span>Credmate exists to replace </span>
        <span className="text-muted-foreground/50">
          financial stress with credit wellness, giving you a clear path to freedom.
        </span>
      </blockquote>
      <figcaption className="mt-10">
        <span className="block font-semibold tracking-tight md:text-xl">Dev Uppal</span>
        <span className="text-muted-foreground mt-1 block text-xs tracking-tighter md:text-xl">
          Founder · Credmate
        </span>
      </figcaption>
    </figure>
  );
}
