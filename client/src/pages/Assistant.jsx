import { Section } from "../components/ui/Section";
import AssistantChat from "../components/AssistantChat";

export default function Assistant() {
  return (
    <div>
      <Section className="pb-8 text-center">
        <p className="eyebrow mb-4">Ask ComplAI</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl mx-auto leading-tight">
          Ask about frameworks, pricing, or whether we do what you need
        </h1>
        <p className="mt-4 text-[var(--color-text-muted)] max-w-xl mx-auto">
          A knowledge-based assistant built from ComplAI's own content. It can explain frameworks, walk through
          readiness questions, and take you straight to the right page.
        </p>
      </Section>

      <Section className="pt-0 max-w-2xl mx-auto">
        <div className="card h-[560px] flex flex-col overflow-hidden">
          <AssistantChat />
        </div>
      </Section>
    </div>
  );
}
