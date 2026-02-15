import React, { createContext, useContext, useState, ReactNode } from 'react';

// Simple i18n dictionary
const translations = {
  en: {
    appTitle: "Statistics Distribution Zoo",
    appDescription: "Interactive explorer for statistical distributions (PMF & PDF).",
    controls: "Parameters",
    statistics: "Statistics",
    distributionType: "Distribution Type",
    range: "Range Calculation",
    calculateRange: "Calculate Range",
    probabilitySum: "Probability P",
    min: "From",
    max: "To",
    params_n: "n (Trials)",
    params_p: "p (Probability)",
    params_lambda: "λ (Rate)",
    params_mu: "μ (Mean)",
    params_sigma: "σ (Std Dev)",
    params_N: "N (Population)",
    params_M: "M (Successes in Pop)",
    params_k: "n (Draws)",
    params_r: "r (Successes needed)",
    params_alpha: "α / a (Shape)",
    params_beta: "β / b (Rate/Scale)",
    params_loc: "x₀ (Location)",
    params_scale: "γ (Scale)",
    probability: "Probability",
    showApproximation: "Show Normal Approximation",
    
    // Distribution Names
    dist_binomial: "Binomial Distribution",
    dist_poisson: "Poisson Distribution",
    dist_geometric: "Geometric Distribution",
    dist_hypergeometric: "Hypergeometric Distribution",
    dist_negative_binomial: "Negative Binomial Distribution",
    dist_discrete_uniform: "Discrete Uniform Distribution",
    dist_normal: "Normal Distribution",
    dist_continuous_uniform: "Continuous Uniform Distribution",
    dist_exponential: "Exponential Distribution",
    dist_gamma: "Gamma Distribution",
    dist_inverse_gamma: "Inverse Gamma Distribution",
    dist_beta: "Beta Distribution",
    dist_cauchy: "Cauchy Distribution",

    // Definitions
    def_binomial: "Models the number of successes in n independent Bernoulli trials with probability p.",
    def_poisson: "Models the number of events occurring in a fixed interval of time or space, given a constant mean rate λ.",
    def_geometric: "Models the number of trials needed to get the first success.",
    def_hypergeometric: "Models the number of successes in a sample of size n drawn without replacement from a population of size N containing M successes.",
    def_negative_binomial: "Models the number of trials required to achieve r successes.",
    def_discrete_uniform: "Models a finite number of outcomes which are equally likely to happen.",
    def_normal: "The most important continuous distribution. Symmetric, bell-shaped, described by mean μ and standard deviation σ.",
    def_continuous_uniform: "Models a continuous variable where any value in the interval [a, b] is equally likely.",
    def_exponential: "Models the time between events in a Poisson point process (events occur continuously and independently at a constant average rate).",
    def_gamma: "General family of distributions often used to model waiting times. The Exponential distribution is a special case (α=1).",
    def_inverse_gamma: "The distribution of the reciprocal of a variable distributed according to the Gamma distribution. Used in Bayesian statistics.",
    def_beta: "Defined on the interval [0, 1]. Often used to model probabilities or proportions.",
    def_cauchy: "A heavy-tailed distribution with undefined mean and variance. The ratio of two standard normal variables follows a Cauchy distribution.",

    // Formulas
    form_binomial: "P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}",
    form_poisson: "P(X=k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}",
    form_geometric: "P(X=k) = p(1-p)^{k-1}",
    form_hypergeometric: "P(X=k) = \\frac{\\binom{M}{k}\\binom{N-M}{n-k}}{\\binom{N}{n}}",
    form_negative_binomial: "P(X=k) = \\binom{k-1}{r-1} p^r (1-p)^{k-r}",
    form_discrete_uniform: "P(X=k) = \\frac{1}{n}",
    form_normal: "f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}(\\frac{x-\\mu}{\\sigma})^2}",
    form_continuous_uniform: "f(x) = \\frac{1}{b-a}",
    form_exponential: "f(x) = \\lambda e^{-\\lambda x}",
    form_gamma: "f(x) = \\frac{b^a}{\\Gamma(a)} x^{a-1} e^{-bx}",
    form_inverse_gamma: "f(x) = \\frac{b^a}{\\Gamma(a)} x^{-a-1} e^{-b/x}",
    form_beta: "f(x) = \\frac{1}{B(a,b)} x^{a-1} (1-x)^{b-1}",
    form_cauchy: "f(x) = \\frac{1}{\\pi \\gamma [1 + (\\frac{x-x_0}{\\gamma})^2]}",

    // Usage
    usage_binomial: "Coin flips, pass/fail tests, medical trials.",
    usage_poisson: "Phone calls per hour, decay of radioactive atoms, typos on a page.",
    usage_geometric: "Attempts until success, e.g., drilling for oil.",
    usage_hypergeometric: "Quality control (sampling without replacement), lotteries.",
    usage_negative_binomial: "Sales calls until r sales are made.",
    usage_discrete_uniform: "Rolling a fair die, drawing a card.",
    usage_normal: "Heights, IQ scores, errors in measurement (CLT).",
    usage_continuous_uniform: "Random number generation, simulation.",
    usage_exponential: "Lifetimes of electronics, time until next customer arrives.",
    usage_gamma: "Wait time for k events, rainfall amounts, insurance claims.",
    usage_inverse_gamma: "Prior conjugate for variance in Bayesian inference.",
    usage_beta: "Modeling uncertainty about a probability (e.g., conversion rates).",
    usage_cauchy: "Resonance in physics, robust statistics (outliers).",

    info_header: "Distribution Information",
    info_usage: "When to use?",
    info_formula: "Formula",
  },
  de: {
    appTitle: "Statistik Verteilungs-Zoo",
    appDescription: "Interaktiver Explorer für statistische Verteilungen (PMF & PDF).",
    controls: "Parameter",
    statistics: "Statistiken",
    distributionType: "Verteilungsart",
    range: "Bereich berechnen",
    calculateRange: "Bereich berechnen",
    probabilitySum: "Wahrscheinlichkeit P",
    min: "Von",
    max: "Bis",
    params_n: "n (Versuche)",
    params_p: "p (Wahrscheinlichkeit)",
    params_lambda: "λ (Rate)",
    params_mu: "μ (Erwartungswert)",
    params_sigma: "σ (Standardabw.)",
    params_N: "N (Population)",
    params_M: "M (Treffer in Pop)",
    params_k: "n (Züge)",
    params_r: "r (Benötigte Treffer)",
    params_alpha: "α / a (Form)",
    params_beta: "β / b (Rate/Skala)",
    params_loc: "x₀ (Lage)",
    params_scale: "γ (Skala)",
    probability: "Wahrscheinlichkeit",
    showApproximation: "Normal-Näherung anzeigen",

    // Names
    dist_binomial: "Binomialverteilung",
    dist_poisson: "Poissonverteilung",
    dist_geometric: "Geometrische Verteilung",
    dist_hypergeometric: "Hypergeometrische Verteilung",
    dist_negative_binomial: "Negative Binomialverteilung",
    dist_discrete_uniform: "Diskrete Gleichverteilung",
    dist_normal: "Normalverteilung",
    dist_continuous_uniform: "Stetige Gleichverteilung",
    dist_exponential: "Exponentialverteilung",
    dist_gamma: "Gammaverteilung",
    dist_inverse_gamma: "Invers-Gammaverteilung",
    dist_beta: "Betaverteilung",
    dist_cauchy: "Cauchy-Verteilung",

    // Definitions
    def_binomial: "Modelliert die Anzahl der Erfolge in n unabhängigen Bernoulli-Versuchen mit Wahrscheinlichkeit p.",
    def_poisson: "Modelliert die Anzahl der Ereignisse in einem festen Intervall, gegeben einer konstanten mittleren Rate λ.",
    def_geometric: "Modelliert die Anzahl der Versuche bis zum ersten Erfolg.",
    def_hypergeometric: "Modelliert Erfolge in einer Stichprobe n ohne Zurücklegen aus einer Population N mit M Erfolgen.",
    def_negative_binomial: "Modelliert die Anzahl der Versuche, die nötig sind, um r Erfolge zu erzielen.",
    def_discrete_uniform: "Modelliert eine endliche Anzahl von Ergebnissen, die alle gleich wahrscheinlich sind.",
    def_normal: "Die wichtigste stetige Verteilung. Symmetrisch, glockenförmig, bestimmt durch μ und σ.",
    def_continuous_uniform: "Modelliert eine stetige Variable, bei der jeder Wert im Intervall [a, b] gleich wahrscheinlich ist.",
    def_exponential: "Modelliert die Zeit zwischen Ereignissen in einem Poisson-Prozess.",
    def_gamma: "Allgemeine Familie für Wartezeiten. Die Exponentialverteilung ist ein Spezialfall (α=1).",
    def_inverse_gamma: "Die Verteilung des Kehrwerts einer Gamma-verteilten Variable. Oft in Bayes-Statistik genutzt.",
    def_beta: "Definiert auf dem Intervall [0, 1]. Modelliert oft Wahrscheinlichkeiten oder Anteile.",
    def_cauchy: "Eine 'Heavy-Tailed'-Verteilung ohne definierten Erwartungswert. Der Quotient zweier Standardnormalvariablen ist Cauchy-verteilt.",

    // Formulas (Mostly same, but labels might differ)
    form_binomial: "P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}",
    form_poisson: "P(X=k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}",
    form_geometric: "P(X=k) = p(1-p)^{k-1}",
    form_hypergeometric: "P(X=k) = \\frac{\\binom{M}{k}\\binom{N-M}{n-k}}{\\binom{N}{n}}",
    form_negative_binomial: "P(X=k) = \\binom{k-1}{r-1} p^r (1-p)^{k-r}",
    form_discrete_uniform: "P(X=k) = \\frac{1}{n}",
    form_normal: "f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}(\\frac{x-\\mu}{\\sigma})^2}",
    form_continuous_uniform: "f(x) = \\frac{1}{b-a}",
    form_exponential: "f(x) = \\lambda e^{-\\lambda x}",
    form_gamma: "f(x) = \\frac{b^a}{\\Gamma(a)} x^{a-1} e^{-bx}",
    form_inverse_gamma: "f(x) = \\frac{b^a}{\\Gamma(a)} x^{-a-1} e^{-b/x}",
    form_beta: "f(x) = \\frac{1}{B(a,b)} x^{a-1} (1-x)^{b-1}",
    form_cauchy: "f(x) = \\frac{1}{\\pi \\gamma [1 + (\\frac{x-x_0}{\\gamma})^2]}",

    // Usage
    usage_binomial: "Münzwürfe, Qualitätskontrolle (mit Zurücklegen), Ja/Nein-Tests.",
    usage_poisson: "Anrufe pro Stunde, radioaktiver Zerfall, Tippfehler pro Seite.",
    usage_geometric: "Bohrungen bis zum ersten Ölfund, Versuche bis zum Login.",
    usage_hypergeometric: "Lotto, Qualitätskontrolle (ohne Zurücklegen), Urnenmodelle.",
    usage_negative_binomial: "Verkaufsgespräche bis zum r-ten Abschluss.",
    usage_discrete_uniform: "Würfeln, Karten ziehen.",
    usage_normal: "Körpergrößen, Messfehler, IQ-Werte.",
    usage_continuous_uniform: "Zufallszahlengenerierung, Simulationen.",
    usage_exponential: "Lebensdauer von Bauteilen, Wartezeit auf nächsten Kunden.",
    usage_gamma: "Wartezeit auf k Ereignisse, Regenmengen, Schadenshöhen.",
    usage_inverse_gamma: "Konjugierte Prior-Verteilung für die Varianz in der Bayes-Statistik.",
    usage_beta: "Modellierung von Unsicherheit über Wahrscheinlichkeiten (z.B. Konversionsraten).",
    usage_cauchy: "Resonanz in der Physik, robuste Statistik (Ausreißer).",

    info_header: "Verteilungs-Informationen",
    info_usage: "Wann verwenden?",
    info_formula: "Formel",
  }
};

type Language = keyof typeof translations;
type TranslationKey = keyof typeof translations['en'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as TranslationKey] || key;
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
