import { useMemo } from 'react';

interface BayesInputs {
  prevalence: number;
  sensitivity: number;
  specificity: number;
  populationSize?: number;
}

interface BayesProbabilities {
  tp: number;
  fn: number;
  fp: number;
  tn: number;
}

interface BayesResult {
  // Absolute counts (rounded for population grid)
  tp: number;
  fn: number;
  fp: number;
  tn: number;
  totalPopulation: number;

  // Raw probabilities (0-1) for analytic view
  probabilities: BayesProbabilities;

  // Derived metrics
  ppv: number; // Positive Predictive Value
  npv: number; // Negative Predictive Value
  probTestPos: number; // P(T+)
}

/**
 * Hook to calculate Bayesian statistics based on prevalence, sensitivity, and specificity.
 */
export const useBayesLogic = ({
  prevalence,
  sensitivity,
  specificity,
  populationSize = 1000,
}: BayesInputs): BayesResult => {
  // Boundary checks / Input Sanitization
  const p = Math.min(1, Math.max(0, prevalence));
  const sens = Math.min(1, Math.max(0, sensitivity));
  const spec = Math.min(1, Math.max(0, specificity));
  const pop = Math.max(1, populationSize);

  const result = useMemo(() => {
    // 1. Calculate raw probabilities (The Unit Square)
    // P(K) = prevalence
    // P(T+|K) = sensitivity
    // P(T-|!K) = specificity

    // TP Probability: Sick * Sensitivity
    const probTP = p * sens;

    // FN Probability: Sick * (1 - Sensitivity)
    const probFN = p * (1 - sens);

    // TN Probability: Healthy * Specificity
    // Healthy = 1 - prevalence
    const probTN = (1 - p) * spec;

    // FP Probability: Healthy * (1 - Specificity)
    const probFP = (1 - p) * (1 - spec);

    // 2. Calculate Counts (The Population Grid)
    const countTP = Math.round(probTP * pop);
    const countFN = Math.round(probFN * pop);
    const countTN = Math.round(probTN * pop);
    const countFP = Math.round(probFP * pop);

    const actualTotal = countTP + countFN + countTN + countFP;

    // 3. Derived Metrics
    // PPV = TP / (TP + FP)
    const totalPositive = probTP + probFP;
    const ppv = totalPositive > 1e-10 ? probTP / totalPositive : 0;

    // NPV = TN / (TN + FN)
    const totalNegative = probTN + probFN;
    const npv = totalNegative > 1e-10 ? probTN / totalNegative : 0;

    return {
      tp: countTP,
      fn: countFN,
      fp: countFP,
      tn: countTN,
      totalPopulation: actualTotal,
      probabilities: {
        tp: probTP,
        fn: probFN,
        fp: probFP,
        tn: probTN
      },
      ppv,
      npv,
      probTestPos: totalPositive
    };
  }, [p, sens, spec, pop]);

  return result;
};
