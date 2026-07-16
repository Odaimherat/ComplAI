import { ShieldCheck, ExternalLink } from "lucide-react";
import { Section, SectionHeading } from "../components/ui/Section";
import StatusPill from "../components/ui/StatusPill";
import Reveal from "../components/ui/Reveal";
import { Link } from "react-router-dom";

/**
 * A public Trust Center is a real, common pattern for compliance/security
 * vendors (Vanta, Drata, and most SOC 2-audited SaaS companies publish
 * one) - it exists so a prospect's security reviewer can self-serve
 * answers instead of emailing a questionnaire. All data below is mock/
 * static content for this build; see the doc comment on `SUB_PROCESSORS`
 * for what a real implementation would connect to.
 */

const CERTIFICATIONS = [
  { name: "SOC 2 Type II", status: "pass", detail: "Renewed Q1 2026, next audit Q1 2027" },
  { name: "ISO 27001:2022", status: "pass", detail: "Certified since 2024" },
  { name: "GDPR", status: "pass", detail: "DPA available on request" },
  { name: "HIPAA", status: "warn", detail: "Business Associate Agreement available for Business+ plans" },
];

/**
 * In a real implementation, this list would come from an internal vendor
 * register (often the same evidence system a GRC platform like this one
 * maintains for its own compliance program) rather than being hardcoded.
 */
const SUB_PROCESSORS = [
  { name: "Amazon Web Services", purpose: "Cloud infrastructure & hosting", location: "United States" },
  { name: "MongoDB Atlas", purpose: "Database hosting", location: "United States" },
  { name: "Twilio SendGrid", purpose: "Transactional email delivery", location: "United States" },
  { name: "Datadog", purpose: "Application monitoring & logging", location: "United States" },
  { name: "Okta", purpose: "Employee identity & access management", location: "United States" },
];

const SYSTEMS = [
  { name: "GRC Platform (app.complai.example)", status: "pass" },
  { name: "AI Assistant API", status: "pass" },
  { name: "SOC / MDR Monitoring", status: "pass" },
  { name: "Customer API", status: "pass" },
];

export default function TrustCenter() {
  return (
    <div>
      <Section className="pb-10">
        <p className="eyebrow mb-4">Trust Center</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl leading-tight">
          The same transparency we ask our customers to give their auditors
        </h1>
        <p className="mt-5 text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          Everything a security reviewer typically asks for in a vendor questionnaire, published directly,
          so you do not have to wait on an email thread to evaluate us.
        </p>
      </Section>

      <Section className="pt-0 border-b border-[var(--color-border)]">
        <SectionHeading eyebrow="Live status" title="System status" />
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <ShieldCheck size={18} className="text-[var(--color-pass)]" />
            <p className="font-display font-semibold">All systems operational</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SYSTEMS.map((s) => (
              <div key={s.name} className="flex items-center justify-between border-t border-[var(--color-border)] pt-3">
                <span className="text-sm text-[var(--color-text-muted)]">{s.name}</span>
                <StatusPill status={s.status} label="Operational" />
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-faint)] mt-5">
            Illustrative status for this portfolio build - a production Trust Center would pull this from a
            real uptime monitor.
          </p>
        </div>
      </Section>

      <Section className="border-b border-[var(--color-border)]">
        <SectionHeading eyebrow="Compliance" title="Certifications & frameworks" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.name} delay={i * 50}>
              <div className="card p-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold mb-1">{c.name}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{c.detail}</p>
                </div>
                <StatusPill status={c.status} label={c.status === "pass" ? "Compliant" : "Available on request"} />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-sm text-[var(--color-text-muted)] mt-6">
          Need our full SOC 2 report or a signed DPA? <Link to="/contact" className="text-[var(--color-accent-strong)]">Request it here</Link>.
        </p>
      </Section>

      <Section>
        <SectionHeading eyebrow="Vendors" title="Sub-processors" description="Third parties that process customer data on our behalf." />
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left text-xs font-mono uppercase tracking-wide text-[var(--color-text-faint)] bg-[var(--color-bg-raised)]">
                <th className="py-3 px-5">Vendor</th>
                <th className="py-3 px-5">Purpose</th>
                <th className="py-3 px-5">Location</th>
              </tr>
            </thead>
            <tbody>
              {SUB_PROCESSORS.map((v) => (
                <tr key={v.name} className="border-b border-[var(--color-border)] last:border-0">
                  <td className="py-3 px-5 font-medium">{v.name}</td>
                  <td className="py-3 px-5 text-[var(--color-text-muted)]">{v.purpose}</td>
                  <td className="py-3 px-5 text-[var(--color-text-muted)]">{v.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section className="border-t border-[var(--color-border)]">
        <div className="card p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-semibold mb-1">Have a security questionnaire?</h3>
            <p className="text-sm text-[var(--color-text-muted)]">We usually respond same-day with evidence links, not a PDF.</p>
          </div>
          <Link to="/contact" className="btn btn-primary shrink-0">
            Contact security team <ExternalLink size={14} />
          </Link>
        </div>
      </Section>
    </div>
  );
}
