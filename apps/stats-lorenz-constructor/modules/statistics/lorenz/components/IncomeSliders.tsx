import React from 'react';
import { useTranslation } from '../../../i18n/context';

interface IncomeSlidersProps {
  incomes: number[];
  onChange: (index: number, value: number) => void;
  max?: number;
}

export const IncomeSliders: React.FC<IncomeSlidersProps> = ({ incomes, onChange, max = 100 }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{t('inputs.title')}</h3>
        <span className="text-xs text-gray-400 font-mono">{t('inputs.subtitle')}</span>
      </div>
      
      <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-end justify-between gap-2 sm:gap-4 relative z-0">
        
        {/* Background Grid Lines for Visual Reference */}
        <div className="absolute inset-0 z-[-1] pointer-events-none p-4 pb-0 flex flex-col justify-end">
             {/* 75% Line */}
             <div className="absolute left-0 right-0 border-t border-dashed border-gray-100" style={{ bottom: '75%' }}></div>
             {/* 50% Line */}
             <div className="absolute left-0 right-0 border-t border-dashed border-gray-100" style={{ bottom: '50%' }}></div>
             {/* 25% Line */}
             <div className="absolute left-0 right-0 border-t border-dashed border-gray-100" style={{ bottom: '25%' }}></div>
        </div>

        {incomes.map((value, index) => (
          <div key={index} className="relative flex flex-col items-center w-full h-64 group">
            
            {/* Value Label */}
            <div className="mb-2 text-sm font-bold text-gray-900 font-mono tabular-nums">
                {value}
            </div>

            {/* Slider Track / Bar Container */}
            <div className="relative w-full flex-1 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group-hover:border-indigo-300 transition-colors">
              {/* Filled Bar */}
              <div 
                className="absolute bottom-0 left-0 w-full bg-indigo-500 transition-all duration-75 ease-out"
                style={{ height: `${Math.min(100, (value / max) * 100)}%` }}
              />
              
              {/* Rotated Range Input for Vertical Dragging */}
              {/* Container height is h-64 (approx 16rem = 256px). 
                  We size the input to be roughly this width and rotate it. */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <input
                  type="range"
                  min={0}
                  max={max}
                  value={value}
                  onChange={(e) => onChange(index, parseInt(e.target.value, 10))}
                  className="appearance-none bg-transparent cursor-pointer opacity-0 w-64 h-12"
                  style={{ transform: 'rotate(-90deg)' }}
                  aria-label={`Income for citizen ${index + 1}`}
                />
              </div>
            </div>
            
             {/* ID Label */}
             <div className="mt-2 text-xs text-gray-400 font-medium select-none">
              #{index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};