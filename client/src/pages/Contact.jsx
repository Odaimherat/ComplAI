import { useState } from "react";
import { CheckCircle2, MapPin, Mail, Calendar } from "lucide-react";
import { frameworks } from "../data/content";
import { submitContact } from "../lib/api";
import { Section } from "../components/ui/Section";

const EMPTY = { name: "", email: "", company: "", companySize: "", message: "", requestedDemo: false };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleFramework(id) {
    setSelectedFrameworks((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await submitContact({ ...form, frameworksOfInterest: selectedFrameworks });
      setResult(res);
      setStatus("done");
      setForm(EMPTY);
      setSelectedFrameworks([]);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <div>
      <Section className="pb-10">
        <p className="eyebrow mb-4">Contact</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl leading-tight">
          Tell us what you're trying to get compliant with
        </h1>
        <p className="mt-5 text-lg text-[var(--color-text-muted)] max-w-xl leading-relaxed">
          Book a demo or send a message. We typically respond within one business day.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          <div className="card p-8">
            {status === "done" && result ? (
              <div className="text-center py-10">
                <CheckCircle2 size={40} className="text-[var(--color-pass)] mx-auto mb-4" />
                <h2 className="font-display text-2xl font-semibold mb-2">Message sent</h2>
                <p className="text-[var(--color-text-muted)] mb-1">
                  A confirmation has been sent to your inbox.
                </p>
                {result.demoSlot && (
                  <p className="text-sm text-[var(--color-accent-strong)] mt-4 font-mono">
                    Proposed demo slot: {result.demoSlot}
                  </p>
                )}
                <button onClick={() => setStatus("idle")} className="btn btn-secondary mt-6">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full name" required>
                    <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="input" />
                  </Field>
                  <Field label="Work email" required>
                    <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input" />
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Company">
                    <input value={form.company} onChange={(e) => update("company", e.target.value)} className="input" />
                  </Field>
                  <Field label="Company size">
                    <select value={form.companySize} onChange={(e) => update("companySize", e.target.value)} className="input">
                      <option value="">Select...</option>
                      <option>1-25</option>
                      <option>26-100</option>
                      <option>101-500</option>
                      <option>500+</option>
                    </select>
                  </Field>
                </div>

                <Field label="Frameworks you're interested in">
                  <div className="flex flex-wrap gap-2">
                    {frameworks.map((f) => (
                      <button
                        type="button"
                        key={f.id}
                        onClick={() => toggleFramework(f.id)}
                        className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${
                          selectedFrameworks.includes(f.id)
                            ? "border-[var(--color-accent-strong)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]"
                            : "border-[var(--color-border-strong)] text-[var(--color-text-muted)]"
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Message" required>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="input resize-none"
                    placeholder="What are you trying to get done?"
                  />
                </Field>

                <label className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                  <input
                    type="checkbox"
                    checked={form.requestedDemo}
                    onChange={(e) => update("requestedDemo", e.target.checked)}
                    className="accent-[var(--color-accent)]"
                  />
                  I'd like to book a live demo
                </label>

                {error && <p className="text-sm text-[var(--color-fail)]">{error}</p>}

                <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <MapPin size={18} className="text-[var(--color-accent-strong)] mb-3" />
              <p className="font-display font-semibold mb-1">Office</p>
              <p className="text-sm text-[var(--color-text-muted)]">548 Market Street, Suite 88000<br />San Francisco, CA 94104</p>
            </div>
            <div className="card p-6">
              <Mail size={18} className="text-[var(--color-accent-strong)] mb-3" />
              <p className="font-display font-semibold mb-1">Email</p>
              <p className="text-sm text-[var(--color-text-muted)]">hello@complai.example</p>
            </div>
            <div className="card p-6">
              <Calendar size={18} className="text-[var(--color-accent-strong)] mb-3" />
              <p className="font-display font-semibold mb-1">Prefer to schedule directly?</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Check "I'd like to book a live demo" in the form and we'll propose a time slot instantly.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <style>{`
        .input {
          width: 100%;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          padding: 0.6rem 0.8rem;
          font-size: 0.9rem;
          color: var(--color-text);
          outline: none;
        }
        .input:focus { border-color: var(--color-accent-strong); }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="text-xs font-mono uppercase tracking-wide text-[var(--color-text-muted)] mb-1.5 block">
        {label} {required && <span className="text-[var(--color-accent-strong)]">*</span>}
      </span>
      {children}
    </label>
  );
}
