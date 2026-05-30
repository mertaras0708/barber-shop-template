import clsx from 'clsx';

type Variant = 'hero' | 'portrait' | 'gallery' | 'tile' | 'wide';

type Props = {
  src?: string;
  alt: string;
  variant?: Variant;
  caption?: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Editorial Photo Placeholder — sieht intentional aus, kein "broken image".
 * In Produktion durch echte WebP-Bilder via <Image src={src}> ersetzen.
 */
export default function PhotoPlaceholder({
  alt,
  variant = 'hero',
  caption,
  label,
  className,
  children,
}: Props) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={clsx(
        'photo-placeholder relative w-full h-full',
        className,
      )}
    >
      {/* SVG Silhouette / Komposition pro Variante */}
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={`g-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C15A2A" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#8E3E1F" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#050504" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`r-${variant}`} cx="35%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#C15A2A" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#050504" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="500" fill={`url(#g-${variant})`} />
        <rect width="400" height="500" fill={`url(#r-${variant})`} />

        {variant === 'hero' && (
          <g opacity="0.35" stroke="#F0E7D8" strokeWidth="0.5" fill="none">
            {/* Stilisierte Barber-Komposition: Spiegel + Kontur */}
            <ellipse cx="200" cy="220" rx="115" ry="155" />
            <path d="M 130 200 Q 200 90 270 200" />
            <path d="M 130 200 L 130 380" />
            <path d="M 270 200 L 270 380" />
            <path d="M 130 380 Q 200 420 270 380" />
            {/* Klinge / Razor */}
            <path d="M 60 420 L 140 380" strokeWidth="1.2" stroke="#C15A2A" />
            <circle cx="60" cy="420" r="3" fill="#C15A2A" />
          </g>
        )}

        {variant === 'portrait' && (
          <g opacity="0.42" stroke="#F0E7D8" strokeWidth="0.6" fill="none">
            <circle cx="200" cy="190" r="78" />
            <path d="M 90 500 Q 90 330 200 320 Q 310 330 310 500" />
            <path d="M 145 175 Q 200 130 255 175" strokeWidth="1" />
            <path d="M 165 250 Q 200 270 235 250" />
          </g>
        )}

        {variant === 'gallery' && (
          <g opacity="0.38" stroke="#F0E7D8" strokeWidth="0.55" fill="none">
            <circle cx="200" cy="240" r="120" />
            <path d="M 110 220 Q 200 130 290 220" />
            <line x1="60" y1="100" x2="340" y2="100" stroke="#C15A2A" strokeWidth="0.8" />
            <line x1="60" y1="400" x2="340" y2="400" />
          </g>
        )}

        {variant === 'tile' && (
          <g opacity="0.32" stroke="#C15A2A" strokeWidth="0.6" fill="none">
            <rect x="80" y="120" width="240" height="260" />
            <line x1="80" y1="180" x2="320" y2="180" />
            <line x1="80" y1="320" x2="320" y2="320" />
            <circle cx="200" cy="250" r="35" />
          </g>
        )}

        {variant === 'wide' && (
          <g opacity="0.3" stroke="#F0E7D8" strokeWidth="0.5" fill="none">
            <line x1="0" y1="250" x2="400" y2="250" stroke="#C15A2A" strokeWidth="0.8" />
            <circle cx="120" cy="250" r="60" />
            <circle cx="280" cy="250" r="60" />
            <rect x="160" y="200" width="80" height="100" />
          </g>
        )}
      </svg>

      {/* Sehr feines Vignette-Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 55%)',
        }}
      />

      {/* Optional caption (filename / asset hint) */}
      {caption && (
        <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-widest2 text-cream/35 font-mono">
          {caption}
        </div>
      )}

      {/* Optional category label */}
      {label && (
        <div className="absolute top-4 left-4 inline-flex items-center gap-2 text-eyebrow uppercase text-cream/85">
          <span className="h-px w-6 bg-copper" />
          {label}
        </div>
      )}

      {children}
    </div>
  );
}
