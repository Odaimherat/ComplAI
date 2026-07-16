export const articles = [
  {
    slug: "continuous-compliance-vs-point-in-time-audits",
    title: "Continuous Compliance vs. Point-in-Time Audits",
    excerpt:
      "A point-in-time audit tells you what was true on the day someone checked. Continuous compliance tells you what is true right now. The difference is the entire pitch for automating GRC.",
    category: "Compliance strategy",
    readTime: "6 min read",
    date: "2026-02-11",
    body: [
      {
        heading: "The gap a point-in-time audit cannot see",
        text: "A traditional compliance audit is a snapshot. An assessor reviews a sample of evidence, usually gathered by hand over several stressful weeks, and attests that your controls looked correct as of that review. Everything that happens the day after the report is signed, a misconfigured storage bucket, an offboarded employee whose access was never revoked, a policy that quietly stopped being followed, is invisible until the next audit cycle catches it, often a year later.",
      },
      {
        heading: "What continuous compliance actually changes",
        text: "Continuous compliance does not replace the audit; auditors still need to independently test and attest. What it changes is the state of your evidence between audits. Instead of a spreadsheet that goes stale the moment it is exported, control status is checked on a schedule, hourly for some controls, daily for others, against your live environment. When a control drifts out of compliance, that is visible immediately, not discovered during next year's fire drill.",
      },
      {
        heading: "Why this matters more as you support more frameworks",
        text: "The gap compounds with scale. A company maintaining SOC 2 alone can survive with a manual process, painfully. A company maintaining SOC 2, ISO 27001, and a customer-specific security addendum at the same time is maintaining three point-in-time snapshots that inevitably drift out of sync with each other, because each is refreshed on a different schedule by a different person. Continuous, evidence-linked monitoring keeps all of them accurate against the same underlying reality at once.",
      },
      {
        heading: "The honest limitation",
        text: "Continuous monitoring is only as good as its coverage. A control that depends on a manual process outside any connected system, a hiring manager remembering to request the right access, for example, still needs a human check-in. The realistic goal is not zero manual work; it is shrinking manual work down to the controls that genuinely require human judgment, and automating verification for everything else.",
      },
    ],
  },
  {
    slug: "ai-in-the-soc-hype-vs-reality",
    title: "AI in the SOC: Hype vs. Reality",
    excerpt:
      "AI will not run your SOC unattended, and any vendor telling you otherwise is selling a demo, not a security program. Here is what AI actually does well in detection and response today.",
    category: "SOC / Detection & Response",
    readTime: "7 min read",
    date: "2026-03-04",
    body: [
      {
        heading: "What the marketing implies vs. what ships",
        text: "A lot of SOC marketing implies a fully autonomous analyst that investigates and closes incidents without a human in the loop. In production, that is not where the technology reliably is yet, and a SOC that operated that way would be a liability, not a feature. The realistic and valuable version of AI in a SOC is narrower and, frankly, more useful.",
      },
      {
        heading: "Where AI genuinely earns its place: triage and correlation",
        text: "The single highest-leverage use of AI in a modern SOC is alert triage: taking a flood of low-context alerts and scoring, grouping, and de-duplicating them so a human analyst spends their attention on the handful that matter. A model trained on historical analyst decisions can reliably learn what your team treats as noise versus signal, and that alone can cut analyst workload dramatically without ever making an autonomous decision about an actual incident.",
      },
      {
        heading: "Where it helps but still needs a human",
        text: "Threat intelligence correlation, matching indicators against known-bad infrastructure, and initial investigation scaffolding, pulling related logs, prior incidents, and asset context into one view, both save real analyst time. Neither should be the thing that decides an incident is closed. ComplAI's SOC uses AI for both, with every AI-assisted triage decision reviewable and every closure signed off by a human analyst.",
      },
      {
        heading: "The compliance angle most SOC vendors miss",
        text: "An incident that is detected, triaged, and closed well is still incomplete from a compliance standpoint if it is not recorded against the control it demonstrates, such as SOC 2's incident response criteria. Treating the SOC and the compliance program as separate tools means someone has to manually reconcile them later. Treating incident handling as compliance evidence from the start means that reconciliation never has to happen.",
      },
    ],
  },
  {
    slug: "what-soc2-automation-actually-automates",
    title: "What SOC 2 Automation Actually Automates",
    excerpt:
      "Not the audit. Not your auditor's judgment. Here is a precise, unglamorous breakdown of the parts of SOC 2 prep that software can and cannot take off your plate.",
    category: "Compliance strategy",
    readTime: "5 min read",
    date: "2026-04-22",
    body: [
      {
        heading: "The audit itself is never automated",
        text: "This is worth saying plainly because it is easy to imply otherwise: an independent auditor still has to review your environment and sign the report. No software automates an auditor's professional judgment, and any product implying that a SOC 2 report is generated by a tool rather than earned through an actual audit is misrepresenting what SOC 2 is.",
      },
      {
        heading: "What is automated: evidence gathering",
        text: "The single biggest time sink in a manual SOC 2 process is collecting evidence: screenshots of IAM policies, exports of access review spreadsheets, confirmation that a termination ticket actually revoked access within the required window. Automation pulls this evidence directly from connected systems on a schedule instead of a person manually gathering it every quarter.",
      },
      {
        heading: "What is automated: control-to-evidence mapping",
        text: "Once evidence exists, someone has to decide which of the 60-plus SOC 2 controls it actually satisfies. Doing this by hand for every piece of evidence, every quarter, is repetitive and error-prone. An evidence classifier can propose the mapping and a confidence score; a human still approves it, but the first pass is done for them.",
      },
      {
        heading: "What is not automated: control design",
        text: "Deciding what your access review process should be, how often it should run, who owns it, is a judgment call about your business, not something a tool should decide unilaterally. ComplAI's platform provides templates based on what auditors commonly accept, but the decision of which controls fit your organization stays with your team.",
      },
      {
        heading: "The realistic pitch",
        text: "SOC 2 automation removes the repetitive, evidence-shaped labor and leaves the judgment calls, control design, risk acceptance decisions, and the actual audit, where they belong: with people. That is a smaller claim than \"SOC 2 in a click,\" and it is also the true one.",
      },
    ],
  },
  {
    slug: "building-a-risk-register-that-auditors-trust",
    title: "Building a Risk Register That Auditors Trust",
    excerpt:
      "Most risk registers are a spreadsheet nobody updates. Here is what makes a risk register credible enough that an auditor treats it as real evidence rather than a formality.",
    category: "Risk management",
    readTime: "6 min read",
    date: "2026-05-15",
    body: [
      {
        heading: "The spreadsheet problem",
        text: "Ask most companies to produce their risk register and you get a spreadsheet last updated before a specific audit, with likelihood and impact scores that were assigned once, by one person, using no visible methodology. Auditors have seen this pattern enough times that a stale, undocumented register raises more questions than it answers.",
      },
      {
        heading: "A scoring rubric an auditor can actually evaluate",
        text: "A trustworthy risk register uses a documented, consistent scoring methodology, for example likelihood and impact each scored 1-5 against defined criteria, rather than a gut-feel number. It should be possible for someone outside the company to look at the rubric and understand why a risk was scored the way it was.",
      },
      {
        heading: "Risks linked to the controls that mitigate them",
        text: "A risk sitting in isolation, unconnected to any control, is a liability list, not a management tool. Each risk should point to the specific controls intended to reduce it, so that when a linked control's status changes, for instance a mitigating control lapses, the risk score is flagged for re-review rather than silently going stale.",
      },
      {
        heading: "Keeping it current without a quarterly fire drill",
        text: "ComplAI's risk register re-scores automatically whenever new evidence changes the status of a linked control, and surfaces new risks suggested by patterns in incident data from the SOC or findings from a pentest. The register stays a living document instead of a pre-audit chore, which is exactly the difference an experienced auditor is trained to notice.",
      },
    ],
  },
];

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug);
}
