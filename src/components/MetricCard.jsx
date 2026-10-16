import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'

export default function MetricCard({ label, value, note, icon: Icon, tone = 'red', progress, change, trend }) {
  const positive = typeof change === 'number' ? change >= 0 : null
  return <div className="metric-card">
    <div className="metric-top"><span>{label}</span><span className={`metric-icon ${tone}`}><Icon size={18} /></span></div>
    <div className="metric-value">{value}</div>
    <div className="metric-top" style={{ marginTop: 4 }}>
      <span className="metric-note">{note}</span>
      {change !== undefined && <span className={`metric-change ${positive ? 'up' : 'down'}`}>{positive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}{Math.abs(change)}%</span>}
    </div>
    {trend && <div className="metric-sparkline"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trend} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
      <defs><linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={tone === 'purple' ? '#C2485C' : tone === 'blue' ? '#94a3b8' : tone === 'ok' ? '#FF3B5C' : '#FF1F3D'} stopOpacity={0.4} /><stop offset="100%" stopColor="#FF1F3D" stopOpacity={0} /></linearGradient></defs>
      <Area type="monotone" dataKey="v" stroke={tone === 'purple' ? '#C2485C' : tone === 'blue' ? '#94a3b8' : tone === 'ok' ? '#FF3B5C' : '#FF1F3D'} fill={`url(#spark-${label})`} strokeWidth={1.5} isAnimationActive={false} />
    </AreaChart></ResponsiveContainer></div>}
    {progress !== undefined && <div className="progress-track"><div className={`progress-fill ${tone}`} style={{ width: `${Math.min(100, progress)}%` }} /></div>}
    <span className="demo-caption">SIMULATED DEMO DATA</span>
  </div>
}
