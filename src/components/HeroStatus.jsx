import React from 'react';
import { 
  GitCommit, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  FileCode2,
  Calendar,
  User,
  ShieldCheck,
  Cpu,
  Flame,
  Gamepad2
} from 'lucide-react';

export default function HeroStatus({ repo, latestCommit, lastChecked }) {
  const commitTime = latestCommit?.date ? new Date(latestCommit.date).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : 'Recently';

  return (
    <section className="bg-gradient-to-b from-[#0e1524] to-[#080d17] border-b border-[#1c2638] pt-8 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Info Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Static Recompilation Analysis</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Leonida</span>, and does it run?
            </h2>
            
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Leonida is an open-source static recompilation project aimed at porting the <strong>Xbox Series X|S version of Grand Theft Auto VI</strong> to run natively on Windows PCs. 
              Because the console uses an x86-64 CPU just like a PC, the game's code is translated ahead of time instead of running inside a slow emulator. 
              <strong> The repository contains zero copyrighted game files, keys, or executables.</strong>
            </p>
          </div>

          {/* Quick Repo Metadata Badge Card */}
          <div className="bg-[#111928]/80 border border-[#212f47] rounded-xl p-4 shrink-0 flex flex-col gap-2.5 min-w-[260px] shadow-lg shadow-black/40">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-semibold text-slate-300">GitHub Repository</span>
              <a 
                href={repo?.html_url || 'https://github.com/ItsNotRexed/Leonida'}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono text-[11px]"
              >
                View on GitHub <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Stars</span>
                <span className="text-base font-bold text-white font-mono">
                  {repo?.stars ? Number(repo.stars).toLocaleString() : '24,000+'}
                </span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Forks</span>
                <span className="text-base font-bold text-white font-mono">
                  {repo?.forks ? Number(repo.forks).toLocaleString() : '2,100+'}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
              <span>Default Branch:</span>
              <span className="font-mono text-cyan-400 font-semibold">{repo?.default_branch || 'main'}</span>
            </div>
          </div>

        </div>

        {/* 3 Core Verifiable Milestone Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          {/* 1. Can the Game Boot? */}
          <div className="bg-[#131b2c] border border-rose-900/40 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between shadow-md group hover:border-rose-700/60 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Milestone 1</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  <XCircle className="w-3.5 h-3.5" /> No / Not Booting
                </span>
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Can the Game Boot?
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                <strong>No.</strong> The official documentation explicitly confirms: <em>"Early. The game does not boot yet."</em> 
                A stand-in synthetic test program (`gta6rt`) runs to test loader stubs, but the real game executable has not yet executed.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Source: README #project-status</span>
              <span className="text-rose-400 font-medium">Fact Checked</span>
            </div>
          </div>

          {/* 2. First Frame Rendered? */}
          <div className="bg-[#131b2c] border border-rose-900/40 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between shadow-md group hover:border-rose-700/60 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Milestone 2</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  <XCircle className="w-3.5 h-3.5" /> No Frame Rendered
                </span>
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                First Frame Rendered?
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                <strong>No.</strong> The project has translated and validated all 26,503 shaders in isolation, but no game graphics or 3D visuals from the real title have been drawn to screen.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Source: Issue #166 & README</span>
              <span className="text-rose-400 font-medium">Fact Checked</span>
            </div>
          </div>

          {/* 3. Story Mode / Playable? */}
          <div className="bg-[#131b2c] border border-rose-900/40 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between shadow-md group hover:border-rose-700/60 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Milestone 3</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  <XCircle className="w-3.5 h-3.5" /> Nothing Playable
                </span>
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Is It Playable?
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                <strong>No.</strong> There is zero playable gameplay, no character movement, physics, world simulation, or story mode. The project is currently focused on compiler, shader, asset and runtime scaffolding.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Source: README #project-status</span>
              <span className="text-rose-400 font-medium">Fact Checked</span>
            </div>
          </div>

        </div>

        {/* Latest Default Branch Commit Callout */}
        {latestCommit && (
          <div className="bg-[#0f1726] border border-[#202c42] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-400 shrink-0 mt-0.5">
                <GitCommit className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Latest Main Branch Commit</span>
                  <a 
                    href={latestCommit.html_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400 hover:text-cyan-300 hover:bg-slate-700 transition-colors inline-flex items-center gap-1"
                  >
                    {latestCommit.short_sha || latestCommit.sha?.substring(0, 7)}
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" /> {latestCommit.author}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> {commitTime}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-200 mt-1 line-clamp-1">
                  {latestCommit.message?.split('\n')[0]}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <a
                href={latestCommit.html_url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                <span>Inspect Commit</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
