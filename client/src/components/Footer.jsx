import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { solutions } from "../data/content";
import { subscribeNewsletter } from "../lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      await subscribeNewsletter({ email, source: "footer" });
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="border-t border-[var(--color-border)] mt-24">
      <div className="container-page py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg mb-3">
            <ShieldCheck size={20} className="text-[var(--color-accent-strong)]" aria-hidden="true" />
            ComplAI
          </Link>
          <p className="text-sm text-[var(--color-text-muted)] max-w-xs">
            Continuous compliance, powered by AI, backed by real security work. GRC, SOC/MDR, Defensive, and
            Offensive Security in one platform.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 max-w-sm">
            <label htmlFor="footer-email" className="text-xs font-mono uppercase tracking-wide text-[var(--color-text-muted)]">
              Get the compliance-in-AI newsletter
            </label>
            <div className="flex gap-2 mt-2">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:border-[var(--color-accent-strong)] outline-none"
              />
              <button type="submit" className="btn btn-secondary" disabled={status === "loading"}>
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </div>
            {status === "done" && <p className="text-xs text-[var(--color-pass)] mt-2">Subscribed. Check your inbox.</p>}
            {status === "error" && <p className="text-xs text-[var(--color-fail)] mt-2">Could not subscribe. Try again.</p>}
          </form>
        </div>

        <div>
          <p className="eyebrow mb-3">Solutions</p>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            {solutions.map((s) => (
              <li key={s.id}>
                <Link to={s.path} className="hover:text-[var(--color-text)] transition-colors">
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Company</p>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            <li><Link to="/about" className="hover:text-[var(--color-text)] transition-colors">About</Link></li>
            <li><Link to="/case-studies" className="hover:text-[var(--color-text)] transition-colors">Case studies</Link></li>
            <li><Link to="/resources" className="hover:text-[var(--color-text)] transition-colors">Resources</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--color-text)] transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Legal</p>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            <li><Link to="/privacy" className="hover:text-[var(--color-text)] transition-colors">Privacy policy</Link></li>
            <li><Link to="/terms" className="hover:text-[var(--color-text)] transition-colors">Terms of service</Link></li>
            <li><Link to="/frameworks" className="hover:text-[var(--color-text)] transition-colors">Frameworks</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)]">
        <div className="container-page py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[var(--color-text-faint)]">
          <p>&copy; {new Date().getFullYear()} ComplAI, Inc. All rights reserved.</p>
          <p className="font-mono">SOC 2 · ISO 27001 · HIPAA · GDPR · PCI DSS · NIST CSF · CMMC</p>
        </div>
      </div>
    </footer>
  );
}
