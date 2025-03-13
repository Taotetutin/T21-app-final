export interface GeneticRisk {
  probability: number;
  riskLevel: string;
  recommendation: string;
}

export interface FormData {
  age: string;
  familyHistory: string;
  geneticMarker: string;
  lifestyle: string;
}