import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BayesControls } from '../BayesControls';
import { describe, it, expect, vi } from 'vitest';
import { LanguageProvider } from '../../../../context/LanguageContext';

// Helper to render with context
const renderWithLanguage = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe('BayesControls', () => {
  const defaultProps = {
    prevalence: 0.01,
    sensitivity: 0.9,
    specificity: 0.9,
    onPrevalenceChange: vi.fn(),
    onSensitivityChange: vi.fn(),
    onSpecificityChange: vi.fn(),
  };

  it('renders all three sliders', () => {
    renderWithLanguage(<BayesControls {...defaultProps} />);
    expect(screen.getByTestId('slider-prevalence')).toBeInTheDocument();
    expect(screen.getByTestId('slider-sensitivity')).toBeInTheDocument();
    expect(screen.getByTestId('slider-specificity')).toBeInTheDocument();
  });

  it('displays the formatted percentage values', () => {
    renderWithLanguage(<BayesControls {...defaultProps} />);
    // 0.01 -> 1.00%
    expect(screen.getByText('1.00%')).toBeInTheDocument();
    // 0.9 -> 90.0%
    expect(screen.getAllByText('90.0%')).toHaveLength(2);
  });

  it('calls onSensitivityChange when sensitivity slider moves', () => {
    renderWithLanguage(<BayesControls {...defaultProps} />);
    const slider = screen.getByTestId('slider-sensitivity');
    fireEvent.change(slider, { target: { value: '0.95' } });
    expect(defaultProps.onSensitivityChange).toHaveBeenCalledWith(0.95);
  });

  it('calls onSpecificityChange when specificity slider moves', () => {
    renderWithLanguage(<BayesControls {...defaultProps} />);
    const slider = screen.getByTestId('slider-specificity');
    fireEvent.change(slider, { target: { value: '0.80' } });
    expect(defaultProps.onSpecificityChange).toHaveBeenCalledWith(0.80);
  });

  it('calls onPrevalenceChange with transformed value when prevalence slider moves', () => {
    renderWithLanguage(<BayesControls {...defaultProps} />);
    const slider = screen.getByTestId('slider-prevalence');
    
    // Simulate moving slider to middle (50)
    fireEvent.change(slider, { target: { value: '50' } });
    
    expect(defaultProps.onPrevalenceChange).toHaveBeenCalled();
    const arg = defaultProps.onPrevalenceChange.mock.calls[0][0];
    expect(arg).toBeCloseTo(0.02236, 4);
  });
});
