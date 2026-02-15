import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SimControls } from '../SimControls';

describe('SimControls', () => {
  const defaultProps = {
    n: 1,
    onNChange: vi.fn(),
    onRun: vi.fn(),
    onReset: vi.fn(),
    totalTrials: 0,
    lang: 'en' as const,
  };

  it('renders correctly', () => {
    render(<SimControls {...defaultProps} />);
    // Check if label exists (partial match due to dynamic value)
    expect(screen.getByText(/Dice per Throw/)).toBeInTheDocument();
    expect(screen.getByText('Throw 1x')).toBeInTheDocument();
  });

  it('calls onRun with correct batch size', () => {
    render(<SimControls {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Throw 1x'));
    expect(defaultProps.onRun).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('Throw 100x'));
    expect(defaultProps.onRun).toHaveBeenCalledWith(100);
  });

  it('calls onNChange when slider moves', () => {
    render(<SimControls {...defaultProps} />);
    // Since input type range can be tricky to select by label in some setups, we look for input
    const slider = screen.getByLabelText(/Dice per Throw/);
    fireEvent.change(slider, { target: { value: '10' } });
    expect(defaultProps.onNChange).toHaveBeenCalledWith(10);
  });

  it('shows warning when totalTrials > 0', () => {
    render(<SimControls {...defaultProps} totalTrials={10} />);
    expect(screen.getByText(/Data will be reset/)).toBeInTheDocument();
  });

  it('disables reset button when totalTrials is 0', () => {
    render(<SimControls {...defaultProps} totalTrials={0} />);
    const resetBtn = screen.getByText('Reset');
    expect(resetBtn).toBeDisabled();
  });

   it('enables reset button when totalTrials > 0', () => {
    render(<SimControls {...defaultProps} totalTrials={10} />);
    const resetBtn = screen.getByText('Reset');
    expect(resetBtn).not.toBeDisabled();
    fireEvent.click(resetBtn);
    expect(defaultProps.onReset).toHaveBeenCalled();
  });
});