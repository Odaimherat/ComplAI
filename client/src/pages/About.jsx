import { mission, story, values, timeline, leadership } from "../data/content";
import { Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";

export default function About() {
  return (
    <div>
      <Section className="pb-10">
        <p className="eyebrow mb-4">About ComplAI</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
          {mission}
        </h1>
      </Section>

      <Section className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <SectionHeading eyebrow="Our story" title="Why we built this" />
          <div className="md:col-span-2 space-y-4">
            {story.map((p, i) => (
              <p key={i} className="text-[var(--color-text-muted)] leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-y border-[var(--color-border)] bg-[var(--color-bg-raised)]">
        <SectionHeading eyebrow="Values" title="What we optimize for" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 60}>
              <div className="card p-6 h-full">
                <h3 className="font-display font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{v.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Milestones" title="Timeline" />
        <ol className="relative border-l border-[var(--color-border)] pl-8 space-y-8">
          {timeline.map((t) => (
            <li key={`${t.year}-${t.label}`} className="relative">
              <span className="absolute -left-[38px] top-1 w-3 h-3 rounded-full bg-[var(--color-accent-strong)]" />
              <p className="font-mono text-xs text-[var(--color-accent-strong)]">{t.year}</p>
              <p className="font-display font-semibold mt-1">{t.label}</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{t.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <SectionHeading eyebrow="Leadership" title="Who's building it" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((l) => (
            <div key={l.name} className="card p-6">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent-soft)] flex items-center justify-center font-display font-semibold text-[var(--color-accent-strong)] mb-4">
                {l.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="font-display font-semibold">{l.name}</h3>
              <p className="text-xs font-mono text-[var(--color-accent-strong)] mb-3">{l.role}</p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{l.bio}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
