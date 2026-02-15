import React, { useState } from 'react';
import { useBayesLogic } from '../hooks/useBayesLogic';
import { BayesControls } from '../components/BayesControls';
import { UnitSquare } from '../components/UnitSquare';
import { PopulationGrid } from '../components/PopulationGrid';
import { ResultSummary } from '../components/ResultSummary';
import { useLanguage } from '@/context/LanguageContext';
import { useDebounce } from '@/hooks/useDebounce';
import { LanguageToggle } from '@/components/LanguageToggle';

export const BayesView: React.FC = () => {
  const [prevalence, setPrevalence] = useState(0.01);
  const [sensitivity, setSensitivity] = useState(0.90);
  const [specificity, setSpecificity] = useState(0.90);
  const [viewMode, setViewMode] = useState<'square' | 'grid'>('grid');

  // Highlighting state for interaction between Grid and Stats
  const [highlightedCategory, setHighlightedCategory] = useState<'tp' | 'fn' | 'fp' | 'tn' | null>(null);

  const { t } = useLanguage();
  const populationSize = 1000;

  // Immediate results for controls, text summary, and Unit Square (responsive)
  const results = useBayesLogic({
    prevalence,
    sensitivity,
    specificity,
    populationSize,
  });

  // Debounced results for the expensive Population Grid visualization
  const debouncedResults = useDebounce(results, 150);

  // Low Prevalence Warning Threshold (0.1%)
  const isLowPrevalence = prevalence < 0.001;

  const getStatClass = (category: string) => {
    const base = "flex flex-col p-2 rounded transition-all duration-200";
    if (!highlightedCategory) return base;
    if (highlightedCategory === category) {
      return `${base} bg-indigo-50 ring-2 ring-indigo-400 transform scale-105 shadow-sm`;
    }
    return `${base} opacity-40 grayscale`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
      <header className="mb-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <div className="text-sm font-medium text-gray-500 hidden md:block">{t.phase}</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Column: Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <BayesControls
            prevalence={prevalence}
            sensitivity={sensitivity}
            specificity={specificity}
            onPrevalenceChange={setPrevalence}
            onSensitivityChange={setSensitivity}
            onSpecificityChange={setSpecificity}
          />

          {/* Simple Legend/Stats Mini-View */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-sm">
            <h3 className="font-semibold text-gray-700 mb-2">{t.stats}</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className={getStatClass('tp')}>
                <span className="text-gray-500 text-xs">{t.tp}</span>
                <span className="font-mono font-bold text-red-600 text-lg">{results.tp}</span>
              </div>
              <div className={getStatClass('fp')}>
                <span className="text-gray-500 text-xs">{t.fp}</span>
                <span className="font-mono font-bold text-teal-600 text-lg">{results.fp}</span>
              </div>
              <div className={getStatClass('fn')}>
                <span className="text-gray-500 text-xs">{t.fn}</span>
                <span className="font-mono text-red-400 text-lg">{results.fn}</span>
              </div>
              <div className={getStatClass('tn')}>
                <span className="text-gray-500 text-xs">{t.tn}</span>
                <span className="font-mono text-teal-400 text-lg">{results.tn}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visualization & Narrative (8 cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Visualization Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 border-b border-gray-200 p-2 flex justify-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 md:px-4 py-2 rounded text-sm font-medium transition-colors ${viewMode === 'grid' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {t.viewGrid}
              </button>
              <button
                onClick={() => setViewMode('square')}
                className={`px-3 md:px-4 py-2 rounded text-sm font-medium transition-colors ${viewMode === 'square' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {t.viewSquare}
              </button>
            </div>

            <div className="p-4 md:p-6 flex flex-col items-center bg-gray-50 min-h-[400px]">
              {viewMode === 'square' && (
                <div className="w-full max-w-md aspect-square">
                  <UnitSquare
                    prevalence={prevalence}
                    sensitivity={sensitivity}
                    specificity={specificity}
                  />
                </div>
              )}
              {viewMode === 'grid' && (
                <div className="relative w-full max-w-md">
                  {isLowPrevalence && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                      <div className="bg-white/90 border border-amber-200 text-amber-800 p-4 rounded-lg shadow-lg text-center backdrop-blur-sm">
                        <p className="font-semibold text-lg mb-2">⚠️ {t.note}</p>
                        <p>{t.lowPrevalenceWarning}</p>
                        <button
                          className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
                          onClick={() => setViewMode('square')}
                        >
                          {t.viewSquare}
                        </button>
                      </div>
                    </div>
                  )}
                  <PopulationGrid
                    tp={debouncedResults.tp}
                    fn={debouncedResults.fn}
                    fp={debouncedResults.fp}
                    tn={debouncedResults.tn}
                    onHover={setHighlightedCategory}
                    isLowPrevalence={isLowPrevalence}
                  />
                </div>
              )}

              <div className="mt-6 text-center text-sm text-gray-500 max-w-lg">
                {viewMode === 'grid' ? (
                  <div className="flex flex-wrap justify-center gap-4">
                    <span className={`flex items-center transition-opacity ${highlightedCategory && highlightedCategory !== 'tp' ? 'opacity-30' : ''}`}><span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span> {t.sickFound}</span>
                    <span className={`flex items-center transition-opacity ${highlightedCategory && highlightedCategory !== 'fn' ? 'opacity-30' : ''}`}><span className="w-2 h-2 rounded-full border border-red-500 mr-1"></span> {t.sickMissed}</span>
                    <span className={`flex items-center transition-opacity ${highlightedCategory && highlightedCategory !== 'fp' ? 'opacity-30' : ''}`}><span className="w-2 h-2 rounded-full bg-teal-500 border border-red-500 mr-1"></span> {t.healthyAlarm}</span>
                    <span className={`flex items-center transition-opacity ${highlightedCategory && highlightedCategory !== 'tn' ? 'opacity-30' : ''}`}><span className="w-2 h-2 rounded-full border border-teal-400 mr-1"></span> {t.healthy}</span>
                  </div>
                ) : (
                  <p>{t.squareHelp}</p>
                )}
              </div>
            </div>
          </div>

          {/* Narrative Summary */}
          <ResultSummary results={results} />

        </div>
      </main>
    </div>
  );
};
