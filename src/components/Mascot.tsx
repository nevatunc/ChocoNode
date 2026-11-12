export type MascotMood = "idle" | "happy" | "thinking" | "cheer";

/** Kakao: gülümseyen sıcak çikolata fincanı maskotu (özgün tasarım). */
export function Mascot({ mood = "idle", className = "" }: { mood?: MascotMood; className?: string }) {
  const eyeY = mood === "happy" || mood === "cheer" ? 60 : 58;
  const bounce = mood === "cheer";

  return (
    <svg
      viewBox="0 0 160 170"
      className={`${className} ${mood !== "idle" ? "animate-bob" : ""}`}
      role="img"
      aria-label="Kakao maskotu"
    >
      <defs>
        <linearGradient id="cupGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a8713f" />
          <stop offset="100%" stopColor="#5c371f" />
        </linearGradient>
        <radialGradient id="cheekGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0a8ae" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f0a8ae" stopOpacity="0" />
        </radialGradient>
        <filter id="mascotShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#2b1810" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* buhar */}
      <path
        d="M58 34 q-8 -12 0 -24 q8 -12 0 -24"
        stroke="#e3bb86"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        opacity="0.65"
        className="animate-steam"
        style={{ transformOrigin: "58px 10px" }}
      />
      <path
        d="M90 34 q8 -12 0 -24 q-8 -12 0 -24"
        stroke="#e3bb86"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        opacity="0.65"
        className="animate-steam"
        style={{ transformOrigin: "90px 10px", animationDelay: "0.6s" }}
      />
      <path
        d="M74 28 q-6 -10 0 -20"
        stroke="#e3bb86"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
        className="animate-steam"
        style={{ transformOrigin: "74px 18px", animationDelay: "1.1s" }}
      />

      <g filter="url(#mascotShadow)">
        {/* fincan gövdesi */}
        <rect x="32" y="50" width="96" height="80" rx="22" fill="url(#cupGradient)" />
        <rect x="32" y="50" width="96" height="24" rx="12" fill="#c8935c" />
        {/* fincan parlaklığı */}
        <rect x="42" y="62" width="10" height="56" rx="5" fill="#ffffff" opacity="0.18" />

        {/* kulp */}
        <path
          d="M128 70 q28 0 28 28 q0 28 -28 28"
          stroke="url(#cupGradient)"
          strokeWidth="11"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M128 70 q28 0 28 28 q0 28 -28 28" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.15" />

        {/* marshmallow'lar */}
        <ellipse cx="58" cy="52" rx="14" ry="12" fill="#fdf1e0" />
        <ellipse cx="58" cy="48" rx="14" ry="9" fill="#fffaf0" />
        <ellipse cx="82" cy="45" rx="16" ry="14" fill="#fffaf0" />
        <ellipse cx="82" cy="40" rx="16" ry="10" fill="#ffffff" />
        <ellipse cx="106" cy="52" rx="14" ry="12" fill="#fdf1e0" />
        <ellipse cx="106" cy="48" rx="14" ry="9" fill="#fffaf0" />

        {/* yanaklar */}
        {(mood === "happy" || mood === "cheer") && (
          <>
            <circle cx="50" cy={eyeY + 8} r="7" fill="url(#cheekGlow)" />
            <circle cx="110" cy={eyeY + 8} r="7" fill="url(#cheekGlow)" />
          </>
        )}

        {/* gözler */}
        {mood === "thinking" ? (
          <>
            <path d="M58 56 q4 -4 8 0" stroke="#2b1810" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M94 56 q4 -4 8 0" stroke="#2b1810" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="62" cy={eyeY} r="4.5" fill="#2b1810" />
            <circle cx="98" cy={eyeY} r="4.5" fill="#2b1810" />
            <circle cx="63.5" cy={eyeY - 1.5} r="1.4" fill="#fffaf0" />
            <circle cx="99.5" cy={eyeY - 1.5} r="1.4" fill="#fffaf0" />
          </>
        )}

        {/* ağız */}
        {mood === "thinking" ? (
          <path d="M66 86 q14 -6 28 0" stroke="#2b1810" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : bounce ? (
          <path d="M60 84 q20 22 40 0" stroke="#2b1810" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M62 84 q18 18 36 0" stroke="#2b1810" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
      </g>
    </svg>
  );
}
