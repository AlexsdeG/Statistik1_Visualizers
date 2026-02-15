import React from 'react';
import { LorenzView } from './modules/statistics/lorenz/LorenzView';
import { LanguageProvider, useTranslation } from './modules/i18n/context';
import { LanguageToggle } from './components/LanguageToggle';

const AppContent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 py-4 px-6 mb-8 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-indigo-600">{t('app.title')}</h1>
          <LanguageToggle />
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 pb-12">
        <LorenzView />
      </main>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;