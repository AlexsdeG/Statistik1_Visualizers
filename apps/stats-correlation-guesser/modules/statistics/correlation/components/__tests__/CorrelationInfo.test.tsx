import React from 'react';
import { describe, it, expect, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { CorrelationInfo } from '../CorrelationInfo';

// Mock translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key.includes('title')) return 'Understanding Correlation';
      if (key.includes('description')) return 'Description text';
      return key;
    },
  }),
}));

describe('CorrelationInfo', () => {
  it('renders correctly', () => {
    render(<CorrelationInfo />);
    expect(screen.getByText('Understanding Correlation')).toBeDefined();
    expect(screen.getByText('Description text')).toBeDefined();
    // Check for scale markers
    expect(screen.getByText('-1')).toBeDefined();
    expect(screen.getByText('0')).toBeDefined();
    expect(screen.getByText('+1')).toBeDefined();
  });
});