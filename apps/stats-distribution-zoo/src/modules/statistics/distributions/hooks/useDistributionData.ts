import { useMemo } from 'react';
import { DistributionType, AnyDistributionParams, DistributionData, BinomialParams, PoissonParams, GeometricParams, HypergeometricParams, NormalParams, ContinuousUniformParams, ExponentialParams, GammaParams, InverseGammaParams, BetaParams, CauchyParams, DiscreteUniformParams, NegativeBinomialParams } from '../types';
import { binomialPMF, poissonPMF, geometricPMF, hypergeometricPMF, normalPDF, continuousUniformPDF, exponentialPDF, gammaPDF, inverseGammaPDF, betaPDF, cauchyPDF, discreteUniformPMF, negativeBinomialPMF } from '../../../../lib/distribution-math';

export const useDistributionData = (
  type: DistributionType,
  params: AnyDistributionParams
): DistributionData => {
  return useMemo(() => {
    switch (type) {
      // --- Discrete ---
      case 'binomial': {
        const { n, p } = params as BinomialParams;
        const mean = n * p;
        const variance = n * p * (1 - p);
        const data = [];
        for (let k = 0; k <= n; k++) data.push({ x: k, y: binomialPMF(n, p, k) });
        return {
          data, pdfFunc: null, isDiscrete: true,
          stats: { mean, variance, stdDev: Math.sqrt(variance) },
          domain: { min: -1, max: n + 1 },
        };
      }
      case 'poisson': {
        const { lambda } = params as PoissonParams;
        const variance = lambda;
        const maxK = Math.ceil(lambda + 4 * Math.sqrt(variance)) + 2;
        const data = [];
        for (let k = 0; k <= maxK; k++) data.push({ x: k, y: poissonPMF(lambda, k) });
        return {
          data, pdfFunc: null, isDiscrete: true,
          stats: { mean: lambda, variance, stdDev: Math.sqrt(variance) },
          domain: { min: -1, max: maxK + 1 },
        };
      }
      case 'geometric': {
        const { p } = params as GeometricParams;
        const mean = 1 / p;
        const variance = (1 - p) / (p * p);
        const maxK = Math.ceil(mean + 4 * Math.sqrt(variance)) + 5;
        const data = [];
        for (let k = 1; k <= maxK; k++) data.push({ x: k, y: geometricPMF(p, k) });
        return {
          data, pdfFunc: null, isDiscrete: true,
          stats: { mean, variance, stdDev: Math.sqrt(variance) },
          domain: { min: 0, max: maxK + 1 },
        };
      }
      case 'hypergeometric': {
        const { N, M, n } = params as HypergeometricParams;
        const p_success = M / N;
        const mean = n * p_success;
        const variance = n * p_success * (1 - p_success) * ((N - n) / (N - 1));
        const data = [];
        for (let k = 0; k <= n; k++) {
            // Only push if prob > 0 to keep chart clean? Or keep 0s for domain integrity.
            // Keeping logic simple: 0 to n.
            data.push({ x: k, y: hypergeometricPMF(N, M, n, k) });
        }
        return {
          data, pdfFunc: null, isDiscrete: true,
          stats: { mean, variance, stdDev: Math.sqrt(Math.max(0, variance)) },
          domain: { min: -1, max: n + 1 },
        };
      }
      case 'discrete_uniform': {
        const { min, max } = params as DiscreteUniformParams;
        const k_count = max - min + 1;
        const mean = (min + max) / 2;
        const variance = (Math.pow(k_count, 2) - 1) / 12;
        const data = [];
        for (let k = min; k <= max; k++) data.push({ x: k, y: discreteUniformPMF(min, max, k) });
        return {
          data, pdfFunc: null, isDiscrete: true,
          stats: { mean, variance, stdDev: Math.sqrt(variance) },
          domain: { min: min - 1, max: max + 1 },
        };
      }
      case 'negative_binomial': {
        const { r, p } = params as NegativeBinomialParams;
        const mean = r / p;
        const variance = (r * (1 - p)) / (p * p);
        const maxK = Math.ceil(mean + 4 * Math.sqrt(variance));
        const data = [];
        for (let k = r; k <= maxK; k++) data.push({ x: k, y: negativeBinomialPMF(r, p, k) });
        return {
          data, pdfFunc: null, isDiscrete: true,
          stats: { mean, variance, stdDev: Math.sqrt(variance) },
          domain: { min: r - 1, max: maxK + 1 },
        };
      }

      // --- Continuous ---
      case 'normal': {
        const { mu, sigma } = params as NormalParams;
        return {
          data: null, pdfFunc: (x) => normalPDF(x, mu, sigma), isDiscrete: false,
          stats: { mean: mu, variance: sigma * sigma, stdDev: sigma },
          domain: { min: mu - 4 * sigma, max: mu + 4 * sigma },
        };
      }
      case 'continuous_uniform': {
        const { a, b } = params as ContinuousUniformParams;
        const mean = (a + b) / 2;
        const variance = Math.pow(b - a, 2) / 12;
        // Padding
        const span = b - a;
        return {
          data: null, pdfFunc: (x) => continuousUniformPDF(x, a, b), isDiscrete: false,
          stats: { mean, variance, stdDev: Math.sqrt(variance) },
          domain: { min: a - span * 0.2, max: b + span * 0.2 },
        };
      }
      case 'exponential': {
        const { lambda } = params as ExponentialParams;
        const mean = 1 / lambda;
        const variance = 1 / (lambda * lambda);
        // Show up to 4 std devs
        const max = mean + 4 * Math.sqrt(variance);
        return {
          data: null, pdfFunc: (x) => exponentialPDF(x, lambda), isDiscrete: false,
          stats: { mean, variance, stdDev: Math.sqrt(variance) },
          domain: { min: -mean * 0.2, max },
        };
      }
      case 'gamma': {
        const { a, b } = params as GammaParams;
        const mean = a / b;
        const variance = a / (b * b);
        const max = mean + 5 * Math.sqrt(variance);
        return {
          data: null, pdfFunc: (x) => gammaPDF(x, a, b), isDiscrete: false,
          stats: { mean, variance, stdDev: Math.sqrt(variance) },
          domain: { min: -0.5, max },
        };
      }
      case 'inverse_gamma': {
        const { a, b } = params as InverseGammaParams;
        const mean = a > 1 ? b / (a - 1) : 'Undefined (a <= 1)';
        const variance = a > 2 ? (b * b) / (Math.pow(a - 1, 2) * (a - 2)) : 'Undefined (a <= 2)';
        let max = 0;
        if (typeof mean === 'number' && typeof variance === 'number') {
            max = mean + 5 * Math.sqrt(variance);
        } else {
            // Heuristic for undefined moments
            max = (b / a) * 10; 
        }
        return {
          data: null, pdfFunc: (x) => inverseGammaPDF(x, a, b), isDiscrete: false,
          stats: { mean, variance, stdDev: typeof variance === 'number' ? Math.sqrt(variance) : '-' },
          domain: { min: 0, max },
        };
      }
      case 'beta': {
        const { a, b } = params as BetaParams;
        const mean = a / (a + b);
        const variance = (a * b) / (Math.pow(a + b, 2) * (a + b + 1));
        return {
          data: null, pdfFunc: (x) => betaPDF(x, a, b), isDiscrete: false,
          stats: { mean, variance, stdDev: Math.sqrt(variance) },
          domain: { min: -0.1, max: 1.1 },
        };
      }
      case 'cauchy': {
        const { loc, scale } = params as CauchyParams;
        // Cauchy has undefined mean/variance
        return {
          data: null, pdfFunc: (x) => cauchyPDF(x, loc, scale), isDiscrete: false,
          stats: { mean: 'Undefined', variance: 'Undefined', stdDev: 'Undefined' },
          domain: { min: loc - 5 * scale, max: loc + 5 * scale },
        };
      }

      default:
        return {
          data: [], pdfFunc: null, isDiscrete: true,
          stats: { mean: 0, variance: 0, stdDev: 0 },
          domain: { min: 0, max: 1 },
        };
    }
  }, [type, params]);
};
