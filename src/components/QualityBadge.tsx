import { cn } from "@/lib/utils";

interface QualityBadgeProps {
  qualityBand: string | null;
  overallScore: number | null;
}

const bandConfig: Record<string, { label: string; colorClass: string }> = {
  "high quality": { label: "High Quality", colorClass: "bg-quality-excellent text-white" },
  "moderate quality": { label: "Moderate Quality", colorClass: "bg-quality-moderate text-white" },
  "low quality": { label: "Low Quality", colorClass: "bg-quality-low text-white" },
};

const QualityBadge = ({ qualityBand, overallScore }: QualityBadgeProps) => {
  const band = qualityBand?.toLowerCase() ?? "moderate quality";
  const config = bandConfig[band] ?? bandConfig["moderate quality"];

  return (
    <div className="flex items-center gap-4">
      <span
        className={cn(
          "inline-flex items-center rounded-md px-4 py-2 text-base font-semibold",
          config.colorClass
        )}
      >
        {config.label}
      </span>
      {overallScore != null && (
        <span className="text-3xl font-bold text-foreground">
          {overallScore.toFixed(1)}
          <span className="text-sm font-normal text-muted-foreground"> / 10</span>
        </span>
      )}
    </div>
  );
};

export default QualityBadge;
