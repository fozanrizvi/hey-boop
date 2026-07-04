import type { ContentPack } from '../engine/types'
import { numbersPack } from './numbers'

/** Adding a pack = one data file + one line here. The Home screen renders from this. */
export const packs: ContentPack[] = [numbersPack]
