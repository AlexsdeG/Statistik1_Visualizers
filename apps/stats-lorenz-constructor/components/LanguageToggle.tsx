import React from 'react';
import { useTranslation } from '../modules/i18n/context';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="bg-gray-100 p-1 rounded-lg inline-flex shadow-inner">
      <button
        onClick={() => setLanguage('de')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
          language === 'de'
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        DE
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
          language === 'en'
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        EN
      </button>
    </div>
  );
};