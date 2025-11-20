import { motion } from 'framer-motion';
import { Square, Loader2 } from 'lucide-react';
import type { SimulationSize } from '../types';
import { SIMULATION_SIZES } from '../utils/constants';

interface SimulationControlsProps {
  isRunning: boolean;
  onRunSimulation: (size: SimulationSize) => void;
  onStopSimulation: () => void;
  progress: number;
}

export function SimulationControls({
  isRunning,
  onRunSimulation,
  onStopSimulation,
  progress
}: SimulationControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-premium p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Simulation Engine</h2>
          <p className="text-sm text-text-secondary">Run large-scale simulations to generate statistics</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {SIMULATION_SIZES.map(({ label, value }) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onRunSimulation(value as SimulationSize)}
            disabled={isRunning}
            className={`
              relative overflow-hidden px-6 py-4 rounded-xl font-semibold text-sm
              transition-all duration-200
              ${isRunning
                ? 'bg-secondary-bg/50 text-text-secondary cursor-not-allowed border border-white/5'
                : 'bg-gradient-to-br from-accent-gold/20 via-accent-gold/10 to-accent-green/10 hover:from-accent-gold/30 hover:via-accent-gold/20 hover:to-accent-green/20 text-text-primary border border-accent-gold/20 hover:border-accent-gold/40 shadow-lg hover:shadow-xl'
              }
            `}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isRunning && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{label}</span>
            </span>
            {isRunning && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-gold/10 to-accent-green/10"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>
      
      {isRunning && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-text-secondary font-medium">Simulation Progress</span>
            <span className="text-accent-gold font-bold">{progress.toFixed(1)}%</span>
          </div>
          <div className="relative w-full h-3 bg-secondary-bg rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-gold via-accent-gold to-accent-green rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" 
                   style={{ backgroundSize: '200% 100%' }} />
            </motion.div>
          </div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onStopSimulation}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600/20 to-red-500/20 hover:from-red-600/30 hover:to-red-500/30 border border-red-500/30 rounded-xl text-text-primary font-semibold transition-all"
          >
            <Square className="w-4 h-4" />
            Stop Simulation
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
