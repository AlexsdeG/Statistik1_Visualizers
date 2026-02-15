import React from 'react';
import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { CorrelationView } from '../../CorrelationView';

// Mock translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key.includes('game_mode')) return 'Game Mode';
      if (key.includes('sandbox_mode')) return 'Sandbox Mode';
      if (key.includes('info.toggle_show')) return 'Show Guide';
      if (key.includes('info.toggle_hide')) return 'Hide Guide';
      return key;
    },
  }),
}));

// Mock sub-components to focus on integration logic
jest.mock('../components/GameBoard', () => ({
  GameBoard: () => <div data-testid="game-board">Game Board Content</div>
}));

jest.mock('../components/SandboxBoard', () => ({
  SandboxBoard: () => <div data-testid="sandbox-board">Sandbox Board Content</div>
}));

jest.mock('../components/CorrelationInfo', () => ({
  CorrelationInfo: () => <div data-testid="correlation-info">Info Content</div>
}));

describe('CorrelationView', () => {
  it('renders Game Mode by default', () => {
    render(<CorrelationView />);
    expect(screen.getByTestId('game-board')).toBeDefined();
    expect(screen.queryByTestId('sandbox-board')).toBeNull();
  });

  it('switches between tabs', () => {
    render(<CorrelationView />);
    
    // Switch to Sandbox
    const sandboxTab = screen.getByText('Sandbox Mode');
    fireEvent.click(sandboxTab);
    
    expect(screen.queryByTestId('game-board')).toBeNull();
    expect(screen.getByTestId('sandbox-board')).toBeDefined();
    
    // Switch back to Game
    const gameTab = screen.getByText('Game Mode');
    fireEvent.click(gameTab);
    
    expect(screen.getByTestId('game-board')).toBeDefined();
    expect(screen.queryByTestId('sandbox-board')).toBeNull();
  });

  it('toggles the info guide', () => {
    render(<CorrelationView />);
    
    // Initially hidden
    expect(screen.queryByTestId('correlation-info')).toBeNull();
    expect(screen.getByText('Show Guide')).toBeDefined();
    
    // Show
    fireEvent.click(screen.getByText('Show Guide'));
    expect(screen.getByTestId('correlation-info')).toBeDefined();
    expect(screen.getByText('Hide Guide')).toBeDefined();
    
    // Hide
    fireEvent.click(screen.getByText('Hide Guide'));
    expect(screen.queryByTestId('correlation-info')).toBeNull();
  });
});