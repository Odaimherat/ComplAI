import { useEffect, useRef, useState } from "react";

/**
 * The homepage's signature element (see design-and-research-report.md,
 * section 5): a circular audit-readiness gauge animating up to its target
 * score the first time it scrolls into view, paired with a monospace log
 * panel that cycles through simulated control-verification lines, styled
 * like a real-time audit terminal. This is the one deliberately "showoff"
 * piece of motion on the site; everything else uses restrained fades.
 */
const LOG_LINES = [
  { status: "PASS", id: "SOC2-CC6.1", label: "Logical access control policy" },
  { status: "PASS", id: "ISO-A.8.24", label: "Use of cryptographic controls" },
  { status: "PASS", id: "SOC2-CC7.2", label: "Incident detection procedures" },
  { status: "WARN", id: "PCI-3.2.1", label: "Cardholder data retention review" },
  { status: "PASS", id: "HIPAA-164.312", label: "Technical access safeguards" },
  { status: "PASS", id: "ISO-A.5.24", label: "Incident management planning" },
  { status: "PASS", id: "GDPR-Art.30", label: "Record of processing activities" },
  { status: "PASS", id: "NIST-PR.AC-1", label: "Identity & credential management" },
  { status: "PASS", id: "SOC2-CC6.6", label: "Boundary protection controls" },
  { status: "WARN", id: "CMMC-AC.L2-3.1.3", label: "CUI flow control review" },
  { status: "PASS", id: "SOC2-A1.2", label: "Backup & recovery evidence" },
  { status: "PASS", id: "ISO-A.8.9", label: "Configuration management" },
];

const STATUS_COLOR = {
  PASS: "var(--color-pass)",
  WARN: "var(--color-warn)",
  FAIL: "var(--color-fail)",
};

export default function ComplianceLiveDemo() {
  const containerRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [visibleLines, setVisibleLines] = useState([]);
  const targetScore = 98;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return undefined;

    const scoreTimer = setInterval(() => {
      setScore((s) => (s >= targetScore ? targetScore : s + 2));
    }, 20);

    let i = 0;
    const logTimer = setInterval(() => {
      setVisibleLines((prev) => {
        const next = [...prev, { ...LOG_LINES[i % LOG_LINES.length], key: prev.length }];
        return next.slice(-6);
      });
      i += 1;
    }, 900);

    return () => {
      clearInterval(scoreTimer);
      clearInterval(logTimer);
    };
  }, [started]);

  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div ref={containerRef} className="card p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" role="img" aria-label={`Live audit readiness score: ${score} percent`}>
          <circle cx="100" cy="100" r={radius} fill="none" stroke="var(--color-border)" strokeWidth="12" />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="var(--color-accent-strong)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 100 100)"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
          <text x="100" y="94" textAnchor="middle" fontSize="34" fontFamily="var(--font-mono)" fill="var(--color-text)" fontWeight="600">
            {score}%
          </text>
          <text x="100" y="118" textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--color-text-muted)">
            AUDIT READY
          </text>
        </svg>
        <p className="mt-4 text-sm text-[var(--color-text-muted)] text-center max-w-[220px]">
          Live readiness score across SOC 2, ISO 27001, and HIPAA for a representative ComplAI customer.
        </p>
      </div>

      <div className="font-mono text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg p-4 h-[220px] overflow-hidden flex flex-col justify-end">
        {visibleLines.length === 0 && (
          <p className="text-[var(--color-text-faint)]">Waiting for control checks...</p>
        )}
        {visibleLines.map((line) => (
          <div key={line.key} className="flex items-baseline gap-2 py-0.5 opacity-0 animate-[fadeIn_0.4s_ease_forwards]">
            <span style={{ color: STATUS_COLOR[line.status] }} className="font-semibold shrink-0">
              [{line.status}]
            </span>
            <span className="text-[var(--color-text-muted)] shrink-0">{line.id}</span>
            <span className="text-[var(--color-text-faint)] truncate">{line.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
