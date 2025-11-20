import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, TrendingDown, Target } from 'lucide-react';
import type { PredictionResult, RouletteNumber } from '../types';
import { getColor } from '../utils/constants';

interface PredictionPanelProps {
  prediction: PredictionResult | null;
  inputNumber: RouletteNumber | null;
}

export function PredictionPanel({ prediction, inputNumber }: PredictionPanelProps) {
  if (!prediction) {
    return (
      <div className="card-premium p-8">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-5 h-5 text-accent-gold" />
          <h2 className="text-xl font-bold text-text-primary">Prediction Engine</h2>
        </div>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔮</div>
          <p className="text-text-secondary text-lg font-medium">
            Run a simulation or enter numbers to see predictions
          </p>
        </div>
      </div>
    );
  }

  const topPrediction = prediction.topPredictions[0];

  return (
    <div className="card-premium p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <Sparkles className="w-5 h-5 text-accent-gold" />
        <h2 className="text-xl font-bold text-text-primary">Prediction Engine</h2>
      </div>
      
      {/* Main Prediction */}
      {topPrediction && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6 mb-8"
        >
          <div className="text-sm text-text-secondary font-medium uppercase tracking-wider">Most Probable Next Number</div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`
              mx-auto w-40 h-40 rounded-2xl flex items-center justify-center text-6xl font-bold
              shadow-2xl
              ${getColor(topPrediction.number) === 'red'
                ? 'bg-gradient-to-br from-red-600 to-red-500 border-4 border-red-400/50 text-white'
                : getColor(topPrediction.number) === 'black'
                ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-4 border-gray-600/50 text-white'
                : 'bg-gradient-to-br from-green-600 to-green-500 border-4 border-green-400/50 text-white'
              }
            `}
          >
            {topPrediction.number}
          </motion.div>
          <div className="space-y-3">
            <div className="text-3xl font-bold gradient-text-gold">
              {topPrediction.confidence.toFixed(0)}% Confidence
            </div>
            <div className="w-full max-w-xs mx-auto">
              <div className="relative w-full bg-secondary-bg rounded-full h-4 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-gold via-accent-gold to-accent-green rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${topPrediction.confidence}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
                       style={{ backgroundSize: '200% 100%' }} />
                </motion.div>
              </div>
            </div>
            <div className="text-sm text-text-secondary font-medium mt-4">
              {topPrediction.reasoning.join(' • ')}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Alternative Predictions */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-text-secondary mb-4 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Alternative Predictions
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {prediction.topPredictions.slice(1).map((pred: PredictionResult['topPredictions'][0], index: number) => {
            const color = getColor(pred.number);
            return (
              <motion.div
                key={pred.number}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  p-4 rounded-xl text-center border-2 transition-all
                  ${color === 'red'
                    ? 'bg-gradient-to-br from-red-600/20 to-red-500/10 border-red-500/30 hover:border-red-500/50'
                    : color === 'black'
                    ? 'bg-gradient-to-br from-gray-800/20 to-gray-700/10 border-gray-600/30 hover:border-gray-600/50'
                    : 'bg-gradient-to-br from-green-600/20 to-green-500/10 border-green-500/30 hover:border-green-500/50'
                  }
                `}
              >
                <div className="text-2xl font-bold mb-1">{pred.number}</div>
                <div className="text-xs text-text-secondary font-medium">
                  {pred.confidence.toFixed(0)}%
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Hot & Cold Numbers */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-sm font-semibold text-text-secondary mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-red-400" />
            Hot Numbers
          </h3>
          <div className="flex flex-wrap gap-2">
            {prediction.hotNumbers.map((num: RouletteNumber) => {
              const color = getColor(num);
              return (
                <div
                  key={num}
                  className={`
                    number-badge w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold
                    ${color === 'red'
                      ? 'bg-gradient-to-br from-red-600/40 to-red-500/30 border border-red-500/50 text-red-100'
                      : color === 'black'
                      ? 'bg-gradient-to-br from-gray-800/40 to-gray-700/30 border border-gray-600/50 text-gray-100'
                      : 'bg-gradient-to-br from-green-600/40 to-green-500/30 border border-green-500/50 text-green-100'
                    }
                  `}
                >
                  {num}
                </div>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-text-secondary mb-3 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-blue-400" />
            Cold Numbers
          </h3>
          <div className="flex flex-wrap gap-2">
            {prediction.coldNumbers.map((num: RouletteNumber) => {
              const color = getColor(num);
              return (
                <div
                  key={num}
                  className={`
                    number-badge w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold opacity-60
                    ${color === 'red'
                      ? 'bg-gradient-to-br from-red-600/20 to-red-500/10 border border-red-500/30 text-red-200'
                      : color === 'black'
                      ? 'bg-gradient-to-br from-gray-800/20 to-gray-700/10 border border-gray-600/30 text-gray-200'
                      : 'bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-500/30 text-green-200'
                    }
                  `}
                >
                  {num}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Neighbors */}
      {prediction.neighbors.length > 0 && inputNumber !== null && (
        <div>
          <h3 className="text-sm font-semibold text-text-secondary mb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-accent-gold" />
            Neighbors of {inputNumber}
          </h3>
          <div className="flex flex-wrap gap-2">
            {prediction.neighbors.map((num: RouletteNumber) => {
              const color = getColor(num);
              return (
                <div
                  key={num}
                  className={`
                    number-badge w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold
                    ${color === 'red'
                      ? 'bg-gradient-to-br from-red-600/50 to-red-500/40 border-2 border-accent-gold shadow-lg shadow-accent-gold/20'
                      : color === 'black'
                      ? 'bg-gradient-to-br from-gray-800/50 to-gray-700/40 border-2 border-accent-gold shadow-lg shadow-accent-gold/20'
                      : 'bg-gradient-to-br from-green-600/50 to-green-500/40 border-2 border-accent-gold shadow-lg shadow-accent-gold/20'
                    }
                  `}
                >
                  {num}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
