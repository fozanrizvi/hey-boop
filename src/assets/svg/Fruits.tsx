/**
 * Fruit & vegetable illustrations — same chunky flat contract as Animals.tsx
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

export function AppleIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Apple">
      <path d="M100 58 Q104 34 122 26" fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="130" cy="44" rx="24" ry="14" transform="rotate(-26 130 44)" fill="#7BC950" stroke={INK} strokeWidth="8" />
      <path d="M100 62 Q60 44 42 84 Q30 132 68 158 Q88 170 100 160 Q112 170 132 158 Q170 132 158 84 Q140 44 100 62 Z" fill="#FF6B6B" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
      <Shine d="M66 84 Q56 98 58 116" />
    </svg>
  )
}

export function BananaIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Banana">
      <path d="M48 46 Q52 118 118 144 Q152 156 168 132 Q176 120 162 122 Q108 126 76 62 Q68 44 62 38 Q50 32 48 46 Z" fill="#FFD23F" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
      <path d="M58 34 Q50 26 60 24 Q70 24 68 34 Z" fill="#8A5A36" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
      <Shine d="M70 74 Q88 110 118 126" />
    </svg>
  )
}

export function OrangeIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Orange">
      <path d="M100 52 Q100 36 112 30" fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="126" cy="36" rx="22" ry="12" transform="rotate(-20 126 36)" fill="#7BC950" stroke={INK} strokeWidth="8" />
      <circle cx="100" cy="112" r="62" fill="#FF9F45" stroke={INK} strokeWidth="10" />
      <Shine d="M66 92 Q58 104 60 120" />
      <circle cx="122" cy="132" r="4" fill={INK} opacity="0.25" />
      <circle cx="106" cy="142" r="4" fill={INK} opacity="0.25" />
      <circle cx="126" cy="112" r="4" fill={INK} opacity="0.25" />
    </svg>
  )
}

export function StrawberryIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Strawberry">
      <path d="M100 44 L84 22 M100 44 L100 16 M100 44 L116 22" fill="none" stroke="#7BC950" strokeWidth="10" strokeLinecap="round" />
      <path d="M58 46 Q100 30 142 46 L128 62 L100 54 L72 62 Z" fill="#7BC950" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
      <path d="M56 52 Q100 40 144 52 Q160 96 128 138 Q112 158 100 164 Q88 158 72 138 Q40 96 56 52 Z" fill="#FF6B6B" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
      <g fill="#FFD23F" stroke={INK} strokeWidth="3">
        <ellipse cx="80" cy="86" rx="4.5" ry="6" />
        <ellipse cx="120" cy="86" rx="4.5" ry="6" />
        <ellipse cx="100" cy="104" rx="4.5" ry="6" />
        <ellipse cx="76" cy="116" rx="4.5" ry="6" />
        <ellipse cx="124" cy="116" rx="4.5" ry="6" />
        <ellipse cx="100" cy="138" rx="4.5" ry="6" />
      </g>
    </svg>
  )
}

export function GrapesIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Grapes">
      <path d="M100 46 Q98 28 112 20" fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="124" cy="30" rx="22" ry="12" transform="rotate(-18 124 30)" fill="#7BC950" stroke={INK} strokeWidth="8" />
      <g fill="#8E7CC3" stroke={INK} strokeWidth="8">
        <circle cx="68" cy="72" r="22" />
        <circle cx="132" cy="72" r="22" />
        <circle cx="100" cy="66" r="22" />
        <circle cx="68" cy="112" r="22" />
        <circle cx="132" cy="112" r="22" />
        <circle cx="100" cy="106" r="22" />
        <circle cx="84" cy="148" r="22" />
        <circle cx="116" cy="148" r="22" />
        <circle cx="100" cy="176" r="16" />
      </g>
      <Shine d="M58 66 Q54 72 55 80" />
    </svg>
  )
}

export function WatermelonIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Watermelon">
      <path d="M28 84 Q100 196 172 84 Q100 128 28 84 Z" fill="#7BC950" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
      <path d="M42 90 Q100 178 158 90 Q100 124 42 90 Z" fill={CREAM} />
      <path d="M52 94 Q100 166 148 94 Q100 122 52 94 Z" fill="#FF6B6B" />
      <g fill={INK}>
        <ellipse cx="84" cy="116" rx="4" ry="6" />
        <ellipse cx="116" cy="116" rx="4" ry="6" />
        <ellipse cx="100" cy="136" rx="4" ry="6" />
      </g>
    </svg>
  )
}

export function CarrotIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Carrot">
      <path d="M118 54 L104 20 M122 58 L140 24 M126 62 L156 44" fill="none" stroke="#7BC950" strokeWidth="12" strokeLinecap="round" />
      <path d="M112 58 Q140 62 138 86 Q120 148 62 172 Q46 178 42 164 Q40 152 52 136 Q80 92 112 58 Z" fill="#FF9F45" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
      <path d="M96 96 Q106 104 114 100 M74 126 Q84 134 92 130" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" opacity="0.45" />
    </svg>
  )
}

export function TomatoIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Tomato">
      <path d="M100 46 L100 26" fill="none" stroke="#4C9A3D" strokeWidth="10" strokeLinecap="round" />
      <path d="M100 52 L70 40 L92 58 L60 62 L92 70 M100 52 L130 40 L108 58 L140 62 L108 70" fill="#7BC950" stroke="#4C9A3D" strokeWidth="4" strokeLinejoin="round" />
      <ellipse cx="100" cy="116" rx="64" ry="54" fill="#FF6B6B" stroke={INK} strokeWidth="10" />
      <Shine d="M62 100 Q54 112 57 126" />
    </svg>
  )
}

export function BroccoliIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Broccoli">
      <path d="M90 108 L86 156 Q86 170 100 170 Q114 170 114 156 L110 108 Z" fill="#A8D778" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <g fill="#4C9A3D" stroke={INK} strokeWidth="9">
        <circle cx="62" cy="78" r="26" />
        <circle cx="138" cy="78" r="26" />
        <circle cx="100" cy="56" r="30" />
        <circle cx="76" cy="104" r="22" />
        <circle cx="124" cy="104" r="22" />
        <circle cx="100" cy="92" r="24" />
      </g>
      <g fill="#7BC950" opacity="0.8">
        <circle cx="92" cy="52" r="7" />
        <circle cx="64" cy="74" r="6" />
        <circle cx="134" cy="72" r="6" />
        <circle cx="106" cy="88" r="6" />
      </g>
    </svg>
  )
}

export function CornIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Corn">
      <path d="M70 90 Q40 100 34 140 Q60 138 78 118 Z" fill="#7BC950" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <path d="M130 90 Q160 100 166 140 Q140 138 122 118 Z" fill="#7BC950" stroke={INK} strokeWidth="9" strokeLinejoin="round" />
      <path d="M100 24 Q64 24 62 84 Q62 140 100 172 Q138 140 138 84 Q136 24 100 24 Z" fill="#FFD23F" stroke={INK} strokeWidth="10" strokeLinejoin="round" />
      <g fill="none" stroke={INK} strokeWidth="5" opacity="0.4">
        <path d="M80 34 Q78 100 96 160" />
        <path d="M120 34 Q122 100 104 160" />
        <path d="M64 68 Q100 80 136 68" />
        <path d="M64 106 Q100 118 134 106" />
      </g>
    </svg>
  )
}
