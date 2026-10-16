import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'
import { Activity, Bell, Box, Boxes, BookOpen, Cpu, GitCompare, GraduationCap, Layers3, LayoutDashboard, Menu, Network, PanelLeftClose, Presentation, RotateCcw, Search, ShieldCheck, UserRound, Workflow } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDashboard } from '../context/DashboardContext.jsx'

const team = ['24BCE8041', '24BCE8097', '24BCE7471', '24BCD7025', '24BCE7506', '24BCE7950']

const nav = [
  ['Overview', '/', LayoutDashboard], ['Containers', '/containers', Boxes],
  ['Architecture Explorer', '/architecture', Layers3], ['Resource Management', '/resources', Cpu],
  ['Container Lifecycle', '/lifecycle', Workflow], ['Containers vs VMs', '/comparison', GitCompare],
  ['OS Mechanisms', '/mechanisms', Network], ['Security Center', '/security', ShieldCheck],
  ['Tools & Applications', '/tools', Box], ['Quiz & Knowledge Check', '/quiz', GraduationCap],
  ['References', '/references', BookOpen],
]

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [seenCount, setSeenCount] = useState(0)
  const notifRef = useRef(null)
  const profileRef = useRef(null)
  const loc = useLocation()
  const { activity, reset } = useDashboard()
  const title = nav.find(n => n[1] === loc.pathname)?.[0] || 'Overview'
  const unread = Math.max(0, activity.length - seenCount)

  useEffect(() => {
    function onClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function toggleNotif() {
    setProfileOpen(false)
    setNotifOpen(o => { if (!o) setSeenCount(activity.length); return !o })
  }

  return <div className="app-shell">
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="brand"><div className="brand-icon"><Layers3 size={20}/></div>{!collapsed && <div><b>KernelLab</b><small>VIRTUALIZATION LAB</small></div>}</div>
      <div className="nav-label">{!collapsed && 'WORKSPACE'}</div>
      <nav>{nav.map(([label, path, Icon]) => <NavLink key={path} to={path} onClick={() => setMobileOpen(false)} className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} title={label}><Icon size={18}/>{!collapsed && <span>{label}</span>}</NavLink>)}</nav>
      <div className="sidebar-bottom">{!collapsed && <>
        <div className="team-label">OPERATING SYSTEMS · B.TECH CSE</div>
        <div className="sidebar-status"><span className="dot" /><span>SYSTEM OPERATIONAL</span></div>
        <div className="sidebar-team">
          <div className="sidebar-team-head"><UserRound size={11}/> TEAM MEMBERS</div>
          <div className="sidebar-team-grid">{team.map(id => <span key={id} className="sidebar-team-chip">{id}</span>)}</div>
        </div>
      </>}<button className="icon-button collapse-button" onClick={() => setCollapsed(!collapsed)} aria-label="Collapse sidebar"><PanelLeftClose size={17}/></button></div>
    </aside>
    <main className="main-area">
      <header className="topbar">
        <button className="icon-button mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}><Menu size={19}/></button>
        <div className="crumb"><span>KernelLab</span><span className="slash">/</span><b>{title}</b></div>
        <div className="top-actions">
          <div className="search-mini"><Search size={15}/><input placeholder="Search dashboard" onKeyDown={e => {if(e.key==='Enter'){const term=e.currentTarget.value.toLowerCase(); const item=nav.find(n=>n[0].toLowerCase().includes(term)); if(item) window.location.href=item[1]}}}/><kbd>↵</kbd></div>
          <span className="status-live"><span className="dot"/> LIVE</span>
          <Link className="button secondary presentation-button" to="/presentation"><Presentation size={15}/> <span>Presentation Mode</span></Link>
          <div className="notif-wrap" ref={notifRef}>
            <button className="icon-button notif-button" onClick={toggleNotif} aria-label="Notifications"><Bell size={17}/>{unread > 0 && <span className="notif-badge">{unread > 9 ? '9+' : unread}</span>}</button>
            {notifOpen && <div className="notif-panel">
              <div className="notif-panel-head"><Activity size={14}/><b>Recent activity</b></div>
              <div className="notif-panel-list">
                {activity.slice(0, 8).map(a => <div className="notif-panel-item" key={a.id}><span>{a.message}</span><small>{a.time}</small></div>)}
                {activity.length === 0 && <div className="empty-state">No activity yet.</div>}
              </div>
            </div>}
          </div>
          <div className="profile-wrap" ref={profileRef}>
            <button className="profile-button" onClick={() => { setNotifOpen(false); setProfileOpen(o => !o) }} aria-label="Operator menu">
              <span className="profile-avatar">KL</span>
            </button>
            {profileOpen && <div className="profile-panel">
              <div className="profile-panel-head">KernelLab Operator</div>
              <div className="profile-panel-sub">Demo session · Simulated environment</div>
              <div className="profile-panel-tag">Theme: Extreme Red</div>
              <button className="button secondary" onClick={() => { if (confirm('Reset the demo environment?')) { reset(); setProfileOpen(false) } }}><RotateCcw size={13}/> Reset environment</button>
            </div>}
          </div>
        </div>
      </header>
      <div className="page-content"><Outlet/></div>
      <footer className="footer"><span>KernelLab · Lightweight Virtualization Explorer</span><span>Educational simulation · Not real system telemetry</span></footer>
    </main>
  </div>
}
