export default function Logo({ className = '', size = 48, ring = true }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="La Tana del Gatto"
    >
      <defs>
        <linearGradient id="gattoGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0772a" />
          <stop offset="100%" stopColor="#c0392b" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#gattoGrad)" />
      {ring ? (
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="#e3a82e"
          strokeWidth="2"
          opacity="0.6"
        />
      ) : null}

      <g fill="#fbf3e4">
        <path d="M21 27 L17 13 L28 23 Z" />
        <path d="M43 27 L47 13 L36 23 Z" />
        <path d="M32 24 C22.5 24 17 30.5 17 38 C17 46.5 23.5 51 32 51 C40.5 51 47 46.5 47 38 C47 30.5 41.5 24 32 24 Z" />
      </g>

      <g fill="#1c130d">
        <ellipse cx="25.5" cy="36" rx="2.3" ry="3.4" />
        <ellipse cx="38.5" cy="36" rx="2.3" ry="3.4" />
      </g>

      <path d="M30.4 41 L33.6 41 L32 43.3 Z" fill="#e0772a" />

      <g stroke="#1c130d" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" fill="none">
        <line x1="23" y1="42" x2="11" y2="40" />
        <line x1="23" y1="45" x2="11" y2="47" />
        <line x1="41" y1="42" x2="53" y2="40" />
        <line x1="41" y1="45" x2="53" y2="47" />
      </g>
    </svg>
  )
}