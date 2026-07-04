import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AudioEngine } from './AudioProvider'
import type { ContentPack } from './types'

/* ---- Web Audio + speech mocks ------------------------------------------ */

class MockSource {
  buffer: AudioBuffer | null = null
  onended: (() => void) | null = null
  start = vi.fn()
  stop = vi.fn()
  connect = vi.fn()
}

class MockGain {
  gain = { value: 1 }
  connect = vi.fn()
}

class MockOscillator {
  type = 'sine'
  frequency = { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() }
  connect = vi.fn()
  start = vi.fn()
  stop = vi.fn()
}

class MockAudioContext {
  state = 'suspended'
  currentTime = 0
  destination = {}
  sources: MockSource[] = []
  resume = vi.fn(async () => {
    this.state = 'running'
  })
  createGain = vi.fn(() => new MockGain())
  createBuffer = vi.fn(() => ({}) as AudioBuffer)
  createBufferSource = vi.fn(() => {
    const s = new MockSource()
    this.sources.push(s)
    return s
  })
  createOscillator = vi.fn(() => new MockOscillator())
  decodeAudioData = vi.fn(async (data: ArrayBuffer) => {
    if (data.byteLength === 0) throw new Error('undecodable')
    return { duration: 1 } as AudioBuffer
  })
}

function makePack(items: Array<{ id: string; audio?: string; bonusAudio?: string }>): ContentPack {
  return {
    id: 'p',
    title: 'P',
    icon: 'P',
    loop: true,
    items: items.map((i) => ({ display: i.id, label: i.id, ...i })),
  }
}

let ctx: MockAudioContext
let speak: ReturnType<typeof vi.fn>
let cancel: ReturnType<typeof vi.fn>

beforeEach(() => {
  ctx = new MockAudioContext()
  vi.stubGlobal(
    'AudioContext',
    vi.fn(() => ctx),
  )
  speak = vi.fn()
  cancel = vi.fn()
  vi.stubGlobal('speechSynthesis', { speak, cancel, getVoices: () => [] })
  vi.stubGlobal(
    'SpeechSynthesisUtterance',
    class {
      text: string
      rate = 1
      pitch = 1
      volume = 1
      voice = null
      constructor(text: string) {
        this.text = text
      }
    },
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

/* ---- tests -------------------------------------------------------------- */

describe('AudioEngine', () => {
  it('unlock creates and resumes the context and plays a silent buffer', () => {
    const engine = new AudioEngine()
    engine.unlock()
    expect(ctx.resume).toHaveBeenCalled()
    expect(ctx.sources).toHaveLength(1)
    expect(ctx.sources[0].start).toHaveBeenCalled()
  })

  it('loadPack decodes declared files and tolerates missing ones per item', async () => {
    const engine = new AudioEngine()
    engine.unlock()
    vi.stubGlobal(
      'fetch',
      vi.fn(async (path: string) => ({
        ok: path === '/a.mp3',
        arrayBuffer: async () => new ArrayBuffer(path === '/a.mp3' ? 8 : 0),
      })),
    )
    const pack = makePack([
      { id: 'a', audio: '/a.mp3' },
      { id: 'b', audio: '/missing.mp3' },
    ])
    await engine.loadPack(pack)

    ctx.sources = []
    engine.sayItem(pack.items[0], 'primary') // has a decoded buffer → plays it
    expect(ctx.sources).toHaveLength(1)
    expect(speak).not.toHaveBeenCalled()

    engine.sayItem(pack.items[1], 'primary') // missing file → TTS fallback
    expect(speak).toHaveBeenCalledTimes(1)
  })

  it('never overlaps voices: stops the previous source and cancels TTS first', async () => {
    const engine = new AudioEngine()
    engine.unlock()
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) })),
    )
    const pack = makePack([
      { id: 'a', audio: '/a.mp3' },
      { id: 'b', audio: '/b.mp3' },
    ])
    await engine.loadPack(pack)

    ctx.sources = []
    engine.sayItem(pack.items[0], 'primary')
    engine.sayItem(pack.items[1], 'primary')
    expect(ctx.sources[0].stop).toHaveBeenCalled()
    expect(cancel).toHaveBeenCalled()
    expect(ctx.sources).toHaveLength(2)
  })

  it('uses bonus audio/label for bonus taps', async () => {
    const engine = new AudioEngine()
    engine.unlock()
    vi.stubGlobal(
      'fetch',
      vi.fn(async (path: string) => ({
        ok: path === '/cow-sound.mp3',
        arrayBuffer: async () => new ArrayBuffer(path === '/cow-sound.mp3' ? 8 : 0),
      })),
    )
    const pack = makePack([{ id: 'cow', audio: '/cow.mp3', bonusAudio: '/cow-sound.mp3' }])
    pack.items[0].bonusLabel = 'Moo!'
    await engine.loadPack(pack)

    engine.sayItem(pack.items[0], 'primary') // no recording → TTS "cow"
    expect(speak).toHaveBeenCalledTimes(1)
    expect((speak.mock.calls[0][0] as { text: string }).text).toBe('cow')

    ctx.sources = []
    engine.sayItem(pack.items[0], 'bonus') // recorded moo → buffer
    expect(ctx.sources).toHaveLength(1)
    expect(speak).toHaveBeenCalledTimes(1)
  })

  it('setVolume drives the master gain and TTS utterance volume', () => {
    const engine = new AudioEngine()
    engine.unlock()
    engine.setVolume(0.4)
    engine.say('hello')
    expect((speak.mock.calls[0][0] as { volume: number }).volume, 'utterance volume').toBe(0.4)
  })

  it('is inert (no crash) when unlock was never called', () => {
    const engine = new AudioEngine()
    expect(() => {
      engine.boop()
      engine.say('hello') // TTS still works without a context
      engine.stopVoice()
    }).not.toThrow()
    expect(speak).toHaveBeenCalled()
  })
})
