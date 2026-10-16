import { createContext, useContext, useMemo, useState } from 'react'

const initialContainers = [
  { id: 1, name: 'nginx-web', image: 'nginx:latest', status: 'Running', cpu: 12, memory: 256, limit: 512, cpuLimit: 100, io: 40, type: 'Web', created: '2h 15m ago' },
  { id: 2, name: 'node-api', image: 'node:20-alpine', status: 'Running', cpu: 18, memory: 384, limit: 768, cpuLimit: 100, io: 55, type: 'API', created: '1h 20m ago' },
  { id: 3, name: 'postgres-db', image: 'postgres:16', status: 'Running', cpu: 9, memory: 512, limit: 1024, cpuLimit: 150, io: 70, type: 'Database', created: '3h 40m ago' },
  { id: 4, name: 'redis-cache', image: 'redis:7', status: 'Running', cpu: 7, memory: 128, limit: 256, cpuLimit: 50, io: 25, type: 'Cache', created: '45m ago' },
  { id: 5, name: 'ubuntu-lab', image: 'ubuntu:22.04', status: 'Stopped', cpu: 0, memory: 0, limit: 512, cpuLimit: 100, io: 30, type: 'Worker', created: '5h 02m ago' },
]
const Context = createContext(null)

export function DashboardProvider({ children }) {
  const [containers, setContainers] = useState(initialContainers)
  const [activity, setActivity] = useState([{ id: 1, message: 'Demo environment initialized', time: new Date().toLocaleTimeString(), type: 'info' }])
  const [securityChecks, setSecurityChecks] = useState({})
  const log = (message, type = 'info') => setActivity(prev => [{ id: Date.now() + Math.random(), message, time: new Date().toLocaleTimeString(), type }, ...prev].slice(0, 30))
  const act = (id, action) => {
    setContainers(prev => prev.map(c => c.id !== id ? c : ({
      ...c, status: action === 'stop' ? 'Stopped' : 'Running',
      cpu: action === 'stop' ? 0 : Math.max(c.cpu, 5),
      memory: action === 'stop' ? 0 : Math.max(c.memory, 96)
    })))
    const c = containers.find(x => x.id === id)
    if (c) log(`${c.name} ${action === 'stop' ? 'stopped' : action === 'restart' ? 'restarted' : 'started'}`)
  }
  const addContainer = data => {
    const id = Math.max(0, ...containers.map(c => c.id)) + 1
    setContainers(prev => [...prev, { id, limit: 512, cpuLimit: 100, io: 40, created: 'Just now', ...data, status: 'Stopped', cpu: 0, memory: 0 }])
    log(`${data.name} created`)
  }
  const removeContainer = id => {
    const c = containers.find(x => x.id === id)
    setContainers(prev => prev.filter(x => x.id !== id))
    if (c) log(`${c.name} removed`, 'warning')
  }
  const updateLimit = (id, limit) => {
    setContainers(prev => prev.map(c => c.id === id ? { ...c, limit } : c))
    const c = containers.find(x => x.id === id)
    if (c) log(`${c.name} memory limit updated to ${limit} MB`)
  }
  const updateCpuLimit = (id, cpuLimit) => {
    setContainers(prev => prev.map(c => c.id === id ? { ...c, cpuLimit } : c))
    const c = containers.find(x => x.id === id)
    if (c) log(`${c.name} CPU limit updated to ${cpuLimit}%`)
  }
  const updateIo = (id, io) => {
    setContainers(prev => prev.map(c => c.id === id ? { ...c, io } : c))
    const c = containers.find(x => x.id === id)
    if (c) log(`${c.name} I/O allocation updated to ${io}%`)
  }
  const reset = () => { setContainers(initialContainers); setSecurityChecks({}); setActivity([]); log('Demo environment reset') }
  const value = useMemo(() => ({ containers, activity, log, act, addContainer, removeContainer, updateLimit, updateCpuLimit, updateIo, reset, securityChecks, setSecurityChecks }), [containers, activity, securityChecks])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export const useDashboard = () => useContext(Context)
