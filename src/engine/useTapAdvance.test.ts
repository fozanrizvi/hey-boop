import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DEFAULT_DEBOUNCE_MS, nextTapState, useTapAdvance } from './useTapAdvance'
import type { ContentPack, PackItem, TapEvent } from './types'

function makePack(count: number, itemOverrides: Partial<PackItem> = {}): ContentPack {
  return {
    id: 'test-pack',
    title: 'Test',
    icon: 'T',
    loop: true,
    items: Array.from({ length: count }, (_, i) => ({
      id: String(i),
      display: String(i),
      label: `Item ${i}`,
      ...itemOverrides,
    })),
  }
}

/** A tap spaced safely past the debounce window. */
function slowTap(tap: () => void) {
  act(() => {
    vi.advanceTimersByTime(DEFAULT_DEBOUNCE_MS + 50)
    tap()
  })
}

describe('useTapAdvance', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('announces the first item on mount', () => {
    const events: TapEvent[] = []
    renderHook(() => useTapAdvance(makePack(3), { onEvent: (e) => events.push(e) }))
    expect(events).toHaveLength(1)
    expect(events[0]).toMatchObject({ kind: 'primary', index: 0, tapCount: 0 })
  })

  it('advances one item per tap in advance mode', () => {
    const { result } = renderHook(() => useTapAdvance(makePack(3)))
    slowTap(result.current.tap)
    expect(result.current.index).toBe(1)
    slowTap(result.current.tap)
    expect(result.current.index).toBe(2)
  })

  it('wraps around at the end when loop is true', () => {
    const { result } = renderHook(() => useTapAdvance(makePack(3)))
    slowTap(result.current.tap)
    slowTap(result.current.tap)
    expect(result.current.index).toBe(2)
    slowTap(result.current.tap)
    expect(result.current.index).toBe(0)
  })

  it('stays on the last item when loop is false', () => {
    const pack = { ...makePack(2), loop: false }
    const { result } = renderHook(() => useTapAdvance(pack))
    slowTap(result.current.tap)
    slowTap(result.current.tap)
    slowTap(result.current.tap)
    expect(result.current.index).toBe(1)
  })

  it('queues at most one pending tap during the debounce window', () => {
    const { result } = renderHook(() => useTapAdvance(makePack(10)))
    // one accepted tap, then a frantic mash inside the debounce window
    act(() => {
      vi.advanceTimersByTime(DEFAULT_DEBOUNCE_MS + 50)
      result.current.tap()
      result.current.tap()
      result.current.tap()
      result.current.tap()
      result.current.tap()
    })
    expect(result.current.index).toBe(1) // only the first was accepted immediately
    act(() => {
      vi.advanceTimersByTime(DEFAULT_DEBOUNCE_MS)
    })
    expect(result.current.index).toBe(2) // exactly ONE queued tap fired, rest dropped
    act(() => {
      vi.advanceTimersByTime(DEFAULT_DEBOUNCE_MS * 4)
    })
    expect(result.current.index).toBe(2) // nothing else sneaks in later
  })

  it('repeat mode replays the item first, then advances on the following tap', () => {
    const events: TapEvent[] = []
    const { result } = renderHook(() =>
      useTapAdvance(makePack(3), { mode: 'repeat', onEvent: (e) => events.push(e) }),
    )
    slowTap(result.current.tap)
    expect(result.current.index).toBe(0)
    expect(result.current.stage).toBe('engaged')
    expect(events.at(-1)).toMatchObject({ kind: 'primary', index: 0 })
    slowTap(result.current.tap)
    expect(result.current.index).toBe(1)
    expect(result.current.stage).toBe('entered')
  })

  it('plays the bonus on the second tap of a bonus item, then advances', () => {
    const events: TapEvent[] = []
    const pack = makePack(3, { bonusLabel: 'Moo!' })
    const { result } = renderHook(() => useTapAdvance(pack, { onEvent: (e) => events.push(e) }))
    slowTap(result.current.tap)
    expect(result.current.index).toBe(0)
    expect(events.at(-1)).toMatchObject({ kind: 'bonus', index: 0 })
    slowTap(result.current.tap)
    expect(result.current.index).toBe(1)
    expect(events.at(-1)).toMatchObject({ kind: 'primary', index: 1 })
  })

  it('counts accepted taps (drives the every-5th-tap mascot cheer)', () => {
    const { result } = renderHook(() => useTapAdvance(makePack(10)))
    for (let i = 0; i < 5; i++) slowTap(result.current.tap)
    expect(result.current.tapCount).toBe(5)
  })
})

describe('nextTapState', () => {
  it('is a pure function of state, pack, and mode', () => {
    const pack = makePack(2)
    const first = nextTapState({ index: 0, stage: 'entered' }, pack, 'advance')
    const second = nextTapState({ index: 0, stage: 'entered' }, pack, 'advance')
    expect(first).toEqual(second)
    expect(first.state).toEqual({ index: 1, stage: 'entered' })
  })
})
