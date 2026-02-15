import React, { useMemo } from 'react';
import { Mafs, Coordinates, Line, Polygon, Point, Theme, Text } from "mafs";
import { LorenzPoint } from "../types";
import { CHART_THEME } from "../constants";
import { useTranslation } from "../../../i18n/context";

interface LorenzPlotProps {
  lorenzPoints: LorenzPoint[];
  gini: number;
}

export const LorenzPlot: React.FC<LorenzPlotProps> = ({ lorenzPoints, gini }) => {
  const { t } = useTranslation();

  // Construct the polygon for Area A (The Gini Gap)
  // Area A is enclosed by:
  // 1. The Line of Equality: (0,0) to (1,1)
  // 2. The Lorenz Curve (backwards): (1,1) back to (0,0) via the points
  const areaAPoints = useMemo(() => {
    // Top edge: (0,0) -> (1,1)
    const topEdge: [number, number][] = [[0, 0], [1, 1]];
    
    // Bottom edge: The curve points reversed
    // lorenzPoints are sorted by u (0 to 1). We reverse them to go 1 to 0.
    const bottomEdge: [number, number][] = [...lorenzPoints]
      .reverse()
      .map(p => [p.u, p.v]);

    return [...topEdge, ...bottomEdge];
  }, [lorenzPoints]);

  return (
    <div className="w-full h-[400px] bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <Mafs
        viewBox={{ x: [-0.1, 1.1], y: [-0.1, 1.1] }}
        preserveAspectRatio={false}
        pan={false}
        zoom={false}
      >
        <Coordinates.Cartesian
          subdivisions={2}
        />

        {/* Diagonal: Line of Perfect Equality */}
        <Line.Segment
          point1={[0, 0]}
          point2={[1, 1]}
          style="dashed"
          color={CHART_THEME.equalityLineColor}
          opacity={0.5}
        />
        
        {/* Label for Equality Line */}
        <Text x={0.6} y={0.65} attach="nw" size={14} color={CHART_THEME.equalityLineColor}>
          {t('chart.equality_label')}
        </Text>

        {/* Area A (Gini Gap) */}
        <Polygon
          points={areaAPoints}
          color={CHART_THEME.areaColor}
          weight={0}
          fillOpacity={0.2}
        />

        {/* The Lorenz Curve (Piecewise Linear) */}
        {/* We draw segments between points because Mafs Polyline might vary by version/export */}
        {lorenzPoints.map((p, i) => {
          if (i === 0) return null;
          const prev = lorenzPoints[i - 1];
          return (
            <Line.Segment
              key={i}
              point1={[prev.u, prev.v]}
              point2={[p.u, p.v]}
              color={CHART_THEME.lineColor}
              weight={3}
            />
          );
        })}

        {/* Points on the curve */}
        {lorenzPoints.map((p, i) => (
          <Point
            key={i}
            x={p.u}
            y={p.v}
            color={CHART_THEME.pointColor}
            opacity={i === 0 || i === lorenzPoints.length - 1 ? 1 : 0.6}
          />
        ))}

        {/* Axis Labels */}
        <Text x={1.05} y={-0.08} attach="ne" size={16}>
           {t('chart.axis_x')}
        </Text>
        <Text x={0.05} y={1.05} attach="nw" size={16}>
           {t('chart.axis_y')}
        </Text>
      </Mafs>
    </div>
  );
};