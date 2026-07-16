const STYLES = {
  pass: { bg: "var(--color-pass-soft)", color: "var(--color-pass)", label: "Passing" },
  warn: { bg: "var(--color-warn-soft)", color: "var(--color-warn)", label: "In review" },
  fail: { bg: "var(--color-fail-soft)", color: "var(--color-fail)", label: "Failing" },
};

export default function StatusPill({ status = "pass", label }) {
  const s = STYLES[status] || STYLES.pass;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-mono font-medium"
      style={{ background: s.bg, color: s.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
      {label || s.label}
    </span>
  );
}
