import { useState } from "react";
import { Link } from "react-router-dom";
import { frameworks } from "../data/content";
import { Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";

export default function Frameworks() {
  const [openId, setOpenId] = useState(frameworks[0].id);

  return (
    <div>
      <Section className="pb-10">
        <p className="eyebrow mb-4">Frameworks We Support</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
          Eight frameworks. One control library. Zero duplicated evidence.
        </h1>
        <p className="mt-5 text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          Every framework below runs on the same evidence engine, so a single access review or vulnerability
          scan can satisfy overlapping controls across multiple frameworks at once instead of being collected
          again for each one.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {frameworks.map((f) => (
              <button
                key={f.id}
                onClick={() => setOpenId(f.id)}
                className={`text-left px-4 py-3 rounded-lg border shrink-0 lg:shrink transition-colors ${
                  openId === f.id
                    ? "border-[var(--color-accent-strong)] bg-[var(--color-accent-soft)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
                }`}
              >
                <p className="font-display font-semibold text-sm">{f.name}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5 hidden lg:block">{f.category}</p>
              </button>
            ))}
          </div>

          <div>
            {frameworks
              .filter((f) => f.id === openId)
              .map((f) => (
                <Reveal key={f.id}>
                  <div className="card p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                      <h2 className="font-display text-2xl font-semibold">{f.fullName}</h2>
                      <span className="text-xs font-mono text-[var(--color-text-muted)]">{f.region}</span>
                    </div>
                    <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">{f.summary}</p>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-wide text-[var(--color-text-faint)]">Controls tracked</p>
                        <p className="font-display text-2xl font-semibold mt-1">{f.controlCount}</p>
                      </div>
                      <div>
                        <p className="text-xs font-mono uppercase tracking-wide text-[var(--color-text-faint)]">Typical timeline</p>
                        <p className="font-display text-xl font-semibold mt-1">{f.typicalTimeline}</p>
                      </div>
                    </div>

                    <div className="border-t border-[var(--color-border)] pt-6">
                      <p className="eyebrow mb-2">How ComplAI's AI maps it</p>
                      <p className="text-[var(--color-text-muted)] leading-relaxed">{f.aiMapping}</p>
                    </div>

                    <Link to="/solutions/grc" className="btn btn-secondary mt-6">
                      See the GRC platform
                    </Link>
                  </div>
                </Reveal>
              ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
