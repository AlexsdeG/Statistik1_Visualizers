import { useCallback } from 'react';
import { Point } from './useRegression';

// Box constraints for the generation
const MEAN = 5;
const STD_DEV = 2; // Spread of points
const BOX_MIN = 0;
const BOX_MAX = 10;

// Box-Muller transform for standard normal distribution
const randn_bm = (): number => {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

export const usePointGenerator = () => {
  const generateCloud = useCallback((targetR: number, count: number = 50): Point[] => {
    const points: Point[] = [];
    
    // Clamp target correlation between -1 and 1
    const rho = Math.max(-1, Math.min(1, targetR));
    
    for (let i = 0; i < count; i++) {
      // 1. Generate independent standard normal variables
      const x_raw = randn_bm();
      const z_raw = randn_bm();
      
      // 2. Construct correlated y using the formula: Y = rho * X + sqrt(1 - rho^2) * Z
      const y_raw = rho * x_raw + Math.sqrt(1 - rho * rho) * z_raw;
      
      // 3. Scale and shift to fit our visual domain (0-10)
      // We want the mean to be roughly 5, and most points within [0, 10]
      // Since 99.7% of Normal dist is within +/- 3 SD, if SD=2, range is +/- 6.
      // 5 +/- 6 = [-1, 11]. This fits the viewbox reasonably well.
      const x = MEAN + x_raw * STD_DEV;
      const y = MEAN + y_raw * STD_DEV;

      points.push({ x, y });
    }

    return points;
  }, []);

  return { generateCloud };
};