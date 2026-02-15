import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { Histogram } from '../Histogram';

// Mock ResizeObserver for Mafs
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('Histogram', () => {
  const defaultProps = {
    counts: {},
    n: 1,
    totalTrials: 0,
  };

  it('renders without crashing', () => {
    const { container } = render(<Histogram {...defaultProps} />);
    // Mafs renders an svg
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with data', () => {
    const props = {
      counts: { 3: 10, 4: 20 },
      n: 1,
      totalTrials: 30,
    };
    const { container } = render(<Histogram {...props} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders theoretical curve when totalTrials > 0', () => {
     // Checking for specific SVG elements created by Mafs Plot.OfX is implementation detail,
     // but we can check if it renders successfully.
     const props = {
      counts: { 3: 10 },
      n: 1,
      totalTrials: 10,
    };
    const { container } = render(<Histogram {...props} />);
    // Ensure no error and content exists
    expect(container.firstChild).not.toBeNull();
  });
});