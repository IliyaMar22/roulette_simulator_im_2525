import { useMemo } from 'react';
import type { RouletteNumber, PredictionResult, Statistics } from '../types';
import { generatePrediction } from '../utils/predictionAlgorithm';

export function usePrediction(
  inputNumber: RouletteNumber | null,
  statistics: Statistics | null,
  recentSpins: RouletteNumber[]
) {
  const prediction = useMemo<PredictionResult | null>(() => {
    if (!statistics) {
      return null;
    }
    
    return generatePrediction(inputNumber, statistics, recentSpins);
  }, [inputNumber, statistics, recentSpins]);

  return prediction;
}

