import React from 'react';
import { useTranslation } from 'react-i18next';
import { CorrelationView } from './modules/statistics/correlation/CorrelationView';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              r
            </div>
            <h1 className="text-xl font-bold text-gray-800">{t('app.title')}</h1>
          </div>
          
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => changeLanguage('de')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                i18n.language === 'de' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              DE
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                i18n.language === 'en' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto mt-8 px-4 pb-12">
        <CorrelationView />
      </main>
    </div>
  );
};

export default App;