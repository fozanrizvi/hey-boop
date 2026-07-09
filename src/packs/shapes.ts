import type { ContentPack } from '../engine/types'

// [id, spoken name, background color] — backgrounds hand-picked for contrast
// with each illustration; consecutive items always differ.
const SHAPES: Array<[string, string, string]> = [
  ['circle', 'Circle', '#FF6B6B'],
  ['square', 'Square', '#4ECDC4'],
  ['triangle', 'Triangle', '#7BC950'],
  ['star', 'Star', '#8E7CC3'],
  ['heart', 'Heart', '#FFD23F'],
  ['diamond', 'Diamond', '#FF6B6B'],
  ['oval', 'Oval', '#4ECDC4'],
  ['rectangle', 'Rectangle', '#7BC950'],
]

export const shapesPack: ContentPack = {
  id: 'shapes',
  title: 'Shapes',
  icon: '🔺',
  loop: true,
  items: SHAPES.map(([id, label, color]) => ({
    id,
    display: '',
    label,
    image: id,
    color,
    audio: `/audio/shapes/${id}.mp3`,
  })),
}
