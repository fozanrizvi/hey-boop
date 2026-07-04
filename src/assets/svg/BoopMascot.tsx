/** Boop — round bouncy blob mascot. Sunshine body, big happy eyes, coral blush. */
export function BoopMascot({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label="Boop the blob">
      <circle cx="100" cy="105" r="80" fill="#FFD23F" stroke="#2D2A32" strokeWidth="10" />
      <ellipse cx="72" cy="92" rx="13" ry="17" fill="#2D2A32" />
      <ellipse cx="128" cy="92" rx="13" ry="17" fill="#2D2A32" />
      <circle cx="76" cy="86" r="4.5" fill="#FFF8ED" />
      <circle cx="132" cy="86" r="4.5" fill="#FFF8ED" />
      <path
        d="M78 128 Q100 148 122 128"
        fill="none"
        stroke="#2D2A32"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <circle cx="52" cy="120" r="11" fill="#FF6B6B" opacity="0.55" />
      <circle cx="148" cy="120" r="11" fill="#FF6B6B" opacity="0.55" />
    </svg>
  )
}
