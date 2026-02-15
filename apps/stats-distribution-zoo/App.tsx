import React from 'react';
import { DistributionView } from './src/modules/statistics/distributions/DistributionView';
import { useTranslation } from './src/i18n/translations';

/**
 * Main Application Wrapper
 * Integrates the Distribution View from the Statistics Module.
 */
function App() {
  const { t, language, setLanguage } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{t('appTitle')}</h1>
            <p className="text-gray-600 mt-2">{t('appDescription')}</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="bg-gray-200 p-1 rounded-lg inline-flex">
                <button
                  onClick={() => setLanguage('de')}
                  className={`px-3 py-1 rounded-md text-sm font-bold transition-all ${
                    language === 'de' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  DE
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-md text-sm font-bold transition-all ${
                    language === 'en' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  EN
                </button>
             </div>
             <div className="hidden md:inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded font-semibold tracking-wide">
              v0.0.5
             </div>
          </div>
        </header>

        <main>
          <DistributionView />
        </main>
        
        <footer className="mt-12 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Stats Distribution Zoo
        </footer>
      </div>
    </div>
  );
}

export default App;
