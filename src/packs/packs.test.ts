import { describe, expect, it } from 'vitest'
import { packs } from './index'
import { numbersPack } from './numbers'
import { abcPack } from './abc'
import { animalsPack } from './animals'
import { shapesPack } from './shapes'
import { vehiclesPack } from './vehicles'
import { illustrations } from '../assets/svg/illustrations'

const PALETTE = ['#FF6B6B', '#4ECDC4', '#FFD23F', '#8E7CC3', '#7BC950']

describe.each(packs.map((pack) => [pack.id, pack] as const))('pack schema: %s', (_id, pack) => {
  it('has a title, icon, and at least one item', () => {
    expect(pack.title).toBeTruthy()
    expect(pack.icon).toBeTruthy()
    expect(pack.items.length).toBeGreaterThan(0)
  })

  it('has unique item ids', () => {
    const ids = pack.items.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every item has a spoken label and something to show', () => {
    for (const item of pack.items) {
      expect(item.label).toBeTruthy()
      expect(item.display || item.image).toBeTruthy()
    }
  })

  it('every item color comes from the brand palette', () => {
    for (const item of pack.items) {
      if (item.color) expect(PALETTE).toContain(item.color)
    }
  })

  it('consecutive items never share a background color', () => {
    for (let i = 1; i < pack.items.length; i++) {
      expect(pack.items[i].color).not.toBe(pack.items[i - 1].color)
    }
  })

  it('every image key resolves to an illustration component', () => {
    for (const item of pack.items) {
      if (item.image)
        expect(illustrations[item.image], `missing SVG for ${item.image}`).toBeDefined()
    }
  })

  it('every item declares a recorded-audio path', () => {
    for (const item of pack.items) {
      expect(item.audio, `missing audio path for ${item.id}`).toMatch(/^\/audio\//)
    }
  })
})

describe('numbers pack', () => {
  it('runs 1 through 10 and loops', () => {
    expect(numbersPack.items).toHaveLength(10)
    expect(numbersPack.loop).toBe(true)
    expect(numbersPack.items[0].display).toBe('1')
    expect(numbersPack.items[9].display).toBe('10')
  })

  it('countVisual matches each numeral', () => {
    for (const item of numbersPack.items) {
      expect(item.countVisual).toBe(Number(item.id))
    }
  })

  it('declares a recorded-audio path for every item (drop-in recordings)', () => {
    for (const item of numbersPack.items) {
      expect(item.audio).toBe(`/audio/numbers/${item.id}.mp3`)
    }
  })
})

describe('abc pack', () => {
  it('runs A through Z and loops', () => {
    expect(abcPack.items).toHaveLength(26)
    expect(abcPack.loop).toBe(true)
    expect(abcPack.items[0].display).toBe('A')
    expect(abcPack.items[25].display).toBe('Z')
  })
})

describe('animals pack', () => {
  it('every animal has a second-tap sound with a recorded-audio path', () => {
    for (const item of animalsPack.items) {
      expect(item.bonusLabel, item.id).toBeTruthy()
      expect(item.bonusAudio).toBe(`/audio/animals/${item.id}-sound.mp3`)
    }
  })
})

describe('shapes pack', () => {
  it('has eight shapes with no bonus tap', () => {
    expect(shapesPack.items).toHaveLength(8)
    for (const item of shapesPack.items) {
      expect(item.bonusLabel).toBeUndefined()
    }
  })
})

describe('vehicles pack', () => {
  it('every vehicle has a second-tap sound with a recorded-audio path', () => {
    for (const item of vehiclesPack.items) {
      expect(item.bonusLabel, item.id).toBeTruthy()
      expect(item.bonusAudio).toBe(`/audio/vehicles/${item.id}-sound.mp3`)
    }
  })
})
