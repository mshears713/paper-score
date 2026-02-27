import { ShieldCheck, AlertTriangle } from "lucide-react";

interface StrengthsRisksProps {
  strengths: string[] | null;
  risks: string[] | null;
}

const StrengthsRisks = ({ strengths, risks }: StrengthsRisksProps) => {
  const hasStrengths = strengths && strengths.length > 0;
  const hasRisks = risks && risks.length > 0;

  if (!hasStrengths && !hasRisks) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {hasStrengths && (
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="mb-3 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-strength" />
            <h3 className="text-sm font-semibold text-card-foreground">Top Strengths</h3>
          </div>
          <ul className="space-y-2 text-sm text-card-foreground/85">
            {strengths.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-strength" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasRisks && (
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-risk" />
            <h3 className="text-sm font-semibold text-card-foreground">Top Risks</h3>
          </div>
          <ul className="space-y-2 text-sm text-card-foreground/85">
            {risks.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-risk" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StrengthsRisks;
