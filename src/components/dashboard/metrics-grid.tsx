import { Activity, ShieldCheck, BarChart3, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import { MetricCard } from "./metric-card";

type RiskLevel = "Low" | "Medium" | "High" | "Unknown";

interface MetricsGridProps {
  creditScore: number | null;
  creditScoreMax: number;
  riskLevel: RiskLevel;
  debtUtilization: number | null;
}

function riskIcon(level: RiskLevel) {
  if (level === "Low") return <CheckCircle className="size-3.5 text-primary" />;
  if (level === "Medium") return <AlertCircle className="size-3.5 text-yellow-500" />;
  if (level === "High") return <AlertCircle className="size-3.5 text-destructive" />;
  return <HelpCircle className="size-3.5 text-muted-foreground" />;
}

function riskLabel(level: RiskLevel) {
  if (level === "Unknown") return "N/A";
  return `${level} Risk`;
}

export function MetricsGrid({ creditScore, creditScoreMax, riskLevel, debtUtilization }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
      <MetricCard
        title="Credit Score"
        icon={Activity}
        value={
          <>
            <h4 className="text-2xl font-bold tracking-tight text-foreground">
              {creditScore !== null ? creditScore : "N/A"}
            </h4>
            <span className="text-sm text-muted-foreground font-medium">/ {creditScoreMax}</span>
          </>
        }
        description={
          <>
            <CheckCircle className="size-3.5 text-primary" />
            {creditScore !== null
              ? creditScore >= 750 ? "Excellent" : creditScore >= 650 ? "Good" : "Fair"
              : "Not Available"}
          </>
        }
      />
      <MetricCard
        title="Risk Level"
        icon={ShieldCheck}
        value={<h4 className="text-2xl font-bold tracking-tight text-foreground">{riskLabel(riskLevel)}</h4>}
        description={
          <>
            {riskIcon(riskLevel)}
            {riskLevel === "Low" ? "Healthy Profile" : riskLevel === "Medium" ? "Monitor Closely" : riskLevel === "High" ? "Action Required" : "Not Available"}
          </>
        }
      />
      <MetricCard
        title="Debt Utilization"
        icon={BarChart3}
        value={
          <h4 className="text-2xl font-bold tracking-tight text-foreground">
            {debtUtilization !== null ? `${debtUtilization}%` : "N/A"}
          </h4>
        }
        description={
          <>
            {debtUtilization !== null
              ? <CheckCircle className="size-3.5 text-primary" />
              : <HelpCircle className="size-3.5 text-muted-foreground" />}
            {debtUtilization !== null
              ? debtUtilization <= 30 ? "Below 30% limit" : "Above recommended limit"
              : "Not Available"}
          </>
        }
      />
    </div>
  );
}