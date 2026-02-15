import React, { useState, useEffect } from 'react';
import { useCLTSimulation } from './hooks/useCLTSimulation';
import { SimControls } from './components/SimControls';
import { Histogram } from './components/Histogram';
import { StatsOverlay } from './components/StatsOverlay';
import { cltLocales } from './locales';

const LANG_KEY = 'clt_simulator_lang';

export const CLTView: React.FC = () => {
  const { n, counts, totalTrials, runSimulation, setN, reset } = useCLTSimulation();
  
  // Lazy initialization from localStorage
  const [lang, setLang] = useState<'de' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANG_KEY);
      return (saved === 'en' || saved === 'de') ? saved : 'de';
    }
    return 'de';
  });

  // Persist language change
  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const t = cltLocales[lang];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 font-sans text-gray-900">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-indigo-700">{t.title}</h1>
            <p className="text-sm text-gray-500 mt-1">stats-clt-simulator v0.0.5</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
                onClick={() => setLang('de')} 
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${lang === 'de' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                DE
            </button>
            <button 
                onClick={() => setLang('en')} 
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${lang === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                EN
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Controls & Stats (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
            <SimControls
              n={n}
              onNChange={setN}
              onRun={runSimulation}
              onReset={reset}
              totalTrials={totalTrials}
              lang={lang}
            />
            
            <StatsOverlay 
              counts={counts}
              n={n}
              totalTrials={totalTrials}
              lang={lang}
            />
        </div>

        {/* Right Column: Visualization (8 columns) */}
        <div className="lg:col-span-8 space-y-4">
            {/* Educational Tip Banner */}
             <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-md shadow-sm">
                <div className="flex">
                    <div className="flex-shrink-0">
                        {/* Info Icon */}
                        <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-indigo-800 font-medium">
                            {t.tips.intro}
                        </p>
                    </div>
                </div>
             </div>

             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <Histogram 
                  counts={counts}
                  n={n}
                  totalTrials={totalTrials}
                />
             </div>
        </div>
      </div>
    </div>
  );
};