import { describe, it, expect } from 'vitest';
import { getTheoreticalMean, getTheoreticalSigma, normalPDF } from '../clt-utils';

describe('CLT Utils', () => {
  it('calculates theoretical mean correctly', () => {
    expect(getTheoreticalMean(1)).toBe(3.5);
    expect(getTheoreticalMean(2)).toBe(7);
    expect(getTheoreticalMean(10)).toBe(35);
  });

  it('calculates theoretical sigma correctly', () => {
    // Variance of one die is 35/12 approx 2.91666...
    const variance = 35 / 12;
    expect(getTheoreticalSigma(1)).toBeCloseTo(Math.sqrt(variance));
    expect(getTheoreticalSigma(12)).toBeCloseTo(Math.sqrt(12 * variance)); // sqrt(35)
  });

  it('calculates Normal PDF correctly', () => {
    // Standard Normal Distribution: mu=0, sigma=1
    // PDF at x=0 should be 1/sqrt(2*PI) approx 0.3989
    expect(normalPDF(0, 0, 1)).toBeCloseTo(0.39894228);
    
    // PDF at x=mu should be peak
    const mu = 10;
    const sigma = 2;
    const peak = 1 / (sigma * Math.sqrt(2 * Math.PI));
    expect(normalPDF(mu, mu, sigma)).toBeCloseTo(peak);
  });
});