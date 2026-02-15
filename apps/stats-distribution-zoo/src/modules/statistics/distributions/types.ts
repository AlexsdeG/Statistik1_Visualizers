export type DistributionType = 
  | 'binomial' 
  | 'poisson' 
  | 'geometric' 
  | 'hypergeometric' 
  | 'negative_binomial' 
  | 'discrete_uniform'
  | 'normal'
  | 'continuous_uniform'
  | 'exponential'
  | 'gamma'
  | 'inverse_gamma'
  | 'beta'
  | 'cauchy';

export interface BaseStats {
  mean: number | string; // Can be string for "undefined" or "mode"
  variance: number | string;
  stdDev: number | string;
}

export interface Domain {
  min: number;
  max: number;
}

export interface DataPoint {
  x: number;
  y: number;
}

export type DistributionData = {
  data: DataPoint[] | null; // Null if continuous
  pdfFunc: ((x: number) => number) | null; // Null if discrete
  stats: BaseStats;
  domain: Domain;
  isDiscrete: boolean;
};

// Parameter Types
export interface BinomialParams { n: number; p: number; }
export interface PoissonParams { lambda: number; }
export interface GeometricParams { p: number; }
export interface HypergeometricParams { N: number; M: number; n: number; }
export interface NegativeBinomialParams { r: number; p: number; }
export interface DiscreteUniformParams { min: number; max: number; }

export interface NormalParams { mu: number; sigma: number; }
export interface ContinuousUniformParams { a: number; b: number; }
export interface ExponentialParams { lambda: number; }
export interface GammaParams { a: number; b: number; } // a=shape, b=rate
export interface InverseGammaParams { a: number; b: number; }
export interface BetaParams { a: number; b: number; }
export interface CauchyParams { loc: number; scale: number; }

export type AnyDistributionParams = 
  | BinomialParams 
  | PoissonParams 
  | GeometricParams 
  | HypergeometricParams 
  | NegativeBinomialParams
  | DiscreteUniformParams
  | NormalParams
  | ContinuousUniformParams
  | ExponentialParams
  | GammaParams
  | InverseGammaParams
  | BetaParams
  | CauchyParams;
