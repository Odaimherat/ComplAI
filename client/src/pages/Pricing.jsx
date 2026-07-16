import { Link } from "react-router-dom";
import { Check, X, Minus } from "lucide-react";
import { pricingTiers, frameworkAvailability, addOnAvailability, frameworks } from "../data/content";
import { Section, SectionHeading } from "../components/ui/Section";
import { useLanguage } from "../context/LanguageContext";

function Cell({ value }) {
  if (value === true) return <Check size={16} className="text-[var(--color-pass)] mx-auto" />;
  if (value === false) return <X size={16} className="text-[var(--color-text-faint)] mx-auto" />;
  return <span className="text-xs text-[var(--color-text-muted)] block text-center">{value}</span>;
}

export default function Pricing() {
  const { t, language } = useLanguage();
  const isAr = language === "ar";

  return (
    <div>
      <Section className="pb-10 text-center">
        <p className="eyebrow mb-4">{t("pricing.eyebrow")}</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl mx-auto leading-tight">
          {t("pricing.title")}
        </h1>
        <p className="mt-5 text-lg text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">{t("pricing.desc")}</p>
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`card p-8 flex flex-col ${tier.highlighted ? "border-[var(--color-accent-strong)] relative" : ""}`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 text-[10px] font-mono uppercase tracking-wide bg-[var(--color-accent)] text-white rounded-full px-3 py-1">
                  {t("pricing.mostPopular")}
                </span>
              )}
              <h2 className="font-display text-xl font-semibold">{isAr ? tier.nameAr : tier.name}</h2>
              <p className="text-xs text-[var(--color-text-muted)] mt-1 mb-4">{isAr ? tier.audienceAr : tier.audience}</p>
              <p className="mb-1" dir="ltr">
                <span className="font-display text-3xl font-semibold">{tier.price}</span>
                {tier.price !== "Custom" && <span className="text-sm text-[var(--color-text-muted)]"> {tier.period}</span>}
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">{isAr ? tier.descriptionAr : tier.description}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={15} className="text-[var(--color-pass)] mt-0.5 shrink-0" />
                    <span className="text-[var(--color-text-muted)]">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={tier.price === "Custom" || tier.highlighted ? "/contact" : `/checkout/${tier.id}`}
                className={`btn ${tier.highlighted ? "btn-primary" : "btn-secondary"} w-full justify-center`}
              >
                {tier.cta === "Talk to sales" ? t("common.talkToSales") : tier.cta === "Contact sales" ? t("common.contactSales") : t("common.startTrial")}
              </Link>
            </div>
          ))}
        </div>
        {isAr && (
          <p className="text-xs text-[var(--color-text-faint)] mt-6 text-center italic">
            تفاصيل الميزات ضمن كل باقة معروضة بالإنجليزية حالياً.
          </p>
        )}
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <SectionHeading eyebrow={t("pricing.compareEyebrow")} title={t("pricing.compareTitle")} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-start py-3 pe-4 font-mono text-xs uppercase tracking-wide text-[var(--color-text-faint)]">{t("pricing.framework")}</th>
                {pricingTiers.map((tr) => (
                  <th key={tr.id} className="py-3 px-4 font-display font-medium text-center">{isAr ? tr.nameAr : tr.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {frameworks.map((f) => (
                <tr key={f.id} className="border-b border-[var(--color-border)]">
                  <td className="py-3 pe-4 text-[var(--color-text-muted)]" dir="ltr">{f.name}</td>
                  {pricingTiers.map((tr) => (
                    <td key={tr.id} className="py-3 px-4"><Cell value={frameworkAvailability[f.id]?.[tr.id]} /></td>
                  ))}
                </tr>
              ))}
              {[
                ["SOC / MDR", "soc"],
                ["Defensive Security", "defensive"],
                ["Offensive Security", "offensive"],
              ].map(([label, key]) => (
                <tr key={key} className="border-b border-[var(--color-border)] bg-[var(--color-bg-raised)]">
                  <td className="py-3 pe-4 font-medium" dir="ltr">{label}</td>
                  {pricingTiers.map((tr) => (
                    <td key={tr.id} className="py-3 px-4"><Cell value={addOnAvailability[tr.id]?.[key]} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--color-text-faint)] mt-4 flex items-center gap-1.5">
          <Minus size={12} /> {t("pricing.addOnNote")}
        </p>
      </Section>
    </div>
  );
}
