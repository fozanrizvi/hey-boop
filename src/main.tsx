import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import '@fontsource-variable/fredoka/index.css'
import './index.css'
import App from './App.tsx'

registerSW({ immediate: true })

// Kid-proofing: no long-press callouts/context menus, no pinch zoom (iOS
// fires nonstandard gesture* events that bypass touch-action).
document.addEventListener('contextmenu', (e) => e.preventDefault())
document.addEventListener('gesturestart', (e) => e.preventDefault())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
