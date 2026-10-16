import { Play, Square, RotateCcw, Eye, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { useDashboard } from '../context/DashboardContext.jsx'

export default function ContainerTable({ compact = false }) {
  const { containers, act, removeContainer } = useDashboard()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [inspectId, setInspectId] = useState(null)
  const rows = containers.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) && (filter === 'All' || c.status === filter))
  const inspect = containers.find(c => c.id === inspectId)
  return <div className="panel"><div className="panel-heading"><div><h3>Container instances</h3><p>Manage your isolated demo environments</p></div><span className="subtle-count">{containers.length} total</span></div><div className="table-tools"><input className="field" placeholder="Search containers..." value={query} onChange={e=>setQuery(e.target.value)}/><select className="field select-field" value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Running</option><option>Stopped</option></select></div><div className="table-wrap"><table><thead><tr><th>CONTAINER</th><th>IMAGE</th><th>STATUS</th><th>CPU</th><th>MEMORY</th><th>CREATED</th><th>ACTIONS</th></tr></thead><tbody>{rows.map(c=><tr key={c.id}><td><div className="container-name"><span className="container-icon"><span className="cube">◇</span></span><div><b>{c.name}</b></div></div></td><td><small className="muted">{c.image}</small></td><td><span className={`status ${c.status.toLowerCase()}`}><span className="dot"/>{c.status}</span></td><td><span className="mini-bar"><span className="mini-bar-fill" style={{width:`${Math.min(100,c.cpu)}%`}}/></span>{c.cpu}%</td><td><span className="mini-bar"><span className="mini-bar-fill rose" style={{width:`${c.limit?Math.min(100,c.memory/c.limit*100):0}%`}}/></span>{c.memory} MB</td><td><small className="muted">{c.created || '—'}</small></td><td><div className="row-actions">{c.status==='Running'?<button className="table-action" title="Stop" onClick={()=>act(c.id,'stop')}><Square size={14}/></button>:<button className="table-action" title="Start" onClick={()=>act(c.id,'start')}><Play size={14}/></button>}<button className="table-action" title="Restart" onClick={()=>act(c.id,'restart')}><RotateCcw size={14}/></button><button className="table-action" title="Inspect" onClick={()=>setInspectId(c.id)}><Eye size={14}/></button>{!compact&&<button className="table-action danger-action" title="Remove" onClick={()=>{if(confirm(`Remove ${c.name}?`))removeContainer(c.id)}}><Trash2 size={14}/></button>}</div></td></tr>)}{rows.length===0&&<tr><td colSpan="7" className="empty-state">No containers match your search.</td></tr>}</tbody></table></div><div className="table-foot">Showing {rows.length} of {containers.length} containers <span>All metrics are simulated</span></div>
    {inspect && <div className="modal-backdrop" onClick={() => setInspectId(null)}>
      <div className="modal inspect-modal" onClick={e => e.stopPropagation()}>
        <div className="panel-heading"><div><h3>{inspect.name}</h3><p>Container inspection — simulated data</p></div><button type="button" className="icon-button" onClick={() => setInspectId(null)}><X size={15}/></button></div>
        <span className={`status ${inspect.status.toLowerCase()}`}><span className="dot"/>{inspect.status}</span>
        <div className="inspect-grid">
          <div><span>Image</span><b>{inspect.image}</b></div>
          <div><span>Type</span><b>{inspect.type || 'Custom'}</b></div>
          <div><span>CPU usage</span><b>{inspect.cpu}%</b></div>
          <div><span>Memory</span><b>{inspect.memory} MB / {inspect.limit} MB</b></div>
          <div><span>Container ID</span><b>cnt-{String(inspect.id).padStart(4, '0')}a3f</b></div>
          <div><span>Restart policy</span><b>unless-stopped</b></div>
        </div>
        <div className="inspect-section"><h4>Simulated process</h4><div className="inspect-grid">
          <div><span>PID (namespace)</span><b>{inspect.status === 'Running' ? 1 : '—'}</b></div>
          <div><span>Host PID</span><b>{inspect.status === 'Running' ? 18000 + inspect.id * 7 : '—'}</b></div>
          <div><span>Command</span><b>/entrypoint.sh</b></div>
          <div><span>Hostname (UTS)</span><b>{inspect.name.toLowerCase().replace(/\s+/g, '-')}</b></div>
        </div></div>
        <div className="inspect-section"><h4>Simulated network</h4><div className="inspect-grid">
          <div><span>Interface</span><b>veth-{String(inspect.id).padStart(2, '0')}</b></div>
          <div><span>Bridge</span><b>kernellab0</b></div>
          <div><span>Internal IP</span><b>172.18.0.{10 + inspect.id}</b></div>
          <div><span>Exposed port</span><b>{inspect.status === 'Running' ? `${8000 + inspect.id}/tcp` : 'none'}</b></div>
        </div></div>
        <div className="info-callout">Inspection data is generated locally for teaching purposes; no real container, process or network interface exists.</div>
      </div>
    </div>}
  </div>
}
