import type { RouletteNumber, SimulationResult } from '../types';
import { ROULETTE_NUMBERS } from './constants';

/**
 * Generate a cryptographically secure random roulette number
 */
export function generateRandomNumber(): RouletteNumber {
  // Use crypto.getRandomValues for secure randomness
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const random = array[0] / (0xFFFFFFFF + 1);
  const index = Math.floor(random * ROULETTE_NUMBERS.length);
  return ROULETTE_NUMBERS[index];
}

/**
 * Run a simulation of specified size
 */
export function runSimulation(size: number): SimulationResult {
  const spins: RouletteNumber[] = [];
  
  for (let i = 0; i < size; i++) {
    spins.push(generateRandomNumber());
  }
  
  return {
    spins,
    totalSpins: size,
    timestamp: Date.now()
  };
}

/**
 * Run simulation with progress callback
 */
export function runSimulationWithProgress(
  size: number,
  onProgress: (current: number, total: number) => void
): SimulationResult {
  const spins: RouletteNumber[] = [];
  const progressInterval = Math.max(1, Math.floor(size / 100)); // Update every 1%
  
  for (let i = 0; i < size; i++) {
    spins.push(generateRandomNumber());
    
    if (i % progressInterval === 0 || i === size - 1) {
      onProgress(i + 1, size);
    }
  }
  
  return {
    spins,
    totalSpins: size,
    timestamp: Date.now()
  };
}

