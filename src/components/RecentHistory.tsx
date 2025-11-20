import { motion } from 'framer-motion';
import { History } from 'lucide-react';
import type { RouletteNumber } from '../types';
import { getColor } from '../utils/constants';

interface RecentHistoryProps {
  history: RouletteNumber[];
  maxDisplay?: number;
}

export function RecentHistory({ history, maxDisplay = 50 }: RecentHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  const displayHistory = history.slice(-maxDisplay).reverse();

  return (
    <div className="card-premium p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <History className="w-5 h-5 text-accent-gold" />
        <h2 className="text-xl font-bold text-text-primary">Recent Spins</h2>
        <span className="ml-auto text-sm text-text-secondary font-medium">
          {history.length} total
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {displayHistory.map((num, index) => {
          const color = getColor(num);
          return (
            <motion.div
              key={`${num}-${index}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.02 }}
              className={`
                number-badge w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg
                ${color === 'red' 
                  ? 'bg-gradient-to-br from-red-600/40 to-red-500/30 border-2 border-red-500/50 text-red-100 shadow-lg shadow-red-500/20' 
                  : color === 'black'
                  ? 'bg-gradient-to-br from-gray-800/40 to-gray-700/30 border-2 border-gray-600/50 text-gray-100 shadow-lg shadow-gray-600/20'
                  : 'bg-gradient-to-br from-green-600/40 to-green-500/30 border-2 border-green-500/50 text-green-100 shadow-lg shadow-green-500/20'
                }
              `}
            >
              {num}
            </motion.div>
          );
        })}
      </div>
      
      {history.length > maxDisplay && (
        <div className="mt-4 text-center text-sm text-text-secondary">
          Showing last {maxDisplay} of {history.length} spins
        </div>
      )}
    </div>
  );
}

