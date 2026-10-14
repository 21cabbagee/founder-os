import React, { useState } from 'react';
import { 
  Network, 
  Zap, 
  Shield, 
  Activity, 
  Sliders, 
  Terminal, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Key, 
  Send,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  INITIAL_GATEWAY_PROVIDERS, 
  GATEWAY_STRATEGIES, 
  routeGatewayRequest, 
  calculateAggregateCapacity 
} from '../../services/gatewayService';

export default function GatewayManagerView() {
  const [providers, setProviders] = useState(INITIAL_GATEWAY_PROVIDERS);
  const [selectedStrategy, setSelectedStrategy] = useState('auto/fast');
  const [useGateway, setUseGateway] = useState(true);
  const [testPrompt, setTestPrompt] = useState('Extract orthopedic diagnosis codes from: "Patient has 3+/5 knee extension with anterior cruciate laxity"');
  const [executionResult, setExecutionResult] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const capacity = calculateAggregateCapacity(providers);

  const handleTestRoute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const result = routeGatewayRequest(testPrompt, selectedStrategy, providers, useGateway);
      setExecutionResult(result);
      setIsExecuting(false);
    }, 350);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5" />
              FreeLLMAPI & OmniRoute Multi-Provider Gateway
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Unified Free-Tier LLM Quota Pool
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            A single free account hits rate limits in minutes. But Groq, Cerebras, Google AI Studio, and Mistral are independent. 
            Stack them behind one endpoint (<code className="text-indigo-400 font-mono">localhost:3001/v1</code> or <code className="text-indigo-400 font-mono">localhost:20128/v1</code>) for combined capacity and automatic failover.
          </p>
        </div>

        {/* Off-ramp toggle */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-2 rounded-xl">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Gateway Mode</div>
            <div className="text-xs font-bold text-white">{useGateway ? 'Free Tier Pool' : 'Direct Paid Frontier'}</div>
          </div>
          <button
            onClick={() => setUseGateway(!useGateway)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${useGateway ? 'bg-emerald-600' : 'bg-indigo-600'}`}
            title="Toggle between FreeLLMAPI gateway and direct paid frontier endpoint"
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${useGateway ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* Aggregate Capacity Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
          <div className="text-xs text-slate-400 mb-1">Combined Daily Limit</div>
          <div className="text-2xl font-black text-white">
            {capacity.totalRpd.toLocaleString()} <span className="text-xs font-normal text-slate-500">req/day</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Combined across 5 independent provider tiers.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
          <div className="text-xs text-slate-400 mb-1">Remaining Quota Today</div>
          <div className="text-2xl font-black text-emerald-400">
            {capacity.remainingRpd.toLocaleString()} <span className="text-xs font-normal text-slate-500">requests</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div className="bg-emerald-500 h-full" style={{ width: `${100 - capacity.percentUsed}%` }} />
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
          <div className="text-xs text-slate-400 mb-1">Peak Concurrency (RPM)</div>
          <div className="text-2xl font-black text-blue-400">
            {capacity.totalRpm} <span className="text-xs font-normal text-slate-500">requests / min</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Permits parallel agent task execution without 429s.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
          <div className="text-xs text-slate-400 mb-1">Token Throughput (TPM)</div>
          <div className="text-2xl font-black text-purple-400">
            {(capacity.totalTpm / 1000).toFixed(0)}k <span className="text-xs font-normal text-slate-500">tokens / min</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Sufficient for comprehensive clinical SOAP processing.</p>
        </div>
      </div>

      {/* Connected Providers Vault */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Connected Providers & Quota Health</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Local AES-256-GCM Vault</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {providers.map((p) => {
            const rpdPercent = Math.round((p.currentUsage.rpd / p.rateLimits.rpd) * 100);
            return (
              <div key={p.id} className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white">{p.name}</h4>
                      <div className="text-[11px] text-indigo-400 font-mono mt-0.5">{p.defaultModel}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4 bg-slate-900/50 p-2.5 rounded-lg border border-slate-850">
                    {p.strengths}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-900">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Daily Quota:</span>
                      <span className="font-bold text-white">{p.currentUsage.rpd} / {p.rateLimits.rpd}</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: `${rpdPercent}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Latency: <strong className="text-slate-300">{p.latencyMs}ms</strong></span>
                    <span>Key: <code className="text-slate-400">{p.maskedKey}</code></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategy Selector & Live Interactive Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strategy selector */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Smart Routing Strategy</h3>
          </div>
          <p className="text-xs text-slate-400 mb-5">
            Choose how the gateway routes incoming agent queries across independent providers.
          </p>

          <div className="space-y-3">
            {GATEWAY_STRATEGIES.map((strat) => (
              <div
                key={strat.id}
                onClick={() => setSelectedStrategy(strat.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedStrategy === strat.id
                    ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md'
                    : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{strat.name}</span>
                  {selectedStrategy === strat.id && (
                    <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{strat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Test Console */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Live Endpoint Execution & Telemetry</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">port: {useGateway ? '3001 / 20128' : 'direct'}</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Test prompt routing and inspect real <code className="text-indigo-400">X-Routed-Via</code> header telemetry.
            </p>

            <textarea
              value={testPrompt}
              onChange={(e) => setTestPrompt(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none font-mono"
            />

            <button
              onClick={handleTestRoute}
              disabled={isExecuting}
              className="mt-3 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isExecuting ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              Dispatch via Gateway
            </button>
          </div>

          {/* Telemetry Output Box */}
          {executionResult && (
            <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center text-[11px] text-slate-400 border-b border-slate-900 pb-2">
                <span>Routed Provider: <strong className="text-white">{executionResult.providerUsed}</strong></span>
                <span className="text-emerald-400 font-bold">{executionResult.latencyMs} ms</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">X-Routed-Via:</span>
                <span className="text-indigo-300 text-[11px]">{executionResult.xRoutedVia}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">X-OmniRoute-Decision:</span>
                <span className="text-slate-400 text-[10px] break-all">{executionResult.xOmniRouteDecision}</span>
              </div>
              <div className="pt-2 border-t border-slate-900 flex justify-between text-[11px]">
                <span className="text-slate-400">Estimated Cost:</span>
                <span className="text-emerald-400 font-bold">{executionResult.costEstimate}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
