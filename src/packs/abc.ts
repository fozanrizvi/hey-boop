import type { ContentPack } from '../engine/types'

const COLORS = ['#FF6B6B', '#4ECDC4', '#FFD23F', '#8E7CC3', '#7BC950']
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export const abcPack: ContentPack = {
  id: 'abc',
  title: 'ABC',
  icon: 'ABC',
  loop: true,
  items: LETTERS.map((letter, i) => ({
    id: letter.toLowerCase(),
    display: letter,
    label: letter,
    color: COLORS[i % COLORS.length],
    audio: `/audio/abc/${letter.toLowerCase()}.mp3`,
  })),
}
