import { frameworks, findFrameworkByQuery } from "../../../shared/frameworks.js";
import { solutions, getSolutionById } from "../../../shared/solutions.js";
import { pricingTiers } from "../../../shared/pricing.js";
import { faqs } from "../../../shared/company.js";

export { frameworks, findFrameworkByQuery, solutions, getSolutionById, pricingTiers, faqs };

/**
 * Extra plain-language definitions the assistant can answer directly,
 * independent of the framework/solution catalogs above. Keeps the "explain
 * a concept" intent from needing an LLM for the site's core vocabulary.
 */
export const glossary = {
  grc: "GRC stands for Governance, Risk, and Compliance: the combined discipline of setting policy (governance), understanding what could go wrong (risk), and proving you are meeting your obligations (compliance). ComplAI's flagship product automates the evidence-heavy parts of all three.",
  "continuous compliance":
    "Continuous compliance means your control status is checked on an ongoing schedule against your live environment, instead of being reconstructed by hand once a year before an audit. See our article 'Continuous Compliance vs. Point-in-Time Audits' on the Resources page.",
  "audit readiness score":
    "A live, per-framework score showing what percentage of required controls currently have passing, verified evidence, broken down by control family, so you always know where you stand before an auditor tells you.",
  "risk register":
    "A structured, continuously re-scored list of identified risks, each linked to the controls that mitigate it, using a documented likelihood/impact rubric rather than a one-time spreadsheet estimate.",
  "attack surface management":
    "Continuous discovery of your organization's externally exposed assets (domains, services, cloud storage) so unknown or forgotten exposure is found before an attacker finds it. Part of our Offensive Security line.",
  mdr: "MDR (Managed Detection and Response) is a service where a provider monitors your environment for threats and responds to incidents on your behalf, 24/7. ComplAI's MDR is AI-assisted for triage and documents every incident as compliance evidence automatically.",
};
