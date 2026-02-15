import React from 'react';
import { render, screen } from '@testing-library/react';
import { UnitSquare } from '../UnitSquare';
import { describe, it, expect } from 'vitest';

describe('UnitSquare', () => {
  it('renders 4 rectangles', () => {
    render(<UnitSquare prevalence={0.1} sensitivity={0.9} specificity={0.8} />);

    expect(screen.getByTestId('rect-tp')).toBeInTheDocument();
    expect(screen.getByTestId('rect-fn')).toBeInTheDocument();
    expect(screen.getByTestId('rect-fp')).toBeInTheDocument();
    expect(screen.getByTestId('rect-tn')).toBeInTheDocument();
  });

  it('calculates dimensions correctly for simple values', () => {
    // Prev = 0.5 (50%), Sens = 0.5 (50%), Spec = 0.5 (50%)
    render(<UnitSquare prevalence={0.5} sensitivity={0.5} specificity={0.5} />);

    const tp = screen.getByTestId('rect-tp');
    // x=0, y=0, w=50, h=50
    expect(tp).toHaveAttribute('x', '0');
    expect(tp).toHaveAttribute('y', '0');
    expect(tp).toHaveAttribute('width', '50');
    expect(tp).toHaveAttribute('height', '50');

    const fp = screen.getByTestId('rect-fp');
    // x=50, y=0, w=50, h=50 (1-Spec = 0.5)
    expect(fp).toHaveAttribute('x', '50');
    expect(fp).toHaveAttribute('y', '0');
    expect(fp).toHaveAttribute('width', '50');
    expect(fp).toHaveAttribute('height', '50');
  });

  it('calculates dimensions correctly for asymmetric values', () => {
    // Prev = 0.1 (10%), Sens = 0.8 (80%), Spec = 0.9 (90%)
    render(<UnitSquare prevalence={0.1} sensitivity={0.8} specificity={0.9} />);

    const tp = screen.getByTestId('rect-tp');
    // Width = 10, Height = 80
    expect(tp).toHaveAttribute('width', '10');
    expect(tp).toHaveAttribute('height', '80');

    const fn = screen.getByTestId('rect-fn');
    // Width = 10, Height = 20 (100 - 80)
    // y = 80
    expect(fn).toHaveAttribute('y', '80');
    expect(fn).toHaveAttribute('height', '20');

    const fp = screen.getByTestId('rect-fp');
    // Width = 90 (100-10)
    // Height = 10 (1 - 0.9 = 0.1 = 10%)
    expect(parseFloat(fp.getAttribute('width')!)).toBeCloseTo(90);
    expect(parseFloat(fp.getAttribute('height')!)).toBeCloseTo(10);
  });
});
