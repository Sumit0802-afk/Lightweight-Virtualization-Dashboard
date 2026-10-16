import { useState } from 'react'
import { Plus, Boxes } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import ContainerTable from '../components/ContainerTable.jsx'
import { useDashboard } from '../context/DashboardContext.jsx'

export default function Containers() {
  const { addContainer, containers } = useDashboard()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [image, setImage] = useState('nginx:latest')
  const [type, setType] = useState('Web')
  const [cpuLimit, setCpuLimit] = useState(100)
  const [limit, setLimit] = useState(512)
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!name.trim()) return setError('Container name is required.')
    if (containers.some(c => c.name.toLowerCase() === name.trim().toLowerCase())) return setError('A container with this name already exists.')
    if (!image.trim()) return setError('Image name is required.')
    addContainer({ name: name.trim(), image: image.trim(), type, cpuLimit, limit, io: 40 })
    setName(''); setImage('nginx:latest'); setType('Web'); setCpuLimit(100); setLimit(512); setError(''); setOpen(false)
  }

  return <div className="page-stack">
    <SectionHeader eyebrow="WORKLOADS / 02" title="Containers" description="Manage the state of your simulated container instances." action={<button className="button primary" onClick={() => setOpen(true)}><Plus size={16} /> Create container</button>} />
    <div className="metrics-grid three">
      <div className="mini-stat"><Boxes /><span>Total containers</span><b>{containers.length}</b></div>
      <div className="mini-stat"><span className="dot green-dot" /><span>Running</span><b>{containers.filter(c => c.status === 'Running').length}</b></div>
      <div className="mini-stat"><span className="dot red-dot" /><span>Stopped</span><b>{containers.filter(c => c.status === 'Stopped').length}</b></div>
    </div>
    <ContainerTable />
    <div className="info-callout">These are simulated container instances. This frontend does not start or stop actual Docker containers.</div>
    {open && <div className="modal-backdrop" onClick={() => setOpen(false)}>
      <form className="modal" onSubmit={submit} onClick={e => e.stopPropagation()}>
        <div className="panel-heading"><div><h3>Create demo container</h3><p>Add an instance to the local simulation.</p></div><button type="button" className="icon-button" onClick={() => setOpen(false)}>×</button></div>
        <label>Container name<input className="field" required value={name} onChange={e => { setName(e.target.value); setError('') }} placeholder="e.g. Worker Service" /></label>
        <label>Image name<input className="field" required value={image} onChange={e => { setImage(e.target.value); setError('') }} placeholder="node:20-alpine" /></label>
        <label>Application type<select className="field" value={type} onChange={e => setType(e.target.value)}><option>Web</option><option>API</option><option>Database</option><option>Cache</option><option>Worker</option></select></label>
        <label>CPU limit<div className="range-label"><span>Relative to one core</span><b>{cpuLimit}%</b></div><input type="range" min="10" max="200" step="10" value={cpuLimit} onChange={e => setCpuLimit(Number(e.target.value))} /></label>
        <label>Memory limit<div className="range-label"><span>Maximum memory</span><b>{limit} MB</b></div><input type="range" min="128" max="2048" step="128" value={limit} onChange={e => setLimit(Number(e.target.value))} /></label>
        {error && <div className="quiz-feedback incorrect">{error}</div>}
        <div className="modal-actions"><button type="button" className="button secondary" onClick={() => setOpen(false)}>Cancel</button><button className="button primary" type="submit">Create container</button></div>
      </form>
    </div>}
  </div>
}
