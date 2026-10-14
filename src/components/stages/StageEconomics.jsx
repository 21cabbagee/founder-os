import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Sliders, 
  Plus, 
  HelpCircle, 
  Layers, 
  Calculator, 
  CheckCircle2, 
  Zap,
  Info
} from 'lucide-react';
import { calculateRunwayAndEconomics } from '../../utils/calculations';

export function StageEconomics({ venture, setVenture, costWatchlist, setCostWatchlist }) {
  // Scenario planner local state
  const [scenarioClinics, setScenarioClinics] = useState(25);
  const [scenarioPrice, setScenarioPrice] = useState(199);
  const [showAddCostModal, setShowAddCostModal] = useState(false);
  const [newCostItem, setNewCostItem] = useState({
    service: '',
    costDriver: '',
    monthlyBudgetLimit: 100,
    currentMonthlyRunRate: 20,
    alertThresholdPct: 75,
    status: 'Healthy'
  });

  // Calculate live economics
  const economics = calculateRunwayAndEconomics(
    venture.cashBalance,
    venture.monthlyRevenue,
    venture.monthlyBurnGross
  );

  // Unit economics calculations
  const grossMarginPct = 94.5;
  const estimatedCac = 450; // Founder-led outbound time + tool software
  const monthlyRevenuePerCustomer = scenarioPrice;
  const paybackMonths = Number((estimatedCac / (monthlyRevenuePerCustomer * (grossMarginPct / 100))).toFixed(1));
  const estimatedLifetimeMonths = 30; // Conservative 2.5 year lifespan for sticky workflow SaaS
  const estimatedLtv = Math.round(monthlyRevenuePerCustomer * estimatedLifetimeMonths * (grossMarginPct / 100));
  const ltvCacRatio = Number((estimatedLtv / estimatedCac).toFixed(1));

  // Scenario totals
  const scenarioMrr = scenarioClinics * scenarioPrice;
  const scenarioArr = scenarioMrr * 12;
  const estimatedVariableCostPerClinic = 12; // Audio transcription + tokens (~$12/clinic/mo)
  const scenarioVariableDeliveryTotal = scenarioClinics * estimatedVariableCostPerClinic;
  const scenarioGrossProfit = scenarioMrr - scenarioVariableDeliveryTotal;

  const handleUpdateVentureNumber = (field, val) => {
    const num = Math.max(0, Number(val) || 0);
    setVenture(prev => ({ ...prev, [field]: num }));
  };

  const handleAddCostItem = (e) => {
    e.preventDefault();
    if (!newCostItem.service) return;
    const item = {
      ...newCostItem,
      monthlyBudgetLimit: Number(newCostItem.monthlyBudgetLimit) || 100,
      currentMonthlyRunRate: Number(newCostItem.currentMonthlyRunRate) || 0,
      alertThresholdPct: Number(newCostItem.alertThresholdPct) || 75
    };
    setCostWatchlist(prev => [...prev, item]);
    setShowAddCostModal(false);
    setNewCostItem({
      service: '',
      costDriver: '',
      monthlyBudgetLimit: 100,
      currentMonthlyRunRate: 20,
      alertThresholdPct: 75,
      status: 'Healthy'
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Guidance Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Stage 06 — Unit Economics & Cash Runway
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Venture Solvency & Variable Delivery Watchlist
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Real founders model transparent cash burn, unit payback, and AI/API variable costs before scaling. 
            All projections are clearly labeled as editable hypotheses, not guaranteed outcomes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-xl border flex items-center gap-2.5 ${
            economics.isDefaultAlive 
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
              : economics.runwayStatus === 'Critical Runway'
              ? 'bg-rose-950/40 border-rose-500/30 text-rose-300'
              : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
          }`}>
            <span className="w-2.5 h-2.5 rounded-full animate-ping bg-current" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider font-semibold opacity-75">Solvency State</div>
              <div className="text-xs font-bold">{economics.runwayStatus} ({economics.runwayMonths} mos)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Cash Balance & Burn Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Cash in Bank</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">
            ${venture.cashBalance?.toLocaleString()}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input 
              type="number"
              value={venture.cashBalance}
              onChange={(e) => handleUpdateVentureNumber('cashBalance', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              title="Edit cash balance"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Adjustable verified bank reserve balance.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Current MRR</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-blue-400">
            ${venture.monthlyRevenue?.toLocaleString()}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input 
              type="number"
              value={venture.monthlyRevenue}
              onChange={(e) => handleUpdateVentureNumber('monthlyRevenue', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              title="Edit monthly recurring revenue"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">4 active clinics @ $199/month.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Gross Monthly Burn</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            ${venture.monthlyBurnGross?.toLocaleString()}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <input 
              type="number"
              value={venture.monthlyBurnGross}
              onChange={(e) => handleUpdateVentureNumber('monthlyBurnGross', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              title="Edit gross monthly burn"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Founder living stipend + software subscriptions.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Net Monthly Burn & Runway</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400">
            ${economics.netBurn?.toLocaleString()} / mo
          </div>
          <div className="mt-3 text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Runway:</span>
            <span className="text-emerald-400 font-bold">{economics.runwayMonths} Months</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 mt-2 overflow-hidden">
            <div 
              className={`h-full ${economics.runwayMonths > 12 ? 'bg-emerald-500' : economics.runwayMonths > 6 ? 'bg-amber-500' : 'bg-rose-500'}`}
              style={{ width: `${Math.min(100, (economics.runwayMonths / 24) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Variable Delivery Cost Watchlist (Deepgram, Claude/GPT, Cloud) */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Variable Delivery Cost Watchlist</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Prevent surprise cloud & AI token bills. Monitor unit usage expenses before scaling marketing.
            </p>
          </div>
          <button
            onClick={() => setShowAddCostModal(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Variable Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {costWatchlist.map((item, idx) => {
            const utilizationPct = Math.round((item.currentMonthlyRunRate / item.monthlyBudgetLimit) * 100);
            const isNearThreshold = utilizationPct >= item.alertThresholdPct;
            return (
              <div key={idx} className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-semibold text-white leading-tight">{item.service}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isNearThreshold
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {isNearThreshold ? 'Caution' : 'Healthy'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4 bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-800">
                    <span className="text-slate-500 font-mono text-[10px] block">Unit Driver:</span>
                    {item.costDriver}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Current Run Rate:</span>
                    <span className="font-bold text-white">${item.currentMonthlyRunRate} / ${item.monthlyBudgetLimit} limit</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full ${isNearThreshold ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(100, utilizationPct)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                    <span>{utilizationPct}% utilized</span>
                    <span>Alert at {item.alertThresholdPct}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Unit Economics & Payback Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Unit Economics & Payback Efficiency</h3>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Based on a single clinic customer subscription vs variable acquisition & delivery costs.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div>
                <div className="text-xs font-semibold text-white">Average Revenue Per Clinic (ARPU)</div>
                <div className="text-[11px] text-slate-500">B2B Micro-SaaS pricing tier</div>
              </div>
              <div className="text-base font-black text-white">${scenarioPrice} / mo</div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div>
                <div className="text-xs font-semibold text-white">Software Gross Margin</div>
                <div className="text-[11px] text-slate-500">After audio transcription & LLM API tokens (~$11/mo)</div>
              </div>
              <div className="text-base font-black text-emerald-400">{grossMarginPct}%</div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div>
                <div className="text-xs font-semibold text-white">Estimated Blended CAC</div>
                <div className="text-[11px] text-slate-500">Founder outbound time (8h @ $50/h equivalent) + Loom</div>
              </div>
              <div className="text-base font-black text-amber-400">${estimatedCac}</div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div>
                <div className="text-xs font-semibold text-white">CAC Payback Speed</div>
                <div className="text-[11px] text-slate-500">CAC ÷ (Monthly Price × Gross Margin %)</div>
              </div>
              <div className="text-base font-black text-blue-400">{paybackMonths} Months</div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div>
                <div className="text-xs font-semibold text-white">Estimated LTV & LTV:CAC Ratio</div>
                <div className="text-[11px] text-slate-500">Assuming 30-month clinical retention lifetime</div>
              </div>
              <div className="text-right">
                <div className="text-base font-black text-purple-400">${estimatedLtv.toLocaleString()}</div>
                <div className="text-[11px] text-emerald-400 font-semibold">{ltvCacRatio}x LTV:CAC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Scenario Planner */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Interactive Scale Scenario</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Simulation Only
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Simulate cash flow inflection points as pilot clinics convert to paid monthly retainers.
            </p>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                  <span>Number of Paid Solo PT Clinics:</span>
                  <span className="font-bold text-white">{scenarioClinics} Clinics</span>
                </div>
                <input 
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={scenarioClinics}
                  onChange={(e) => setScenarioClinics(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>5 (Early Pilot)</span>
                  <span>50 ($10k MRR Milestone)</span>
                  <span>150 (Default Profitable)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                  <span>Subscription Price per Clinic:</span>
                  <span className="font-bold text-white">${scenarioPrice} / month</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[149, 199, 299].map((p) => (
                    <button
                      key={p}
                      onClick={() => setScenarioPrice(p)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        scenarioPrice === p 
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      ${p} / mo
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-slate-800/80 bg-slate-950/40 -mx-6 -mb-6 p-6 rounded-b-2xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-[11px] text-slate-500 uppercase font-semibold">Simulated MRR</div>
                <div className="text-xl font-black text-white mt-1">${scenarioMrr.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 uppercase font-semibold">Simulated ARR</div>
                <div className="text-xl font-black text-emerald-400 mt-1">${scenarioArr.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 uppercase font-semibold">Net Gross Profit</div>
                <div className="text-xl font-black text-blue-400 mt-1">${scenarioGrossProfit.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 text-[11px] text-slate-500 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/60">
              <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>
                At <strong>{scenarioClinics} clinics</strong>, ScribeFlow yields <strong>${(scenarioGrossProfit - venture.monthlyBurnGross).toLocaleString()}</strong> net monthly cash surplus above founder living expenses.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Cost Item Modal */}
      {showAddCostModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 animate-scaleUp">
            <h3 className="text-lg font-bold text-white mb-2">Track New Variable Cost Driver</h3>
            <p className="text-xs text-slate-400 mb-4">
              Add API infrastructure, transcription, or inference vendors to the cost watchlist.
            </p>

            <form onSubmit={handleAddCostItem} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Service / Vendor Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Twilio SMS Verification / Redis Upstash"
                  value={newCostItem.service}
                  onChange={(e) => setNewCostItem({ ...newCostItem, service: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Cost Driver Formula</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. $0.0079 per outbound SMS"
                  value={newCostItem.costDriver}
                  onChange={(e) => setNewCostItem({ ...newCostItem, costDriver: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Monthly Budget Limit ($)</label>
                  <input 
                    type="number"
                    min="10"
                    value={newCostItem.monthlyBudgetLimit}
                    onChange={(e) => setNewCostItem({ ...newCostItem, monthlyBudgetLimit: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Current Run Rate ($)</label>
                  <input 
                    type="number"
                    min="0"
                    value={newCostItem.currentMonthlyRunRate}
                    onChange={(e) => setNewCostItem({ ...newCostItem, currentMonthlyRunRate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddCostModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
