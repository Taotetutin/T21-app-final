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
    likelihoodRatio *= 50.5;
  } else if (markers.nasalBone === 'hypoplastic') {
    likelihoodRatio *= 30.2;
  } else {
    likelihoodRatio *= 0.38;
  }

  // Tricuspid flow adjustment
  if (markers.tricuspidRegurgitation === 'abnormal') {
    likelihoodRatio *= 55.9;
  } else {
    likelihoodRatio *= 0.62;
  }

  // Ductus venosus flow adjustment
  if (markers.ductusVenosus === 'abnormal') {
    likelihoodRatio *= 3.36;
  } else {
    likelihoodRatio *= 0.61;
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
  if (markers.nasalBone === 'hypoplastic') {
    likelihoodRatio *= 23.27;
  } else {
    likelihoodRatio *= 0.46;
  }

  // Cardiac focus (Echogenic intracardiac focus)
  if (markers.cardiacFocus === 'present') {
    likelihoodRatio *= 5.83;
  } else {
    likelihoodRatio *= 0.8;
  }

  // Ventriculomegaly
  if (markers.ventriculomegaly === 'present') {
    likelihoodRatio *= 27.52;
  } else {
    likelihoodRatio *= 0.94;
  }

  // Nuchal fold
  if (markers.nuchalFold === 'increased') {
    likelihoodRatio *= 23.3;
  } else {
    likelihoodRatio *= 0.8;
  }

  // Aberrant right subclavian artery
  if (markers.aberrantSubclavian === 'present') {
    likelihoodRatio *= 21.48;
  } else {
    likelihoodRatio *= 0.71;
  }

  // Hyperechogenic bowel
  if (markers.hyperechogenicBowel === 'present') {
    likelihoodRatio *= 11.44;
  } else {
    likelihoodRatio *= 0.9;
  }

  // Pyelectasis (Mild hydronephrosis)
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