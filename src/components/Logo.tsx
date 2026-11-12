/**
 * ChocoNode eriyen-çikolata logosu. "oo" harfleri bağlı iki düğüm (node) gibi çizilir.
 * Metin okunaklı kalır; "erime" efekti sadece alttaki damla dekorasyonuna uygulanır.
 */
export function Logo({ className = "", animated = true }: { className?: string; animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 440 150"
      className={className}
      role="img"
      aria-label="ChocoNode logosu"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cocoaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a8713f" />
          <stop offset="45%" stopColor="#5c371f" />
          <stop offset="100%" stopColor="#2b1810" />
        </linearGradient>
        <linearGradient id="glossGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="goo" x="-60%" y="-120%" width="220%" height="340%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
          <feComposite in="goo" in2="goo" operator="atop" />
        </filter>
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#2b1810" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Okunaklı ana metin — filtre YOK, net kalır */}
      <g filter="url(#softShadow)">
        <text x="14" y="78" fontFamily="'Baloo 2', system-ui, sans-serif" fontWeight="700" fontSize="58" fill="url(#cocoaGradient)">
          Choc
        </text>

        {/* "oo" -> iki bağlı düğüm (node) */}
        <circle cx="218" cy="54" r="19" fill="url(#cocoaGradient)" />
        <circle cx="218" cy="50" r="6.5" fill="#fff6e9" opacity="0.9" />
        <rect x="230" y="50" width="30" height="8" rx="4" fill="url(#cocoaGradient)" />
        <circle cx="270" cy="54" r="19" fill="url(#cocoaGradient)" />
        <circle cx="270" cy="50" r="6.5" fill="#fff6e9" opacity="0.9" />

        <text x="288" y="78" fontFamily="'Baloo 2', system-ui, sans-serif" fontWeight="700" fontSize="58" fill="url(#cocoaGradient)">
          de
        </text>

        {/* parlak cam yansıması, metnin üstünden geçen ince ışık şeridi */}
        <rect x="14" y="30" width="350" height="6" rx="3" fill="url(#glossGradient)" />
      </g>

      {/* Alt kenardan sarkan, eriyen çikolata damlaları — goo efekti sadece burada */}
      <g filter="url(#goo)" fill="url(#cocoaGradient)">
        <rect x="10" y="86" width="350" height="5" rx="2.5" />
        {[
          { x: 22, w: 13, h: 20 },
          { x: 70, w: 10, h: 14 },
          { x: 118, w: 12, h: 24 },
          { x: 205, w: 11, h: 16 },
          { x: 255, w: 13, h: 26 },
          { x: 305, w: 10, h: 15 },
          { x: 342, w: 12, h: 20 },
        ].map((d, i) => (
          <ellipse
            key={d.x}
            cx={d.x}
            cy={88 + d.h / 2}
            rx={d.w / 2}
            ry={d.h / 2}
            className={animated ? "animate-drip" : ""}
            style={{ animationDelay: `${i * 0.3}s`, transformOrigin: `${d.x}px 88px` }}
          />
        ))}
      </g>
    </svg>
  );
}
