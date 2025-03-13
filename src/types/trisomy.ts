export interface TrisomyRisk {
  value: number;
  interpretation: string;
  recommendation: string;
}

export interface MarkerValues {
  // First Trimester
  maternalAge: string;
  gestationalAge: string;
  nuchalTranslucency: string;
  pappA: string;
  freeBetaHCG: string;
  // Second Trimester
  afp: string;
  uE3: string;
  inhibinA: string;
  hCG: string;
}

export interface RiskResults {
  baselineRisk: TrisomyRisk;
  firstTrimesterRisk: TrisomyRisk;
  secondTrimesterRisk: TrisomyRisk;
}