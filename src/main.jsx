import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { DashboardProvider } from './context/DashboardContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </HashRouter>
  </React.StrictMode>
)