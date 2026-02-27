import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface EvaluationDetail {
  score?: number | null;
  priority_label?: string | null;
  strengths?: string[] | null;
  risks?: string[] | null;
  questions_to_ask?: string[] | null;
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
  const strengths = evaluation.strengths ?? [];
  const risks = evaluation.risks ?? [];
  const questions = evaluation.questions_to_ask ?? [];

  return (
    <div className="rounded-lg border border-border bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-card-foreground">{title}</span>
          {evaluation.priority_label && (
            <span className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
              {evaluation.priority_label}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {score != null && (
            <span className="text-sm font-medium text-muted-foreground">
              {score.toFixed(1)}
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground",
              open && "rotate-180"
            )}
          />
        </div>
      </button>

      {open && (
        <div className="border-t border-border px-5 py-4 text-sm text-card-foreground/85 space-y-3">
          {strengths.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Strengths</h4>
              <ul className="space-y-1">
                {strengths.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-strength" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {risks.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Risks</h4>
              <ul className="space-y-1">
                {risks.map((r, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-risk" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {questions.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Questions to Ask</h4>
              <ul className="space-y-1">
                {questions.map((q, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground/40" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {strengths.length === 0 && risks.length === 0 && questions.length === 0 && (
            <p className="text-muted-foreground italic">No details available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EvaluatorCard;
