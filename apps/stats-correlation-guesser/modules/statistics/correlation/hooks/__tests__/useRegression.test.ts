import { describe, it, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useRegression } from '../useRegression';

describe('useRegression', () => {
  it('should return invalid for fewer than 2 points', () => {
    const { result } = renderHook(() => useRegression([{ x: 1, y: 1 }]));
    expect(result.current.isValid).toBe(false);
    expect(result.current.r).toBe(0);
  });

  it('should calculate perfect positive correlation', () => {
    const points = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ];
    const { result } = renderHook(() => useRegression(points));
    
    expect(result.current.isValid).toBe(true);
    expect(result.current.r).toBeCloseTo(1, 4);
    expect(result.current.m).toBeCloseTo(1, 4);
    expect(result.current.b).toBeCloseTo(0, 4);
  });

  it('should calculate perfect negative correlation', () => {
    const points = [
      { x: 1, y: 3 },
      { x: 2, y: 2 },
      { x: 3, y: 1 },
    ];
    const { result } = renderHook(() => useRegression(points));
    
    expect(result.current.isValid).toBe(true);
    expect(result.current.r).toBeCloseTo(-1, 4);
    expect(result.current.m).toBeCloseTo(-1, 4);
    expect(result.current.b).toBeCloseTo(4, 4);
  });

  it('should calculate no correlation (horizontal line)', () => {
    // Note: If slope is 0, correlation is technically undefined or 0 depending on interpretation of formula if Syy=0
    // But here Syy is 0, so our code returns invalid.
    // Let's test a case where Syy != 0 but r is 0 (e.g. symmetrical points)
    const points = [
      { x: 1, y: 0 },
      { x: 2, y: 2 }, // Peak
      { x: 3, y: 0 },
    ];
    // This is a triangle. Covariance should be 0.
    const { result } = renderHook(() => useRegression(points));
    
    expect(result.current.isValid).toBe(true);
    expect(result.current.r).toBeCloseTo(0, 4);
    expect(result.current.m).toBeCloseTo(0, 4);
  });

  it('should handle vertical lines gracefully', () => {
    const points = [
      { x: 2, y: 1 },
      { x: 2, y: 5 },
    ];
    const { result } = renderHook(() => useRegression(points));
    
    // Sxx will be 0
    expect(result.current.isValid).toBe(false);
  });
});