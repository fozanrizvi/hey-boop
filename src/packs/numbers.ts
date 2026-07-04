import type { ContentPack } from '../engine/types'

const COLORS = ['#FF6B6B', '#4ECDC4', '#FFD23F', '#8E7CC3', '#7BC950']
const WORDS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']

export const numbersPack: ContentPack = {
  id: 'numbers-1-10',
  title: 'Numbers',
  icon: '123',
  loop: true,
  items: WORDS.map((label, i) => ({
    id: String(i + 1),
    display: String(i + 1),
    label,
    color: COLORS[i % COLORS.length],
    countVisual: i + 1,
    audio: `/audio/numbers/${i + 1}.mp3`,
  })),
}
