import type { ContentPack } from '../engine/types'

// [id, spoken name, second-tap sound, background color]
// Backgrounds are hand-picked so each illustration contrasts with its color
// and consecutive items always differ.
const ANIMALS: Array<[string, string, string, string]> = [
  ['cow', 'Cow', 'Moo!', '#8E7CC3'],
  ['dog', 'Dog', 'Woof woof!', '#4ECDC4'],
  ['cat', 'Cat', 'Meow!', '#FFD23F'],
  ['duck', 'Duck', 'Quack quack!', '#FF6B6B'],
  ['sheep', 'Sheep', 'Baa!', '#7BC950'],
  ['pig', 'Pig', 'Oink oink!', '#4ECDC4'],
  ['horse', 'Horse', 'Neigh!', '#8E7CC3'],
  ['frog', 'Frog', 'Ribbit ribbit!', '#FFD23F'],
  ['lion', 'Lion', 'Roar!', '#4ECDC4'],
  ['elephant', 'Elephant', 'Toot!', '#FF6B6B'],
]

export const animalsPack: ContentPack = {
  id: 'animals',
  title: 'Animals',
  icon: '🐮',
  loop: true,
  items: ANIMALS.map(([id, label, sound, color]) => ({
    id,
    display: '',
    label,
    image: id,
    color,
    audio: `/audio/animals/${id}.mp3`,
    bonusLabel: sound,
    bonusAudio: `/audio/animals/${id}-sound.mp3`,
  })),
}
