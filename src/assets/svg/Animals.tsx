/**
 * Animal illustrations: big friendly faces in the HeyBoop chunky flat style.
 * Shared contract: viewBox 0 0 200 200, thick Ink outlines with round
 * joins/caps, flat bright fills, mascot-style eyes (dark ellipse + highlight).
 */

const INK = '#2D2A32'
const CREAM = '#FFF8ED'

export interface IllustrationProps {
  className?: string
}

function Eye({ cx, cy, s = 1 }: { cx: number; cy: number; s?: number }) {
  return (
    <>
      <ellipse cx={cx} cy={cy} rx={9 * s} ry={12 * s} fill={INK} />
      <circle cx={cx + 3 * s} cy={cy - 4 * s} r={3.2 * s} fill={CREAM} />
    </>
  )
}

export function CowIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Cow">
      <ellipse cx="42" cy="70" rx="20" ry="13" transform="rotate(-30 42 70)" fill="#FFA8C5" stroke={INK} strokeWidth="9" />
      <ellipse cx="158" cy="70" rx="20" ry="13" transform="rotate(30 158 70)" fill="#FFA8C5" stroke={INK} strokeWidth="9" />
      <path d="M62 42 Q58 22 74 18" fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
      <path d="M138 42 Q142 22 126 18" fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="100" cy="108" rx="66" ry="62" fill={CREAM} stroke={INK} strokeWidth="10" />
      <path d="M60 58 Q80 48 92 62 Q80 78 58 74 Q54 64 60 58 Z" fill="#BFBCCB" />
      <Eye cx={76} cy={96} />
      <Eye cx={124} cy={96} />
      <ellipse cx="100" cy="140" rx="38" ry="24" fill="#FFA8C5" stroke={INK} strokeWidth="9" />
      <ellipse cx="88" cy="140" rx="5" ry="7" fill={INK} />
      <ellipse cx="112" cy="140" rx="5" ry="7" fill={INK} />
    </svg>
  )
}

export function DogIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Dog">
      <path d="M46 62 Q28 60 26 96 Q26 124 48 122 Z" fill="#8A5A36" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <path d="M154 62 Q172 60 174 96 Q174 124 152 122 Z" fill="#8A5A36" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <ellipse cx="100" cy="106" rx="62" ry="60" fill="#B07A4E" stroke={INK} strokeWidth="10" />
      <Eye cx={78} cy={92} />
      <Eye cx={122} cy={92} />
      <ellipse cx="100" cy="126" rx="26" ry="19" fill={CREAM} stroke={INK} strokeWidth="8" />
      <ellipse cx="100" cy="118" rx="8" ry="6" fill={INK} />
      <path d="M100 124 Q100 132 93 134 M100 124 Q100 132 107 134" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M93 138 Q93 154 100 154 Q107 154 107 138 Z" fill="#FFA8C5" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    </svg>
  )
}

export function CatIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Cat">
      <path d="M48 74 L40 30 L80 52 Z" fill="#BFBCCB" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <path d="M152 74 L160 30 L120 52 Z" fill="#BFBCCB" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <ellipse cx="100" cy="112" rx="62" ry="56" fill="#BFBCCB" stroke={INK} strokeWidth="10" />
      <Eye cx={78} cy={102} />
      <Eye cx={122} cy={102} />
      <path d="M94 126 L106 126 L100 134 Z" fill="#FFA8C5" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      <path d="M100 134 Q100 144 90 146 M100 134 Q100 144 110 146" fill="none" stroke={INK} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M30 116 L62 120 M32 134 L62 130 M170 116 L138 120 M168 134 L138 130" fill="none" stroke={INK} strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  )
}

export function DuckIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Duck">
      <ellipse cx="100" cy="108" rx="60" ry="58" fill="#FFD23F" stroke={INK} strokeWidth="10" />
      <path d="M84 44 Q100 30 112 44 Q106 36 100 52" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
      <Eye cx={80} cy={94} />
      <Eye cx={120} cy={94} />
      <path d="M64 126 Q100 112 136 126 Q100 152 64 126 Z" fill="#FF9F45" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <path d="M76 130 Q100 138 124 130" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

export function SheepIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Sheep">
      <circle cx="58" cy="76" r="26" fill={CREAM} stroke={INK} strokeWidth="9" />
      <circle cx="100" cy="60" r="28" fill={CREAM} stroke={INK} strokeWidth="9" />
      <circle cx="142" cy="76" r="26" fill={CREAM} stroke={INK} strokeWidth="9" />
      <circle cx="48" cy="112" r="24" fill={CREAM} stroke={INK} strokeWidth="9" />
      <circle cx="152" cy="112" r="24" fill={CREAM} stroke={INK} strokeWidth="9" />
      <circle cx="70" cy="140" r="26" fill={CREAM} stroke={INK} strokeWidth="9" />
      <circle cx="130" cy="140" r="26" fill={CREAM} stroke={INK} strokeWidth="9" />
      <circle cx="100" cy="150" r="28" fill={CREAM} stroke={INK} strokeWidth="9" />
      <circle cx="100" cy="104" r="44" fill={CREAM} />
      <ellipse cx="100" cy="112" rx="34" ry="38" fill="#BFBCCB" stroke={INK} strokeWidth="9" />
      <Eye cx={88} cy={106} s={0.9} />
      <Eye cx={112} cy={106} s={0.9} />
      <ellipse cx="94" cy="132" rx="4" ry="6" fill={INK} />
      <ellipse cx="106" cy="132" rx="4" ry="6" fill={INK} />
    </svg>
  )
}

export function PigIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Pig">
      <path d="M52 62 L40 32 L76 46 Z" fill="#FFA8C5" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <path d="M148 62 L160 32 L124 46 Z" fill="#FFA8C5" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <ellipse cx="100" cy="110" rx="64" ry="58" fill="#FFA8C5" stroke={INK} strokeWidth="10" />
      <Eye cx={74} cy={96} />
      <Eye cx={126} cy={96} />
      <ellipse cx="100" cy="130" rx="30" ry="22" fill="#FF8FB5" stroke={INK} strokeWidth="9" />
      <ellipse cx="90" cy="130" rx="5" ry="8" fill={INK} />
      <ellipse cx="110" cy="130" rx="5" ry="8" fill={INK} />
    </svg>
  )
}

export function HorseIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Horse">
      <path d="M100 22 Q76 30 78 66 L122 66 Q124 30 100 22 Z" fill="#8A5A36" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <path d="M56 56 L44 26 L82 42 Z" fill="#B07A4E" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <path d="M144 56 L156 26 L118 42 Z" fill="#B07A4E" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <path d="M100 44 Q56 52 56 108 Q56 158 100 162 Q144 158 144 108 Q144 52 100 44 Z" fill="#B07A4E" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
      <Eye cx={78} cy={96} />
      <Eye cx={122} cy={96} />
      <ellipse cx="100" cy="138" rx="30" ry="20" fill={CREAM} stroke={INK} strokeWidth="8" />
      <ellipse cx="90" cy="136" rx="4.5" ry="7" fill={INK} />
      <ellipse cx="110" cy="136" rx="4.5" ry="7" fill={INK} />
    </svg>
  )
}

export function FrogIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Frog">
      <circle cx="64" cy="52" r="24" fill="#7BC950" stroke={INK} strokeWidth="9" />
      <circle cx="136" cy="52" r="24" fill="#7BC950" stroke={INK} strokeWidth="9" />
      <ellipse cx="64" cy="52" rx="10" ry="13" fill={INK} />
      <circle cx="67" cy="47" r="3.5" fill={CREAM} />
      <ellipse cx="136" cy="52" rx="10" ry="13" fill={INK} />
      <circle cx="139" cy="47" r="3.5" fill={CREAM} />
      <path d="M40 96 Q100 56 160 96 Q168 150 100 156 Q32 150 40 96 Z" fill="#7BC950" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
      <path d="M64 116 Q100 142 136 116" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
      <circle cx="52" cy="104" r="8" fill="#FFA8C5" opacity="0.7" />
      <circle cx="148" cy="104" r="8" fill="#FFA8C5" opacity="0.7" />
    </svg>
  )
}

export function LionIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Lion">
      <circle cx="100" cy="104" r="76" fill="#FF9F45" stroke={INK} strokeWidth="10" />
      <circle cx="100" cy="104" r="50" fill="#FFD23F" stroke={INK} strokeWidth="9" />
      <Eye cx={82} cy={94} s={0.9} />
      <Eye cx={118} cy={94} s={0.9} />
      <path d="M92 116 L108 116 L100 126 Z" fill={INK} />
      <path d="M100 126 Q100 136 88 138 M100 126 Q100 136 112 138" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

export function ElephantIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Elephant">
      <circle cx="44" cy="96" r="32" fill="#A5A1B5" stroke={INK} strokeWidth="9" />
      <circle cx="156" cy="96" r="32" fill="#A5A1B5" stroke={INK} strokeWidth="9" />
      <circle cx="44" cy="96" r="16" fill="#BFBCCB" />
      <circle cx="156" cy="96" r="16" fill="#BFBCCB" />
      <ellipse cx="100" cy="96" rx="54" ry="50" fill="#BFBCCB" stroke={INK} strokeWidth="10" />
      <Eye cx={82} cy={88} s={0.9} />
      <Eye cx={118} cy={88} s={0.9} />
      <path d="M90 124 Q88 158 108 166 Q122 170 122 158 Q122 150 112 152 Q102 150 104 128 Z" fill="#BFBCCB" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    </svg>
  )
}
