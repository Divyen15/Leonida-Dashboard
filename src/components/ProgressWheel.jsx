import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  HelpCircle, 
  ExternalLink, 
  AlertTriangle, 
  Filter,
  Info,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { MILESTONES, MILESTONE_STATUSES } from '../data/milestones';

export default function ProgressWheel() {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' or status ID
  const [expandedMilestones, setExpandedMilestones] = useState({});
  const [hoveredStatus, setHoveredStatus] = useState(null);

  // Group counts
  const totalCount = MILESTONES.length;
  const counts = {
    working: MILESTONES.filter(m => m.status === 'working').length,
    in_progress: MILESTONES.filter(m => m.status === 'in_progress').length,
    not_achieved: MILESTONES.filter(m => m.status === 'not_achieved').length,
    unknown: MILESTONES.filter(m => m.status === 'unknown').length,
  };

  // Filtered milestones
  const filteredMilestones = activeFilter === 'all' 
    ? MILESTONES 
    : MILESTONES.filter(m => m.status === activeFilter);

  // Toggle card expansion
  const toggleExpand = (id) => {
    setExpandedMilestones(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Expand or collapse all
  const expandAll = () => {
    const all = {};
    filteredMilestones.forEach(m => { all[m.id] = true; });
    setExpandedMilestones(all);
  };

  const collapseAll = () => {
    setExpandedMilestones({});
  };

  // SVG Donut calculation
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  const segments = Object.entries(MILESTONE_STATUSES).map(([key, config]) => {
    const count = counts[key] || 0;
    const percent = totalCount > 0 ? (count / totalCount) * 100 : 0;
    const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += percent;

    return {
      key,
      config,
      count,
      percent,
      strokeDasharray,
      strokeDashoffset
    };
  });

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Visualizer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tracked Milestone Statuses
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Sourced strictly from the official repository documentation. Click any section of the wheel or legend to view the supporting evidence for those milestones.
          </p>
        </div>

        {/* Expand / Collapse Controls */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={expandAll}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors border border-slate-700"
          >
            Expand All Details
          </button>
          <button
            onClick={collapseAll}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors border border-slate-700"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Mandatory Accuracy Disclaimer Banner */}
      <div className="mb-8 rounded-xl bg-slate-900/90 border border-amber-500/40 p-4 sm:p-5 flex items-start gap-3.5 shadow-lg shadow-black/20">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong className="text-amber-300 font-semibold block mb-1">
            ACCURACY NOTICE: This chart measures tracked milestone labels, NOT game completion percentage.
          </strong>
          Completing prerequisite tasks (like translating shaders, extracting assets, or passing synthetic loader stubs) does not mean the game is {Math.round((counts.working / totalCount) * 100)}% finished. 
          Getting a complex AAA retail game to boot and play stably requires solving hundreds of unpredictable internal game-engine systems. We never invent arbitrary progress percentages.
        </div>
      </div>

      {/* Wheel & Legend Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d131f] border border-[#1d273a] rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
        
        {/* Left: SVG Wheel */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72">
            <svg 
              className="w-full h-full transform -rotate-90" 
              viewBox="0 0 220 220"
            >
              {/* Background ring */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke="#162032"
                strokeWidth="18"
              />

              {/* Status segments */}
              {segments.map((seg) => {
                if (seg.count === 0) return null;
                const isHovered = hoveredStatus === seg.key;
                const isFiltered = activeFilter === seg.key;

                return (
                  <circle
                    key={seg.key}
                    cx="110"
                    cy="110"
                    r={radius}
                    fill="none"
                    stroke={seg.config.color}
                    strokeWidth={isHovered || isFiltered ? "22" : "18"}
                    strokeDasharray={seg.strokeDasharray}
                    strokeDashoffset={seg.strokeDashoffset}
                    strokeLinecap="butt"
                    className="cursor-pointer transition-all duration-300 hover:opacity-100 opacity-90"
                    onMouseEnter={() => setHoveredStatus(seg.key)}
                    onMouseLeave={() => setHoveredStatus(null)}
                    onClick={() => setActiveFilter(activeFilter === seg.key ? 'all' : seg.key)}
                  />
                );
              })}
            </svg>

            {/* Wheel Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                {hoveredStatus ? counts[hoveredStatus] : totalCount}
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 mt-0.5">
                {hoveredStatus 
                  ? MILESTONE_STATUSES[hoveredStatus].shortLabel 
                  : 'Tracked Milestones'
                }
              </span>
              <span className="text-[10px] text-cyan-400 mt-1 font-mono">
                {activeFilter === 'all' ? 'Click to filter' : `Filtered: ${MILESTONE_STATUSES[activeFilter]?.shortLabel}`}
              </span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs text-slate-400">
              {activeFilter !== 'all' && (
                <button 
                  onClick={() => setActiveFilter('all')}
                  className="text-cyan-400 hover:underline font-medium text-xs inline-flex items-center gap-1"
                >
                  Reset filter to view all {totalCount} milestones
                </button>
              )}
            </span>
          </div>
        </div>

        {/* Right: Status Legend and Interactive Filter Cards */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>Milestone Category Breakdown</span>
            <span>Count / Share of Tracked</span>
          </div>

          {segments.map((seg) => {
            const isSelected = activeFilter === seg.key;
            const isHovered = hoveredStatus === seg.key;

            return (
              <div
                key={seg.key}
                onClick={() => setActiveFilter(activeFilter === seg.key ? 'all' : seg.key)}
                onMouseEnter={() => setHoveredStatus(seg.key)}
                onMouseLeave={() => setHoveredStatus(null)}
                className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                  isSelected 
                    ? 'bg-slate-800/90 border-cyan-400 shadow-md ring-1 ring-cyan-400/40' 
                    : isHovered
                    ? 'bg-slate-800/60 border-slate-700'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: seg.config.color }}
                  ></span>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {seg.config.label}
                      {isSelected && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                          Active Filter
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {seg.key === 'working' && 'Validated by corpus checks or unit test passes'}
                      {seg.key === 'in_progress' && 'Actively being written or verified on synthetic stand-ins'}
                      {seg.key === 'not_achieved' && 'Confirmed by developers as not yet working or booting'}
                      {seg.key === 'unknown' && 'Cannot be established definitively from public documentation'}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-bold text-white font-mono">
                    {seg.count} <span className="text-xs text-slate-400 font-normal">/ {totalCount}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {Math.round(seg.percent)}% of tracked
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Filter Tabs & Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            All Milestones ({totalCount})
          </button>

          {Object.entries(MILESTONE_STATUSES).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeFilter === key
                  ? 'bg-slate-800 text-white border border-slate-600 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }}></span>
              <span>{config.shortLabel} ({counts[key]})</span>
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Showing {filteredMilestones.length} of {totalCount} tracked milestones
        </span>
      </div>

      {/* Milestone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMilestones.map((milestone) => {
          const statusConfig = MILESTONE_STATUSES[milestone.status] || MILESTONE_STATUSES.unknown;
          const isExpanded = expandedMilestones[milestone.id];

          return (
            <div 
              key={milestone.id}
              className="bg-[#0f1523] border border-[#1e2a3f] rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Card Top: Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-mono">
                    {milestone.category}
                  </span>
                  
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusConfig.badgeClass}`}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusConfig.color }}></span>
                    <span>{statusConfig.shortLabel}</span>
                  </span>
                </div>

                {/* Milestone Title */}
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  {milestone.name}
                </h3>

                {/* Plain English Summary */}
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {milestone.plainSummary}
                </p>

                {/* Status Display Highlight */}
                <div className="mt-3 py-1.5 px-3 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs font-mono text-slate-200">
                  <span className="text-slate-400 font-sans mr-1">Project status:</span>
                  <strong>{milestone.statusDisplay}</strong>
                </div>

                {/* Details Section: What is Demonstrated vs Not Established */}
                <div className="mt-3.5 space-y-2.5 text-xs">
                  
                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-slate-300">
                    <span className="text-emerald-400 font-bold block mb-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> What has been demonstrated:
                    </span>
                    <p className="leading-relaxed text-slate-300">
                      {milestone.demonstrated}
                    </p>
                  </div>

                  {milestone.notEstablished && (
                    <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30 text-slate-300">
                      <span className="text-rose-400 font-bold block mb-0.5 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> What has NOT been established:
                      </span>
                      <p className="leading-relaxed text-slate-300">
                        {milestone.notEstablished}
                      </p>
                    </div>
                  )}

                </div>
              </div>

              {/* Card Footer: Evidence Link & Verification Date */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <a
                  href={milestone.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 font-mono"
                  title="Open source evidence on GitHub"
                >
                  <span>Evidence: {milestone.sourceName}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2 text-slate-400 font-mono">
                  <span>Checked: {milestone.lastChecked}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
