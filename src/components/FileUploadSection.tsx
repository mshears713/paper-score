import { useRef, useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadSectionProps {
  onAnalyze: (file: File) => void;
  isLoading: boolean;
}

const FileUploadSection = ({ onAnalyze, isLoading }: FileUploadSectionProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (file: File | undefined) => {
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileChange(e.dataTransfer.files[0]);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h2 className="mb-4 text-xl font-bold text-card-foreground">Upload Paper</h2>

      <div
        onClick={() => !isLoading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors",
          dragOver ? "border-primary bg-accent" : "border-border hover:border-primary/40 hover:bg-accent/50",
          isLoading && "pointer-events-none opacity-60"
        )}
      >
        {selectedFile ? (
          <div className="flex items-center gap-3 text-sm text-card-foreground">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-medium">{selectedFile.name}</span>
          </div>
        ) : (
          <>
            <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drop a PDF here or <span className="font-medium text-primary">browse</span>
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files?.[0])}
      />

      <button
        onClick={() => selectedFile && onAnalyze(selectedFile)}
        disabled={!selectedFile || isLoading}
        className={cn(
          "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing…
          </>
        ) : (
          "Analyze Paper"
        )}
      </button>
    </div>
  );
};

export default FileUploadSection;
