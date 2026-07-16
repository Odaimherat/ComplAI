import { Section } from "../components/ui/Section";
import AssistantChat from "../components/AssistantChat";
import { useLanguage } from "../context/LanguageContext";

export default function Assistant() {
  const { t } = useLanguage();
  return (
    <div>
      <Section className="pb-8 text-center">
        <p className="eyebrow mb-4">{t("assistant.eyebrow")}</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl mx-auto leading-tight">
          {t("assistant.title")}
        </h1>
        <p className="mt-4 text-[var(--color-text-muted)] max-w-xl mx-auto">{t("assistant.desc")}</p>
      </Section>

      <Section className="pt-0 max-w-2xl mx-auto">
        <div className="card h-[560px] flex flex-col overflow-hidden">
          <AssistantChat />
        </div>
      </Section>
    </div>
  );
}
