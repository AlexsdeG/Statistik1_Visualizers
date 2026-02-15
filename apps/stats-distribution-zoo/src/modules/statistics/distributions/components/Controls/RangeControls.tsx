import React from 'react';
import { useTranslation } from '../../../../../i18n/translations';

interface Props {
  rangeStart: number;
  rangeEnd: number;
  domainMin: number;
  domainMax: number;
  isDiscrete: boolean;
  onChange: (start: number, end: number) => void;
  probabilitySum: number;
}

export const RangeControls: React.FC<Props> = ({ 
  rangeStart, 
  rangeEnd, 
  domainMin, 
  domainMax,
  isDiscrete, 
  onChange, 
  probabilitySum 
}) => {
  const { t } = useTranslation();
  
  const step = isDiscrete ? 1 : 0.1;

  // Handler to ensure start <= end
  const handleStartChange = (val: number) => {
    // If start > end, push end
    if (val > rangeEnd) {
      onChange(val, val);
    } else {
      onChange(val, rangeEnd);
    }
  };

  const handleEndChange = (val: number) => {
    // If end < start, push start
    if (val < rangeStart) {
      onChange(val, val);
    } else {
      onChange(rangeStart, val);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-4">
      <h3 className="text-sm font-bold text-gray-700 uppercase mb-3">{t('range')}</h3>
      
      <div className="flex gap-4 items-center mb-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 mb-1">{t('min')}</label>
          <input 
            type="number" 
            value={rangeStart}
            step={step}
            // Use domain limits roughly, but allow flexibility
            min={Math.floor(domainMin)}
            max={Math.ceil(domainMax)}
            onChange={(e) => handleStartChange(Number(e.target.value))}
            className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="text-gray-400">→</div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 mb-1">{t('max')}</label>
          <input 
            type="number" 
            value={rangeEnd}
            step={step}
            min={Math.floor(domainMin)}
            max={Math.ceil(domainMax)}
            onChange={(e) => handleEndChange(Number(e.target.value))}
            className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-blue-600 text-white p-3 rounded shadow-sm flex justify-between items-center">
        <span className="text-sm font-medium">{t('probabilitySum')}:</span>
        <span className="text-lg font-bold font-mono">
          {probabilitySum >= 0 && probabilitySum <= 1.0001 
            ? (probabilitySum * 100).toFixed(2) + '%' 
            : 'Error'}
        </span>
      </div>
      <div className="text-xs text-gray-500 text-right mt-1 font-mono">
        P({rangeStart} ≤ X ≤ {rangeEnd}) = {probabilitySum.toFixed(5)}
      </div>
    </div>
  );
};
