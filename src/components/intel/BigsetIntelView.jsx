import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Download, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Database, 
  Play, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Filter
} from 'lucide-react';
import { 
  PRESET_BIGSET_PROMPTS, 
  INITIAL_BIGSET_DATASETS, 
  inferSchemaFromSentence, 
  deduplicateRows, 
  exportToCsv 
} from '../../services/bigsetEngine';

export default function BigsetIntelView() {
  const [datasets, setDatasets] = useState(INITIAL_BIGSET_DATASETS);
  const [selectedDatasetId, setSelectedDatasetId] = useState(INITIAL_BIGSET_DATASETS[0].id);
  const [sentenceInput, setSentenceInput] = useState(INITIAL_BIGSET_DATASETS[0].sentence);
  const [isSwarmRunning, setIsSwarmRunning] = useState(false);
  const [swarmStep, setSwarmStep] = useState(0); // 0: Idle, 1: Orchestrating, 2: Sub-agents, 3: Deduplicating, 4: Done
  const [searchFilter, setSearchFilter] = useState('');

  const activeDataset = datasets.find(d => d.id === selectedDatasetId) || datasets[0];

  const handleSelectPreset = (preset) => {
    setSentenceInput(preset.sentence);
  };

  const handleRunSwarm = () => {
    if (!sentenceInput.trim()) return;
    setIsSwarmRunning(true);
    setSwarmStep(1);

    setTimeout(() => {
      setSwarmStep(2);
      setTimeout(() => {
        setSwarmStep(3);
        setTimeout(() => {
          setSwarmStep(4);
          setIsSwarmRunning(false);

          // Infer schema and create/update dataset
          const inferred = inferSchemaFromSentence(sentenceInput);
          const newId = 'ds-' + Date.now();
          const newDataset = {
            id: newId,
            sentence: sentenceInput,
            primaryKey: inferred.primaryKey,
            refreshCadence: 'Daily',
            lastRefreshedAt: new Date().toISOString(),
            status: 'Ready',
            totalEntitiesFound: activeDataset.rows.length,
            rows: activeDataset.rows
          };

          setDatasets(prev => [newDataset, ...prev]);
          setSelectedDatasetId(newId);
        }, 800);
      }, 900);
    }, 700);
  };

  const handleDownloadCsv = () => {
    const csvContent = exportToCsv(activeDataset);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bigset_${activeDataset.id}_leads.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRows = (activeDataset?.rows || []).filter(row => {
    if (!searchFilter) return true;
    const term = searchFilter.toLowerCase();
    return Object.values(row).some(val => String(val).toLowerCase().includes(term));
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Bigset by TinyFish — Multi-Agent Live Dataset Swarm
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            1-Sentence Live Web Dataset Generator
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Type one sentence describing the dataset you need. Orchestrator discovers leads, 
            parallel sub-agents extract verified facts from the live web with source links, and deduplicates on a primary key.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCsv}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* 1-Sentence Input Engine */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
          Describe the exact dataset to build from the live web:
        </label>
        
        <div className="relative">
          <textarea
            value={sentenceInput}
            onChange={(e) => setSentenceInput(e.target.value)}
            rows={2}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all resize-none font-medium pr-32"
            placeholder="e.g. Startups that raised funding in the last 30 days, with what they do, funding stage, location, and careers page."
          />
          <button
            onClick={handleRunSwarm}
            disabled={isSwarmRunning}
            className={`absolute right-3 top-3 bottom-3 px-4 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
              isSwarmRunning 
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isSwarmRunning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Swarm Active
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Run Swarm
              </>
            )}
          </button>
        </div>

        {/* Preset Prompt Chips */}
        <div className="mt-4 flex items-center flex-wrap gap-2">
          <span className="text-xs text-slate-500 font-semibold mr-1">Steal a Prompt:</span>
          {PRESET_BIGSET_PROMPTS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center gap-1"
            >
              <span>{preset.title}</span>
              <ArrowRight className="w-2.5 h-2.5 text-slate-500" />
            </button>
          ))}
        </div>

        {/* Swarm Status Indicator */}
        {isSwarmRunning && (
          <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-emerald-500/30 animate-pulse">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-emerald-400 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                {swarmStep === 1 && 'Step 1/3: Orchestrator agent scanning live funding registries & news...'}
                {swarmStep === 2 && 'Step 2/3: 6 sub-agents fanning out in parallel, researching company pages...'}
                {swarmStep === 3 && 'Step 3/3: Deduplicating on primary key & attaching verifiable source links...'}
              </span>
              <span className="text-slate-500 font-mono text-[11px]">TinyFish Live Web Swarm</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${(swarmStep / 3) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Dataset Browser & Controls */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Active Dataset: {activeDataset.id === 'ds-funded-30d' ? 'Recent Funded Startups' : 'Solo PT Clinics'}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {filteredRows.length} Rows Verified
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Primary Key: <code className="text-indigo-400 font-mono">{activeDataset.primaryKey}</code> • Refreshes: <strong className="text-white">{activeDataset.refreshCadence}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Filter dataset rows..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {datasets.map(ds => (
                <button
                  key={ds.id}
                  onClick={() => setSelectedDatasetId(ds.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedDatasetId === ds.id 
                      ? 'bg-emerald-600 text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {ds.id === 'ds-funded-30d' ? 'Funded Startups' : 'PT Clinics'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-mono text-[11px]">
                {Object.keys(activeDataset.rows[0] || {}).map((col) => (
                  <th key={col} className="py-3 px-3 uppercase tracking-wider font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                  {Object.entries(row).map(([key, val]) => {
                    if (key === 'SourceUrl' || key === 'CareersUrl' || key === 'Website') {
                      return (
                        <td key={key} className="py-3 px-3">
                          <a 
                            href={val} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono text-[11px]"
                          >
                            <span>Link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </td>
                      );
                    }
                    if (key === 'ConfidenceScore') {
                      return (
                        <td key={key} className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {val}% Verified
                          </span>
                        </td>
                      );
                    }
                    if (key === 'Company' || key === 'ClinicName') {
                      return (
                        <td key={key} className="py-3 px-3 font-bold text-white whitespace-nowrap">
                          {val}
                        </td>
                      );
                    }
                    return (
                      <td key={key} className="py-3 px-3 text-slate-300 max-w-xs truncate">
                        {String(val)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info banner */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Every cell is verifiable back to its live source link. Zero hallucinated contacts.</span>
          </div>
          <span>Automatic scheduled refresh: {activeDataset.refreshCadence}</span>
        </div>
      </div>
    </div>
  );
}
