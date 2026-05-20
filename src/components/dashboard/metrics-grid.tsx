import { Activity, ShieldCheck, BarChart3, CheckCircle, AlertCircle } from "lucide-react";
import { MetricCard } from "./metric-card";

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
      <MetricCard 
        title="Credit Score"
        icon={Activity}
        value={
          <>
            <h4 className="text-2xl font-bold tracking-tight text-foreground">742</h4>
            <span className="text-sm text-muted-foreground font-medium">/ 900</span>
          </>
        }
        description={
          <>
            <CheckCircle className="size-3.5 text-primary" /> Good Standing
          </>
        }
      />
      <MetricCard 
        title="Risk Level"
        icon={ShieldCheck}
        value={
          <h4 className="text-2xl font-bold tracking-tight text-foreground">Low Risk</h4>
        }
        description={
          <>
            <CheckCircle className="size-3.5 text-primary" /> Healthy Profile
          </>
        }
      />
      <MetricCard 
        title="Debt Utilization"
        icon={BarChart3}
        value={
          <h4 className="text-2xl font-bold tracking-tight text-foreground">28%</h4>
        }
        description={
          <>
            <AlertCircle className="size-3.5 text-primary" /> Below 30% limit
          </>
        }
      />
    </div>
  );
}