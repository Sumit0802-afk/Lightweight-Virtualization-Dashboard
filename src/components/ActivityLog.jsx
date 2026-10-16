import { Activity, AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import { useDashboard } from '../context/DashboardContext.jsx'
export default function ActivityLog({ limit = 5 }) {
  const { activity } = useDashboard()
  const icon = type => type==='warning'?AlertTriangle:type==='success'?CheckCircle2:Info
  return <div className="panel"><div className="panel-heading"><div><h3>Activity log</h3><p>Recent events from your demo environment</p></div><Activity size={17} className="muted"/></div><div className="activity-list">{activity.slice(0,limit).map(a=>{const Icon=icon(a.type);return <div className="activity-item" key={a.id}><span className={`activity-icon ${a.type}`}><Icon size={15}/></span><div className="activity-message"><b>{a.message}</b><small>{a.time}</small></div></div>})}{activity.length===0&&<div className="empty-state">No activity yet.</div>}</div></div>
}