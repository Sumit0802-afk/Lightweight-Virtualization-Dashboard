# KernelLab Dashboard — Extreme Red Edition

A React + Vite dashboard for an Operating Systems presentation on Lightweight Virtualization, styled as a premium red/black cyber command center — Overview command-center hero with sparkline metrics, container management, architecture and namespace explorers, resource (cgroups) controls, a dual lifecycle simulator, a VM comparison, a security checklist, a knowledge quiz, and a full-screen Presentation Mode.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Modules
- **Overview** — metric cards, simulated CPU/memory charts, container table, activity log, quick actions
- **Containers** — create/start/stop/restart/inspect/remove simulated containers
- **Architecture Explorer** — shared-kernel stack vs. VM/hypervisor stack
- **Resource Management** — per-container CPU, memory, and I/O limit sliders (cgroups concept)
- **Container Lifecycle** — Build → Store/Pull → Create → Run → Stop & Remove stepper, plus a live Created → Running → Paused → Stopped → Removed state simulator
- **Containers vs VMs** — side-by-side comparison
- **OS Mechanisms** — namespaces (PID, Network, Mount, IPC, UTS, User) with a per-container inspector
- **Security Center** — risks and an interactive deployment checklist
- **Tools & Applications** — Docker, Podman, LXC, Kubernetes
- **Quiz & Knowledge Check** — scored multiple-choice quiz
- **References** — sources and conclusion
- **Presentation Mode** — full-screen slide walkthrough of the key concepts

## Notes
- All CPU, memory, container status, and network values are simulated educational demo data, not real host telemetry.
- Container controls update local React state only; they do not run Docker or any real container runtime.
