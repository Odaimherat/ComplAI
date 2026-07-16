/**
 * A "trusted by" logo strip using simple self-drawn wordmark logos for
 * the fictional companies in shared/caseStudies.js, rather than photos
 * or real brand logos (which would be actual trademarked IP - see the
 * refusal_handling guidance against reproducing real company/brand
 * assets). Each mark is just a small monogram + wordmark pair styled
 * consistently, muted so the strip reads as social proof rather than a
 * second hero section.
 */
const LOGOS = [
  { name: "Northbeam Health", mark: "NB" },
  { name: "Ledgerline", mark: "LL" },
  { name: "Atlas Analytics", mark: "AA" },
  { name: "Fenwick Digital", mark: "FD" },
  { name: "Havenwell Care", mark: "HC" },
];

export default function CustomerLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-70">
      {LOGOS.map((l) => (
        <div key={l.name} className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all">
          <span className="w-7 h-7 rounded-md bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[10px] font-mono font-semibold text-[var(--color-text-muted)]">
            {l.mark}
          </span>
          <span className="font-display text-sm font-medium text-[var(--color-text-muted)] whitespace-nowrap">
            {l.name}
          </span>
        </div>
      ))}
    </div>
  );
}
