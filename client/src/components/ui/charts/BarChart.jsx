/**
 * Minimal, dependency-free bar chart built directly in SVG.
 *
 * Deliberately not using a charting library (recharts, chart.js, etc.)
 * for a handful of small admin-dashboard charts - pulling in a charting
 * dependency for two or three simple bar/line charts would be exactly
 * the kind of unnecessary weight the rest of this codebase avoids (see
 * design-and-research-report.md section 12). Data shape: an array of
 * { label, value } objects.
 */
export default function BarChart({ data, height = 160, color = "var(--color-accent-strong)" }) {
  if (!data || data.length === 0) {
    return <p className="text-sm text-[var(--color-text-faint)]">No data yet.</p>;
  }

  const max = Math.max(...data.map((d) => d.value), 1);
  const barWidth = 100 / data.length;

  return (
    <div>
      <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
        {data.map((d, i) => {
          const barHeight = (d.value / max) * (height - 24);
          return (
            <g key={d.label}>
              <rect
                x={i * barWidth + barWidth * 0.15}
                y={height - 20 - barHeight}
                width={barWidth * 0.7}
                height={barHeight}
                rx="1.5"
                fill={color}
              />
              <text
                x={i * barWidth + barWidth / 2}
                y={height - 20 - barHeight - 4}
                fontSize="4.5"
                textAnchor="middle"
                fill="var(--color-text-muted)"
                fontFamily="var(--font-mono)"
              >
                {d.value}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex mt-1">
        {data.map((d) => (
          <div key={d.label} style={{ width: `${barWidth}%` }} className="text-center">
            <span className="text-[10px] text-[var(--color-text-faint)] font-mono truncate block px-0.5">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
