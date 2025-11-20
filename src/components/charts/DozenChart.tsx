import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import type { DozenStats } from '../../types';

interface DozenChartProps {
  stats: DozenStats;
}

export function DozenChart({ stats }: DozenChartProps) {
  const data = [
    { name: '1st Dozen', count: stats.first.count, percentage: stats.first.percentage, streak: stats.first.streak },
    { name: '2nd Dozen', count: stats.second.count, percentage: stats.second.percentage, streak: stats.second.streak },
    { name: '3rd Dozen', count: stats.third.count, percentage: stats.third.percentage, streak: stats.third.streak },
    { name: 'Zero', count: stats.zero.count, percentage: stats.zero.percentage, streak: 0 }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {data.map((item) => (
          <div key={item.name} className="text-center">
            <div className="text-xl font-bold">{item.count.toLocaleString()}</div>
            <div className="text-xs text-text-secondary">{item.name}</div>
            <div className="text-xs text-text-secondary">{item.percentage.toFixed(2)}%</div>
            {item.streak > 0 && (
              <div className="text-xs text-accent-gold mt-1">Max Streak: {item.streak}</div>
            )}
          </div>
        ))}
      </div>
      
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="glass rounded p-2 border border-white/10">
                    <p className="font-semibold">{data.name}</p>
                    <p className="text-sm">Count: {data.count.toLocaleString()}</p>
                    <p className="text-sm">Percentage: {data.percentage.toFixed(2)}%</p>
                    {data.streak > 0 && (
                      <p className="text-sm">Max Streak: {data.streak}</p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 3 ? '#00C853' : `hsl(${index * 60}, 70%, 50%)`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

