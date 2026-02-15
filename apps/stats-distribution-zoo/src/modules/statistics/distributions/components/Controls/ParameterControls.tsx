import React from 'react';
import { DistributionType, AnyDistributionParams, BinomialParams, PoissonParams, GeometricParams, HypergeometricParams, NormalParams, ContinuousUniformParams, ExponentialParams, GammaParams, InverseGammaParams, BetaParams, CauchyParams, DiscreteUniformParams, NegativeBinomialParams } from '../../types';
import { useTranslation } from '../../../../../i18n/translations';

interface Props {
  type: DistributionType;
  params: AnyDistributionParams;
  onChange: (params: AnyDistributionParams) => void;
}

export const ParameterControls: React.FC<Props> = ({ type, params, onChange }) => {
  const { t } = useTranslation();
  
  const renderSlider = (
    labelKey: string, 
    value: number, 
    min: number, 
    max: number, 
    step: number, 
    onValChange: (val: number) => void
  ) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <label className="text-sm font-medium text-gray-700">{t(labelKey)}</label>
        <span className="text-sm font-mono text-gray-600">{value % 1 !== 0 ? value.toFixed(2) : value}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onValChange(Number(e.target.value))} 
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );

  switch (type) {
    case 'binomial': {
      const p = params as BinomialParams;
      return (
        <div>
          {renderSlider('params_n', p.n, 1, 100, 1, (val) => onChange({ ...p, n: val }))}
          {renderSlider('params_p', p.p, 0, 1, 0.01, (val) => onChange({ ...p, p: val }))}
        </div>
      );
    }
    case 'poisson': {
      const p = params as PoissonParams;
      return (
        <div>
           {renderSlider('params_lambda', p.lambda, 0.1, 20, 0.1, (val) => onChange({ ...p, lambda: val }))}
        </div>
      );
    }
    case 'geometric': {
      const p = params as GeometricParams;
      return (
        <div>
           {renderSlider('params_p', p.p, 0.01, 1, 0.01, (val) => onChange({ ...p, p: val }))}
        </div>
      );
    }
    case 'hypergeometric': {
      const p = params as HypergeometricParams;
      
      const updateN = (val: number) => {
        const newN = Math.max(1, val);
        onChange({ 
          ...p, 
          N: newN, 
          M: Math.min(p.M, newN), 
          n: Math.min(p.n, newN)
        });
      };

      const updateM = (val: number) => {
        const newM = Math.max(0, Math.min(val, p.N));
        onChange({ ...p, M: newM });
      };

      const updateDraws = (val: number) => {
        const newn = Math.max(1, Math.min(val, p.N));
        onChange({ ...p, n: newn });
      };
      
      return (
        <div>
           {renderSlider('params_N', p.N, 1, 100, 1, updateN)}
           {renderSlider('params_M', p.M, 0, p.N, 1, updateM)}
           {renderSlider('params_k', p.n, 1, p.N, 1, updateDraws)}
        </div>
      );
    }
    case 'normal': {
      const p = params as NormalParams;
      return (
        <div>
           {renderSlider('params_mu', p.mu, -10, 10, 0.1, (val) => onChange({ ...p, mu: val }))}
           {renderSlider('params_sigma', p.sigma, 0.1, 5, 0.1, (val) => onChange({ ...p, sigma: val }))}
        </div>
      );
    }
    case 'continuous_uniform': {
      const p = params as ContinuousUniformParams;
      // Enforce a < b
      return (
        <div>
           {renderSlider('min', p.a, -10, 10, 0.5, (val) => onChange({ ...p, a: Math.min(val, p.b - 0.5) }))}
           {renderSlider('max', p.b, -10, 10, 0.5, (val) => onChange({ ...p, b: Math.max(val, p.a + 0.5) }))}
        </div>
      );
    }
    case 'discrete_uniform': {
        const p = params as DiscreteUniformParams;
        return (
          <div>
             {renderSlider('min', p.min, 0, 50, 1, (val) => onChange({ ...p, min: Math.min(val, p.max - 1) }))}
             {renderSlider('max', p.max, 0, 50, 1, (val) => onChange({ ...p, max: Math.max(val, p.min + 1) }))}
          </div>
        );
      }
    case 'exponential': {
      const p = params as ExponentialParams;
      return (
        <div>
           {renderSlider('params_lambda', p.lambda, 0.1, 5, 0.1, (val) => onChange({ ...p, lambda: val }))}
        </div>
      );
    }
    case 'gamma': {
      const p = params as GammaParams;
      return (
        <div>
           {renderSlider('params_alpha', p.a, 0.1, 10, 0.1, (val) => onChange({ ...p, a: val }))}
           {renderSlider('params_beta', p.b, 0.1, 5, 0.1, (val) => onChange({ ...p, b: val }))}
        </div>
      );
    }
    case 'inverse_gamma': {
      const p = params as InverseGammaParams;
      return (
        <div>
           {renderSlider('params_alpha', p.a, 0.1, 10, 0.1, (val) => onChange({ ...p, a: val }))}
           {renderSlider('params_beta', p.b, 0.1, 5, 0.1, (val) => onChange({ ...p, b: val }))}
        </div>
      );
    }
    case 'beta': {
      const p = params as BetaParams;
      return (
        <div>
           {renderSlider('params_alpha', p.a, 0.1, 10, 0.1, (val) => onChange({ ...p, a: val }))}
           {renderSlider('params_beta', p.b, 0.1, 10, 0.1, (val) => onChange({ ...p, b: val }))}
        </div>
      );
    }
    case 'cauchy': {
      const p = params as CauchyParams;
      return (
        <div>
           {renderSlider('params_loc', p.loc, -5, 5, 0.5, (val) => onChange({ ...p, loc: val }))}
           {renderSlider('params_scale', p.scale, 0.1, 5, 0.1, (val) => onChange({ ...p, scale: val }))}
        </div>
      );
    }
    case 'negative_binomial': {
        const p = params as NegativeBinomialParams;
        return (
          <div>
             {renderSlider('params_r', p.r, 1, 20, 1, (val) => onChange({ ...p, r: val }))}
             {renderSlider('params_p', p.p, 0.01, 1, 0.01, (val) => onChange({ ...p, p: val }))}
          </div>
        );
      }
    default:
      return null;
  }
};
