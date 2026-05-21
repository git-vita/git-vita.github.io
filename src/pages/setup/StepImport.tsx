import { useState, useRef, useEffect } from 'react';
import { Upload, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import {
  extractTextFromPdf,
  parseResumeWithWebLLM,
  type ExtractedResumeData,
} from '@/lib/resumeImporter';
import { webLLMService, type WebLLMStatus } from '@/lib/webllm';

export interface StepImportProps {
  onNext: (data?: ExtractedResumeData) => void;
  onSkip: () => void;
}

type ParsingState = 'idle' | 'loading_model' | 'extracting' | 'parsing' | 'done' | 'error';

export function StepImport({ onNext, onSkip }: StepImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parsingState, setParsingState] = useState<ParsingState>('idle');
  const [modelProgress, setModelProgress] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [extractedData, setExtractedData] = useState<ExtractedResumeData | null>(
    null
  );
  const [editedData, setEditedData] = useState<ExtractedResumeData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Subscribe to WebLLM status changes
  useEffect(() => {
    return webLLMService.onStatusChange((status: WebLLMStatus) => {
      if (status.status === 'loading' && status.progress !== undefined) {
        setModelProgress(status.progress);
      }
    });
  }, []);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'application/pdf') {
      setFile(droppedFile);
      setError('');
    } else {
      setError('Please drop a PDF file');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a PDF file');
    }
  };

  const handleImport = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    try {
      setError('');
      setParsingState('loading_model');

      setParsingState('extracting');
      const resumeText = await extractTextFromPdf(file);

      if (!resumeText || resumeText.trim().length === 0) {
        throw new Error(
          'Could not extract text from PDF. Please ensure the PDF contains readable text.'
        );
      }

      setParsingState('loading_model');
      const parsed = await parseResumeWithWebLLM(resumeText);

      setExtractedData(parsed);
      setEditedData(parsed);
      setParsingState('done');
    } catch (err) {
      setParsingState('error');
      const errorMsg =
        err instanceof Error ? err.message : 'An error occurred during parsing';
      console.error('Resume parsing error:', errorMsg);
      setError(errorMsg);
    }
  };

  const handleEditChange = (key: keyof ExtractedResumeData, value: any) => {
    setEditedData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleContinue = () => {
    onNext(editedData || undefined);
  };

  if (parsingState === 'done' && editedData) {
    return (
      <div>
        <h2 className="text-foreground mb-6 font-serif text-2xl font-medium sm:text-3xl">
          ✨ Review Your Extracted Resume
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">
          We've extracted your information. Feel free to edit any fields below
          before continuing.
        </p>

        <div className="bg-secondary/30 border-border max-h-96 space-y-4 rounded-lg border p-4">
          <div className="space-y-2 overflow-y-auto max-h-80">
            {/* Name */}
            <div>
              <label className="text-foreground text-xs font-semibold">
                Full Name
              </label>
              <input
                type="text"
                value={editedData.name || ''}
                onChange={(e) => handleEditChange('name', e.target.value)}
                className="bg-background text-foreground border-border mt-1 w-full rounded border px-2 py-1.5 text-xs"
              />
            </div>

            {/* Title */}
            <div>
              <label className="text-foreground text-xs font-semibold">
                Job Title
              </label>
              <input
                type="text"
                value={editedData.title || ''}
                onChange={(e) => handleEditChange('title', e.target.value)}
                className="bg-background text-foreground border-border mt-1 w-full rounded border px-2 py-1.5 text-xs"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-foreground text-xs font-semibold">
                Email
              </label>
              <input
                type="email"
                value={editedData.email || ''}
                onChange={(e) => handleEditChange('email', e.target.value)}
                className="bg-background text-foreground border-border mt-1 w-full rounded border px-2 py-1.5 text-xs"
              />
            </div>

            {/* Phone */}
            {editedData.phone && (
              <div>
                <label className="text-foreground text-xs font-semibold">
                  Phone
                </label>
                <input
                  type="tel"
                  value={editedData.phone}
                  onChange={(e) => handleEditChange('phone', e.target.value)}
                  className="bg-background text-foreground border-border mt-1 w-full rounded border px-2 py-1.5 text-xs"
                />
              </div>
            )}

            {/* Location */}
            <div>
              <label className="text-foreground text-xs font-semibold">
                Location
              </label>
              <input
                type="text"
                value={editedData.location || ''}
                onChange={(e) =>
                  handleEditChange('location', e.target.value)
                }
                className="bg-background text-foreground border-border mt-1 w-full rounded border px-2 py-1.5 text-xs"
              />
            </div>

            {/* About */}
            <div>
              <label className="text-foreground text-xs font-semibold">
                Professional Summary
              </label>
              <textarea
                value={editedData.about || ''}
                onChange={(e) => handleEditChange('about', e.target.value)}
                rows={3}
                className="bg-background text-foreground border-border mt-1 w-full rounded border px-2 py-1.5 text-xs"
              />
            </div>

            {/* Skills count */}
            {editedData.skills && editedData.skills.length > 0 && (
              <div>
                <p className="text-foreground text-xs font-semibold">
                  Skills: {editedData.skills.length} categories extracted
                </p>
              </div>
            )}

            {/* Experience count */}
            {editedData.experience && editedData.experience.length > 0 && (
              <div>
                <p className="text-foreground text-xs font-semibold">
                  Experience: {editedData.experience.length} position
                  {editedData.experience.length !== 1 ? 's' : ''} extracted
                </p>
              </div>
            )}

            {/* Education count */}
            {editedData.education && editedData.education.length > 0 && (
              <div>
                <p className="text-foreground text-xs font-semibold">
                  Education: {editedData.education.length} degree
                  {editedData.education.length !== 1 ? 's' : ''} extracted
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="bg-primary text-primary-foreground mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
        >
          ✅ Looks Good — Continue
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-foreground mb-2 font-serif text-2xl font-medium sm:text-3xl">
        ✨ Import Your Resume
      </h2>
      <p className="text-muted-foreground mb-6 text-sm">
        Upload your PDF resume and we'll auto-fill your portfolio info using AI.
        Everything runs locally on your computer—completely private.
      </p>

      {/* File Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-border bg-secondary/30 hover:border-primary/40 mb-6 cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          file ? 'border-primary/60' : ''
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Upload className="text-primary mx-auto mb-2" size={24} />
        <p className="text-foreground font-medium text-sm">
          {file ? file.name : 'Drop your PDF here or click to browse'}
        </p>
        <p className="text-muted-foreground text-xs">
          {file ? 'File selected' : 'PDF files only'}
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="border-red-500/30 bg-red-500/5 text-red-600 mb-6 flex gap-2 rounded-lg border p-3 text-xs">
          <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading States */}
      {parsingState === 'loading_model' && (
        <div className="border-primary/30 bg-primary/5 text-primary mb-6 flex gap-2 rounded-lg border p-3 text-xs">
          <Loader size={14} className="mt-0.5 flex-shrink-0 animate-spin" />
          <div className="flex-1">
            <p className="mb-1.5">Initializing AI model...</p>
            <div className="bg-primary/20 h-1.5 w-full overflow-hidden rounded">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${modelProgress}%` }}
              />
            </div>
            <p className="text-primary/70 mt-1 text-[11px]">{modelProgress}%</p>
          </div>
        </div>
      )}

      {parsingState === 'extracting' && (
        <div className="border-primary/30 bg-primary/5 text-primary mb-6 flex gap-2 rounded-lg border p-3 text-xs">
          <Loader size={14} className="mt-0.5 flex-shrink-0 animate-spin" />
          <span>Extracting text from PDF...</span>
        </div>
      )}

      {parsingState === 'parsing' && (
        <div className="border-primary/30 bg-primary/5 text-primary mb-6 flex gap-2 rounded-lg border p-3 text-xs">
          <Loader size={14} className="mt-0.5 flex-shrink-0 animate-spin" />
          <span>Parsing resume with AI...</span>
        </div>
      )}

      {parsingState === 'error' && (
        <div className="border-red-500/30 bg-red-500/5 text-red-600 mb-6 flex gap-2 rounded-lg border p-3 text-xs">
          <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
          <span>Parsing failed. Please try again.</span>
        </div>
      )}

      {parsingState === 'done' && !extractedData && (
        <div className="border-green-500/30 bg-green-500/5 text-green-700 mb-6 flex gap-2 rounded-lg border p-3 text-xs">
          <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
          <span>Resume parsed successfully!</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleImport}
          disabled={
            !file ||
            parsingState === 'loading_model' ||
            parsingState === 'extracting' ||
            parsingState === 'parsing'
          }
          className="bg-primary text-primary-foreground disabled:opacity-50 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:hover:opacity-50"
        >
          ⚡ Extract & Fill In
        </button>
        <button
          onClick={onSkip}
          className="border-border text-muted-foreground hover:text-foreground inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-semibold transition-colors hover:border-primary/40"
        >
          Skip — I'll Fill In Manually
        </button>
      </div>
    </div>
  );
}
