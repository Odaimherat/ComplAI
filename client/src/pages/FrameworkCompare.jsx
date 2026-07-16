import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Plus } from "lucide-react";
import { frameworks } from "../data/content";
import { Section } from "../components/ui/Section";
import { useLanguage } from "../context/LanguageContext";

const MAX_COMPARE = 3;

/**
 * Lets a visitor pick up to three frameworks and see them side by side.
 * This is deliberately a separate tool from the Frameworks page's
 * single-framework detail view (client/src/pages/Frameworks.jsx) - that
 * page answers "tell me about SOC 2," this one answers "how much overlap
 * is there between SOC 2 and ISO 27001 for us," which is the actual
 * question a buyer evaluating multiple frameworks has.
 */
export default function FrameworkCompare() {
  const { t, language } = useLanguage();
  const isAr = language === "ar";
  const [selectedIds, setSelectedIds] = useState(["soc2", "iso27001"]);

  const selected = selectedIds.map((id) => frameworks.find((f) => f.id === id)).filter(Boolean);
  const available = frameworks.filter((f) => !selectedIds.includes(f.id));

  function add(id) {
    if (selectedIds.length >= MAX_COMPARE) return;
    setSelectedIds((prev) => [...prev, id]);
  }

  function remove(id) {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }

  return (
    <div>
      <Section className="pb-8">
        <p className="eyebrow mb-4">{t("frameworkCompare.eyebrow")}</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl leading-tight">
          {t("frameworkCompare.title")}
        </h1>
        <p className="mt-5 text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">{t("frameworkCompare.desc")}</p>
      </Section>

      <Section className="pt-0">
        <div className="flex flex-wrap gap-2 mb-8" dir="ltr">
          {available.map((f) => (
            <button
              key={f.id}
              onClick={() => add(f.id)}
              disabled={selectedIds.length >= MAX_COMPARE}
              className="text-xs rounded-full px-3 py-1.5 border border-[var(--color-border-strong)] text-[var(--color-text-muted)] hover:border-[var(--color-accent-strong)] hover:text-[var(--color-accent-strong)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              <Plus size={12} /> {f.name}
            </button>
          ))}
        </div>

        {selectedIds.length >= MAX_COMPARE && (
          <p className="text-xs text-[var(--color-text-faint)] mb-6">{t("frameworkCompare.maxReached")}</p>
        )}

        {selected.length === 0 ? (
          <p className="text-sm text-[var(--color-text-faint)]">{t("frameworkCompare.selectPrompt")}</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="grid gap-4 min-w-[600px]" style={{ gridTemplateColumns: `160px repeat(${selected.length}, 1fr)` }}>
              {/* Header row */}
              <div />
              {selected.map((f) => (
                <div key={f.id} className="card p-4 relative">
                  <button
                    onClick={() => remove(f.id)}
                    className="absolute top-2 end-2 text-[var(--color-text-faint)] hover:text-[var(--color-fail)]"
                    aria-label={t("frameworkCompare.remove")}
                  >
                    <X size={14} />
                  </button>
                  <p className="font-display font-semibold text-sm pe-5" dir="ltr">{f.name}</p>
                  <p className="text-xs text-[var(--color-text-faint)] mt-1" dir="ltr">{f.region}</p>
                </div>
              ))}

              {/* Category row */}
              <div className="flex items-center text-xs font-mono uppercase tracking-wide text-[var(--color-text-faint)]">
                {t("frameworkCompare.category")}
              </div>
              {selected.map((f) => (
                <div key={f.id} className="flex items-center text-sm text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-3">
                  {isAr ? f.categoryAr : f.category}
                </div>
              ))}

              {/* Controls row */}
              <div className="flex items-center text-xs font-mono uppercase tracking-wide text-[var(--color-text-faint)]">
                {t("frameworkCompare.controls")}
              </div>
              {selected.map((f) => (
                <div key={f.id} className="flex items-center border-t border-[var(--color-border)] pt-3" dir="ltr">
                  <span className="font-display text-xl font-semibold">{f.controlCount}</span>
                </div>
              ))}

              {/* Timeline row */}
              <div className="flex items-center text-xs font-mono uppercase tracking-wide text-[var(--color-text-faint)]">
                {t("frameworkCompare.timeline")}
              </div>
              {selected.map((f) => (
                <div key={f.id} className="flex items-center text-sm text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-3">
                  {f.typicalTimeline}
                </div>
              ))}

              {/* AI mapping row */}
              <div className="flex items-start text-xs font-mono uppercase tracking-wide text-[var(--color-text-faint)] pt-3">
                {t("frameworks.aiMappingEyebrow")}
              </div>
              {selected.map((f) => (
                <div key={f.id} className="text-sm text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-border)] pt-3">
                  {f.aiMapping}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link to="/frameworks" className="btn btn-secondary">{t("frameworks.eyebrow")}</Link>
        </div>
      </Section>
    </div>
  );
}
