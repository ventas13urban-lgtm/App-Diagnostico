export type Industry = {
  id: string;
  label: string;
  description: string;
  subIndustries: string[];
};

export type DiagnosticState = {
  step: number;
  companySize: number;
  selectedIndustry: string | null;
  adSpend: number;
  digitalPercent: number;
  bookingDate: string | null; // ISO Date string
  bookingTime: string | null;
};

export type StepProps = {
  state: DiagnosticState;
  updateState: (updates: Partial<DiagnosticState>) => void;
  onNext: () => void;
  onBack: () => void;
};