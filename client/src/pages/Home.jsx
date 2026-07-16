import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { solutions, trustStats, testimonials } from "../data/content";
import { Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import ComplianceLiveDemo from "../components/ComplianceLiveDemo";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();
  const isAr = language === "ar";

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
            <p className="eyebrow mb-4">{t("home.eyebrow")}</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.15]">
              {t("home.titleLine1")} <span className="text-gradient">{t("home.titleGradient")}</span>
            </h1>
            <p className="mt-6 text-lg text-[var(--color-text-muted)] max-w-xl leading-relaxed">{t("home.subtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary text-base px-6 py-3">
                {t("common.bookDemo")} <ArrowRight size={16} className={isAr ? "rotate-180" : ""} />
              </Link>
              <Link to="/solutions/grc" className="btn btn-secondary text-base px-6 py-3">
                {t("home.exploreGrc")}
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-text-muted)]">
              {[t("home.chip1"), t("home.chip2"), t("home.chip3")].map((chip) => (
                <span key={chip} className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[var(--color-pass)]" /> {chip}
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
            <div key={s.label} className="text-center md:text-start">
              <p className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-text)]" dir="ltr">{s.value}</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Product pillars, GRC first */}
      <Section>
        <SectionHeading eyebrow={t("home.pillarsEyebrow")} title={t("home.pillarsTitle")} description={t("home.pillarsDesc")} />
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
                      {t("nav.flagship")}
                    </span>
                  )}
                  <span className="eyebrow">{isAr ? s.shortNameAr : s.shortName}</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{isAr ? s.nameAr : s.name}</h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">{isAr ? s.taglineAr : s.tagline}</p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex-1">{isAr ? s.summaryAr : s.summary}</p>
                <span className="mt-4 text-sm font-medium text-[var(--color-accent-strong)] flex items-center gap-1">
                  {t("common.learnMore")} <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-[var(--color-bg-raised)] border-y border-[var(--color-border)]">
        <SectionHeading eyebrow={t("home.customersEyebrow")} title={t("home.customersTitle")} align="center" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.company} delay={i * 80}>
              <blockquote className="card p-6 h-full flex flex-col">
                <p className="text-[var(--color-text)] leading-relaxed flex-1">&ldquo;{testimonial.quote}&rdquo;</p>
                <footer className="mt-4 text-sm text-[var(--color-text-muted)]">
                  {testimonial.name}, {testimonial.company}
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
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">{t("home.ctaTitle")}</h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto mb-8">{t("home.ctaDesc")}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn btn-primary text-base px-6 py-3">{t("common.bookDemo")}</Link>
              <Link to="/assistant" className="btn btn-secondary text-base px-6 py-3">{t("common.askComplai")}</Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
