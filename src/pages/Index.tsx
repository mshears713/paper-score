import { useState } from "react";
import FileUploadSection from "@/components/FileUploadSection";
import QualityBadge from "@/components/QualityBadge";
import ExecutiveSummary from "@/components/ExecutiveSummary";
import EvaluatorCard from "@/components/EvaluatorCard";
import StrengthsRisks from "@/components/StrengthsRisks";
import { FlaskConical } from "lucide-react";

const BASE_API_URL = "https://your-api-url.com";

interface AnalysisResult {
  aggregation: {
    overall_score: number | null;
    quality_band: string | null;
    top_strengths: string[] | null;
    top_risks: string[] | null;
  };
  paper_ir: {
    citation: {
      title: string | null;
      authors: string[] | null;
      year: string | number | null;
      journal: string | null;
    };
    study_design_summary: string | null;
    main_claims: string[] | null;
    stated_limitations: string[] | null;
  };
  evaluations: {
    statistical_rigor: Record<string, unknown> | null;
    methodological_soundness: Record<string, unknown> | null;
    clinical_relevance: Record<string, unknown> | null;
    practical_impact_priority: Record<string, unknown> | null;
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
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-6 py-5">
          <FlaskConical className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold leading-tight text-foreground">
              Paper Evaluator
            </h1>
            <p className="text-sm text-muted-foreground">
              Upload a research paper for structured quality evaluation
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <FileUploadSection onAnalyze={handleAnalyze} isLoading={loading} />

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-4 text-sm text-destructive">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            {/* Quality badge */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Overall Quality
              </p>
              <QualityBadge
                qualityBand={result.aggregation?.quality_band}
                overallScore={result.aggregation?.overall_score}
              />
            </div>

            {/* Executive summary */}
            <ExecutiveSummary
              title={result.paper_ir?.citation?.title}
              authors={result.paper_ir?.citation?.authors}
              year={result.paper_ir?.citation?.year}
              journal={result.paper_ir?.citation?.journal}
              studyDesignSummary={result.paper_ir?.study_design_summary}
              mainClaims={result.paper_ir?.main_claims}
              statedLimitations={result.paper_ir?.stated_limitations}
            />

            {/* Strengths & Risks */}
            <StrengthsRisks
              strengths={result.aggregation?.top_strengths}
              risks={result.aggregation?.top_risks}
            />

            {/* Evaluator cards */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground">Evaluations</h2>
              <div className="space-y-3">
                {Object.entries(evaluatorLabels).map(([key, label]) => (
                  <EvaluatorCard
                    key={key}
                    title={label}
                    evaluation={
                      result.evaluations?.[key as keyof typeof result.evaluations] as Record<string, unknown> | null
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
