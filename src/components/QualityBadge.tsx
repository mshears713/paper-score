import { cn } from "@/lib/utils";

interface QualityBadgeProps {
  qualityBand: string | null;
  overallScore: number | null;
}

const bandConfig: Record<string, { label: string; colorClass: string }> = {
  excellent: { label: "Excellent", colorClass: "bg-quality-excellent text-white" },
  good: { label: "Good", colorClass: "bg-quality-good text-white" },
  moderate: { label: "Moderate", colorClass: "bg-quality-moderate text-white" },
  low: { label: "Low", colorClass: "bg-quality-low text-white" },
};

const QualityBadge = ({ qualityBand, overallScore }: QualityBadgeProps) => {
  const band = qualityBand?.toLowerCase() ?? "moderate";
  const config = bandConfig[band] ?? bandConfig.moderate;

  return (
    <div className="flex items-center gap-4">
      <span
        className={cn(
          "inline-flex items-center rounded-lg px-5 py-2.5 text-lg font-semibold tracking-wide",
          config.colorClass
        )}
      >
        {config.label}
      </span>
      {overallScore != null && (
        <span className="text-2xl font-semibold text-muted-foreground">
          {overallScore.toFixed(1)}
          <span className="text-sm font-normal text-muted-foreground/70"> / 10</span>
        </span>
      )}
    </div>
  );
};

export default QualityBadge;
