import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Grid, 
  Flame, 
  FileCheck, 
  Plus, 
  Check, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function StageOperations({
  weeklyReview,
  onUpdateWeeklyReview,
  goalMatrix,
  onUpdateGoalMatrix,
  habits,
  onUpdateHabit,
  sops
}) {
  const [activeTab, setActiveTab] = useState('weekly'); // 'weekly' | 'matrix' | 'habits' | 'sops'

  const handleTogglePriority = (idx) => {
    const updatedPriorities = [...weeklyReview.priorities];
    updatedPriorities[idx] = {
      ...updatedPriorities[idx],
      done: !updatedPriorities[idx].done
    };
    onUpdateWeeklyReview({
      ...weeklyReview,
      priorities: updatedPriorities
    });
  };

  const handlePillarChange = (idx, field, val) => {
    const updatedPillars = [...goalMatrix.pillars];
    updatedPillars[idx] = {
      ...updatedPillars[idx],
      [field]: val
    };
    onUpdateGoalMatrix({
      ...goalMatrix,
      pillars: updatedPillars
    });
  };

  const handleIncrementStreak = (habitId) => {
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      onUpdateHabit({
        ...habit,
        currentStreakDays: habit.currentStreakDays + 1
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0c1322] border border-slate-800">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'weekly'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Weekly Cadence & Review</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'matrix'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>9×9 Goal Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('habits')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'habits'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Habit Engine ({habits.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sops')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === 'sops'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>SOP Library ({sops.length})</span>
          </button>
        </div>

        <span className="text-xs text-slate-400 font-medium">
          {weeklyReview.weekLabel}
        </span>
      </div>

      {/* Tab 1: Weekly Cadence & Review */}
      {activeTab === 'weekly' && (
        <div className="space-y-5">
          {/* Focus of the Week Card */}
          <div className="p-5 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
              Primary Objective This Week
            </span>
            <input
              type="text"
              value={weeklyReview.primaryFocus}
              onChange={(e) => onUpdateWeeklyReview({ ...weeklyReview, primaryFocus: e.target.value })}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Priorities Checklist */}
          <div className="p-5 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Execution Priorities (Keep to 3–5 Critical Tasks)
              </h3>
              <span className="text-xs text-slate-400">
                {weeklyReview.priorities.filter(p => p.done).length} / {weeklyReview.priorities.length} Done
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {weeklyReview.priorities.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleTogglePriority(idx)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    item.done
                      ? 'bg-slate-950/40 border-slate-800/60 text-slate-500'
                      : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={item.done}
                      readOnly
                      className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
                    />
                    <span className={item.done ? 'line-through' : 'font-medium'}>
                      {item.text}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-[#0c1322] border border-slate-800">
                    Owner: {item.owner}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Blockers & Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 block text-xs">Active Blockers & Friction</span>
              <textarea
                rows={3}
                value={weeklyReview.blockers}
                onChange={(e) => onUpdateWeeklyReview({ ...weeklyReview, blockers: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200"
              />
            </div>

            <div className="p-5 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 block text-xs">What Was Learned (Truth & Evidence)</span>
              <textarea
                rows={3}
                value={weeklyReview.whatWasLearned}
                onChange={(e) => onUpdateWeeklyReview({ ...weeklyReview, whatWasLearned: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 9x9 Goal Matrix */}
      {activeTab === 'matrix' && (
        <div className="p-6 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">
              9×9 Goal Matrix (Central Objective & 8 Enabling Pillars)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Connect everyday tactical actions to the high-stakes north-star goal
            </p>
          </div>

          {/* Central Objective Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-900/60 to-violet-900/60 border border-indigo-500/40 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Central Business Objective</span>
            <input
              type="text"
              value={goalMatrix.centralObjective}
              onChange={(e) => onUpdateGoalMatrix({ ...goalMatrix, centralObjective: e.target.value })}
              className="w-full p-2 bg-transparent text-center text-sm sm:text-base font-bold text-white focus:outline-none"
            />
          </div>

          {/* 8 Enabling Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {goalMatrix.pillars.map((pillar, idx) => (
              <div key={pillar.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-300 block text-[11px]">
                  Pillar {idx + 1}: {pillar.title}
                </span>
                <textarea
                  rows={2}
                  value={pillar.action}
                  onChange={(e) => handlePillarChange(idx, 'action', e.target.value)}
                  className="w-full p-2 bg-[#0c1322] border border-slate-800 rounded-lg text-slate-200 text-[11px]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Habit Engine */}
      {activeTab === 'habits' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-[#0c1322] border border-slate-800 text-xs text-slate-300">
            Anchor daily actions to stable context cues. Consistency compounds outcomes.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habits.map((habit) => (
              <div key={habit.id} className="p-5 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-2">
                    <span className="text-xs font-semibold text-slate-400">
                      Cadence: {habit.frequency}
                    </span>
                    <span className="flex items-center space-x-1 font-bold text-amber-400 text-xs px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{habit.currentStreakDays} Day Streak</span>
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Context Cue:</span>
                      <p className="text-indigo-300 font-medium">{habit.cueContext}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Action Routine:</span>
                      <p className="text-white font-medium">{habit.actionRoutine}</p>
                    </div>
                    {habit.reflection && (
                      <p className="text-slate-400 text-[11px] italic pt-1">&ldquo;{habit.reflection}&rdquo;</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleIncrementStreak(habit.id)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Mark Executed Today (+1 Day)</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: SOP Library */}
      {activeTab === 'sops' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {sops.map((sop) => (
              <div key={sop.id} className="p-5 rounded-2xl bg-[#0c1322] border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-2.5 gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">{sop.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Cadence: {sop.cadence} • Owner: {sop.owner} • Last Updated: {sop.lastUpdated}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  {sop.steps.map((step, sIdx) => (
                    <div key={sIdx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start space-x-2 text-slate-300">
                      <span className="w-5 h-5 rounded-md bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
