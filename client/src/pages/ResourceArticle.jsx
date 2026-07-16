import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { articles, getArticleBySlug } from "../data/content";
import { Section } from "../components/ui/Section";
import { useLanguage } from "../context/LanguageContext";

export default function ResourceArticle() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const { t } = useLanguage();

  if (!article) return <Navigate to="/resources" replace />;

  const others = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div>
      <Section className="pb-8 max-w-3xl mx-auto">
        <Link to="/resources" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] flex items-center gap-1.5 mb-8">
          <ArrowLeft size={14} className="rtl:rotate-180" /> {t("nav.resources")}
        </Link>
        <div className="flex items-center gap-3 mb-4 text-xs font-mono text-[var(--color-text-faint)]" dir="ltr">
          <span>{article.category}</span>
          <span>&middot;</span>
          <span>{article.readTime}</span>
          <span>&middot;</span>
          <span>{new Date(article.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight leading-tight">{article.title}</h1>
      </Section>

      <Section className="pt-0 max-w-3xl mx-auto">
        <div className="space-y-8">
          {article.body.map((block) => (
            <div key={block.heading}>
              <h2 className="font-display text-xl font-semibold mb-3">{block.heading}</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">{block.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)] max-w-3xl mx-auto">
        <p className="eyebrow mb-4">{t("resources.keepReading")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {others.map((a) => (
            <Link key={a.slug} to={`/resources/${a.slug}`} className="card p-5 hover:border-[var(--color-accent-strong)] transition-colors">
              <p className="text-xs font-mono text-[var(--color-text-faint)] mb-2" dir="ltr">{a.category}</p>
              <p className="font-display font-semibold text-sm">{a.title}</p>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
