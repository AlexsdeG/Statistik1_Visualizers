import React, { useState, useMemo } from 'react';
import { useDistributionData } from './hooks/useDistributionData';
import { DistributionType, AnyDistributionParams } from './types';
import { ParameterControls } from './components/Controls/ParameterControls';
import { RangeControls } from './components/Controls/RangeControls';
import { DistributionPlot } from './components/DistributionPlot';
import { StatsSummary } from './components/StatsSummary';
import { DistributionInfo } from './components/DistributionInfo';
import { normalCDF, continuousUniformCDF, exponentialCDF, cauchyCDF, integrate } from '../../../lib/distribution-math';
import { useTranslation } from '../../../i18n/translations';

export const DistributionView: React.FC = () => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<DistributionType>('binomial');
  const [params, setParams] = useState<AnyDistributionParams>({ n: 10, p: 0.5 });
  
  // Range State
  const [range, setRange] = useState<{ min: number; max: number }>({ min: 4, max: 6 });
  const [isRangeMode, setIsRangeMode] = useState(true);
  const [showApproximation, setShowApproximation] = useState(false);

  const handleTypeChange = (newType: DistributionType) => {
    setSelectedType(newType);
    setShowApproximation(false);
    
    // Default params per type
    switch (newType) {
      case 'binomial': setParams({ n: 10, p: 0.5 }); setRange({ min: 4, max: 6 }); break;
      case 'poisson': setParams({ lambda: 5 }); setRange({ min: 4, max: 6 }); break;
      case 'geometric': setParams({ p: 0.5 }); setRange({ min: 1, max: 3 }); break;
      case 'hypergeometric': setParams({ N: 20, M: 10, n: 5 }); setRange({ min: 2, max: 4 }); break;
      case 'negative_binomial': setParams({ r: 3, p: 0.5 }); setRange({ min: 4, max: 8 }); break;
      case 'discrete_uniform': setParams({ min: 1, max: 6 }); setRange({ min: 2, max: 4 }); break;
      
      case 'normal': setParams({ mu: 0, sigma: 1 }); setRange({ min: -1, max: 1 }); break;
      case 'continuous_uniform': setParams({ a: 0, b: 10 }); setRange({ min: 2, max: 5 }); break;
      case 'exponential': setParams({ lambda: 1 }); setRange({ min: 0, max: 1 }); break;
      case 'gamma': setParams({ a: 2, b: 1 }); setRange({ min: 0, max: 4 }); break;
      case 'inverse_gamma': setParams({ a: 3, b: 1 }); setRange({ min: 0, max: 1 }); break;
      case 'beta': setParams({ a: 2, b: 2 }); setRange({ min: 0.2, max: 0.8 }); break;
      case 'cauchy': setParams({ loc: 0, scale: 1 }); setRange({ min: -1, max: 1 }); break;
    }
  };

  const distData = useDistributionData(selectedType, params);
  const { isDiscrete, data, stats, domain } = distData;

  // Probability Sum Calculation
  const probabilitySum = useMemo(() => {
    if (!isRangeMode) return 0;

    // Discrete Sum
    if (isDiscrete && data) {
      let sum = 0;
      data.forEach(point => {
        if (point.x >= range.min && point.x <= range.max) {
          sum += point.y;
        }
      });
      return Math.min(sum, 1);
    } 
    
    // Continuous Integration / CDF
    else if (!isDiscrete && distData.pdfFunc) {
      // Use closed form CDFs where available
      if (selectedType === 'normal') {
        const { mu, sigma } = params as any;
        return normalCDF(range.max, mu, sigma) - normalCDF(range.min, mu, sigma);
      }
      if (selectedType === 'continuous_uniform') {
        const { a, b } = params as any;
        return continuousUniformCDF(range.max, a, b) - continuousUniformCDF(range.min, a, b);
      }
      if (selectedType === 'exponential') {
        const { lambda } = params as any;
        return exponentialCDF(range.max, lambda) - exponentialCDF(range.min, lambda);
      }
      if (selectedType === 'cauchy') {
        const { loc, scale } = params as any;
        return cauchyCDF(range.max, loc, scale) - cauchyCDF(range.min, loc, scale);
      }

      // For Gamma, Beta, InvGamma - Use Numerical Integration
      // Range check to avoid unnecessary computation if range is outside domain
      const start = Math.max(range.min, domain.min);
      const end = Math.min(range.max, domain.max);
      
      if (start >= end) return 0;

      // Integration with 100 steps is usually enough for visual "Probability P" display
      return integrate(distData.pdfFunc, start, end, 200);
    }
    return 0;
  }, [isDiscrete, data, range, selectedType, params, isRangeMode, distData.pdfFunc, domain]);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 bg-gray-50 rounded-xl min-h-[600px]">
      
      <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar: Controls & Stats */}
          <div className="w-full lg:w-1/3 space-y-4">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">{t('controls')}</h2>
                
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">{t('distributionType')}</label>
                  <select 
                    value={selectedType} 
                    onChange={(e) => handleTypeChange(e.target.value as DistributionType)}
                    className="w-full border-gray-300 rounded-md shadow-sm border p-2 bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <optgroup label="Discrete">
                        <option value="binomial">{t('dist_binomial')}</option>
                        <option value="poisson">{t('dist_poisson')}</option>
                        <option value="geometric">{t('dist_geometric')}</option>
                        <option value="hypergeometric">{t('dist_hypergeometric')}</option>
                        <option value="negative_binomial">{t('dist_negative_binomial')}</option>
                        <option value="discrete_uniform">{t('dist_discrete_uniform')}</option>
                    </optgroup>
                    <optgroup label="Continuous">
                        <option value="normal">{t('dist_normal')}</option>
                        <option value="continuous_uniform">{t('dist_continuous_uniform')}</option>
                        <option value="exponential">{t('dist_exponential')}</option>
                        <option value="gamma">{t('dist_gamma')}</option>
                        <option value="inverse_gamma">{t('dist_inverse_gamma')}</option>
                        <option value="beta">{t('dist_beta')}</option>
                        <option value="cauchy">{t('dist_cauchy')}</option>
                    </optgroup>
                  </select>
                </div>

                <ParameterControls 
                  type={selectedType} 
                  params={params} 
                  onChange={setParams} 
                />

                <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col gap-2">
                  {selectedType === 'binomial' && (
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                          type="checkbox" 
                          checked={showApproximation} 
                          onChange={(e) => setShowApproximation(e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500" 
                      />
                      <span className="text-sm text-gray-600">{t('showApproximation')}</span>
                    </label>
                  )}
                  
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={isRangeMode} 
                        onChange={(e) => setIsRangeMode(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-sm text-gray-600">{t('calculateRange')}</span>
                  </label>
                </div>
            </div>

            {isRangeMode && (
              <RangeControls 
                  rangeStart={range.min}
                  rangeEnd={range.max}
                  domainMin={domain.min}
                  domainMax={domain.max}
                  isDiscrete={isDiscrete}
                  onChange={(min, max) => setRange({ min, max })}
                  probabilitySum={probabilitySum}
              />
            )}

            <StatsSummary stats={stats} domain={domain} />
          </div>

          {/* Main: Visualization */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-1 rounded-lg shadow-md border border-gray-200 h-full min-h-[500px] flex flex-col">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Visualization</h2>
                    <div className="text-xs text-gray-400">Auto-scaled</div>
                </div>
                <div className="flex-1 p-4 flex items-center justify-center bg-gray-50/50">
                  <div className="w-full h-full">
                    <DistributionPlot 
                      data={distData}
                      range={range}
                      showApproximation={showApproximation}
                      isRangeMode={isRangeMode}
                    />
                  </div>
                </div>
            </div>
          </div>
      </div>
      
      {/* Educational Info Section */}
      <div className="w-full">
         <DistributionInfo type={selectedType} />
      </div>

    </div>
  );
};
