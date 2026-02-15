/**
 * Calculates the theoretical mean of the sum of n dice.
 * Expected value of a single die is 3.5.
 * @param n Number of dice
 */
export const getTheoreticalMean = (n: number): number => {
  return n * 3.5;
};

/**
 * Calculates the theoretical standard deviation (sigma) of the sum of n dice.
 * Variance of a single die (1..6) is 35/12 (~2.917).
 * Sigma for sum of n independent variables is sqrt(n * single_variance).
 * @param n Number of dice
 */
export const getTheoreticalSigma = (n: number): number => {
  const singleVariance = 35 / 12;
  return Math.sqrt(n * singleVariance);
};

/**
 * Calculates the Probability Density Function (PDF) of a Normal Distribution.
 * @param x The random variable value
 * @param mu Mean
 * @param sigma Standard Deviation
 */
export const normalPDF = (x: number, mu: number, sigma: number): number => {
  if (sigma === 0) return 0; // Avoid division by zero
  const factor = 1 / (sigma * Math.sqrt(2 * Math.PI));
  const exponent = -0.5 * Math.pow((x - mu) / sigma, 2);
  return factor * Math.exp(exponent);
};
