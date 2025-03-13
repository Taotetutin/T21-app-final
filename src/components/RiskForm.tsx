import React, { useState } from 'react';
import { calculateGeneticRisk } from '../utils/riskCalculator';
import { UserCircle2, Users, Dna, Activity } from 'lucide-react';
import type { FormData } from '../types/genetics';

interface RiskFormProps {
  onCalculate: (risk: ReturnType<typeof calculateGeneticRisk>) => void;
}

export default function RiskForm({ onCalculate }: RiskFormProps) {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    familyHistory: '0',
    geneticMarker: '0',
    lifestyle: '0',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const risk = calculateGeneticRisk(
      parseInt(formData.age),
      parseInt(formData.familyHistory),
      parseInt(formData.geneticMarker),
      parseInt(formData.lifestyle)
    );
    onCalculate(risk);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-blue-900 mb-6">Evaluación de Riesgo Genético</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="flex items-center gap-2 text-blue-800 mb-2">
            <UserCircle2 className="w-5 h-5" />
            Edad
          </label>
          <input
            type="number"
            min="0"
            max="120"
            required
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white/50"
            placeholder="Ingrese su edad"
          />
        </div>

        <div className="form-group">
          <label className="flex items-center gap-2 text-blue-800 mb-2">
            <Users className="w-5 h-5" />
            Historia Familiar
          </label>
          <select
            value={formData.familyHistory}
            onChange={(e) => setFormData({ ...formData, familyHistory: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white/50"
          >
            <option value="0">Sin antecedentes familiares</option>
            <option value="1">Un familiar afectado</option>
            <option value="2">Múltiples familiares afectados</option>
          </select>
        </div>

        <div className="form-group">
          <label className="flex items-center gap-2 text-blue-800 mb-2">
            <Dna className="w-5 h-5" />
            Estado del Marcador Genético
          </label>
          <select
            value={formData.geneticMarker}
            onChange={(e) => setFormData({ ...formData, geneticMarker: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white/50"
          >
            <option value="0">Negativo</option>
            <option value="1">Portador</option>
            <option value="2">Positivo</option>
          </select>
        </div>

        <div className="form-group">
          <label className="flex items-center gap-2 text-blue-800 mb-2">
            <Activity className="w-5 h-5" />
            Factores de Estilo de Vida
          </label>
          <select
            value={formData.lifestyle}
            onChange={(e) => setFormData({ ...formData, lifestyle: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition bg-white/50"
          >
            <option value="0">Estilo de vida saludable</option>
            <option value="1">Factores de riesgo moderados</option>
            <option value="2">Múltiples factores de riesgo</option>
          </select>
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