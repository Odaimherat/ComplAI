export const caseStudies = [
  {
    id: "northbeam-health",
    company: "Northbeam Health",
    industry: "Healthcare technology, Series B",
    employees: "140 employees",
    challenge:
      "Northbeam needed SOC 2 Type II and HIPAA readiness simultaneously to close two enterprise health-system deals that were both blocked on a signed BAA and a completed security review.",
    approach:
      "Connected AWS, Okta, and GitHub in the first week. ComplAI's framework mapping applied roughly 70% of SOC 2 evidence directly to the overlapping HIPAA technical safeguards, so the team was not running two parallel audit projects.",
    result:
      "SOC 2 Type II report delivered in 6 weeks from kickoff to auditor field work completion, with HIPAA security risk assessment finished in the same window.",
    metrics: [
      { label: "Time to SOC 2 Type II", value: "6 weeks" },
      { label: "Manual evidence-gathering hours saved", value: "~310 hrs" },
      { label: "Deals unblocked", value: "2 enterprise contracts" },
    ],
    quote:
      "Our security review used to be the reason deals stalled. Now it is the reason we close faster than competitors who are still doing this by hand.",
    quoteAttribution: "VP of Engineering, Northbeam Health",
    framework: "soc2",
  },
  {
    id: "ledgerline-fintech",
    company: "Ledgerline",
    industry: "Fintech / payments infrastructure",
    employees: "310 employees",
    challenge:
      "Ledgerline needed PCI DSS v4.0 compliance ahead of a card-network deadline while simultaneously maintaining an existing ISO 27001 certification that a European banking partner required.",
    approach:
      "Used ComplAI's AI risk engine to reconcile the two frameworks' overlapping requirements and prioritized the remaining PCI-specific gaps, primarily segmentation testing and cardholder data flow documentation, by proximity to the network deadline.",
    result:
      "Achieved a passing Attestation of Compliance with zero critical findings on re-assessment, and kept the existing ISO 27001 certification intact through the same evidence cycle.",
    metrics: [
      { label: "Critical findings at re-assessment", value: "0" },
      { label: "Frameworks maintained concurrently", value: "2" },
      { label: "Segmentation test turnaround", value: "9 days" },
    ],
    quote:
      "We stopped treating PCI and ISO as two different jobs. ComplAI showed us where they were already the same job.",
    quoteAttribution: "Head of Security, Ledgerline",
    framework: "pci-dss",
  },
  {
    id: "atlas-saas",
    company: "Atlas Analytics",
    industry: "B2B SaaS, data analytics",
    employees: "85 employees",
    challenge:
      "Atlas was losing enterprise deals to a competitor that could answer security questionnaires same-day. Their own process took two to three weeks per questionnaire and pulled engineers off product work.",
    approach:
      "Combined GRC evidence mapping with the AI assistant's knowledge base, trained on Atlas's own control library, to auto-draft questionnaire responses with citations back to live evidence instead of a stale spreadsheet.",
    result:
      "Cut average security questionnaire turnaround from 17 business days to under 48 hours, with a sustained SOC 2 audit-readiness score above 95%.",
    metrics: [
      { label: "Questionnaire turnaround", value: "17 days -> 2 days" },
      { label: "Sustained audit-readiness score", value: "95%+" },
      { label: "Engineering hours reclaimed per quarter", value: "~140 hrs" },
    ],
    quote:
      "Security questionnaires stopped being a tax on our engineering team. That alone paid for the platform.",
    quoteAttribution: "CTO, Atlas Analytics",
    framework: "soc2",
  },
];
