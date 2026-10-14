import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Film, 
  Plus, 
  Copy, 
  Check, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Layers, 
  Eye, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function StageDistribution({
  experiments,
  onAddExperiment,
  outreachTemplate,
  onUpdateOutreachTemplate,
  contentPipeline,
  onAddContentItem
}) {
  const [activeTab, setActiveTab] = useState('experiments'); // 'experiments' | 'outreach' | 'content'
  const [copiedOutreach, setCopiedOutreach] = useState(false);
  const [showAddExpModal, setShowAddExpModal] = useState(false);

  // New Experiment Form
  const [newExp, setNewExp] = useState({
    channel: 'Founder-Led Video Outbound',
    targetAudience: 'Solo Practice Owners (NPI Registry)',
    hypothesis: '',
    weeklyBudget: 100,
    timeBudgetHours: 6,
    status: 'Planned',
    leadingMetricTarget: '20 outreach touches / week',
    leadingMetricObserved: '0 touches sent',
    conversionsObserved: '0 calls booked',
    learnings: ''
  });

  const handleCopyOutreach = () => {
    const text = `Subject: ${outreachTemplate.subject}\n\nHi {{ClinicianFirstName}},\n\n${outreachTemplate.observation}\n\n${outreachTemplate.specificValue}\n\n${outreachTemplate.lowFrictionAsk}\n\n${outreachTemplate.optOutCompliance}`;
    navigator.clipboard.writeText(text);
    setCopiedOutreach(true);
    setTimeout(() => setCopiedOutreach(false), 2000);
  };

  const handleCreateExperiment = (e) => {
    e.preventDefault();
    if (!newExp.channel.trim() || !newExp.hypothesis.trim()) return;

    onAddExperiment({
      id: `dist-exp-${Date.now()}`,
      ...newExp
    });

    setNewExp({
      channel: 'Founder-Led Video Outbound',
      targetAudience: 'Solo Practice Owners (NPI Registry)',
      hypothesis: '',
      weeklyBudget: 100,
      timeBudgetHours: 6,
      status: 'Planned',
      leadingMetricTarget: '20 outreach touches / week',
      leadingMetricObserved: '0 touches sent',
      conversionsObserved: '0 calls booked',
      learnings: ''
    });
    setShowAddExpModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0c1322] border border-slate-800">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('experiments')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'experiments'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Channel Experiments ({experiments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('outreach')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'outreach'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Ethical Outreach Composer</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'content'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Content Pipeline ({contentPipeline.length})</span>
          </button>
        </div>

        {activeTab === 'experiments' && (
          <button
            onClick={() => setShowAddExpModal(true)}
            className="flex items-center space-x-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Plan Channel Experiment</span>
          </button>
        )}
      </div>

      {/* Tab 1: Channel Experiments */}
      {activeTab === 'experiments' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {experiments.map((exp) => (
              <div key={exp.id} className="p-5 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-2.5 gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <span>{exp.channel}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {exp.status}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Audience: {exp.targetAudience}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                      Budget: <strong>${exp.weeklyBudget}/wk</strong> • {exp.timeBudgetHours}h time
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-slate-200 block mb-0.5">Core Hypothesis:</strong>
                  <p className="leading-relaxed">{exp.hypothesis}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
                    <span className="font-semibold text-slate-400 block mb-0.5">Leading Metric Observed:</span>
                    <p className="text-white font-medium">{exp.leadingMetricObserved}</p>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Target: {exp.leadingMetricTarget}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
                    <span className="font-semibold text-emerald-400 block mb-0.5">Conversions / Outcomes:</span>
                    <p className="text-white font-medium">{exp.conversionsObserved}</p>
                    {exp.learnings && (
                      <span className="text-[10px] text-slate-400 block mt-0.5 italic">Learning: {exp.learnings}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Ethical Outreach Composer */}
      {activeTab === 'outreach' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Editor (6 cols) */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Ethical Outreach Architecture
                </h3>
                <p className="text-xs text-slate-400">
                  Zero spam, zero fake familiarity, 100% verified clinical value
                </p>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Subject Line</label>
                <input
                  type="text"
                  value={outreachTemplate.subject}
                  onChange={(e) => onUpdateOutreachTemplate({ ...outreachTemplate, subject: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  1. Genuine Specific Observation (Proof of Homework)
                </label>
                <textarea
                  rows={2}
                  value={outreachTemplate.observation}
                  onChange={(e) => onUpdateOutreachTemplate({ ...outreachTemplate, observation: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  2. Specific Verifiable Value (No Hallucinated Claims)
                </label>
                <textarea
                  rows={2}
                  value={outreachTemplate.specificValue}
                  onChange={(e) => onUpdateOutreachTemplate({ ...outreachTemplate, specificValue: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  3. Low-Friction Next Step (Not a 30-Minute Sales Call)
                </label>
                <input
                  type="text"
                  value={outreachTemplate.lowFrictionAsk}
                  onChange={(e) => onUpdateOutreachTemplate({ ...outreachTemplate, lowFrictionAsk: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  4. Explicit Opt-Out & Compliance Reminder
                </label>
                <input
                  type="text"
                  value={outreachTemplate.optOutCompliance}
                  onChange={(e) => onUpdateOutreachTemplate({ ...outreachTemplate, optOutCompliance: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>
            </div>
          </div>

          {/* Live Preview & One-Click Copy (6 cols) */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Email / InMail Preview
              </span>
              <button
                onClick={handleCopyOutreach}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
              >
                {copiedOutreach ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedOutreach ? 'Copied Template!' : 'Copy Script'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono space-y-3 leading-relaxed">
              <div className="text-slate-400 border-b border-slate-900 pb-2">
                <strong>Subject:</strong> {outreachTemplate.subject}
              </div>
              <p>Hi Dr. Vance,</p>
              <p>{outreachTemplate.observation}</p>
              <p>{outreachTemplate.specificValue}</p>
              <p>{outreachTemplate.lowFrictionAsk}</p>
              <p className="text-slate-500 text-[11px] pt-2 border-t border-slate-900 italic">
                {outreachTemplate.optOutCompliance}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Content Batching Pipeline */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contentPipeline.map((cnt) => (
              <div key={cnt.id} className="p-5 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {cnt.stage}
                    </span>
                    <span className="text-[10px] text-slate-500">{cnt.format}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">
                    {cnt.title}
                  </h4>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between font-mono">
                    <span>Views: {cnt.impressions.toLocaleString()}</span>
                    <span className="text-emerald-400 font-semibold">{cnt.leadsGenerated} Inbound Leads</span>
                  </div>
                  {cnt.learnings && (
                    <p className="text-[10px] text-slate-500 italic pt-1">{cnt.learnings}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add Experiment */}
      {showAddExpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0c1322] border border-slate-700 rounded-2xl shadow-2xl p-6 text-xs text-slate-300 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white">Plan Bounded Channel Experiment</h3>
            
            <form onSubmit={handleCreateExperiment} className="space-y-3">
              <div>
                <label className="block text-slate-200 font-medium mb-1">Channel Name *</label>
                <input
                  type="text"
                  required
                  value={newExp.channel}
                  onChange={(e) => setNewExp({ ...newExp, channel: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-medium mb-1">Audience & Offer</label>
                <input
                  type="text"
                  value={newExp.targetAudience}
                  onChange={(e) => setNewExp({ ...newExp, targetAudience: e.target.value })}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-medium mb-1">Test Hypothesis *</label>
                <textarea
                  required
                  rows={2}
                  value={newExp.hypothesis}
                  onChange={(e) => setNewExp({ ...newExp, hypothesis: e.target.value })}
                  placeholder="If we send 30 personalized Loom audits, 7 clinics will book a demo."
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-200 font-medium mb-1">Weekly Budget ($)</label>
                  <input
                    type="number"
                    value={newExp.weeklyBudget}
                    onChange={(e) => setNewExp({ ...newExp, weeklyBudget: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-200 font-medium mb-1">Time Budget (Hours)</label>
                  <input
                    type="number"
                    value={newExp.timeBudgetHours}
                    onChange={(e) => setNewExp({ ...newExp, timeBudgetHours: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddExpModal(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg"
                >
                  Save Experiment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
