import React, { useState } from 'react';
import { 
  Radio, 
  X, 
  CheckCircle2, 
  Terminal, 
  Search, 
  Globe, 
  Copy, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function AgentReachModal({ isOpen, onClose }) {
  const [copiedCmd, setCopiedCmd] = useState('');

  if (!isOpen) return null;

  const handleCopy = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(''), 2000);
  };

  const CHANNELS = [
    { name: 'Jina Web Reader', status: 'Active (Zero-Config)', desc: 'Reads full text of articles, clinical protocols, and competitor blogs without blockers.', cmd: 'curl -s "https://r.jina.ai/https://example.com"' },
    { name: 'YouTube & Audio (yt-dlp)', status: 'Active (Node.js runtime)', desc: 'Extracts real practitioner video demos, timestamps, and subtitles.', cmd: 'yt-dlp --dump-json "https://youtube.com/watch?v=..."' },
    { name: 'GitHub CLI (gh)', status: 'Active (Authenticated)', desc: 'Searches open source clinical repos, issue backlogs, and EHR integrations.', cmd: 'gh search repos "physical therapy soap" -n 5' },
    { name: 'Exa Semantic Search', status: 'Active (mcporter)', desc: 'Neural search across thousands of healthcare and startup discussions.', cmd: 'mcporter call exa.web_search_exa query="solo physical therapist billing complaints" numResults=5' },
    { name: 'OpenCLI (Desktop Session)', status: 'Installed', desc: 'Direct browser session connectivity for Reddit, XHS, Meta, and Instagram.', cmd: 'opencli reddit search "physical therapy soap notes burnout" -f yaml' },
    { name: 'Bilibili / Podcasts', status: 'Active (bili-cli / Groq)', desc: 'Audio transcription and video transcript analysis for medical education.', cmd: 'bili search "physical therapy clinical workflow"' }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reach-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#0c1322] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090e1a]/90">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 id="reach-modal-title" className="text-base font-bold text-white">
                Agent Reach — Market Intelligence Router
              </h2>
              <p className="text-xs text-slate-400">
                Connected upstream tools for unassisted market research and customer signal discovery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200">
            <p className="leading-relaxed">
              <strong>How Founder OS uses Agent Reach:</strong> Instead of guessing what customers want or asking generative AI to hallucinate market trends, Agent Reach routes queries directly to primary sources (practitioner forums, recorded video teardowns, PubMed papers, and public review corpora).
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Connected Channels & Command Recipes
            </h3>

            <div className="space-y-2.5">
              {CHANNELS.map((ch) => (
                <div key={ch.name} className="p-3.5 rounded-xl bg-[#070b14] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{ch.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {ch.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {ch.desc}
                  </p>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-300">
                    <span className="truncate mr-2">{ch.cmd}</span>
                    <button
                      onClick={() => handleCopy(ch.cmd)}
                      className="text-slate-400 hover:text-white flex-shrink-0"
                      title="Copy command"
                    >
                      {copiedCmd === ch.cmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-[#090e1a]/90 flex justify-between items-center text-[11px] text-slate-400">
          <span>Agent Reach v1.5.0 • Global PATH</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
