"use client";

import { FeatureDetails } from "@/components/landing/features/feature-details";
import type { Feature } from "@/components/landing/features/features";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  features: Feature[];
  className?: string;
};

export function FeaturesTabs({ features, className }: Props) {
  const [activeTab, setActiveTab] = useState(features[0].title);

  return (
    <Tabs className={cn("w-full max-w-6xl", className)} value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid h-auto w-full grid-cols-4 gap-6">
        {features.map((feature) => (
          <TabsTrigger
            key={feature.title}
            value={feature.title}
            className="flex cursor-pointer flex-col items-center justify-start gap-5 px-2 py-6"
          >
            <FeatureDetails feature={feature} isActive={activeTab === feature.title} />
          </TabsTrigger>
        ))}
      </TabsList>
      {features.map((feature) => (
        <TabsContent key={feature.title} value={feature.title}>
          {/* content intentionally omitted (image removed) */}
        </TabsContent>
      ))}
    </Tabs>
  );
}
