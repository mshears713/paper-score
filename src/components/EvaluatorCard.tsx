import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface EvaluationDetail {
  score?: number | null;
  assessment?: string | null;
  details?: string | null;
  [key: string]: unknown;
}

interface EvaluatorCardProps {
  title: string;
  evaluation: EvaluationDetail | null;
}

const EvaluatorCard = ({ title, evaluation }: EvaluatorCardProps) => {
  const [open, setOpen] = useState(false);

  if (!evaluation) return null;

  const score = evaluation.score;
  const assessment = evaluation.assessment;
  const details = evaluation.details;

  return (
    <div className="rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-card-foreground">{title}</span>
          {score != null && (
            <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {score.toFixed(1)}
            </span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-card-foreground/85">
          {assessment && <p className="mb-2">{assessment}</p>}
          {details && <p className="text-muted-foreground">{details}</p>}
          {!assessment && !details && (
            <p className="text-muted-foreground italic">No details available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvaluatorCard;
