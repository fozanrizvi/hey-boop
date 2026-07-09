/**
 * Vehicle illustrations — same chunky flat contract as Animals.tsx/Fruits.tsx
 * (viewBox 0 0 200 200, thick Ink outlines with round joins/caps, flat
 * bright fills, cream shine/window highlights).
 */

const INK = '#2D2A32'
const CREAM = '#FFF8ED'

export interface IllustrationProps {
  className?: string
}

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r="17" fill={INK} />
      <circle cx={cx} cy={cy} r="7" fill={CREAM} />
    </>
  )
}

export function CarIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Car">
      <path
        d="M26 128 Q26 100 54 96 L70 68 Q76 60 88 60 L132 60 Q144 60 150 72 L164 96 Q176 98 176 118 L176 130 Q176 138 168 138 L34 138 Q26 138 26 128 Z"
        fill="#FF6B6B"
        stroke={INK}
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path
        d="M82 72 L90 96 L146 96 L140 72 Z"
        fill={CREAM}
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <Wheel cx={58} cy={134} />
      <Wheel cx={150} cy={134} />
    </svg>
  )
}

export function TruckIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Truck">
      <rect
        x="90"
        y="86"
        width="90"
        height="46"
        rx="10"
        fill="#FFD23F"
        stroke={INK}
        strokeWidth="10"
      />
      <path
        d="M22 96 Q22 84 34 84 L60 84 Q78 84 84 100 L90 132 L22 132 Z"
        fill="#FFD23F"
        stroke={INK}
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path
        d="M56 94 L62 116 L84 116 L80 96 Z"
        fill={CREAM}
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <Wheel cx={58} cy={136} />
      <Wheel cx={152} cy={136} />
    </svg>
  )
}

export function BusIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Bus">
      <rect
        x="28"
        y="52"
        width="144"
        height="80"
        rx="18"
        fill="#7BC950"
        stroke={INK}
        strokeWidth="10"
      />
      <g fill={CREAM} stroke={INK} strokeWidth="5">
        <rect x="42" y="68" width="28" height="24" rx="6" />
        <rect x="86" y="68" width="28" height="24" rx="6" />
        <rect x="130" y="68" width="28" height="24" rx="6" />
      </g>
      <Wheel cx={62} cy={134} />
      <Wheel cx={138} cy={134} />
    </svg>
  )
}

export function AirplaneIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Airplane">
      <path
        d="M40 108 Q40 94 60 92 L150 100 Q170 102 170 110 Q170 118 150 120 L60 128 Q40 126 40 108 Z"
        fill="#4ECDC4"
        stroke={INK}
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path
        d="M92 96 L108 46 L128 50 L118 98 Z"
        fill="#4ECDC4"
        stroke={INK}
        strokeWidth="9"
        strokeLinejoin="round"
      />
      <path
        d="M92 124 L108 168 L124 164 L118 126 Z"
        fill="#4ECDC4"
        stroke={INK}
        strokeWidth="9"
        strokeLinejoin="round"
      />
      <circle cx="72" cy="108" r="8" fill={CREAM} stroke={INK} strokeWidth="4" />
      <circle cx="98" cy="108" r="8" fill={CREAM} stroke={INK} strokeWidth="4" />
    </svg>
  )
}

export function TrainIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Train">
      <path
        d="M32 96 Q32 78 50 78 L146 78 Q164 78 164 96 L164 132 L32 132 Z"
        fill="#8E7CC3"
        stroke={INK}
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <rect
        x="52"
        y="52"
        width="26"
        height="26"
        rx="6"
        fill="#8E7CC3"
        stroke={INK}
        strokeWidth="8"
      />
      <circle cx="65" cy="46" r="9" fill={CREAM} stroke={INK} strokeWidth="5" />
      <circle cx="52" cy="102" r="14" fill={CREAM} stroke={INK} strokeWidth="6" />
      <circle cx="98" cy="102" r="14" fill={CREAM} stroke={INK} strokeWidth="6" />
      <circle cx="144" cy="102" r="14" fill={CREAM} stroke={INK} strokeWidth="6" />
      <Wheel cx={58} cy={138} />
      <Wheel cx={138} cy={138} />
    </svg>
  )
}

export function FireTruckIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Fire Truck">
      <path
        d="M26 128 Q26 100 54 96 L70 68 Q76 60 88 60 L156 60 Q170 60 170 74 L170 128 Q170 138 160 138 L34 138 Q26 138 26 128 Z"
        fill="#FF6B6B"
        stroke={INK}
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path
        d="M82 72 L90 96 L120 96 L120 72 Z"
        fill={CREAM}
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <rect
        x="132"
        y="70"
        width="30"
        height="14"
        rx="4"
        fill={CREAM}
        stroke={INK}
        strokeWidth="5"
      />
      <circle cx="150" cy="52" r="10" fill="#FFD23F" stroke={INK} strokeWidth="6" />
      <Wheel cx={58} cy={134} />
      <Wheel cx={150} cy={134} />
    </svg>
  )
}

export function PoliceCarIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Police Car">
      <path
        d="M26 128 Q26 100 54 96 L70 68 Q76 60 88 60 L132 60 Q144 60 150 72 L164 96 Q176 98 176 118 L176 130 Q176 138 168 138 L34 138 Q26 138 26 128 Z"
        fill="#4ECDC4"
        stroke={INK}
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path
        d="M82 72 L90 96 L146 96 L140 72 Z"
        fill={CREAM}
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <rect x="26" y="112" width="150" height="16" fill={CREAM} stroke={INK} strokeWidth="4" />
      <rect
        x="86"
        y="46"
        width="28"
        height="12"
        rx="4"
        fill="#FF6B6B"
        stroke={INK}
        strokeWidth="5"
      />
      <Wheel cx={58} cy={134} />
      <Wheel cx={150} cy={134} />
    </svg>
  )
}

export function HelicopterIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Helicopter">
      <path d="M30 78 L170 78" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <rect x="94" y="72" width="12" height="18" fill="#8E7CC3" stroke={INK} strokeWidth="6" />
      <ellipse cx="104" cy="118" rx="62" ry="40" fill="#8E7CC3" stroke={INK} strokeWidth="10" />
      <path
        d="M158 112 Q182 110 182 124 Q182 136 160 132 Z"
        fill="#8E7CC3"
        stroke={INK}
        strokeWidth="9"
        strokeLinejoin="round"
      />
      <path
        d="M74 100 L128 100 L120 130 L82 130 Z"
        fill={CREAM}
        stroke={INK}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M64 158 Q104 148 144 158 M78 138 L78 158 M130 138 L130 158"
        fill="none"
        stroke={INK}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  )
}
