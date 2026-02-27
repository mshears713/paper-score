interface ExecutiveSummaryProps {
  title: string | null;
  authors: string[] | null;
  year: string | number | null;
  journal: string | null;
  studyDesignSummary: string | null;
  mainClaims: string[] | null;
  statedLimitations: string[] | null;
}

const ExecutiveSummary = ({
  title,
  authors,
  year,
  journal,
  studyDesignSummary,
  mainClaims,
  statedLimitations,
}: ExecutiveSummaryProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h2 className="mb-4 text-xl font-bold text-card-foreground">Paper Overview</h2>

      {title && (
        <h3 className="mb-1 text-lg font-semibold text-card-foreground">{title}</h3>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
        {authors && authors.length > 0 && <span>{authors.join(", ")}</span>}
        {year && <span>· {year}</span>}
        {journal && <span>· <em>{journal}</em></span>}
      </div>

      {studyDesignSummary && (
        <p className="mb-4 text-sm leading-relaxed text-card-foreground/85">
          {studyDesignSummary}
        </p>
      )}

      {mainClaims && mainClaims.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Main Claims
          </h4>
          <ul className="space-y-1 text-sm text-card-foreground/85">
            {mainClaims.map((claim, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                {claim}
              </li>
            ))}
          </ul>
        </div>
      )}

      {statedLimitations && statedLimitations.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Stated Limitations
          </h4>
          <ul className="space-y-1 text-sm text-card-foreground/85">
            {statedLimitations.map((lim, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground/40" />
                {lim}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExecutiveSummary;
