import React, { useMemo, useState } from 'react';
import { Mafs, Coordinates, Plot, Line, Point, Text, Theme, Polygon } from 'mafs';
import { DistributionData } from '../types';
import { normalPDF } from '../../../../lib/distribution-math';

interface Props {
  data: DistributionData;
  range: { min: number; max: number };
  showApproximation?: boolean;
  isRangeMode?: boolean;
  className?: string;
}

export const DistributionPlot: React.FC<Props> = ({ 
  data, 
  range, 
  showApproximation, 
  isRangeMode = true,
  className 
}) => {
  const { data: pmfData, pdfFunc, domain, stats, isDiscrete } = data;
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number, y: number } | null>(null);
  
  // Calculate ViewBox
  const maxY = useMemo(() => {
    let max = 0.5; // Default fallback
    if (isDiscrete && pmfData) {
      max = Math.max(...pmfData.map(d => d.y));
    } else if (!isDiscrete && pdfFunc) {
      // For Normal, peak is at mean. If mean is undefined (e.g. Cauchy), use center of domain.
      const center = typeof stats.mean === 'number' ? stats.mean : (domain.min + domain.max) / 2;
      max = pdfFunc(center);
    }
    // Add 20% padding to top
    return max * 1.2;
  }, [pmfData, pdfFunc, isDiscrete, stats, domain]);

  const xSpan = domain.max - domain.min;
  const xPadding = xSpan * 0.05; // 5% padding
  
  const viewBox = {
    x: [domain.min - xPadding, domain.max + xPadding] as [number, number],
    y: [-maxY * 0.1, maxY] as [number, number]
  };

  // Generate Polygon points for Continuous Area Shading
  const areaPolygonPoints = useMemo(() => {
    if (isDiscrete || !pdfFunc || !isRangeMode) return null;
    
    // Create ~50 points between min and max
    const points: [number, number][] = [];
    const steps = 50;
    const stepSize = (range.max - range.min) / steps;
    
    if (stepSize <= 0) return null;

    points.push([range.min, 0]);
    for (let i = 0; i <= steps; i++) {
      const x = range.min + i * stepSize;
      points.push([x, pdfFunc(x)]);
    }
    points.push([range.max, 0]);
    
    return points;
  }, [isDiscrete, pdfFunc, isRangeMode, range.min, range.max]);

  return (
    <div className={`w-full h-full border rounded-lg overflow-hidden bg-white shadow-inner ${className || 'min-h-[400px]'}`}>
      <Mafs viewBox={viewBox} pan={false} zoom={false}>
        <Coordinates.Cartesian 
          subdivisions={isDiscrete ? undefined : 2}
        />

        {/* Continuous Range Highlighting (Area) */}
        {!isDiscrete && areaPolygonPoints && (
          <Polygon
            points={areaPolygonPoints}
            color={Theme.orange}
            fillOpacity={0.3}
            strokeOpacity={0}
          />
        )}

        {/* Continuous PDF */}
        {!isDiscrete && pdfFunc && (
          <Plot.OfX
            y={(x) => pdfFunc(x)}
            color={Theme.blue}
            weight={3}
          />
        )}
        
        {/* Discrete PMF (Lollipop Chart) */}
        {isDiscrete && pmfData && pmfData.map((point) => {
          const isInRange = isRangeMode && point.x >= range.min && point.x <= range.max;
          const color = isInRange ? Theme.orange : Theme.blue;
          
          return (
            <React.Fragment key={point.x}>
              {/* Stem */}
              <Line.Segment
                point1={[point.x, 0]}
                point2={[point.x, point.y]}
                color={color}
                style="solid"
                opacity={0.8}
              />
              {/* Head */}
              <Point
                x={point.x}
                y={point.y}
                color={color}
              />
              {/* Hit Area for Hover - Transparent Overlay */}
              {/* Note: Using Point with transparent color to capture mouse events */}
              <g 
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer' }}
              >
                 <Point
                    x={point.x}
                    y={point.y}
                    color="transparent"
                 />
              </g>
            </React.Fragment>
          );
        })}

        {/* Normal Approximation Overlay */}
        {showApproximation && isDiscrete && typeof stats.mean === 'number' && typeof stats.stdDev === 'number' && (
          <Plot.OfX
            y={(x) => normalPDF(x, stats.mean as number, stats.stdDev as number)}
            color={Theme.red}
            opacity={0.4}
            weight={2}
            style="dashed"
          />
        )}

        {/* Interactive Tooltip */}
        {hoveredPoint && (
          <Text 
            x={hoveredPoint.x} 
            y={hoveredPoint.y + (maxY * 0.08)} 
            attach="s"
            size={14}
            color={Theme.foreground}
          >
            {`k=${hoveredPoint.x}, P=${(hoveredPoint.y * 100).toFixed(2)}%`}
          </Text>
        )}

        {/* Stats Annotations - Only show if not hovering to avoid clutter? Or always. */}
        {!hoveredPoint && typeof stats.mean === 'number' && (
           <Text x={stats.mean} y={maxY * 0.9} attach="n">
              μ = {stats.mean.toFixed(2)}
           </Text>
        )}

      </Mafs>
    </div>
  );
};