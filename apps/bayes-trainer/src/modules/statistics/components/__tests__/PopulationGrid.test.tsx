import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PopulationGrid } from '../PopulationGrid';
import { describe, it, expect, vi } from 'vitest';

describe('PopulationGrid', () => {
  it('renders correct number of dots for each category', () => {
    // 10 TP, 20 FN, 30 FP, Rest TN
    // Total 1000
    // Rest = 1000 - 10 - 20 - 30 = 940
    render(<PopulationGrid tp={10} fn={20} fp={30} tn={940} />);
    
    const tps = screen.getAllByTestId('dot-tp');
    expect(tps.length).toBe(10);
    
    const fns = screen.getAllByTestId('dot-fn');
    expect(fns.length).toBe(20);

    const fps = screen.getAllByTestId('dot-fp');
    expect(fps.length).toBe(30);

    const tns = screen.getAllByTestId('dot-tn');
    expect(tns.length).toBe(940);
  });

  it('handles rounding mismatches gracefully (pads with TN)', () => {
    // Sum < 1000
    render(<PopulationGrid tp={1} fn={1} fp={1} tn={1} />);
    
    const tps = screen.getAllByTestId('dot-tp');
    expect(tps.length).toBe(1);

    const tns = screen.getAllByTestId('dot-tn');
    // 1 explicit TN + 996 padding = 997
    expect(tns.length).toBe(997);
  });
  
  it('handles overflow gracefully (truncates)', () => {
      // Sum > 1000 (1000 TP)
      // Expect 1000 TP and nothing else
      render(<PopulationGrid tp={1001} fn={0} fp={0} tn={0} />);
      
      const tps = screen.getAllByTestId('dot-tp');
      expect(tps.length).toBe(1000);
  });

  it('calls onHover when hovering over a dot', () => {
    const handleHover = vi.fn();
    render(<PopulationGrid tp={10} fn={0} fp={0} tn={990} onHover={handleHover} />);

    const tpDots = screen.getAllByTestId('dot-tp');
    const firstTP = tpDots[0];

    fireEvent.mouseEnter(firstTP);
    expect(handleHover).toHaveBeenCalledWith('tp');
  });

  it('calls onHover(null) when leaving the container', () => {
    const handleHover = vi.fn();
    // Use a testId for the container to easily select it, or use the role if possible.
    // The component renders a div with specific classes.
    const { container } = render(<PopulationGrid tp={10} fn={0} fp={0} tn={990} onHover={handleHover} />);
    
    // Select the outer div (first child of container)
    const gridContainer = container.firstChild as HTMLElement;
    
    fireEvent.mouseLeave(gridContainer);
    expect(handleHover).toHaveBeenCalledWith(null);
  });
});
