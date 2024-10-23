import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import AutoCalc from './components/AutoCalc.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AutoCalc />
  </StrictMode>,
)
