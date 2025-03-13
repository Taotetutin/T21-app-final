import type { GeneticRisk } from '../types/genetics';

export const calculateGeneticRisk = (
  age: number,
  familyHistory: number,
  geneticMarker: number,
  lifestyle: number
): GeneticRisk => {
  // Base probability calculation using weighted factors
  const ageFactor = age * 0.3;
  const historyFactor = familyHistory * 0.3;
  const markerFactor = geneticMarker * 0.25;
  const lifestyleFactor = lifestyle * 0.15;

  const probability = (ageFactor + historyFactor + markerFactor + lifestyleFactor) * 100;
  const normalizedProbability = Math.min(Math.max(probability, 0), 100);

  // Risk level determination
  let riskLevel: string;
  let recommendation: string;

  if (normalizedProbability < 30) {
    riskLevel = 'Riesgo Bajo';
    recommendation = 'Continúe manteniendo un estilo de vida saludable. Se recomiendan chequeos regulares.';
  } else if (normalizedProbability < 60) {
    riskLevel = 'Riesgo Moderado';
    recommendation = 'Considere el asesoramiento genético y exámenes de salud más frecuentes.';
  } else {
    riskLevel = 'Riesgo Alto';
    recommendation = 'Se recomienda encarecidamente una consulta inmediata con un asesor genético.';
  }

  return {
    probability: Number(normalizedProbability.toFixed(1)),
    riskLevel,
    recommendation
  };
};