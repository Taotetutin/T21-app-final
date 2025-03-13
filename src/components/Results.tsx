import React from 'react';
import { Heart, Droplets, Cookie } from 'lucide-react';
import type { HealthResults } from '../types/health';

interface ResultsProps {
  results: HealthResults;
}

export default function Results({ results }: ResultsProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const ResultCard = ({ 
    icon: Icon, 
    title, 
    value,
    status,
    recommendation,
    normalRange 
  }: { 
    icon: typeof Heart;
    title: string;
    value: number;
    status: string;
    recommendation: string;
    normalRange: string;
  }) => (
    <div className="bg-white rounded-lg p-6 shadow border border-blue-100">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
      </div>
      <div className="space-y-2">
        <p className="text-gray-600">Your value: <span className="font-semibold">{value}</span></p>
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
          {status}
        </div>
        <p className="text-sm text-blue-600">Normal Range: {normalRange}</p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">{recommendation}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-blue-900 mb-6">Your Results</h2>
      <div className="space-y-4">
        <ResultCard
          icon={Heart}
          title="Hemoglobin"
          value={results.hemoglobin.value}
          status={results.hemoglobin.status}
          recommendation={results.hemoglobin.recommendation}
          normalRange="12-17 g/dL"
        />
        <ResultCard
          icon={Droplets}
          title="Glucose"
          value={results.glucose.value}
          status={results.glucose.status}
          recommendation={results.glucose.recommendation}
          normalRange="70-126 mg/dL"
        />
        <ResultCard
          icon={Cookie}
          title="Cholesterol"
          value={results.cholesterol.value}
          status={results.cholesterol.status}
          recommendation={results.cholesterol.recommendation}
          normalRange="150-200 mg/dL"
        />
      </div>
    </div>
  );
}