import React, { useMemo } from 'react';
import { Mafs, Coordinates, Plot, Polygon, Theme } from 'mafs';
import { getTheoreticalMean, getTheoreticalSigma, normalPDF } from '../utils/clt-utils';

interface HistogramProps {
  counts: Record<number, number>;
  n: number;
  totalTrials: number;
}

export const Histogram: React.FC<HistogramProps> = ({ counts, n, totalTrials }) => {
  const { mu, sigma, minX, maxX, maxY, pdfFn, tickStep } = useMemo(() => {
    const mu = getTheoreticalMean(n);
    const sigma = getTheoreticalSigma(n);

    // Determine bounds
    const obsKeys = Object.keys(counts).map(Number);
    const minObs = obsKeys.length > 0 ? Math.min(...obsKeys) : mu;
    const maxObs = obsKeys.length > 0 ? Math.max(...obsKeys) : mu;

    // Theoretical range (mu +/- 4 sigma)
    const minTheo = mu - 4 * sigma;
    const maxTheo = mu + 4 * sigma;

    // Viewbox X range with padding
    const minX = Math.min(minObs, minTheo) - 1;
    const maxX = Math.max(maxObs, maxTheo) + 1;

    // Smart Axis Scaling
    const range = maxX - minX;
    let tickStep = 1;
    if (range > 60) {
      tickStep = 10;
    } else if (range > 25) {
      tickStep = 5;
    }

    // Determine Y Max
    const values = Object.values(counts) as number[];
    const maxCount = values.length > 0 ? Math.max(...values) : 0;
    // Theoretical Peak height = totalTrials * PDF(mu)
    // PDF(mu) = 1 / (sigma * sqrt(2pi))
    const theoPeak = totalTrials > 0
      ? totalTrials * normalPDF(mu, mu, sigma)
      : normalPDF(mu, mu, sigma) * 100; // fallback scale

    const maxY = Math.max(maxCount, theoPeak) * 1.1; // Add 10% headroom

    // Curve function
    const pdfFn = (x: number) => totalTrials * normalPDF(x, mu, sigma);

    return { mu, sigma, minX, maxX, maxY, pdfFn, tickStep };
  }, [counts, n, totalTrials]);

  // Convert counts to Polygons
  // Bars are centered on integer x. Width 1. Range [x-0.5, x+0.5]
  const bars = useMemo(() => {
    return Object.entries(counts).map(([xStr, y]) => {
      const x = Number(xStr);
      return (
        <Polygon
          key={x}
          points={[
            [x - 0.5, 0],
            [x + 0.5, 0],
            [x + 0.5, y as number],
            [x - 0.5, y as number],
          ]}
          color={Theme.blue}
          fillOpacity={0.4}
          strokeOpacity={0.8}
          weight={1}
        />
      );
    });
  }, [counts]);

  return (
    <div className="w-full h-full min-h-[300px] border border-gray-200 rounded-lg overflow-hidden bg-white">
      <Mafs
        viewBox={{ x: [minX, maxX], y: [0, Math.max(1, maxY)] }}
        preserveAspectRatio={false}
        pan={false}
        zoom={false}
        padding={{ top: 10, bottom: 30, left: 40, right: 10 }}
      >
        <Coordinates.Cartesian
          xAxis={{
            lines: tickStep,
            labels: (val) => val % tickStep === 0 ? val.toString() : ''
          }}
          yAxis={{
            lines: Math.max(1, Math.floor(maxY / 5)),
            labels: (val) => val.toString()
          }}
        />

        {/* Empirical Histogram */}
        {bars}

        {/* Theoretical Curve (Orange) */}
        {totalTrials > 0 && (
          <Plot.OfX
            y={pdfFn}
            color={Theme.orange}
            weight={3}
            opacity={0.8}
          />
        )}
      </Mafs>
    </div>
  );
};