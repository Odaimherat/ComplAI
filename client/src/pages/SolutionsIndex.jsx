import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { solutions } from "../data/content";
import { Section } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import { useLanguage } from "../context/LanguageContext";

export default function SolutionsIndex() {
  const { t, language } = useLanguage();
  const isAr = language === "ar";

  return (
    <div>
      <Section className="pb-10">
        <p className="eyebrow mb-4">{t("solutionsIndex.eyebrow")}</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
          {t("solutionsIndex.title")}
        </h1>
        <p className="mt-5 text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">{t("solutionsIndex.desc")}</p>
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
                        {t("solutionsIndex.flagshipProduct")}
                      </span>
                    )}
                    <span className="text-xs font-mono text-[var(--color-text-faint)]">0{i + 1}</span>
                  </div>
                  <h2 className="font-display text-2xl font-semibold">{isAr ? s.nameAr : s.name}</h2>
                  <p className="text-[var(--color-accent-strong)] text-sm mt-1">{isAr ? s.taglineAr : s.tagline}</p>
                  <Link to={s.path} className="btn btn-secondary mt-5">
                    {t("solutionsIndex.seeSolution")} {isAr ? s.shortNameAr : s.shortName} <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
                  </Link>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-[var(--color-text-muted)] leading-relaxed mb-5">{isAr ? s.summaryAr : s.summary}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {s.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="font-display font-semibold text-lg" dir="ltr">{m.value}</p>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  {isAr && (
                    <p className="text-xs text-[var(--color-text-faint)] mt-4 italic">
                      مقاييس الأداء وأسماء الميزات معروضة بالإنجليزية حالياً.
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
