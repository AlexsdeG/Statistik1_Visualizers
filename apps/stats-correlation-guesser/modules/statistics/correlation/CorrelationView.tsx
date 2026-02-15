import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GameBoard } from './components/GameBoard';
import { SandboxBoard } from './components/SandboxBoard';
import { CorrelationInfo } from './components/CorrelationInfo';

type Tab = 'game' | 'sandbox';

export const CorrelationView: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('game');
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] border border-gray-100 flex flex-col">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button
            onClick={() => setActiveTab('game')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all relative outline-none focus:bg-indigo-50/50 ${
              activeTab === 'game' 
                ? 'text-indigo-600 bg-white shadow-[0_-1px_4px_rgba(0,0,0,0.02)]' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('correlation.game_mode')}
            {activeTab === 'game' && (
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600 rounded-b-sm"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all relative outline-none focus:bg-indigo-50/50 ${
              activeTab === 'sandbox' 
                ? 'text-indigo-600 bg-white shadow-[0_-1px_4px_rgba(0,0,0,0.02)]' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('correlation.sandbox_mode')}
            {activeTab === 'sandbox' && (
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600 rounded-b-sm"></div>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white p-2 md:p-6">
          {activeTab === 'game' ? <GameBoard /> : <SandboxBoard />}
        </div>
        
        {/* Guide Toggle Section */}
        <div className="bg-gray-50 border-t border-gray-100 p-4">
           <button 
             onClick={() => setShowInfo(!showInfo)}
             className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors mx-auto"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${showInfo ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
             </svg>
             {showInfo ? t('correlation.info.toggle_hide') : t('correlation.info.toggle_show')}
           </button>
           
           {showInfo && (
             <div className="mt-4 animate-fade-in">
               <CorrelationInfo />
             </div>
           )}
        </div>
      </div>
    </div>
  );
};