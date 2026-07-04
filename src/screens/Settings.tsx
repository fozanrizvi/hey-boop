import { useAudio } from '../engine/AudioProvider'
import { useSettings } from '../engine/useSettings'

export interface SettingsProps {
  onDone: () => void
}

/**
 * Parent-facing settings (already behind the parent gate): volume, tap mode,
 * reduced motion. Nothing else in v1, per spec.
 */
export function Settings({ onDone }: SettingsProps) {
  const { settings, update } = useSettings()
  const audio = useAudio()

  return (
    <div className="settings">
      <h1 className="settings-title">Grown-ups</h1>

      <div className="settings-group">
        <label className="settings-label" htmlFor="volume">
          Volume
        </label>
        <input
          id="volume"
          className="settings-slider"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={settings.volume}
          onChange={(e) => {
            const volume = Number(e.target.value)
            update({ volume })
            audio.setVolume(volume)
          }}
          onPointerUp={() => audio.say('Boop!')}
        />
      </div>

      <div className="settings-group">
        <span className="settings-label">Each tap</span>
        <div className="settings-segment" role="radiogroup" aria-label="Tap behavior">
          <button
            type="button"
            role="radio"
            aria-checked={settings.mode === 'advance'}
            className={`settings-segment-option${settings.mode === 'advance' ? ' is-active' : ''}`}
            onClick={() => update({ mode: 'advance' })}
          >
            Shows the next one
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={settings.mode === 'repeat'}
            className={`settings-segment-option${settings.mode === 'repeat' ? ' is-active' : ''}`}
            onClick={() => update({ mode: 'repeat' })}
          >
            Repeats it first
          </button>
        </div>
      </div>

      <div className="settings-group">
        <span className="settings-label">Reduce motion</span>
        <div className="settings-segment" role="radiogroup" aria-label="Reduced motion">
          <button
            type="button"
            role="radio"
            aria-checked={settings.reducedMotion === 'system'}
            className={`settings-segment-option${settings.reducedMotion === 'system' ? ' is-active' : ''}`}
            onClick={() => update({ reducedMotion: 'system' })}
          >
            Follow device
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={settings.reducedMotion === 'on'}
            className={`settings-segment-option${settings.reducedMotion === 'on' ? ' is-active' : ''}`}
            onClick={() => update({ reducedMotion: 'on' })}
          >
            On
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={settings.reducedMotion === 'off'}
            className={`settings-segment-option${settings.reducedMotion === 'off' ? ' is-active' : ''}`}
            onClick={() => update({ reducedMotion: 'off' })}
          >
            Off
          </button>
        </div>
      </div>

      <button type="button" className="settings-done" onClick={onDone}>
        Done
      </button>
    </div>
  )
}
