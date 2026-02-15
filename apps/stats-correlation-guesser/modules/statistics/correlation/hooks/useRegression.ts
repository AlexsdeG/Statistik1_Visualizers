import { useMemo } from 'react';

export interface Point {
  x: number;
  y: number;
}

export interface RegressionResult {
  r: number; // Pearson correlation coefficient
  m: number; // Slope
  b: number; // Y-intercept
  isValid: boolean;
  predict: (x: number) => number;
}

/**
 * Calculates linear regression statistics for a set of points.
 * Implements the Least Squares method.
 */
export const useRegression = (points: Point[]): RegressionResult => {
  return useMemo(() => {
    const n = points.length;

    // We need at least 2 points to form a line and calculate variance
    if (n < 2) {
      return {
        r: 0,
        m: 0,
        b: 0,
        isValid: false,
        predict: () => 0,
      };
    }

    let sumX = 0;
    let sumY = 0;
    
    // First pass: Calculate means
    for (let i = 0; i < n; i++) {
      sumX += points[i].x;
      sumY += points[i].y;
    }
    
    const meanX = sumX / n;
    const meanY = sumY / n;

    let sxx = 0;
    let syy = 0;
    let sxy = 0;

    // Second pass: Calculate variances and covariance
    for (let i = 0; i < n; i++) {
      const dx = points[i].x - meanX;
      const dy = points[i].y - meanY;
      
      sxx += dx * dx;
      syy += dy * dy;
      sxy += dx * dy;
    }

    // Handle edge case: Vertical line (variance of x is 0)
    // Or single point / all points identical
    if (sxx === 0 || syy === 0) {
      return {
        r: 0,
        m: 0,
        b: 0,
        isValid: false,
        predict: () => meanY,
      };
    }

    // Correlation coefficient r = Sxy / sqrt(Sxx * Syy)
    const r = sxy / Math.sqrt(sxx * syy);

    // Slope m = Sxy / Sxx
    const m = sxy / sxx;

    // Intercept b = meanY - m * meanX
    const b = meanY - m * meanX;

    const predict = (x: number) => m * x + b;

    return {
      r,
      m,
      b,
      isValid: true,
      predict,
    };
  }, [points]);
};