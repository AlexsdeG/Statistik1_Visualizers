import React, { useState } from 'react';
import { useLorenzMath } from './hooks/useLorenzMath';
import { IncomeSliders } from './components/IncomeSliders';
import { SortedBars } from './components/SortedBars';
import { LorenzPlot } from './components/LorenzPlot';
import { getGiniInterpretation } from './constants';
import { useTranslation } from '../../i18n/context';

export const LorenzView: React.FC = () => {
  // Phase 2 & 3: Input, Sorting & Visualization
  // Phase 4: Integration & Presets
  // Phase 5: Interpretation & Polish
  const [incomes, setIncomes] = useState<number[]>([10, 80, 20, 100, 40]);
  const maxWealth = 200; // Arbitrary max for visualization scaling
  
  const { gini, lorenzPoints } = useLorenzMath(incomes);
  const interpretation = getGiniInterpretation(gini);
  const { t } = useTranslation();

  const handleIncomeChange = (index: number, val: number) => {
    const newIncomes = [...incomes];
    newIncomes[index] = val;
    setIncomes(newIncomes);
  };

  const applyPreset = (type: 'equality' | 'pareto' | 'extreme') => {
    switch (type) {
      case 'equality':
        // Everyone has equal share (200 / 5 = 40)
        setIncomes([40, 40, 40, 40, 40]);
        break;
      case 'pareto':
        // 80/20 Rule approximation for 5 people
        // 1 person (20% of pop) holds 80% of wealth (160)
        // 4 people share remaining 20% (40 -> 10 each)
        setIncomes([10, 10, 10, 10, 160]);
        break;
      case 'extreme':
        // One person has everything
        setIncomes([0, 0, 0, 0, 200]);
        break;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        {/* Header Section with Title, Presets, and Gini Score */}
        <div className="mb-6 border-b border-gray-100 pb-6 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{t('lorenz.title')}</h2>
            <p className="text-gray-500 mt-1">
              {t('lorenz.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Presets Toolbar */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => applyPreset('equality')} 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  title={t('lorenz.presets.desc.equality')}
                >
                    {t('lorenz.presets.equality')}
                </button>
                <button 
                  onClick={() => applyPreset('pareto')} 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  title={t('lorenz.presets.desc.pareto')}
                >
                    {t('lorenz.presets.pareto')}
                </button>
                <button 
                  onClick={() => applyPreset('extreme')} 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  title={t('lorenz.presets.desc.extreme')}
                >
                    {t('lorenz.presets.extreme')}
                </button>
            </div>

            {/* Gini Score Display with Dynamic Interpretation */}
            <div className={`flex flex-col justify-center px-5 py-2 rounded-lg border shadow-sm min-w-[180px] ${interpretation.bg} ${interpretation.border}`}>
              <div className="flex items-center justify-between gap-3">
                 <span className={`text-xs font-bold uppercase tracking-wide ${interpretation.color}`}>
                    {t('lorenz.gini.label')}
                 </span>
                 <span className={`text-3xl font-bold tabular-nums leading-none ${interpretation.color}`}>
                    {gini.toFixed(2)}
                 </span>
              </div>
              <div className={`text-xs font-medium text-right mt-1 opacity-90 ${interpretation.color}`}>
                  {t(interpretation.labelKey)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input & Sorting (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <IncomeSliders 
              incomes={incomes} 
              onChange={handleIncomeChange} 
              max={maxWealth}
            />
            <SortedBars 
              incomes={incomes} 
              max={maxWealth}
            />
          </div>

          {/* Right Column: Visualization (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">{t('lorenz.chart.title')}</h3>
              <div className="text-xs text-gray-400 font-mono">
                {t('lorenz.chart.subtitle', { area: (gini / 2).toFixed(3) })}
              </div>
            </div>
            
            {/* The Plot */}
            <LorenzPlot lorenzPoints={lorenzPoints} gini={gini} />
            
            <div className="mt-4 p-4 bg-gray-50 rounded text-sm text-gray-600 leading-relaxed border border-gray-100">
              <p>
                {t('lorenz.explanation.intro')}
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 ml-1 mb-4">
                <li><strong className="text-gray-800">{t('lorenz.explanation.diagonal')}</strong></li>
                <li><strong className="text-red-500">{t('lorenz.explanation.red_area')}</strong></li>
                <li><strong className="text-indigo-600">{t('lorenz.explanation.gini_formula')}</strong></li>
              </ul>
              
              <div className="pt-3 border-t border-gray-200 text-xs text-gray-500 italic">
                  {t('lorenz.math_note')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};