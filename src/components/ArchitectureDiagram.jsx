import { Box, Cpu, Layers3, Server, Workflow } from 'lucide-react'
const layers = [
  {name:'Applications', detail:'Web app · API · Database', icon:Layers3},
  {name:'Container layer', detail:'Isolated apps + dependencies', icon:BoxesIcon},
  {name:'Container runtime', detail:'Example: containerd', icon:Workflow},
  {name:'Host OS kernel', detail:'Namespaces · cgroups · system calls', icon:Cpu},
  {name:'Hardware', detail:'CPU · Memory · Storage · Network', icon:Server},
]
function BoxesIcon(props){return <Box {...props}/>}
export default function ArchitectureDiagram(){return <div className="architecture-stack">{layers.map((l,i)=><div className="architecture-step" key={l.name}><div className="architecture-layer"><span className="architecture-icon"><l.icon size={18}/></span><div><b>{l.name}</b><small>{l.detail}</small></div><span className="layer-number">0{i+1}</span></div>{i<layers.length-1&&<div className="layer-connector"><span/></div>}</div>)}</div>}