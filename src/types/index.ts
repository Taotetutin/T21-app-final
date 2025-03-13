// Basic types for the application
export interface User {
  id: string;
  name: string;
  email: string;
}

// Add any other types needed by the application
export interface TrisomyRiskFactors {
  age: number;
  familyHistory: boolean;
  previousAffectedPregnancy: boolean;
}

export interface SecondTrimesterMarkers {
  maternalAge: number;
  afp: number;
  ue3: number;
  hcg: number;
  inhibin: number;
}

export interface FirstTrimesterMarkers {
  baselineRisk: number;
  crl: number;
  nuchalTranslucency: number;
  heartRate: number;
  nasalBone: 'present' | 'absent' | 'hypoplastic';
  tricuspidRegurgitation: 'normal' | 'abnormal';
  ductusVenosus: 'normal' | 'abnormal';
}


export interface SecondTrimesterParams {
  maternalAge: string;
  afp: string;
  hcg: string;
  ue3: string;
  inhibinA?: string;
  gestationalAge?: string;
  [key: string]: string | undefined;
}

export interface FirstTrimesterParams {
  maternalAge: number;
  nuchalTranslucency: number;
  crl: number;
  previousT21: boolean;
  nasalBone: 'present' | 'absent' | 'not_assessed';
  tricuspidRegurgitation: 'normal' | 'abnormal' | 'not_assessed';
  ductusVenosus: 'normal' | 'abnormal' | 'not_assessed';
}

export interface RiskResult {
  risk: number;
  riskRatio: string;
  riskPercentage: string;
  interpretation: string;
}

export type TrisomyRisk = {
  value: number;
  interpretation: string;
  recommendation: string;
};

export interface GeneticRisk {
  probability: number;
  riskLevel: string;
  recommendation: string;
}

export interface SecondTrimesterFormData {
  gestationalAge: string;
  afp: string;
  hcg: string;
  estriol: string;
  inhibin: string;
  nasalBone: 'present' | 'absent' | 'unknown';
}

export interface FormData {
  age: string;
  familyHistory: string;
  geneticMarker: string;
  lifestyle: string;
}

export interface SecondTrimesterData {
  age: number;
  nuchalFold?: number;
  femurlength?: number;
  abdominalCircumference?: 'normal' | 'reduced';
}

export interface SecondTrimesterInputs {
  maternalAge: string;
  gestationalAgeWeeks: string;
  ntMeasurement: string;
  ductusFlow: string;
  tricuspidFlow: string;
  facialAngle: string;
}

export interface RiskDisplayProps {
  risk: number;
}

// First Trimester Risk Types
export interface FirstTrimesterMarkers2 {
  nuchalTranslucency: number;
  pappA: number;
  betaHCG: number;
  nasalBone: string;
  tricuspidRegurgitation: string;
  ductusVenosus: string;
}

export interface FirstTrimesterRiskResult {
  risk: number;
  riskRatio: number;
  riskPercentage: string;
  interpretation: string;
}

// Second Trimester Risk Types
export interface SecondTrimesterMarkers2 {
  afp: number;
  hcg: number;
  estriol: number;
  inhibinA: number;
}

export interface SecondTrimesterRiskResult {
  risk: number;
  riskRatio: number;
  riskPercentage: string;
  interpretation: string;
}

// Age-related Risk Types
export interface AgeRiskResult {
  risk: number;
  riskRatio: number;
  riskPercentage: string;
  interpretation: string;
}