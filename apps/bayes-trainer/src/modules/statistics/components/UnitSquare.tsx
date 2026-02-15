import React from 'react';
import { COLORS } from '@/theme/colors';

interface UnitSquareProps {
  prevalence: number;
  sensitivity: number;
  specificity: number;
}

export const UnitSquare: React.FC<UnitSquareProps> = ({
  prevalence,
  sensitivity,
  specificity,
}) => {
  // Convert 0-1 inputs to percentage-based coordinate system (0-100)
  const pWidth = prevalence * 100;
  const npWidth = 100 - pWidth;

  const sensHeight = sensitivity * 100;
  const fnHeight = 100 - sensHeight;

  // Specificity = TN rate.
  // FP rate = 1 - Specificity.
  // We place FP at the top (y=0) to align with TP (Positive Test Result) for easier comparison of the "Positive Row".
  const fpHeight = (1 - specificity) * 100;
  const tnHeight = specificity * 100;

  // Rect definitions
  // TP: Top Left
  const tp = { x: 0, y: 0, width: pWidth, height: sensHeight };
  // FN: Bottom Left
  const fn = { x: 0, y: sensHeight, width: pWidth, height: fnHeight };
  // FP: Top Right
  const fp = { x: pWidth, y: 0, width: npWidth, height: fpHeight };
  // TN: Bottom Right
  const tn = { x: pWidth, y: fpHeight, width: npWidth, height: tnHeight };

  // Minimum size for labels (percentage)
  const minLabelSize = 10;

  return (
    <div className="w-full aspect-square bg-white border border-gray-200 shadow-sm relative">
      <svg viewBox="0 0 100 100" className="w-full h-full block" preserveAspectRatio="none">
        {/* TP */}
        <rect {...tp} fill={COLORS.sick.primary} stroke="white" strokeWidth="0.5" data-testid="rect-tp" />
        {/* FN */}
        <rect {...fn} fill={COLORS.sick.secondary} stroke="white" strokeWidth="0.5" data-testid="rect-fn" />
        {/* FP */}
        <rect {...fp} fill={COLORS.healthy.primary} stroke="white" strokeWidth="0.5" data-testid="rect-fp" />
        {/* TN */}
        <rect {...tn} fill={COLORS.healthy.secondary} stroke="white" strokeWidth="0.5" data-testid="rect-tn" />

        {/* Labels - Centered in each rect */}
        {tp.width > minLabelSize && tp.height > minLabelSize && (
          <text x={tp.x + tp.width / 2} y={tp.y + tp.height / 2} textAnchor="middle" dominantBaseline="middle" fill={COLORS.text.tp} fontSize="4" fontWeight="bold">TP</text>
        )}
        {fn.width > minLabelSize && fn.height > minLabelSize && (
          <text x={fn.x + fn.width / 2} y={fn.y + fn.height / 2} textAnchor="middle" dominantBaseline="middle" fill={COLORS.text.fn} fontSize="4" fontWeight="bold">FN</text>
        )}
        {fp.width > minLabelSize && fp.height > minLabelSize && (
          <text x={fp.x + fp.width / 2} y={fp.y + fp.height / 2} textAnchor="middle" dominantBaseline="middle" fill={COLORS.text.fp} fontSize="4" fontWeight="bold">FP</text>
        )}
        {tn.width > minLabelSize && tn.height > minLabelSize && (
          <text x={tn.x + tn.width / 2} y={tn.y + tn.height / 2} textAnchor="middle" dominantBaseline="middle" fill={COLORS.text.tn} fontSize="4" fontWeight="bold">TN</text>
        )}
      </svg>
    </div>
  );
};
