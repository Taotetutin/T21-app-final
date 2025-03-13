
import React, { useState, useEffect } from 'react';
import { Calendar, Stethoscope, Heart } from 'lucide-react';
import RiskDisplay from './RiskDisplay';

interface FirstTrimesterState {
  screeningBaseRisk: string;
  previousT21: boolean;
  nasalBone: string;
  tricuspidRegurgitation: string;
  ductusVenosus: string;
}

export default function FirstTrimesterCalculator() {
  const [markers, setMarkers] = useState<FirstTrimesterState>({
    screeningBaseRisk: '',
    previousT21: false,
    nasalBone: 'normal',
    tricuspidRegurgitation: 'normal',
    ductusVenosus: 'normal'
  });
  
  const [risk, setRisk] = useState<number | null>(null);

  const calculateRisk = () => {
    // Validar que hay un riesgo base
    if (!markers.screeningBaseRisk || parseInt(markers.screeningBaseRisk) <= 0) {
      return;
    }

    // Iniciar con el riesgo base de screening (1/denominador)
    let baseRisk = 1 / parseInt(markers.screeningBaseRisk);
    let likelihoodRatio = 1;

    // Aplicar LHR para hueso nasal según fetalmedicine.org y appsjuan.shinyapps.io
    if (markers.nasalBone === 'absent') {
      likelihoodRatio *= 48.5; // LR+ para hueso nasal ausente
    } else if (markers.nasalBone === 'hypoplastic') {
      likelihoodRatio *= 27.3; // LR+ para hueso nasal hipoplásico
    } else {
      likelihoodRatio *= 0.45; // LR- para hueso nasal normal
    }

    // Aplicar LHR para regurgitación tricúspide
    if (markers.tricuspidRegurgitation === 'abnormal') {
      likelihoodRatio *= 55.9; // LR+ para RT anormal
    } else {
      likelihoodRatio *= 0.62; // LR- para RT normal
    }

    // Aplicar LHR para ductus venoso
    if (markers.ductusVenosus === 'abnormal') {
      likelihoodRatio *= 21.3; // LR+ para DV anormal
    } else {
      likelihoodRatio *= 0.70; // LR- para DV normal
    }

    // Calcular riesgo final
    const finalRisk = baseRisk * likelihoodRatio;
    setRisk(finalRisk);
  };

  // Eliminado el useEffect que calculaba automáticamente
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateRisk();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setMarkers({ ...markers, [name]: checkbox.checked });
    } else {
      setMarkers({ ...markers, [name]: value });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-blue-900">Marcadores Primer Trimestre</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">
              Riesgo por Screening básico 1/
            </label>
            <input
              type="number"
              name="screeningBaseRisk"
              value={markers.screeningBaseRisk}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              placeholder="Ingrese el denominador (ej: 250 para 1/250)"
              min="1"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Ingrese el denominador del riesgo calculado previamente por screening
            </p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-blue-800 mb-1">
              <input
                type="checkbox"
                name="previousT21"
                checked={markers.previousT21}
                onChange={handleInputChange}
                className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
              />
              Antecedente de hijo con trisomía 21
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Hueso Nasal
              </label>
              <select
                name="nasalBone"
                value={markers.nasalBone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="normal">Presente</option>
                <option value="absent">Ausente</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                LR+: 48.5 (ausente), LR-: 0.45 (presente)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Regurgitación Tricúspide
              </label>
              <select
                name="tricuspidRegurgitation"
                value={markers.tricuspidRegurgitation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="normal">Normal</option>
                <option value="abnormal">Anormal</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                LR+: 55.9 (anormal), LR-: 0.62 (normal)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Ductus Venoso
              </label>
              <select
                name="ductusVenosus"
                value={markers.ductusVenosus}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="normal">Normal</option>
                <option value="abnormal">Anormal</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                LR+: 21.3 (anormal), LR-: 0.70 (normal)
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Calcular Riesgo
            </button>
          </div>
        </form>
      </div>

      {risk !== null && <RiskDisplay risk={risk} />}
    </div>
  );
}
