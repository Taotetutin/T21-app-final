import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import type { GeneticRisk } from '../types/genetics';

interface RiskResultsProps {
  risk: GeneticRisk;
}

export default function RiskResults({ risk }: RiskResultsProps) {
  const getRiskIcon = () => {
    switch (risk.riskLevel) {
      case 'Riesgo Bajo':
        return <CheckCircle className="w-12 h-12 text-green-500" />;
      case 'Riesgo Moderado':
        return <AlertTriangle className="w-12 h-12 text-yellow-500" />;
      case 'Riesgo Alto':
        return <AlertCircle className="w-12 h-12 text-red-500" />;
      default:
        return null;
    }
  };

  const getRiskColor = () => {
    switch (risk.riskLevel) {
      case 'Riesgo Bajo':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Riesgo Moderado':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Riesgo Alto':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <div className="text-center mb-6">
        {getRiskIcon()}
        <h2 className="text-2xl font-semibold text-blue-900 mt-4">Resultados de la Evaluación</h2>
      </div>
      
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-block w-32 h-32 rounded-full border-8 border-blue-500 relative">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-blue-900">
              {risk.probability}%
            </span>
          </div>
        </div>

        <div className="text-center">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getRiskColor()}`}>
            {risk.riskLevel}
          </span>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Recomendaciones</h3>
              <p className="text-blue-800">{risk.recommendation}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-blue-600">
          <p>Esta evaluación es una estimación y no sustituye el consejo médico profesional.</p>
        </div>
      </div>
    </div>
  );
}