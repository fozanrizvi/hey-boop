import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { ContentPack, PackItem } from './types'

const BOOP_GAIN = 0.15

/**
 * All sound flows through one Web Audio graph so nothing ever stacks:
 * a single "current voice" source is stopped before any new one starts,
 * and speechSynthesis is cancelled before every utterance.
 *
 * Recorded files are the primary path: any item whose `audio` file was
 * fetched and decoded plays the recording; everything else falls back to
 * TTS — per item, so a half-recorded pack still works.
 */
export class AudioEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private buffers = new Map<string, AudioBuffer>()
  private currentVoice: AudioBufferSourceNode | null = null
  private volume = 1
  private ttsUnlocked = false
  private pendingSpeakTimer: number | null = null
  // Safari GCs queued utterances that nothing references, dropping the speech.
  private currentUtterance: SpeechSynthesisUtterance | null = null

  /**
   * Must be called synchronously inside a user gesture (the pack-card tap on
   * the home screen) — iOS Safari refuses to start audio otherwise.
   */
  unlock(): void {
    // Route as media playback so the iOS hardware/Control Center silent
    // switch does not mute Web Audio (Safari 16.4+; harmless elsewhere).
    const nav = navigator as Navigator & { audioSession?: { type: string } }
    if (nav.audioSession) {
      try {
        nav.audioSession.type = 'playback'
      } catch {
        // older iOS — silent switch will mute Web Audio, nothing we can do
      }
    }
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ??
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctor) return
      this.ctx = new Ctor()
      this.master = this.ctx.createGain()
      this.master.gain.value = this.volume
      this.master.connect(this.ctx.destination)
    }
    if (this.ctx.state !== 'running') void this.ctx.resume()
    // Playing one silent sample inside the gesture is what actually unlocks iOS.
    const silent = this.ctx.createBufferSource()
    silent.buffer = this.ctx.createBuffer(1, 1, 22050)
    silent.connect(this.master!)
    silent.start(0)
    // Speech synthesis needs its own gesture unlock on iOS: start one muted
    // utterance now so later speak() calls (from effects/timeouts) work.
    if (!this.ttsUnlocked && 'speechSynthesis' in window) {
      this.ttsUnlocked = true
      const muted = new SpeechSynthesisUtterance(' ')
      muted.volume = 0
      window.speechSynthesis.speak(muted)
      // Voices load lazily on iOS; touching the list now warms it up.
      window.speechSynthesis.getVoices()
    }
  }

  /**
   * iOS suspends (or non-standardly "interrupts") the context when the app is
   * backgrounded or a call comes in; call from any gesture.
   */
  resumeIfSuspended(): void {
    if (this.ctx && this.ctx.state !== 'running') void this.ctx.resume()
  }

  setVolume(volume: number): void {
    this.volume = volume
    if (this.master) this.master.gain.value = volume
  }

  /** Fetch + decode every recorded file the pack declares. Missing files are fine. */
  async loadPack(pack: ContentPack): Promise<void> {
    if (!this.ctx) return
    const paths = new Set<string>()
    for (const item of pack.items) {
      if (item.audio) paths.add(item.audio)
      if (item.bonusAudio) paths.add(item.bonusAudio)
    }
    await Promise.all(
      [...paths].map(async (path) => {
        if (this.buffers.has(path)) return
        try {
          const res = await fetch(path)
          if (!res.ok) return
          const data = await res.arrayBuffer()
          const buffer = await this.ctx!.decodeAudioData(data)
          this.buffers.set(path, buffer)
        } catch {
          // No recording for this item yet — TTS covers it.
        }
      }),
    )
  }

  /** Soft low-volume "boop" pop as tap feedback, synthesized (no asset needed). */
  boop(): void {
    if (!this.ctx || !this.master) return
    const t = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(640, t)
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.09)
    gain.gain.setValueAtTime(BOOP_GAIN * this.volume, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12)
    osc.connect(gain)
    gain.connect(this.master)
    osc.start(t)
    osc.stop(t + 0.13)
  }

  /** Speak an item's primary label or bonus sound. Never overlaps the previous voice. */
  sayItem(item: PackItem, kind: 'primary' | 'bonus'): void {
    const text = kind === 'bonus' ? (item.bonusLabel ?? item.label) : item.label
    const recorded = kind === 'bonus' ? item.bonusAudio : item.audio
    this.say(text, recorded)
  }

  say(text: string, recordedPath?: string): void {
    this.stopVoice()
    const buffer = recordedPath ? this.buffers.get(recordedPath) : undefined
    if (buffer && this.ctx && this.master) {
      const source = this.ctx.createBufferSource()
      source.buffer = buffer
      source.connect(this.master)
      source.onended = () => {
        if (this.currentVoice === source) this.currentVoice = null
      }
      source.start()
      this.currentVoice = source
      return
    }
    if (!('speechSynthesis' in window)) return
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.85
    utterance.pitch = 1.05
    utterance.volume = this.volume
    const voice = this.pickVoice()
    if (voice) utterance.voice = voice
    const start = () => {
      this.pendingSpeakTimer = null
      try {
        synth.resume() // iOS can wedge in a paused state; resume is a no-op otherwise
      } catch {
        // not resumable — speak anyway
      }
      this.currentUtterance = utterance
      utterance.onend = () => {
        if (this.currentUtterance === utterance) this.currentUtterance = null
      }
      synth.speak(utterance)
    }
    if (this.cancelledSynthJustNow) {
      // iOS silently drops a speak() issued synchronously after cancel().
      this.cancelledSynthJustNow = false
      this.pendingSpeakTimer = window.setTimeout(start, 60)
    } else {
      start()
    }
  }

  private cancelledSynthJustNow = false

  stopVoice(): void {
    if (this.pendingSpeakTimer !== null) {
      window.clearTimeout(this.pendingSpeakTimer)
      this.pendingSpeakTimer = null
    }
    if (this.currentVoice) {
      try {
        this.currentVoice.stop()
      } catch {
        // already ended
      }
      this.currentVoice = null
    }
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis
      // Cancel only when something is actually queued: an idle cancel() poisons
      // the next speak() on iOS.
      if (synth.speaking || synth.pending) {
        synth.cancel()
        this.cancelledSynthJustNow = true
      }
    }
  }

  private pickVoice(): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices()
    const english = voices.filter((v) => v.lang.startsWith('en'))
    return (
      english.find((v) => v.localService && /samantha|karen|daniel/i.test(v.name)) ??
      english.find((v) => v.localService) ??
      english[0] ??
      null
    )
  }
}

const AudioEngineContext = createContext<AudioEngine | null>(null)

export function AudioProvider({ children }: { children: ReactNode }) {
  const engine = useMemo(() => new AudioEngine(), [])
  return <AudioEngineContext.Provider value={engine}>{children}</AudioEngineContext.Provider>
}

export function useAudio(): AudioEngine {
  const engine = useContext(AudioEngineContext)
  if (!engine) throw new Error('useAudio must be used inside <AudioProvider>')
  return engine
}
