import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import type { ColumnStats } from '../../types';

interface ColumnChartProps {
  stats: ColumnStats;
}

export function ColumnChart({ stats }: ColumnChartProps) {
  const data = [
    { name: 'Column 1', count: stats.column1.count, percentage: stats.column1.percentage },
    { name: 'Column 2', count: stats.column2.count, percentage: stats.column2.percentage },
    { name: 'Column 3', count: stats.column3.count, percentage: stats.column3.percentage }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.name} className="text-center">
            <div className="text-xl font-bold">{item.count.toLocaleString()}</div>
            <div className="text-xs text-text-secondary">{item.name}</div>
            <div className="text-xs text-text-secondary">{item.percentage.toFixed(2)}%</div>
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
                fill={`hsl(${index * 120}, 70%, 50%)`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

