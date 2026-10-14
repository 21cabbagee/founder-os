import React, { useState } from 'react';
import { 
  Shield, 
  Target, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Sliders, 
  Layers, 
  Award, 
  Compass, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { calculateMoatDefensibility, calculateOpportunityScore, calculateMarketSizing, calculateRunwayAndEconomics } from '../../utils/calculations';

export function StageStrategy({ 
  venture, 
  opportunity, 
  interviews, 
  experiments, 
  pilots, 
  outreachTemplate, 
  costWatchlist, 
  moatMap, 
  setMoatMap,
  onNavigateStage 
}) {
  const [copiedManifesto, setCopiedManifesto] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [activeTab, setActiveTab] = useState('moat'); // 'moat' | 'positioning' | 'gtm-manifesto'

  // Calculate live moat metrics
  const moatResult = calculateMoatDefensibility(moatMap.scores);

  const handleScoreChange = (dimension, value) => {
    setMoatMap(prev => ({
      ...prev,
      scores: {
        ...prev.scores,
        [dimension]: Number(value)
      }
    }));
  };

  // Compile full comprehensive GTM & Validation Manifesto in clean Markdown
  const generateGtmManifestoMarkdown = () => {
    const oppScore = calculateOpportunityScore(opportunity.scores);
    const mkt = calculateMarketSizing(38000, 2388, 2.5);
    const eco = calculateRunwayAndEconomics(venture.cashBalance, venture.monthlyRevenue, venture.monthlyBurnGross);

    return `# FOUNDER OS — GO-TO-MARKET PLAYBOOK & VALIDATION MANIFESTO
**Venture:** ${venture.name} (${venture.tagline})
**Category:** ${venture.category}
**Founder:** ${venture.founder} | **Location:** ${venture.location}
**Date of Compilation:** ${new Date().toISOString().split('T')[0]}
**Status:** ${venture.currentStage} | Default Alive State: ${eco.isDefaultAlive ? 'YES' : 'NO (Runway: ' + eco.runwayMonths + ' mos)'}

---

## 1. EXECUTIVE MISSION & NORTH-STAR
- **Primary ICP:** ${venture.targetCustomer}
- **Business Model:** ${venture.businessModel}
- **Immediate North-Star Milestone:** ${venture.northStarGoal}
- **Validated Opportunity Score:** ${oppScore.totalScore}/30 (${oppScore.percentage}% — ${oppScore.tier})
- **Opportunity Assessment:** ${oppScore.recommendation}

---

## 2. THE PAINFUL PROBLEM & CUSTOMER DISCOVERY
- **Pain Statement:** ${opportunity.problemStatement}
- **Current Workarounds Observed:** ${opportunity.currentWorkaround}
- **Proposed Solution Wedge:** ${opportunity.proposedSolution}
- **Discovery Evidence Base:** ${interviews.length} In-Depth Customer Interviews Logged.
- **Average Documented Pain:** 2.5 hours per evening lost to manual typing per clinician.

### Key Customer Discovery Evidence:
${interviews.map(i => `* **${i.clinicianName}** (${i.clinicName}):
  - Quantified Pain: ${i.quantifiedPainHoursPerWeek} hrs/week
  - Clinician Quote: "${i.keyQuote}"
  - Current Workaround: ${i.currentWorkaround}
  - Willingness to Pay: ${i.willingnessToPayVerified ? 'VERIFIED' : 'PENDING'}
`).join('\n')}

---

## 3. BOTTOM-UP MARKET SIZING HYPOTHESIS
* **Reachable Target Customers (US Solo PT Clinics):** 38,000 clinics
* **Annual Contract Value (ACV @ $199/mo):** $2,388 / year
* **Conservative Penetration (SOM):** 2.5% market share
* **Total Addressable Market (TAM):** $${(mkt.tam / 1000000).toFixed(1)} Million
* **Serviceable Addressable Market (SAM - 15%):** $${(mkt.sam / 1000000).toFixed(1)} Million
* **Base Target SOM:** $${(mkt.som / 1000000).toFixed(2)} Million ARR (950 Clinics)
* **Sensitivity Range:** Low ($${(mkt.lowRange / 1000000).toFixed(2)}M) to High ($${(mkt.highRange / 1000000).toFixed(2)}M)
*(Note: Bottom-up assumptions based on CMS NPI provider registry and private practice survey data)*

---

## 4. ONE-JOB / ONE-SCREEN PRODUCT WEDGE
* **Single User:** Solo Outpatient Physical Therapist with 12–16 daily patients.
* **Single Painful Job:** Generating Medicare-compliant orthopedic SOAP notes between patient treatment sessions.
* **Single Promised Outcome:** 60-second audit-ready SOAP note ready to paste into WebPT/Jane App.
* **Measurable Activation Event:** 5 consecutive patient notes generated with >85% clinician acceptance.
* **Active Pilot Funnel:** ${pilots.length} clinics in trial pipeline (${pilots.filter(p => p.status === 'Paid Pilot ($199/mo)').length} converted to paid retainer).

---

## 5. BOUNDED DISTRIBUTION ENGINE & OUTREACH
### Active Channel Experiments:
${experiments.map(e => `* **${e.channel}** [${e.status}]
  - Audience: ${e.targetAudience}
  - Hypothesis: ${e.hypothesis}
  - Weekly Budget: $${e.weeklyBudget} | Time: ${e.timeBudgetHours} hrs/wk
  - Observed Leading Metric: ${e.leadingMetricObserved}
  - Result: ${e.conversionsObserved}
  - Learning: ${e.learnings}
`).join('\n')}

### Ethical Outreach Framework (1-on-1 Personalized):
- **Subject Line:** ${outreachTemplate.subject}
- **Relevant Observation:** ${outreachTemplate.observation}
- **Specific Verifiable Value:** ${outreachTemplate.specificValue}
- **Low-Friction Ask:** ${outreachTemplate.lowFrictionAsk}
- **Opt-Out / Compliance:** ${outreachTemplate.optOutCompliance}

---

## 6. UNIT ECONOMICS & VARIABLE DELIVERY WATCHLIST
- **Cash in Bank:** $${venture.cashBalance.toLocaleString()}
- **Monthly Revenue (MRR):** $${venture.monthlyRevenue.toLocaleString()}
- **Gross Monthly Burn:** $${venture.monthlyBurnGross.toLocaleString()}
- **Net Monthly Burn:** $${eco.netBurn.toLocaleString()}
- **Runway:** ${eco.runwayMonths} Months (${eco.runwayStatus})
- **Software Gross Margin:** 94.5%
- **Estimated CAC:** $450 (Founder-led outbound)
- **CAC Payback Speed:** 2.4 Months
- **30-Month LTV:** $5,637 (12.5x LTV:CAC Ratio)

### Monitored Variable API Drivers:
${costWatchlist.map(c => `- **${c.service}:** ${c.costDriver} (Budget: $${c.monthlyBudgetLimit}/mo | Current: $${c.currentMonthlyRunRate}/mo — Status: ${c.status})`).join('\n')}

---

## 7. COMPETITIVE DEFICIT & MOAT SCORECARD
**Overall Defensibility Score:** ${moatResult.score}/30 (${moatResult.percentage}% — ${moatResult.tier})
- **Workflow Switching Costs:** ${moatMap.scores.switchingCosts}/5
- **Proprietary Specialized Data:** ${moatMap.scores.proprietaryData}/5
- **Network Effects & Community:** ${moatMap.scores.networkEffects}/5
- **Inference Cost Advantage:** ${moatMap.scores.costAdvantage}/5
- **Regulatory / HIPAA Moat:** ${moatMap.scores.regulatoryLicensing}/5
- **Speed of Founder Execution:** ${moatMap.scores.speedExecution}/5

**Defensibility Strategy:** ${moatMap.defensibilityNotes}

---
*Generated autonomously via Founder OS — Grounded in evidence, not founder assumptions.*
`;
  };

  const handleCopyManifesto = () => {
    const md = generateGtmManifestoMarkdown();
    navigator.clipboard.writeText(md);
    setCopiedManifesto(true);
    setTimeout(() => setCopiedManifesto(false), 2500);
  };

  const handleDownloadManifesto = () => {
    const md = generateGtmManifestoMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${venture.name.toLowerCase()}_gtm_validation_manifesto.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJson = () => {
    const fullState = {
      venture,
      opportunity,
      interviews,
      experiments,
      pilots,
      outreachTemplate,
      costWatchlist,
      moatMap,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(fullState, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${venture.name.toLowerCase()}_founderos_state.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Guidance Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Stage 07 — Defensibility & GTM Distribution Engine
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Moat Defensibility & Validation Manifesto Export
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Evaluate structural defensibility beyond AI prompt wrappers, articulate non-generic brand positioning, 
            and export the complete evidence-backed GTM Playbook.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('moat')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'moat'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Moat Scorecard
          </button>
          <button
            onClick={() => setActiveTab('positioning')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'positioning'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Brand Positioning
          </button>
          <button
            onClick={() => setActiveTab('gtm-manifesto')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'gtm-manifesto'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            GTM Manifesto
          </button>
        </div>
      </div>

      {/* Tab 1: Moat Scorecard */}
      {activeTab === 'moat' && (
        <div className="space-y-6">
          {onNavigateStage && (
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-white">Coding Agent Architecture (TypeSafe Blueprint): </span>
                  <span className="text-purple-200">
                    Avoid the KV cache routing trap with query-aware visibility ladders, tiered tool disclosure, and sensitivity-aware routing.
                  </span>
                </div>
              </div>
              <button
                onClick={() => onNavigateStage('jev')}
                className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs whitespace-nowrap self-start sm:self-auto shadow-md transition-all"
              >
                Inspect Jev Harness
              </button>
            </div>
          )}

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">6-Dimension Defensibility Framework</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Why will this business survive after competitors or foundation model updates copy the basic feature?
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-mono">Defensibility Score</div>
                  <div className="text-xl font-black text-purple-400">
                    {moatResult.score} <span className="text-xs text-slate-500 font-normal">/ 30 ({moatResult.percentage}%)</span>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  {moatResult.tier}
                </span>
              </div>
            </div>

            {/* Moat Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-white">1. Workflow Switching Costs</span>
                  <span className="text-xs font-mono font-bold text-purple-400">{moatMap.scores.switchingCosts} / 5</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  Custom phrase macros, personalized clinician SOAP templates, and routine daily clinic muscle memory.
                </p>
                <input 
                  type="range"
                  min="1"
                  max="5"
                  value={moatMap.scores.switchingCosts}
                  onChange={(e) => handleScoreChange('switchingCosts', e.target.value)}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-white">2. Proprietary Specialized Data</span>
                  <span className="text-xs font-mono font-bold text-purple-400">{moatMap.scores.proprietaryData} / 5</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  Compounding dataset of anonymized physical therapy movement test transcripts and rare orthopedic acronyms.
                </p>
                <input 
                  type="range"
                  min="1"
                  max="5"
                  value={moatMap.scores.proprietaryData}
                  onChange={(e) => handleScoreChange('proprietaryData', e.target.value)}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-white">3. Network Effects & Community</span>
                  <span className="text-xs font-mono font-bold text-purple-400">{moatMap.scores.networkEffects} / 5</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  Peer-to-peer clinical template sharing and regional state association clinician referrals.
                </p>
                <input 
                  type="range"
                  min="1"
                  max="5"
                  value={moatMap.scores.networkEffects}
                  onChange={(e) => handleScoreChange('networkEffects', e.target.value)}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-white">4. Cost Advantage & Optimized Routing</span>
                  <span className="text-xs font-mono font-bold text-purple-400">{moatMap.scores.costAdvantage} / 5</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  Proprietary prompt caching and audio chunking keeping variable delivery below $12/month/clinic.
                </p>
                <input 
                  type="range"
                  min="1"
                  max="5"
                  value={moatMap.scores.costAdvantage}
                  onChange={(e) => handleScoreChange('costAdvantage', e.target.value)}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-white">5. Regulatory & HIPAA Licensing</span>
                  <span className="text-xs font-mono font-bold text-purple-400">{moatMap.scores.regulatoryLicensing} / 5</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  Formal HIPAA Business Associate Agreements (BAAs), zero-audio-retention guarantee, and compliance audit trail.
                </p>
                <input 
                  type="range"
                  min="1"
                  max="5"
                  value={moatMap.scores.regulatoryLicensing}
                  onChange={(e) => handleScoreChange('regulatoryLicensing', e.target.value)}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-white">6. Speed of Founder Execution</span>
                  <span className="text-xs font-mono font-bold text-purple-400">{moatMap.scores.speedExecution} / 5</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  Same-day feature releases based directly on clinic owner phone calls without enterprise roadmaps.
                </p>
                <input 
                  type="range"
                  min="1"
                  max="5"
                  value={moatMap.scores.speedExecution}
                  onChange={(e) => handleScoreChange('speedExecution', e.target.value)}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800 flex items-start gap-3 bg-slate-950/40 p-4 rounded-xl">
              <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-400">
                <strong className="text-white block mb-0.5">Defensibility Note:</strong>
                {moatMap.defensibilityNotes}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Brand Positioning */}
      {activeTab === 'positioning' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
              <Compass className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-lg font-bold text-white">High-Clarity Brand Positioning Canvas</h3>
                <p className="text-xs text-slate-400">
                  Differentiate sharply from horizontal commodity tools by nailing the 6 positioning pillars.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">1. Ideal Customer Profile (ICP)</span>
                <h4 className="text-sm font-bold text-white mt-1">Solo & Boutique Outpatient Physical Therapists</h4>
                <p className="text-xs text-slate-400 mt-2">
                  Solo practitioners treating 12–16 patients per day who personally bear the burden of paperwork at night.
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">2. Product Category</span>
                <h4 className="text-sm font-bold text-white mt-1">Ambient Clinical Orthopedic Documentation</h4>
                <p className="text-xs text-slate-400 mt-2">
                  Not a general transcription tool and not an enterprise hospital system. A specialized micro-utility for PTs.
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">3. Promised Core Outcome</span>
                <h4 className="text-sm font-bold text-white mt-1">Audit-Ready SOAP Notes in 60 Seconds</h4>
                <p className="text-xs text-slate-400 mt-2">
                  Leave the clinic at 5:05 PM with zero unfinished charts, saving 10–12 unpaid evening hours every week.
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">4. Economic Value Equation</span>
                <h4 className="text-sm font-bold text-white mt-1">$199 / mo Replaces $2,000+ of Clinician Time</h4>
                <p className="text-xs text-slate-400 mt-2">
                  Saves 40+ hours per month, enabling clinicians to either treat 2 extra patients or enjoy evenings with family.
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">5. The True Alternative</span>
                <h4 className="text-sm font-bold text-white mt-1">Late-Night Typing or $1,800/mo Human Scribes</h4>
                <p className="text-xs text-slate-400 mt-2">
                  Or bloated $600/mo enterprise medical scribes that fail to recognize physical therapy range-of-motion metrics.
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">6. Concrete Proof & Trust</span>
                <h4 className="text-sm font-bold text-white mt-1">4 Clinic Pilots, 91% Note Acceptance</h4>
                <p className="text-xs text-slate-400 mt-2">
                  Over 1,200 patient encounters processed with zero Medicare audit documentation kickbacks.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Complete GTM Manifesto & Exporter */}
      {activeTab === 'gtm-manifesto' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">Founder OS GTM & Validation Manifesto</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Complete executive summary synthesizing customer evidence, opportunity scoring, product wedge, outreach scripts, and economics.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleCopyManifesto}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                >
                  {copiedManifesto ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedManifesto ? 'Copied to Clipboard!' : 'Copy Manifesto'}
                </button>
                <button
                  onClick={handleDownloadManifesto}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download .md
                </button>
                <button
                  onClick={handleExportJson}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  {copiedJson ? 'State Exported!' : 'Export JSON State'}
                </button>
              </div>
            </div>

            {/* Markdown Preview Area */}
            <div className="mt-6 bg-slate-950/90 border border-slate-800 rounded-xl p-5 overflow-x-auto max-h-[500px] overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin">
              <pre className="whitespace-pre-wrap">{generateGtmManifestoMarkdown()}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
