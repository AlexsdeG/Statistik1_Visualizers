import React from 'react';
import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { SandboxBoard } from '../SandboxBoard';

// Mock translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key.includes('clear')) return 'Clear';
      if (key.includes('perfect')) return 'Perfect Line';
      return key;
    },
  }),
}));

describe('SandboxBoard', () => {
  it('renders correctly', () => {
    render(<SandboxBoard />);
    expect(screen.getByText('correlation.presets.title')).toBeDefined();
    expect(screen.getByText('Clear')).toBeDefined();
  });

  it('adds points via presets', () => {
    render(<SandboxBoard />);
    const perfectBtn = screen.getByText('Perfect Line');
    fireEvent.click(perfectBtn);
    
    // We expect points to be rendered in the scatterplot (circles)
    // The perfect line preset adds 9 points
    const circles = screen.getAllByRole('presentation').filter(e => e.tagName === 'circle');
    // Note: ScatterPlot does not add role='presentation' to circles, so we rely on selector logic or modification.
    // Actually, in our ScatterPlot, circles are just SVG circles. 
    // Testing-library's 'getAllByRole' might not find SVG elements easily without proper roles.
    // We can just check if stats updated.
    
    // Check if regression line appears (it only appears if valid points exist)
    // We can infer points existence by regression line or finding elements by className or container.
    // Let's use a simpler approach: check if regression stats are displayed.
    // StatsPanel displays "y = 1.00x..." for perfect line.
    
    expect(screen.getByText(/y = 1.00x/)).toBeDefined();
  });

  it('clears points', () => {
    render(<SandboxBoard />);
    
    // Load points
    fireEvent.click(screen.getByText('Perfect Line'));
    expect(screen.queryByText(/y = 1.00x/)).not.toBeNull();

    // Clear
    fireEvent.click(screen.getByText('Clear'));
    
    // Should show empty state or remove stats
    // When invalid (no points), StatsPanel shows a hint "correlation.click_hint" (mocked key)
    expect(screen.queryByText(/y = 1.00x/)).toBeNull();
  });
});