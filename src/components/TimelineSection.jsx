import React from 'react';
import { Calendar, CheckCircle2, Clock, ExternalLink, ArrowRight, Milestone } from 'lucide-react';
import { TIMELINE_EVENTS } from '../data/timeline';

export default function TimelineSection() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1c2638]">
      
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Milestone className="w-3.5 h-3.5" />
          <span>Factual Progression</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Evidence-Backed Project Timeline
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Only verifiable milestones with public commit hashes, issue threads, or documented pull requests are listed.
        </p>
      </div>

      {/* Timeline track */}
      <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 space-y-8 pb-4">
        {TIMELINE_EVENTS.map((event, idx) => {
          const isCompleted = event.status === 'Completed';

          return (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              
              {/* Dot */}
              <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                isCompleted 
                  ? 'bg-emerald-950 border-emerald-400' 
                  : 'bg-amber-950 border-amber-400'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-amber-400'}`}></div>
              </div>

              {/* Event Card */}
              <div className="bg-[#0f1523] border border-[#1e2a3f] rounded-xl p-4 sm:p-5 hover:border-slate-700 transition-colors shadow-sm">
                
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800">
                      {event.date}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {event.badge}
                    </span>
                  </div>

                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                    isCompleted 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    <span>{event.status}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5">
                  {event.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                  {event.summary}
                </p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <a
                    href={event.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] flex items-center gap-1 hover:underline"
                  >
                    <span>Source: {event.sourceLabel}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <span className="text-slate-400 text-[11px] font-mono">
                    Evidence verified
                  </span>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
