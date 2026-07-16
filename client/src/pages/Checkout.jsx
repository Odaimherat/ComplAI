import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { CheckCircle2, ShieldCheck, ArrowLeft } from "lucide-react";
import { pricingTiers } from "../data/content";
import { checkout } from "../lib/api";
import { Section } from "../components/ui/Section";
import { useLanguage } from "../context/LanguageContext";

function formatCardNumber(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function Checkout() {
  const { planId } = useParams();
  const plan = pricingTiers.find((t) => t.id === planId);
  const { t, language } = useLanguage();
  const isAr = language === "ar";

  const [form, setForm] = useState({ name: "", email: "", cardNumber: "", expiry: "", cvc: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  if (!plan) return <Navigate to="/pricing" replace />;
  if (plan.price === "Custom") return <Navigate to="/contact" replace />;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await checkout({ planId: plan.id, ...form });
      setResult(res);
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  if (status === "done" && result) {
    return (
      <Section className="py-24 max-w-md mx-auto text-center">
        <CheckCircle2 size={44} className="text-[var(--color-pass)] mx-auto mb-5" />
        <h1 className="font-display text-2xl font-semibold mb-2">{t("checkout.successTitle")}</h1>
        <p className="text-[var(--color-text-muted)] mb-6">
          {isAr ? result.plan.nameAr || result.plan.name : result.plan.name} — {result.plan.priceLabel}
        </p>
        <div className="card p-5 text-start font-mono text-sm space-y-1.5 mb-8" dir="ltr">
          <p className="flex justify-between"><span className="text-[var(--color-text-faint)]">{t("checkout.invoice")}</span> {result.mockInvoiceId}</p>
          <p className="flex justify-between"><span className="text-[var(--color-text-faint)]">{t("checkout.card")}</span> {result.cardBrand} •••• {result.cardLast4}</p>
          <p className="flex justify-between"><span className="text-[var(--color-text-faint)]">{t("checkout.status")}</span> <span className="text-[var(--color-pass)]">{t("checkout.active")}</span></p>
        </div>
        <p className="text-xs text-[var(--color-text-faint)] mb-8">{t("checkout.testModeDisclaimer")}</p>
        <Link to="/" className="btn btn-primary">{t("checkout.backHome")}</Link>
      </Section>
    );
  }

  return (
    <Section className="py-16 max-w-lg mx-auto">
      <Link to="/pricing" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] flex items-center gap-1.5 mb-8">
        <ArrowLeft size={14} className={isAr ? "rotate-180" : ""} /> {t("checkout.backToPricing")}
      </Link>

      <div className="card p-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono uppercase tracking-wide bg-[var(--color-warn-soft)] text-[var(--color-warn)] rounded px-2 py-0.5">
            {t("checkout.testMode")}
          </span>
        </div>
        <h1 className="font-display text-2xl font-semibold mb-1">
          {t("checkout.subscribeTo")} {isAr ? plan.nameAr : plan.name}
        </h1>
        <p className="text-[var(--color-text-muted)] mb-6">
          {plan.price}{plan.period} — {isAr ? plan.descriptionAr : plan.description}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input required placeholder={t("checkout.fullName")} value={form.name} onChange={(e) => update("name", e.target.value)} className="input" />
            <input required type="email" placeholder={t("checkout.email")} value={form.email} onChange={(e) => update("email", e.target.value)} className="input" dir="ltr" />
          </div>

          <input
            required
            placeholder="4242 4242 4242 4242"
            value={form.cardNumber}
            onChange={(e) => update("cardNumber", formatCardNumber(e.target.value))}
            className="input font-mono"
            dir="ltr"
            inputMode="numeric"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              required
              placeholder="MM/YY"
              value={form.expiry}
              onChange={(e) => update("expiry", formatExpiry(e.target.value))}
              className="input font-mono"
              dir="ltr"
              inputMode="numeric"
            />
            <input
              required
              placeholder={t("checkout.cvc")}
              value={form.cvc}
              onChange={(e) => update("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
              className="input font-mono"
              dir="ltr"
              inputMode="numeric"
            />
          </div>

          {error && <p className="text-sm text-[var(--color-fail)]">{error}</p>}

          <button type="submit" className="btn btn-primary w-full justify-center" disabled={status === "loading"}>
            {status === "loading" ? t("checkout.processing") : `${t("checkout.subscribe")} — ${plan.price}${plan.period}`}
          </button>

          <p className="text-xs text-[var(--color-text-faint)] flex items-center gap-1.5 justify-center pt-1">
            <ShieldCheck size={13} /> {t("checkout.testModeHint")}
          </p>
        </form>
      </div>
    </Section>
  );
}
