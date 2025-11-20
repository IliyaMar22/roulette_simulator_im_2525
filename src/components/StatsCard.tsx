import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function StatsCard({ title, children, className = '', icon }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card-premium p-6 ${className}`}
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        {icon && <div className="text-accent-gold">{icon}</div>}
        <h3 className="text-lg font-bold text-text-primary">{title}</h3>
      </div>
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
}
