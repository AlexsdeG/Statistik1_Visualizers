import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScatterPlot } from './ScatterPlot';
import { StatsPanel } from './StatsPanel';
import { useRegression, Point } from '../hooks/useRegression';
import { usePointGenerator } from '../hooks/usePointGenerator';

export const SandboxBoard: React.FC = () => {
  const { t } = useTranslation();
  const [points, setPoints] = useState<Point[]>([]);
  const [showResiduals, setShowResiduals] = useState(false);
  const { generateCloud } = usePointGenerator();
  
  const stats = useRegression(points);

  const handleMapClick = (point: Point) => {
    setPoints(prev => [...prev, point]);
  };

  const handlePointRemove = (index: number) => {
    setPoints(prev => prev.filter((_, i) => i !== index));
  };

  const handleUndo = () => {
    setPoints(prev => prev.slice(0, -1));
  };

  const clearPoints = () => setPoints([]);

  const loadPreset = (type: string) => {
    let newPoints: Point[] = [];
    switch (type) {
      case 'parabola':
        // Parabola: y = 0.4*(x-5)^2 + 2
        for (let x = 1; x <= 9; x += 0.5) {
          const y = 0.4 * Math.pow(x - 5, 2) + 2;
          newPoints.push({ x, y });
        }
        break;
      case 'sine':
        // Sine wave: y = 3 * sin(x * pi/5) + 5
        // One full period from 0 to 10. r should be near 0.
        for (let x = 0; x <= 10; x += 0.2) {
          const y = 3 * Math.sin(x * (Math.PI / 5)) + 5;
          newPoints.push({ x, y });
        }
        break;
      case 'circle':
        // Circle centered at (5,5) radius 3
        for (let rad = 0; rad < 2 * Math.PI; rad += 0.2) {
          newPoints.push({
            x: 5 + 3 * Math.cos(rad),
            y: 5 + 3 * Math.sin(rad)
          });
        }
        break;
      case 'perfect':
        // Line y = x
        for (let x = 1; x <= 9; x += 1) {
          newPoints.push({ x, y: x });
        }
        break;
      case 'outlier':
        // Line y = x plus outlier at (9, 1)
        for (let x = 1; x <= 8; x += 1) {
          newPoints.push({ x, y: x });
        }
        newPoints.push({ x: 9, y: 1 });
        break;
      case 'random':
        newPoints = generateCloud(0.7, 30);
        break;
      case 'anscombe1':
        // Classic linear
        newPoints = [
          {x: 10, y: 8.04}, {x: 8, y: 6.95}, {x: 13, y: 7.58}, {x: 9, y: 8.81},
          {x: 11, y: 8.33}, {x: 14, y: 9.96}, {x: 6, y: 7.24}, {x: 4, y: 4.26},
          {x: 12, y: 10.84}, {x: 7, y: 4.82}, {x: 5, y: 5.68}
        ];
        break;
      case 'anscombe2':
        // Non-linear
        newPoints = [
          {x: 10, y: 9.14}, {x: 8, y: 8.14}, {x: 13, y: 8.74}, {x: 9, y: 8.77},
          {x: 11, y: 9.26}, {x: 14, y: 8.10}, {x: 6, y: 6.13}, {x: 4, y: 3.10},
          {x: 12, y: 9.13}, {x: 7, y: 7.26}, {x: 5, y: 4.74}
        ];
        break;
      case 'anscombe3':
        // Outlier
        newPoints = [
          {x: 10, y: 7.46}, {x: 8, y: 6.77}, {x: 13, y: 12.74}, {x: 9, y: 7.11},
          {x: 11, y: 7.81}, {x: 14, y: 8.84}, {x: 6, y: 6.08}, {x: 4, y: 5.39},
          {x: 12, y: 8.15}, {x: 7, y: 6.42}, {x: 5, y: 5.73}
        ];
        break;
      case 'anscombe4':
        // Vertical with one outlier
        newPoints = [
          {x: 8, y: 6.58}, {x: 8, y: 5.76}, {x: 8, y: 7.71}, {x: 8, y: 8.84},
          {x: 8, y: 8.47}, {x: 8, y: 7.04}, {x: 8, y: 5.25}, {x: 19, y: 12.50},
          {x: 8, y: 5.56}, {x: 8, y: 7.91}, {x: 8, y: 6.89}
        ];
        break;
      default:
        break;
    }
    setPoints(newPoints);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-8 animate-fade-in">
      {/* Left: Interactive Plot */}
      <div className="flex-1 w-full lg:max-w-2xl mx-auto space-y-4">
        <ScatterPlot 
          points={points} 
          regressionLine={stats.isValid ? { m: stats.m, b: stats.b } : null}
          onMapClick={handleMapClick}
          onPointRemove={handlePointRemove}
          showResiduals={showResiduals}
          className="shadow-lg border-2 border-indigo-50 hover:border-indigo-100 transition-colors"
        />
        <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
          <p>{t('correlation.click_hint')}</p>
          <div className="flex gap-2">
             <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1 rounded shadow-sm border border-gray-200 hover:bg-gray-50">
                <input 
                  type="checkbox" 
                  checked={showResiduals} 
                  onChange={(e) => setShowResiduals(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                {t('correlation.show_residuals')}
             </label>
          </div>
        </div>
      </div>

      {/* Right: Controls & Stats */}
      <div className="flex-1 w-full lg:max-w-xs flex flex-col gap-6">
        
        {/* Stats Panel */}
        <StatsPanel stats={stats} />

        {/* Presets Control */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-widest mb-4">
            {t('correlation.presets.title')}
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button onClick={() => loadPreset('perfect')} className="preset-btn">{t('correlation.presets.perfect')}</button>
            <button onClick={() => loadPreset('parabola')} className="preset-btn">{t('correlation.presets.parabola')}</button>
            <button onClick={() => loadPreset('sine')} className="preset-btn">{t('correlation.presets.sine')}</button>
            <button onClick={() => loadPreset('circle')} className="preset-btn">{t('correlation.presets.circle')}</button>
            <button onClick={() => loadPreset('outlier')} className="preset-btn">{t('correlation.presets.outlier')}</button>
            <button onClick={() => loadPreset('random')} className="preset-btn">{t('correlation.presets.random')}</button>
          </div>

          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 border-t border-gray-100 pt-3">
            Anscombe's Quartet
          </h4>
          <div className="grid grid-cols-2 gap-3">
             <button onClick={() => loadPreset('anscombe1')} className="preset-btn text-xs">{t('correlation.presets.anscombe1')}</button>
             <button onClick={() => loadPreset('anscombe2')} className="preset-btn text-xs">{t('correlation.presets.anscombe2')}</button>
             <button onClick={() => loadPreset('anscombe3')} className="preset-btn text-xs">{t('correlation.presets.anscombe3')}</button>
             <button onClick={() => loadPreset('anscombe4')} className="preset-btn text-xs">{t('correlation.presets.anscombe4')}</button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100 flex gap-2">
            <button 
              onClick={handleUndo}
              disabled={points.length === 0}
              className="flex-1 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {t('correlation.undo')}
            </button>
            <button 
              onClick={clearPoints}
              disabled={points.length === 0}
              className="flex-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {t('correlation.presets.clear')}
            </button>
          </div>
        </div>

      </div>
      <style>{`
        .preset-btn {
          @apply px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-200 transition-colors text-center;
        }
      `}</style>
    </div>
  );
};