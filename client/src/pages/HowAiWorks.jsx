import { Section, SectionHeading } from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import StatusPill from "../components/ui/StatusPill";
import { useLanguage } from "../context/LanguageContext";

const LAYERS = [
  {
    title: "Evidence classification",
    detail:
      "Every incoming artifact, a config export, an access review spreadsheet, a signed policy PDF, is parsed and classified against the specific control language of every framework you have enabled. The classifier returns a confidence score, not just a yes/no, and anything below a high-confidence threshold is routed to a human reviewer before it is marked complete.",
    example: "IAM policy export -> mapped to SOC2-CC6.1, ISO-A.8.2, NIST-PR.AC-4 (confidence: 0.94)",
  },
  {
    title: "Control-to-framework mapping",
    detail:
      "Frameworks overlap heavily: a well-scoped access review can satisfy control language in SOC 2, ISO 27001, and NIST CSF simultaneously. The mapping layer maintains a graph of which controls across frameworks are satisfied by the same underlying evidence, so nothing has to be collected twice.",
    example: "1 access review -> satisfies 3 frameworks' equivalent controls",
  },
  {
    title: "Risk scoring",
    detail:
      "Risks are scored on likelihood and impact using a documented, editable 1-5 rubric, not an opaque model output. When a linked control's status changes, for example a mitigating control lapses, the affected risk is automatically flagged for re-review rather than silently going stale.",
    example: "Control lapse detected -> linked risk re-scored, review flagged",
  },
  {
    title: "SOC alert triage",
    detail:
      "A model trained on historical analyst decisions scores and de-duplicates incoming security alerts by likely severity, so human analysts spend their attention on the alerts that matter instead of manually triaging every raw signal.",
    example: "1,200 raw alerts/day -> ~420 after AI-assisted triage and de-duplication",
  },
  {
    title: "Audit-facing drafting",
    detail:
      "The assistant can draft narrative language for audit responses, security questionnaires, and risk treatment plans, always citing the specific evidence it is drawing from, so a reviewer can trace every sentence back to a real artifact rather than trusting a generated claim.",
    example: "Draft response cites: Evidence #4471, verified 2 days ago",
  },
];

export default function HowAiWorks() {
  const { t, language } = useLanguage();
  const isAr = language === "ar";

  return (
    <div>
      <Section className="pb-10">
        <p className="eyebrow mb-4">{t("howAiWorks.eyebrow")}</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-tight">
          {t("howAiWorks.title")}
        </h1>
        <p className="mt-5 text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">{t("howAiWorks.desc")}</p>
        {isAr && (
          <p className="text-xs text-[var(--color-text-faint)] mt-4 italic">
            الشرح التقني التفصيلي أدناه معروض بالإنجليزية حالياً.
          </p>
        )}
      </Section>

      <Section className="pt-0 space-y-6">
        {LAYERS.map((l, i) => (
          <Reveal key={l.title} delay={i * 50}>
            <div className="card p-7 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6">
              <div>
                <span className="text-xs font-mono text-[var(--color-text-faint)]">Layer 0{i + 1}</span>
                <h2 className="font-display text-xl font-semibold mt-1 mb-3">{l.title}</h2>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{l.detail}</p>
              </div>
              <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg p-4 font-mono text-xs text-[var(--color-text-muted)] flex items-center" dir="ltr">
                {l.example}
              </div>
            </div>
          </Reveal>
        ))}
      </Section>

      <Section className="border-t border-[var(--color-border)] bg-[var(--color-bg-raised)]">
        <SectionHeading eyebrow={t("howAiWorks.humanEyebrow")} title={t("howAiWorks.humanTitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6">
            <StatusPill status="pass" label={t("howAiWorks.automated")} />
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>Evidence collection from connected systems</li>
              <li>First-pass control mapping and confidence scoring</li>
              <li>Alert de-duplication and severity ranking</li>
              <li>Draft language for audit responses and questionnaires</li>
            </ul>
          </div>
          <div className="card p-6">
            <StatusPill status="warn" label={t("howAiWorks.alwaysReviewed")} />
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>Low-confidence evidence classifications</li>
              <li>Control design decisions (what your process should be)</li>
              <li>Incident closure and root-cause determination</li>
              <li>Risk acceptance decisions</li>
              <li>Final audit submissions to your assessor</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
