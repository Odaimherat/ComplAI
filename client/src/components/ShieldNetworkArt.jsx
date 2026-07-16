/**
 * Self-drawn SVG illustration used on About (and available for reuse
 * elsewhere). Deliberately abstract/technical rather than an illustrated
 * scene with characters - a security vendor's visual language leans
 * toward diagrams and systems, not stock-illustration people, so this
 * mirrors the same "shield + connected nodes" idea as the favicon
 * (public/favicon.svg) at a larger, more detailed scale.
 *
 * All colors are CSS custom properties, so the illustration re-themes
 * automatically with the light/dark toggle - nothing here is a raster
 * image or an externally hosted asset.
 */
export default function ShieldNetworkArt({ className = "" }) {
  const nodes = [
    { angle: -100, r: 150, size: 5 },
    { angle: -40, r: 165, size: 4 },
    { angle: 20, r: 150, size: 6 },
    { angle: 80, r: 170, size: 4 },
    { angle: 140, r: 150, size: 5 },
    { angle: -160, r: 165, size: 4 },
  ];

  const polar = (angleDeg, radius) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: 200 + radius * Math.cos(rad), y: 200 + radius * Math.sin(rad) };
  };

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-hidden="true">
      <circle cx="200" cy="200" r="175" fill="none" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="2 6" />
      <circle cx="200" cy="200" r="140" fill="none" stroke="var(--color-border)" strokeWidth="1" />

      {nodes.map((n, i) => {
        const p = polar(n.angle, n.r);
        const inner = polar(n.angle, 78);
        return (
          <g key={i}>
            <line x1={inner.x} y1={inner.y} x2={p.x} y2={p.y} stroke="var(--color-border-strong)" strokeWidth="1" />
            <circle cx={p.x} cy={p.y} r={n.size} fill="var(--color-bg)" stroke="var(--color-accent-strong)" strokeWidth="1.5" />
          </g>
        );
      })}

      {/* Central shield, matching the favicon's proportions */}
      <path
        d="M200 108 L258 130 V172 C258 218 234 250 200 264 C166 250 142 218 142 172 V130 Z"
        fill="var(--color-surface)"
        stroke="var(--color-accent)"
        strokeWidth="2"
      />
      <path
        d="M178 190 L195 207 L224 172"
        fill="none"
        stroke="var(--color-accent-strong)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
