import { factorial, nCr, binomialPMF, poissonPMF, geometricPMF, hypergeometricPMF, normalPDF, normalCDF } from './distribution-math';

// Declare test globals to avoid TS errors if types are not present
declare const describe: any;
declare const test: any;
declare const expect: any;

// Simple standalone test suite compatible with typical Jest/Vitest setups

describe('Distribution Math Utils', () => {
  describe('Basic Math', () => {
    test('factorial', () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
      expect(factorial(5)).toBe(120);
    });

    test('nCr', () => {
      expect(nCr(5, 2)).toBe(10);
      expect(nCr(10, 0)).toBe(1);
      expect(nCr(10, 10)).toBe(1);
      expect(nCr(5, 6)).toBe(0);
    });
  });

  describe('Distributions', () => {
    test('Binomial PMF', () => {
      // n=4, p=0.5, k=2 => 6 * 0.25 * 0.25 = 0.375
      expect(binomialPMF(4, 0.5, 2)).toBeCloseTo(0.375);
      expect(binomialPMF(4, 0.5, 5)).toBe(0);
    });

    test('Poisson PMF', () => {
      // lambda=2, k=0 => e^-2 = 0.1353
      expect(poissonPMF(2, 0)).toBeCloseTo(0.135335);
      // lambda=2, k=1 => 2 * e^-2 = 0.2706
      expect(poissonPMF(2, 1)).toBeCloseTo(0.27067);
    });

    test('Geometric PMF', () => {
      // p=0.5, k=1 => 0.5
      expect(geometricPMF(0.5, 1)).toBe(0.5);
      // p=0.5, k=2 => 0.5 * 0.5 = 0.25
      expect(geometricPMF(0.5, 2)).toBe(0.25);
      expect(geometricPMF(0.5, 0)).toBe(0);
    });

    test('Hypergeometric PMF', () => {
      // N=10, M=5, n=2
      // k=2 (Draw 2, get 2 red)
      // 5C2 * 5C0 / 10C2 = 10 * 1 / 45 = 10/45 = 2/9 approx 0.222
      expect(hypergeometricPMF(10, 5, 2, 2)).toBeCloseTo(0.2222);
    });

    test('Normal PDF', () => {
      // mu=0, sigma=1, x=0 => 1/sqrt(2pi) approx 0.3989
      expect(normalPDF(0, 0, 1)).toBeCloseTo(0.39894);
    });

    test('Normal CDF', () => {
      // mu=0, sigma=1
      // CDF(0) = 0.5
      expect(normalCDF(0, 0, 1)).toBeCloseTo(0.5);
      // CDF(1) approx 0.8413
      expect(normalCDF(1, 0, 1)).toBeCloseTo(0.8413);
      // CDF(-1) approx 0.1587
      expect(normalCDF(-1, 0, 1)).toBeCloseTo(0.1587);
    });
  });
});
