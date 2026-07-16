import { Section } from "../components/ui/Section";

const SECTIONS = [
  {
    title: "1. Agreement to terms",
    body: "These Terms of Service govern your use of the ComplAI website and, where a separate order form or master subscription agreement is not already in place, the ComplAI platform. By accessing our website or platform, you agree to these terms.",
  },
  {
    title: "2. Description of service",
    body: "ComplAI provides software and services for continuous compliance monitoring (GRC), AI-powered detection and response (SOC/MDR), defensive security posture management, and offensive security testing. Specific service levels, scope, and pricing for customers are set out in an order form or master subscription agreement, which takes precedence over these general terms in the event of a conflict.",
  },
  {
    title: "3. Not a substitute for an independent audit",
    body: "ComplAI's platform assists with evidence collection, control mapping, and readiness assessment. It does not itself issue SOC 2 reports, ISO certifications, or other independent attestations; those are issued solely by accredited, independent auditors or certification bodies. Use of ComplAI does not guarantee a passing audit outcome.",
  },
  {
    title: "4. Accounts and access",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Notify us promptly at security@complai.example of any unauthorized use.",
  },
  {
    title: "5. Acceptable use",
    body: "You may not use the ComplAI website or platform to violate applicable law, attempt to gain unauthorized access to our systems or other customers' data, or interfere with the operation of the service, including the AI assistant.",
  },
  {
    title: "6. Offensive security engagements",
    body: "Penetration testing and red team engagements are performed only against systems you are authorized to test, within a written scope and rules of engagement agreed in advance. Testing outside the agreed scope is not permitted and may result in termination of the engagement.",
  },
  {
    title: "7. Intellectual property",
    body: "ComplAI retains all rights to the platform, its underlying software, and documentation. You retain all rights to your own data submitted to the platform. We do not claim ownership of evidence, policies, or other content you upload.",
  },
  {
    title: "8. Confidentiality",
    body: "Each party will protect the other's confidential information with at least the same degree of care it uses for its own confidential information, and will not disclose it except as necessary to perform under these terms or as required by law.",
  },
  {
    title: "9. Disclaimers and limitation of liability",
    body: "The website and platform are provided \"as is\" except as otherwise stated in an applicable order form. To the maximum extent permitted by law, ComplAI is not liable for indirect, incidental, or consequential damages arising from use of the website or platform.",
  },
  {
    title: "10. Termination",
    body: "We may suspend or terminate access to the website or platform for violation of these terms. Termination of a paid subscription is governed by the applicable order form.",
  },
  {
    title: "11. Governing law",
    body: "These terms are governed by the laws of the State of Delaware, without regard to conflict of law principles, unless a separately executed agreement specifies otherwise.",
  },
  {
    title: "12. Changes to these terms",
    body: "We may update these terms from time to time. Material changes will be posted on this page with an updated effective date.",
  },
  {
    title: "13. Contact",
    body: "Questions about these terms can be sent to legal@complai.example.",
  },
];

export default function Terms() {
  return (
    <div>
      <Section className="pb-8 max-w-3xl mx-auto">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-3">Effective date: January 1, 2026</p>
      </Section>
      <Section className="pt-0 max-w-3xl mx-auto space-y-8">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="font-display font-semibold mb-2">{s.title}</h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{s.body}</p>
          </div>
        ))}
      </Section>
    </div>
  );
}
