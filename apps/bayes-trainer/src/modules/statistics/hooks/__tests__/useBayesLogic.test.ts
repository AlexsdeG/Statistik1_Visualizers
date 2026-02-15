import { renderHook } from '@testing-library/react';
import { useBayesLogic } from '../useBayesLogic';
import { describe, it, expect } from 'vitest';

describe('useBayesLogic', () => {
  it('calculates correct values for the standard example (1% prevalence)', () => {
    // Example from Knowledge Base:
    // Prev=0.01 (1%), Sens=0.9, Spec=0.9.
    // Expect: TP=9, FN=1, TN=891, FP=99. PPV = 9 / (9+99) ≈ 8.3%.
    
    const { result } = renderHook(() =>
      useBayesLogic({
        prevalence: 0.01,
        sensitivity: 0.9,
        specificity: 0.9,
        populationSize: 1000,
      })
    );

    // Check Counts
    expect(result.current.tp).toBe(9); // 1000 * 0.01 * 0.9 = 9
    expect(result.current.fn).toBe(1); // 1000 * 0.01 * 0.1 = 1
    expect(result.current.fp).toBe(99); // 1000 * 0.99 * 0.1 = 99
    expect(result.current.tn).toBe(891); // 1000 * 0.99 * 0.9 = 891.0
    
    // Check PPV
    // 9 / (9 + 99) = 9 / 108 = 0.08333...
    expect(result.current.ppv).toBeCloseTo(0.08333, 4);
    
    // Check Probabilities sum to 1
    const p = result.current.probabilities;
    expect(p.tp + p.fn + p.fp + p.tn).toBeCloseTo(1, 5);
  });

  it('handles edge case: 100% Specificity (No False Positives)', () => {
    const { result } = renderHook(() =>
      useBayesLogic({
        prevalence: 0.1,
        sensitivity: 0.9,
        specificity: 1.0,
        populationSize: 1000,
      })
    );

    expect(result.current.fp).toBe(0);
    expect(result.current.probabilities.fp).toBe(0);
    // PPV should be 100% because there are no false alarms
    expect(result.current.ppv).toBe(1);
  });

  it('handles edge case: 0% Prevalence (No one is sick)', () => {
    const { result } = renderHook(() =>
      useBayesLogic({
        prevalence: 0,
        sensitivity: 0.9,
        specificity: 0.9,
        populationSize: 1000,
      })
    );

    expect(result.current.tp).toBe(0);
    expect(result.current.fn).toBe(0);
    // All healthy
    // FP = 1000 * 1 * 0.1 = 100
    expect(result.current.fp).toBe(100);
    // TN = 1000 * 1 * 0.9 = 900
    expect(result.current.tn).toBe(900);
    
    // PPV = TP / (TP + FP) = 0 / 100 = 0
    expect(result.current.ppv).toBe(0);
  });

  it('handles edge case: 100% Prevalence (Everyone is sick)', () => {
    const { result } = renderHook(() =>
      useBayesLogic({
        prevalence: 1,
        sensitivity: 0.8,
        specificity: 0.9, // Irrelevant as no one is healthy
        populationSize: 1000,
      })
    );

    expect(result.current.tp).toBe(800); // 1000 * 1 * 0.8
    expect(result.current.fn).toBe(200); // 1000 * 1 * 0.2
    expect(result.current.tn).toBe(0);
    expect(result.current.fp).toBe(0);
    
    // PPV = 800 / 800 = 1
    expect(result.current.ppv).toBe(1);
  });
});
