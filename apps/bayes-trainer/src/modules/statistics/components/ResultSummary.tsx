import React from 'react';
import { useBayesLogic } from '../hooks/useBayesLogic';
import { useLanguage } from '@/context/LanguageContext';
import { TextWithHighlight } from '@/components/TextWithHighlight';

type BayesResult = ReturnType<typeof useBayesLogic>;

interface ResultSummaryProps {
  results: BayesResult;
}

export const ResultSummary: React.FC<ResultSummaryProps> = ({ results }) => {
  const { tp, fn, fp, totalPopulation, ppv } = results;
  const { t } = useLanguage();

  // Total sick = TP + FN
  const sickCount = tp + fn;

  // Total alarms (Test Positive) = TP + FP
  const alarmCount = tp + fp;

  const ppvPercent = (ppv * 100).toFixed(1);

  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center">
        <span className="text-2xl mr-2">📊</span> {t.summary}
      </h3>

      <div className="space-y-4 text-gray-800">
        <p className="flex items-start">
          <span className="font-bold text-indigo-600 w-24 shrink-0">{t.populationLabel}</span>
          <span>
            <TextWithHighlight
              text={t.populationDesc}
              replacements={{ total: totalPopulation, sick: sickCount }}
            />
          </span>
        </p>

        <p className="flex items-start">
          <span className="font-bold text-red-600 w-24 shrink-0">{t.testLabel}</span>
          <span>
            <TextWithHighlight
              text={t.testDesc}
              replacements={{ alarm: alarmCount }}
            />
          </span>
        </p>

        <p className="flex items-start">
          <span className="font-bold text-teal-600 w-24 shrink-0">{t.errorLabel}</span>
          <span>
            <TextWithHighlight
              text={t.errorDesc}
              replacements={{ fp: fp }}
            />
          </span>
        </p>

        <div className="mt-6 pt-4 border-t border-indigo-200">
          <p className="text-sm text-indigo-800 uppercase font-bold mb-1">
            {t.ppvLabel}
          </p>
          <div className="flex items-baseline">
            <span className="text-4xl font-extrabold text-indigo-700 mr-3" data-testid="ppv-display">
              {ppvPercent}%
            </span>
            <span className="text-indigo-600">
              {t.ppvDesc}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
