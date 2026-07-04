import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { TapMode } from './types'

const STORAGE_KEY = 'heyboop-settings'

export interface Settings {
  volume: number // 0..1, drives the master GainNode and TTS volume
  mode: TapMode // "advance" (default) or "repeat"
  reducedMotion: 'system' | 'on' | 'off' // system preference until explicitly toggled
}

export const DEFAULT_SETTINGS: Settings = {
  volume: 1,
  mode: 'advance',
  reducedMotion: 'system',
}

export function loadSettings(): Settings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw) as Partial<Settings>
    return {
      volume:
        typeof parsed.volume === 'number' && parsed.volume >= 0 && parsed.volume <= 1
          ? parsed.volume
          : DEFAULT_SETTINGS.volume,
      mode: parsed.mode === 'repeat' ? 'repeat' : 'advance',
      reducedMotion:
        parsed.reducedMotion === 'on' || parsed.reducedMotion === 'off'
          ? parsed.reducedMotion
          : 'system',
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: Settings): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // storage unavailable (private mode) — settings just won't persist
  }
}

interface SettingsContextValue {
  settings: Settings
  update: (patch: Partial<Settings>) => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch }
      saveSettings(next)
      return next
    })
  }, [])

  const value = useMemo(() => ({ settings, update }), [settings, update])
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings(): SettingsContextValue {
  const value = useContext(SettingsContext)
  if (!value) throw new Error('useSettings must be used inside <SettingsProvider>')
  return value
}

/** Framer Motion MotionConfig value for the current reduced-motion setting. */
export function reducedMotionConfig(setting: Settings['reducedMotion']): 'always' | 'never' | 'user' {
  if (setting === 'on') return 'always'
  if (setting === 'off') return 'never'
  return 'user'
}
