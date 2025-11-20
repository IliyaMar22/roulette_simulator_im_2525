import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import type { NumberFrequency } from '../../types';
import { getColor } from '../../utils/constants';

interface NumberHeatmapProps {
  frequencies: NumberFrequency[];
  maxDisplay?: number;
}

export function NumberHeatmap({ frequencies, maxDisplay = 37 }: NumberHeatmapProps) {
  const displayData = frequencies.slice(0, maxDisplay).map(freq => ({
    number: freq.number.toString(),
    count: freq.count,
    percentage: freq.percentage,
    color: getColor(freq.number)
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={displayData}>
        <XAxis dataKey="number" />
        <YAxis />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="glass rounded p-2 border border-white/10">
                  <p className="font-semibold">Number {data.number}</p>
                  <p className="text-sm">Count: {data.count.toLocaleString()}</p>
                  <p className="text-sm">Percentage: {data.percentage.toFixed(2)}%</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {displayData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.color === 'red'
                  ? '#D32F2F'
                  : entry.color === 'black'
                  ? '#212121'
                  : '#00C853'
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

