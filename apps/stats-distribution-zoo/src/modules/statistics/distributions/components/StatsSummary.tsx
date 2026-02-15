import React from 'react';
import { BaseStats, Domain } from '../types';
import { useTranslation } from '../../../../i18n/translations';

interface Props {
  stats: BaseStats;
  domain: Domain;
}

export const StatsSummary: React.FC<Props> = ({ stats, domain }) => {
  const { t } = useTranslation();

  const formatStat = (val: number | string) => {
    return typeof val === 'number' ? val.toFixed(4) : val;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-4">
      <h3 className="text-sm font-bold text-gray-700 uppercase mb-3">{t('statistics')}</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
           <span className="text-xs text-gray-500 uppercase">E(X) / μ</span>
           <span className="font-mono font-bold text-blue-800">{formatStat(stats.mean)}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
           <span className="text-xs text-gray-500 uppercase">Var(X) / σ²</span>
           <span className="font-mono font-bold text-blue-800">{formatStat(stats.variance)}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
           <span className="text-xs text-gray-500 uppercase">σ (Std Dev)</span>
           <span className="font-mono font-bold text-blue-800">{formatStat(stats.stdDev)}</span>
        </div>
        <div className="flex justify-between items-center pt-1">
           <span className="text-xs text-gray-500 uppercase">Domain</span>
           <span className="font-mono text-xs">[{domain.min.toFixed(1)}, {domain.max.toFixed(1)}]</span>
        </div>
      </div>
    </div>
  );
};