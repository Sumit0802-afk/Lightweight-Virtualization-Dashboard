import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Containers from './pages/Containers.jsx'
import Architecture from './pages/Architecture.jsx'
import Resources from './pages/Resources.jsx'
import Lifecycle from './pages/Lifecycle.jsx'
import Comparison from './pages/Comparison.jsx'
import OSMechanisms from './pages/OSMechanisms.jsx'
import Security from './pages/Security.jsx'
import Tools from './pages/Tools.jsx'
import Quiz from './pages/Quiz.jsx'
import References from './pages/References.jsx'
import Presentation from './pages/Presentation.jsx'

export default function App() {
  return <Routes>
    <Route path="/presentation" element={<Presentation />} />
    <Route element={<Layout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/containers" element={<Containers />} />
      <Route path="/architecture" element={<Architecture />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/lifecycle" element={<Lifecycle />} />
      <Route path="/comparison" element={<Comparison />} />
      <Route path="/mechanisms" element={<OSMechanisms />} />
      <Route path="/security" element={<Security />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/references" element={<References />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
}