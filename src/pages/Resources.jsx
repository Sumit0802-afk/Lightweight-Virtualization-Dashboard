import { useDashboard } from '../context/DashboardContext.jsx'
import SectionHeader from '../components/SectionHeader.jsx'

export default function Resources() {
  const { containers, updateLimit, updateCpuLimit, updateIo } = useDashboard()
  return <div className="page-stack">
    <SectionHeader eyebrow="RESOURCE CONTROLS / 04" title="Resource management" description="Explore how cgroups can help control CPU, memory, and I/O allocation." />
    <div className="info-callout">Educational simulation only. Adjusting these values does not change your computer's actual resource limits.</div>
    <div className="resource-grid">{containers.map(c => <div className="panel resource-card" key={c.id}>
      <div className="panel-heading"><div><h3>{c.name}</h3><p>{c.image}</p></div><span className={`status ${c.status.toLowerCase()}`}><span className="dot" />{c.status}</span></div>

      <label className="range-label" title="cgroups cap memory to prevent one container from exhausting host RAM."><span>Memory limit</span><b>{c.limit} MB</b></label>
      <input type="range" min="128" max="2048" step="128" value={c.limit} onChange={e => updateLimit(c.id, Number(e.target.value))} />
      <div className="range-label"><span>Memory usage</span><b>{c.memory} MB</b></div>
      <div className="progress-track"><div className="progress-fill purple" style={{ width: `${Math.min(100, c.limit ? (c.memory / c.limit) * 100 : 0)}%` }} /></div>

      <label className="range-label" title="The CPU shares a container is allowed, relative to one full core (100%)."><span>CPU limit</span><b>{c.cpuLimit}%</b></label>
      <input type="range" min="10" max="200" step="10" value={c.cpuLimit} onChange={e => updateCpuLimit(c.id, Number(e.target.value))} />
      <div className="range-label"><span>CPU usage</span><b>{c.cpu}%</b></div>
      <div className="progress-track"><div className="progress-fill" style={{ width: `${Math.min(100, c.cpu)}%` }} /></div>

      <label className="range-label" title="Relative I/O weight for block-device throttling and prioritization."><span>I/O allocation</span><b>{c.io}%</b></label>
      <input type="range" min="0" max="100" step="5" value={c.io} onChange={e => updateIo(c.id, Number(e.target.value))} />
      <div className="progress-track"><div className="progress-fill blue" style={{ width: `${c.io}%` }} /></div>

      <p className="resource-explain">Cgroups can limit and prioritize CPU, memory, and I/O usage to help prevent resource starvation between workloads.</p>
    </div>)}</div>
  </div>
}
