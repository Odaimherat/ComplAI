import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { solutions, getSolutionById } from "../data/content";
import { Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";

export default function SolutionDetail() {
  const { id } = useParams();
  const solution = getSolutionById(id);

  if (!solution) return <Navigate to="/solutions" replace />;

  const others = solutions.filter((s) => s.id !== id);

  return (
    <div>
      <section className="border-b border-[var(--color-border)] relative overflow-hidden">
        {solution.flagship && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(60% 60% at 90% 0%, var(--color-accent-soft), transparent 60%)" }}
          />
        )}
        <div className="container-page relative py-20">
          <div className="flex items-center gap-2 mb-4">
            {solution.flagship && (
              <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--color-accent-strong)] border border-[var(--color-accent-soft)] rounded px-1.5 py-0.5">
                Flagship product
              </span>
            )}
            <p className="eyebrow">{solution.shortName}</p>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
            {solution.name}
          </h1>
          <p className="mt-4 text-lg text-[var(--color-accent-strong)] max-w-2xl">{solution.tagline}</p>
          <p className="mt-5 text-[var(--color-text-muted)] max-w-2xl leading-relaxed">{solution.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary">Book a demo</Link>
            <Link to="/pricing" className="btn btn-secondary">See pricing</Link>
          </div>
        </div>
      </section>

      <Section className="border-b border-[var(--color-border)]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {solution.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-display text-3xl font-semibold">{m.value}</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Capabilities" title="What's actually in the box" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solution.capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <div className="card p-6 h-full">
                <CheckCircle2 size={18} className="text-[var(--color-pass)] mb-3" />
                <h3 className="font-display font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{c.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)] bg-[var(--color-bg-raised)]">
        <SectionHeading eyebrow="Explore the rest of the platform" title="Other product lines" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {others.map((s) => (
            <Link key={s.id} to={s.path} className="card p-6 hover:border-[var(--color-accent-strong)] transition-colors">
              <p className="eyebrow mb-2">{s.shortName}</p>
              <h3 className="font-display font-semibold mb-2">{s.name}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">{s.tagline}</p>
              <span className="text-sm text-[var(--color-accent-strong)] flex items-center gap-1">
                Learn more <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
