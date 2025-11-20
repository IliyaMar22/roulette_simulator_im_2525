import type {
  RouletteNumber,
  Statistics,
  ColorStats,
  NumberFrequency,
  DozenStats,
  ColumnStats,
  RangeStats,
  SectorStats,
  StreakAnalysis
} from '../types';
import {
  VOISINS_DU_ZERO,
  TIERS_DU_CYLINDRE,
  ORPHELINS,
  ZERO_GAME,
  getColor,
  getDozen,
  getColumn,
  isLow,
  isHigh,
  isOdd,
  isEven
} from './constants';

export function calculateStatistics(spins: RouletteNumber[]): Statistics {
  const totalSpins = spins.length;
  
  return {
    colorStats: calculateColorStats(spins, totalSpins),
    numberFrequencies: calculateNumberFrequencies(spins, totalSpins),
    dozenStats: calculateDozenStats(spins, totalSpins),
    columnStats: calculateColumnStats(spins, totalSpins),
    rangeStats: calculateRangeStats(spins, totalSpins),
    sectorStats: calculateSectorStats(spins, totalSpins),
    streakAnalysis: calculateStreakAnalysis(spins)
  };
}

function calculateColorStats(spins: RouletteNumber[], total: number): ColorStats {
  let redCount = 0;
  let blackCount = 0;
  let greenCount = 0;
  
  spins.forEach(num => {
    const color = getColor(num);
    if (color === 'red') redCount++;
    else if (color === 'black') blackCount++;
    else greenCount++;
  });
  
  return {
    red: { count: redCount, percentage: (redCount / total) * 100 },
    black: { count: blackCount, percentage: (blackCount / total) * 100 },
    green: { count: greenCount, percentage: (greenCount / total) * 100 }
  };
}

function calculateNumberFrequencies(spins: RouletteNumber[], total: number): NumberFrequency[] {
  const frequencies: Map<RouletteNumber, { count: number; lastSeen: number }> = new Map();
  
  // Initialize all numbers
  for (let i = 0; i <= 36; i++) {
    frequencies.set(i as RouletteNumber, { count: 0, lastSeen: -1 });
  }
  
  // Count occurrences and track last seen
  spins.forEach((num, index) => {
    const freq = frequencies.get(num)!;
    freq.count++;
    freq.lastSeen = index;
  });
  
  // Convert to array and calculate gaps
  const result: NumberFrequency[] = [];
  frequencies.forEach((freq, number) => {
    const gap = freq.lastSeen === -1 ? spins.length : spins.length - 1 - freq.lastSeen;
    result.push({
      number,
      count: freq.count,
      percentage: (freq.count / total) * 100,
      lastSeen: freq.lastSeen,
      gap
    });
  });
  
  return result.sort((a, b) => b.count - a.count);
}

function calculateDozenStats(spins: RouletteNumber[], total: number): DozenStats {
  let firstCount = 0;
  let secondCount = 0;
  let thirdCount = 0;
  let zeroCount = 0;
  
  let firstStreak = 0;
  let secondStreak = 0;
  let thirdStreak = 0;
  let maxFirstStreak = 0;
  let maxSecondStreak = 0;
  let maxThirdStreak = 0;
  
  spins.forEach(num => {
    const dozen = getDozen(num);
    
    if (dozen === 'zero') {
      zeroCount++;
      firstStreak = 0;
      secondStreak = 0;
      thirdStreak = 0;
    } else if (dozen === 'first') {
      firstCount++;
      firstStreak++;
      secondStreak = 0;
      thirdStreak = 0;
      maxFirstStreak = Math.max(maxFirstStreak, firstStreak);
    } else if (dozen === 'second') {
      secondCount++;
      firstStreak = 0;
      secondStreak++;
      thirdStreak = 0;
      maxSecondStreak = Math.max(maxSecondStreak, secondStreak);
    } else {
      thirdCount++;
      firstStreak = 0;
      secondStreak = 0;
      thirdStreak++;
      maxThirdStreak = Math.max(maxThirdStreak, thirdStreak);
    }
  });
  
  return {
    first: {
      count: firstCount,
      percentage: (firstCount / total) * 100,
      streak: maxFirstStreak
    },
    second: {
      count: secondCount,
      percentage: (secondCount / total) * 100,
      streak: maxSecondStreak
    },
    third: {
      count: thirdCount,
      percentage: (thirdCount / total) * 100,
      streak: maxThirdStreak
    },
    zero: {
      count: zeroCount,
      percentage: (zeroCount / total) * 100
    }
  };
}

function calculateColumnStats(spins: RouletteNumber[], total: number): ColumnStats {
  let col1Count = 0;
  let col2Count = 0;
  let col3Count = 0;
  
  spins.forEach(num => {
    const col = getColumn(num);
    if (col === 1) col1Count++;
    else if (col === 2) col2Count++;
    else if (col === 3) col3Count++;
  });
  
  return {
    column1: { count: col1Count, percentage: (col1Count / total) * 100 },
    column2: { count: col2Count, percentage: (col2Count / total) * 100 },
    column3: { count: col3Count, percentage: (col3Count / total) * 100 }
  };
}

function calculateRangeStats(spins: RouletteNumber[], total: number): RangeStats {
  let lowCount = 0;
  let highCount = 0;
  let oddCount = 0;
  let evenCount = 0;
  
  spins.forEach(num => {
    if (num === 0) return;
    if (isLow(num)) lowCount++;
    if (isHigh(num)) highCount++;
    if (isOdd(num)) oddCount++;
    if (isEven(num)) evenCount++;
  });
  
  return {
    low: { count: lowCount, percentage: (lowCount / total) * 100 },
    high: { count: highCount, percentage: (highCount / total) * 100 },
    odd: { count: oddCount, percentage: (oddCount / total) * 100 },
    even: { count: evenCount, percentage: (evenCount / total) * 100 }
  };
}

function calculateSectorStats(spins: RouletteNumber[], total: number): SectorStats {
  let voisinsCount = 0;
  let tiersCount = 0;
  let orphelinsCount = 0;
  let zeroGameCount = 0;
  
  spins.forEach(num => {
    if (VOISINS_DU_ZERO.includes(num)) voisinsCount++;
    if (TIERS_DU_CYLINDRE.includes(num)) tiersCount++;
    if (ORPHELINS.includes(num)) orphelinsCount++;
    if (ZERO_GAME.includes(num)) zeroGameCount++;
  });
  
  return {
    voisins: { count: voisinsCount, percentage: (voisinsCount / total) * 100 },
    tiers: { count: tiersCount, percentage: (tiersCount / total) * 100 },
    orphelins: { count: orphelinsCount, percentage: (orphelinsCount / total) * 100 },
    zeroGame: { count: zeroGameCount, percentage: (zeroGameCount / total) * 100 }
  };
}

function calculateStreakAnalysis(spins: RouletteNumber[]): StreakAnalysis {
  let redStreak = 0;
  let blackStreak = 0;
  let oddStreak = 0;
  let evenStreak = 0;
  
  let maxRedStreak = 0;
  let maxBlackStreak = 0;
  let maxOddStreak = 0;
  let maxEvenStreak = 0;
  
  let currentDozen: 'first' | 'second' | 'third' | null = null;
  let dozenStreak = 0;
  let maxFirstStreak = 0;
  let maxSecondStreak = 0;
  let maxThirdStreak = 0;
  
  spins.forEach(num => {
    const color = getColor(num);
    const dozen = getDozen(num);
    
    // Color streaks
    if (color === 'red') {
      redStreak++;
      blackStreak = 0;
      maxRedStreak = Math.max(maxRedStreak, redStreak);
    } else if (color === 'black') {
      blackStreak++;
      redStreak = 0;
      maxBlackStreak = Math.max(maxBlackStreak, blackStreak);
    } else {
      redStreak = 0;
      blackStreak = 0;
    }
    
    // Odd/Even streaks
    if (num !== 0) {
      if (isOdd(num)) {
        oddStreak++;
        evenStreak = 0;
        maxOddStreak = Math.max(maxOddStreak, oddStreak);
      } else {
        evenStreak++;
        oddStreak = 0;
        maxEvenStreak = Math.max(maxEvenStreak, evenStreak);
      }
    }
    
    // Dozen streaks
    if (dozen !== 'zero') {
      if (dozen === currentDozen) {
        dozenStreak++;
      } else {
        if (currentDozen === 'first') maxFirstStreak = Math.max(maxFirstStreak, dozenStreak);
        else if (currentDozen === 'second') maxSecondStreak = Math.max(maxSecondStreak, dozenStreak);
        else if (currentDozen === 'third') maxThirdStreak = Math.max(maxThirdStreak, dozenStreak);
        
        currentDozen = dozen;
        dozenStreak = 1;
      }
    } else {
      if (currentDozen === 'first') maxFirstStreak = Math.max(maxFirstStreak, dozenStreak);
      else if (currentDozen === 'second') maxSecondStreak = Math.max(maxSecondStreak, dozenStreak);
      else if (currentDozen === 'third') maxThirdStreak = Math.max(maxThirdStreak, dozenStreak);
      currentDozen = null;
      dozenStreak = 0;
    }
  });
  
  // Final update for dozen streaks
  if (currentDozen === 'first') maxFirstStreak = Math.max(maxFirstStreak, dozenStreak);
  else if (currentDozen === 'second') maxSecondStreak = Math.max(maxSecondStreak, dozenStreak);
  else if (currentDozen === 'third') maxThirdStreak = Math.max(maxThirdStreak, dozenStreak);
  
  return {
    redStreak: { current: redStreak, longest: maxRedStreak },
    blackStreak: { current: blackStreak, longest: maxBlackStreak },
    oddStreak: { current: oddStreak, longest: maxOddStreak },
    evenStreak: { current: evenStreak, longest: maxEvenStreak },
    dozenStreaks: {
      first: { current: dozenStreak, longest: maxFirstStreak },
      second: { current: dozenStreak, longest: maxSecondStreak },
      third: { current: dozenStreak, longest: maxThirdStreak }
    }
  };
}

