import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { calculateSecondTrimesterRisk } from '../utils/riskCalculators';
import RiskDisplay from './RiskDisplay';

interface SecondTrimesterMarkers {
  baselineRisk: string;
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
  thickNuchalFold: string;
  cardiacDefect: string;
  echogenicBowel: string;
  nasalHypoplasia: string;
  shortHumerus: string;
}

export default function SecondTrimesterCalculator() {
  const [markers, setMarkers] = useState<SecondTrimesterMarkers>({
    baselineRisk: '',
    previousT21: false,
    nasalBone: 'normal',
    cardiacFocus: 'absent',
    ventriculomegaly: 'absent',
    nuchalFold: 'normal',
    shortFemur: 'normal',
    aberrantSubclavian: 'absent',
    hyperechogenicBowel: 'absent',
    pyelectasis: 'absent',
    hasFirstTrimesterScreening: false,
    thickNuchalFold: 'absent',
    cardiacDefect: 'absent',
    echogenicBowel: 'absent',
    nasalHypoplasia: 'absent',
    shortHumerus: 'absent'
  });
  const [risk, setRisk] = useState<number | null>(null);

  // Eliminado el useEffect que calculaba automáticamente

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMarkers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedRisk = calculateSecondTrimesterRisk({
      ...markers,
      baselineRisk: parseFloat(markers.baselineRisk)
    });
    setRisk(calculatedRisk);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Stethoscope className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-blue-900">Sonograma Genético</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-blue-800 mb-4">
              <input
                type="checkbox"
                checked={markers.hasFirstTrimesterScreening}
                onChange={(e) => setMarkers({ ...markers, hasFirstTrimesterScreening: e.target.checked })}
                className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
              />
              Tiene screening de primer trimestre
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">
              {markers.hasFirstTrimesterScreening
                ? 'Riesgo del Screening Primer Trimestre (1/X)'
                : 'Riesgo Basal por Edad Materna (1/X)'}
            </label>
            <input
              type="number"
              required
              min="1"
              value={markers.baselineRisk}
              onChange={(e) => setMarkers({ ...markers, baselineRisk: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              placeholder="Ingrese el denominador del riesgo (ej: 250 para 1/250)"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-blue-800 mb-4">
              <input
                type="checkbox"
                checked={markers.previousT21}
                onChange={(e) => setMarkers({ ...markers, previousT21: e.target.checked })}
                className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
              />
              Antecedente de hijo con Trisomía 21
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
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
                <option value="normal">Normal</option>
                <option value="hypoplastic">Hipoplásico</option>
                <option value="absent">Ausente</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                LR+: 50.5 (ausente), 30.2 (hipoplásico), LR-: 0.38 (normal)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Foco Cardíaco Hiperecogénico
              </label>
              <select
                name="cardiacFocus"
                value={markers.cardiacFocus}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="absent">Ausente</option>
                <option value="present">Presente</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                LR+: 5.83 (presente), LR-: 0.80 (ausente)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Ventriculomegalia
              </label>
              <select
                name="ventriculomegaly"
                value={markers.ventriculomegaly}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="absent">Ausente</option>
                <option value="present">Presente</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                LR+: 27.5 (presente), LR-: 0.94 (ausente)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Pliegue Nucal
              </label>
              <select
                name="nuchalFold"
                value={markers.nuchalFold}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="normal">Normal</option>
                <option value="increased">Aumentado</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                LR+: 53.05 (aumentado), LR-: 0.46 (normal)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Fémur Corto
              </label>
              <select
                name="shortFemur"
                value={markers.shortFemur}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="normal">Normal</option>
                <option value="short">Corto</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                LR+: 3.7 (presente), LR-: 0.80 (ausente)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Arteria Subclavia Aberrante
              </label>
              <select
                name="aberrantSubclavian"
                value={markers.aberrantSubclavian}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="absent">Ausente</option>
                <option value="present">Presente</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                LR+: 21.48 (presente), LR-: 0.71 (ausente)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Intestino Hiperecogénico
              </label>
              <select
                name="hyperechogenicBowel"
                value={markers.hyperechogenicBowel}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="absent">Ausente</option>
                <option value="present">Presente</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                LR+: 6.7 (presente), LR-: 0.93 (ausente)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">
                Pielectasia
              </label>
              <select
                name="pyelectasis"
                value={markers.pyelectasis}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="absent">Ausente</option>
                <option value="present">Presente</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                LR+: 7.63 (presente), LR-: 0.92 (ausente)
              </p>
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

      {risk !== null && (
        <RiskDisplay
          title="Riesgo Segundo Trimestre"
          risk={risk}
          description="Este cálculo considera los hallazgos del sonograma genético para ajustar el riesgo de trisomía 21."
        />
      )}
    </div>
  );
}