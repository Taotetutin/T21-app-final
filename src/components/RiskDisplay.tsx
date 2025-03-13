
import React from 'react';
import { AlertTriangle, ThumbsUp, AlertCircle } from 'lucide-react';

interface RiskDisplayProps {
  risk: number;
}

export default function RiskDisplay({ risk }: RiskDisplayProps) {
  // Calcular ratio como 1/X
  const denominator = Math.round(1 / risk);
  const riskRatio = `1/${denominator}`;
  const percentage = (risk * 100).toFixed(2);

  // Determinar la interpretación del riesgo
  let interpretation: string;
  let color: string;
  let Icon: typeof AlertTriangle;

  if (risk >= 1/50) {
    interpretation = "Alto riesgo";
    color = "red";
    Icon = AlertTriangle;
  } else if (risk >= 1/250) {
    interpretation = "Riesgo intermedio";
    color = "amber";
    Icon = AlertCircle;
  } else {
    interpretation = "Bajo riesgo";
    color = "green";
    Icon = ThumbsUp;
  }

  return (
    <div className={`bg-${color}-50 border border-${color}-200 rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <h3 className={`text-xl font-bold text-${color}-700`}>{interpretation}</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Ratio de Riesgo</p>
          <p className="text-2xl font-bold text-blue-900">{riskRatio}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Riesgo (%)</p>
          <p className="text-2xl font-bold text-blue-900">{percentage}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-1 col-span-2">
          <p className="text-sm text-gray-500 mb-1">Valoración</p>
          <p className={`text-lg font-semibold text-${color}-600`}>{interpretation}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4">
        <h4 className="text-lg font-semibold text-blue-900 mb-2">Recomendación</h4>
        {risk >= 1/250 ? (
          <p className="text-gray-700">
            Se recomienda considerar la realización de una prueba diagnóstica invasiva para confirmar o descartar la presencia de trisomía 21. Consulte con su médico especialista para recibir asesoramiento genético adecuado.
          </p>
        ) : (
          <p className="text-gray-700">
            Continuar con el seguimiento obstétrico habitual. Este resultado indica un bajo riesgo de trisomía 21, aunque no descarta completamente la posibilidad.
          </p>
        )}
      </div>
    </div>
  );
}
