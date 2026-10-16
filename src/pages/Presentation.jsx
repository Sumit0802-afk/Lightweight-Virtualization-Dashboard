import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Expand, Minimize, X, Fingerprint, Target, TrendingUp,
  Boxes, Package, ShieldCheck, Layers3, Workflow, Cpu, SlidersHorizontal, Network,
  Hammer, Download, Play, Trash2, Zap, Share2, ShieldAlert, AlertTriangle,
  Box, CheckCircle2, Globe, GitBranch, Cloud, Server, CheckCircle, AlertCircle,
} from 'lucide-react'

const team = ['24BCE8041', '24BCE8097', '24BCE7471', '24BCD7025', '24BCE7506', '24BCE7950']

const slides = [
  {
    kicker: 'OPERATING SYSTEMS · B.TECH CSE',
    title: 'Lightweight Virtualization',
    body: 'Isolates applications using a shared OS kernel instead of full OS emulation. Enables multiple isolated environments on a single host — efficiently, without the overhead of separate guest operating systems.',
    kind: 'columns',
    columns: [
      [Fingerprint, 'Definition', 'Isolate apps via shared OS kernel — no full OS emulation needed.'],
      [Target, 'Purpose', 'Fast, efficient environments for running multiple isolated apps on one host.'],
      [TrendingUp, 'Importance', 'Scalable, portable, resource-efficient deployment in modern OS and cloud.'],
    ],
    team: true,
  },
  {
    kicker: 'HOW CONTAINERS WORK',
    title: 'How containers work',
    kind: 'list',
    items: [
      [Boxes, 'Isolated application containers', 'Applications run in isolated containers that share the host OS kernel, with no separate guest OS needed.'],
      [Package, 'Packages app and dependencies', 'Each container bundles the application and its dependencies, ensuring consistent and portable execution.'],
      [ShieldCheck, 'Host OS enforces isolation', 'The host OS kernel manages resources and enforces isolation between containers using namespaces and cgroups.'],
    ],
  },
  {
    kicker: 'ARCHITECTURE OF LIGHTWEIGHT VIRTUALIZATION',
    title: 'The container stack',
    kind: 'list',
    items: [
      [Layers3, 'Applications & container layer', 'Apps and their dependencies are bundled inside containers, ensuring consistent and isolated execution environments.'],
      [Workflow, 'Container runtime (e.g., containerd)', 'The container runtime manages the full container lifecycle: creation, execution, pause, and removal of containers.'],
      [Cpu, 'Host OS kernel & hardware', 'Containers share the host OS kernel for system calls. The kernel directly interfaces with underlying hardware resources.'],
    ],
  },
  {
    kicker: 'COMPARISON',
    title: 'Containers vs. virtual machines',
    kind: 'vscompare',
    left: { icon: Box, tag: 'LIGHTWEIGHT', title: 'Containers', points: ['Shares host OS kernel', 'Process-level isolation', 'Near-instant startup', 'Minimal resource use', 'Highly portable across environments'] },
    right: { icon: Server, tag: 'HEAVYWEIGHT', title: 'Virtual machines', points: ['Includes full guest OS', 'Hardware-level isolation', 'Slower startup (minutes)', 'High CPU & memory use', 'Less portable, OS-dependent'] },
    aspects: ['Kernel usage', 'Isolation level', 'Startup time', 'Resource use', 'Portability'],
  },
  {
    kicker: 'CORE OS MECHANISMS',
    title: 'Core OS mechanisms',
    kind: 'list',
    items: [
      [Fingerprint, 'Linux namespaces', 'Isolate process IDs, network stacks, mount points, IPC, UTS (hostname), and user IDs — giving each container its own private OS view.'],
      [SlidersHorizontal, 'Control groups (cgroups)', 'Limit and prioritize CPU, memory, and I/O per container. Prevent resource starvation and ensure fair distribution across all running containers.'],
      [Network, 'Resource & network isolation', 'CPU scheduling and memory management distribute resources fairly. Overlay filesystems provide isolated file views; virtual network interfaces isolate traffic.'],
    ],
  },
  {
    kicker: 'CONTAINER LIFECYCLE',
    title: 'Five stages of a container',
    kind: 'list',
    items: [
      [Hammer, 'Build', 'Define the app environment in a Dockerfile and build a reusable container image.'],
      [Download, 'Store / Pull', 'Push the image to a registry (e.g., Docker Hub) or pull an existing image to local storage.'],
      [Box, 'Create', 'Instantiate the image using a container runtime (e.g., containerd) to create a container instance.'],
      [Play, 'Run', 'Execute the application inside the isolated container with allocated resources.'],
      [Trash2, 'Stop & Remove', 'Terminate the running container and clean up resources, freeing the host system.'],
    ],
  },
  {
    kicker: 'ADVANTAGES OF LIGHTWEIGHT VIRTUALIZATION',
    title: 'Why it matters',
    kind: 'list',
    items: [
      [Zap, 'Low overhead & fast startup', 'Minimal resource consumption vs. VMs; containers start in milliseconds with near-zero boot time.'],
      [Share2, 'Portability & efficient hardware use', 'Shared kernel reduces duplication; containers run consistently across dev, test, and production environments.'],
      [TrendingUp, 'Scalability & cloud-ready architecture', 'Ideal for microservices and cloud platforms; scale individual services independently with minimal overhead.'],
    ],
  },
  {
    kicker: 'LIMITATIONS AND SECURITY CHALLENGES',
    title: 'Trade-offs of a shared kernel',
    kind: 'list',
    items: [
      [ShieldAlert, 'Shared kernel', 'Shared kernel expands attack surface; a compromised container may affect the host OS and all sibling containers.'],
      [AlertTriangle, 'Isolation gaps', 'Weaker isolation than full VMs risks container breakout; resource contention without proper cgroup limits.'],
      [ShieldCheck, 'Secure deploy', 'Best practices: least privilege, regular updates, image scanning, runtime security tools, and minimal base images.'],
    ],
  },
  {
    kicker: 'TYPES OF LIGHTWEIGHT VIRTUALIZATION',
    title: 'Types of lightweight virtualization',
    kind: 'list',
    items: [
      [Layers3, 'OS-level virtualization', 'Multiple isolated environments share the same host operating-system kernel.'],
      [Box, 'Containers', 'Package applications and dependencies into isolated execution environments.'],
      [Boxes, 'Application virtualization', 'Applications run in isolated environments without traditional installation on the host.'],
      [ShieldCheck, 'Sandboxing', 'Applications execute in restricted environments to limit access to system resources.'],
      [Package, 'Examples', 'Docker containers, Linux LXC, and application sandboxes.'],
    ],
  },
  {
    kicker: 'POPULAR TOOLS AND FUTURE SCOPE',
    title: 'Popular tools and future scope',
    kind: 'tools',
    tools: [
      [Box, 'Docker', 'Builds, packages, and runs applications in containers.'],
      [Layers3, 'Podman', 'Manages containers without requiring a central daemon.'],
      [Workflow, 'LXC', 'Provides system containers using Linux kernel features.'],
      [Cloud, 'Kubernetes', 'Orchestrates containerized applications across multiple machines.'],
    ],
    future: [
      'Increased adoption of cloud-native applications.',
      'Efficient deployment of microservices.',
      'Improved container security and isolation.',
      'Integration with edge computing and automated infrastructure.',
      'Better resource management in large-scale distributed systems.',
    ],
  },
  {
    kicker: 'APPLICATIONS AND REAL-WORLD EXAMPLES',
    title: 'Applications & real-world examples',
    kind: 'list',
    items: [
      [Globe, 'Web & microservices', 'Containers enable rapid scaling of web apps and modular microservices deployment.'],
      [GitBranch, 'CI/CD pipelines', 'Docker automates builds, testing, and deployment in continuous integration workflows.'],
      [Cloud, 'Cloud & orchestration', 'Kubernetes orchestrates containers across cloud platforms for high availability.'],
    ],
  },
  {
    kicker: 'CONCLUSION & REFERENCES',
    title: 'Key takeaway & references',
    body: 'Lightweight virtualization shares the host kernel to run isolated applications with low overhead and fast startup. It improves portability and scalability, but requires careful isolation and security configuration.',
    kind: 'conclusion',
    checklist: [['Efficient deployment', 'ok'], ['Portability & scalability', 'ok'], ['Security trade-offs', 'warn'], ['Cloud & OS essential', 'ok']],
    references: ['Operating System Concepts — Silberschatz, Galvin & Gagne', 'Linux kernel documentation: namespaces and cgroups', 'Docker Documentation'],
  },
]

export default function Presentation() {
  const [i, setI] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const slide = slides[i]
  const go = n => setI(Math.max(0, Math.min(slides.length - 1, n)))

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') go(i + 1)
      if (e.key === 'ArrowLeft') go(i - 1)
      if (e.key === 'Escape' && document.fullscreenElement) document.exitFullscreen()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [i])

  useEffect(() => {
    function onChange() { setFullscreen(!!document.fullscreenElement) }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }

  return <div className="presentation-shell">
    <div className="presentation-progress"><div className="presentation-progress-fill" style={{ width: `${((i + 1) / slides.length) * 100}%` }} /></div>
    <header className="presentation-bar">
      <span className="presentation-brand">KernelLab</span>
      <span className="presentation-count">SLIDE {String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
      <div className="presentation-actions">
        <button className="icon-button" onClick={toggleFullscreen} title={fullscreen ? 'Exit full screen' : 'Full screen'}>{fullscreen ? <Minimize size={16} /> : <Expand size={16} />}</button>
        <Link className="icon-button" to="/" title="Exit presentation mode"><X size={16} /></Link>
      </div>
    </header>
    <div className="presentation-stage" key={i}>
      <div className="eyebrow">{slide.kicker}</div>
      <h1>{slide.title}</h1>
      {slide.body && <p className="presentation-body">{slide.body}</p>}

      {slide.kind === 'columns' && <div className="presentation-columns">{slide.columns.map(([Icon, t, d]) => <div key={t}><span className="presentation-icon"><Icon size={16} /></span><b>{t}</b><span>{d}</span></div>)}</div>}
      {slide.kind === 'columns' && slide.team && <div className="presentation-team">{team.map(id => <span key={id}>{id}</span>)}</div>}

      {slide.kind === 'list' && <div className="presentation-list">{slide.items.map(([Icon, t, d]) => <div key={t} className="presentation-list-item"><span className="presentation-icon"><Icon size={16} /></span><div><b>{t}</b><span>{d}</span></div></div>)}</div>}

      {slide.kind === 'vscompare' && <div className="presentation-vscompare">
        <div className="vscompare-grid">
          <div><span className="tag"><slide.left.icon size={12} /> {slide.left.tag}</span><h3>{slide.left.title}</h3><ul>{slide.left.points.map(p => <li key={p}>{p}</li>)}</ul></div>
          <div><span className="tag"><slide.right.icon size={12} /> {slide.right.tag}</span><h3>{slide.right.title}</h3><ul>{slide.right.points.map(p => <li key={p}>{p}</li>)}</ul></div>
        </div>
        <div className="vscompare-aspects">{slide.aspects.map(a => <span key={a}>{a}</span>)}</div>
      </div>}

      {slide.kind === 'tools' && <div className="presentation-tools">
        <div><h4>Popular tools</h4><ul>{slide.tools.map(([Icon, t, d]) => <li key={t}><span className="presentation-icon small"><Icon size={13} /></span><span><b>{t}</b> — {d}</span></li>)}</ul></div>
        <div><h4>Future scope</h4><ul>{slide.future.map(f => <li key={f}><span className="presentation-icon small"><TrendingUp size={13} /></span><span>{f}</span></li>)}</ul></div>
      </div>}

      {slide.kind === 'conclusion' && <div className="presentation-conclusion">
        {slide.checklist.map(([label, status]) => <div className="conclusion-row" key={label}><span>{label}</span><span className={status === 'ok' ? 'status-ok' : 'status-warn'}>{status === 'ok' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}</span></div>)}
        <div className="presentation-refs"><b>References</b>{slide.references.map(r => <div key={r}>• {r}</div>)}</div>
      </div>}
    </div>
    <footer className="presentation-controls">
      <button className="button secondary" disabled={i === 0} onClick={() => go(i - 1)}><ArrowLeft size={15} /> Previous</button>
      <div className="presentation-dots">{slides.map((_, idx) => <span key={idx} className={idx === i ? 'active' : ''} onClick={() => go(idx)} />)}</div>
      <button className="button primary" disabled={i === slides.length - 1} onClick={() => go(i + 1)}>Next <ArrowRight size={15} /></button>
    </footer>
  </div>
}
