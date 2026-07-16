import { Link } from "react-router-dom";
import { Section } from "../components/ui/Section";
import { useLanguage } from "../context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <Section className="text-center py-32">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-4xl font-semibold mb-4">{t("notFound.title")}</h1>
      <p className="text-[var(--color-text-muted)] max-w-md mx-auto mb-8">{t("notFound.desc")}</p>
      <div className="flex justify-center gap-3">
        <Link to="/" className="btn btn-primary">{t("notFound.backHome")}</Link>
        <Link to="/assistant" className="btn btn-secondary">{t("common.askComplai")}</Link>
      </div>
    </Section>
  );
}
