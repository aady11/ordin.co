import { Decision } from '../types';

export const hardcodedDecisions: Decision[] = [
  {
    id: 'hc-1',
    title: 'Switched primary packaging supplier',
    classification: 'Operational',
    whatDecided: 'Switched from Gupta Packaging to Verma Packaging as primary supplier.',
    whyDecided: 'Defect rate with Gupta had reached 14% over three consecutive months, causing downstream rework costs and delivery delays.',
    alternativesConsidered: 'Negotiating with Gupta for improvement; dual-sourcing; in-house packaging.',
    expectedOutcome: 'Defect rate to drop below 5% within 60 days.',
    outcome: 'GOOD CALL',
    date: '14 May 2025',
    excerpt: 'Defect rate dropped 60% within 30 days of switching to Verma Packaging.',
  },
  {
    id: 'hc-2',
    title: 'Delayed GST filing for Q1 to prioritise export order',
    classification: 'Compliance',
    whatDecided: 'Deferred Q1 GST filing by 9 days to focus team bandwidth on a high-value export order.',
    whyDecided: 'Export order worth Rs 18L was at risk of deadline breach. Team resources were constrained.',
    alternativesConsidered: 'Hiring a CA firm for compliance; splitting team responsibilities.',
    expectedOutcome: 'Export order fulfilled on time; GST filing completed slightly late with minimal penalty.',
    outcome: 'COSTLY MISTAKE',
    date: '28 Apr 2025',
    excerpt: 'Rs 12,000 penalty. Compliance must never be deferred regardless of operational pressure.',
  },
  {
    id: 'hc-3',
    title: 'Approved urgent procurement from Vendor A under deadline',
    classification: 'Financial',
    whatDecided: 'Approved emergency procurement of raw aluminium from Vendor A at spot price without standard negotiation.',
    whyDecided: 'Production deadline in 36 hours. Primary vendor Sharma Metals failed to deliver. No alternative vendor had been pre-qualified.',
    alternativesConsidered: 'Partial production run with existing stock; subcontracting the order.',
    expectedOutcome: 'Production line to remain operational; order to be fulfilled on time.',
    outcome: 'COSTLY MISTAKE',
    date: '12 Apr 2025',
    excerpt: '28% cost overrun. Rs 1.2L extra spend. Deadline pressure caused poor negotiation.',
  },
  {
    id: 'hc-4',
    title: 'Hired 2 additional floor supervisors before peak season',
    classification: 'HR',
    whatDecided: 'Recruited two experienced floor supervisors six weeks before the Diwali peak production season.',
    whyDecided: 'Previous year\'s peak season saw a 22% productivity drop due to supervision gaps and overtime fatigue.',
    alternativesConsidered: 'Promoting from within; outsourcing supervision; seasonal contract staff.',
    expectedOutcome: 'Smooth peak season with no overtime dependency and 30%+ capacity increase.',
    outcome: 'GOOD CALL',
    date: '1 Mar 2025',
    excerpt: 'Production capacity increased 35%. No overtime costs during peak. Decision made 6 weeks early.',
  },
];

export const insights = [
  {
    id: 1,
    confidence: 91,
    title: 'You exhibit a deadline-pressure procurement bias.',
    body: 'Analysis of your last 8 procurement decisions shows approval speed increases 340% within 48 hours of a production deadline. This pattern correlates with an average 24% cost overrun versus planned budget. Three vendors have begun timing their quotes to arrive during high-pressure windows specifically to exploit this pattern.',
    tag: 'Deadline Pressure Bias',
  },
  {
    id: 2,
    confidence: 87,
    title: 'Compliance deferral is becoming a structural liability.',
    body: 'You have deferred compliance tasks in favour of operational priorities 4 times this quarter. Average penalty per deferral: Rs 38,000. If this pattern continues, projected annual compliance cost: Rs 2.1L. Compliance tasks deferred under pressure have a 78% chance of incurring penalties.',
    tag: 'Compliance Deferral Pattern',
  },
  {
    id: 3,
    confidence: 84,
    title: 'Vendor concentration risk has crossed the danger threshold.',
    body: '71% of your procurement value flows through 2 vendors. Industry benchmark for safe concentration is below 40%. A single disruption from either vendor would halt your production line within 9 working days. Three alternative vendors in your category have been identified and can be onboarded within 3 weeks.',
    tag: 'Vendor Concentration Risk',
  },
];

export const patternCards = [
  {
    id: 1,
    icon: '⚡',
    label: 'Deadline Pressure Bias',
    description: 'Procurement speed spikes 340% near deadlines, causing 24% avg cost overrun.',
  },
  {
    id: 2,
    icon: '📋',
    label: 'Compliance Deferral Pattern',
    description: '4 deferrals this quarter. Rs 38K avg penalty per instance. Risk: Rs 2.1L/year.',
  },
  {
    id: 3,
    icon: '🔗',
    label: 'Vendor Concentration Risk',
    description: '71% procurement through 2 vendors. Safe threshold is 40%. Action needed.',
  },
];
