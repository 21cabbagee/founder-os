import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle2, 
  Plus, 
  HelpCircle, 
  Sparkles, 
  Clock, 
  DollarSign, 
  FileText,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function StageWedge({
  productWedge,
  onUpdateProductWedge,
  pipeline,
  onAddPipelineItem,
  onUpdatePipelineItem
}) {
  const [showAddPilotModal, setShowAddPilotModal] = useState(false);
  const [newPilot, setNewPilot] = useState({
    clinicName: '',
    contact: '',
    status: 'Qualified Discovery',
    monthlyFee: 199,
    startDate: new Date().toISOString().split('T')[0],
    noteAcceptanceRatePct: 85,
    notes: ''
  });

  const handleFieldChange = (field, val) => {
    onUpdateProductWedge({
      ...productWedge,
      [field]: val
    });
  };

  const handleCreatePilot = (e) => {
    e.preventDefault();
    if (!newPilot.clinicName.trim()) return;

    onAddPipelineItem({
      id: `pilot-${Date.now()}`,
      ...newPilot
    });

    setNewPilot({
      clinicName: '',
      contact: '',
      status: 'Qualified Discovery',
      monthlyFee: 199,
      startDate: new Date().toISOString().split('T')[0],
      noteAcceptanceRatePct: 85,
      notes: ''
    });
    setShowAddPilotModal(false);
  };

  const handleStatusChange = (id, newStatus) => {
    const item = pipeline.find(p => p.id === id);
    if (item) {
      onUpdatePipelineItem({
        ...item,
        status: newStatus
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. "One-Job / One-Screen" Clarity Canvas */}
      <div className="p-6 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">
                The &quot;One-Job / One-Screen&quot; Wedge Canvas
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Force radical product discipline: do not build a complex 50-feature platform before dominating one single clinical moment
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Clarity Check Passed</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Target User */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <label className="block font-bold text-indigo-300 uppercase tracking-wider text-[11px] mb-1">
              1. One Narrow Target User
            </label>
            <textarea
              rows={2}
              value={productWedge.oneTargetUser}
              onChange={(e) => handleFieldChange('oneTargetUser', e.target.value)}
              className="w-full p-2 bg-[#0c1322] border border-slate-700/80 rounded-lg text-slate-200"
            />
          </div>

          {/* Painful Job */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <label className="block font-bold text-rose-400 uppercase tracking-wider text-[11px] mb-1">
              2. One Painful Job / Friction
            </label>
            <textarea
              rows={2}
              value={productWedge.onePainfulJob}
              onChange={(e) => handleFieldChange('onePainfulJob', e.target.value)}
              className="w-full p-2 bg-[#0c1322] border border-slate-700/80 rounded-lg text-slate-200"
            />
          </div>

          {/* Promised Outcome */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <label className="block font-bold text-emerald-400 uppercase tracking-wider text-[11px] mb-1">
              3. One Promised Outcome
            </label>
            <textarea
              rows={2}
              value={productWedge.onePromisedOutcome}
              onChange={(e) => handleFieldChange('onePromisedOutcome', e.target.value)}
              className="w-full p-2 bg-[#0c1322] border border-slate-700/80 rounded-lg text-slate-200"
            />
          </div>

          {/* Success Metric */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <label className="block font-bold text-cyan-400 uppercase tracking-wider text-[11px] mb-1">
              4. One Measurable Activation Event
            </label>
            <textarea
              rows={2}
              value={productWedge.oneSuccessMetric}
              onChange={(e) => handleFieldChange('oneSuccessMetric', e.target.value)}
              className="w-full p-2 bg-[#0c1322] border border-slate-700/80 rounded-lg text-slate-200"
            />
          </div>
        </div>
      </div>

      {/* 2. Pilot Commitment Pipeline */}
      <div className="p-6 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-sm font-bold text-white">
              Customer Commitment Pipeline ({pipeline.length} Clinics)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verifiable commercial traction: tracking from Qualified Discovery to Paid Pilot ($199/mo)
            </p>
          </div>

          <button
            onClick={() => setShowAddPilotModal(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Pilot Clinic</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 text-xs">
          {pipeline.map((p) => (
            <div key={p.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">{p.clinicName}</span>
                  <span className="text-slate-400 font-normal">({p.contact})</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Started on {p.startDate} • Monthly Pilot Fee: <strong className="text-emerald-400">${p.monthlyFee}/mo</strong>
                </p>
                {p.notes && (
                  <p className="text-slate-300 italic text-[11px] pt-1">
                    &ldquo;{p.notes}&rdquo;
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-3 self-end md:self-auto">
                {p.noteAcceptanceRatePct > 0 && (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Acceptance Rate</span>
                    <span className="font-mono font-bold text-emerald-400">{p.noteAcceptanceRatePct}%</span>
                  </div>
                )}

                <select
                  value={p.status}
                  onChange={(e) => handleStatusChange(p.id, e.target.value)}
                  className="bg-[#0c1322] border border-slate-700 text-xs font-semibold text-indigo-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="Qualified Discovery">Qualified Discovery</option>
                  <option value="Active 14-Day Pilot">Active 14-Day Pilot</option>
                  <option value="Paid Pilot">Paid Pilot ($199/mo)</option>
                  <option value="Signed LOI">Signed LOI</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Add Pilot */}
      {showAddPilotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0c1322] border border-slate-700 rounded-2xl shadow-2xl p-6 text-xs text-slate-300 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white">Add Pilot Commitment Record</h3>
            
            <form onSubmit={handleCreatePilot} className="space-y-3">
              <div>
                <label className="block text-slate-200 font-medium mb-1">Clinic Name *</label>
                <input
                  type="text"
                  required
                  value={newPilot.clinicName}
                  onChange={(e) => setNewPilot({ ...newPilot, clinicName: e.target.value })}
                  placeholder="e.g. Peak Performance Sports PT"
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-200 font-medium mb-1">Contact Lead</label>
                  <input
                    type="text"
                    value={newPilot.contact}
                    onChange={(e) => setNewPilot({ ...newPilot, contact: e.target.value })}
                    placeholder="e.g. Dr. Laura Chen, DPT"
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-200 font-medium mb-1">Status</label>
                  <select
                    value={newPilot.status}
                    onChange={(e) => setNewPilot({ ...newPilot, status: e.target.value })}
                    className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Qualified Discovery">Qualified Discovery</option>
                    <option value="Active 14-Day Pilot">Active 14-Day Pilot</option>
                    <option value="Paid Pilot">Paid Pilot ($199/mo)</option>
                    <option value="Signed LOI">Signed LOI</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-200 font-medium mb-1">Pilot Feedback / Context</label>
                <textarea
                  rows={2}
                  value={newPilot.notes}
                  onChange={(e) => setNewPilot({ ...newPilot, notes: e.target.value })}
                  placeholder="Clinician expectations, requested EHR integrations, or clinical preferences"
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddPilotModal(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
