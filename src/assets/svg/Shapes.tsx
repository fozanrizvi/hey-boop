/**
 * Shape illustrations — same chunky flat contract as Fruits.tsx/Animals.tsx
 * (viewBox 0 0 200 200, thick Ink outlines, flat bright fills, cream shine).
 */

const INK = '#2D2A32'
const CREAM = '#FFF8ED'

export interface IllustrationProps {
  className?: string
}

function Shine({ d }: { d: string }) {
  return (
    <path d={d} fill="none" stroke={CREAM} strokeWidth="9" strokeLinecap="round" opacity="0.75" />
  )
}

export function CircleIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Circle">
      <circle cx="100" cy="100" r="70" fill="#4ECDC4" stroke={INK} strokeWidth="10" />
      <Shine d="M62 76 Q54 92 58 112" />
    </svg>
  )
}

export function SquareIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Square">
      <rect
        x="34"
        y="34"
        width="132"
        height="132"
        rx="18"
        fill="#8E7CC3"
        stroke={INK}
        strokeWidth="10"
      />
      <Shine d="M56 58 L56 88" />
    </svg>
  )
}

export function TriangleIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Triangle">
      <path
        d="M100 34 L166 152 Q168 160 158 160 L42 160 Q32 160 34 152 Z"
        fill="#FFD23F"
        stroke={INK}
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <Shine d="M84 74 Q68 100 66 128" />
    </svg>
  )
}

export function StarIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Star">
      <path
        d="M100 30 L118 76 L167 78 L129 109 L141 157 L100 130 L59 157 L72 109 L33 78 L82 76 Z"
        fill="#FF6B6B"
        stroke={INK}
        strokeWidth="9"
        strokeLinejoin="round"
      />
      <Shine d="M90 66 Q80 84 82 100" />
    </svg>
  )
}

export function HeartIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Heart">
      <path
        d="M100 168 Q40 122 40 82 Q40 50 68 50 Q92 50 100 76 Q108 50 132 50 Q160 50 160 82 Q160 122 100 168 Z"
        fill="#FF6B6B"
        stroke={INK}
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <Shine d="M62 78 Q56 92 60 106" />
    </svg>
  )
}

export function DiamondIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Diamond">
      <path
        d="M100 26 L172 100 L100 174 L28 100 Z"
        fill="#8E7CC3"
        stroke={INK}
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <Shine d="M80 66 Q64 82 62 100" />
    </svg>
  )
}

export function OvalIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Oval">
      <ellipse cx="100" cy="100" rx="76" ry="46" fill="#7BC950" stroke={INK} strokeWidth="10" />
      <Shine d="M56 84 Q48 98 52 112" />
    </svg>
  )
}

export function RectangleIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Rectangle">
      <rect
        x="24"
        y="56"
        width="152"
        height="88"
        rx="16"
        fill="#4ECDC4"
        stroke={INK}
        strokeWidth="10"
      />
      <Shine d="M46 78 L46 122" />
    </svg>
  )
}
