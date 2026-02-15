import React from 'react';
import { useTranslation } from 'react-i18next';

interface CorrelationInfoProps {
  className?: string;
}

export const CorrelationInfo: React.FC<CorrelationInfoProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={`bg-blue-50 border border-blue-100 rounded-xl p-6 ${className || ''}`}>
      <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        {t('correlation.info.title')}
      </h3>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-blue-900 leading-relaxed">
          {t('correlation.info.description')}
        </p>
        
        {/* Visual Scale */}
        <div className="relative pt-8 pb-4 px-4 mt-2 bg-white rounded-lg shadow-sm border border-blue-100">
          {/* Bar */}
          <div className="h-3 w-full rounded-full bg-gradient-to-r from-red-500 via-gray-300 to-green-500 shadow-inner"></div>
          
          {/* Markers */}
          <div className="absolute top-2 left-4 -ml-2 text-center w-4">
            <div className="text-xs font-bold text-red-600">-1</div>
            <div className="w-0.5 h-6 bg-red-400 mx-auto mt-1 opacity-50"></div>
          </div>
          <div className="absolute top-2 left-1/2 -ml-2 text-center w-4">
             <div className="text-xs font-bold text-gray-500">0</div>
             <div className="w-0.5 h-6 bg-gray-400 mx-auto mt-1 opacity-50"></div>
          </div>
           <div className="absolute top-2 right-4 -mr-2 text-center w-4">
            <div className="text-xs font-bold text-green-600">+1</div>
            <div className="w-0.5 h-6 bg-green-400 mx-auto mt-1 opacity-50"></div>
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-3 text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-tight">
             <span className="w-1/3 text-left">{t('correlation.info.neg_perfect')}</span>
             <span className="w-1/3 text-center">{t('correlation.info.no_corr')}</span>
             <span className="w-1/3 text-right">{t('correlation.info.pos_perfect')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};