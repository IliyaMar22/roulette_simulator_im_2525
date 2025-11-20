import { motion } from 'framer-motion';
import type { RouletteNumber } from '../types';
import { getColor, ROULETTE_NUMBERS } from '../utils/constants';

interface RouletteWheelProps {
  selectedNumber?: RouletteNumber | null;
  onNumberClick?: (number: RouletteNumber) => void;
  recentSpins?: RouletteNumber[];
}

export function RouletteWheel({ selectedNumber, onNumberClick, recentSpins = [] }: RouletteWheelProps) {
  const wheelOrder = ROULETTE_NUMBERS;
  
  return (
    <div className="card-premium p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Roulette Wheel</h2>
        <p className="text-sm text-text-secondary">Click numbers to select</p>
      </div>
      
      <div className="relative w-full max-w-lg mx-auto">
        {/* Wheel Container with gradient border */}
        <div className="relative w-full aspect-square">
          {/* Outer gradient ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-gold/20 via-accent-green/10 to-accent-gold/20 p-1">
            <div className="w-full h-full rounded-full bg-primary-bg" />
          </div>
          
          {/* Numbers arranged in a circle */}
          <div className="absolute inset-4">
            {wheelOrder.map((num, index) => {
              const color = getColor(num);
              const angle = (index / wheelOrder.length) * 360;
              const radius = 42;
              const x = 50 + radius * Math.cos((angle - 90) * Math.PI / 180);
              const y = 50 + radius * Math.sin((angle - 90) * Math.PI / 180);
              
              const isSelected = selectedNumber === num;
              const isRecent = recentSpins.slice(-5).includes(num);
              
              return (
                <motion.button
                  key={num}
                  onClick={() => onNumberClick?.(num)}
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    absolute w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm
                    transform -translate-x-1/2 -translate-y-1/2
                    transition-all duration-200
                    ${color === 'red' 
                      ? 'bg-gradient-to-br from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 border-2 border-red-400/50 text-white shadow-lg shadow-red-500/30' 
                      : color === 'black'
                      ? 'bg-gradient-to-br from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border-2 border-gray-600/50 text-white shadow-lg shadow-gray-600/30'
                      : 'bg-gradient-to-br from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 border-2 border-green-400/50 text-white shadow-lg shadow-green-500/30'
                    }
                    ${isSelected ? 'ring-4 ring-accent-gold ring-offset-2 ring-offset-card-bg scale-125 z-20 shadow-2xl' : ''}
                    ${isRecent ? 'ring-2 ring-accent-gold/70' : ''}
                  `}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`
                  }}
                >
                  {num}
                </motion.button>
              );
            })}
          </div>
          
          {/* Center circle with gradient */}
          <div className="absolute inset-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-card-bg to-secondary-bg border-4 border-accent-gold/30 flex items-center justify-center shadow-2xl">
            <div className="text-center">
              <div className="text-xs text-text-secondary font-semibold tracking-wider mb-1">EUROPEAN</div>
              <div className="text-2xl font-bold gradient-text-gold">0-36</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-8 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-600 to-red-500 border border-red-400/50" />
          <span className="text-text-secondary font-medium">Red</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-600/10 border border-gray-600/20">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600/50" />
          <span className="text-text-secondary font-medium">Black</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-600 to-green-500 border border-green-400/50" />
          <span className="text-text-secondary font-medium">Zero</span>
        </div>
      </div>
    </div>
  );
}
