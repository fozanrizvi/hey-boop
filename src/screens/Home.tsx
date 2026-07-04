import { motion } from 'framer-motion'
import { useAudio } from '../engine/AudioProvider'
import { ParentGate } from '../engine/ParentGate'
import { packs } from '../packs'
import type { ContentPack } from '../engine/types'
import { BoopMascot } from '../assets/svg/BoopMascot'

const CARD_COLORS = ['#FF6B6B', '#4ECDC4', '#8E7CC3', '#7BC950']

export interface HomeProps {
  onSelectPack: (pack: ContentPack) => void
  onOpenSettings: () => void
}

/**
 * Parent-facing pack picker. The card tap is THE audio-unlock gesture:
 * unlock the AudioContext and start pre-decoding the pack's recordings
 * synchronously inside it, then enter play immediately.
 */
export function Home({ onSelectPack, onOpenSettings }: HomeProps) {
  const audio = useAudio()

  return (
    <div className="home">
      <header className="home-hero">
        <motion.div
          className="home-mascot"
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <BoopMascot />
        </motion.div>
        <h1 className="home-title">HeyBoop</h1>
        <p className="home-tagline">tap tap boop!</p>
      </header>

      <main className="home-cards">
        {packs.map((pack, i) => (
          <button
            type="button"
            key={pack.id}
            className="pack-card"
            style={{ backgroundColor: CARD_COLORS[i % CARD_COLORS.length] }}
            onPointerDown={() => {
              audio.unlock()
              void audio.loadPack(pack)
              onSelectPack(pack)
            }}
          >
            <span className="pack-card-icon">{pack.icon}</span>
            <span className="pack-card-title">{pack.title}</span>
          </button>
        ))}
      </main>

      <div className="home-settings">
        <ParentGate label="Hold for 3 seconds to open grown-up settings" onComplete={onOpenSettings}>
          ⚙
        </ParentGate>
      </div>
    </div>
  )
}
