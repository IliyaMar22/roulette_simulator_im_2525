import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-strong border-b border-white/10 sticky top-0 z-50"
    >
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-gold to-accent-green rounded-full blur-md opacity-30" />
              <Sparkles className="w-10 h-10 text-accent-gold relative z-10" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold gradient-text-gold tracking-tight">
                European Roulette
              </h1>
              <p className="text-xs text-text-secondary font-medium mt-0.5">
                Simulator & Prediction Engine
              </p>
            </div>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm font-semibold text-text-primary">Statistical Analysis</div>
              <div className="text-xs text-text-secondary">Real-time Predictions</div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
