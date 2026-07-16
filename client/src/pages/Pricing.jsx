import { Link } from "react-router-dom";
import { Check, X, Minus } from "lucide-react";
import { pricingTiers, frameworkAvailability, addOnAvailability } from "../data/content";
import { frameworks } from "../data/content";
import { Section, SectionHeading } from "../components/ui/Section";

function Cell({ value }) {
  if (value === true) return <Check size={16} className="text-[var(--color-pass)] mx-auto" />;
  if (value === false) return <X size={16} className="text-[var(--color-text-faint)] mx-auto" />;
  return <span className="text-xs text-[var(--color-text-muted)] block text-center">{value}</span>;
}

export default function Pricing() {
  return (
    <div>
      <Section className="pb-10 text-center">
        <p className="eyebrow mb-4">Pricing</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl mx-auto leading-tight">
          Straightforward tiers. No per-control pricing tricks.
        </h1>
        <p className="mt-5 text-lg text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
          Every tier includes the full GRC platform. Higher tiers add more frameworks, higher control ceilings,
          and access to the SOC, Defensive, and Offensive Security lines.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`card p-8 flex flex-col ${tier.highlighted ? "border-[var(--color-accent-strong)] relative" : ""}`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-wide bg-[var(--color-accent)] text-white rounded-full px-3 py-1">
                  Most popular
                </span>
              )}
              <h2 className="font-display text-xl font-semibold">{tier.name}</h2>
              <p className="text-xs text-[var(--color-text-muted)] mt-1 mb-4">{tier.audience}</p>
              <p className="mb-1">
                <span className="font-display text-3xl font-semibold">{tier.price}</span>
                {tier.price !== "Custom" && <span className="text-sm text-[var(--color-text-muted)]"> {tier.period}</span>}
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">{tier.description}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={15} className="text-[var(--color-pass)] mt-0.5 shrink-0" />
                    <span className="text-[var(--color-text-muted)]">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className={`btn ${tier.highlighted ? "btn-primary" : "btn-secondary"} w-full justify-center`}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <SectionHeading eyebrow="Compare" title="Frameworks and add-ons by plan" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-3 pr-4 font-mono text-xs uppercase tracking-wide text-[var(--color-text-faint)]">Framework</th>
                {pricingTiers.map((t) => (
                  <th key={t.id} className="py-3 px-4 font-display font-medium text-center">{t.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {frameworks.map((f) => (
                <tr key={f.id} className="border-b border-[var(--color-border)]">
                  <td className="py-3 pr-4 text-[var(--color-text-muted)]">{f.name}</td>
                  {pricingTiers.map((t) => (
                    <td key={t.id} className="py-3 px-4"><Cell value={frameworkAvailability[f.id]?.[t.id]} /></td>
                  ))}
                </tr>
              ))}
              {[
                ["SOC / MDR", "soc"],
                ["Defensive Security", "defensive"],
                ["Offensive Security", "offensive"],
              ].map(([label, key]) => (
                <tr key={key} className="border-b border-[var(--color-border)] bg-[var(--color-bg-raised)]">
                  <td className="py-3 pr-4 font-medium">{label}</td>
                  {pricingTiers.map((t) => (
                    <td key={t.id} className="py-3 px-4"><Cell value={addOnAvailability[t.id]?.[key]} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--color-text-faint)] mt-4 flex items-center gap-1.5">
          <Minus size={12} /> SOC, Defensive, and Offensive Security are sold as add-ons to any tier; availability above reflects what is bundled by default.
        </p>
      </Section>
    </div>
  );
}
