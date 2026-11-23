import React, { useState } from 'react';
import { 
  RefreshCw, 
  ExternalLink, 
  Share2, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  BookOpen, 
  HelpCircle,
  Activity,
  Layers
} from 'lucide-react';

export default function Header({ 
  lastChecked, 
  onRefresh, 
  isRefreshing, 
  isLive, 
  rateLimit, 
  error,
  onOpenGlossary,
  onOpenAbout,
  onCopyBrief
}) {
  const [copied, setCopied] = useState(false);
  const [autoRefreshInterval, setAutoRefreshInterval] = useState('off');

  const handleCopy = () => {
    onCopyBrief();
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const formattedTime = lastChecked ? new Date(lastChecked).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  }) : 'Just now';

  return (
    <header className="border-b border-[#1c2638] bg-[#0b101a]/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Brand & Project Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold text-xl ring-1 ring-cyan-400/40">
            LW
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Leonida Watch
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800">
                  Evidence Tracker
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>Tracking</span>
              <a 
                href="https://github.com/ItsNotRexed/Leonida" 
                target="_blank" 
                rel="noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-mono hover:underline inline-flex items-center gap-0.5"
              >
                ItsNotRexed/Leonida <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">Xbox Series → Native PC Port Tracker</span>
            </p>
          </div>
        </div>

        {/* Status Indicators & Controls */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          
          {/* Data Source Badge */}
          <div className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 font-medium ${
            isLive 
              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80' 
              : 'bg-amber-950/40 text-amber-300 border-amber-800/80'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span>{isLive ? 'Live GitHub API' : 'Cached Snapshot'}</span>
          </div>

          {/* Rate Limit Indicator (if available) */}
          {rateLimit && (
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[11px]" title="GitHub API requests remaining for your IP">
              <span>API:</span>
              <span className={rateLimit.remaining < 10 ? 'text-rose-400 font-semibold' : 'text-slate-300'}>
                {rateLimit.remaining}/{rateLimit.limit}
              </span>
            </div>
          )}

          {/* Last Checked Time */}
          <div className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Checked: <strong className="text-slate-200 font-normal">{formattedTime}</strong></span>
          </div>

          {/* Manual Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-medium flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            title="Fetch fresh data from GitHub API"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Checking...' : 'Refresh'}</span>
          </button>

          {/* Copy Brief Button */}
          <button
            onClick={handleCopy}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
            title="Copy current status summary with source links"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied!' : 'Copy Brief'}</span>
          </button>

          {/* Glossary Button */}
          <button
            onClick={onOpenGlossary}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
            title="View beginner-friendly reverse engineering glossary"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Glossary</span>
          </button>

          {/* About / Limitations Button */}
          <button
            onClick={onOpenAbout}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
            title="About the data, accuracy rules & limitations"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">About Data</span>
          </button>
        </div>
      </div>

      {/* Error or Rate limit notice */}
      {error && (
        <div className="bg-amber-950/80 border-t border-amber-800/80 px-4 py-2 text-xs text-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{error}</span>
          </div>
          <span className="text-[11px] text-amber-300/80 underline font-mono cursor-pointer" onClick={onOpenAbout}>
            Why this happens
          </span>
        </div>
      )}
    </header>
  );
}
