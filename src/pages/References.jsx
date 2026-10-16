import { ExternalLink, BookOpen, CheckCircle2, UserRound } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'

const refs = [
  ['Operating System Concepts', 'Silberschatz, Galvin & Gagne', 'Reference textbook for operating-system concepts.'],
  ['Linux kernel documentation', 'Namespaces and control groups', 'Official kernel documentation for isolation and resource management.', 'https://docs.kernel.org/'],
  ['Docker documentation', 'Containers and container lifecycle', 'Official documentation for container workflows.', 'https://docs.docker.com/'],
]

const team = ['24BCE8041', '24BCE8097', '24BCE7471', '24BCD7025', '24BCE7506', '24BCE7950']

export default function References() {
  return <div className="page-stack">
    <SectionHeader eyebrow="PROJECT NOTES / 11" title="References & conclusion" description="Sources and key takeaways from the OS presentation." />

    <div className="panel">
      <div className="panel-heading"><div><h3>References</h3><p>Resources used to support this educational dashboard.</p></div></div>
      <div className="reference-list">{refs.map((r, i) => <div className="reference-item" key={r[0]}><span className="reference-number">0{i + 1}</span><div><b>{r[0]}</b><p>{r[1]} — {r[2]}</p>{r[3] && <a href={r[3]} target="_blank" rel="noreferrer">Open official resource <ExternalLink size={14} /></a>}</div></div>)}</div>
    </div>

    <div className="panel conclusion">
      <CheckCircle2 size={24} />
      <div><div className="eyebrow">KEY TAKEAWAY</div><h2>Efficient isolation with a shared kernel</h2><p>Lightweight virtualization enables efficient, portable, and scalable application deployment by sharing the host kernel. Its benefits depend on appropriate resource management, isolation, and security configuration.</p></div>
    </div>

    <div className="panel">
      <div className="panel-heading"><div><h3>Team members</h3><p>KernelLab · Operating Systems · B.Tech CSE</p></div><span className="subtle-count">{team.length} contributors</span></div>
      <div className="team-grid">{team.map((id, i) => <div className="team-member-card" key={id}>
        <span className="team-avatar"><UserRound size={18} /></span>
        <div><b>{id}</b><small>Team member {i + 1}</small></div>
      </div>)}</div>
    </div>
  </div>
}
