import React from 'react';
import { ExternalLink, ShieldCheck, Heart, Code2 } from 'lucide-react';

export default function Footer({ onOpenAbout, onOpenGlossary }) {
  return (
    <footer className="border-t border-[#1c2638] bg-[#070b13] py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>Leonida Watch</span>
          </div>
          <p className="max-w-md leading-relaxed text-slate-400">
            An independent, evidence-backed educational dashboard tracking the public reverse-engineering of Leonida. Not affiliated with Rockstar Games, Take-Two Interactive, or Microsoft.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium">
          <button 
            onClick={onOpenGlossary}
            className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Glossary of Terms
          </button>

          <button 
            onClick={onOpenAbout}
            className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Data Accuracy Rules
          </button>

          <a 
            href="https://github.com/ItsNotRexed/Leonida" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
          >
            <span>Leonida Repo</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a 
            href="https://github.com/ItsNotRexed/Leonida/blob/main/LICENSE" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
          >
            <span>GPLv3 License</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
        <span>Zero game files hosted or distributed. Purely metadata and public documentation tracking.</span>
        <span>Built for learners & reverse-engineering enthusiasts</span>
      </div>
    </footer>
  );
}
