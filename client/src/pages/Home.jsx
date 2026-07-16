import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { solutions, trustStats, testimonials } from "../data/content";
import { Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import ComplianceLiveDemo from "../components/ComplianceLiveDemo";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 0%, var(--color-accent-soft), transparent 60%), radial-gradient(40% 40% at 10% 20%, rgba(46,211,163,0.08), transparent 60%)",
          }}
        />
        <div className="container-page relative py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-4">AI-driven governance, risk & compliance</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.08]">
              Continuous compliance, <span className="text-gradient">powered by AI</span>.
            </h1>
            <p className="mt-6 text-lg text-[var(--color-text-muted)] max-w-xl leading-relaxed">
              ComplAI keeps you compliant every day, not just the week before an audit. Our GRC platform
              continuously maps evidence to controls across SOC 2, ISO 27001, HIPAA, GDPR, PCI DSS, and more,
              backed by AI-powered SOC, defensive, and offensive security work that keeps your posture true, not
              just paper-deep.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary text-base px-6 py-3">
                Book a demo <ArrowRight size={16} />
              </Link>
              <Link to="/solutions/grc" className="btn btn-secondary text-base px-6 py-3">
                Explore GRC platform
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-text-muted)]">
              {["500+ controls automated", "SOC 2 in weeks, not months", "8 frameworks supported"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[var(--color-pass)]" /> {t}
                </span>
              ))}
            </div>
          </div>
          <Reveal>
            <ComplianceLiveDemo />
          </Reveal>
        </div>
      </section>

      {/* Trust bar */}
      <Section className="py-14 border-b border-[var(--color-border)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustStats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-text)]">{s.value}</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Product pillars, GRC first */}
      <Section>
        <SectionHeading
          eyebrow="The platform"
          title="One flagship compliance platform. Three security lines that keep it honest."
          description="GRC & Compliance Automation is the product ComplAI is built around. SOC/MDR, Defensive Security, and Offensive Security exist to generate the real, tested evidence that makes your compliance posture more than paperwork."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <Link
                to={s.path}
                className={`card p-7 h-full flex flex-col hover:border-[var(--color-accent-strong)] transition-colors ${
                  s.flagship ? "md:col-span-2 border-[var(--color-accent-soft)]" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {s.flagship && (
                    <span className="text-[10px] font-mono uppercase tracking-wide text-[var(--color-accent-strong)] border border-[var(--color-accent-soft)] rounded px-1.5 py-0.5">
                      Flagship
                    </span>
                  )}
                  <span className="eyebrow">{s.shortName}</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{s.name}</h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">{s.tagline}</p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">{s.summary}</p>
                <span className="mt-4 text-sm font-medium text-[var(--color-accent-strong)] flex items-center gap-1">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-[var(--color-bg-raised)] border-y border-[var(--color-border)]">
        <SectionHeading eyebrow="Customers" title="Compliance teams that stopped dreading audits" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.company} delay={i * 80}>
              <blockquote className="card p-6 h-full flex flex-col">
                <p className="text-[var(--color-text)] leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-sm text-[var(--color-text-muted)]">
                  {t.name}, {t.company}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="card p-10 md:p-14 text-center bg-[var(--color-surface)] relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(50% 80% at 50% 0%, var(--color-accent-soft), transparent 70%)" }}
          />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">Ready to stop scrambling for audits?</h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto mb-8">
              Talk to our team about which framework to start with, or ask the ComplAI assistant right now.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn btn-primary text-base px-6 py-3">Book a demo</Link>
              <Link to="/assistant" className="btn btn-secondary text-base px-6 py-3">Ask ComplAI</Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
