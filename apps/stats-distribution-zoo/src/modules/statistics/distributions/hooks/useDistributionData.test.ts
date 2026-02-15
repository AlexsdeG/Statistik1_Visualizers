import { renderHook } from '@testing-library/react';
import { useDistributionData } from './useDistributionData';

// Declare test globals to avoid TS errors if types are not present
declare const describe: any;
declare const test: any;
declare const expect: any;

// Basic hook test suite assuming standard React testing environment
describe('useDistributionData Hook', () => {
  
  test('generates Binomial data correctly', () => {
    const { result } = renderHook(() => 
      useDistributionData('binomial', { n: 10, p: 0.5 })
    );

    expect(result.current.isDiscrete).toBe(true);
    expect(result.current.stats.mean).toBe(5); // 10 * 0.5
    expect(result.current.data).toHaveLength(11); // 0 to 10
    expect(result.current.domain.max).toBeGreaterThan(10);
  });

  test('generates Poisson data with dynamic cutoff', () => {
    const { result } = renderHook(() => 
      useDistributionData('poisson', { lambda: 4 })
    );

    expect(result.current.stats.mean).toBe(4);
    expect(result.current.stats.variance).toBe(4);
    // Data length should cover significant probability mass
    // 4 + 4*sqrt(4) = 4 + 8 = 12 approx
    expect(result.current.data?.length).toBeGreaterThan(10);
  });

  test('generates Normal distribution function', () => {
    const { result } = renderHook(() => 
      useDistributionData('normal', { mu: 0, sigma: 1 })
    );

    expect(result.current.isDiscrete).toBe(false);
    expect(result.current.data).toBeNull();
    expect(typeof result.current.pdfFunc).toBe('function');
    
    // Check peak
    const peak = result.current.pdfFunc!(0);
    expect(peak).toBeCloseTo(0.3989);
  });

  test('handles Hypergeometric edge cases', () => {
    const { result } = renderHook(() => 
      useDistributionData('hypergeometric', { N: 10, M: 5, n: 10 })
    );
    // If we draw everything (n=N), we must get exactly M successes
    // So P(X=5) should be 1, others 0
    const val5 = result.current.data?.find(d => d.x === 5)?.y;
    expect(val5).toBeCloseTo(1);
  });
});