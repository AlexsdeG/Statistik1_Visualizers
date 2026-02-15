import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface BayesControlsProps {
  prevalence: number;
  sensitivity: number;
  specificity: number;
  onPrevalenceChange: (value: number) => void;
  onSensitivityChange: (value: number) => void;
  onSpecificityChange: (value: number) => void;
}

export const BayesControls: React.FC<BayesControlsProps> = ({
  prevalence,
  sensitivity,
  specificity,
  onPrevalenceChange,
  onSensitivityChange,
  onSpecificityChange,
}) => {
  const { t } = useLanguage();

  // Log Scale Logic for Prevalence
  // We want to map slider 0-100 to Prevalence 0.001 (0.1%) - 0.5 (50%)
  const MIN_PREV = 0.001;
  const LOG_BASE = 500; // 0.001 * 500 = 0.5

  const toSlider = (prev: number) => {
    // Inverse: x = 100 * log_base(prev / MIN)
    const ratio = Math.max(prev, MIN_PREV) / MIN_PREV;
    const val = (Math.log(ratio) / Math.log(LOG_BASE)) * 100;
    return Math.min(100, Math.max(0, val));
  };

  const fromSlider = (x: number) => {
    // prev = MIN * base^(x/100)
    return MIN_PREV * Math.pow(LOG_BASE, x / 100);
  };

  const handlePrevalenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onPrevalenceChange(fromSlider(val));
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-2">{t.config}</h2>

      <div className="space-y-8">
        {/* Prevalence */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <label htmlFor="prevalence-slider" className="block text-sm font-medium text-gray-700">
              {t.prevalence}
            </label>
            <span className="text-lg font-bold text-indigo-600">
              {(prevalence * 100).toFixed(2)}%
            </span>
          </div>
          <input
            id="prevalence-slider"
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={toSlider(prevalence)}
            onChange={handlePrevalenceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            data-testid="slider-prevalence"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1 font-mono">
            <span>0.1%</span>
            <span>{t.rare}</span>
            <span>{t.common}</span>
            <span>50%</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {t.prevHelp}
          </p>
        </div>

        {/* Sensitivity */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <label htmlFor="sensitivity-slider" className="block text-sm font-medium text-gray-700">
              {t.sensitivity}
            </label>
            <span className="text-lg font-bold text-indigo-600">
              {(sensitivity * 100).toFixed(1)}%
            </span>
          </div>
          <input
            id="sensitivity-slider"
            type="range"
            min="0.5"
            max="0.999"
            step="0.001"
            value={sensitivity}
            onChange={(e) => onSensitivityChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            data-testid="slider-sensitivity"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1 font-mono">
            <span>50%</span>
            <span>100%</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {t.sensHelp}
          </p>
        </div>

        {/* Specificity */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <label htmlFor="specificity-slider" className="block text-sm font-medium text-gray-700">
              {t.specificity}
            </label>
            <span className="text-lg font-bold text-indigo-600">
              {(specificity * 100).toFixed(1)}%
            </span>
          </div>
          <input
            id="specificity-slider"
            type="range"
            min="0.5"
            max="0.999"
            step="0.001"
            value={specificity}
            onChange={(e) => onSpecificityChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            data-testid="slider-specificity"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1 font-mono">
            <span>50%</span>
            <span>100%</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {t.specHelp}
          </p>
        </div>
      </div>
    </section>
  );
};
