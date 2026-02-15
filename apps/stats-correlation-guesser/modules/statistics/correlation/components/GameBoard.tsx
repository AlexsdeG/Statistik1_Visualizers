import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScatterPlot } from './ScatterPlot';
import { usePointGenerator } from '../hooks/usePointGenerator';
import { useRegression } from '../hooks/useRegression';

export const GameBoard: React.FC = () => {
  const { t } = useTranslation();
  const { generateCloud } = usePointGenerator();
  
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [guess, setGuess] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [targetR, setTargetR] = useState<number>(0);
  
  // Scoring state
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  
  const { r, m, b, isValid } = useRegression(points);

  const startNewRound = () => {
    let randomR = (Math.random() * 2) - 1;
    randomR = Math.round(randomR * 100) / 100;
    
    setTargetR(randomR);
    const newPoints = generateCloud(randomR, 50);
    setPoints(newPoints);
    setGuess(0);
    setIsRevealed(false);
    setFeedback('');
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleCheck = () => {
    const diff = Math.abs(guess - r);
    setIsRevealed(true);
    
    let isGoodGuess = false;

    if (diff < 0.05) {
      setFeedback('godlike');
      isGoodGuess = true;
    } else if (diff < 0.15) {
      setFeedback('great');
      isGoodGuess = true;
    } else if (diff < 0.3) {
      setFeedback('good');
      isGoodGuess = true;
    } else {
      setFeedback('try_again');
      isGoodGuess = false;
    }

    if (isGoodGuess) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
    } else {
      setStreak(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-8 animate-fade-in">
      {/* Left: Plot Area */}
      <div className="flex-1 w-full max-w-lg mx-auto">
        <div className="mb-4 flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
           <div className="text-center">
             <p className="text-xs text-gray-500 uppercase font-bold">{t('correlation.streak')}</p>
             <p className="text-2xl font-mono font-bold text-indigo-600">{streak} 🔥</p>
           </div>
           <div className="text-center">
             <p className="text-xs text-gray-500 uppercase font-bold">{t('correlation.high_score')}</p>
             <p className="text-2xl font-mono font-bold text-gray-600">{bestStreak}</p>
           </div>
        </div>

        <ScatterPlot 
          points={points} 
          regressionLine={isRevealed && isValid ? { m, b } : null} 
          className="shadow-lg"
        />
      </div>

      {/* Right: Controls Area */}
      <div className="flex-1 flex flex-col justify-center space-y-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center space-y-2">
          <h2 className="text-lg uppercase tracking-wider text-gray-500 font-semibold">{t('correlation.guess_r')}</h2>
          <div className={`text-5xl font-mono font-bold transition-all duration-500 ${isRevealed ? 'text-indigo-600 scale-110' : 'text-gray-300'}`}>
             {isRevealed ? r.toFixed(2) : "?"}
          </div>
          <div className="h-8">
            {isRevealed && (
              <p className={`text-xl font-bold animate-bounce ${
                feedback === 'godlike' ? 'text-purple-600' :
                feedback === 'great' ? 'text-green-600' :
                feedback === 'good' ? 'text-blue-600' : 'text-orange-500'
              }`}>
                {t(`correlation.feedback.${feedback}`)}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative pt-6">
            <div className="flex justify-between text-xs text-gray-400 font-mono mb-2 uppercase">
              <span>Negative (-1)</span>
              <span>No Corr (0)</span>
              <span>Positive (+1)</span>
            </div>
            
            <input 
              type="range" 
              min="-1" 
              max="1" 
              step="0.01" 
              value={guess}
              onChange={(e) => setGuess(parseFloat(e.target.value))}
              disabled={isRevealed}
              className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
            />
            
            {/* Markers on the slider track */}
            <div className="absolute top-9 left-1/2 w-0.5 h-2 bg-gray-300 -translate-x-1/2"></div>
          </div>
          
          <div className="text-center">
             <span className="text-sm text-gray-500">{t('correlation.your_guess')}:</span>
             <span className="ml-2 text-2xl font-bold text-gray-800">{guess.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          {!isRevealed ? (
            <button 
              onClick={handleCheck}
              className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:bg-indigo-700 active:scale-95 transition-all"
            >
              {t('correlation.check')}
            </button>
          ) : (
            <button 
              onClick={startNewRound}
              className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:bg-gray-800 active:scale-95 transition-all"
            >
              {t('correlation.next')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};