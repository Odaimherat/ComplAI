import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { articles } from "../data/content";
import { Section } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";

export default function Resources() {
  return (
    <div>
      <Section className="pb-10">
        <p className="eyebrow mb-4">Resources</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl leading-tight">
          Writing on compliance, AI, and security, from people who do the work
        </h1>
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={i * 50}>
              <Link to={`/resources/${a.slug}`} className="card p-7 h-full flex flex-col hover:border-[var(--color-accent-strong)] transition-colors">
                <div className="flex items-center gap-3 mb-3 text-xs font-mono text-[var(--color-text-faint)]">
                  <span>{a.category}</span>
                  <span>&middot;</span>
                  <span>{a.readTime}</span>
                </div>
                <h2 className="font-display text-xl font-semibold mb-3">{a.title}</h2>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">{a.excerpt}</p>
                <span className="mt-4 text-sm font-medium text-[var(--color-accent-strong)] flex items-center gap-1">
                  Read article <ArrowRight size={14} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
