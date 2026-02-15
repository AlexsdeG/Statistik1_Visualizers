import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { CLTView } from '../CLTView';

// Mock Mafs components as they depend on browser APIs (Canvas, ResizeObserver) not fully available in JSDOM
vi.mock('../components/Histogram', () => ({
  Histogram: () => <div data-testid="mock-histogram">Histogram Visualization</div>
}));

describe('CLTView Integration', () => {
  it('renders the main application structure', () => {
    render(<CLTView />);
    
    // Header
    expect(screen.getByText('Zentraler Grenzwertsatz')).toBeInTheDocument();
    
    // Language toggle
    expect(screen.getByText('DE')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();

    // Controls
    expect(screen.getByText(/Anzahl Würfel pro Wurf/)).toBeInTheDocument();
    expect(screen.getByText('Wurf 1x')).toBeInTheDocument();

    // Stats
    expect(screen.getByText('Empirisch vs. Theoretisch')).toBeInTheDocument();

    // Visualization
    expect(screen.getByTestId('mock-histogram')).toBeInTheDocument();
    
    // Tip
    expect(screen.getByText(/Setze n=1/)).toBeInTheDocument();
  });

  it('switches language between DE and EN', () => {
    render(<CLTView />);
    
    // Initial State (DE)
    expect(screen.getByText('Zentraler Grenzwertsatz')).toBeInTheDocument();
    
    // Switch to EN
    fireEvent.click(screen.getByText('EN'));
    expect(screen.getByText('Central Limit Theorem')).toBeInTheDocument();
    expect(screen.getByText(/Dice per Throw/)).toBeInTheDocument();
    expect(screen.getByText('Empirical vs. Theoretical')).toBeInTheDocument();
    
    // Switch back to DE
    fireEvent.click(screen.getByText('DE'));
    expect(screen.getByText('Zentraler Grenzwertsatz')).toBeInTheDocument();
  });

  it('updates state when controls are used', () => {
    render(<CLTView />);
    
    // 1. Check initial state n=1
    // The label text includes the value: "Anzahl Würfel pro Wurf: 1"
    expect(screen.getByText('Anzahl Würfel pro Wurf: 1')).toBeInTheDocument();
    
    // 2. Change Slider
    const slider = screen.getByLabelText(/Anzahl Würfel pro Wurf/);
    fireEvent.change(slider, { target: { value: '5' } });
    
    expect(screen.getByText('Anzahl Würfel pro Wurf: 5')).toBeInTheDocument();
    
    // 3. Run Simulation (Throw 1x)
    fireEvent.click(screen.getByText('Wurf 1x'));
    
    // Trials should update in StatsOverlay. Initial is 0, now 1.
    // The StatsOverlay displays trials count. We can find it by looking for the row.
    // Or we can just check if "1" appears in the trials section.
    // Given the DOM structure, looking for the value 1 near "Versuche" might be loose,
    // but in integration tests, checking effects is key.
    
    // StatsOverlay has: <div className="text-gray-600 font-medium mt-1">{t.trials}</div>
    // followed by <div ...>{totalTrials}</div>
    expect(screen.getByText('Versuche')).toBeInTheDocument();
    // Use a regex to find the count if needed, or specific testid.
    // Simpler: Just check if Reset button becomes enabled (it is disabled when trials=0)
    
    const resetBtn = screen.getByText('Zurücksetzen');
    expect(resetBtn).toBeEnabled();
    
    // 4. Reset
    fireEvent.click(resetBtn);
    expect(screen.getByText('Zurücksetzen')).toBeDisabled();
  });
});