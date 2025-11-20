export type RouletteNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36;

export type Color = 'red' | 'black' | 'green';

export type SimulationSize = 10000 | 150000 | 350000 | 500000 | 1000000;

export interface SimulationResult {
  spins: RouletteNumber[];
  totalSpins: number;
  timestamp: number;
}

export interface ColorStats {
  red: { count: number; percentage: number };
  black: { count: number; percentage: number };
  green: { count: number; percentage: number };
}

export interface NumberFrequency {
  number: RouletteNumber;
  count: number;
  percentage: number;
  lastSeen: number; // spin index
  gap: number; // spins since last appearance
}

export interface DozenStats {
  first: { count: number; percentage: number; streak: number };
  second: { count: number; percentage: number; streak: number };
  third: { count: number; percentage: number; streak: number };
  zero: { count: number; percentage: number };
}

export interface ColumnStats {
  column1: { count: number; percentage: number };
  column2: { count: number; percentage: number };
  column3: { count: number; percentage: number };
}

export interface RangeStats {
  low: { count: number; percentage: number }; // 1-18
  high: { count: number; percentage: number }; // 19-36
  odd: { count: number; percentage: number };
  even: { count: number; percentage: number };
}

export interface SectorStats {
  voisins: { count: number; percentage: number };
  tiers: { count: number; percentage: number };
  orphelins: { count: number; percentage: number };
  zeroGame: { count: number; percentage: number };
}

export interface StreakAnalysis {
  redStreak: { current: number; longest: number };
  blackStreak: { current: number; longest: number };
  oddStreak: { current: number; longest: number };
  evenStreak: { current: number; longest: number };
  dozenStreaks: {
    first: { current: number; longest: number };
    second: { current: number; longest: number };
    third: { current: number; longest: number };
  };
}

export interface Statistics {
  colorStats: ColorStats;
  numberFrequencies: NumberFrequency[];
  dozenStats: DozenStats;
  columnStats: ColumnStats;
  rangeStats: RangeStats;
  sectorStats: SectorStats;
  streakAnalysis: StreakAnalysis;
}

export interface Prediction {
  number: RouletteNumber;
  confidence: number;
  reasoning: string[];
}

export interface PredictionResult {
  topPredictions: Prediction[];
  hotNumbers: RouletteNumber[];
  coldNumbers: RouletteNumber[];
  neighbors: RouletteNumber[];
}

export interface SimulationProgress {
  current: number;
  total: number;
  percentage: number;
  isComplete: boolean;
}

