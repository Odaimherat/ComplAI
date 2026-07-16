import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import { verifyNewsletter } from "../lib/api";
import { Section } from "../components/ui/Section";
import { useLanguage } from "../context/LanguageContext";

/**
 * Landing page for the newsletter double opt-in link (see
 * server/src/routes/newsletter.js's `verifyUrl`). In a real deployment
 * this link would arrive by email; here it's surfaced directly in the
 * footer's signup form (see Footer.jsx) since no real email provider is
 * connected - see the mocking note in the server route for details.
 */
export default function NewsletterVerify() {
  const { token } = useParams();
  const { t } = useLanguage();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState("");

  useEffect(() => {
    verifyNewsletter(token)
      .then(() => setStatus("success"))
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, [token]);

  return (
    <Section className="py-32 max-w-sm mx-auto text-center">
      {status === "loading" && (
        <div className="w-8 h-8 mx-auto rounded-full border-2 border-[var(--color-border-strong)] border-t-[var(--color-accent)] animate-spin" />
      )}

      {status === "success" && (
        <>
          <CheckCircle2 size={44} className="text-[var(--color-pass)] mx-auto mb-5" />
          <h1 className="font-display text-2xl font-semibold mb-2">{t("newsletter.verifiedTitle")}</h1>
          <p className="text-[var(--color-text-muted)] mb-8">{t("newsletter.verifiedDesc")}</p>
          <Link to="/" className="btn btn-primary">{t("checkout.backHome")}</Link>
        </>
      )}

      {status === "error" && (
        <>
          <XCircle size={44} className="text-[var(--color-fail)] mx-auto mb-5" />
          <h1 className="font-display text-2xl font-semibold mb-2">{t("newsletter.invalidTitle")}</h1>
          <p className="text-[var(--color-text-muted)] mb-2">{t("newsletter.invalidDesc")}</p>
          {error && <p className="text-xs text-[var(--color-text-faint)] mb-6">{error}</p>}
          <Link to="/" className="btn btn-secondary">{t("checkout.backHome")}</Link>
        </>
      )}
    </Section>
  );
}
