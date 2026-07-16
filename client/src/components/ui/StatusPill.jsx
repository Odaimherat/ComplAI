/**
 * A small labeled dot used to show a pass/in-review/fail state - the
 * same three-state vocabulary a real compliance dashboard uses for
 * control status. See index.css for the underlying --color-pass/
 * --color-warn/--color-fail tokens this maps to.
 */
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
