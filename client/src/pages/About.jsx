import { mission, missionAr, story, storyAr, values, valuesAr, timeline, leadership } from "../data/content";
import { Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import { useLanguage } from "../context/LanguageContext";
import ShieldNetworkArt from "../components/ShieldNetworkArt";

export default function About() {
  const { t, language } = useLanguage();
  const isAr = language === "ar";
  const storyParas = isAr ? storyAr : story;
  const valuesList = isAr ? valuesAr : values;

  return (
    <div>
      <Section className="pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-center">
          <div>
            <p className="eyebrow mb-4">{t("about.eyebrow")}</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              {isAr ? missionAr : mission}
            </h1>
          </div>
          <ShieldNetworkArt className="hidden lg:block w-full h-auto opacity-90" />
        </div>
      </Section>

      <Section className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <SectionHeading eyebrow={t("about.storyEyebrow")} title={t("about.storyTitle")} />
          <div className="md:col-span-2 space-y-4">
            {storyParas.map((p, i) => (
              <p key={i} className="text-[var(--color-text-muted)] leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-y border-[var(--color-border)] bg-[var(--color-bg-raised)]">
        <SectionHeading eyebrow={t("about.valuesEyebrow")} title={t("about.valuesTitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {valuesList.map((v, i) => (
            <Reveal key={v.title} delay={i * 60}>
              <div className="card p-6 h-full">
                <h3 className="font-display font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{v.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={t("about.timelineEyebrow")} title={t("about.timelineTitle")} />
        <ol className="relative border-s border-[var(--color-border)] ps-8 space-y-8">
          {timeline.map((tItem) => (
            <li key={`${tItem.year}-${tItem.label}`} className="relative">
              <span className="absolute -start-[38px] top-1 w-3 h-3 rounded-full bg-[var(--color-accent-strong)]" />
              <p className="font-mono text-xs text-[var(--color-accent-strong)]" dir="ltr">{tItem.year}</p>
              <p className="font-display font-semibold mt-1">{tItem.label}</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{tItem.detail}</p>
            </li>
          ))}
        </ol>
        {isAr && (
          <p className="text-xs text-[var(--color-text-faint)] mt-6 italic">
            الجدول الزمني معروض بالإنجليزية حالياً.
          </p>
        )}
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <SectionHeading eyebrow={t("about.leadershipEyebrow")} title={t("about.leadershipTitle")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((l) => (
            <div key={l.name} className="card p-6">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent-soft)] flex items-center justify-center font-display font-semibold text-[var(--color-accent-strong)] mb-4">
                {l.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="font-display font-semibold">{l.name}</h3>
              <p className="text-xs font-mono text-[var(--color-accent-strong)] mb-3">{l.role}</p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{l.bio}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
