import { useState } from "react";
import { CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import StatusPill from "./ui/StatusPill";

/**
 * A framed, interactive mockup of what the actual ComplAI product
 * dashboard would look like - not a real connected app, just a static
 * data set with real tab-switching interactivity, browser-chrome framing
 * borrowed visually from real SaaS marketing sites (Vanta/Drata both use
 * "product screenshot" hero sections). This exists specifically to make
 * the GRC platform feel like a real, operable product rather than a
 * description of one.
 */
const TABS = ["Controls", "Risk Register", "Evidence"];

const CONTROLS = [
  { id: "SOC2-CC6.1", name: "Logical access control policy", framework: "SOC 2", status: "pass" },
  { id: "ISO-A.8.24", name: "Use of cryptographic controls", framework: "ISO 27001", status: "pass" },
  { id: "PCI-3.2.1", name: "Cardholder data retention review", framework: "PCI DSS", status: "warn" },
  { id: "HIPAA-164.312", name: "Technical access safeguards", framework: "HIPAA", status: "pass" },
  { id: "NIST-PR.AC-1", name: "Identity & credential management", framework: "NIST CSF", status: "pass" },
];

const RISKS = [
  { name: "Unrotated service account credentials", likelihood: 2, impact: 4, linkedControl: "SOC2-CC6.1" },
  { name: "Cardholder data retained beyond policy window", likelihood: 3, impact: 4, linkedControl: "PCI-3.2.1" },
  { name: "Unencrypted backup snapshot in staging", likelihood: 1, impact: 5, linkedControl: "ISO-A.8.24" },
];

const EVIDENCE = [
  { name: "IAM-policy-export-2026-07.json", mappedTo: 3, confidence: 0.94 },
  { name: "access-review-Q2-2026.csv", mappedTo: 5, confidence: 0.97 },
  { name: "vendor-risk-assessment-atlas.pdf", mappedTo: 1, confidence: 0.81 },
];

export default function PlatformPreview() {
  const [tab, setTab] = useState("Controls");

  return (
    <div className="card overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-raised)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-fail)] opacity-60" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-warn)] opacity-60" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-pass)] opacity-60" />
        <span className="ms-3 text-xs font-mono text-[var(--color-text-faint)]">app.complai.example/dashboard</span>
      </div>

      <div className="flex gap-1 px-4 pt-3 border-b border-[var(--color-border)]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-[var(--color-accent-strong)] text-[var(--color-text)]"
                : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-5">
        {tab === "Controls" && (
          <div className="space-y-2">
            {CONTROLS.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0">
                <div className="flex items-center gap-3 min-w-0">
                  {c.status === "pass" ? (
                    <CheckCircle2 size={15} className="text-[var(--color-pass)] shrink-0" />
                  ) : (
                    <AlertTriangle size={15} className="text-[var(--color-warn)] shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm truncate">{c.name}</p>
                    <p className="text-xs font-mono text-[var(--color-text-faint)]">{c.id} &middot; {c.framework}</p>
                  </div>
                </div>
                <StatusPill status={c.status} />
              </div>
            ))}
          </div>
        )}

        {tab === "Risk Register" && (
          <div className="space-y-2">
            {RISKS.map((r) => (
              <div key={r.name} className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0">
                <div className="min-w-0">
                  <p className="text-sm truncate">{r.name}</p>
                  <p className="text-xs font-mono text-[var(--color-text-faint)]">linked control: {r.linkedControl}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-[var(--color-text-muted)]">
                  <span>L{r.likelihood}</span>
                  <span>I{r.impact}</span>
                  <StatusPill status={r.likelihood * r.impact >= 12 ? "fail" : r.likelihood * r.impact >= 6 ? "warn" : "pass"} label={`Score ${r.likelihood * r.impact}`} />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Evidence" && (
          <div className="space-y-2">
            {EVIDENCE.map((e) => (
              <div key={e.name} className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText size={15} className="text-[var(--color-accent-strong)] shrink-0" />
                  <p className="text-sm truncate font-mono">{e.name}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-[var(--color-text-muted)]">
                  <span>{e.mappedTo} controls mapped</span>
                  <span className="text-[var(--color-pass)]">{Math.round(e.confidence * 100)}% confidence</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
