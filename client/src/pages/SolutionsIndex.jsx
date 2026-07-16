import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { solutions } from "../data/content";
import { Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";

export default function SolutionsIndex() {
  return (
    <div>
      <Section className="pb-10">
        <p className="eyebrow mb-4">Solutions</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
          One compliance story. Four connected product lines.
        </h1>
        <p className="mt-5 text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          GRC & Compliance Automation is the platform everything else feeds. SOC/MDR, Defensive Security, and
          Offensive Security exist to generate the tested, real-world evidence that keeps your compliance
          posture true, not just paper-deep.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="space-y-6">
          {solutions.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <div className={`card p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 ${s.flagship ? "border-[var(--color-accent-soft)]" : ""}`}>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    {s.flagship && (
                      <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--color-accent-strong)] border border-[var(--color-accent-soft)] rounded px-1.5 py-0.5">
                        Flagship product
                      </span>
                    )}
                    <span className="text-xs font-mono text-[var(--color-text-faint)]">0{i + 1}</span>
                  </div>
                  <h2 className="font-display text-2xl font-semibold">{s.name}</h2>
                  <p className="text-[var(--color-accent-strong)] text-sm mt-1">{s.tagline}</p>
                  <Link to={s.path} className="btn btn-secondary mt-5">
                    View {s.shortName} <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-[var(--color-text-muted)] leading-relaxed mb-5">{s.summary}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {s.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="font-display font-semibold text-lg">{m.value}</p>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
