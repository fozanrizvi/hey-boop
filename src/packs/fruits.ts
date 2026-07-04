import type { ContentPack } from '../engine/types'

// [id, spoken name, background color] — backgrounds hand-picked for contrast
// with each illustration; consecutive items always differ.
const FRUITS: Array<[string, string, string]> = [
  ['apple', 'Apple', '#4ECDC4'],
  ['banana', 'Banana', '#8E7CC3'],
  ['orange', 'Orange', '#4ECDC4'],
  ['strawberry', 'Strawberry', '#FFD23F'],
  ['grapes', 'Grapes', '#7BC950'],
  ['watermelon', 'Watermelon', '#4ECDC4'],
  ['carrot', 'Carrot', '#7BC950'],
  ['tomato', 'Tomato', '#FFD23F'],
  ['broccoli', 'Broccoli', '#FF6B6B'],
  ['corn', 'Corn', '#4ECDC4'],
]

export const fruitsPack: ContentPack = {
  id: 'fruits-vegetables',
  title: 'Fruits & Veggies',
  icon: '🍎',
  loop: true,
  items: FRUITS.map(([id, label, color]) => ({
    id,
    display: '',
    label,
    image: id,
    color,
    audio: `/audio/fruits/${id}.mp3`,
  })),
}
