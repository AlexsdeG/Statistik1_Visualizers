import React from 'react';
import { CLTView } from './src/modules/statistics/clt/CLTView';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <CLTView />
    </div>
  );
};

export default App;