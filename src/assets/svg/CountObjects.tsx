/** Chunky flat count-up objects for the Numbers pack: thick Ink outlines, palette fills. */

export function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path
        d="M50 28 Q52 14 62 10"
        fill="none"
        stroke="#2D2A32"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <ellipse
        cx="66"
        cy="20"
        rx="13"
        ry="8"
        transform="rotate(-28 66 20)"
        fill="#7BC950"
        stroke="#2D2A32"
        strokeWidth="6"
      />
      <circle cx="50" cy="60" r="33" fill="#FF6B6B" stroke="#2D2A32" strokeWidth="8" />
      <path
        d="M34 48 Q30 54 31 62"
        fill="none"
        stroke="#FFF8ED"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <polygon
        points="50,14 60,38.3 86.1,40.3 66.2,57.3 72.3,82.7 50,69 27.7,82.7 33.8,57.3 13.9,40.3 40,38.3"
        fill="#FFD23F"
        stroke="#2D2A32"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <circle cx="42" cy="46" r="4" fill="#FFF8ED" opacity="0.8" />
    </svg>
  )
}
