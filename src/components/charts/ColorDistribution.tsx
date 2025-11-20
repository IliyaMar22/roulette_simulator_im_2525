import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { ColorStats } from '../../types';

interface ColorDistributionProps {
  stats: ColorStats;
}

const COLORS = {
  red: '#D32F2F',
  black: '#212121',
  green: '#00C853'
};

export function ColorDistribution({ stats }: ColorDistributionProps) {
  const data = [
    { name: 'Red', value: stats.red.count, percentage: stats.red.percentage.toFixed(2) },
    { name: 'Black', value: stats.black.count, percentage: stats.black.percentage.toFixed(2) },
    { name: 'Green (0)', value: stats.green.count, percentage: stats.green.percentage.toFixed(2) }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-roulette-red">{stats.red.count.toLocaleString()}</div>
          <div className="text-sm text-text-secondary">Red ({stats.red.percentage.toFixed(2)}%)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-roulette-black">{stats.black.count.toLocaleString()}</div>
          <div className="text-sm text-text-secondary">Black ({stats.black.percentage.toFixed(2)}%)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-green">{stats.green.count.toLocaleString()}</div>
          <div className="text-sm text-text-secondary">Green ({stats.green.percentage.toFixed(2)}%)</div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props: { name?: string; value?: number }) => {
              const item = data.find((d: typeof data[0]) => d.name === props.name);
              return `${props.name || ''}: ${item?.percentage || '0.00'}%`;
            }}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase().split(' ')[0] as keyof typeof COLORS] || '#8884d8'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

