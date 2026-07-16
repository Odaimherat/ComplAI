import { useState } from "react";
import { Link } from "react-router-dom";
import { frameworks } from "../data/content";
import { Section } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import { useLanguage } from "../context/LanguageContext";

export default function Frameworks() {
  const [openId, setOpenId] = useState(frameworks[0].id);
  const { t, language } = useLanguage();
  const isAr = language === "ar";

  return (
    <div>
      <Section className="pb-10">
        <p className="eyebrow mb-4">{t("frameworks.eyebrow")}</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
          {t("frameworks.title")}
        </h1>
        <p className="mt-5 text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">{t("frameworks.desc")}</p>
        <Link to="/frameworks/compare" className="btn btn-secondary mt-6">
          {t("frameworkCompare.eyebrow")}: {t("frameworkCompare.title")}
        </Link>
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {frameworks.map((f) => (
              <button
                key={f.id}
                onClick={() => setOpenId(f.id)}
                className={`text-left rtl:text-right px-4 py-3 rounded-lg border shrink-0 lg:shrink transition-colors ${
                  openId === f.id
                    ? "border-[var(--color-accent-strong)] bg-[var(--color-accent-soft)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
                }`}
              >
                <p className="font-display font-semibold text-sm" dir="ltr">{f.name}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5 hidden lg:block">{isAr ? f.categoryAr : f.category}</p>
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
                      <h2 className="font-display text-2xl font-semibold" dir="ltr">{f.fullName}</h2>
                      <span className="text-xs font-mono text-[var(--color-text-muted)]">{f.region}</span>
                    </div>
                    <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">{isAr ? f.summaryAr : f.summary}</p>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-wide text-[var(--color-text-faint)]">{t("frameworks.controlsTracked")}</p>
                        <p className="font-display text-2xl font-semibold mt-1" dir="ltr">{f.controlCount}</p>
                      </div>
                      <div>
                        <p className="text-xs font-mono uppercase tracking-wide text-[var(--color-text-faint)]">{t("frameworks.typicalTimeline")}</p>
                        <p className="font-display text-xl font-semibold mt-1">{f.typicalTimeline}</p>
                      </div>
                    </div>

                    <div className="border-t border-[var(--color-border)] pt-6">
                      <p className="eyebrow mb-2">{t("frameworks.aiMappingEyebrow")}</p>
                      <p className="text-[var(--color-text-muted)] leading-relaxed">{f.aiMapping}</p>
                      {isAr && (
                        <p className="text-xs text-[var(--color-text-faint)] mt-3 italic">
                          هذا القسم معروض بالإنجليزية حالياً.
                        </p>
                      )}
                    </div>

                    <Link to="/solutions/grc" className="btn btn-secondary mt-6">
                      {t("frameworks.seeGrc")}
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
