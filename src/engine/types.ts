export interface PackItem {
  id: string // "3", "b", "elephant"
  display: string // "3", "B" — or empty if image-only
  label: string // spoken/displayed word: "Three", "B", "Elephant"
  image?: string // key of an SVG illustration (animals, fruits)
  audio?: string // path to recorded audio file
  color?: string // background or accent color for this item
  countVisual?: number // for numbers: show N apples/stars popping in
  bonusLabel?: string // spoken on a second tap ("Moo!") before advancing
  bonusAudio?: string // recorded audio for the bonus tap
}

export interface ContentPack {
  id: string // "numbers-1-10"
  title: string // "Numbers"
  icon: string
  items: PackItem[]
  loop: boolean // true — wraps around at the end
}

/**
 * "advance" — every tap moves to the next item (default).
 * "repeat"  — a tap replays the current item; the following tap advances.
 */
export type TapMode = 'advance' | 'repeat'

/**
 * "entered" — the item just appeared and spoke its primary label.
 * "engaged" — a tap replayed it (repeat mode) or played its bonus sound;
 *             the next tap advances.
 */
export type TapStageName = 'entered' | 'engaged'

export interface TapEvent {
  kind: 'primary' | 'bonus'
  item: PackItem
  index: number
  tapCount: number
}
