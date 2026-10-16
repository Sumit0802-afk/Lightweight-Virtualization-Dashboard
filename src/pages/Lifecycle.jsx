import { useState } from 'react'
import { ArrowLeft, ArrowRight, Play, Pause, RotateCcw, Plus, Square, Trash2 } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import { useDashboard } from '../context/DashboardContext.jsx'

const stages = [['Build', 'Define the app environment and create a reusable container image.'], ['Store / Pull', 'Push an image to a registry or pull an existing image to local storage.'], ['Create', 'Instantiate an image using a container runtime.'], ['Run', 'Execute the application inside the isolated container.'], ['Stop & Remove', 'Terminate the container and release allocated demo resources.']]

const SIM_STATES = ['Created', 'Running', 'Paused', 'Stopped', 'Removed']

export default function Lifecycle() {
  const { log } = useDashboard()
  const [stage, setStage] = useState(0)
  const [instance, setInstance] = useState({ name: 'sim-instance-1', state: 'Created' })
  const [simLog, setSimLog] = useState([{ id: 1, msg: 'sim-instance-1 created', time: new Date().toLocaleTimeString() }])

  function go(n) {
    const next = Math.max(0, Math.min(4, n))
    setStage(next)
    log(`Lifecycle demo: ${stages[next][0]}`)
  }

  function record(msg) {
    setSimLog(prev => [{ id: Date.now() + Math.random(), msg, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 8))
    log(`Simulator: ${msg}`)
  }

  function transition(action) {
    setInstance(prev => {
      const s = prev.state
      let next = s
      if (action === 'create') next = 'Created'
      else if (action === 'start' && (s === 'Created' || s === 'Stopped')) next = 'Running'
      else if (action === 'pause' && s === 'Running') next = 'Paused'
      else if (action === 'resume' && s === 'Paused') next = 'Running'
      else if (action === 'stop' && (s === 'Running' || s === 'Paused')) next = 'Stopped'
      else if (action === 'restart') next = 'Running'
      else if (action === 'remove' && s === 'Stopped') next = 'Removed'
      if (next === s && action !== 'restart') return prev
      record(`${prev.name} → ${next}`)
      return { ...prev, state: next }
    })
  }

  function createNew() {
    const name = `sim-instance-${Math.floor(Math.random() * 900 + 100)}`
    setInstance({ name, state: 'Created' })
    record(`${name} created`)
  }

  const removed = instance.state === 'Removed'

  return <div className="page-stack">
    <SectionHeader eyebrow="CONTAINER WORKFLOW / 05" title="Container lifecycle" description="Step through the five stages of a container's lifecycle." />
    <div className="panel lifecycle-panel">
      <div className="stepper">{stages.map((s, i) => <button key={s[0]} onClick={() => go(i)} className={`step ${i === stage ? 'current' : ''} ${i < stage ? 'complete' : ''}`}><span>{i < stage ? '✓' : `0${i + 1}`}</span><b>{s[0]}</b></button>)}</div>
      <div className="lifecycle-content">
        <div className="big-step">0{stage + 1}</div>
        <div className="eyebrow">CURRENT STAGE</div>
        <h2>{stages[stage][0]}</h2>
        <p>{stages[stage][1]}</p>
        <div className="lifecycle-controls">
          <button className="button secondary" disabled={stage === 0} onClick={() => go(stage - 1)}><ArrowLeft size={15} /> Previous</button>
          <button className="button secondary" onClick={() => { setStage(0); log('Lifecycle demo reset') }}><RotateCcw size={15} /> Reset</button>
          <button className="button primary" onClick={() => go(stage + 1)} disabled={stage === 4}>Next <ArrowRight size={15} /></button>
        </div>
        <p className="muted">This is a teaching simulation, not actual container execution.</p>
      </div>
    </div>

    <div className="panel">
      <div className="panel-heading"><div><h3>Live container state simulator</h3><p>Created → Running → Paused → Stopped → Removed</p></div></div>
      <div className="sim-panel">
        <div className="sim-state-row">
          {SIM_STATES.map((s, i) => {
            const curIdx = SIM_STATES.indexOf(instance.state)
            const cls = s === instance.state ? 'active' : i < curIdx ? 'done' : ''
            return <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className={`sim-state-chip ${cls}`}>{s}</span>{i < SIM_STATES.length - 1 && <span className="sim-arrow">→</span>}</span>
          })}
        </div>
        <div className="info-callout">{removed ? `${instance.name} has been removed. Create a new instance to continue.` : `Instance "${instance.name}" is currently ${instance.state}.`}</div>
        <div className="sim-controls">
          <button className="button secondary" disabled={!removed} onClick={createNew}><Plus size={14} /> Create</button>
          <button className="button secondary" disabled={removed || instance.state === 'Running'} onClick={() => transition('start')}><Play size={14} /> Start</button>
          <button className="button secondary" disabled={instance.state !== 'Running'} onClick={() => transition('pause')}><Pause size={14} /> Pause</button>
          <button className="button secondary" disabled={instance.state !== 'Paused'} onClick={() => transition('resume')}><Play size={14} /> Resume</button>
          <button className="button secondary" disabled={!(instance.state === 'Running' || instance.state === 'Paused')} onClick={() => transition('stop')}><Square size={14} /> Stop</button>
          <button className="button secondary" disabled={removed} onClick={() => transition('restart')}><RotateCcw size={14} /> Restart</button>
          <button className="button secondary danger-action" disabled={instance.state !== 'Stopped'} onClick={() => { if (confirm(`Remove ${instance.name}? This cannot be undone.`)) transition('remove') }}><Trash2 size={14} /> Remove</button>
        </div>
        <div className="sim-log">{simLog.map(l => <div className="sim-log-item" key={l.id}><b>{l.msg}</b><small>{l.time}</small></div>)}</div>
      </div>
    </div>
  </div>
}
