import type { RouletteNumber } from '../types';

// European Roulette: 0-36 (37 numbers)
export const ROULETTE_NUMBERS: RouletteNumber[] = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
  24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

// Red numbers on European Roulette
export const RED_NUMBERS: RouletteNumber[] = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
];

// Black numbers on European Roulette
export const BLACK_NUMBERS: RouletteNumber[] = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35
];

// Green (zero)
export const GREEN_NUMBERS: RouletteNumber[] = [0];

// Dozens
export const FIRST_DOZEN: RouletteNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const SECOND_DOZEN: RouletteNumber[] = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
export const THIRD_DOZEN: RouletteNumber[] = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

// Columns
export const COLUMN_1: RouletteNumber[] = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
export const COLUMN_2: RouletteNumber[] = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
export const COLUMN_3: RouletteNumber[] = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];

// Voisins du Zéro (Neighbors of Zero)
export const VOISINS_DU_ZERO: RouletteNumber[] = [
  22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25
];

// Tiers du Cylindre (Third of the Wheel)
export const TIERS_DU_CYLINDRE: RouletteNumber[] = [
  27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33
];

// Orphelins (Orphans)
export const ORPHELINS: RouletteNumber[] = [
  17, 34, 6, 1, 20, 14, 31, 9
];

// Zero Game / Jeu Zéro
export const ZERO_GAME: RouletteNumber[] = [
  12, 35, 3, 26, 0, 32, 15
];

// Physical neighbors on the wheel (clockwise order)
export const WHEEL_NEIGHBORS: Record<RouletteNumber, RouletteNumber[]> = {
  0: [32, 15],
  32: [0, 15, 19],
  15: [0, 32, 19, 4],
  19: [15, 4, 21, 2],
  4: [19, 21, 2, 25],
  21: [4, 2, 25, 17],
  2: [21, 25, 17, 34],
  25: [2, 17, 34, 6],
  17: [25, 34, 6, 27],
  34: [17, 6, 27, 13],
  6: [34, 27, 13, 36],
  27: [6, 13, 36, 11],
  13: [27, 36, 11, 30],
  36: [13, 11, 30, 8],
  11: [36, 30, 8, 23],
  30: [11, 8, 23, 10],
  8: [30, 23, 10, 5],
  23: [8, 10, 5, 24],
  10: [23, 5, 24, 16],
  5: [10, 24, 16, 33],
  24: [5, 16, 33, 1],
  16: [24, 33, 1, 20],
  33: [16, 1, 20, 14],
  1: [33, 20, 14, 31],
  20: [1, 14, 31, 9],
  14: [20, 31, 9, 22],
  31: [14, 9, 22, 18],
  9: [31, 22, 18, 29],
  22: [9, 18, 29, 7],
  18: [22, 29, 7, 28],
  29: [18, 7, 28, 12],
  7: [29, 28, 12, 35],
  28: [7, 12, 35, 3],
  12: [28, 35, 3, 26],
  35: [12, 3, 26, 0],
  3: [35, 26, 0, 32],
  26: [3, 0, 32]
};

// Simulation sizes
export const SIMULATION_SIZES = [
  { label: '10K', value: 10000 },
  { label: '150K', value: 150000 },
  { label: '350K', value: 350000 },
  { label: '500K', value: 500000 },
  { label: '1M', value: 1000000 }
] as const;

// Helper functions
export function getColor(number: RouletteNumber): 'red' | 'black' | 'green' {
  if (number === 0) return 'green';
  return RED_NUMBERS.includes(number) ? 'red' : 'black';
}

export function getDozen(number: RouletteNumber): 'first' | 'second' | 'third' | 'zero' {
  if (number === 0) return 'zero';
  if (FIRST_DOZEN.includes(number)) return 'first';
  if (SECOND_DOZEN.includes(number)) return 'second';
  return 'third';
}

export function getColumn(number: RouletteNumber): 1 | 2 | 3 | null {
  if (number === 0) return null;
  if (COLUMN_1.includes(number)) return 1;
  if (COLUMN_2.includes(number)) return 2;
  return 3;
}

export function isLow(number: RouletteNumber): boolean {
  return number >= 1 && number <= 18;
}

export function isHigh(number: RouletteNumber): boolean {
  return number >= 19 && number <= 36;
}

export function isOdd(number: RouletteNumber): boolean {
  return number !== 0 && number % 2 === 1;
}

export function isEven(number: RouletteNumber): boolean {
  return number !== 0 && number % 2 === 0;
}

