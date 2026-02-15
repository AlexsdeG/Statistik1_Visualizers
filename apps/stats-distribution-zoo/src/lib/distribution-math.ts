/**
 * Mathematical helper functions for statistical distributions.
 * Implements Factorial, nCr, and Probability Mass/Density Functions.
 */

// --- Basic Math ---

/**
 * Calculates n!
 */
export function factorial(n: number): number {
  if (n < 0) return 0;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
}

/**
 * Calculates Combinations (n choose r)
 * Formula: n! / (r! * (n-r)!)
 * Optimized to avoid large factorials.
 */
export function nCr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  if (r === 0 || r === n) return 1;
  if (r > n / 2) r = n - r; // Symmetry property
  
  let res = 1;
  for (let i = 1; i <= r; i++) {
    res = (res * (n - i + 1)) / i;
  }
  return res;
}

/**
 * Log-Gamma function approximation (Lanczos approximation)
 * Needed for Gamma/Beta distributions.
 */
export function logGamma(z: number): number {
  if (z <= 0) return NaN; // Not supported for non-positive
  
  // Coefficients for Lanczos approximation (g=7, n=9)
  const p = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7
  ];
  
  let x = z;
  let y = x;
  let tmp = x + 7 + 0.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = p[0];
  for (let i = 1; i < p.length; i++) {
    y += 1;
    ser += p[i] / y;
  }
  return -tmp + Math.log(Math.sqrt(2 * Math.PI) * ser / x);
}

/**
 * Gamma function: exp(logGamma(z))
 */
export function gamma(z: number): number {
  return Math.exp(logGamma(z));
}

/**
 * Beta function B(x, y) = (Gamma(x) * Gamma(y)) / Gamma(x + y)
 */
export function betaFunc(x: number, y: number): number {
  return Math.exp(logGamma(x) + logGamma(y) - logGamma(x + y));
}

/**
 * Simple Numerical Integration (Simpson's Rule or Trapezoidal)
 * Used for calculating probabilities of complex continuous distributions.
 */
export function integrate(func: (x: number) => number, start: number, end: number, steps: number = 100): number {
  if (start >= end) return 0;
  const h = (end - start) / steps;
  let sum = 0.5 * (func(start) + func(end));
  for (let i = 1; i < steps; i++) {
    sum += func(start + i * h);
  }
  return sum * h;
}

// --- Discrete Distributions (PMF) ---

export function binomialPMF(n: number, p: number, k: number): number {
  if (k < 0 || k > n) return 0;
  return nCr(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

export function poissonPMF(lambda: number, k: number): number {
  if (k < 0 || lambda <= 0) return 0;
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

export function geometricPMF(p: number, k: number): number {
  if (k < 1) return 0;
  return Math.pow(1 - p, k - 1) * p;
}

export function hypergeometricPMF(N: number, M: number, n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k > M || (n - k) > (N - M)) return 0;
  const numerator = nCr(M, k) * nCr(N - M, n - k);
  const denominator = nCr(N, n);
  if (denominator === 0) return 0;
  return numerator / denominator;
}

export function discreteUniformPMF(min: number, max: number, k: number): number {
  if (k < min || k > max) return 0;
  return 1 / (max - min + 1);
}

export function negativeBinomialPMF(r: number, p: number, k: number): number {
  // k is total trials. Domain: k >= r
  if (k < r) return 0;
  // Formula: (k-1)C(r-1) * p^r * (1-p)^(k-r)
  return nCr(k - 1, r - 1) * Math.pow(p, r) * Math.pow(1 - p, k - r);
}

// --- Continuous Distributions (PDF & CDF) ---

export function normalPDF(x: number, mu: number, sigma: number): number {
  if (sigma <= 0) return 0;
  const coeff = 1 / (sigma * Math.sqrt(2 * Math.PI));
  const exponent = -0.5 * Math.pow((x - mu) / sigma, 2);
  return coeff * Math.exp(exponent);
}

export function continuousUniformPDF(x: number, a: number, b: number): number {
  if (x < a || x > b) return 0;
  return 1 / (b - a);
}

export function exponentialPDF(x: number, lambda: number): number {
  if (x < 0) return 0;
  return lambda * Math.exp(-lambda * x);
}

export function gammaPDF(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  // f(x) = (b^a / Gamma(a)) * x^(a-1) * e^(-bx)
  // Using logs to avoid overflow
  const logVal = (a * Math.log(b)) - logGamma(a) + ((a - 1) * Math.log(x)) - (b * x);
  return Math.exp(logVal);
}

export function inverseGammaPDF(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  // f(x) = (b^a / Gamma(a)) * x^(-a-1) * e^(-b/x)
  const logVal = (a * Math.log(b)) - logGamma(a) + ((-a - 1) * Math.log(x)) - (b / x);
  return Math.exp(logVal);
}

export function betaPDF(x: number, a: number, b: number): number {
  if (x <= 0 || x >= 1) return 0;
  // f(x) = (1 / B(a,b)) * x^(a-1) * (1-x)^(b-1)
  const logVal = -Math.log(betaFunc(a, b)) + ((a - 1) * Math.log(x)) + ((b - 1) * Math.log(1 - x));
  return Math.exp(logVal);
}

export function cauchyPDF(x: number, loc: number = 0, scale: number = 1): number {
  // f(x) = 1 / (pi * scale * (1 + ((x-loc)/scale)^2))
  const denom = Math.PI * scale * (1 + Math.pow((x - loc) / scale, 2));
  return 1 / denom;
}

// --- CDFs ---

function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

export function normalCDF(x: number, mu: number, sigma: number): number {
  if (sigma <= 0) return 0;
  return 0.5 * (1 + erf((x - mu) / (sigma * Math.sqrt(2))));
}

export function continuousUniformCDF(x: number, a: number, b: number): number {
  if (x < a) return 0;
  if (x > b) return 1;
  return (x - a) / (b - a);
}

export function exponentialCDF(x: number, lambda: number): number {
  if (x < 0) return 0;
  return 1 - Math.exp(-lambda * x);
}

export function cauchyCDF(x: number, loc: number, scale: number): number {
  return (1 / Math.PI) * Math.atan((x - loc) / scale) + 0.5;
}
