export const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    audience: "Early-stage teams pursuing their first framework",
    price: "$799",
    period: "/month, billed annually",
    description:
      "Everything a team needs to get to SOC 2 Type I or a first framework without hiring a compliance function.",
    features: [
      "1 framework included (add more anytime)",
      "Continuous control monitoring, up to 150 controls",
      "AI evidence collection & mapping",
      "Audit-readiness score dashboard",
      "Email support, 1 business day response",
      "Up to 25 employees in scope",
    ],
    cta: "Start free trial",
  },
  {
    id: "business",
    name: "Business",
    audience: "Growing companies managing multiple frameworks and buyers",
    price: "$2,400",
    period: "/month, billed annually",
    description:
      "For teams juggling overlapping frameworks and an active security-questionnaire pipeline from enterprise customers.",
    features: [
      "Up to 4 frameworks included",
      "Continuous control monitoring, unlimited controls",
      "AI risk register with editable scoring rubric",
      "Vendor & sub-processor risk tracking",
      "Priority support, 4 hour response",
      "Up to 250 employees in scope",
      "Shared Slack channel with your compliance advisor",
    ],
    cta: "Talk to sales",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "Regulated or multi-entity organizations at scale",
    price: "Custom",
    period: "annual contract",
    description:
      "For regulated industries, multiple business units, or organizations that need dedicated security engineering support alongside compliance automation.",
    features: [
      "Unlimited frameworks",
      "Custom framework mapping (internal control library, customer-specific requirements)",
      "Dedicated compliance architect",
      "SSO/SCIM, custom data residency",
      "SOC/MDR, Defensive, and Offensive Security bundling available",
      "24/7 support with named incident contacts",
      "Unlimited employees in scope",
    ],
    cta: "Contact sales",
  },
];

/**
 * Which security product lines are available as add-ons at each tier -
 * used to render the feature-by-framework / product comparison table on
 * the Pricing page.
 */
export const addOnAvailability = {
  starter: { soc: false, defensive: "Basic scans only", offensive: false },
  business: { soc: "Business hours MDR", defensive: true, offensive: "Annual pentest included" },
  enterprise: { soc: "24/7 MDR", defensive: true, offensive: "Quarterly pentest + red team" },
};

export const frameworkAvailability = {
  soc2: { starter: true, business: true, enterprise: true },
  iso27001: { starter: true, business: true, enterprise: true },
  iso27701: { starter: false, business: true, enterprise: true },
  hipaa: { starter: true, business: true, enterprise: true },
  gdpr: { starter: false, business: true, enterprise: true },
  "pci-dss": { starter: false, business: true, enterprise: true },
  "nist-csf": { starter: false, business: true, enterprise: true },
  cmmc: { starter: false, business: false, enterprise: true },
};
