import React from 'react';
import { render } from '@testing-library/react';
import { DistributionPlot } from './DistributionPlot';
import { DistributionData } from '../types';

// Declare test globals
declare const describe: any;
declare const test: any;
declare const expect: any;
declare const jest: any;

// Mock Mafs to avoid canvas/SVG issues in test environment
jest.mock('mafs', () => ({
  Mafs: ({ children }: any) => <div data-testid="mafs-root">{children}</div>,
  Coordinates: { Cartesian: () => <div data-testid="mafs-coords" /> },
  Plot: { OfX: () => <div data-testid="mafs-plot" /> },
  Line: { Segment: () => <div data-testid="mafs-line" /> },
  Point: () => <div data-testid="mafs-point" />,
  Text: () => <div data-testid="mafs-text" />,
  Theme: { blue: 'blue', orange: 'orange', red: 'red' }
}));

describe('DistributionPlot', () => {
  const mockData: DistributionData = {
    data: [
      { x: 0, y: 0.1 },
      { x: 1, y: 0.4 },
      { x: 2, y: 0.1 }
    ],
    pdfFunc: null,
    stats: { mean: 1, variance: 0.5, stdDev: 0.7 },
    domain: { min: 0, max: 2 },
    isDiscrete: true
  };

  test('renders discrete data points', () => {
    const { getAllByTestId } = render(
      <DistributionPlot 
        data={mockData} 
        range={{ min: 0, max: 1 }} 
      />
    );

    // 3 points * 2 (visual + hit area) = 6 points? 
    // Wait, the component renders Line.Segment and Point. 
    // mockData has 3 items.
    // implementation has Line.Segment, Point (visible), Point (hidden).
    // So 3 lines, 6 points.
    
    expect(getAllByTestId('mafs-line')).toHaveLength(3);
    expect(getAllByTestId('mafs-point')).toHaveLength(6); 
  });

  test('renders approximation when enabled', () => {
    const { getByTestId } = render(
      <DistributionPlot 
        data={mockData} 
        range={{ min: 0, max: 1 }}
        showApproximation={true}
      />
    );
    
    expect(getByTestId('mafs-plot')).toBeTruthy();
  });
});