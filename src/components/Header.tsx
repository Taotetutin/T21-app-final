import React from 'react';
import { Dna } from 'lucide-react';

export default function Header() {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center mb-4">
        <Dna className="w-12 h-12 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold text-blue-900 mb-2">Calculadora de Riesgo T21</h1>
      <p className="text-blue-700 max-w-2xl mx-auto">
        Evaluación de riesgo de Trisomía 21 basada en edad materna y marcadores ecográficos
      </p>
    </header>
  );
}