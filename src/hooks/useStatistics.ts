import { useMemo } from 'react';
import type { Statistics, SimulationResult } from '../types';
import { calculateStatistics } from '../utils/statisticsCalculator';

export function useStatistics(result: SimulationResult | null) {
  const statistics = useMemo<Statistics | null>(() => {
    if (!result || result.spins.length === 0) {
      return null;
    }
    
    return calculateStatistics(result.spins);
  }, [result]);

  return statistics;
}

