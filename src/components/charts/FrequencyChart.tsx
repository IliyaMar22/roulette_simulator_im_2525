import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { NumberFrequency } from '../../types';

interface FrequencyChartProps {
  frequencies: NumberFrequency[];
}

export function FrequencyChart({ frequencies }: FrequencyChartProps) {
  const data = frequencies.map(freq => ({
    number: freq.number.toString(),
    frequency: freq.count,
    percentage: freq.percentage
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis 
          dataKey="number" 
          stroke="#9ca3af"
          tick={{ fill: '#9ca3af' }}
        />
        <YAxis 
          stroke="#9ca3af"
          tick={{ fill: '#9ca3af' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(26, 31, 40, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            color: '#f9fafb'
          }}
          formatter={(value: number) => [value.toLocaleString(), 'Frequency']}
        />
        <Line 
          type="monotone" 
          dataKey="frequency" 
          stroke="#fbbf24" 
          strokeWidth={2}
          dot={{ fill: '#fbbf24', r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

