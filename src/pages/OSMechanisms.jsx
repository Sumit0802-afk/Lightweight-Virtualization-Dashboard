import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import { useDashboard } from '../context/DashboardContext.jsx'

const ns = [
  ['PID', 'Process IDs are isolated so a container sees its own process view.'],
  ['Network', 'Each container can have an isolated network stack and interfaces.'],
  ['Mount', 'Mount namespaces provide a separate view of filesystem mounts.'],
  ['IPC', 'IPC namespaces isolate inter-process communication resources.'],
  ['UTS', 'UTS namespaces allow separate hostname and domain-name views.'],
  ['User', 'User namespaces map user and group IDs between namespaces.'],
]

function namespaceView(type, c) {
  const slug = c.name.toLowerCase().replace(/\s+/g, '-')
  switch (type) {
    case 'PID': return [['Container-local PID', c.status === 'Running' ? 1 : '—'], ['Host-visible PID', c.status === 'Running' ? 18000 + c.id * 7 : '—'], ['Visible processes', c.status === 'Running' ? '1 (isolated tree)' : '0 (stopped)']]
    case 'Network': return [['Interface', `veth-${String(c.id).padStart(2, '0')}`], ['Internal IP', `172.18.0.${10 + c.id}`], ['Bridge', 'kernellab0']]
    case 'Mount': return [['Root view', `/var/lib/kernellab/${slug}/rootfs`], ['Mounted volumes', '1 (overlay)'], ['Visible to host', 'No — isolated mount table']]
    case 'IPC': return [['Shared memory segment', `ipc-${slug}`], ['Message queues', '0'], ['Visible to other containers', 'No']]
    case 'UTS': return [['Hostname', slug], ['Domain name', 'kernellab.local']]
    case 'User': return [['Container root UID', '0 (mapped)'], ['Host UID', String(100000 + c.id)], ['Mapping range', '65536 IDs']]
    default: return []
  }
}

export default function OSMechanisms() {
  const { containers } = useDashboard()
  const [active, setActive] = useState(0)
  const [containerId, setContainerId] = useState(containers[0]?.id)
  const container = containers.find(c => c.id === containerId) || containers[0]

  return <div className="page-stack">
    <SectionHeader eyebrow="KERNEL MECHANISMS / 07" title="OS mechanisms" description="Explore namespaces, cgroups, and resource isolation." />
    <div className="two-column">
      <div className="panel">
        <div className="panel-heading"><div><h3>Linux namespaces</h3><p>Select a namespace type.</p></div></div>
        <div className="clickable-layers">{ns.map((n, i) => <button className={`click-layer ${active === i ? 'chosen' : ''}`} key={n[0]} onClick={() => setActive(i)}><span className="layer-index">{n[0]}</span><span><b>{n[0]} namespace</b><small>{n[1]}</small></span></button>)}</div>
      </div>
      <div className="panel detail-panel">
        <div className="eyebrow">SELECTED MECHANISM</div>
        <h2>{ns[active][0]} namespace</h2>
        <p>{ns[active][1]}</p>
        <div className="info-callout">Namespaces provide isolation of system resource views. They do not create a separate kernel for each container.</div>
        <h3>Control groups (cgroups)</h3>
        <p>Cgroups help limit and prioritize CPU, memory, and I/O resources for groups of processes.</p>
        <Link className="link-arrow" to="/resources" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 11 }}>Try it in Resource Management <ArrowUpRight size={14} /></Link>
      </div>
    </div>
    <div className="panel">
      <div className="panel-heading"><div><h3>Inspect an isolated container view</h3><p>Compare how the selected namespace looks per container.</p></div></div>
      <div className="toggle-row"><span>Container</span><div className="segmented">{containers.map(c => <button key={c.id} className={containerId === c.id ? 'selected' : ''} onClick={() => setContainerId(c.id)}>{c.name}</button>)}</div></div>
      {container && <div className="inspect-grid" style={{ marginTop: 14 }}>{namespaceView(ns[active][0], container).map(([k, v]) => <div key={k}><span>{k}</span><b>{v}</b></div>)}</div>}
    </div>
    <div className="panel">
      <div className="panel-heading"><div><h3>Isolation building blocks</h3><p>Other supporting OS mechanisms</p></div></div>
      <div className="feature-grid">
        <div><b>CPU scheduling</b><p>Distributes CPU time between runnable processes.</p></div>
        <div><b>Memory management</b><p>Tracks and manages memory allocations.</p></div>
        <div><b>Overlay filesystems</b><p>Can provide layered filesystem views for container images.</p></div>
        <div><b>Virtual networking</b><p>Interfaces and network namespaces help separate traffic.</p></div>
      </div>
    </div>
  </div>
}
