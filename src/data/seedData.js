/**
 * Founder OS — Canonical Seed Data
 * 
 * Based on ScribeFlow: Ambient Clinical Scribing for Solo Physical Therapists.
 * Realistic, evidence-grounded micro-SaaS demonstration.
 * All figures are labeled as hypotheses and assumptions.
 */

export const INITIAL_VENTURE = {
  id: 'venture-scribeflow',
  name: 'ScribeFlow',
  tagline: 'Ambient SOAP Documentation for Solo Physical Therapists',
  category: 'Vertical Healthcare SaaS / Micro-Utility',
  targetCustomer: 'Solo & Boutique Outpatient Physical Therapy Clinics (1–3 Clinicians)',
  businessModel: 'B2B Micro-SaaS ($199 / month / clinic)',
  currentStage: 'Product Wedge & Paid Pilot Stage', // 'Market Discovery' | 'Wedge Definition' | 'Distribution Engine' | 'Operating Cadence' | 'Scale & Health'
  northStarGoal: 'Secure 10 Paying Clinic Pilots ($2,000 MRR) with >80% note acceptance rate',
  cashBalance: 68000,
  monthlyRevenue: 796, // 4 paid early design partners ($199/mo)
  monthlyBurnGross: 4200,
  currency: 'USD ($)',
  founder: 'Alex Rivera (Solo Founder & Ex-Biomedical Engineer)',
  location: 'Denver, CO (Remote Outpatient Focus)',
  createdAt: '2026-09-15',
  updatedAt: '2026-10-14'
};

export const INITIAL_OPPORTUNITY = {
  id: 'opp-1',
  ventureId: 'venture-scribeflow',
  problemStatement: 'Solo physical therapists spend 2.5 hours every evening completing repetitive, manual SOAP notes after seeing 12–16 patients. This unpaid administrative burden leads to severe clinical burnout and reduces time for new patient evaluations.',
  currentWorkaround: 'Dictating into iPhone voice memos late at night, scribbling shorthand on paper clipboards, or spending $1,800/mo on remote human medical scribes who do not understand musculoskeletal range-of-motion jargon.',
  proposedSolution: 'A zero-hardware, mobile-first ambient microphone listener that passively captures clinician-patient verbal movement tests and generates complete, audit-ready SOAP notes in 60 seconds.',
  wedgeDifferentiation: 'Tuned specifically for outpatient orthopedic physical therapy (Goniometer angle tests, manual muscle test grading, and functional goal coding) — unlike bloated $600/mo enterprise medical scribes built for hospital ER doctors.',
  confidence: 'High (18 Verified Customer Interviews)',
  scores: {
    urgency: 5, // Daily severe friction causing therapists to consider quitting private practice
    frequency: 5, // 12 to 16 times per day for every single patient session
    budgetRoi: 4, // $199/mo saves 40+ hours of clinician time ($2,000+ equivalent billable value)
    reachability: 4, // Direct access via state PT associations, private Facebook/Reddit clinician groups, and public NPI registry
    evidenceQuality: 5, // Recorded stopwatch audits, photo logs of paper clipboards, and 4 paid pilot commitments
    wedgeDifferentiation: 4 // Hyper-focused on orthopedic movement tests rather than generic hospital EHRs
  }
};

export const INITIAL_INTERVIEWS = [
  {
    id: 'int-01',
    clinicianName: 'Dr. Marcus Vance, PT, DPT',
    clinicName: 'Vance Orthopedic & Sports Therapy (Solo Clinic)',
    location: 'Austin, TX',
    date: '2026-09-22',
    channel: 'In-Clinic Observation & Recorded Interview',
    painQuantified: '2 hours 40 minutes per day spent on documentation after clinic closes',
    keyQuote: '"By 6 PM after treating 14 patients on the tables, the last thing my hands want to do is type 40 repetitive sentences about hamstring flexibility into WebPT. I\'m paying my clinic rent, but I feel like an unpaid data entry clerk."',
    observedBehavior: 'Uses blue sticky notes attached to patient paper files with handwritten range-of-motion degrees, then stays at the clinic until 8:15 PM typing notes.',
    willingnessToPay: '$199 to $299/mo without hesitation if it integrates with WebPT clipboard exports.',
    commitmentStatus: 'Paid Pilot ($199/mo Active)',
    followUpDate: '2026-10-18'
  },
  {
    id: 'int-02',
    clinicianName: 'Dr. Chloe Lin, DPT, OCS',
    clinicName: 'Pacific Motion Physical Therapy (2 Clinicians)',
    location: 'Seattle, WA',
    date: '2026-09-28',
    channel: 'Zoom Call with Screen Sharing',
    painQuantified: '11 hours per weekend spent catching up on delayed billing notes',
    keyQuote: '"Generic AI scribes fail miserably on PT jargon. They don\'t know what \'3+/5 knee extension with anterior glide\' means. If your tool actually understands PT special tests like Lachman and Hawkins-Kennedy, I will buy it today."',
    observedBehavior: 'Showed screen backlog of 34 unsigned evaluation notes from the prior 10 days.',
    willingnessToPay: '$199/month per clinician seat.',
    commitmentStatus: 'Paid Pilot ($199/mo Active)',
    followUpDate: '2026-10-21'
  },
  {
    id: 'int-03',
    clinicianName: 'Dr. Jordan Patel, PT',
    clinicName: 'Spine & Joint Rehabilitation Studio',
    location: 'Chicago, IL',
    date: '2026-10-04',
    channel: 'Phone Call via LinkedIn Outreach',
    painQuantified: '1.5 hours daily; currently paying $600/month for remote virtual scribe service',
    keyQuote: '"My remote scribe in the Philippines takes 24 hours to return draft notes and frequently confuses cervical with thoracic vertebrae. A real-time ambient tool that I can verify immediately would replace that entirely."',
    observedBehavior: 'Reviewing transcripts manually each morning and making line-by-line corrections.',
    willingnessToPay: '$250/mo if it provides 1-tap copy to Clinicient.',
    commitmentStatus: 'Active 14-Day Pilot',
    followUpDate: '2026-10-16'
  }
];

export const INITIAL_MARKET_SIZING = {
  targetAudienceCount: 38000, // Total independent & solo PT practices in US (Census/APTA estimate)
  plausibleAcv: 2388, // $199/mo * 12 months
  penetrationPct: 2.5, // Conservative 2.5% market penetration in 3-5 years
  notes: 'Bottom-up model based on US outpatient physical therapy private practices with 1-3 treating clinicians.'
};

export const INITIAL_PRODUCT_WEDGE = {
  oneTargetUser: 'Solo Outpatient Physical Therapist treating 10–16 orthopedic patients daily.',
  onePainfulJob: 'Translating verbal range-of-motion tests and exercise flow into compliant insurance SOAP notes.',
  onePromisedOutcome: 'A complete, audit-ready SOAP note ready for signature within 60 seconds of patient session ending.',
  oneSuccessMetric: 'Clinician reviews, accepts, and copies the note into their EHR with fewer than 3 sentence edits in under 45 seconds.',
  clarityCheckPassed: true
};

export const INITIAL_PILOT_PIPELINE = [
  {
    id: 'pilot-1',
    clinicName: 'Vance Orthopedic Therapy (Austin, TX)',
    contact: 'Dr. Marcus Vance',
    status: 'Paid Pilot',
    monthlyFee: 199,
    startDate: '2026-09-25',
    noteAcceptanceRatePct: 91,
    notes: 'Using daily for 12+ patients. Requested customizable functional goal drop-downs.'
  },
  {
    id: 'pilot-2',
    clinicName: 'Pacific Motion PT (Seattle, WA)',
    contact: 'Dr. Chloe Lin',
    status: 'Paid Pilot',
    monthlyFee: 199,
    startDate: '2026-10-01',
    noteAcceptanceRatePct: 88,
    notes: 'Loving the orthopedic special test accuracy. WebPT clipboard copy works flawlessly.'
  },
  {
    id: 'pilot-3',
    clinicName: 'Spine & Joint Rehab (Chicago, IL)',
    contact: 'Dr. Jordan Patel',
    status: 'Active 14-Day Pilot',
    monthlyFee: 199,
    startDate: '2026-10-06',
    noteAcceptanceRatePct: 84,
    notes: 'Trial ends Oct 20. High likelihood of conversion to paid.'
  },
  {
    id: 'pilot-4',
    clinicName: 'Elevate Sports Physical Therapy (Boulder, CO)',
    contact: 'Dr. Samira Khan',
    status: 'Qualified Discovery',
    monthlyFee: 199,
    startDate: '2026-10-12',
    noteAcceptanceRatePct: 0,
    notes: 'Demo scheduled for Friday 10 AM. Interested in dry-needling terminology support.'
  }
];

export const INITIAL_DISTRIBUTION_EXPERIMENTS = [
  {
    id: 'dist-exp-1',
    channel: 'Founder-Led Loom Video Teardowns via LinkedIn Outreach',
    targetAudience: 'Solo Practice Owners (NPI Registry + LinkedIn Profile Filter)',
    hypothesis: 'Personalized 90-second Loom videos demonstrating SOAP note generation from actual PT exercise cues will achieve >25% response rate and >10% pilot booking rate.',
    weeklyBudget: 150, // $150 budget for Loom & contact enrichment
    timeBudgetHours: 8,
    status: 'Running',
    leadingMetricTarget: '30 personalized outreach touches per week',
    leadingMetricObserved: '28 touches sent',
    conversionsObserved: '7 Discovery Calls Booked (25% conversion)',
    learnings: 'Mentioning specific EHR name (WebPT or Jane App) in the subject line increases open rate by 40%.'
  },
  {
    id: 'dist-exp-2',
    channel: 'Educational Guest Training in State PT Association Chapters',
    targetAudience: 'Independent PT Clinic Directors in Colorado & Texas',
    hypothesis: 'A 20-minute accredited clinical education webinar on "CMS 2026 Audit Compliance & Documentation Speed" generates 15 high-intent pilot signups without direct sales pitching.',
    weeklyBudget: 0,
    timeBudgetHours: 5,
    status: 'Planned',
    leadingMetricTarget: '1 scheduled chapter workshop',
    leadingMetricObserved: 'Pending approval from APTA Colorado chapter board',
    conversionsObserved: 'TBD',
    learnings: 'State chapters require 3 weeks notice for newsletter inclusion.'
  }
];

export const INITIAL_OUTREACH_TEMPLATE = {
  subject: 'Quick question about {{ClinicName}}\'s documentation hours',
  observation: 'Noticed on your clinic website that you specialize in 1-on-1 manual therapy and post-op shoulder protocols.',
  specificValue: 'A solo practice owner friend in Austin was staying until 8 PM finishing SOAP notes in WebPT. We built a micro-tool that turns ambient exam room audio into compliant orthopedic SOAP notes in 60 seconds.',
  lowFrictionAsk: 'Would you be open to a 2-minute Loom video showing how it captures goniometer angles, or should I leave you in peace?',
  optOutCompliance: 'If not interested, just reply "pass" and I will never email again. Best, Alex'
};

export const INITIAL_CONTENT_PIPELINE = [
  {
    id: 'cnt-1',
    title: 'Stop Typing SOAP Notes at 8 PM: The 60-Second Orthopedic Scribe Workflow',
    format: 'LinkedIn Carousel & Short Video (60s)',
    stage: 'Published',
    impressions: 4200,
    leadsGenerated: 6,
    publishedUrl: 'https://linkedin.com/posts/sample-scribeflow-workflow',
    learnings: 'Screenshots showing actual SOAP note subjective/objective split got highest comments from solo practitioners.'
  },
  {
    id: 'cnt-2',
    title: 'Why Generic AI Scribes Fail on Musculoskeletal Special Tests (Lachman, Neer, Hawkins)',
    format: 'Technical Teardown Post & Visual Diagram',
    stage: 'Recorded / In Review',
    impressions: 0,
    leadsGenerated: 0,
    publishedUrl: '',
    learnings: 'Highlighting clinical nuance positions ScribeFlow as specialized, not generic commodity AI.'
  },
  {
    id: 'cnt-3',
    title: '5 Documentation Habits of Solo Clinics Billing 85+ Units/Week Without Weekend Work',
    format: 'Newsletter Article & Guide',
    stage: 'Drafting Script',
    impressions: 0,
    leadsGenerated: 0,
    publishedUrl: '',
    learnings: 'Frame as clinical operational efficiency, not growth hacking.'
  }
];

export const INITIAL_WEEKLY_REVIEW = {
  weekLabel: 'Week 41 (Oct 7 – Oct 14, 2026)',
  ventureId: 'venture-scribeflow',
  primaryFocus: 'Close 2 active trials into paid pilots and validate WebPT clipboard export reliability.',
  priorities: [
    { text: 'Complete onboarding walkthrough with Dr. Jordan Patel (Chicago)', owner: 'Alex', done: true },
    { text: 'Send 25 personalized Loom teardown emails to Colorado clinic owners', owner: 'Alex', done: true },
    { text: 'Audit Claude 3.5 Sonnet prompt for Medicare Part B functional goal syntax', owner: 'Alex', done: true },
    { text: 'Review variable delivery LLM API cost per note with Deepgram Nova-3', owner: 'Alex', done: false }
  ],
  blockers: 'One trial clinic uses a legacy desktop Windows EHR that blocks browser clipboard pasting.',
  whatWasLearned: 'Physical therapists care 80% about clinical vocabulary accuracy and 20% about integrations. If the note sounds like a human clinician wrote it, they gladly copy-paste it.',
  decisionsMade: 'Prioritize orthopedic vocabulary specialization over direct deep API integrations with enterprise EHRs.'
};

export const INITIAL_GOAL_MATRIX = {
  centralObjective: 'Achieve $10k MRR ($120k ARR) with 50 Delighted Solo PT Clinics',
  pillars: [
    { id: 'p1', title: 'Customer Discovery', action: 'Log 2 clinical workflow interviews weekly' },
    { id: 'p2', title: 'Product Wedge', action: 'Keep note generation under 60 seconds with >90% acceptance' },
    { id: 'p3', title: 'Founder Outbound', action: 'Deliver 25 personalized Loom outreach touches weekly' },
    { id: 'p4', title: 'Pilot Onboarding', action: 'Live 20-minute Zoom setup for every new trial clinic' },
    { id: 'p5', title: 'Unit Economics', action: 'Maintain variable delivery cost under $15/month/clinic' },
    { id: 'p6', title: 'Clinical Quality', action: 'Weekly accuracy audit of 50 anonymized SOAP notes' },
    { id: 'p7', title: 'Retention Loop', action: 'Check in on Day 3, Day 7, and Day 14 of every active clinic' },
    { id: 'p8', title: 'Compliance & Trust', action: 'Execute signed HIPAA Business Associate Agreements (BAAs)' }
  ]
};

export const INITIAL_HABITS = [
  {
    id: 'h-1',
    cueContext: 'Every morning at 8:30 AM before checking email or Slack',
    actionRoutine: 'Send 5 personalized video outreach notes to solo PT practice owners',
    frequency: 'Monday – Friday',
    currentStreakDays: 14,
    reflection: 'Consistency compounds; 3 of 4 current pilots originated from 8:30 AM morning outreach.'
  },
  {
    id: 'h-2',
    cueContext: 'Every Friday at 4:30 PM after treatment hours',
    actionRoutine: 'Conduct weekly operating review: what was tested, what happened, what changed',
    frequency: 'Weekly',
    currentStreakDays: 4,
    reflection: 'Prevents drift and keeps execution tied to concrete customer evidence.'
  }
];

export const INITIAL_SOPS = [
  {
    id: 'sop-1',
    title: 'SOP: 25-Minute Customer Discovery Interview for Solo Practice Owners',
    cadence: 'Bi-weekly',
    owner: 'Founder (Alex)',
    lastUpdated: '2026-10-02',
    steps: [
      'Pre-Call: Research clinic website to identify clinician specialty (Sports, Spine, Geriatric, Pelvic health).',
      'Min 0–5: Build rapport, confirm treatment schedule: "How many patients did you treat today?"',
      'Min 5–12: Map the pain timeline: "Walk me through what happens when your last patient leaves at 5 PM."',
      'Min 12–18: Probe current workarounds & financial cost: "What have you tried to solve this? Have you used scribes?"',
      'Min 18–23: Test willingness to pay without pitching: "If a tool reliably handled SOAP generation, what would that be worth to your practice?"',
      'Min 23–25: Ask for commitment: "We are testing a prototype with 5 clinics next week. Would you test 10 patient sessions?"'
    ]
  },
  {
    id: 'sop-2',
    title: 'SOP: 14-Day Clinic Pilot Onboarding & First-Encounter Success Protocol',
    cadence: 'Per New Clinic',
    owner: 'Founder (Alex)',
    lastUpdated: '2026-10-10',
    steps: [
      'Step 1: Execute signed mutual HIPAA BAA (Business Associate Agreement) prior to audio capture.',
      'Step 2: 20-minute setup Zoom call: test ambient room microphone placement on treatment desk.',
      'Step 3: Run a simulated 3-minute knee evaluation script to verify clinician microphone gain.',
      'Step 4: Check Day 1: Send WhatsApp/SMS after clinician\'s first 3 patients to inspect note quality.',
      'Step 5: Day 7 Check-in: Review acceptance rate and configure favorite diagnostic acronyms.',
      'Step 6: Day 12 Conversion Call: Review hours saved and transition to monthly recurring subscription ($199/mo).'
    ]
  }
];

export const INITIAL_COST_WATCHLIST = [
  {
    service: 'Speech-to-Text Audio Transcription (Deepgram Nova-3 Medical)',
    costDriver: '$0.26 per audio hour (~$0.07 per 15-minute patient session)',
    monthlyBudgetLimit: 250,
    currentMonthlyRunRate: 38,
    status: 'Healthy',
    alertThresholdPct: 75
  },
  {
    service: 'LLM SOAP Structuring (Claude 3.5 Sonnet / GPT-4o-mini)',
    costDriver: '$0.035 per generated SOAP note (Input & Output tokens)',
    monthlyBudgetLimit: 150,
    currentMonthlyRunRate: 22,
    status: 'Healthy',
    alertThresholdPct: 70
  },
  {
    service: 'Cloud Hosting & Supabase Local Storage',
    costDriver: 'Fixed infrastructure tier ($25/mo base + $10 backups)',
    monthlyBudgetLimit: 100,
    currentMonthlyRunRate: 35,
    status: 'Healthy',
    alertThresholdPct: 80
  }
];

export const INITIAL_MOAT_MAP = {
  scores: {
    switchingCosts: 4, // Deep integration with clinic documentation cadence and custom phrase macros
    proprietaryData: 4, // Compounding anonymized dataset of physical therapy range-of-motion test transcripts
    networkEffects: 2, // Low natural direct network effect, but potential clinician referral loop
    costAdvantage: 3, // Highly optimized prompt caching and lightweight token consumption
    regulatoryLicensing: 4, // Formal HIPAA compliance, signed BAAs, and zero-data-retention security posture
    speedExecution: 5 // Focused solo founder iterating daily with clinic owners without enterprise bureaucracy
  },
  defensibilityNotes: 'Competitive moat is built through vertical workflow stickiness: once a therapist configures their custom clinical assessment shortcuts and goal macros, switching to a generic tool carries high cognitive switching cost.'
};
