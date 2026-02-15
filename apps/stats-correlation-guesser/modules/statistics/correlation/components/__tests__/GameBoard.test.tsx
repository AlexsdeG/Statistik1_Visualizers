import React from 'react';
import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { GameBoard } from '../GameBoard';

// Mock translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // Return simple strings for testing based on key suffix
      if (key.includes('feedback.godlike')) return 'Godlike!';
      if (key.includes('feedback.try_again')) return 'Try again';
      if (key.includes('check')) return 'Check';
      if (key.includes('next')) return 'Next Round';
      return key;
    },
  }),
}));

// Mock hooks to control data
jest.mock('../../hooks/usePointGenerator', () => ({
  usePointGenerator: () => ({
    generateCloud: () => [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ],
  }),
}));

jest.mock('../../hooks/useRegression', () => ({
  useRegression: () => ({
    r: 1.0,
    m: 1.0,
    b: 0.0,
    isValid: true,
  }),
}));

describe('GameBoard', () => {
  it('renders correctly', () => {
    render(<GameBoard />);
    // Check for some main elements
    expect(screen.getByText('correlation.guess_r')).toBeDefined();
    expect(screen.getByText('Check')).toBeDefined();
  });

  it('allows user to guess and checks result', async () => {
    render(<GameBoard />);
    
    // Initial state: Not revealed, guess is 0
    const slider = screen.getByRole('slider') as HTMLInputElement;
    expect(slider.value).toBe("0");

    // Change guess to 1 (perfect guess for our mock data)
    fireEvent.change(slider, { target: { value: "1" } });
    expect(screen.getByText('1.00')).toBeDefined(); // Displays guess

    // Click Check
    const checkBtn = screen.getByText('Check');
    fireEvent.click(checkBtn);

    // Should reveal actual R (1.00) and feedback
    // The "1.00" might appear twice (guess and actual), so getAllByText
    const values = screen.getAllByText('1.00');
    expect(values.length).toBeGreaterThanOrEqual(2);
    
    // Feedback for perfect match
    expect(screen.getByText('Godlike!')).toBeDefined();
    
    // Check button should be gone, Next button appears
    expect(screen.queryByText('Check')).toBeNull();
    expect(screen.getByText('Next Round')).toBeDefined();
  });
});