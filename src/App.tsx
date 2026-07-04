import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { AudioProvider, useAudio } from './engine/AudioProvider'
import { SettingsProvider, reducedMotionConfig, useSettings } from './engine/useSettings'
import { Home } from './screens/Home'
import { Play } from './screens/Play'
import { Settings } from './screens/Settings'
import type { ContentPack } from './engine/types'

// Deliberately no router: three screens, no deep links, no URL surface a
// toddler can stumble into.
type Screen = { name: 'home' } | { name: 'play'; pack: ContentPack } | { name: 'settings' }

function Shell() {
  const [screen, setScreen] = useState<Screen>({ name: 'home' })
  const { settings } = useSettings()
  const audio = useAudio()

  // Keep the master gain in sync with the persisted volume.
  useEffect(() => {
    audio.setVolume(settings.volume)
  }, [audio, settings.volume])

  // Don't keep talking from a backgrounded tab; iOS suspends the context
  // anyway, and we resume it on the next tap gesture.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) audio.stopVoice()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [audio])

  return (
    <MotionConfig reducedMotion={reducedMotionConfig(settings.reducedMotion)}>
      {screen.name === 'play' ? (
        <Play
          pack={screen.pack}
          mode={settings.mode}
          onExit={() => setScreen({ name: 'home' })}
        />
      ) : screen.name === 'settings' ? (
        <Settings onDone={() => setScreen({ name: 'home' })} />
      ) : (
        <Home
          onSelectPack={(pack) => setScreen({ name: 'play', pack })}
          onOpenSettings={() => setScreen({ name: 'settings' })}
        />
      )}
    </MotionConfig>
  )
}

export default function App() {
  return (
    <SettingsProvider>
      <AudioProvider>
        <Shell />
      </AudioProvider>
    </SettingsProvider>
  )
}
