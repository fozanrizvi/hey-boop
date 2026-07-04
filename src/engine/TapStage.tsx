import { useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAudio } from './AudioProvider'
import { useTapAdvance } from './useTapAdvance'
import type { ContentPack, TapEvent, TapMode } from './types'
import { BoopMascot } from '../assets/svg/BoopMascot'
import { AppleIcon, StarIcon } from '../assets/svg/CountObjects'
import { illustrations } from '../assets/svg/illustrations'

const POP_SPRING = { type: 'spring', stiffness: 420, damping: 17, mass: 0.9 } as const
const COUNT_STAGGER_S = 0.15

export interface TapStageProps {
  pack: ContentPack
  mode?: TapMode
}

/**
 * The fullscreen play surface. Responds on pointerdown (finger DOWN, not
 * click) anywhere on the stage; boop + voice fire immediately, then the item
 * pops in with a spring.
 */
export function TapStage({ pack, mode = 'advance' }: TapStageProps) {
  const audio = useAudio()

  const onEvent = useCallback(
    (event: TapEvent) => {
      audio.resumeIfSuspended()
      audio.boop()
      audio.sayItem(event.item, event.kind)
    },
    [audio],
  )

  const { item, index, stage, tapCount, tap } = useTapAdvance(pack, { mode, onEvent })

  const cheering = tapCount > 0 && tapCount % 5 === 0
  const Illustration = item.image ? illustrations[item.image] : undefined

  return (
    <motion.div
      className="tap-stage"
      onPointerDown={tap}
      initial={false}
      animate={{ backgroundColor: item.color ?? '#4ECDC4' }}
      transition={{ duration: 0.25 }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          className="tap-stage-item"
          key={`${index}-${stage}`}
          initial={{ scale: 0, rotate: -6 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.12 } }}
          transition={POP_SPRING}
        >
          {Illustration && <Illustration className="tap-stage-image" />}
          {item.display && <span className="tap-stage-glyph">{item.display}</span>}
          {!Illustration && !item.display && (
            <span className="tap-stage-glyph">{item.label}</span>
          )}
          {item.countVisual !== undefined && (
            <div className="tap-stage-count" aria-hidden="true">
              {Array.from({ length: item.countVisual }, (_, i) => (
                <motion.span
                  className="tap-stage-count-object"
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ ...POP_SPRING, delay: 0.2 + i * COUNT_STAGGER_S }}
                >
                  {index % 2 === 0 ? <AppleIcon /> : <StarIcon />}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {cheering && (
          <motion.div
            className="tap-stage-mascot"
            key={tapCount}
            initial={{ y: 160, rotate: -10 }}
            animate={{ y: 0, rotate: 0 }}
            exit={{ y: 180, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <BoopMascot />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
