export const calculateBaselineRisk = (maternalAge: number): number => {
  // Risk calculation based on maternal age
  // Values based on established medical research
  if (maternalAge < 20) return 1/1500;
  if (maternalAge < 25) return 1/1350;
  if (maternalAge < 30) return 1/900;
  if (maternalAge < 35) return 1/400;
  if (maternalAge < 40) return 1/100;
  if (maternalAge < 45) return 1/30;
  return 1/10;
};

export const calculateFirstTrimesterRisk = (
  baselineRisk: number,
  nt: number,
  pappA: number,
  freeBetaHCG: number
): number => {
  let riskMultiplier = 1;
  
  // NT adjustment
  if (nt > 3.5) riskMultiplier *= 20;
  else if (nt > 3.0) riskMultiplier *= 10;
  else if (nt > 2.5) riskMultiplier *= 3;
  
  // PAPP-A adjustment (MoM - Multiple of Median)
  if (pappA < 0.4) riskMultiplier *= 3;
  else if (pappA > 2.5) riskMultiplier *= 0.5;
  
  // Free β-hCG adjustment (MoM)
  if (freeBetaHCG > 2.5) riskMultiplier *= 2;
  else if (freeBetaHCG < 0.4) riskMultiplier *= 0.5;
  
  return baselineRisk * riskMultiplier;
};

export const calculateSecondTrimesterRisk = (
  baselineRisk: number,
  afp: number,
  uE3: number,
  inhibinA: number,
  hCG: number
): number => {
  let riskMultiplier = 1;
  
  // AFP adjustment (MoM)
  if (afp < 0.5) riskMultiplier *= 2;
  
  // uE3 adjustment (MoM)
  if (uE3 < 0.5) riskMultiplier *= 2;
  
  // Inhibin A adjustment (MoM)
  if (inhibinA > 2.0) riskMultiplier *= 1.5;
  
  // hCG adjustment (MoM)
  if (hCG > 2.5) riskMultiplier *= 2;
  
  return baselineRisk * riskMultiplier;
};

export const interpretRisk = (risk: number): TrisomyRisk => {
  const value = risk;
  let interpretation: string;
  let recommendation: string;

  if (risk < 1/1000) {
    interpretation = "Riesgo Bajo";
    recommendation = "Continuar con controles prenatales de rutina.";
  } else if (risk < 1/300) {
    interpretation = "Riesgo Moderado";
    recommendation = "Considerar pruebas diagnósticas adicionales como NIPT.";
  } else {
    interpretation = "Riesgo Alto";
    recommendation = "Se recomienda evaluación por especialista y considerar amniocentesis.";
  }

  return {
    value,
    interpretation,
    recommendation
  };
};