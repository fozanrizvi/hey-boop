import type { ContentPack } from '../engine/types'

// [id, spoken name, second-tap sound, background color]
// Backgrounds are hand-picked so each illustration contrasts with its color
// and consecutive items always differ.
const VEHICLES: Array<[string, string, string, string]> = [
  ['car', 'Car', 'Vroom!', '#4ECDC4'],
  ['truck', 'Truck', 'Rumble rumble!', '#8E7CC3'],
  ['bus', 'Bus', 'Beep beep!', '#FF6B6B'],
  ['airplane', 'Airplane', 'Whoosh!', '#FFD23F'],
  ['train', 'Train', 'Choo choo!', '#7BC950'],
  ['fire-truck', 'Fire Truck', 'Wee-oo wee-oo!', '#4ECDC4'],
  ['police-car', 'Police Car', 'Woop woop!', '#FFD23F'],
  ['helicopter', 'Helicopter', 'Whir whir whir!', '#FF6B6B'],
]

export const vehiclesPack: ContentPack = {
  id: 'vehicles',
  title: 'Vehicles',
  icon: '🚗',
  loop: true,
  items: VEHICLES.map(([id, label, sound, color]) => ({
    id,
    display: '',
    label,
    image: id,
    color,
    audio: `/audio/vehicles/${id}.mp3`,
    bonusLabel: sound,
    bonusAudio: `/audio/vehicles/${id}-sound.mp3`,
  })),
}
