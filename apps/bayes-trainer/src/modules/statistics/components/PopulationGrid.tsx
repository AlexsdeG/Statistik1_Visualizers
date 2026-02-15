import React, { useMemo } from 'react';
import { COLORS } from '@/theme/colors';

interface PopulationGridProps {
  tp: number;
  fn: number;
  fp: number;
  tn: number;
  onHover?: (category: 'tp' | 'fn' | 'fp' | 'tn' | null) => void;
  isLowPrevalence?: boolean;
}

export const PopulationGrid: React.FC<PopulationGridProps> = ({ tp, fn, fp, tn, onHover, isLowPrevalence = false }) => {
  const dots = useMemo(() => {
    const total = 1000;
    const d: string[] = [];

    // Fill array in specific order
    for (let i = 0; i < tp; i++) d.push('tp');
    for (let i = 0; i < fn; i++) d.push('fn');
    for (let i = 0; i < fp; i++) d.push('fp');
    for (let i = 0; i < tn; i++) d.push('tn');

    // Adjust length to exactly 1000
    while (d.length < total) d.push('tn'); // Default padding
    if (d.length > total) d.length = total;

    return d;
  }, [tp, fn, fp, tn]);

  const cols = 25;
  // rows = 40 (1000/25)

  // Use opacity to deemphasize grid when warning is active
  const containerClass = `w-full bg-gray-50 p-2 rounded border border-gray-200 shadow-inner transition-opacity duration-300 ${isLowPrevalence ? 'opacity-25 grayscale' : ''}`;

  return (
    <div
      className={containerClass}
      onMouseLeave={() => onHover?.(null)}
    >
      <svg viewBox="0 0 25 40" className="w-full h-auto block">
        {dots.map((type, i) => {
          const x = i % cols;
          const y = Math.floor(i / cols);

          let fill = 'none';
          let stroke = 'none';
          let strokeWidth = '0';
          let opacity = 1;

          switch (type) {
            case 'tp':
              fill = COLORS.sick.primary;
              break;
            case 'fn':
              fill = 'none';
              stroke = COLORS.sick.hollowStroke;
              strokeWidth = '0.6';
              break;
            case 'fp':
              fill = COLORS.healthy.primary;
              // Add a thin red stroke to indicate "Alarm" even though healthy
              stroke = COLORS.healthy.alarmStroke;
              strokeWidth = '0.3';
              break;
            case 'tn':
              fill = 'none';
              stroke = COLORS.healthy.hollowStroke;
              strokeWidth = '0.4';
              opacity = 0.4; // Faint
              break;
          }

          return (
            <circle
              key={i}
              cx={x + 0.5}
              cy={y + 0.5}
              r={0.4}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
              opacity={opacity}
              data-testid={`dot-${type}`}
              onMouseEnter={() => onHover?.(type as 'tp' | 'fn' | 'fp' | 'tn')}
            />
          );
        })}
      </svg>
    </div>
  );
};
