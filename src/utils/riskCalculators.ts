// Base risk calculation based on maternal age
export const calculateAgeBasedRisk = (maternalAge: number, previousT21: boolean): number => {
  // Base risk values based on maternal age according to FMF
  let baseRisk = 1/1500;
  if (maternalAge < 20) baseRisk = 1/1500;
  else if (maternalAge < 25) baseRisk = 1/1350;
  else if (maternalAge < 30) baseRisk = 1/900;
  else if (maternalAge < 35) baseRisk = 1/400;
  else if (maternalAge < 37) baseRisk = 1/250;
  else if (maternalAge < 40) baseRisk = 1/100;
  else if (maternalAge < 43) baseRisk = 1/50;
  else if (maternalAge < 45) baseRisk = 1/20;
  else baseRisk = 1/10;

  // Adjust for previous T21 history
  if (previousT21) baseRisk *= 75;

  return baseRisk;
};

export interface FirstTrimesterMarkers {
  maternalAge: number;
  previousT21: boolean;
  crl: number;
  heartRate: number;
  nuchalTranslucency: number;
  nasalBone: 'normal' | 'absent' | 'hypoplastic';
  tricuspidRegurgitation: 'normal' | 'abnormal';
  ductusVenosus: 'normal' | 'abnormal';
}

export const calculateFirstTrimesterRisk = (markers: FirstTrimesterMarkers): number => {
  // Calculate base risk from maternal age
  let risk = calculateAgeBasedRisk(markers.maternalAge, markers.previousT21);
  let likelihoodRatio = 1;

  // CRL-adjusted NT risk (based on FMF algorithm)
  const expectedNT = 1.6219 + 0.0127 * markers.crl;
  const ntMoM = markers.nuchalTranslucency / expectedNT;
  
  // NT adjustment based on MoM
  if (ntMoM > 2.5) {
    likelihoodRatio *= Math.pow(2.5, ntMoM - 1);
  } else {
    likelihoodRatio *= 0.5;
  }

  // Heart rate adjustment
  if (markers.heartRate > 180 || markers.heartRate < 120) {
    likelihoodRatio *= 2.0;
  } else {
    likelihoodRatio *= 0.8;
  }
  
  // Nasal bone adjustment
  if (markers.nasalBone === 'absent') {
    likelihoodRatio *= 48.5;
  } else if (markers.nasalBone === 'hypoplastic') {
    likelihoodRatio *= 27.3;
  } else {
    likelihoodRatio *= 0.45;
  }

  // Tricuspid flow adjustment
  if (markers.tricuspidRegurgitation === 'abnormal') {
    likelihoodRatio *= 55.9;
  } else {
    likelihoodRatio *= 0.62;
  }

  // Ductus venosus flow adjustment
  if (markers.ductusVenosus === 'abnormal') {
    likelihoodRatio *= 21.3;
  } else {
    likelihoodRatio *= 0.70;
  }

  return risk * likelihoodRatio;
};

// Second trimester interface and calculation
export interface SecondTrimesterMarkers {
  baselineRisk: number;
  previousT21: boolean;
  nasalBone: string;
  cardiacFocus: string;
  ventriculomegaly: string;
  nuchalFold: string;
  shortFemur: string;
  aberrantSubclavian: string;
  hyperechogenicBowel: string;
  pyelectasis: string;
  hasFirstTrimesterScreening: boolean;
}

export const calculateSecondTrimesterRisk = (markers: SecondTrimesterMarkers): number => {
  // Start with the provided baseline risk
  const baselineRisk = 1/markers.baselineRisk;
  let likelihoodRatio = 1;

  // Nasal bone
  // LR+ 50.5 (34.4-74.1), LR- 0.38 (0.33-0.43)
  if (markers.nasalBone === 'absent') {
    likelihoodRatio *= 50.5;
  } else if (markers.nasalBone === 'hypoplastic') {
    likelihoodRatio *= 30.2;
  } else {
    likelihoodRatio *= 0.38;
  }

  // Cardiac focus (Echogenic intracardiac focus)
  // LR+ 5.83 (5.02-6.77), LR- 0.80 (0.75-0.86)
  if (markers.cardiacFocus === 'present') {
    likelihoodRatio *= 5.83;
  } else {
    likelihoodRatio *= 0.80;
  }

  // Ventriculomegaly
  // LR+ 27.52 (13.61-55.68), LR- 0.94 (0.91-0.97)
  if (markers.ventriculomegaly === 'present') {
    likelihoodRatio *= 27.52;
  } else {
    likelihoodRatio *= 0.94;
  }

  // Nuchal fold
  // LR+ 53.05 (36.63-76.83), LR- 0.46 (0.42-0.51)
  if (markers.nuchalFold === 'increased') {
    likelihoodRatio *= 53.05;
  } else {
    likelihoodRatio *= 0.46;
  }

  // Short femur
  // LR+ 3.72 (2.79-4.97), LR- 0.85 (0.81-0.89)
  if (markers.shortFemur === 'short') {
    likelihoodRatio *= 3.72;
  } else {
    likelihoodRatio *= 0.85;
  }

  // Aberrant right subclavian artery
  // LR+ 21.48 (11.48-40.19), LR- 0.71 (0.64-0.79)
  if (markers.aberrantSubclavian === 'present') {
    likelihoodRatio *= 21.48;
  } else {
    likelihoodRatio *= 0.71;
  }

  // Hyperechogenic bowel
  // LR+ 6.73 (5.52-8.20), LR- 0.93 (0.91-0.95)
  if (markers.hyperechogenicBowel === 'present') {
    likelihoodRatio *= 6.73;
  } else {
    likelihoodRatio *= 0.93;
  }

  // Pyelectasis
  // LR+ 7.63 (6.11-9.51), LR- 0.92 (0.89-0.94)
  if (markers.pyelectasis === 'present') {
    likelihoodRatio *= 7.63;
  } else {
    likelihoodRatio *= 0.92;
  }

  // Previous T21 adjustment only if no first trimester screening
  if (markers.previousT21 && !markers.hasFirstTrimesterScreening) {
    likelihoodRatio *= 75;
  }

  // Calculate final risk
  let finalRisk = baselineRisk * likelihoodRatio;

  // Limit the minimum risk to 1/8 of baseline risk when all markers are negative
  const minimumRisk = baselineRisk / 8;
  if (finalRisk < minimumRisk && !markers.previousT21) {
    finalRisk = minimumRisk;
  }

  return finalRisk;
};