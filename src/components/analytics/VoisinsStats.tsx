import type { SectorStats } from '../../types';
import { StatsCard } from '../StatsCard';

interface VoisinsStatsProps {
  stats: SectorStats;
  totalSpins?: number;
}

export function VoisinsStats({ stats }: VoisinsStatsProps) {
  const expectedPercentage = (17 / 37) * 100;
  const deviation = stats.voisins.percentage - expectedPercentage;

  return (
    <StatsCard title="Voisins du Zéro (Neighbors of Zero)">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-secondary-bg/50 rounded-lg">
            <div className="text-3xl font-bold text-accent-gold">{stats.voisins.count.toLocaleString()}</div>
            <div className="text-sm text-text-secondary mt-1">Occurrences</div>
          </div>
          <div className="text-center p-4 bg-secondary-bg/50 rounded-lg">
            <div className="text-3xl font-bold text-accent-gold">{stats.voisins.percentage.toFixed(2)}%</div>
            <div className="text-sm text-text-secondary mt-1">Frequency</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Expected:</span>
            <span className="text-text-primary">{expectedPercentage.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Deviation:</span>
            <span className={deviation >= 0 ? 'text-accent-green' : 'text-roulette-red'}>
              {deviation >= 0 ? '+' : ''}{deviation.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="text-xs text-text-secondary mt-4">
          <p className="font-semibold mb-2">Numbers included:</p>
          <p>22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25</p>
        </div>
      </div>
    </StatsCard>
  );
}

