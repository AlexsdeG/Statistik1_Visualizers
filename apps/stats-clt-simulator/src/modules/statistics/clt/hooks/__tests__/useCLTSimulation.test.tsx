import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCLTSimulation } from '../useCLTSimulation';

describe('useCLTSimulation', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useCLTSimulation());
    
    expect(result.current.n).toBe(1);
    expect(result.current.totalTrials).toBe(0);
    expect(result.current.counts).toEqual({});
  });

  it('initializes with custom n', () => {
    const { result } = renderHook(() => useCLTSimulation(5));
    expect(result.current.n).toBe(5);
  });

  it('runs simulation and updates counts', () => {
    const { result } = renderHook(() => useCLTSimulation(1));

    act(() => {
      result.current.runSimulation(10);
    });

    expect(result.current.totalTrials).toBe(10);
    
    // Sum of counts should be 10
    const sumCounts = Object.values(result.current.counts).reduce((a, b) => a + b, 0);
    expect(sumCounts).toBe(10);

    // For n=1, keys should be between 1 and 6
    const keys = Object.keys(result.current.counts).map(Number);
    keys.forEach(k => {
      expect(k).toBeGreaterThanOrEqual(1);
      expect(k).toBeLessThanOrEqual(6);
    });
  });

  it('resets data when n is changed', () => {
    const { result } = renderHook(() => useCLTSimulation(1));

    act(() => {
      result.current.runSimulation(10);
    });
    expect(result.current.totalTrials).toBe(10);

    act(() => {
      result.current.setN(2);
    });

    expect(result.current.n).toBe(2);
    expect(result.current.totalTrials).toBe(0);
    expect(result.current.counts).toEqual({});
  });

  it('resets data manually', () => {
    const { result } = renderHook(() => useCLTSimulation(1));

    act(() => {
      result.current.runSimulation(10);
      result.current.reset();
    });

    expect(result.current.totalTrials).toBe(0);
    expect(result.current.counts).toEqual({});
  });
});