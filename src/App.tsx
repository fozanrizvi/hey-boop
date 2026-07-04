import { useState } from 'react'
import { AudioProvider } from './engine/AudioProvider'
import { Home } from './screens/Home'
import { Play } from './screens/Play'
import type { ContentPack } from './engine/types'

// Deliberately no router: three screens, no deep links, no URL surface a
// toddler can stumble into. Settings (Phase 2) becomes a third state here.
export default function App() {
  const [activePack, setActivePack] = useState<ContentPack | null>(null)

  return (
    <AudioProvider>
      {activePack ? (
        <Play pack={activePack} onExit={() => setActivePack(null)} />
      ) : (
        <Home onSelectPack={setActivePack} />
      )}
    </AudioProvider>
  )
}
