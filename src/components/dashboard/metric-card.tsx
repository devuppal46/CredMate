import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ElementType;
  description: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, value, icon: Icon, description, className }: MetricCardProps) {
  return (
    <Card className={cn("shadow-sm border-border bg-card", className)}>
      <CardContent className="p-5 flex flex-col justify-center h-full gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-primary shrink-0">
            <Icon className="size-4" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline gap-1">
            {value}
          </div>
          <div className="text-sm flex items-center gap-1.5 text-muted-foreground">
            {description}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}