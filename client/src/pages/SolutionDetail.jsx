import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { solutions, getSolutionById } from "../data/content";
import { Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import { useLanguage } from "../context/LanguageContext";
import PlatformPreview from "../components/PlatformPreview";

export default function SolutionDetail() {
  const { id } = useParams();
  const solution = getSolutionById(id);
  const { t, language } = useLanguage();
  const isAr = language === "ar";

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
                {t("solutionsIndex.flagshipProduct")}
              </span>
            )}
            <p className="eyebrow">{isAr ? solution.shortNameAr : solution.shortName}</p>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
            {isAr ? solution.nameAr : solution.name}
          </h1>
          <p className="mt-4 text-lg text-[var(--color-accent-strong)] max-w-2xl">{isAr ? solution.taglineAr : solution.tagline}</p>
          <p className="mt-5 text-[var(--color-text-muted)] max-w-2xl leading-relaxed">{isAr ? solution.summaryAr : solution.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary">{t("common.bookDemo")}</Link>
            <Link to="/pricing" className="btn btn-secondary">{t("solutionDetail.seePricing")}</Link>
          </div>
        </div>
      </section>

      <Section className="border-b border-[var(--color-border)]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {solution.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-display text-3xl font-semibold" dir="ltr">{m.value}</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {solution.flagship && (
        <Section className="border-b border-[var(--color-border)]">
          <SectionHeading eyebrow="See it in action" title="What the platform actually looks like" />
          <PlatformPreview />
        </Section>
      )}

      <Section>
        <SectionHeading eyebrow={t("solutionDetail.capabilitiesEyebrow")} title={t("solutionDetail.capabilitiesTitle")} />
        {isAr && (
          <p className="text-xs text-[var(--color-text-faint)] -mt-8 mb-8 italic">
            تفاصيل الإمكانيات أدناه معروضة بالإنجليزية حالياً.
          </p>
        )}
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
        <SectionHeading eyebrow={t("solutionDetail.otherEyebrow")} title={t("solutionDetail.otherTitle")} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {others.map((s) => (
            <Link key={s.id} to={s.path} className="card p-6 hover:border-[var(--color-accent-strong)] transition-colors">
              <p className="eyebrow mb-2">{isAr ? s.shortNameAr : s.shortName}</p>
              <h3 className="font-display font-semibold mb-2">{isAr ? s.nameAr : s.name}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">{isAr ? s.taglineAr : s.tagline}</p>
              <span className="text-sm text-[var(--color-accent-strong)] flex items-center gap-1">
                {t("common.learnMore")} <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
