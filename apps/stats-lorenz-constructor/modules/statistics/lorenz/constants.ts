import { Theme } from "mafs";
import { TranslationKey } from "../../i18n/translations";

export const CHART_THEME = {
  lineColor: Theme.indigo,
  areaColor: Theme.red,
  equalityLineColor: "#888888",
  textColor: "#4b5563", // Gray-600
  gridColor: "#e5e7eb", // Gray-200
  pointColor: Theme.indigo,
};

// Return type now includes labelKey instead of raw label
export const getGiniInterpretation = (gini: number): { labelKey: TranslationKey; color: string; bg: string; border: string } => {
  if (gini < 0.25) return { labelKey: "interpretation.low", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
  if (gini < 0.40) return { labelKey: "interpretation.medium", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" };
  if (gini < 0.60) return { labelKey: "interpretation.high", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" };
  return { labelKey: "interpretation.extreme", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
};