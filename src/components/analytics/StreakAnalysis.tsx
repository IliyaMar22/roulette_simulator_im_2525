import type { StreakAnalysis } from '../../types';
import { StatsCard } from '../StatsCard';

interface StreakAnalysisProps {
  streaks: StreakAnalysis;
}

export function StreakAnalysisComponent({ streaks }: StreakAnalysisProps) {
  return (
    <StatsCard title="Streak Analysis">
      <div className="space-y-6">
        {/* Color Streaks */}
        <div>
          <h4 className="text-sm font-semibold text-text-secondary mb-3">Color Streaks</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-secondary-bg/50 rounded-lg">
              <div className="text-xs text-text-secondary mb-1">Red</div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-roulette-red">
                  Current: {streaks.redStreak.current}
                </span>
                <span className="text-sm text-text-secondary">
                  Max: {streaks.redStreak.longest}
                </span>
              </div>
            </div>
            <div className="p-3 bg-secondary-bg/50 rounded-lg">
              <div className="text-xs text-text-secondary mb-1">Black</div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-roulette-black">
                  Current: {streaks.blackStreak.current}
                </span>
                <span className="text-sm text-text-secondary">
                  Max: {streaks.blackStreak.longest}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Odd/Even Streaks */}
        <div>
          <h4 className="text-sm font-semibold text-text-secondary mb-3">Odd/Even Streaks</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-secondary-bg/50 rounded-lg">
              <div className="text-xs text-text-secondary mb-1">Odd</div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-accent-gold">
                  Current: {streaks.oddStreak.current}
                </span>
                <span className="text-sm text-text-secondary">
                  Max: {streaks.oddStreak.longest}
                </span>
              </div>
            </div>
            <div className="p-3 bg-secondary-bg/50 rounded-lg">
              <div className="text-xs text-text-secondary mb-1">Even</div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-accent-gold">
                  Current: {streaks.evenStreak.current}
                </span>
                <span className="text-sm text-text-secondary">
                  Max: {streaks.evenStreak.longest}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dozen Streaks */}
        <div>
          <h4 className="text-sm font-semibold text-text-secondary mb-3">Dozen Streaks</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-secondary-bg/50 rounded-lg text-center">
              <div className="text-xs text-text-secondary mb-1">1st Dozen</div>
              <div className="text-lg font-bold text-accent-gold">
                {streaks.dozenStreaks.first.longest}
              </div>
            </div>
            <div className="p-3 bg-secondary-bg/50 rounded-lg text-center">
              <div className="text-xs text-text-secondary mb-1">2nd Dozen</div>
              <div className="text-lg font-bold text-accent-gold">
                {streaks.dozenStreaks.second.longest}
              </div>
            </div>
            <div className="p-3 bg-secondary-bg/50 rounded-lg text-center">
              <div className="text-xs text-text-secondary mb-1">3rd Dozen</div>
              <div className="text-lg font-bold text-accent-gold">
                {streaks.dozenStreaks.third.longest}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StatsCard>
  );
}

