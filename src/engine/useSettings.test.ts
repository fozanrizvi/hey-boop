import { beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_SETTINGS, loadSettings, reducedMotionConfig, saveSettings } from './useSettings'

describe('settings persistence', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns defaults when nothing is stored', () => {
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS)
  })

  it('round-trips through localStorage', () => {
    saveSettings({ volume: 0.5, mode: 'repeat', reducedMotion: 'on' })
    expect(loadSettings()).toEqual({ volume: 0.5, mode: 'repeat', reducedMotion: 'on' })
  })

  it('sanitizes corrupt or out-of-range stored values', () => {
    window.localStorage.setItem(
      'heyboop-settings',
      JSON.stringify({ volume: 7, mode: 'banana', reducedMotion: 42 }),
    )
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS)
    window.localStorage.setItem('heyboop-settings', 'not json {{{')
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS)
  })

  it('maps the reduced-motion setting to MotionConfig values', () => {
    expect(reducedMotionConfig('system')).toBe('user')
    expect(reducedMotionConfig('on')).toBe('always')
    expect(reducedMotionConfig('off')).toBe('never')
  })
})
