import type { RouletteNumber } from '../types';
import { ROULETTE_NUMBERS } from '../utils/constants';

// Web Worker for running simulations in background
self.onmessage = function(e: MessageEvent<{ size: number; progressInterval: number }>) {
  const { size, progressInterval } = e.data;
  const spins: RouletteNumber[] = [];
  
  // Use crypto.getRandomValues for secure randomness
  const generateRandom = (): RouletteNumber => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const random = array[0] / (0xFFFFFFFF + 1);
    const index = Math.floor(random * ROULETTE_NUMBERS.length);
    return ROULETTE_NUMBERS[index];
  };
  
  for (let i = 0; i < size; i++) {
    spins.push(generateRandom());
    
    // Report progress
    if (i % progressInterval === 0 || i === size - 1) {
      self.postMessage({
        type: 'progress',
        current: i + 1,
        total: size,
        percentage: ((i + 1) / size) * 100
      });
    }
  }
  
  // Send final result
  self.postMessage({
    type: 'complete',
    spins,
    totalSpins: size,
    timestamp: Date.now()
  });
};

