import { useState } from "react";
import FileUploadSection from "@/components/FileUploadSection";
import QualityBadge from "@/components/QualityBadge";
import EvaluatorCard from "@/components/EvaluatorCard";
import StrengthsRisks from "@/components/StrengthsRisks";
import { FlaskConical } from "lucide-react";

const BASE_API_URL = "https://lindsaybdayhack.onrender.com";

interface EvaluationSection {
  score?: number | null;
  priority_label?: string | null;
  strengths?: string[] | null;
  risks?: string[] | null;
  questions_to_ask?: string[] | null;
  [key: string]: unknown;
}

interface AnalysisResult {
  error?: string | null;
  aggregation: {
    overall_score: number | null;
    quality_band: string | null;
    top_strengths: string[] | null;
    top_risks: string[] | null;
  };
  paper_ir: {
    main_claims: string[] | null;
    stated_limitations: string[] | null;
    [key: string]: unknown;
  };
  evaluations: {
    statistical_rigor: EvaluationSection | null;
    methodological_soundness: EvaluationSection | null;
    clinical_relevance: EvaluationSection | null;
    practical_impact_priority: EvaluationSection | null;
  };
}

const evaluatorLabels: Record<string, string> = {
  statistical_rigor: "Statistical Rigor",
  methodological_soundness: "Methodological Soundness",
  clinical_relevance: "Clinical Relevance",
  practical_impact_priority: "Practical Impact & Priority",
};

const Index = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${BASE_API_URL}/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(errBody || `Server error: ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const buildSummary = (r: AnalysisResult): string => {
    const claims = r.paper_ir?.main_claims ?? [];
    const limitations = r.paper_ir?.stated_limitations ?? [];
    const score = r.aggregation?.overall_score;
    const s1 = claims.length > 0
      ? `The paper claims: ${claims.slice(0, 2).join("; ")}.`
      : "No main claims were identified.";
    const s2 = limitations.length > 0
      ? `Key limitations include: ${limitations.slice(0, 2).join("; ")}.`
      : "No stated limitations were found.";
    const s3 = score != null
      ? `The overall quality score is ${score.toFixed(1)} out of 10.`
      : "";
    return [s1, s2, s3].filter(Boolean).join(" ");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-6 py-5">
          <FlaskConical className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold leading-tight text-foreground">
            Paper Evaluator
          </h1>
        </div>
      </header>

      <div className="mx-auto flex max-w-5xl gap-6 px-6 py-8">
        {/* Left panel */}
        <aside className="w-72 flex-shrink-0">
          <FileUploadSection onAnalyze={handleAnalyze} isLoading={loading} />
        </aside>

        {/* Main panel */}
        <main className="min-w-0 flex-1 space-y-6">
          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-5 py-4 text-sm text-destructive">
              <strong>Error:</strong> {error}
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 border-4 border-border border-t-primary rounded-full animate-spin" />
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Quality badge */}
              <div className="rounded-lg border border-border bg-card p-6">
                <QualityBadge
                  qualityBand={result.aggregation?.quality_band}
                  overallScore={result.aggregation?.overall_score}
                />
              </div>

              {/* Summary */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="mb-2 text-lg font-bold text-card-foreground">Summary</h2>
                <p className="text-sm leading-relaxed text-card-foreground/85">
                  {buildSummary(result)}
                </p>
              </div>

              {/* Evaluator cards */}
              <div>
                <h2 className="mb-3 text-lg font-bold text-foreground">Evaluations</h2>
                <div className="space-y-3">
                  {Object.entries(evaluatorLabels).map(([key, label]) => (
                    <EvaluatorCard
                      key={key}
                      title={label}
                      evaluation={
                        result.evaluations?.[key as keyof typeof result.evaluations] ?? null
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Strengths & Risks */}
              <StrengthsRisks
                strengths={result.aggregation?.top_strengths}
                risks={result.aggregation?.top_risks}
              />
            </div>
          )}

          {!result && !loading && !error && (
            <div className="flex items-center justify-center py-20 text-sm text-muted-foreground">
              Upload a PDF and click Analyze to begin.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
