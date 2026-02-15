import React from 'react';
import { cltLocales } from '../locales';

interface SimControlsProps {
  n: number;
  onNChange: (n: number) => void;
  onRun: (batchSize: number) => void;
  onReset: () => void;
  totalTrials: number;
  lang: 'en' | 'de';
}

export const SimControls: React.FC<SimControlsProps> = ({
  n,
  onNChange,
  onRun,
  onReset,
  totalTrials,
  lang
}) => {
  const t = cltLocales[lang].controls;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
       {/* Slider Section */}
       <div>
         <label htmlFor="n-slider" className="block text-sm font-medium text-gray-700 mb-2">
           {t.nLabel}: <span className="font-bold text-indigo-600">{n}</span>
         </label>
         <input
           id="n-slider"
           type="range"
           min={1}
           max={50}
           value={n}
           onChange={(e) => onNChange(Number(e.target.value))}
           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
         />
         {totalTrials > 0 && (
           <p className="text-xs text-amber-600 mt-1 flex items-center font-medium">
             ⚠️ {t.resetWarning}
           </p>
         )}
       </div>

       {/* Action Buttons */}
       <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
         <button
           onClick={() => onRun(1)}
           className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors font-medium text-sm border border-indigo-200"
         >
           {t.throw1}
         </button>
         <button
           onClick={() => onRun(100)}
           className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors font-medium text-sm border border-indigo-200"
         >
           {t.throw100}
         </button>
         <button
           onClick={() => onRun(1000)}
           className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium text-sm shadow-sm"
         >
           {t.throw1000}
         </button>
         <button
           onClick={onReset}
           disabled={totalTrials === 0}
           className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
         >
           {t.reset}
         </button>
       </div>
    </div>
  );
};