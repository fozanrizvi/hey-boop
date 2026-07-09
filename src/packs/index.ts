import type { ContentPack } from '../engine/types'
import { numbersPack } from './numbers'
import { abcPack } from './abc'
import { animalsPack } from './animals'
import { fruitsPack } from './fruits'
import { shapesPack } from './shapes'
import { vehiclesPack } from './vehicles'

/** Adding a pack = one data file + one line here. The Home screen renders from this. */
export const packs: ContentPack[] = [
  numbersPack,
  abcPack,
  animalsPack,
  fruitsPack,
  shapesPack,
  vehiclesPack,
]
