import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Plus, History } from 'lucide-react';
import type { RouletteNumber } from '../types';
import { getColor, ROULETTE_NUMBERS } from '../utils/constants';

interface NumberInputProps {
  onNumberSelect: (number: RouletteNumber) => void;
  history: RouletteNumber[];
}

export function NumberInput({ onNumberSelect, history }: NumberInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(inputValue);
    
    if (isNaN(num) || num < 0 || num > 36) {
      setError('Please enter a number between 0 and 36');
      return;
    }
    
    setError('');
    onNumberSelect(num as RouletteNumber);
    setInputValue('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="card-premium p-6">
      <div className="flex items-center gap-3 mb-6">
        <Plus className="w-5 h-5 text-accent-gold" />
        <h2 className="text-xl font-bold text-text-primary">Enter Number</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <input
            type="number"
            min="0"
            max="36"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter 0-36"
            className="input-modern text-center text-3xl font-bold tracking-wider"
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-2 font-medium"
            >
              {error}
            </motion.p>
          )}
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Number
        </button>
      </form>
      
      {/* Quick Number Grid */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-text-secondary mb-4 flex items-center gap-2">
          <span>Quick Select</span>
        </h3>
        <div className="grid grid-cols-6 md:grid-cols-10 gap-2 max-h-48 overflow-y-auto p-2">
          {ROULETTE_NUMBERS.map((num) => {
            const color = getColor(num);
            const isRecent = history.slice(-5).includes(num);
            
            return (
              <motion.button
                key={num}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNumberSelect(num)}
                className={`
                  number-badge px-3 py-2 rounded-lg font-bold text-sm
                  ${color === 'red' 
                    ? 'bg-gradient-to-br from-red-600/30 to-red-500/20 hover:from-red-600/40 hover:to-red-500/30 border border-red-500/30 text-red-200' 
                    : color === 'black'
                    ? 'bg-gradient-to-br from-gray-800/30 to-gray-700/20 hover:from-gray-800/40 hover:to-gray-700/30 border border-gray-600/30 text-gray-200'
                    : 'bg-gradient-to-br from-green-600/30 to-green-500/20 hover:from-green-600/40 hover:to-green-500/30 border border-green-500/30 text-green-200'
                  }
                  ${isRecent ? 'ring-2 ring-accent-gold ring-offset-2 ring-offset-card-bg' : ''}
                  transition-all duration-200
                `}
              >
                {num}
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Recent History */}
      {history.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-text-secondary mb-3 flex items-center gap-2">
            <History className="w-4 h-4" />
            Recent Numbers
          </h3>
          <div className="flex gap-2 flex-wrap">
            {history.slice(-10).reverse().map((num, index) => {
              const color = getColor(num);
              return (
                <motion.div
                  key={`${num}-${index}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
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
        </div>
      )}
    </div>
  );
}
