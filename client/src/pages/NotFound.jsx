import { Link } from "react-router-dom";
import { Section } from "../components/ui/Section";

export default function NotFound() {
  return (
    <Section className="text-center py-32">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-4xl font-semibold mb-4">This page isn't in scope</h1>
      <p className="text-[var(--color-text-muted)] max-w-md mx-auto mb-8">
        The page you're looking for doesn't exist, or has moved. Try the homepage, or ask the assistant.
      </p>
      <div className="flex justify-center gap-3">
        <Link to="/" className="btn btn-primary">Back to home</Link>
        <Link to="/assistant" className="btn btn-secondary">Ask ComplAI</Link>
      </div>
    </Section>
  );
}
