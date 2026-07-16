export const mission =
  "Compliance work should prove that your security is real, not distract you from making it real. ComplAI exists to make continuous, evidence-backed compliance the default, so audits become a formality instead of an emergency.";

export const story = [
  "ComplAI was founded in 2022 by a former Big Four IT auditor and a security engineer who had each independently reached the same conclusion from opposite sides of the table: the compliance industry was optimized for producing paperwork, not for producing security.",
  "The founding team had watched the same pattern play out at company after company: a scramble in the weeks before an audit, a risk register nobody had opened since the last one, and a security posture that was, in practice, whatever the spreadsheet said it was on the one day someone checked. Meanwhile the actual security work, detection, hardening, testing, lived in entirely separate tools that never talked to the compliance program at all.",
  "ComplAI was built to close that gap: one platform where continuous monitoring, AI-assisted evidence collection, and the SOC, defensive, and offensive security work that keeps controls honest all feed the same compliance picture, in real time, instead of four disconnected annual projects.",
];

export const values = [
  {
    title: "Evidence over assertion",
    detail: "A control is not 'in place' because a policy document says so. It is in place because we can show, right now, that it is.",
  },
  {
    title: "Boring on purpose",
    detail: "Good compliance software should feel uneventful. Surprises belong in threat detection, not in whether last quarter's access review happened.",
  },
  {
    title: "Auditors are a partner, not an obstacle",
    detail: "We build for the auditor's actual review process, not around it. Every report we generate is designed to be handed directly to one.",
  },
  {
    title: "Security and compliance are one job",
    detail: "A compliance program that does not reflect real security work is paperwork. A security program with no compliance evidence is unprovable. We do not treat them as separate products.",
  },
];

export const timeline = [
  { year: "2022", label: "Founded", detail: "ComplAI founded by an auditor and a security engineer to unify compliance and real security work." },
  { year: "2022", label: "First customers", detail: "Early access program with 12 SaaS companies pursuing SOC 2 Type I." },
  { year: "2023", label: "GRC platform GA", detail: "Continuous control monitoring and AI evidence mapping launched for SOC 2 and ISO 27001." },
  { year: "2024", label: "SOC launch", detail: "AI-powered SOC/MDR launched, closing the loop between detection and compliance evidence." },
  { year: "2024", label: "Offensive & Defensive Security", detail: "Pentesting, red team, and posture management added as native, control-mapped services." },
  { year: "2025", label: "8 frameworks supported", detail: "Framework coverage expanded to SOC 2, ISO 27001/27701, HIPAA, GDPR, PCI DSS, NIST CSF, and CMMC." },
  { year: "2026", label: "500+ controls automated per customer, on average", detail: "Platform-wide milestone across the customer base." },
];

export const leadership = [
  {
    name: "Dana Whitfield",
    role: "Co-founder & CEO",
    bio: "Former IT audit partner focused on SOC 2 and ISO engagements for mid-market SaaS companies. Led the decision to build ComplAI after one too many audits delayed by evidence that existed but nobody could find in time.",
  },
  {
    name: "Marcus Ilori",
    role: "Co-founder & CTO",
    bio: "Previously led detection engineering for a managed security provider. Built the original correlation engine that became ComplAI's AI-assisted SOC triage system.",
  },
  {
    name: "Priya Anand",
    role: "VP of Compliance Engineering",
    bio: "Owns the framework mapping methodology behind ComplAI's control library, translating dense regulatory and standards language into control logic the platform can continuously test.",
  },
  {
    name: "Tomas Reyes",
    role: "VP of Security Operations",
    bio: "Runs the SOC and Offensive Security teams. Fifteen years across red team and detection engineering roles before joining ComplAI to build a SOC designed around compliance evidence from day one.",
  },
];

export const trustStats = [
  { value: "500+", label: "controls automated per customer, average" },
  { value: "6 wks", label: "median time to SOC 2 Type II readiness" },
  { value: "8", label: "frameworks natively supported" },
  { value: "94%", label: "customer audit pass rate on first attempt" },
];

export const testimonials = [
  {
    quote: "We went from a spreadsheet nobody trusted to a live dashboard our auditor pulls evidence from directly.",
    name: "VP of Engineering",
    company: "Northbeam Health",
  },
  {
    quote: "The SOC catching something is one thing. The SOC automatically documenting it as SOC 2 evidence is the part that actually saved us time.",
    name: "Head of Security",
    company: "Ledgerline",
  },
  {
    quote: "Security questionnaires used to eat a week of engineering time every deal cycle. Now it is closer to an afternoon.",
    name: "CTO",
    company: "Atlas Analytics",
  },
];

export const faqs = [
  {
    question: "Is ComplAI a replacement for an auditor?",
    answer:
      "No. ComplAI prepares and maintains your evidence and control posture; an independent, accredited auditor still performs the actual SOC 2, ISO 27001, or other framework audit and issues the report. We are built to make that audit faster and less painful, not to replace it.",
  },
  {
    question: "How does the AI actually decide a control is met?",
    answer:
      "Incoming evidence is classified against the specific control language for each framework, with a confidence score. Anything below a high-confidence threshold is routed to a human for review before it is marked complete. Every automated mapping is visible and editable, not a black box.",
  },
  {
    question: "Can we start with just one framework?",
    answer:
      "Yes. Most customers start with a single framework, usually SOC 2, and add others once the initial connectors and evidence mapping are in place, since a large share of evidence overlaps across frameworks.",
  },
  {
    question: "Do we need the SOC, Defensive, and Offensive Security products to use the GRC platform?",
    answer:
      "No. GRC & Compliance Automation works standalone. The other three product lines are built to feed additional, verified evidence into your compliance posture, but they are sold and deployed independently.",
  },
  {
    question: "What happens to our data if we cancel?",
    answer:
      "You can export your full evidence library, control mappings, and risk register at any time. On cancellation, data is retained for 30 days to support export, then deleted per our data retention policy in the Privacy Policy.",
  },
];
