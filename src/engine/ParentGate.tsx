import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

const RING_RADIUS = 26
const RING_SIZE = 64
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

export interface ParentGateProps {
  onComplete: () => void
  holdMs?: number
  label: string
  children?: ReactNode
}

/**
 * Press-and-hold gate (default 3 s) with a filling ring. Quick taps do
 * nothing; releasing early snaps the ring back. Pointer events stop here so
 * holds never count as play-area taps.
 */
export function ParentGate({ onComplete, holdMs = 3000, label, children }: ParentGateProps) {
  const [progress, setProgress] = useState(0)
  const [holding, setHolding] = useState(false)
  const frameRef = useRef<number | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const stop = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = null
    setHolding(false)
    setProgress(0)
  }, [])

  const start = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {
        // pointer already gone (or synthetic event) — hold still works via rAF
      }
      setHolding(true)
      const startedAt = performance.now()
      const step = (now: number) => {
        const p = Math.min(1, (now - startedAt) / holdMs)
        setProgress(p)
        if (p >= 1) {
          stop()
          onCompleteRef.current()
          return
        }
        frameRef.current = requestAnimationFrame(step)
      }
      frameRef.current = requestAnimationFrame(step)
    },
    [holdMs, stop],
  )

  useEffect(() => stop, [stop])

  return (
    <button
      type="button"
      className={`parent-gate${holding ? ' parent-gate--holding' : ''}`}
      aria-label={label}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerCancel={stop}
      onLostPointerCapture={stop}
      onContextMenu={(e) => e.preventDefault()}
    >
      <svg
        className="parent-gate-ring"
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        aria-hidden="true"
      >
        <circle
          className="parent-gate-ring-track"
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
        />
        <circle
          className="parent-gate-ring-fill"
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <span className="parent-gate-icon">{children}</span>
    </button>
  )
}
