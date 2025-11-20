import { useState, useCallback, useRef } from 'react';
import type { SimulationSize, SimulationResult, SimulationProgress } from '../types';
import { runSimulationWithProgress } from '../utils/rouletteEngine';

export function useSimulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState<SimulationProgress>({
    current: 0,
    total: 0,
    percentage: 0,
    isComplete: false
  });
  const [result, setResult] = useState<SimulationResult | null>(null);
  const workerRef = useRef<Worker | null>(null);

  const runSimulation = useCallback(async (size: SimulationSize) => {
    setIsRunning(true);
    setProgress({
      current: 0,
      total: size,
      percentage: 0,
      isComplete: false
    });
    setResult(null);

    try {
      // Use Web Worker for large simulations
      if (size >= 150000) {
        const worker = new Worker(
          new URL('../workers/simulationWorker.ts', import.meta.url),
          { type: 'module' }
        );
        workerRef.current = worker;

        worker.postMessage({
          size,
          progressInterval: Math.max(1, Math.floor(size / 100))
        });

        worker.onmessage = (e: MessageEvent) => {
          if (e.data.type === 'progress') {
            setProgress({
              current: e.data.current,
              total: e.data.total,
              percentage: e.data.percentage,
              isComplete: false
            });
          } else if (e.data.type === 'complete') {
            setResult({
              spins: e.data.spins,
              totalSpins: e.data.totalSpins,
              timestamp: e.data.timestamp
            });
            setProgress(prev => ({ ...prev, isComplete: true }));
            setIsRunning(false);
            worker.terminate();
            workerRef.current = null;
          }
        };

        worker.onerror = (error) => {
          console.error('Worker error:', error);
          setIsRunning(false);
          worker.terminate();
          workerRef.current = null;
        };
      } else {
        // Run synchronously for smaller simulations
        const result = runSimulationWithProgress(size, (current, total) => {
          setProgress({
            current,
            total,
            percentage: (current / total) * 100,
            isComplete: false
          });
        });

        setResult(result);
        setProgress(prev => ({ ...prev, isComplete: true }));
        setIsRunning(false);
      }
    } catch (error) {
      console.error('Simulation error:', error);
      setIsRunning(false);
    }
  }, []);

  const stopSimulation = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    setIsRunning(false);
  }, []);

  return {
    isRunning,
    progress,
    result,
    runSimulation,
    stopSimulation
  };
}

