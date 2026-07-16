/**
 * Minimal dependency-free line chart, same rationale as BarChart.jsx.
 * Data shape: an array of { label, value } objects, plotted left to
 * right in the given order (typically chronological).
 */
export default function LineChart({ data, height = 140, color = "var(--color-accent-strong)" }) {
  if (!data || data.length === 0) {
    return <p className="text-sm text-[var(--color-text-faint)]">No data yet.</p>;
  }

  const max = Math.max(...data.map((d) => d.value), 1);
  const stepX = data.length > 1 ? 100 / (data.length - 1) : 0;
  const points = data.map((d, i) => {
    const x = data.length > 1 ? i * stepX : 50;
    const y = height - 20 - (d.value / max) * (height - 30);
    return { x, y, value: d.value, label: d.label };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - 20} L ${points[0].x} ${height - 20} Z`;

  return (
    <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
      <path d={areaPath} fill={color} opacity="0.12" stroke="none" />
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      {points.map((p) => (
        <circle key={p.label} cx={p.x} cy={p.y} r="1.4" fill={color} />
      ))}
    </svg>
  );
}
