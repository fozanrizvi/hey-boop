import { TapStage } from '../engine/TapStage'
import { ParentGate } from '../engine/ParentGate'
import { useAudio } from '../engine/AudioProvider'
import type { ContentPack, TapMode } from '../engine/types'

export interface PlayProps {
  pack: ContentPack
  mode?: TapMode
  onExit: () => void
}

/**
 * Fullscreen play mode: the TapStage plus a semi-transparent hold-3s exit
 * gate, inset from the corner past the iOS edge-gesture zones.
 */
export function Play({ pack, mode = 'advance', onExit }: PlayProps) {
  const audio = useAudio()

  return (
    <div className="play">
      <TapStage pack={pack} mode={mode} />
      <div className="play-exit">
        <ParentGate
          label="Hold for 3 seconds to exit"
          onComplete={() => {
            audio.stopVoice()
            onExit()
          }}
        >
          ✕
        </ParentGate>
      </div>
    </div>
  )
}
