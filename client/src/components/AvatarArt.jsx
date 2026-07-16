/**
 * Self-drawn, deterministic geometric avatars - a Notion/Linear-style
 * "abstract colored shape" avatar rather than an illustrated face or a
 * stock photo. This sidesteps two problems at once: the brief requires
 * only free/open-license or self-drawn imagery (no stock photo
 * services), and generating a realistic human face without a real
 * photo tends to look uncanny. An abstract, brand-colored mark reads as
 * a deliberate design choice instead.
 *
 * The shape/palette is derived from a simple string hash of `seed`
 * (typically the person's name), so the same person always renders the
 * same avatar without needing to store anything.
 */
const PALETTES = [
  ["#7b5cfa", "#4fd8c4"],
  ["#2ed3a3", "#7b5cfa"],
  ["#f5a623", "#7b5cfa"],
  ["#f0546b", "#9580ff"],
  ["#4fd8c4", "#f5a623"],
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function AvatarArt({ seed, size = 64, className = "" }) {
  const hash = hashString(seed || "complai");
  const [colorA, colorB] = PALETTES[hash % PALETTES.length];
  const rotation = hash % 360;
  const variant = hash % 3;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`grad-${hash}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colorA} />
          <stop offset="100%" stopColor={colorB} />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill={`url(#grad-${hash})`} opacity="0.16" />
      <g transform={`rotate(${rotation} 32 32)`}>
        {variant === 0 && <circle cx="32" cy="32" r="16" fill={`url(#grad-${hash})`} />}
        {variant === 1 && <rect x="16" y="16" width="32" height="32" rx="10" fill={`url(#grad-${hash})`} />}
        {variant === 2 && <polygon points="32,14 50,44 14,44" fill={`url(#grad-${hash})`} />}
      </g>
    </svg>
  );
}
