export type Language = 'en' | 'de';

export type TranslationKey = 
  | 'app.title'
  | 'lorenz.title'
  | 'lorenz.subtitle'
  | 'lorenz.presets.equality'
  | 'lorenz.presets.pareto'
  | 'lorenz.presets.extreme'
  | 'lorenz.presets.desc.equality'
  | 'lorenz.presets.desc.pareto'
  | 'lorenz.presets.desc.extreme'
  | 'lorenz.gini.label'
  | 'lorenz.chart.title'
  | 'lorenz.chart.subtitle'
  | 'lorenz.explanation.intro'
  | 'lorenz.explanation.diagonal'
  | 'lorenz.explanation.red_area'
  | 'lorenz.explanation.gini_formula'
  | 'lorenz.math_note'
  | 'inputs.title'
  | 'inputs.subtitle'
  | 'sorted.title'
  | 'sorted.subtitle'
  | 'chart.equality_label'
  | 'chart.axis_x'
  | 'chart.axis_y'
  | 'interpretation.low'
  | 'interpretation.medium'
  | 'interpretation.high'
  | 'interpretation.extreme';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    'app.title': 'Stats Playground',
    'lorenz.title': 'Lorenz Curve Constructor',
    'lorenz.subtitle': 'Construct the curve by adjusting incomes. Watch the red area (Inequality) grow.',
    'lorenz.presets.equality': 'Perfect Equality',
    'lorenz.presets.pareto': '80/20 Rule',
    'lorenz.presets.extreme': 'Extreme Wealth',
    'lorenz.presets.desc.equality': 'Everyone earns the same',
    'lorenz.presets.desc.pareto': '20% of people own 80% of wealth',
    'lorenz.presets.desc.extreme': 'One person owns everything',
    'lorenz.gini.label': 'Gini Index',
    'lorenz.chart.title': '3. Lorenz Curve',
    'lorenz.chart.subtitle': 'Area A = {area} (Red)',
    'lorenz.explanation.intro': 'The Lorenz Curve (blue) connects the cumulative population share (u) to the cumulative income share (v).',
    'lorenz.explanation.diagonal': 'Diagonal: Perfect equality (v=u).',
    'lorenz.explanation.red_area': 'Red Area (A): Represents the gap between equality and reality.',
    'lorenz.explanation.gini_formula': 'Gini = 2 × Area A. Larger area = Higher inequality.',
    'lorenz.math_note': 'Math Note: For a small population of 5, the maximum possible Gini coefficient (where one person has everything) is 0.80, not 1.00. This is because G_max = (n-1)/n.',
    'inputs.title': '1. Your Input',
    'inputs.subtitle': 'Raw Data',
    'sorted.title': '2. Sorted',
    'sorted.subtitle': 'For Lorenz Calc',
    'chart.equality_label': 'Perfect Equality',
    'chart.axis_x': 'Pop. Share (u)',
    'chart.axis_y': 'Income Share (v)',
    'interpretation.low': 'Low Inequality',
    'interpretation.medium': 'Medium Inequality',
    'interpretation.high': 'High Inequality',
    'interpretation.extreme': 'Extreme Inequality',
  },
  de: {
    'app.title': 'Statistik Spielplatz',
    'lorenz.title': 'Lorenzkurve Konstruktor',
    'lorenz.subtitle': 'Erstelle die Kurve durch Anpassen der Einkommen. Beobachte, wie die rote Fläche (Ungleichheit) wächst.',
    'lorenz.presets.equality': 'Perfekte Gleichheit',
    'lorenz.presets.pareto': '80/20 Regel',
    'lorenz.presets.extreme': 'Extremer Reichtum',
    'lorenz.presets.desc.equality': 'Jeder verdient das Gleiche',
    'lorenz.presets.desc.pareto': '20% der Menschen besitzen 80% des Vermögens',
    'lorenz.presets.desc.extreme': 'Eine Person besitzt alles',
    'lorenz.gini.label': 'Gini-Koeffizient',
    'lorenz.chart.title': '3. Lorenzkurve',
    'lorenz.chart.subtitle': 'Fläche A = {area} (Rot)',
    'lorenz.explanation.intro': 'Die Lorenzkurve (blau) verbindet den kumulierten Bevölkerungsanteil (u) mit dem kumulierten Einkommensanteil (v).',
    'lorenz.explanation.diagonal': 'Diagonale: Perfekte Gleichheit (v=u).',
    'lorenz.explanation.red_area': 'Rote Fläche (A): Repräsentiert die Lücke zwischen Gleichheit und Realität.',
    'lorenz.explanation.gini_formula': 'Gini = 2 × Fläche A. Größere Fläche = Höhere Ungleichheit.',
    'lorenz.math_note': 'Mathe-Notiz: Bei einer kleinen Population von 5 beträgt der maximal mögliche Gini-Koeffizient 0,80, nicht 1,00. Grund: G_max = (n-1)/n.',
    'inputs.title': '1. Deine Eingabe',
    'inputs.subtitle': 'Rohdaten',
    'sorted.title': '2. Sortiert',
    'sorted.subtitle': 'Für Lorenz-Berechnung',
    'chart.equality_label': 'Perfekte Gleichheit',
    'chart.axis_x': 'Bevölkerung (u)',
    'chart.axis_y': 'Einkommen (v)',
    'interpretation.low': 'Geringe Ungleichheit',
    'interpretation.medium': 'Mittlere Ungleichheit',
    'interpretation.high': 'Hohe Ungleichheit',
    'interpretation.extreme': 'Extreme Ungleichheit',
  }
};