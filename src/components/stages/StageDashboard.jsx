import React from 'react';
import { 
  Target, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Flame, 
  Users, 
  DollarSign, 
  ArrowRight, 
  Activity, 
  Sparkles,
  Layers,
  FileText,
  Clock
} from 'lucide-react';
import { calculateOpportunityScore } from '../../utils/calculations';

export default function StageDashboard({
  venture,
  opportunity,
  interviews,
  pipeline,
  weeklyReview,
  runwayInfo,
  onNavigateStage
}) {
  const oppResults = calculateOpportunityScore(opportunity.scores || {});
  const paidPilotsCount = pipeline.filter(p => p.status === 'Paid Pilot').length;
  const activePilotsCount = pipeline.filter(p => p.status.includes('Pilot')).length;
  const avgAcceptanceRate = Math.round(
    pipeline.filter(p => p.noteAcceptanceRatePct > 0).reduce((acc, p) => acc + p.noteAcceptanceRatePct, 0) /
    (pipeline.filter(p => p.noteAcceptanceRatePct > 0).length || 1)
  );

  return (
    <div className="space-y-6">
      {/* Action-Oriented Hero: What Matters Now */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-[#0c1322] to-[#070b14] border border-indigo-500/30 shadow-xl shadow-indigo-950/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                ACTIVE FOCUS
              </span>
              <span className="text-xs text-slate-400">
                Founder: {venture.founder}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {venture.northStarGoal}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              <strong>Next Action Due:</strong> {weeklyReview.primaryFocus}
            </p>
          </div>

          <button
            onClick={() => onNavigateStage('wedge')}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center space-x-2 transition shadow-lg shadow-indigo-600/30 self-start lg:self-center"
          >
            <span>Review Pilot Pipeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5 Vital Signs Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* MRR */}
        <div className="p-4 rounded-xl bg-[#0c1322] border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Monthly Revenue</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-white">
            ${venture.monthlyRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400 font-medium block mt-0.5">
            {paidPilotsCount} Paid Clinic Partners ($199/mo)
          </span>
        </div>

        {/* Runway */}
        <div className="p-4 rounded-xl bg-[#0c1322] border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Runway Status</span>
            <Flame className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-white">
            {typeof runwayInfo.runwayMonths === 'number' ? `${runwayInfo.runwayMonths} mos` : runwayInfo.runwayMonths}
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Net Burn: ${runwayInfo.netBurn}/mo
          </span>
        </div>

        {/* Opportunity Score */}
        <div className="p-4 rounded-xl bg-[#0c1322] border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Opportunity Score</span>
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-white">
            {oppResults.totalScore} / {oppResults.maxScore}
          </div>
          <span className="text-[10px] text-indigo-300 font-medium block mt-0.5">
            {oppResults.tierLabel.split('—')[1] || oppResults.tierLabel}
          </span>
        </div>

        {/* Discovery Interviews */}
        <div className="p-4 rounded-xl bg-[#0c1322] border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Discovery Verified</span>
            <Users className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-white">
            {interviews.length} Clinics
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            All with quantified pain
          </span>
        </div>

        {/* Clinical Note Acceptance */}
        <div className="p-4 rounded-xl bg-[#0c1322] border border-slate-800 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Note Acceptance</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-emerald-400">
            {avgAcceptanceRate}%
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Target: &gt;85% unedited
          </span>
        </div>
      </div>

      {/* The 4 Core Operating Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. What Evidence Do We Have? */}
        <div className="p-5 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                1. What Evidence Do We Have?
              </h3>
            </div>
            <button
              onClick={() => onNavigateStage('discovery')}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
            >
              View Interviews ({interviews.length})
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {interviews.slice(0, 2).map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>{item.clinicianName}</span>
                  <span className="text-emerald-400 text-[11px] font-mono">{item.commitmentStatus}</span>
                </div>
                <p className="text-slate-300 italic text-[11px]">
                  &ldquo;{item.keyQuote.slice(0, 110)}...&rdquo;
                </p>
                <span className="text-[10px] text-slate-400 block pt-0.5">
                  Quantified Pain: {item.painQuantified}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. What Is Blocked? */}
        <div className="p-5 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                2. What Is Blocked?
              </h3>
            </div>
            <button
              onClick={() => onNavigateStage('operations')}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Operations Review
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300 space-y-2">
            <span className="font-semibold text-amber-300 block">Current Active Blocker:</span>
            <p className="leading-relaxed">
              {weeklyReview.blockers}
            </p>
            <div className="pt-2 border-t border-amber-500/20 text-[11px] text-amber-200/80">
              <strong>Workaround:</strong> Provide offline standalone HTML / TXT copy modal for legacy Windows EHRs.
            </div>
          </div>
        </div>

        {/* 3. What Changed Recently? */}
        <div className="p-5 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                3. What Changed? (Latest Learnings)
              </h3>
            </div>
            <span className="text-[11px] text-slate-500">{weeklyReview.weekLabel}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-2">
            <p className="leading-relaxed">
              {weeklyReview.whatWasLearned}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-indigo-300 font-medium">
              Decision: {weeklyReview.decisionsMade}
            </div>
          </div>
        </div>

        {/* 4. Active Pipeline Health */}
        <div className="p-5 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                4. Pilot Commitment Funnel
              </h3>
            </div>
            <button
              onClick={() => onNavigateStage('wedge')}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Manage Pipeline
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {pipeline.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div>
                  <span className="font-semibold text-white block text-xs">{p.clinicName}</span>
                  <span className="text-[10px] text-slate-400">{p.contact} • Started {p.startDate}</span>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    p.status === 'Paid Pilot'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}>
                    {p.status}
                  </span>
                  {p.noteAcceptanceRatePct > 0 && (
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                      {p.noteAcceptanceRatePct}% accepted
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
