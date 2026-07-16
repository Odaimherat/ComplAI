import {
  frameworks,
  findFrameworkByQuery,
  solutions,
  getSolutionById,
  pricingTiers,
  faqs,
  glossary,
} from "./knowledgeBase.js";

/**
 * ComplAI Assistant engine.
 *
 * This is a deliberately non-LLM, retrieval + intent-matching assistant.
 * See /docs/design-and-research-report.md section 6 for the full
 * rationale. In short: no paid LLM API key should be assumed for a
 * portfolio deployment, and a well-scoped rule-based assistant that only
 * ever talks about ComplAI's own real content is more reliable for this
 * use case than a free-tier hosted model with no guardrails.
 *
 * Design:
 *  - `intents` is an ordered list of { id, test(msg) => boolean, handle(msg) => Response }
 *  - the first matching intent wins, so more specific intents are listed
 *    before generic fallbacks
 *  - every handler returns { text, actions } where actions are optional
 *    { label, path } navigation suggestions the UI renders as buttons
 */

function normalize(msg) {
  return msg.toLowerCase().trim();
}

function includesAny(msg, terms) {
  return terms.some((t) => msg.includes(t));
}

const READINESS_TRIGGERS = ["ready for", "am i ready", "are we ready", "readiness"];

const SOLUTION_KEYWORDS = {
  grc: ["grc", "compliance automation", "control monitoring", "evidence collection"],
  soc: ["soc", "mdr", "detection and response", "managed detection", "triage"],
  defensive: ["defensive", "posture management", "cspm", "hardening", "endpoint security"],
  offensive: ["offensive", "pentest", "penetration test", "red team", "attack surface"],
};

function buildFrameworkResponse(fw) {
  return {
    text:
      `${fw.fullName} (${fw.category}). ${fw.summary} ` +
      `ComplAI maps this to ${fw.controlCount} tracked controls, and customers typically reach audit-ready ` +
      `in ${fw.typicalTimeline.toLowerCase()}. ${fw.aiMapping}`,
    actions: [
      { label: `See ${fw.name} on Frameworks page`, path: "/frameworks" },
      { label: "See GRC solution", path: "/solutions/grc" },
    ],
  };
}

function buildSolutionResponse(solution) {
  return {
    text: `${solution.name}: ${solution.tagline}. ${solution.summary}`,
    actions: [{ label: `Open ${solution.shortName}`, path: solution.path }],
  };
}

export const intents = [
  {
    id: "greeting",
    test: (msg) => /^(hi|hey|hello|yo|sup)\b/.test(msg) && msg.length < 20,
    handle: () => ({
      text:
        "Hello. I'm the ComplAI assistant. I can explain our GRC platform, SOC/MDR, Defensive, and Offensive Security lines, answer questions about specific compliance frameworks, walk through pricing, or point you to the right page. What can I help with?",
      actions: [
        { label: "Explore GRC & Compliance", path: "/solutions/grc" },
        { label: "See supported frameworks", path: "/frameworks" },
      ],
    }),
  },
  {
    id: "readiness_check",
    test: (msg) => includesAny(msg, READINESS_TRIGGERS),
    handle: (msg) => {
      const fw = findFrameworkByQuery(msg);
      if (fw) {
        return {
          text:
            `A rough gut-check for ${fw.name} readiness: do you have documented access control, a named incident response process, ` +
            `up-to-date vendor risk records, and evidence (not just policy) for each? If any of those are missing or stale, ` +
            `you are not audit-ready yet, and that is exactly what ComplAI's ${fw.name} readiness score measures automatically instead of you guessing. ` +
            `Most teams reach ${fw.name} readiness in ${fw.typicalTimeline.toLowerCase()} once connected.`,
          actions: [
            { label: `${fw.name} on Frameworks page`, path: "/frameworks" },
            { label: "Book a readiness review", path: "/contact" },
          ],
        };
      }
      return {
        text:
          "Happy to help you think through readiness. Which framework are you asking about, for example SOC 2, ISO 27001, HIPAA, GDPR, PCI DSS, NIST CSF, or CMMC? Each has a different bar and a different typical timeline.",
        actions: [{ label: "See all supported frameworks", path: "/frameworks" }],
      };
    },
  },
  {
    id: "framework_lookup",
    test: (msg) => Boolean(findFrameworkByQuery(msg)),
    handle: (msg) => buildFrameworkResponse(findFrameworkByQuery(msg)),
  },
  {
    id: "framework_list",
    test: (msg) => includesAny(msg, ["what frameworks", "which frameworks", "supported frameworks", "list of frameworks"]),
    handle: () => ({
      text: `ComplAI natively supports ${frameworks.map((f) => f.name).join(", ")}. Each maps to a live control library rather than a static checklist.`,
      actions: [{ label: "Open Frameworks page", path: "/frameworks" }],
    }),
  },
  {
    id: "pricing",
    test: (msg) => includesAny(msg, ["price", "pricing", "cost", "how much", "plans"]),
    handle: () => ({
      text:
        `Three tiers: ${pricingTiers.map((t) => `${t.name} (${t.price}${t.price !== "Custom" ? t.period : ""})`).join(", ")}. ` +
        `${pricingTiers[0].name} covers a single framework for early-stage teams; ${pricingTiers[1].name} covers up to four frameworks and is our most common plan; ${pricingTiers[2].name} is custom for regulated or multi-entity organizations.`,
      actions: [{ label: "See full pricing & comparison", path: "/pricing" }],
    }),
  },
  {
    id: "solution_lookup",
    test: (msg) =>
      Object.values(SOLUTION_KEYWORDS).some((kws) => includesAny(msg, kws)) ||
      /do you (do|offer|have)/.test(msg),
    handle: (msg) => {
      for (const [id, kws] of Object.entries(SOLUTION_KEYWORDS)) {
        if (includesAny(msg, kws)) {
          return buildSolutionResponse(getSolutionById(id));
        }
      }
      // "do you do X" fallback: check solution names directly
      const match = solutions.find((s) => msg.includes(s.name.toLowerCase()) || msg.includes(s.shortName.toLowerCase()));
      if (match) return buildSolutionResponse(match);
      return {
        text: "We have four product lines: GRC & Compliance Automation (our flagship), AI-Powered SOC/MDR, Defensive Security, and Offensive Security. Which one are you asking about?",
        actions: [{ label: "See all solutions", path: "/solutions" }],
      };
    },
  },
  {
    id: "how_ai_works",
    test: (msg) => includesAny(msg, ["how does the ai", "how does your ai", "how ai works", "how does ai", "black box", "how do you use ai"]),
    handle: () => ({
      text:
        "Short version: AI classifies incoming evidence against control language, scores risks using a documented rubric, prioritizes SOC alert triage, and drafts audit-facing language, but every automated decision above a low-confidence threshold is reviewable and human-approved before it counts as 'done'. Nothing is a black box.",
      actions: [{ label: "Read How Our AI Works", path: "/how-ai-works" }],
    }),
  },
  {
    id: "case_studies",
    test: (msg) => includesAny(msg, ["case stud", "customer story", "results", "example customer", "who uses"]),
    handle: () => ({
      text: "We have real, metrics-driven case studies across healthcare, fintech, and B2B SaaS, including a SOC 2 Type II delivered in 6 weeks.",
      actions: [{ label: "See Case Studies", path: "/case-studies" }],
    }),
  },
  {
    id: "contact_demo",
    test: (msg) => includesAny(msg, ["demo", "talk to sales", "contact", "get in touch", "book a call", "speak to someone"]),
    handle: () => ({
      text: "I can take you straight to the contact page to book a demo or send a message to our team.",
      actions: [{ label: "Book a demo / contact us", path: "/contact" }],
    }),
  },
  {
    id: "glossary",
    test: (msg) => Object.keys(glossary).some((term) => msg.includes(term)),
    handle: (msg) => {
      const term = Object.keys(glossary).find((t) => msg.includes(t));
      return { text: glossary[term], actions: [] };
    },
  },
  {
    id: "faq",
    test: (msg) => faqs.some((f) => overlapScore(msg, f.question.toLowerCase()) >= 2),
    handle: (msg) => {
      const best = faqs
        .map((f) => ({ f, score: overlapScore(msg, f.question.toLowerCase()) }))
        .sort((a, b) => b.score - a.score)[0].f;
      return { text: best.answer, actions: [] };
    },
  },
];

function overlapScore(a, b) {
  const stop = new Set(["the", "a", "an", "is", "are", "do", "does", "you", "your", "we", "our", "to", "of", "and", "for"]);
  const wordsA = new Set(a.split(/\W+/).filter((w) => w.length > 2 && !stop.has(w)));
  const wordsB = b.split(/\W+/).filter((w) => w.length > 2 && !stop.has(w));
  return wordsB.filter((w) => wordsA.has(w)).length;
}

const FALLBACK = {
  text:
    "I'm ComplAI's assistant, I know the platform, our frameworks, and pricing, but I don't have an answer to that one. Try asking about a specific framework (like SOC 2 or HIPAA), one of our four product lines, pricing, or how the AI works. Or reach the team directly.",
  actions: [
    { label: "See all frameworks", path: "/frameworks" },
    { label: "Contact the team", path: "/contact" },
  ],
};

/**
 * Runs the message through the ordered intent list and returns a response.
 * @param {string} message
 * @returns {{ text: string, actions: Array<{label: string, path: string}>, intent: string }}
 */
export function getAssistantResponse(message) {
  const msg = normalize(message || "");
  if (!msg) {
    return { ...FALLBACK, intent: "empty" };
  }
  for (const intent of intents) {
    try {
      if (intent.test(msg)) {
        const result = intent.handle(msg);
        return { ...result, intent: intent.id };
      }
    } catch (err) {
      console.error(`[assistant] intent "${intent.id}" failed:`, err);
    }
  }
  return { ...FALLBACK, intent: "fallback" };
}
