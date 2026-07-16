import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { CheckCircle2, ShieldCheck, ArrowLeft } from "lucide-react";
import { pricingTiers } from "../data/content";
import { checkout } from "../lib/api";
import { Section } from "../components/ui/Section";

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
        <h1 className="font-display text-2xl font-semibold mb-2">You're subscribed</h1>
        <p className="text-[var(--color-text-muted)] mb-6">
          {result.plan.name} — {result.plan.priceLabel}
        </p>
        <div className="card p-5 text-start font-mono text-sm space-y-1.5 mb-8">
          <p className="flex justify-between"><span className="text-[var(--color-text-faint)]">Invoice</span> {result.mockInvoiceId}</p>
          <p className="flex justify-between"><span className="text-[var(--color-text-faint)]">Card</span> {result.cardBrand} •••• {result.cardLast4}</p>
          <p className="flex justify-between"><span className="text-[var(--color-text-faint)]">Status</span> <span className="text-[var(--color-pass)]">active</span></p>
        </div>
        <p className="text-xs text-[var(--color-text-faint)] mb-8">
          This is a test-mode checkout for a portfolio project. No card was charged and no real payment processor was contacted.
        </p>
        <Link to="/" className="btn btn-primary">Back to home</Link>
      </Section>
    );
  }

  return (
    <Section className="py-16 max-w-lg mx-auto">
      <Link to="/pricing" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] flex items-center gap-1.5 mb-8">
        <ArrowLeft size={14} /> Back to pricing
      </Link>

      <div className="card p-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono uppercase tracking-wide bg-[var(--color-warn-soft)] text-[var(--color-warn)] rounded px-2 py-0.5">
            Test mode
          </span>
        </div>
        <h1 className="font-display text-2xl font-semibold mb-1">Subscribe to {plan.name}</h1>
        <p className="text-[var(--color-text-muted)] mb-6">
          {plan.price}{plan.period} — {plan.description}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input required placeholder="Full name" value={form.name} onChange={(e) => update("name", e.target.value)} className="input" />
            <input required type="email" placeholder="Email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input" dir="ltr" />
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
              placeholder="CVC"
              value={form.cvc}
              onChange={(e) => update("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
              className="input font-mono"
              dir="ltr"
              inputMode="numeric"
            />
          </div>

          {error && <p className="text-sm text-[var(--color-fail)]">{error}</p>}

          <button type="submit" className="btn btn-primary w-full justify-center" disabled={status === "loading"}>
            {status === "loading" ? "Processing..." : `Subscribe — ${plan.price}${plan.period}`}
          </button>

          <p className="text-xs text-[var(--color-text-faint)] flex items-center gap-1.5 justify-center pt-1">
            <ShieldCheck size={13} /> Test mode — try 4242 4242 4242 4242, any future expiry, any 3-digit CVC.
          </p>
        </form>
      </div>
    </Section>
  );
}
