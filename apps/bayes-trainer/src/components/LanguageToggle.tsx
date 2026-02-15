import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center p-1 rounded-lg bg-gray-100 border border-gray-200 shadow-inner">
      <button
        onClick={() => setLanguage('de')}
        className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all duration-200 ${
          language === 'de'
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700 bg-transparent'
        }`}
        aria-label="Deutsch"
      >
        DE
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all duration-200 ${
          language === 'en'
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700 bg-transparent'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};
