import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AgentReachModal from './components/AgentReachModal';
import StageDashboard from './components/stages/StageDashboard';
import StageDiscovery from './components/stages/StageDiscovery';
import StageWedge from './components/stages/StageWedge';
import StageDistribution from './components/stages/StageDistribution';
import StageOperations from './components/stages/StageOperations';
import { StageEconomics } from './components/stages/StageEconomics';
import { StageStrategy } from './components/stages/StageStrategy';

import {
  INITIAL_VENTURE,
  INITIAL_OPPORTUNITY,
  INITIAL_INTERVIEWS,
  INITIAL_MARKET_SIZING,
  INITIAL_PRODUCT_WEDGE,
  INITIAL_PILOT_PIPELINE,
  INITIAL_DISTRIBUTION_EXPERIMENTS,
  INITIAL_OUTREACH_TEMPLATE,
  INITIAL_CONTENT_PIPELINE,
  INITIAL_WEEKLY_REVIEW,
  INITIAL_GOAL_MATRIX,
  INITIAL_HABITS,
  INITIAL_SOPS,
  INITIAL_COST_WATCHLIST,
  INITIAL_MOAT_MAP
} from './data/seedData';
import { calculateRunwayAndEconomics } from './utils/calculations';
import { Check, Info, Shield, Radio, Sparkles } from 'lucide-react';

const STORAGE_KEY_PREFIX = 'founderos_v2_';

function getStoredOrDefault(key, fallback) {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.warn(`Failed reading ${key} from localStorage`, err);
    return fallback;
  }
}

export default function App() {
  const [activeStage, setActiveStage] = useState('dashboard');
  const [isAgentReachOpen, setIsAgentReachOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Core State
  const [venture, setVenture] = useState(() => getStoredOrDefault('venture', INITIAL_VENTURE));
  const [opportunity, setOpportunity] = useState(() => getStoredOrDefault('opportunity', INITIAL_OPPORTUNITY));
  const [interviews, setInterviews] = useState(() => getStoredOrDefault('interviews', INITIAL_INTERVIEWS));
  const [marketSizing, setMarketSizing] = useState(() => getStoredOrDefault('marketSizing', INITIAL_MARKET_SIZING));
  const [productWedge, setProductWedge] = useState(() => getStoredOrDefault('productWedge', INITIAL_PRODUCT_WEDGE));
  const [pilots, setPilots] = useState(() => getStoredOrDefault('pilots', INITIAL_PILOT_PIPELINE));
  const [experiments, setExperiments] = useState(() => getStoredOrDefault('experiments', INITIAL_DISTRIBUTION_EXPERIMENTS));
  const [outreachTemplate, setOutreachTemplate] = useState(() => getStoredOrDefault('outreachTemplate', INITIAL_OUTREACH_TEMPLATE));
  const [contentPipeline, setContentPipeline] = useState(() => getStoredOrDefault('contentPipeline', INITIAL_CONTENT_PIPELINE));
  const [weeklyReview, setWeeklyReview] = useState(() => getStoredOrDefault('weeklyReview', INITIAL_WEEKLY_REVIEW));
  const [goalMatrix, setGoalMatrix] = useState(() => getStoredOrDefault('goalMatrix', INITIAL_GOAL_MATRIX));
  const [habits, setHabits] = useState(() => getStoredOrDefault('habits', INITIAL_HABITS));
  const [sops, setSops] = useState(() => getStoredOrDefault('sops', INITIAL_SOPS));
  const [costWatchlist, setCostWatchlist] = useState(() => getStoredOrDefault('costWatchlist', INITIAL_COST_WATCHLIST));
  const [moatMap, setMoatMap] = useState(() => getStoredOrDefault('moatMap', INITIAL_MOAT_MAP));

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'venture', JSON.stringify(venture));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'opportunity', JSON.stringify(opportunity));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'interviews', JSON.stringify(interviews));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'marketSizing', JSON.stringify(marketSizing));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'productWedge', JSON.stringify(productWedge));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'pilots', JSON.stringify(pilots));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'experiments', JSON.stringify(experiments));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'outreachTemplate', JSON.stringify(outreachTemplate));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'contentPipeline', JSON.stringify(contentPipeline));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'weeklyReview', JSON.stringify(weeklyReview));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'goalMatrix', JSON.stringify(goalMatrix));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'habits', JSON.stringify(habits));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'sops', JSON.stringify(sops));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'costWatchlist', JSON.stringify(costWatchlist));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'moatMap', JSON.stringify(moatMap));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [
    venture,
    opportunity,
    interviews,
    marketSizing,
    productWedge,
    pilots,
    experiments,
    outreachTemplate,
    contentPipeline,
    weeklyReview,
    goalMatrix,
    habits,
    sops,
    costWatchlist,
    moatMap
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset all Founder OS data back to pristine canonical ScribeFlow seed data?')) {
      localStorage.clear();
      setVenture(INITIAL_VENTURE);
      setOpportunity(INITIAL_OPPORTUNITY);
      setInterviews(INITIAL_INTERVIEWS);
      setMarketSizing(INITIAL_MARKET_SIZING);
      setProductWedge(INITIAL_PRODUCT_WEDGE);
      setPilots(INITIAL_PILOT_PIPELINE);
      setExperiments(INITIAL_DISTRIBUTION_EXPERIMENTS);
      setOutreachTemplate(INITIAL_OUTREACH_TEMPLATE);
      setContentPipeline(INITIAL_CONTENT_PIPELINE);
      setWeeklyReview(INITIAL_WEEKLY_REVIEW);
      setGoalMatrix(INITIAL_GOAL_MATRIX);
      setHabits(INITIAL_HABITS);
      setSops(INITIAL_SOPS);
      setCostWatchlist(INITIAL_COST_WATCHLIST);
      setMoatMap(INITIAL_MOAT_MAP);
      showToast('Reset to canonical ScribeFlow demonstration data');
    }
  };

  // State update helpers
  const handleAddInterview = (interview) => {
    setInterviews(prev => [interview, ...prev]);
    showToast(`Logged discovery interview with ${interview.clinicianName}`);
  };

  const handleAddPilot = (pilot) => {
    setPilots(prev => [pilot, ...prev]);
    showToast(`Added clinic to pilot pipeline: ${pilot.clinicName}`);
  };

  const handleUpdatePilot = (idx, updated) => {
    setPilots(prev => {
      const next = [...prev];
      next[idx] = updated;
      return next;
    });
  };

  const handleAddExperiment = (exp) => {
    setExperiments(prev => [exp, ...prev]);
    showToast(`Created bounded experiment: ${exp.channel}`);
  };

  const handleAddContentItem = (item) => {
    setContentPipeline(prev => [item, ...prev]);
    showToast(`Added content piece: ${item.title}`);
  };

  const handleUpdateHabit = (idx, updated) => {
    setHabits(prev => {
      const next = [...prev];
      next[idx] = updated;
      return next;
    });
  };

  const runwayInfo = calculateRunwayAndEconomics(
    venture.cashBalance,
    venture.monthlyRevenue,
    venture.monthlyBurnGross
  );

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Primary Sticky Header & Stage Stepper */}
      <Header
        venture={venture}
        activeStage={activeStage}
        onSelectStage={setActiveStage}
        onResetDemo={handleResetDemo}
        onOpenAgentReach={() => setIsAgentReachOpen(true)}
        onExportBrief={() => setActiveStage('strategy')}
        runwayInfo={runwayInfo}
      />

      {/* Main Workspace Stage Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeStage === 'dashboard' && (
          <StageDashboard
            venture={venture}
            opportunity={opportunity}
            interviews={interviews}
            pipeline={pilots}
            weeklyReview={weeklyReview}
            runwayInfo={runwayInfo}
            onNavigateStage={setActiveStage}
          />
        )}

        {activeStage === 'discovery' && (
          <StageDiscovery
            opportunity={opportunity}
            onUpdateOpportunity={setOpportunity}
            interviews={interviews}
            onAddInterview={handleAddInterview}
            marketSizing={marketSizing}
            onUpdateMarketSizing={setMarketSizing}
            onOpenAgentReach={() => setIsAgentReachOpen(true)}
          />
        )}

        {activeStage === 'wedge' && (
          <StageWedge
            productWedge={productWedge}
            onUpdateProductWedge={setProductWedge}
            pipeline={pilots}
            onAddPipelineItem={handleAddPilot}
            onUpdatePipelineItem={handleUpdatePilot}
          />
        )}

        {activeStage === 'distribution' && (
          <StageDistribution
            experiments={experiments}
            onAddExperiment={handleAddExperiment}
            outreachTemplate={outreachTemplate}
            onUpdateOutreachTemplate={setOutreachTemplate}
            contentPipeline={contentPipeline}
            onAddContentItem={handleAddContentItem}
          />
        )}

        {activeStage === 'operations' && (
          <StageOperations
            weeklyReview={weeklyReview}
            onUpdateWeeklyReview={setWeeklyReview}
            goalMatrix={goalMatrix}
            onUpdateGoalMatrix={setGoalMatrix}
            habits={habits}
            onUpdateHabit={handleUpdateHabit}
            sops={sops}
          />
        )}

        {activeStage === 'economics' && (
          <StageEconomics
            venture={venture}
            setVenture={setVenture}
            costWatchlist={costWatchlist}
            setCostWatchlist={setCostWatchlist}
          />
        )}

        {activeStage === 'strategy' && (
          <StageStrategy
            venture={venture}
            opportunity={opportunity}
            interviews={interviews}
            experiments={experiments}
            pilots={pilots}
            outreachTemplate={outreachTemplate}
            costWatchlist={costWatchlist}
            moatMap={moatMap}
            setMoatMap={setMoatMap}
          />
        )}
      </main>

      {/* Footer / Operating Status Bar */}
      <footer className="border-t border-slate-900 bg-[#060911] text-xs text-slate-500 py-4 px-4 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Founder OS Active</span>
            </span>
            <span className="text-slate-700">•</span>
            <span>Local State Synchronized</span>
            <span className="text-slate-700">•</span>
            <span>Venture: <strong className="text-slate-300">{venture.name}</strong></span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => setIsAgentReachOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              <Radio className="w-3 h-3 text-indigo-400" />
              Agent Reach Intelligence
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveStage('strategy')}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              GTM Export
            </button>
          </div>
        </div>
      </footer>

      {/* Agent Reach Modal Overlay */}
      <AgentReachModal 
        isOpen={isAgentReachOpen} 
        onClose={() => setIsAgentReachOpen(false)} 
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-indigo-950/90 border border-indigo-500/40 text-white text-xs font-semibold shadow-2xl backdrop-blur-md animate-slideUp">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
