import { useState, useCallback } from 'react';

export interface CLTSimulationState {
  counts: Record<number, number>;
  totalTrials: number;
  n: number;
}

export interface CLTSimulationActions {
  runSimulation: (batchSize: number) => void;
  setN: (val: number) => void;
  reset: () => void;
}

export const useCLTSimulation = (initialN: number = 1): CLTSimulationState & CLTSimulationActions => {
  const [n, setNState] = useState<number>(initialN);
  const [counts, setCounts] = useState<Record<number, number>>({});
  const [totalTrials, setTotalTrials] = useState<number>(0);

  const reset = useCallback(() => {
    setCounts({});
    setTotalTrials(0);
  }, []);

  const setN = useCallback((val: number) => {
    if (val < 1) return;
    setNState(val);
    // Crucial: Changing n invalidates previous sums
    setCounts({});
    setTotalTrials(0);
  }, []);

  const runSimulation = useCallback((batchSize: number) => {
    if (batchSize <= 0) return;

    setCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      
      // Run batch loop
      for (let i = 0; i < batchSize; i++) {
        let sum = 0;
        // Roll n dice
        for (let d = 0; d < n; d++) {
          // Discrete Uniform 1..6
          sum += Math.floor(Math.random() * 6) + 1;
        }
        
        // Update frequency
        newCounts[sum] = (newCounts[sum] || 0) + 1;
      }
      
      return newCounts;
    });

    setTotalTrials((prev) => prev + batchSize);
  }, [n]);

  return {
    counts,
    totalTrials,
    n,
    runSimulation,
    setN,
    reset,
  };
};
