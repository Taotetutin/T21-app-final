import React, { useState } from 'react';
import { Calculator, Baby, Activity, TestTube } from 'lucide-react';
import { calculateBaselineRisk, calculateFirstTrimesterRisk, calculateSecondTrimesterRisk, interpretRisk } from '../utils/trisomyCalculator';
import type { MarkerValues, RiskResults } from '../types/trisomy';

interface CalculatorProps {
  onCalculate: (results: RiskResults) => void;
}

export default function TrisomyCalculator({ onCalculate }: CalculatorProps) {
  const [values, setValues] = useState<MarkerValues>({
    maternalAge: '',
    gestationalAge: '',
    nuchalTranslucency: '',
    pappA: '',
    freeBetaHCG: '',
    afp: '',
    uE3: '',
    inhibinA: '',
    hCG: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const baselineRisk = calculateBaselineRisk(parseFloat(values.maternalAge));
    
    const firstTrimesterRisk = calculateFirstTrimesterRisk(
      baselineRisk,
      parseFloat(values.nuchalTranslucency),
      parseFloat(values.pappA),
      parseFloat(values.freeBetaHCG)
    );
    
    const secondTrimesterRisk = calculateSecondTrimesterRisk(
      baselineRisk,
      parseFloat(values.afp),
      parseFloat(values.uE3),
      parseFloat(values.inhibinA),
      parseFloat(values.hCG)
    );

    onCalculate({
      baselineRisk: interpretRisk(baselineRisk),
      firstTrimesterRisk: interpretRisk(firstTrimesterRisk),
      secondTrimesterRisk: interpretRisk(secondTrimesterRisk)
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-blue-900">Datos Clínicos</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-medium text-blue-800">
            <Baby className="w-5 h-5" />
            Datos Básicos
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Edad Materna (años)
              </label>
              <input
                type="number"
                required
                min="15"
                max="50"
                value={values.maternalAge}
                onChange={(e) => setValues({ ...values, maternalAge: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Edad Gestacional (semanas)
              </label>
              <input
                type="number"
                required
                min="11"
                max="20"
                step="0.1"
                value={values.gestationalAge}
                onChange={(e) => setValues({ ...values, gestationalAge: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-medium text-blue-800">
            <Activity className="w-5 h-5" />
            Marcadores Primer Trimestre
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Translucencia Nucal (mm)
              </label>
              <input
                type="number"
                step="0.1"
                value={values.nuchalTranslucency}
                onChange={(e) => setValues({ ...values, nuchalTranslucency: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                PAPP-A (MoM)
              </label>
              <input
                type="number"
                step="0.01"
                value={values.pappA}
                onChange={(e) => setValues({ ...values, pappA: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                β-hCG libre (MoM)
              </label>
              <input
                type="number"
                step="0.01"
                value={values.freeBetaHCG}
                onChange={(e) => setValues({ ...values, freeBetaHCG: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-medium text-blue-800">
            <TestTube className="w-5 h-5" />
            Marcadores Segundo Trimestre
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                AFP (MoM)
              </label>
              <input
                type="number"
                step="0.01"
                value={values.afp}
                onChange={(e) => setValues({ ...values, afp: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                uE3 (MoM)
              </label>
              <input
                type="number"
                step="0.01"
                value={values.uE3}
                onChange={(e) => setValues({ ...values, uE3: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Inhibina A (MoM)
              </label>
              <input
                type="number"
                step="0.01"
                value={values.inhibinA}
                onChange={(e) => setValues({ ...values, inhibinA: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                hCG (MoM)
              </label>
              <input
                type="number"
                step="0.01"
                value={values.hCG}
                onChange={(e) => setValues({ ...values, hCG: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] shadow-lg"
        >
          Calcular Riesgo
        </button>
      </form>
    </div>
  );
}