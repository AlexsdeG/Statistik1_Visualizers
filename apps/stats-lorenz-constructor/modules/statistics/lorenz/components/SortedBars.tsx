import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../../i18n/context';

interface SortedBarsProps {
  incomes: number[];
  max?: number;
}

export const SortedBars: React.FC<SortedBarsProps> = ({ incomes, max = 100 }) => {
  const { t } = useTranslation();
  
  // Map to objects with stable ID (original index) to track movements
  const sortedItems = useMemo(() => {
    return incomes
      .map((val, idx) => ({ id: idx, value: val }))
      .sort((a, b) => a.value - b.value);
  }, [incomes]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{t('sorted.title')}</h3>
        <span className="text-xs text-gray-400 font-mono">{t('sorted.subtitle')}</span>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-end justify-between gap-2 sm:gap-4">
         <AnimatePresence>
          {sortedItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative flex flex-col items-center w-full h-64"
            >
              {/* Value Label */}
              <div className="mb-2 text-sm font-bold text-gray-500 font-mono tabular-nums">
                {item.value}
              </div>

              {/* Bar */}
              <div className="w-full flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 relative">
                 <motion.div 
                    className="absolute bottom-0 left-0 w-full bg-indigo-300"
                    animate={{ height: `${Math.min(100, (item.value / max) * 100)}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                 />
              </div>

               {/* Original ID Tracking */}
               <motion.div 
                layout 
                className="mt-2 text-xs text-indigo-500 font-medium bg-indigo-50 px-1.5 py-0.5 rounded"
               >
                #{item.id + 1}
              </motion.div>
            </motion.div>
          ))}
         </AnimatePresence>
      </div>
    </div>
  );
};