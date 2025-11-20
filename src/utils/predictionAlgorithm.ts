import type {
  RouletteNumber,
  Prediction,
  PredictionResult,
  Statistics
} from '../types';
import { WHEEL_NEIGHBORS, getColor } from './constants';

export function generatePrediction(
  inputNumber: RouletteNumber | null,
  statistics: Statistics,
  recentSpins: RouletteNumber[]
): PredictionResult {
  if (!inputNumber && recentSpins.length === 0) {
    // No input, return based on overall statistics
    return generateGeneralPrediction(statistics);
  }
  
  const lastNumber = inputNumber !== null ? inputNumber : (recentSpins.length > 0 ? recentSpins[recentSpins.length - 1] : null);
  
  if (lastNumber === null) {
    return generateGeneralPrediction(statistics);
  }
  
  const topPredictions: Prediction[] = [];
  
  // Analyze multiple factors
  const hotNumbers = getHotNumbers(statistics, recentSpins);
  const coldNumbers = getColdNumbers(statistics, recentSpins);
  
  // Enhanced neighbor calculation (including wheel neighbors and mathematical neighbors)
  const wheelNeighbors = WHEEL_NEIGHBORS[lastNumber] || [];
  const mathNeighbors = [
    ((lastNumber - 2 + 37) % 37) as RouletteNumber,
    ((lastNumber - 1 + 37) % 37) as RouletteNumber,
    lastNumber,
    ((lastNumber + 1) % 37) as RouletteNumber,
    ((lastNumber + 2) % 37) as RouletteNumber
  ];
  const allNeighbors = [...new Set([...wheelNeighbors, ...mathNeighbors])];
  
  // Combine factors to generate predictions
  const candidateScores = new Map<RouletteNumber, number>();
  
  // Score based on hot numbers (higher weight for top hot numbers)
  hotNumbers.forEach((num, index) => {
    const score = (hotNumbers.length - index) * 12;
    candidateScores.set(num, (candidateScores.get(num) || 0) + score);
  });
  
  // Score based on wheel neighbors (physical neighbors get higher weight)
  wheelNeighbors.forEach(num => {
    candidateScores.set(num, (candidateScores.get(num) || 0) + 20);
  });
  
  // Score based on mathematical neighbors
  mathNeighbors.forEach((num, index) => {
    if (index === 2) return; // Skip the number itself
    candidateScores.set(num, (candidateScores.get(num) || 0) + 8);
  });
  
  // Score based on gap analysis (numbers that haven't appeared recently)
  const recentWindow = Math.min(50, recentSpins.length);
  statistics.numberFrequencies.forEach(freq => {
    if (freq.gap > recentWindow * 0.6) {
      candidateScores.set(freq.number, (candidateScores.get(freq.number) || 0) + 6);
    }
  });
  
  // Score based on color pattern (alternating colors)
  const lastColor = getColor(lastNumber);
  statistics.numberFrequencies.forEach(freq => {
    const freqColor = getColor(freq.number);
    if (freqColor !== lastColor && freqColor !== 'green') {
      candidateScores.set(freq.number, (candidateScores.get(freq.number) || 0) + 4);
    }
  });
  
  // Score based on frequency (recently frequent numbers)
  const recentFrequency = new Map<RouletteNumber, number>();
  recentSpins.slice(-20).forEach(num => {
    recentFrequency.set(num, (recentFrequency.get(num) || 0) + 1);
  });
  recentFrequency.forEach((count, num) => {
    candidateScores.set(num, (candidateScores.get(num) || 0) + count * 3);
  });
  
  // Convert to predictions
  const sortedCandidates = Array.from(candidateScores.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  sortedCandidates.forEach(([number, score]) => {
    const reasoning: string[] = [];
    
    if (wheelNeighbors.includes(number)) {
      reasoning.push('Physical neighbor on wheel');
    }
    if (mathNeighbors.includes(number) && number !== lastNumber) {
      reasoning.push('Mathematical neighbor');
    }
    if (hotNumbers.includes(number)) {
      reasoning.push('Hot number (frequent recently)');
    }
    if (recentFrequency.get(number) && recentFrequency.get(number)! > 2) {
      reasoning.push('High recent frequency');
    }
    if (statistics.numberFrequencies.find(f => f.number === number)?.gap! > recentWindow * 0.6) {
      reasoning.push('Due to appear (long gap)');
    }
    
    const confidence = Math.min(95, Math.max(15, Math.floor(score / 2)));
    
    topPredictions.push({
      number,
      confidence,
      reasoning: reasoning.length > 0 ? reasoning : ['Statistical analysis']
    });
  });
  
  // Fill remaining slots if needed
  while (topPredictions.length < 5) {
    const remainingNumbers = Array.from({ length: 37 }, (_, i) => i as RouletteNumber)
      .filter(n => !topPredictions.some(p => p.number === n));
    
    if (remainingNumbers.length === 0) break;
    
    const randomNum = remainingNumbers[Math.floor(Math.random() * remainingNumbers.length)];
    topPredictions.push({
      number: randomNum,
      confidence: 10,
      reasoning: ['Random selection']
    });
  }
  
  return {
    topPredictions,
    hotNumbers: hotNumbers.slice(0, 5),
    coldNumbers: coldNumbers.slice(0, 5),
    neighbors: allNeighbors.slice(0, 8)
  };
}

function generateGeneralPrediction(statistics: Statistics): PredictionResult {
  const hotNumbers = statistics.numberFrequencies
    .slice(0, 5)
    .map(f => f.number);
  
  const coldNumbers = statistics.numberFrequencies
    .slice(-5)
    .map(f => f.number)
    .reverse();
  
  const topPredictions: Prediction[] = hotNumbers.map((num, index) => ({
    number: num,
    confidence: 60 - index * 10,
    reasoning: ['Most frequent in simulation']
  }));
  
  return {
    topPredictions,
    hotNumbers,
    coldNumbers,
    neighbors: []
  };
}

function getHotNumbers(statistics: Statistics, recentSpins: RouletteNumber[]): RouletteNumber[] {
  // Analyze recent spins frequency
  const recentCounts = new Map<RouletteNumber, number>();
  const recentWindow = Math.min(20, recentSpins.length);
  const recentSlice = recentSpins.slice(-recentWindow);
  
  recentSlice.forEach((num: RouletteNumber) => {
    recentCounts.set(num, (recentCounts.get(num) || 0) + 1);
  });
  
  // Combine with overall statistics
  const scores = new Map<RouletteNumber, number>();
  
  statistics.numberFrequencies.forEach(freq => {
    const recentFreq = recentCounts.get(freq.number) || 0;
    // Weight recent frequency more heavily
    const score = freq.percentage * 0.5 + recentFreq * 50;
    scores.set(freq.number, score);
  });
  
  return Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([num]) => num)
    .slice(0, 10);
}

function getColdNumbers(statistics: Statistics, _recentSpins: RouletteNumber[]): RouletteNumber[] {
  return statistics.numberFrequencies
    .filter(freq => freq.gap > 10)
    .sort((a, b) => b.gap - a.gap)
    .map(f => f.number)
    .slice(0, 10);
}
