import React, { useState } from 'react';
import { 
  Search, 
  Users, 
  Calculator, 
  Plus, 
  HelpCircle, 
  TrendingUp, 
  FileText, 
  Sparkles, 
  DollarSign, 
  Quote, 
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Radio
} from 'lucide-react';
import { calculateOpportunityScore, calculateMarketSizing } from '../../utils/calculations';

export default function StageDiscovery({
  opportunity,
  onUpdateOpportunity,
  interviews,
  onAddInterview,
  marketSizing,
  onUpdateMarketSizing,
  onOpenAgentReach
}) {
  const [activeTab, setActiveTab] = useState('interviews'); // 'interviews' | 'scorecard' | 'sizing'
  const [showAddInterviewModal, setShowAddInterviewModal] = useState(false);

  // New Interview Form
  const [newInterview, setNewInterview] = useState({
    clinicianName: '',
    clinicName: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    channel: 'In-Clinic Observation',
    painQuantified: '2 hours per day on notes',
    keyQuote: '',
    observedBehavior: '',
    willingnessToPay: '$199/month',
    commitmentStatus: 'Qualified Discovery'
  });

  const oppScore = calculateOpportunityScore(opportunity.scores || {});
  const sizingResults = calculateMarketSizing(marketSizing);

  const handleScoreChange = (key, val) => {
    onUpdateOpportunity({
      ...opportunity,
      scores: {
        ...(opportunity.scores || {}),
        [key]: Number(val)
      }
    });
  };

  const handleSizingChange = (field, val) => {
    onUpdateMarketSizing({
      ...marketSizing,
      [field]: parseFloat(val) || 0
    });
  };

  const handleCreateInterview = (e) => {
    e.preventDefault();
    if (!newInterview.clinicianName.trim() || !newInterview.keyQuote.trim()) return;

    onAddInterview({
      id: `int-${Date.now()}`,
      ...newInterview
    });

    setNewInterview({
      clinicianName: '',
      clinicName: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      channel: 'In-Clinic Observation',
      painQuantified: '',
      keyQuote: '',
      observedBehavior: '',
      willingnessToPay: '$199/month',
      commitmentStatus: 'Qualified Discovery'
    });
    setShowAddInterviewModal(false);
  };

  const DIMENSIONS = [
    { key: 'urgency', label: 'Pain Urgency', desc: 'Is this an immediate daily fire that clinicians are actively seeking to extinguish?' },
    { key: 'frequency', label: 'Pain Frequency', desc: 'Does the customer suffer this pain multiple times every working day?' },
    { key: 'budgetRoi', label: 'Budget & ROI', desc: 'Can solving this save $1,000+ or generate billable hours with clear budget authority?' },
    { key: 'reachability', label: 'Audience Reachability', desc: 'Can you reach buyers directly without enterprise procurement or $50k sales cycles?' },
    { key: 'evidenceQuality', label: 'Evidence Quality', desc: 'Are assumptions grounded in recorded customer quotes and real workflow audits?' },
    { key: 'wedgeDifferentiation', label: 'Wedge Differentiation', desc: 'Is your positioning sharp and tailored to a specific overlooked workflow?' }
  ];

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0c1322] border border-slate-800">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('interviews')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'interviews'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Discovery Interviews ({interviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('scorecard')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'scorecard'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Opportunity Scorecard ({oppScore.totalScore}/30)</span>
          </button>

          <button
            onClick={() => setActiveTab('sizing')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'sizing'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Bottom-Up Market Sizing</span>
          </button>
        </div>

        {activeTab === 'interviews' && (
          <button
            onClick={() => setShowAddInterviewModal(true)}
            className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition"
          >
            <Plus className="w-4 h-4" />
            <span>Log Customer Interview</span>
          </button>
        )}
      </div>

      {/* Tab 1: Customer Discovery Interviews */}
      {activeTab === 'interviews' && (
        <div className="space-y-4">
          {/* Agent Reach Discovery Assistant banner */}
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start space-x-2.5">
              <Radio className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0 animate-pulse" />
              <div>
                <span className="font-bold text-white">Agent Reach Signal Scanner: </span>
                <span>
                  Query primary channels (Reddit PT discussions, YouTube clinical tutorials, or Exa semantic search) for unaddressed documentation complaints.
                </span>
              </div>
            </div>
            <button
              onClick={onOpenAgentReach}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs whitespace-nowrap self-start sm:self-auto"
            >
              Open Scanner
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {interviews.map((int) => (
              <div key={int.id} className="p-5 rounded-2xl bg-[#0c1322] border border-slate-800 hover:border-slate-700/80 transition space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-2.5 gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <span>{int.clinicianName}</span>
                      <span className="text-slate-400 font-normal text-xs">• {int.clinicName}</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {int.location} • Interviewed on {int.date} via {int.channel}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {int.commitmentStatus}
                    </span>
                  </div>
                </div>

                {/* Direct Quote */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200 italic leading-relaxed flex items-start space-x-2">
                  <Quote className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <p>{int.keyQuote}</p>
                </div>

                {/* Evidence Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
                    <span className="font-semibold text-rose-400 block mb-0.5">Quantified Pain:</span>
                    <p className="text-slate-300">{int.painQuantified}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
                    <span className="font-semibold text-slate-400 block mb-0.5">Observed Workaround:</span>
                    <p className="text-slate-300">{int.observedBehavior}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
                    <span className="font-semibold text-emerald-400 block mb-0.5">Willingness to Pay:</span>
                    <p className="text-slate-300">{int.willingnessToPay}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Opportunity Scorecard */}
      {activeTab === 'scorecard' && (
        <div className="p-6 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div>
              <h2 className="text-base font-bold text-white">
                6-Dimension Opportunity Scorecard
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Heuristic framework favoring urgency, frequency, and budget ROI over vanity market size
              </p>
            </div>
            <div className="text-right">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                oppScore.totalScore >= 24
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {oppScore.tierLabel} ({oppScore.totalScore} / 30)
              </span>
            </div>
          </div>

          {/* Operational Guidance */}
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200">
            <strong>Operating Guidance: </strong> {oppScore.recommendation}
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            {DIMENSIONS.map((dim) => {
              const currentScore = Number(opportunity.scores?.[dim.key]) || 3;
              return (
                <div key={dim.key} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div>
                      <span className="font-semibold text-white">{dim.label}</span>
                      <span className="text-slate-400 ml-2 text-[11px] hidden sm:inline">{dim.desc}</span>
                    </div>
                    <span className="font-bold text-indigo-400 px-2 py-0.5 bg-indigo-500/10 rounded border border-indigo-500/20">
                      {currentScore} / 5
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={currentScore}
                    onChange={(e) => handleScoreChange(dim.key, e.target.value)}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Bottom-Up Market Sizing Model */}
      {activeTab === 'sizing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs (6 cols) */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">
                Bottom-Up Market Assumptions
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Calculate TAM and SOM from identifiable ICP targets rather than top-down Gartner reports
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Reachable ICP Clinics */}
              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-slate-300">Reachable ICP Clinics (US Solo PT)</span>
                  <span className="text-indigo-400 font-bold">{marketSizing.targetAudienceCount.toLocaleString()} clinics</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="1000"
                  value={marketSizing.targetAudienceCount}
                  onChange={(e) => handleSizingChange('targetAudienceCount', e.target.value)}
                  className="w-full h-1 bg-slate-800 rounded accent-indigo-500"
                />
              </div>

              {/* Plausible ACV */}
              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-slate-300">Annual Contract Value (ACV)</span>
                  <span className="text-indigo-400 font-bold">${marketSizing.plausibleAcv.toLocaleString()} / year</span>
                </div>
                <input
                  type="range"
                  min="600"
                  max="6000"
                  step="100"
                  value={marketSizing.plausibleAcv}
                  onChange={(e) => handleSizingChange('plausibleAcv', e.target.value)}
                  className="w-full h-1 bg-slate-800 rounded accent-indigo-500"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Equivalent to ${(marketSizing.plausibleAcv / 12).toFixed(0)}/month subscription
                </span>
              </div>

              {/* Realistic Early Penetration % */}
              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <div className="flex justify-between font-medium mb-1">
                  <span className="text-slate-300">Estimated Penetration Rate</span>
                  <span className="text-indigo-400 font-bold">{marketSizing.penetrationPct}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.5"
                  value={marketSizing.penetrationPct}
                  onChange={(e) => handleSizingChange('penetrationPct', e.target.value)}
                  className="w-full h-1 bg-slate-800 rounded accent-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Sizing Outputs (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
                Calculated Revenue Potential
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px] block mb-0.5">Total Addressable Wedge (TAM)</span>
                  <span className="text-xl font-bold text-indigo-300">${(sizingResults.tamWedge / 1000000).toFixed(1)}M</span>
                  <span className="text-[10px] text-slate-500 block mt-1">100% of reachable ICP</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px] block mb-0.5">Target Base ARR (SOM)</span>
                  <span className="text-xl font-bold text-emerald-400">${(sizingResults.baseEstimate / 1000000).toFixed(2)}M</span>
                  <span className="text-[10px] text-slate-500 block mt-1">At {marketSizing.penetrationPct}% penetration</span>
                </div>
              </div>

              {/* Sensitivity Range Scenarios */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 text-xs">
                <span className="font-semibold text-slate-300 block">Sensitivity Range Scenarios:</span>
                <div className="flex justify-between items-center py-1 border-b border-slate-800 text-[11px]">
                  <span className="text-slate-400">Conservative (-40% adoption):</span>
                  <span className="font-bold font-mono text-slate-300">${sizingResults.lowEstimate.toLocaleString()} ARR</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800 text-[11px]">
                  <span className="text-emerald-400 font-medium">Base Scenario:</span>
                  <span className="font-bold font-mono text-emerald-300">${sizingResults.baseEstimate.toLocaleString()} ARR</span>
                </div>
                <div className="flex justify-between items-center py-1 text-[11px]">
                  <span className="text-slate-400">Optimistic (+50% expansion):</span>
                  <span className="font-bold font-mono text-slate-300">${sizingResults.highEstimate.toLocaleString()} ARR</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 text-[10px] text-slate-500 leading-normal border border-slate-800">
                <strong>Disclaimer:</strong> {sizingResults.formulaNotice}. These calculations are sensitivity guides, not guaranteed venture revenue.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Interview */}
      {showAddInterviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0c1322] border border-slate-700 rounded-2xl shadow-2xl p-6 text-xs text-slate-300 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white">Log Customer Discovery Interview</h3>
            
            <form onSubmit={handleCreateInterview} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-200 font-medium mb-1">Clinician Name *</label>
                  <input
                    type="text"
                    required
                    value={newInterview.clinicianName}
                    onChange={(e) => setNewInterview({ ...newInterview, clinicianName: e.target.value })}
                    placeholder="e.g. Dr. Alex Mercer, PT"
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-200 font-medium mb-1">Clinic Name</label>
                  <input
                    type="text"
                    value={newInterview.clinicName}
                    onChange={(e) => setNewInterview({ ...newInterview, clinicName: e.target.value })}
                    placeholder="e.g. Mercer Physical Therapy"
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-200 font-medium mb-1">Direct Quote (Verbatim Pain) *</label>
                <textarea
                  required
                  rows={2}
                  value={newInterview.keyQuote}
                  onChange={(e) => setNewInterview({ ...newInterview, keyQuote: e.target.value })}
                  placeholder="&quot;I spend 2 hours every evening typing Hamstring stretches into WebPT...&quot;"
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-200 font-medium mb-1">Quantified Pain Hours</label>
                  <input
                    type="text"
                    value={newInterview.painQuantified}
                    onChange={(e) => setNewInterview({ ...newInterview, painQuantified: e.target.value })}
                    placeholder="e.g. 2.5 hours every evening"
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-200 font-medium mb-1">Commitment Status</label>
                  <select
                    value={newInterview.commitmentStatus}
                    onChange={(e) => setNewInterview({ ...newInterview, commitmentStatus: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Qualified Discovery">Qualified Discovery</option>
                    <option value="Active 14-Day Pilot">Active 14-Day Pilot</option>
                    <option value="Paid Pilot">Paid Pilot ($199/mo)</option>
                    <option value="Signed LOI">Signed LOI</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddInterviewModal(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg"
                >
                  Save Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
