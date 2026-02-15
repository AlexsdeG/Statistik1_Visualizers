import { useMemo } from 'react';
import { LorenzCalculationResult, LorenzPoint } from '../types';

/**
 * Hook to perform Lorenz Curve and Gini Coefficient calculations.
 * 
 * Logic:
 * 1. Sorts the input data (incomes) in ascending order.
 * 2. Calculates total income (S).
 * 3. Computes Lorenz points (u, v) where:
 *    - u = cumulative share of population (0 to 1)
 *    - v = cumulative share of income (0 to 1)
 * 4. Calculates Gini Coefficient using the Trapezoidal Rule for Area B (Area under Lorenz Curve).
 *    G = 1 - 2 * Area_B
 * 
 * @param incomes - Array of numeric income values representing the population.
 * @returns Object containing sorted incomes, lorenz points, gini coefficient, and diagonal line points.
 */
export const useLorenzMath = (incomes: number[]): LorenzCalculationResult => {
  return useMemo(() => {
    // 1. Sort Data
    const sortedIncomes = [...incomes].sort((a, b) => a - b);
    const n = sortedIncomes.length;

    // Handle empty case
    if (n === 0) {
      return {
        sortedIncomes: [],
        lorenzPoints: [],
        gini: 0,
        equalityPoints: [{ u: 0, v: 0 }, { u: 1, v: 1 }],
      };
    }

    // 2. Cumulative Sums
    const totalIncome = sortedIncomes.reduce((acc, val) => acc + val, 0);
    
    // Edge case: Total Income is 0 (Everyone has 0)
    // Theoretically Gini is undefined (0/0), but practically we treat as 0 (Perfect Equality of nothing)
    if (totalIncome === 0) {
      // Generate points on the diagonal to avoid division by zero
      const points: LorenzPoint[] = Array.from({ length: n + 1 }, (_, i) => ({
        u: i / n,
        v: i / n, 
      }));
      return {
        sortedIncomes,
        lorenzPoints: points,
        gini: 0,
        equalityPoints: [{ u: 0, v: 0 }, { u: 1, v: 1 }],
      };
    }

    // 3. Calculate Points & Area B
    let currentSum = 0;
    const lorenzPoints: LorenzPoint[] = [{ u: 0, v: 0 }];
    
    // We calculate Area B (under the curve) using the trapezoidal rule sum directly during the loop.
    // Area B = Sum of trapezoids. 
    // Trapezoid Area between i-1 and i: (v_{i-1} + v_i) * (u_i - u_{i-1}) / 2
    // Since u_i - u_{i-1} is always 1/n (equidistributed population), this simplifies to:
    // Area B = (1 / 2n) * Sum(v_{i-1} + v_i)
    
    let sumV = 0; // Sum of (v_{i-1} + v_i)

    sortedIncomes.forEach((val, i) => {
      const prevV = lorenzPoints[lorenzPoints.length - 1].v;
      currentSum += val;
      const v = currentSum / totalIncome;
      const u = (i + 1) / n;
      
      lorenzPoints.push({ u, v });
      
      sumV += (prevV + v);
    });

    const areaB = (1 / (2 * n)) * sumV;
    
    // 4. Calculate Gini
    // G = Area A / (Area A + Area B) = Area A / 0.5
    // Area A = 0.5 - Area B
    // G = (0.5 - Area B) / 0.5 = 1 - 2 * Area B
    // Fix floating point precision slightly by clamping
    let gini = 1 - 2 * areaB;
    
    // Clamp to [0, 1] range to handle floating point epsilons
    gini = Math.max(0, Math.min(1, gini));

    return {
      sortedIncomes,
      lorenzPoints,
      gini,
      equalityPoints: [{ u: 0, v: 0 }, { u: 1, v: 1 }]
    };

  }, [incomes]);
};