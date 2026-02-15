import React from 'react';
import { useTranslation } from 'react-i18next';
import { RegressionResult } from '../hooks/useRegression';

interface StatsPanelProps {
  stats: RegressionResult;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const { t } = useTranslation();
  const { r, m, b, isValid } = stats;

  if (!isValid) {
    return (
      <div className="bg-gray-100 rounded-xl p-6 text-center text-gray-500 italic">
        {t('correlation.click_hint')}
      </div>
    );
  }

  // Color coding for correlation strength
  const getRColor = (val: number) => {
    const abs = Math.abs(val);
    if (abs > 0.8) return 'text-green-600';
    if (abs > 0.5) return 'text-blue-600';
    if (abs > 0.2) return 'text-yellow-600';
    return 'text-gray-500';
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-4 shadow-inner border border-gray-100">
      <div className="text-center">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">{t('correlation.r_value')}</h3>
        <div className={`text-4xl font-mono font-bold ${getRColor(r)}`}>
          {r.toFixed(3)}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">{t('correlation.equation')}</h3>
        <div className="font-mono text-lg text-gray-700 bg-white p-2 rounded border border-gray-200 text-center">
          y = {m.toFixed(2)}x {b >= 0 ? '+' : '-'} {Math.abs(b).toFixed(2)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white p-2 rounded shadow-sm">
          <span className="text-gray-500 block text-xs">{t('correlation.slope')}</span>
          <span className="font-mono font-medium">{m.toFixed(3)}</span>
        </div>
        <div className="bg-white p-2 rounded shadow-sm">
          <span className="text-gray-500 block text-xs">{t('correlation.intercept')}</span>
          <span className="font-mono font-medium">{b.toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
};