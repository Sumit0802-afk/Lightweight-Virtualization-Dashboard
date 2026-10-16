import { useMemo, useState } from 'react'
import { Boxes, Cpu, MemoryStick, Activity, ArrowUpRight, Play, RotateCcw, Plus, Layers3, Workflow, SlidersHorizontal } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useNavigate, Link } from 'react-router-dom'
import MetricCard from '../components/MetricCard.jsx'
import ContainerTable from '../components/ContainerTable.jsx'
import ActivityLog from '../components/ActivityLog.jsx'
import ArchitectureDiagram from '../components/ArchitectureDiagram.jsx'
import { useDashboard } from '../context/DashboardContext.jsx'

const RANGES = {
  '1H': Array.from({ length: 12 }, (_, i) => ({ t: `${i * 5}m`, cpu: 24 + Math.round(18 * Math.sin(i / 2) + (i % 3) * 4), memory: 34 + Math.round(12 * Math.cos(i / 3) + (i % 2) * 3) })),
  '6H': Array.from({ length: 12 }, (_, i) => ({ t: `${i}:00`, cpu: 20 + Math.round(22 * Math.sin(i / 2.2)), memory: 30 + Math.round(16 * Math.cos(i / 2.6)) })),
  '24H': Array.from({ length: 12 }, (_, i) => ({ t: `${i * 2}:00`, cpu: 18 + Math.round(26 * Math.abs(Math.sin(i / 3))), memory: 28 + Math.round(20 * Math.abs(Math.cos(i / 4))) })),
  '7D': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((t, i) => ({ t, cpu: 22 + Math.round(20 * Math.sin(i)), memory: 32 + Math.round(14 * Math.cos(i)) })),
}
const sparkCpu = [{ v: 28 }, { v: 32 }, { v: 26 }, { v: 38 }, { v: 34 }, { v: 42 }, { v: 37 }]
const sparkMem = [{ v: 40 }, { v: 44 }, { v: 38 }, { v: 46 }, { v: 42 }, { v: 48 }, { v: 45 }]
const sparkContainers = [{ v: 3 }, { v: 4 }, { v: 3 }, { v: 4 }, { v: 4 }, { v: 5 }, { v: 4 }]
const sparkUptime = [{ v: 1 }, { v: 1 }, { v: 1 }, { v: 1 }, { v: 1 }, { v: 1 }, { v: 1 }]

export default function Dashboard() {
  const { containers, reset, log, addContainer } = useDashboard()
  const navigate = useNavigate()
  const [range, setRange] = useState('1H')
  const running = containers.filter(c => c.status === 'Running').length
  const cpu = containers.reduce((s, c) => s + c.cpu, 0)
  const memory = containers.reduce((s, c) => s + c.memory, 0)
  const chart = useMemo(() => RANGES[range], [range])

  function quickCreate() {
    const n = containers.length + 1
    addContainer({ name: `demo-container-${n}`, image: 'alpine:latest', type: 'Worker', cpuLimit: 100, limit: 512, io: 40 })
  }
  function quickReset() {
    if (confirm('Reset the demo environment? All containers, logs and settings will return to their defaults.')) reset()
  }

  return <div className="page-stack">
    <div className="command-hero">
      <div className="command-hero-inner">
        <span className="command-hero-eyebrow"><Activity size={11} /> KERNELLAB / SYSTEM COMMAND CENTER</span>
        <h1>LIGHTWEIGHT VIRTUALIZATION</h1>
        <p>Isolated environments. Shared kernel. Maximum efficiency. Monitor and control simulated containers from a single command center.</p>
        <div className="command-hero-actions">
          <button className="button primary" onClick={() => { log('Simulator launched', 'success'); document.getElementById('containers')?.scrollIntoView({ behavior: 'smooth' }) }}><Play size={14} /> Launch Simulator</button>
          <Link className="button secondary" to="/architecture"><Layers3 size={14} /> Explore Architecture</Link>
        </div>
      </div>
    </div>

    <div className="notice"><span className="notice-dot" /><div><b>Demo environment active</b><span>Metrics and container states are simulated for educational use.</span></div><button className="text-button" onClick={quickReset}><RotateCcw size={14} /> Reset demo</button></div>

    <div className="metrics-grid">
      <MetricCard label="Active Containers" value={`${running} / ${containers.length}`} note={`${containers.length - running} stopped`} icon={Boxes} change={3.2} trend={sparkContainers} progress={containers.length ? running / containers.length * 100 : 0} />
      <MetricCard label="CPU Utilization" value={`${cpu}%`} note="Combined demo usage" icon={Cpu} change={5.4} trend={sparkCpu} />
      <MetricCard label="Memory Usage" value={`${(memory / 1024).toFixed(1)} GB / 4 GB`} note="Across demo containers" icon={MemoryStick} tone="purple" change={-2.1} trend={sparkMem} />
      <MetricCard label="System Uptime" value="14d 08h" note="Operational" icon={Activity} tone="ok" trend={sparkUptime} />
    </div>

    <div className="dashboard-grid">
      <div className="panel chart-panel">
        <div className="panel-heading">
          <div><h3>Resource utilization</h3><p>Simulated CPU and memory trends</p></div>
          <div className="segmented">{Object.keys(RANGES).map(r => <button key={r} className={range === r ? 'selected' : ''} onClick={() => setRange(r)}>{r}</button>)}</div>
        </div>
        <div className="chart-legend"><span><i className="legend-cpu" />CPU usage</span><span><i className="legend-memory" />Memory usage</span><span className="live-label" style={{ marginLeft: 'auto' }}><span className="dot" /> LIVE</span></div>
        <div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chart} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="cpuFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF1F3D" stopOpacity={0.35} /><stop offset="100%" stopColor="#FF1F3D" stopOpacity={0} /></linearGradient>
            <linearGradient id="memFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C2485C" stopOpacity={0.22} /><stop offset="100%" stopColor="#C2485C" stopOpacity={0} /></linearGradient>
          </defs>
          <CartesianGrid stroke="#1e1e1e" strokeDasharray="3 5" vertical={false} />
          <XAxis dataKey="t" tick={{ fill: '#6b6b70', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6b6b70', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: '#151515', border: '1px solid #3a3a3a', borderRadius: 8, color: '#f5f5f5' }} />
          <Area type="monotone" dataKey="cpu" name="CPU %" stroke="#FF1F3D" fill="url(#cpuFill)" strokeWidth={2.2} />
          <Area type="monotone" dataKey="memory" name="Memory %" stroke="#C2485C" fill="url(#memFill)" strokeWidth={2} />
        </AreaChart></ResponsiveContainer></div>
        <div className="chart-foot"><span>Range: {range}</span><span>Not real system telemetry</span></div>
      </div>
      <div className="panel architecture-panel"><div className="panel-heading"><div><h3>Kernel architecture</h3><p>How containers share the host OS</p></div><Link className="link-arrow" to="/architecture"><ArrowUpRight size={16} /></Link></div><ArchitectureDiagram /><Link className="button secondary full-button" to="/architecture">Explore architecture <ArrowUpRight size={15} /></Link></div>
    </div>

    <div id="containers"><ContainerTable compact /></div>
    <ActivityLog />

    <div className="panel">
      <div className="panel-heading"><div><h3>Quick actions</h3><p>Jump into a hands-on module</p></div></div>
      <div className="quick-actions-grid">
        <button className="quick-action-card" onClick={quickCreate}><span className="quick-action-icon"><Plus size={18} /></span><b>Create Demo Container</b><small>Add a new container</small></button>
        <button className="quick-action-card" onClick={() => navigate('/architecture')}><span className="quick-action-icon"><Layers3 size={18} /></span><b>Open Architecture</b><small>Explore system design</small></button>
        <button className="quick-action-card" onClick={() => navigate('/resources')}><span className="quick-action-icon"><SlidersHorizontal size={18} /></span><b>Adjust Resource Limits</b><small>Manage CPU & memory</small></button>
        <button className="quick-action-card" onClick={() => navigate('/lifecycle')}><span className="quick-action-icon"><Workflow size={18} /></span><b>Start Lifecycle Demo</b><small>See container lifecycle</small></button>
        <button className="quick-action-card danger" onClick={quickReset}><span className="quick-action-icon"><RotateCcw size={18} /></span><b>Reset Demo Environment</b><small>Restore default setup</small></button>
      </div>
    </div>
  </div>
}
