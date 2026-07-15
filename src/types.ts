export type Page = 'pulse' | 'journal' | 'insight' | 'pricing';

export type DecisionClassification = 'Strategic' | 'Operational' | 'Financial' | 'HR' | 'Compliance';

export type DecisionOutcome = 'GOOD CALL' | 'COSTLY MISTAKE' | 'PENDING';

export interface Decision {
  id: string;
  title: string;
  classification: DecisionClassification;
  whatDecided: string;
  whyDecided: string;
  alternativesConsidered: string;
  expectedOutcome: string;
  outcome: DecisionOutcome;
  date: string;
  excerpt: string;
}
