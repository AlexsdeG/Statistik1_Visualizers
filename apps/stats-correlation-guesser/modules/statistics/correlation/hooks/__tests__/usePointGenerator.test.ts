import { describe, it, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { usePointGenerator } from '../usePointGenerator';
import { useRegression } from '../useRegression';

describe('usePointGenerator', () => {
  it('should generate the requested number of points', () => {
    const { result } = renderHook(() => usePointGenerator());
    const points = result.current.generateCloud(0.5, 100);
    expect(points.length).toBe(100);
  });

  // Since it's random, we can't test exact values easily, but we can test statistical properties
  // with a large N, allowing for some margin of error.
  it('should generate points with correlation close to target', () => {
    const { result: genResult } = renderHook(() => usePointGenerator());
    const targetR = 0.8;
    const n = 5000; 
    const points = genResult.current.generateCloud(targetR, n);

    // Use our regression hook logic to verify (simplest way to reuse the math)
    const { result: regResult } = renderHook(() => useRegression(points));
    
    const r = regResult.current.r;
    
    // With N=5000, standard error is roughly 1/sqrt(N) ~ 0.014
    // We expect r to be within ~0.05 of target
    expect(Math.abs(r - targetR)).toBeLessThan(0.05);
  });

  it('should generate points with correlation close to negative target', () => {
    const { result: genResult } = renderHook(() => usePointGenerator());
    const targetR = -0.6;
    const n = 5000;
    const points = genResult.current.generateCloud(targetR, n);

    const { result: regResult } = renderHook(() => useRegression(points));
    const r = regResult.current.r;
    
    expect(Math.abs(r - targetR)).toBeLessThan(0.05);
  });
});