import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResultSummary } from '../ResultSummary';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../../../../context/LanguageContext';

const renderWithLanguage = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe('ResultSummary', () => {
  const mockResults = {
    tp: 9,
    fn: 1,
    fp: 99,
    tn: 891,
    totalPopulation: 1000,
    probabilities: { tp: 0.009, fn: 0.001, fp: 0.099, tn: 0.891 },
    ppv: 0.0833, // 8.33%
    npv: 0.998,
    probTestPos: 0.108
  };

  it('displays the correct counts in the narrative', () => {
    renderWithLanguage(<ResultSummary results={mockResults} />);
    
    // Sick count (TP+FN) = 10
    expect(screen.getByText('10')).toBeInTheDocument();
    
    // Alarm count (TP+FP) = 108
    expect(screen.getByText('108')).toBeInTheDocument();
    
    // False Positive count = 99
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('displays the PPV percentage prominently', () => {
    renderWithLanguage(<ResultSummary results={mockResults} />);
    const ppvDisplay = screen.getByTestId('ppv-display');
    expect(ppvDisplay).toHaveTextContent('8.3%');
  });
});
