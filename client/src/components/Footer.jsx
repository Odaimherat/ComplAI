import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { solutions } from "../data/content";
import { subscribeNewsletter } from "../lib/api";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const { language, t } = useLanguage();

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
          <p className="text-sm text-[var(--color-text-muted)] max-w-xs">{t("footer.tagline")}</p>

          <form onSubmit={handleSubmit} className="mt-6 max-w-sm">
            <label htmlFor="footer-email" className="text-xs font-mono uppercase tracking-wide text-[var(--color-text-muted)]">
              {t("footer.newsletterLabel")}
            </label>
            <div className="flex gap-2 mt-2">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.newsletterPlaceholder")}
                className="input flex-1"
                dir="ltr"
              />
              <button type="submit" className="btn btn-secondary" disabled={status === "loading"}>
                {status === "loading" ? "..." : t("common.subscribe")}
              </button>
            </div>
            {status === "done" && <p className="text-xs text-[var(--color-pass)] mt-2">{t("footer.subscribed")}</p>}
            {status === "error" && <p className="text-xs text-[var(--color-fail)] mt-2">{t("footer.subscribeError")}</p>}
          </form>
        </div>

        <div>
          <p className="eyebrow mb-3">{t("footer.solutions")}</p>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            {solutions.map((s) => (
              <li key={s.id}>
                <Link to={s.path} className="hover:text-[var(--color-text)] transition-colors">
                  {language === "ar" ? s.shortNameAr : s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">{t("footer.company")}</p>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            <li><Link to="/about" className="hover:text-[var(--color-text)] transition-colors">{t("nav.about")}</Link></li>
            <li><Link to="/case-studies" className="hover:text-[var(--color-text)] transition-colors">{t("footer.caseStudies")}</Link></li>
            <li><Link to="/resources" className="hover:text-[var(--color-text)] transition-colors">{t("nav.resources")}</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--color-text)] transition-colors">{t("footer.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">{t("footer.legal")}</p>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            <li><Link to="/privacy" className="hover:text-[var(--color-text)] transition-colors">{t("footer.privacy")}</Link></li>
            <li><Link to="/terms" className="hover:text-[var(--color-text)] transition-colors">{t("footer.terms")}</Link></li>
            <li><Link to="/frameworks" className="hover:text-[var(--color-text)] transition-colors">{t("nav.frameworks")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)]">
        <div className="container-page py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[var(--color-text-faint)]">
          <p>&copy; {new Date().getFullYear()} ComplAI, Inc. {t("footer.rights")}</p>
          <p className="font-mono" dir="ltr">SOC 2 &middot; ISO 27001 &middot; HIPAA &middot; GDPR &middot; PCI DSS &middot; NIST CSF &middot; CMMC</p>
        </div>
      </div>
    </footer>
  );
}
