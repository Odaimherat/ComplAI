import { caseStudies } from "../data/content";
import { Section } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";

export default function CaseStudies() {
  return (
    <div>
      <Section className="pb-10">
        <p className="eyebrow mb-4">Case Studies</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
          Real outcomes, with the numbers attached
        </h1>
      </Section>

      <Section className="pt-0 space-y-10">
        {caseStudies.map((c, i) => (
          <Reveal key={c.id} delay={i * 60}>
            <article className="card p-8 md:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
                <div>
                  <h2 className="font-display text-2xl font-semibold">{c.company}</h2>
                  <p className="text-sm text-[var(--color-text-muted)]">{c.industry} &middot; {c.employees}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {[
                  ["Challenge", c.challenge],
                  ["Approach", c.approach],
                  ["Result", c.result],
                ].map(([label, text]) => (
                  <div key={label}>
                    <p className="eyebrow mb-2">{label}</p>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-[var(--color-border)] pt-6 mb-6">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-display text-xl md:text-2xl font-semibold">{m.value}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">{m.label}</p>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-2 border-[var(--color-accent-strong)] pl-4 text-[var(--color-text)] italic">
                &ldquo;{c.quote}&rdquo;
                <footer className="text-sm text-[var(--color-text-muted)] not-italic mt-2">{c.quoteAttribution}</footer>
              </blockquote>
            </article>
          </Reveal>
        ))}
      </Section>
    </div>
  );
}
