import React from 'react';
import { BayesView } from './modules/statistics/views/BayesView';
import { LanguageProvider } from './context/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BayesView />
    </LanguageProvider>
  );
};

export default App;
