/**
 * Frameworks We Support - single source of truth.
 * Imported by:
 *  - client/src/pages/Frameworks.jsx (renders the framework grid/detail)
 *  - client/src/pages/solutions/Grc.jsx (references framework chips)
 *  - server/src/lib/knowledgeBase.js (assistant framework lookups)
 */
export const frameworks = [
  {
    id: "soc2",
    name: "SOC 2",
    fullName: "SOC 2 Type I & Type II",
    category: "General security & availability",
    region: "United States (widely requested globally)",
    summary:
      "The de facto standard SaaS buyers ask for. Type I checks that controls are designed correctly at a point in time; Type II checks they operated effectively over a 3-12 month window.",
    aiMapping:
      "ComplAI maps live evidence, e.g. IAM policy exports, endpoint agent status, PR review logs, straight to the relevant Trust Services Criteria (Security, Availability, Confidentiality, Processing Integrity, Privacy) and flags any control drifting out of the Type II observation window before your auditor does.",
    controlCount: 64,
    typicalTimeline: "6-10 weeks to audit-ready with continuous monitoring",
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    fullName: "ISO/IEC 27001:2022",
    category: "Information security management",
    region: "Global, especially EU / enterprise buyers",
    summary:
      "An internationally recognized information security management system (ISMS) standard built around 93 Annex A controls and a formal risk treatment process.",
    aiMapping:
      "The AI risk engine turns your asset inventory and threat inputs into a live Statement of Applicability, scores each Annex A control's residual risk, and drafts the risk treatment plan language your ISMS documentation needs.",
    controlCount: 93,
    typicalTimeline: "3-4 months including a Stage 1 and Stage 2 audit",
  },
  {
    id: "iso27701",
    name: "ISO 27701",
    fullName: "ISO/IEC 27701:2019",
    category: "Privacy information management",
    region: "Global",
    summary:
      "An extension to ISO 27001 that adds privacy information management (PIMS) requirements for organizations acting as data controllers or processors.",
    aiMapping:
      "Because 27701 builds on 27001, ComplAI reuses your existing Annex A evidence and layers the additional PIMS controls on top, so you are not starting a second audit program from zero.",
    controlCount: 31,
    typicalTimeline: "6-8 weeks on top of an existing ISO 27001 program",
  },
  {
    id: "hipaa",
    name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    category: "Healthcare privacy & security",
    region: "United States",
    summary:
      "Governs protected health information (PHI). Covers the Privacy Rule, Security Rule, and Breach Notification Rule for covered entities and business associates.",
    aiMapping:
      "ComplAI auto-generates and tracks Business Associate Agreements, maps technical safeguards (access control, audit controls, transmission security) to your actual cloud configuration, and keeps a standing risk analysis instead of a once-a-year checkbox exercise.",
    controlCount: 54,
    typicalTimeline: "4-6 weeks for a security risk assessment baseline",
  },
  {
    id: "gdpr",
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    category: "Data privacy",
    region: "European Union / EEA (extraterritorial reach)",
    summary:
      "The EU's comprehensive data protection law covering lawful basis, data subject rights, breach notification, and cross-border transfer requirements.",
    aiMapping:
      "The assistant maintains your Record of Processing Activities (RoPA), flags processors without a current Data Processing Agreement, and drafts data subject access request (DSAR) response timelines automatically.",
    controlCount: 42,
    typicalTimeline: "5-7 weeks for RoPA and DPA coverage across vendors",
  },
  {
    id: "pci-dss",
    name: "PCI DSS",
    fullName: "Payment Card Industry Data Security Standard v4.0",
    category: "Payment security",
    region: "Global (anyone handling cardholder data)",
    summary:
      "Twelve requirements covering network security, cardholder data protection, vulnerability management, access control, monitoring, and policy for any organization that stores, processes, or transmits card data.",
    aiMapping:
      "ComplAI correlates vulnerability scan results, segmentation tests, and access logs against each of the twelve requirements, and prioritizes remediation by which failing control is closest to your next Attestation of Compliance deadline.",
    controlCount: 78,
    typicalTimeline: "8-12 weeks depending on merchant/service provider level",
  },
  {
    id: "nist-csf",
    name: "NIST CSF",
    fullName: "NIST Cybersecurity Framework 2.0",
    category: "Risk management framework",
    region: "United States (widely used globally as a baseline)",
    summary:
      "Organizes cybersecurity outcomes into six functions: Govern, Identify, Protect, Detect, Respond, and Recover. Framework, not a certification, often used as an internal maturity model.",
    aiMapping:
      "The risk engine scores your posture against all six functions, produces a maturity heat map, and recommends the next highest-leverage control to implement based on your current gaps.",
    controlCount: 106,
    typicalTimeline: "Ongoing maturity model; initial baseline in 3-5 weeks",
  },
  {
    id: "cmmc",
    name: "CMMC",
    fullName: "Cybersecurity Maturity Model Certification 2.0",
    category: "Defense industrial base",
    region: "United States (DoD contractors and subcontractors)",
    summary:
      "Required for organizations in the Defense Industrial Base handling Controlled Unclassified Information (CUI), built on NIST SP 800-171 practices across three certification levels.",
    aiMapping:
      "ComplAI maps your environment to all 110 NIST 800-171 practices required for CMMC Level 2, tracks System Security Plan (SSP) accuracy, and keeps your Plan of Action & Milestones (POA&M) current as gaps close.",
    controlCount: 110,
    typicalTimeline: "4-6 months for Level 2 certification readiness",
  },
];

export function findFrameworkByQuery(query) {
  const q = query.toLowerCase();
  return frameworks.find(
    (f) =>
      q.includes(f.id.replace("-", " ")) ||
      q.includes(f.id) ||
      q.includes(f.name.toLowerCase()) ||
      q.includes(f.fullName.toLowerCase())
  );
}
