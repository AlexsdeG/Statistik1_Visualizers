import React from 'react';
import { Point } from '../hooks/useRegression';

interface ScatterPlotProps {
  points: Point[];
  regressionLine?: { m: number; b: number } | null;
  className?: string;
  onMapClick?: (point: Point) => void;
  onPointRemove?: (index: number) => void;
  showResiduals?: boolean;
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({ 
  points, 
  regressionLine, 
  className,
  onMapClick,
  onPointRemove,
  showResiduals = false
}) => {
  // Domain definition: x[-1, 11], y[-1, 11]
  const minX = -1, maxX = 11;
  const minY = -1, maxY = 11;
  
  // SVG internal coordinate system
  const width = 100;
  const height = 100;

  // Transform functions (Data -> SVG %)
  const toPercentX = (x: number) => ((x - minX) / (maxX - minX)) * 100;
  const toPercentY = (y: number) => 100 - ((y - minY) / (maxY - minY)) * 100;

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!onMapClick) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const xPixel = e.clientX - rect.left;
    const yPixel = e.clientY - rect.top;

    // Convert pixel to percentage (0-1)
    const xPct = xPixel / rect.width;
    const yPct = yPixel / rect.height;

    // Convert percentage to data coordinates
    // x = minX + pct * range
    const x = minX + xPct * (maxX - minX);
    // y: SVG y is inverted. yPct 0 is Top (MaxY), yPct 1 is Bottom (MinY)
    // y = MaxY - pct * range
    const y = maxY - yPct * (maxY - minY);

    onMapClick({ x, y });
  };

  const handlePointContextMenu = (e: React.MouseEvent, index: number) => {
    if (onPointRemove) {
      e.preventDefault();
      e.stopPropagation();
      onPointRemove(index);
    }
  };

  return (
    <div className={`aspect-square w-full relative bg-white border border-gray-200 rounded-xl shadow-inner overflow-hidden ${className || ''}`}>
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className={`w-full h-full overflow-visible ${onMapClick ? 'cursor-crosshair' : ''}`}
        onClick={handleSvgClick}
      >
        {/* Invisible rect to capture clicks on empty space if needed, though svg handles it */}
        <rect x="0" y="0" width="100" height="100" fill="transparent" />

        {/* Grid lines */}
        <line x1={0} y1={toPercentY(0)} x2={100} y2={toPercentY(0)} stroke="#e5e7eb" strokeWidth="0.5" pointerEvents="none" />
        <line x1={toPercentX(0)} y1={0} x2={toPercentX(0)} y2={100} stroke="#e5e7eb" strokeWidth="0.5" pointerEvents="none" />

        {/* Residuals - Drawn behind points but related to line */}
        {showResiduals && regressionLine && points.map((p, i) => {
          const predictedY = regressionLine.m * p.x + regressionLine.b;
          return (
            <line
              key={`resid-${i}`}
              x1={toPercentX(p.x)}
              y1={toPercentY(p.y)}
              x2={toPercentX(p.x)}
              y2={toPercentY(predictedY)}
              stroke="#f87171" // red-400
              strokeWidth="0.5"
              strokeDasharray="2 2"
              opacity="0.6"
              pointerEvents="none"
            />
          );
        })}

        {/* Regression Line - Drawn behind points */}
        {regressionLine && (
          <line
            x1={toPercentX(minX)}
            y1={toPercentY(regressionLine.m * minX + regressionLine.b)}
            x2={toPercentX(maxX)}
            y2={toPercentY(regressionLine.m * maxX + regressionLine.b)}
            stroke="#10b981" // emerald-500
            strokeWidth="1"
            strokeDasharray="4 2"
            opacity="0.8"
            pointerEvents="none"
          />
        )}

        {/* Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={toPercentX(p.x)}
            cy={toPercentY(p.y)}
            r="2" // Slightly larger for interaction
            className={`transition-all duration-300 ease-out ${onPointRemove ? 'cursor-pointer hover:fill-red-500' : ''}`}
            fill={onPointRemove ? "#4f46e5" : "#6366f1"} // indigo-600 vs 500
            fillOpacity="0.7"
            onContextMenu={(e) => handlePointContextMenu(e, i)}
          />
        ))}
      </svg>
      
      {/* Axis Labels */}
      <div className="absolute bottom-1 right-2 text-xs text-gray-400 font-mono pointer-events-none">X</div>
      <div className="absolute top-2 left-1 text-xs text-gray-400 font-mono pointer-events-none">Y</div>
    </div>
  );
};