import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatsSummary } from './StatsSummary';

// Declare test globals
declare const describe: any;
declare const test: any;
declare const expect: any;

describe('StatsSummary', () => {
  const mockStats = {
    mean: 5.5,
    variance: 2.25,
    stdDev: 1.5
  };
  const mockDomain = {
    min: 0,
    max: 10
  };

  test('renders statistics correctly', () => {
    render(<StatsSummary stats={mockStats} domain={mockDomain} />);
    
    expect(screen.getByText('5.5000')).toBeTruthy();
    expect(screen.getByText('2.2500')).toBeTruthy();
    expect(screen.getByText('1.5000')).toBeTruthy();
    expect(screen.getByText('[0.0, 10.0]')).toBeTruthy();
  });
});
