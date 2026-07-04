import { useCallback, useEffect, useRef, useState } from 'react'
import type { ContentPack, TapEvent, TapMode, TapStageName } from './types'

export const DEFAULT_DEBOUNCE_MS = 250

export interface MachineState {
  index: number
  stage: TapStageName
}

/**
 * Pure transition function for one accepted tap.
 *
 * advance mode: tap plays the item's bonus if it has one (staying put), otherwise
 * advances. A second tap after the bonus advances.
 * repeat mode: tap replays the current item (or its bonus), the following tap advances.
 */
export function nextTapState(
  state: MachineState,
  pack: ContentPack,
  mode: TapMode,
): { state: MachineState; kind: 'primary' | 'bonus' } {
  const item = pack.items[state.index]
  const hasBonus = Boolean(item.bonusLabel ?? item.bonusAudio)

  if (state.stage === 'entered' && (mode === 'repeat' || hasBonus)) {
    return {
      state: { index: state.index, stage: 'engaged' },
      kind: hasBonus ? 'bonus' : 'primary',
    }
  }

  const last = pack.items.length - 1
  const nextIndex = state.index >= last ? (pack.loop ? 0 : last) : state.index + 1
  return { state: { index: nextIndex, stage: 'entered' }, kind: 'primary' }
}

export interface UseTapAdvanceOptions {
  mode?: TapMode
  debounceMs?: number
  /** Fired for the initial item on mount and for every accepted tap. */
  onEvent?: (event: TapEvent) => void
}

export function useTapAdvance(pack: ContentPack, options: UseTapAdvanceOptions = {}) {
  const { mode = 'advance', debounceMs = DEFAULT_DEBOUNCE_MS, onEvent } = options

  const [machine, setMachine] = useState<MachineState>({ index: 0, stage: 'entered' })
  const [tapCount, setTapCount] = useState(0)

  const machineRef = useRef(machine)
  const tapCountRef = useRef(0)
  const lastAcceptedRef = useRef(0)
  const pendingTimerRef = useRef<number | null>(null)
  const onEventRef = useRef(onEvent)
  onEventRef.current = onEvent
  // Read the pack through a ref and reset only on pack.id: a caller passing a
  // freshly-built pack object each render must not retrigger the reset effect
  // (object-identity deps here caused an infinite render loop).
  const packRef = useRef(pack)
  packRef.current = pack

  // Announce the first item when play begins.
  useEffect(() => {
    machineRef.current = { index: 0, stage: 'entered' }
    tapCountRef.current = 0
    setMachine(machineRef.current)
    setTapCount(0)
    onEventRef.current?.({ kind: 'primary', item: packRef.current.items[0], index: 0, tapCount: 0 })
  }, [pack.id])

  const acceptTap = useCallback(() => {
    const currentPack = packRef.current
    const result = nextTapState(machineRef.current, currentPack, mode)
    machineRef.current = result.state
    tapCountRef.current += 1
    setMachine(result.state)
    setTapCount(tapCountRef.current)
    onEventRef.current?.({
      kind: result.kind,
      item: currentPack.items[result.state.index],
      index: result.state.index,
      tapCount: tapCountRef.current,
    })
  }, [mode])

  /**
   * Call on pointerdown. Taps inside the debounce window queue at most ONE
   * pending advance (extra mashing is dropped) so audio never overlaps.
   */
  const tap = useCallback(() => {
    const now = Date.now()
    const elapsed = now - lastAcceptedRef.current
    if (elapsed >= debounceMs) {
      lastAcceptedRef.current = now
      acceptTap()
      return
    }
    if (pendingTimerRef.current === null) {
      pendingTimerRef.current = window.setTimeout(() => {
        pendingTimerRef.current = null
        lastAcceptedRef.current = Date.now()
        acceptTap()
      }, debounceMs - elapsed)
    }
  }, [acceptTap, debounceMs])

  useEffect(
    () => () => {
      if (pendingTimerRef.current !== null) window.clearTimeout(pendingTimerRef.current)
    },
    [],
  )

  return {
    item: pack.items[machine.index],
    index: machine.index,
    stage: machine.stage,
    tapCount,
    tap,
  }
}
