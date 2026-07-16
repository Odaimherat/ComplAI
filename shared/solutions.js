/**
 * The four product lines. GRC is the flagship and always listed first -
 * every consumer of this data (nav, homepage, solutions index, assistant)
 * should preserve this order rather than re-sorting it.
 */
export const solutions = [
  {
    id: "grc",
    flagship: true,
    path: "/solutions/grc",
    name: "GRC & Compliance Automation",
    shortName: "GRC",
    tagline: "Continuous compliance, not once-a-year fire drills",
    nameAr: "الحوكمة والمخاطر والامتثال",
    shortNameAr: "الحوكمة والامتثال",
    taglineAr: "امتثال مستمر، لا عمليات إطفاء حرائق سنوية",
    summaryAr:
      "تحوّل ComplAI الاستعداد للتدقيق من هرولة ربع سنوية إلى عملية تعمل في الخلفية. تتصل المنصة بمنظومتك التقنية، وتربط الأدلة الحية بالضوابط عبر كل إطار تدعمه، وتقيّم جاهزيتك للتدقيق لحظياً، وتحافظ على سجل مخاطر قائم ومُعدّ بالذكاء الاصطناعي بحيث لا يكتشف المدقق أي شيء لأول مرة.",
    summary:
      "ComplAI turns audit prep from a quarterly scramble into a background process. The platform connects to your stack, maps live evidence to controls across every framework you support, scores your audit readiness in real time, and keeps a standing AI-drafted risk register so nothing is discovered for the first time by an auditor.",
    capabilities: [
      {
        title: "Continuous control monitoring",
        detail:
          "Agents and API connectors pull evidence from your cloud provider, IdP, ticketing system, and code host on a schedule, then re-check every mapped control automatically instead of waiting for a manual quarterly review.",
      },
      {
        title: "AI-assisted evidence collection",
        detail:
          "The evidence engine reads incoming artifacts (config exports, access reviews, policy documents) and classifies which control(s) each one satisfies, with a confidence score and a human-in-the-loop approval step before anything is marked complete.",
      },
      {
        title: "Framework mapping",
        detail:
          "One piece of evidence often satisfies several frameworks at once. ComplAI maps a single access-review export to the equivalent control in SOC 2, ISO 27001, and NIST CSF simultaneously, so overlapping frameworks do not mean duplicated work.",
      },
      {
        title: "Audit-readiness scoring",
        detail:
          "A live readiness score per framework, broken down by control family, tells you and your auditor exactly what is provably in place today, not what was true at the last review.",
      },
      {
        title: "AI risk register & scoring",
        detail:
          "Risks are scored on likelihood and impact using a transparent, editable rubric (not a black box), linked to the controls that mitigate them, and automatically re-scored as new evidence changes their status.",
      },
    ],
    metrics: [
      { label: "Controls automated per customer, average", value: "500+" },
      { label: "Median time to SOC 2 Type II readiness", value: "6 weeks" },
      { label: "Evidence tasks removed from manual work", value: "~70%" },
    ],
  },
  {
    id: "soc",
    flagship: false,
    path: "/solutions/soc",
    name: "AI-Powered SOC / MDR",
    shortName: "SOC / MDR",
    tagline: "Detection and response that keeps your controls honest",
    nameAr: "مركز عمليات أمنية مدعوم بالذكاء الاصطناعي",
    shortNameAr: "المراقبة والاستجابة",
    taglineAr: "كشف واستجابة يبقيان ضوابطك صادقة",
    summaryAr:
      "خدمة كشف واستجابة مُدارة يقوم فيها الذكاء الاصطناعي بفرز الضجيج بحيث يقضي فريقك، وفريقنا، الوقت على الإشارات الحقيقية فقط. كل حادثة يتعامل معها المركز تتحول أيضاً إلى دليل موثّق للكشف والاستجابة والإغلاق، يغذي وضع الامتثال لديك مباشرة بدلاً من أن يبقى في أداة منفصلة.",
    summary:
      "A managed detection and response service where AI triages the noise so your team, and ours, only spend time on signal. Every incident the SOC handles also becomes evidence: a documented detection, response, and closure, feeding directly back into your compliance posture instead of living in a separate tool.",
    capabilities: [
      {
        title: "AI-assisted alert triage",
        detail:
          "A scoring model trained on historical analyst decisions ranks incoming alerts by likely severity and de-duplicates related signals, cutting the volume a human analyst has to review by a majority before it ever reaches them.",
      },
      {
        title: "24/7 managed monitoring",
        detail:
          "Coverage across endpoint, network, cloud, and identity telemetry, with defined response SLAs by severity tier and direct escalation to your on-call contacts.",
      },
      {
        title: "Threat intelligence correlation",
        detail:
          "Indicators from open threat intel feeds are correlated automatically against your environment so known-bad infrastructure and TTPs are flagged without waiting on a manual lookup.",
      },
      {
        title: "Compliance-linked incident records",
        detail:
          "Every incident closes out with a structured record mapped to the relevant control (e.g. SOC 2 CC7.2, ISO A.5.24) so your incident response evidence builds itself as the SOC works.",
      },
    ],
    metrics: [
      { label: "Mean time to triage", value: "< 4 minutes" },
      { label: "Alert volume reduction via AI scoring", value: "~65%" },
      { label: "Coverage", value: "24/7/365" },
    ],
  },
  {
    id: "defensive",
    flagship: false,
    path: "/solutions/defensive",
    name: "Defensive Security",
    shortName: "Defensive Security",
    tagline: "Hardening that matches what your compliance program claims",
    nameAr: "الأمن الدفاعي",
    shortNameAr: "الأمن الدفاعي",
    taglineAr: "تحصين يطابق فعلياً ما يدّعيه برنامج الامتثال لديك",
    summaryAr:
      "إدارة وضع الأمان لنقاط النهاية والشبكة والسحابة مع معالجة تُرتَّب أولوياتها بالذكاء الاصطناعي، بحيث يتطابق التحصين الذي تنفذه فعلياً مع الضوابط التي يدّعي برنامج الامتثال لديك أنها قائمة.",
    summary:
      "Endpoint, network, and cloud security posture management with AI-prioritized remediation, so the hardening work you actually do lines up with the controls your compliance program is claiming are in place.",
    capabilities: [
      {
        title: "Cloud security posture management",
        detail:
          "Continuous scanning across your cloud accounts for misconfigurations, excess permissions, and drift from your defined security baseline, with control mapping built in.",
      },
      {
        title: "Endpoint & network hardening",
        detail:
          "Policy templates and configuration checks for endpoint protection, network segmentation, and secure baseline configuration, validated on a schedule rather than at rollout time only.",
      },
      {
        title: "AI-prioritized remediation queue",
        detail:
          "Findings are ranked by exploitability and business impact, not just raw severity, so your team fixes the issues that actually move risk and audit readiness first.",
      },
      {
        title: "Identity & access reviews",
        detail:
          "Automated quarterly (or continuous) access reviews with anomaly flags for stale accounts, excessive privilege, and unused service credentials.",
      },
    ],
    metrics: [
      { label: "Misconfigurations found in first scan, average", value: "120+" },
      { label: "Time to close a critical finding, median", value: "3.2 days" },
      { label: "Cloud accounts supported per environment", value: "Unlimited" },
    ],
  },
  {
    id: "offensive",
    flagship: false,
    path: "/solutions/offensive",
    name: "Offensive Security",
    shortName: "Offensive Security",
    tagline: "Proof, not paperwork, that your controls hold under pressure",
    nameAr: "الأمن الهجومي",
    shortNameAr: "الأمن الهجومي",
    taglineAr: "إثبات، لا أوراق، بأن ضوابطك تصمد تحت الضغط",
    summaryAr:
      "اختبار اختراق مدعوم بالذكاء الاصطناعي، وفرق حمراء، وإدارة سطح الهجوم، تنتج نوع الأدلة التي يريدها فعلياً المدققون والعملاء المهتمون بالأمن: إثبات أن ضوابطك اختُبرت أمام سلوك خصم حقيقي، لا أنها موثقة فقط.",
    summary:
      "AI-assisted penetration testing, red teaming, and attack surface management that produces the kind of evidence auditors and security-conscious customers actually want: proof your controls were tested against real adversary behavior, not just documented.",
    capabilities: [
      {
        title: "AI-assisted penetration testing",
        detail:
          "Human-led testing accelerated by AI-driven reconnaissance and attack-path analysis, covering web application, API, network, and cloud environments.",
      },
      {
        title: "Attack surface management",
        detail:
          "Continuous external asset discovery so new subdomains, exposed services, or forgotten cloud storage buckets are found by us before they are found by someone else.",
      },
      {
        title: "Red team engagements",
        detail:
          "Objective-based adversary simulation exercises that test detection and response as a whole, not just individual controls in isolation.",
      },
      {
        title: "Audit-ready reporting",
        detail:
          "Findings are delivered mapped directly to the frameworks that require penetration testing evidence (SOC 2, PCI DSS, ISO 27001), so the report doubles as audit artifact.",
      },
    ],
    metrics: [
      { label: "Average findings per external pentest", value: "18" },
      { label: "Critical findings remediated pre-retest", value: "94%" },
      { label: "Engagements delivered with audit-mapped reporting", value: "100%" },
    ],
  },
];

export function getSolutionById(id) {
  return solutions.find((s) => s.id === id);
}
