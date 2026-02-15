export interface LorenzPoint {
  u: number; // Cumulative Population Share (0 to 1)
  v: number; // Cumulative Income Share (0 to 1)
}

export interface LorenzCalculationResult {
  sortedIncomes: number[];
  lorenzPoints: LorenzPoint[];
  gini: number;
  equalityPoints: LorenzPoint[];
}