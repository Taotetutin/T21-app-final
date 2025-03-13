import React, { useState } from 'react';
import { Heart, Droplets, Cookie } from 'lucide-react';
import { analyzeHemoglobin, analyzeGlucose, analyzeCholesterol } from '../utils/healthAnalyzer';
import type { HealthResults } from '../types/health';

interface CalculatorProps {
  setResults: (results: HealthResults) => void;
}

export default function Calculator({ setResults }: CalculatorProps) {
  const [values, setValues] = useState({
    hemoglobin: '',
    glucose: '',
    cholesterol: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const hemoglobinAnalysis = analyzeHemoglobin(parseFloat(values.hemoglobin));
    const glucoseAnalysis = analyzeGlucose(parseFloat(values.glucose));
    const cholesterolAnalysis = analyzeCholesterol(parseFloat(values.cholesterol));
    
    setResults({
      hemoglobin: {
        value: parseFloat(values.hemoglobin),
        ...hemoglobinAnalysis
      },
      glucose: {
        value: parseFloat(values.glucose),
        ...glucoseAnalysis
      },
      cholesterol: {
        value: parseFloat(values.cholesterol),
        ...cholesterolAnalysis
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-blue-900 mb-6">Enter Your Values</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-blue-800 mb-2">
            <Heart className="w-5 h-5" />
            Hemoglobin (g/dL)
          </label>
          <input
            type="number"
            step="0.1"
            value={values.hemoglobin}
            onChange={(e) => setValues({ ...values, hemoglobin: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            required
            placeholder="Normal range: 12-17 g/dL"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-blue-800 mb-2">
            <Droplets className="w-5 h-5" />
            Glucose (mg/dL)
          </label>
          <input
            type="number"
            value={values.glucose}
            onChange={(e) => setValues({ ...values, glucose: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            required
            placeholder="Normal range: 70-126 mg/dL"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-blue-800 mb-2">
            <Cookie className="w-5 h-5" />
            Cholesterol (mg/dL)
          </label>
          <input
            type="number"
            value={values.cholesterol}
            onChange={(e) => setValues({ ...values, cholesterol: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            required
            placeholder="Normal range: 150-200 mg/dL"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02]"
        >
          Analyze Results
        </button>
      </form>
    </div>
  );
}