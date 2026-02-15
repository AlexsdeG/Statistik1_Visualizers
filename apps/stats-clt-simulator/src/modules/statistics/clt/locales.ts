// I18n keys for the CLT Simulator module
// These will be used in Phase 2 & 3 for UI components

export const cltLocales = {
  en: {
    title: "Central Limit Theorem",
    controls: {
      nLabel: "Dice per Throw",
      throw1: "Throw 1x",
      throw100: "Throw 100x",
      throw1000: "Throw 1000x",
      reset: "Reset",
      resetWarning: "Data will be reset"
    },
    stats: {
      comparison: "Empirical vs. Theoretical",
      empirical: "Empirical",
      theoretical: "Theoretical",
      mean: "Mean (μ)",
      sigma: "Std Dev (σ)",
      trials: "Trials"
    },
    tips: {
      intro: "Set n=1 (Uniform Distribution) and then n=30 (Bell Curve). Do you see the difference?"
    }
  },
  de: {
    title: "Zentraler Grenzwertsatz",
    controls: {
      nLabel: "Anzahl Würfel pro Wurf",
      throw1: "Wurf 1x",
      throw100: "Wurf 100x",
      throw1000: "Wurf 1000x",
      reset: "Zurücksetzen",
      resetWarning: "Daten werden zurückgesetzt"
    },
    stats: {
      comparison: "Empirisch vs. Theoretisch",
      empirical: "Empirisch",
      theoretical: "Theoretisch",
      mean: "Mittelwert (μ)",
      sigma: "StdAbw (σ)",
      trials: "Versuche"
    },
    tips: {
      intro: "Setze n=1 (Gleichverteilung) und dann n=30 (Glocke). Siehst du den Unterschied?"
    }
  }
};