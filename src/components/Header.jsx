import React from 'react';
import { 
  Compass, 
  Search, 
  Target, 
  Send, 
  CheckCircle2, 
  BarChart3, 
  ShieldAlert, 
  RotateCcw, 
  Radio, 
  Download, 
  Flame, 
  DollarSign, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const STAGES = [
  { id: 'dashboard', label: 'Dashboard', desc: 'Operating Overview', icon: Compass },
  { id: 'discovery', label: 'Market & Discovery', desc: 'Interviews & Sizing', icon: Search },
  { id: 'wedge', label: 'Product Wedge', desc: 'One-Job & Pilots', icon: Target },
  { id: 'distribution', label: 'Distribution & GTM', desc: 'Experiments & Outreach', icon: Send },
  { id: 'operations', label: 'Execution & Rhythm', desc: 'Weekly Plan & SOPs', icon: CheckCircle2 },
  { id: 'economics', label: 'Unit Economics', desc: 'Runway & Cost Watch', icon: DollarSign },
  { id: 'strategy', label: 'Moat & Strategy', desc: 'Defensibility & GTM', icon: ShieldAlert }
];

export default function Header({
  venture,
  activeStage,
  onSelectStage,
  onResetDemo,
  onOpenAgentReach,
  onExportBrief,
  runwayInfo
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#070b14]/95 backdrop-blur-md border-b border-slate-800">
      {/* Top Strip: Venture identity & Vital Signs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Venture Identifier */}
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold tracking-tight text-white text-sm sm:text-base">Founder OS</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                {venture.name} • {venture.category}
              </p>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-800 hidden md:block" />

          {/* Current Stage Badge */}
          <div className="hidden lg:flex items-center space-x-2">
            <span className="text-xs text-slate-400">Current Phase:</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{venture.currentStage}</span>
            </span>
          </div>
        </div>

        {/* Vital Health Metrics & Fast Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Runway Pill */}
          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Runway:</span>
            <span className="font-bold text-white">
              {typeof runwayInfo.runwayMonths === 'number' ? `${runwayInfo.runwayMonths} mos` : runwayInfo.runwayMonths}
            </span>
          </div>

          {/* Agent Reach Trigger */}
          <button
            onClick={onOpenAgentReach}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition"
            title="Agent Reach Market Intelligence status & web query tools"
          >
            <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="hidden sm:inline">Agent Reach</span>
          </button>

          {/* Export GTM Playbook */}
          <button
            onClick={onExportBrief}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 transition"
            title="Export Full GTM Playbook & Validation Brief"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export GTM</span>
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={onResetDemo}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition"
            title="Reset to initial pristine seed data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stage Stepper: Dashboard -> Discovery -> Wedge -> Distribution -> Operations -> Economics -> Strategy */}
      <div className="border-t border-slate-800/80 bg-[#090e1a]/80 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-1 py-1.5 min-w-max">
          {STAGES.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStage === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectStage(s.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{idx + 1}. {s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
