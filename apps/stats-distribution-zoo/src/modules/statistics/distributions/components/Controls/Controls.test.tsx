import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ParameterControls } from './ParameterControls';
import { RangeControls } from './RangeControls';
import { BinomialParams } from '../../types';

// Declare test globals
declare const describe: any;
declare const test: any;
declare const expect: any;
declare const jest: any;

describe('Control Components', () => {
  describe('ParameterControls', () => {
    test('renders sliders for Binomial', () => {
      const params: BinomialParams = { n: 10, p: 0.5 };
      const handleChange = jest.fn();
      
      render(
        <ParameterControls 
          type="binomial" 
          params={params} 
          onChange={handleChange} 
        />
      );

      // Check for labels
      expect(screen.getByText(/n \(Trials\)/i)).toBeTruthy();
      expect(screen.getByText(/p \(Probability\)/i)).toBeTruthy();

      // Check input existence
      const sliders = screen.getAllByRole('slider');
      expect(sliders).toHaveLength(2);
    });

    test('updates values correctly', () => {
      const params: BinomialParams = { n: 10, p: 0.5 };
      const handleChange = jest.fn();
      
      render(
        <ParameterControls 
          type="binomial" 
          params={params} 
          onChange={handleChange} 
        />
      );

      const sliders = screen.getAllByRole('slider');
      // Change first slider (n)
      fireEvent.change(sliders[0], { target: { value: 20 } });
      
      expect(handleChange).toHaveBeenCalledWith({ n: 20, p: 0.5 });
    });
  });

  describe('RangeControls', () => {
    test('renders inputs and probability', () => {
      const handleChange = jest.fn();
      render(
        <RangeControls 
          rangeStart={2} 
          rangeEnd={5} 
          domainMin={0} 
          domainMax={10} 
          isDiscrete={true} 
          onChange={handleChange}
          probabilitySum={0.5} 
        />
      );

      expect(screen.getByDisplayValue('2')).toBeTruthy();
      expect(screen.getByDisplayValue('5')).toBeTruthy();
      expect(screen.getByText('50.00%')).toBeTruthy();
    });

    test('handles input changes', () => {
      const handleChange = jest.fn();
      render(
        <RangeControls 
          rangeStart={2} 
          rangeEnd={5} 
          domainMin={0} 
          domainMax={10} 
          isDiscrete={true} 
          onChange={handleChange}
          probabilitySum={0.5} 
        />
      );

      const inputs = screen.getAllByRole('spinbutton'); // number inputs often role spinbutton
      fireEvent.change(inputs[0], { target: { value: '3' } });
      
      expect(handleChange).toHaveBeenCalledWith(3, 5);
    });
  });
});
