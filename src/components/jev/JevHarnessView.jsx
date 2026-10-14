import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Eye, 
  Calculator, 
  Sliders, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Code2, 
  Info,
  Sparkles,
  Lock,
  Unlock,
  Radio
} from 'lucide-react';
import { 
  VISIBILITY_LEVELS, 
  INITIAL_CONTEXT_CHUNKS, 
  TIERED_TOOL_CATALOG, 
  CONDITIONAL_RULES, 
  calculateRoutingTrap, 
  evaluateSecurityPolicy 
} from '../../services/jevHarness';

export default function JevHarnessView() {
  const [activeTab, setActiveTab] = useState('visibility'); // 'visibility' | 'routing-trap' | 'tools' | 'security'
  const [chunks, setChunks] = useState(INITIAL_CONTEXT_CHUNKS);
  
  // Routing trap parameters (in millions of tokens)
  const [contextX, setContextX] = useState(0.65);
  const [outputY, setOutputY] = useState(0.12);
  const [readZ, setReadZ] = useState(0.23);

  // Security test path
  const [securityTestPath, setSecurityTestPath] = useState('src/billing/stripeWebhook.ts');

  // Selected tool for tiered inspection
  const [selectedToolId, setSelectedToolId] = useState(TIERED_TOOL_CATALOG[0].id);
  const [toolTierLevel, setToolTierLevel] = useState(1); // 1: Snippet, 2: Schema, 3: Docs

  const routingAnalysis = calculateRoutingTrap(contextX, outputY, readZ);
  const securityAnalysis = evaluateSecurityPolicy(securityTestPath);

  // Visibility token calculation
  const originalTotalTokens = chunks.reduce((acc, c) => acc + c.originalTokens, 0);
  const activeTotalTokens = chunks.reduce((acc, c) => {
    const factor = VISIBILITY_LEVELS[c.recommendedVisibility]?.tokenFactor || 1;
    return acc + Math.round(c.originalTokens * factor);
  }, 0);
  const tokenSavingsPct = Math.round(((originalTotalTokens - activeTotalTokens) / originalTotalTokens) * 100);

  const handleUpdateVisibility = (chunkId, newVis) => {
    setChunks(prev => prev.map(c => c.id === chunkId ? { ...c, recommendedVisibility: newVis } : c));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              Jev Engineering for Coding Agents — TypeSafe Blueprint
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Meta-Attention, Typed Decisions & Context Harness
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            "The loop is not where the leverage is. The leverage is in what the harness feeds the model each time it turns." 
            Built around query-aware visibility ladders, tiered tool disclosure, and routing trap avoidance.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('visibility')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'visibility' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Visibility Ladder
          </button>
          <button
            onClick={() => setActiveTab('routing-trap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'routing-trap' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Routing Trap Math
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'tools' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tiered Tools
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'security' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Security Routing
          </button>
        </div>
      </div>

      {/* Tab 1: Visibility Ladder */}
      {activeTab === 'visibility' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-indigo-400" />
                  Query-Aware Visibility Ladder (vs Blind Compaction)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Compaction compresses once before knowing the question and permanently throws away vital details. 
                  The Jev ladder compresses per-query: the same 2,400-line grep is 12 hits for one turn and invisible for the next.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Context Token Footprint</div>
                  <div className="text-sm font-bold text-white">
                    <span className="text-emerald-400 font-black">{activeTotalTokens.toLocaleString()}</span> / {originalTotalTokens.toLocaleString()}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {tokenSavingsPct}% Savings
                </span>
              </div>
            </div>

            {/* Chunks List */}
            <div className="space-y-4 mt-6">
              {chunks.map((chunk) => {
                const currentLevel = VISIBILITY_LEVELS[chunk.recommendedVisibility];
                const chunkTokens = Math.round(chunk.originalTokens * currentLevel.tokenFactor);

                return (
                  <div key={chunk.id} className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-5 hover:border-slate-700 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{chunk.label}</h4>
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {chunk.originalTokens} tokens raw
                          </span>
                        </div>
                        <p className="text-xs text-indigo-300 mt-0.5">
                          Target Query: <span className="italic">"{chunk.relevanceQuery}"</span>
                        </p>
                      </div>

                      {/* Visibility Level Selector */}
                      <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
                        {Object.keys(VISIBILITY_LEVELS).map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => handleUpdateVisibility(chunk.id, lvl)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                              chunk.recommendedVisibility === lvl
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {VISIBILITY_LEVELS[lvl].label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preview Content based on visibility */}
                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 font-mono text-xs text-slate-300">
                      {chunk.recommendedVisibility === 'HIDE' && (
                        <span className="text-slate-500 italic">[DON'T SHOW — 0 tokens passed to LLM for this turn]</span>
                      )}
                      {chunk.recommendedVisibility === 'SHORT' && (
                        <span><strong className="text-emerald-400">[SHORT SUMMARY — ~{chunkTokens} tok]:</strong> {chunk.shortSummary}</span>
                      )}
                      {chunk.recommendedVisibility === 'LONG' && (
                        <span><strong className="text-blue-400">[LONG SUMMARY — ~{chunkTokens} tok]:</strong> {chunk.longSummary}</span>
                      )}
                      {chunk.recommendedVisibility === 'FULL' && (
                        <span><strong className="text-amber-400">[FULL VERBATIM — {chunkTokens} tok]:</strong> {chunk.fullContent}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: The Routing Trap Calculator */}
      {activeTab === 'routing-trap' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
              <Calculator className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-lg font-bold text-white">The Routing Trap Arithmetic (Jev Section II.A)</h3>
                <p className="text-xs text-slate-400">
                  Why delegating work to a cheaper model often costs MORE than staying on the frontier model when KV cache economics are taken into account.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
              {/* Sliders */}
              <div className="space-y-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-semibold mb-2">
                    <span>X: Context Tokens (Millions):</span>
                    <span className="font-mono text-white">{contextX} M tokens</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1.5" 
                    step="0.05"
                    value={contextX}
                    onChange={(e) => setContextX(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-1">Accumulated session transcript size</div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-semibold mb-2">
                    <span>Y: Generated Output Tokens (Millions):</span>
                    <span className="font-mono text-white">{outputY} M tokens</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.02" 
                    max="0.5" 
                    step="0.02"
                    value={outputY}
                    onChange={(e) => setOutputY(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-1">Code and diff tokens written by helper</div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-semibold mb-2">
                    <span>Z: Read Tokens During Work (Millions):</span>
                    <span className="font-mono text-white">{readZ} M tokens</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.05" 
                    max="0.8" 
                    step="0.02"
                    value={readZ}
                    onChange={(e) => setReadZ(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500 mt-1">Command output, grep searches, and file reads</div>
                </div>
              </div>

              {/* Comparison Results */}
              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
                    Cost Formula Comparison
                  </div>

                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Path 1: Pure Frontier (Opus)</div>
                        <div className="text-[11px] font-mono text-slate-400">Formula: 25·Y + 5·Z</div>
                      </div>
                      <div className="text-lg font-black text-white">${routingAnalysis.path1Cost}</div>
                    </div>

                    <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      routingAnalysis.isRoutingTrap 
                        ? 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                        : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    }`}>
                      <div>
                        <div className="text-xs font-bold">Path 2: Naive Routing (Opus → Sonnet → Opus)</div>
                        <div className="text-[11px] font-mono opacity-80">Formula: 3·X + 20·Y + 8·Z + 5·(Y+Z)</div>
                      </div>
                      <div className="text-lg font-black">${routingAnalysis.path2Cost}</div>
                    </div>
                  </div>
                </div>

                <div className={`mt-6 p-4 rounded-xl border text-xs leading-relaxed ${
                  routingAnalysis.isRoutingTrap
                    ? 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                    : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                }`}>
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {routingAnalysis.isRoutingTrap ? <AlertTriangle className="w-4 h-4 text-rose-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    <span>{routingAnalysis.isRoutingTrap ? 'The Routing Trap!' : 'Safe Routing'}</span>
                  </div>
                  {routingAnalysis.verdict}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Tiered Tool Disclosure */}
      {activeTab === 'tools' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
              <Layers className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Tiered Tool Disclosure (Jev Section VII)</h3>
                <p className="text-xs text-slate-400">
                  Instead of dumping 100 tool schemas into the system message, tools are disclosed in 3 tiers. The model sees a cheap map, pays for detail only on what it selects.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Tool list */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Candidate Built-In Tools</div>
                {TIERED_TOOL_CATALOG.map(tool => (
                  <div
                    key={tool.id}
                    onClick={() => setSelectedToolId(tool.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedToolId === tool.id
                        ? 'bg-indigo-950/50 border-indigo-500 text-white'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-mono font-bold text-xs">{tool.name}</div>
                    <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">{tool.tier1Snippet}</div>
                  </div>
                ))}
              </div>

              {/* Tier Inspector */}
              <div className="lg:col-span-2 bg-slate-950/70 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                  <span className="text-xs font-bold text-white">Active Tool: <code className="text-indigo-400 font-mono">{selectedToolId}</code></span>
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                    <button
                      onClick={() => setToolTierLevel(1)}
                      className={`px-2.5 py-1 rounded ${toolTierLevel === 1 ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                    >
                      Tier 1: Snippet
                    </button>
                    <button
                      onClick={() => setToolTierLevel(2)}
                      className={`px-2.5 py-1 rounded ${toolTierLevel === 2 ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                    >
                      Tier 2: Schema
                    </button>
                    <button
                      onClick={() => setToolTierLevel(3)}
                      className={`px-2.5 py-1 rounded ${toolTierLevel === 3 ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                    >
                      Tier 3: Docs
                    </button>
                  </div>
                </div>

                {toolTierLevel === 1 && (
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1">Tier 1: Loaded in cheap global map (~8 tokens)</span>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-850 font-mono text-xs text-emerald-300">
                      {TIERED_TOOL_CATALOG.find(t => t.id === selectedToolId)?.tier1Snippet}
                    </div>
                  </div>
                )}

                {toolTierLevel === 2 && (
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1">Tier 2: Full JSON Argument Schema On Demand (~60 tokens)</span>
                    <pre className="p-3 rounded-lg bg-slate-900 border border-slate-850 font-mono text-xs text-blue-300 overflow-x-auto">
                      {JSON.stringify(TIERED_TOOL_CATALOG.find(t => t.id === selectedToolId)?.tier2Schema, null, 2)}
                    </pre>
                  </div>
                )}

                {toolTierLevel === 3 && (
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1">Tier 3: In-Depth Documentation & Examples (~200 tokens)</span>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-850 text-xs text-slate-300 leading-relaxed">
                      {TIERED_TOOL_CATALOG.find(t => t.id === selectedToolId)?.tier3Docs}
                    </div>
                  </div>
                )}

                {/* Conditional Rules Section */}
                <div className="pt-4 border-t border-slate-900">
                  <div className="text-xs font-bold text-slate-300 mb-2">Conditional Instructions (Pinned Against Compaction)</div>
                  <div className="space-y-2">
                    {CONDITIONAL_RULES.map(rule => (
                      <div key={rule.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-850 text-[11px]">
                        <div className="flex justify-between items-center text-indigo-400 font-mono font-semibold">
                          <span>if ({rule.condition})</span>
                          <span className="text-[9px] bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded">Pinned</span>
                        </div>
                        <p className="text-slate-400 mt-1">{rule.fragment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Security-Aware Routing */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Security-Aware Routing Policy (Jev Section IX)</h3>
                <p className="text-xs text-slate-400">
                  Routing by difficulty and cost is incomplete without trust. Sensitive files and secrets are locked to vetted first-party frontier models; public docs route to free gateways.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Tester */}
              <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800 space-y-4">
                <label className="text-xs font-semibold text-slate-300 block">Test File Path or Subtask:</label>
                <input 
                  type="text"
                  value={securityTestPath}
                  onChange={(e) => setSecurityTestPath(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  placeholder="e.g. .env, src/auth/keys.ts, docs/readme.md"
                />

                <div className="flex gap-2 flex-wrap">
                  {['.env.production', 'src/billing/stripeWebhook.ts', 'docs/API.md', 'src/components/Header.jsx'].map(sample => (
                    <button
                      key={sample}
                      onClick={() => setSecurityTestPath(sample)}
                      className="text-[11px] px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white font-mono"
                    >
                      {sample}
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Security Classification:</span>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                      securityAnalysis.policy === 'RESTRICTED' 
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : securityAnalysis.policy === 'CONFIDENTIAL'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {securityAnalysis.policy}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Eligible Model Tier:</span>
                    <span className="text-xs font-bold text-white">{securityAnalysis.eligibleModels}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {securityAnalysis.canEgressToExternalGateway ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Unlock className="w-3.5 h-3.5" /> Can egress to Multi-Provider Gateway
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1 font-bold">
                        <Lock className="w-3.5 h-3.5" /> Blocked from third-party gateway (Frontier BAA only)
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-850">
                    {securityAnalysis.reason}
                  </p>
                </div>
              </div>

              {/* Policy Table */}
              <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Policy Matrix (Table IV)</div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="font-bold text-emerald-400">Public Docs & Dependencies</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Policy: OPEN • Any, cheapest / free tier gateway first</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="font-bold text-blue-400">Standard Application Code</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Policy: STANDARD • Vetted models (Gemini Flash, Mistral, Sonnet)</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="font-bold text-amber-400">HIPAA Clinical Transcripts & Financial</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Policy: CONFIDENTIAL • Signed BAA endpoints only</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="font-bold text-rose-400">Secrets, .env, SSH, Cloud Infra</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Policy: RESTRICTED • First-party frontier only, zero external egress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
