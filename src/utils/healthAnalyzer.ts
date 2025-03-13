export const analyzeHemoglobin = (value: number) => {
  if (value < 12) {
    return {
      status: 'Low',
      recommendation: 'Consult your doctor. Consider iron supplements and iron-rich foods like red meat, spinach, and legumes.'
    };
  }
  if (value > 17) {
    return {
      status: 'High',
      recommendation: 'Consult your doctor. Stay hydrated and avoid smoking.'
    };
  }
  return {
    status: 'Normal',
    recommendation: 'Maintain a balanced diet rich in iron and vitamins.'
  };
};

export const analyzeGlucose = (value: number) => {
  if (value < 70) {
    return {
      status: 'Low',
      recommendation: 'Consume fast-acting carbohydrates. Consider eating regular, balanced meals.'
    };
  }
  if (value > 126) {
    return {
      status: 'High',
      recommendation: 'Consult your doctor. Monitor your carbohydrate intake and consider regular exercise.'
    };
  }
  return {
    status: 'Normal',
    recommendation: 'Maintain a balanced diet and regular physical activity.'
  };
};

export const analyzeCholesterol = (value: number) => {
  if (value < 150) {
    return {
      status: 'Low',
      recommendation: 'Include healthy fats in your diet like avocados, nuts, and olive oil.'
    };
  }
  if (value > 200) {
    return {
      status: 'High',
      recommendation: 'Reduce saturated fats, increase fiber intake, and consider regular exercise.'
    };
  }
  return {
    status: 'Normal',
    recommendation: 'Continue maintaining a heart-healthy lifestyle.'
  };
};