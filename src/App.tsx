import { useState, useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const VOISINS = [22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25];
const TIERS = [27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33];
const ORPHELINS = [17, 34, 6, 1, 20, 14, 31, 9];

const styles = {
  app: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', padding: '20px' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', padding: '20px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' },
  logo: { display: 'flex', alignItems: 'center', gap: '15px' },
  logoIcon: { width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)' },
  title: { fontSize: '28px', fontWeight: 'bold', background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 },
  subtitle: { fontSize: '12px', color: '#94a3b8', margin: 0 },
  card: { background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', marginBottom: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' },
  cardTitle: { fontSize: '18px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' },
  grid5: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '20px' },
  simBtn: (active: boolean) => ({ padding: '14px 20px', borderRadius: '12px', border: 'none', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s', background: active ? 'linear-gradient(135deg, #f59e0b, #d97706)' : '#374151', color: active ? '#fff' : '#9ca3af', transform: active ? 'scale(1.05)' : 'scale(1)', boxShadow: active ? '0 4px 15px rgba(245, 158, 11, 0.4)' : 'none' }),
  runBtn: (disabled: boolean) => ({ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: disabled ? 'not-allowed' : 'pointer', background: disabled ? '#4b5563' : 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', boxShadow: disabled ? 'none' : '0 4px 20px rgba(245, 158, 11, 0.4)' }),
  progressBar: { marginTop: '16px', background: '#374151', borderRadius: '10px', height: '12px', overflow: 'hidden' },
  progressFill: (p: number) => ({ height: '100%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', transition: 'width 0.3s', width: `${p}%` }),
  numberGrid: { display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '8px', marginBottom: '20px' },
  numberBtn: (num: number, selected: boolean) => ({ aspectRatio: '1', borderRadius: '10px', border: selected ? '3px solid #fbbf24' : 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', background: num === 0 ? '#10b981' : RED_NUMBERS.includes(num) ? '#dc2626' : '#1f2937', color: '#fff', transform: selected ? 'scale(1.15)' : 'scale(1)', boxShadow: selected ? '0 0 15px rgba(251, 191, 36, 0.6)' : '0 2px 8px rgba(0,0,0,0.3)' }),
  predBtn: (disabled: boolean) => ({ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: disabled ? 'not-allowed' : 'pointer', background: disabled ? '#4b5563' : 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', boxShadow: disabled ? 'none' : '0 4px 15px rgba(16, 185, 129, 0.4)' }),
  predResult: { background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.15))', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '16px', padding: '24px', textAlign: 'center' as const },
  predNumber: (num: number) => ({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', fontSize: '32px', fontWeight: 'bold', background: num === 0 ? '#10b981' : RED_NUMBERS.includes(num) ? '#dc2626' : '#1f2937', color: '#fff', boxShadow: '0 8px 25px rgba(0,0,0,0.4)' }),
  historyChip: (num: number) => ({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', background: num === 0 ? '#10b981' : RED_NUMBERS.includes(num) ? '#dc2626' : '#1f2937', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }),
  tabs: { display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' as const },
  tab: (active: boolean) => ({ padding: '12px 24px', borderRadius: '12px', border: 'none', fontWeight: '600', cursor: 'pointer', background: active ? 'linear-gradient(135deg, #f59e0b, #d97706)' : '#374151', color: active ? '#fff' : '#9ca3af', boxShadow: active ? '0 4px 15px rgba(245, 158, 11, 0.3)' : 'none' }),
  statBar: { background: '#374151', borderRadius: '8px', height: '10px', overflow: 'hidden', marginTop: '8px' },
  statFill: (color: string, pct: number) => ({ height: '100%', background: color, width: `${pct}%`, transition: 'width 0.5s' }),
  disclaimer: { background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#fcd34d', marginTop: '24px' },
  empty: { height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' },
  smallChip: (num: number) => ({ padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', background: num === 0 ? '#10b981' : RED_NUMBERS.includes(num) ? '#dc2626' : '#1f2937', color: '#fff', display: 'inline-block', margin: '3px' })
};

export default function RouletteSimulator() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [simulationSize, setSimulationSize] = useState(10000);
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [stats, setStats] = useState({ numbers: {} as Record<number, number>, colors: { red: 0, black: 0, green: 0 }, dozens: { first: 0, second: 0, third: 0, zero: 0 }, columns: { col1: 0, col2: 0, col3: 0 }, highLow: { low: 0, high: 0 }, oddEven: { odd: 0, even: 0 }, sectors: { voisins: 0, tiers: 0, orphelins: 0 } });
  const [prediction, setPrediction] = useState<{ number: number; confidence: number; neighbors: number[]; hotNumbers: number[] } | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const spinWheel = () => Math.floor(Math.random() * 37);

  const runSimulation = async () => {
    setIsSimulating(true);
    setProgress(0);
    const newStats = { numbers: {} as Record<number, number>, colors: { red: 0, black: 0, green: 0 }, dozens: { first: 0, second: 0, third: 0, zero: 0 }, columns: { col1: 0, col2: 0, col3: 0 }, highLow: { low: 0, high: 0 }, oddEven: { odd: 0, even: 0 }, sectors: { voisins: 0, tiers: 0, orphelins: 0 } };
    const newHistory: number[] = [];
    const batchSize = Math.max(1000, Math.floor(simulationSize / 100));

    for (let i = 0; i < simulationSize; i++) {
      const num = spinWheel();
      newStats.numbers[num] = (newStats.numbers[num] || 0) + 1;
      if (num === 0) newStats.colors.green++; else if (RED_NUMBERS.includes(num)) newStats.colors.red++; else newStats.colors.black++;
      if (num === 0) newStats.dozens.zero++; else if (num <= 12) newStats.dozens.first++; else if (num <= 24) newStats.dozens.second++; else newStats.dozens.third++;
      if (num !== 0) { if (num % 3 === 1) newStats.columns.col1++; else if (num % 3 === 2) newStats.columns.col2++; else newStats.columns.col3++; }
      if (num >= 1 && num <= 18) newStats.highLow.low++; else if (num >= 19) newStats.highLow.high++;
      if (num !== 0) { if (num % 2 === 0) newStats.oddEven.even++; else newStats.oddEven.odd++; }
      if (VOISINS.includes(num)) newStats.sectors.voisins++;
      if (TIERS.includes(num)) newStats.sectors.tiers++;
      if (ORPHELINS.includes(num)) newStats.sectors.orphelins++;
      if (i < 30) newHistory.push(num);
      if (i % batchSize === 0) { setProgress((i / simulationSize) * 100); await new Promise(r => setTimeout(r, 0)); }
    }
    setStats(newStats);
    setHistory(newHistory);
    setProgress(100);
    setIsSimulating(false);
  };

  const generatePrediction = () => {
    if (selectedNumber === null || Object.keys(stats.numbers).length === 0) return;
    const neighbors = [(selectedNumber - 2 + 37) % 37, (selectedNumber - 1 + 37) % 37, selectedNumber, (selectedNumber + 1) % 37, (selectedNumber + 2) % 37];
    const hotNumbers = Object.entries(stats.numbers).sort(([, a], [, b]) => b - a).slice(0, 5).map(([n]) => parseInt(n));
    const predicted = hotNumbers[Math.floor(Math.random() * hotNumbers.length)] || neighbors[2];
    setPrediction({ number: predicted, confidence: Math.floor(Math.random() * 30) + 15, neighbors, hotNumbers });
  };

  const colorData = useMemo(() => [{ name: 'Red', value: stats.colors.red, color: '#dc2626' }, { name: 'Black', value: stats.colors.black, color: '#1f2937' }, { name: 'Green', value: stats.colors.green, color: '#10b981' }], [stats]);
  const dozenData = useMemo(() => [{ name: '1st Dozen', value: stats.dozens.first }, { name: '2nd Dozen', value: stats.dozens.second }, { name: '3rd Dozen', value: stats.dozens.third }, { name: 'Zero', value: stats.dozens.zero }], [stats]);
  const sectorData = useMemo(() => [{ name: 'Voisins', value: stats.sectors.voisins }, { name: 'Tiers', value: stats.sectors.tiers }, { name: 'Orphelins', value: stats.sectors.orphelins }], [stats]);
  const freqData = useMemo(() => Array.from({ length: 37 }, (_, i) => ({ number: i, frequency: stats.numbers[i] || 0 })), [stats]);

  const total = stats.highLow.low + stats.highLow.high || 1;
  const oddEvenTotal = stats.oddEven.odd + stats.oddEven.even || 1;

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🎰</div>
          <div>
            <h1 style={styles.title}>Roulette Simulator</h1>
            <p style={styles.subtitle}>Statistical Analysis Engine</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '20px', cursor: 'pointer' }}>⚙️</button>
          <button style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '20px', cursor: 'pointer' }}>ℹ️</button>
        </div>
      </header>

      {/* Simulation Controls */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>▶️ Simulation Controls</h2>
        <div style={styles.grid5}>
          {[10000, 150000, 350000, 500000, 1000000].map(size => (
            <button key={size} onClick={() => setSimulationSize(size)} style={styles.simBtn(simulationSize === size)}>
              {size >= 1000000 ? `${size / 1000000}M` : `${size / 1000}K`}
            </button>
          ))}
        </div>
        <button onClick={runSimulation} disabled={isSimulating} style={styles.runBtn(isSimulating)}>
          {isSimulating ? `Simulating... ${progress.toFixed(0)}%` : '🚀 Run Simulation'}
        </button>
        {isSimulating && <div style={styles.progressBar}><div style={styles.progressFill(progress)} /></div>}
      </div>

      {/* Input & Prediction */}
      <div style={styles.grid2}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}># Input Number</h2>
          <div style={styles.numberGrid}>
            {Array.from({ length: 37 }, (_, i) => i).map(num => (
              <button key={num} onClick={() => setSelectedNumber(num)} style={styles.numberBtn(num, selectedNumber === num)}>{num}</button>
            ))}
          </div>
          <button onClick={generatePrediction} disabled={selectedNumber === null || Object.keys(stats.numbers).length === 0} style={styles.predBtn(selectedNumber === null || Object.keys(stats.numbers).length === 0)}>
            🔮 Generate Prediction
          </button>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🎯 Prediction Result</h2>
          {prediction ? (
            <div>
              <div style={styles.predResult}>
                <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '10px' }}>Predicted Number</div>
                <div style={styles.predNumber(prediction.number)}>{prediction.number}</div>
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span style={{ color: '#9ca3af' }}>Confidence:</span>
                  <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '18px' }}>{prediction.confidence}%</span>
                </div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px' }}>🔥 Hot Numbers</div>
                <div>{prediction.hotNumbers.map(n => <span key={n} style={styles.smallChip(n)}>{n}</span>)}</div>
              </div>
              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px' }}>🎡 Neighbors</div>
                <div>{prediction.neighbors.map(n => <span key={n} style={styles.smallChip(n)}>{n}</span>)}</div>
              </div>
            </div>
          ) : <div style={styles.empty}>Select a number and run simulation to see predictions</div>}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🕐 Recent Spins</h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {history.map((num, idx) => <div key={idx} style={styles.historyChip(num)}>{num}</div>)}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={styles.tabs}>
        {['overview', 'dozens', 'sectors', 'frequency'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={styles.tab(activeTab === tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={styles.grid2}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🎨 Color Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={colorData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={90} dataKey="value">
                  {colorData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📊 High/Low & Odd/Even</h3>
            {[{ label: 'Low (1-18)', value: stats.highLow.low, total, color: '#3b82f6' }, { label: 'High (19-36)', value: stats.highLow.high, total, color: '#8b5cf6' }, { label: 'Odd', value: stats.oddEven.odd, total: oddEvenTotal, color: '#ec4899' }, { label: 'Even', value: stats.oddEven.even, total: oddEvenTotal, color: '#06b6d4' }].map((item, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#d1d5db' }}>{item.label}</span>
                  <span style={{ fontWeight: 'bold' }}>{item.value.toLocaleString()}</span>
                </div>
                <div style={styles.statBar}><div style={styles.statFill(item.color, (item.value / item.total) * 100)} /></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'dozens' && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📈 Dozens Analysis</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={dozenData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
              <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'sectors' && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🎡 Wheel Sectors</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={sectorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
              <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'frequency' && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📉 Number Frequency</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={freqData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="number" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="frequency" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Disclaimer */}
      <div style={styles.disclaimer}>
        <strong>⚠️ Educational Tool:</strong> This simulator is for statistical analysis and educational purposes only. Roulette outcomes are truly random. No prediction system can beat the house edge.
      </div>
    </div>
  );
}
