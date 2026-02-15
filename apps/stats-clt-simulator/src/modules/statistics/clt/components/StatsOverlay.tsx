import React, { useMemo } from 'react';
import { cltLocales } from '../locales';
import { getTheoreticalMean, getTheoreticalSigma } from '../utils/clt-utils';

interface StatsOverlayProps {
  counts: Record<number, number>;
  n: number;
  totalTrials: number;
  lang: 'en' | 'de';
}

export const StatsOverlay: React.FC<StatsOverlayProps> = ({ counts, n, totalTrials, lang }) => {
  const t = cltLocales[lang].stats;

  // Theoretical Values
  const theoMean = getTheoreticalMean(n);
  const theoSigma = getTheoreticalSigma(n);

  // Empirical Values
  const { empMean, empSigma } = useMemo(() => {
    if (totalTrials === 0) return { empMean: 0, empSigma: 0 };

    let sum = 0;
    let sumSq = 0;

    Object.entries(counts).forEach(([valStr, count]) => {
      const val = Number(valStr);
      sum += val * count;
      sumSq += val * val * count;
    });

    const mean = sum / totalTrials;
    const variance = (sumSq / totalTrials) - (mean * mean);
    const sigma = Math.sqrt(variance);

    return { empMean: mean, empSigma: sigma };
  }, [counts, totalTrials]);

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 text-sm">
      <h3 className="font-bold text-gray-700 mb-3 border-b pb-1">{t.comparison}</h3>
      
      <div className="grid grid-cols-3 gap-y-2 gap-x-4">
        <div className="text-gray-400 font-medium"></div>
        <div className="text-indigo-600 font-bold text-center">{t.empirical}</div>
        <div className="text-amber-600 font-bold text-center">{t.theoretical}</div>

        <div className="text-gray-600 font-medium">{t.mean}</div>
        <div className="font-mono text-center">{totalTrials > 0 ? empMean.toFixed(2) : '-'}</div>
        <div className="font-mono text-center">{theoMean.toFixed(2)}</div>

        <div className="text-gray-600 font-medium">{t.sigma}</div>
        <div className="font-mono text-center">{totalTrials > 0 ? empSigma.toFixed(2) : '-'}</div>
        <div className="font-mono text-center">{theoSigma.toFixed(2)}</div>
        
        <div className="text-gray-600 font-medium mt-1">{t.trials}</div>
        <div className="font-mono text-center font-bold mt-1 text-gray-900 col-span-2">{totalTrials}</div>
      </div>
    </div>
  );
};