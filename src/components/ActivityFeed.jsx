import React, { useState, useMemo } from 'react';
import { 
  GitCommit, 
  GitPullRequest, 
  GitMerge, 
  Tag, 
  Search, 
  Filter, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  Calendar, 
  User, 
  Sparkles,
  CheckCircle2,
  XCircle,
  FileText,
  AlertCircle
} from 'lucide-react';
import { categorizeItem, explainChange } from '../utils/explainer';

export default function ActivityFeed({ commits = [], pulls = [], closedPulls = [] }) {
  const [activeTab, setActiveTab] = useState('commits'); // 'commits', 'merged_prs', 'open_prs', 'releases', 'docs'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Compute merged PRs vs closed unmerged
  const mergedPRs = useMemo(() => {
    return closedPulls.filter(p => p.merged);
  }, [closedPulls]);

  // Compute doc changes
  const docChanges = useMemo(() => {
    return commits.filter(c => {
      const msg = (c.message || '').toLowerCase();
      return msg.includes('doc') || msg.includes('readme') || msg.includes('.md');
    });
  }, [commits]);

  // Determine current dataset based on activeTab
  const currentDataset = useMemo(() => {
    if (activeTab === 'commits') return commits;
    if (activeTab === 'merged_prs') return mergedPRs;
    if (activeTab === 'open_prs') return pulls;
    if (activeTab === 'docs') return docChanges;
    if (activeTab === 'releases') return [];
    return commits;
  }, [activeTab, commits, mergedPRs, pulls, docChanges]);

  // Filter dataset by search and category
  const filteredItems = useMemo(() => {
    return currentDataset.filter(item => {
      const title = item.message || item.title || '';
      const author = item.author || item.user || '';
      const sha = item.short_sha || item.sha || item.number?.toString() || '';
      
      // Search matching
      const matchesSearch = searchQuery.trim() === '' || 
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sha.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category matching
      if (categoryFilter === 'all') return true;
      const category = categorizeItem(title);
      return category.id === categoryFilter;
    });
  }, [currentDataset, searchQuery, categoryFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const totalAnalyzed = commits.length + pulls.length + closedPulls.length;

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1c2638]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <GitCommit className="w-3.5 h-3.5" />
            <span>Real GitHub Repository Activity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Latest Code Activity & Explanations
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Every commit and pull request explained in plain English, with explicit notes on what each change does and does NOT prove.
          </p>
        </div>

        {/* Checked Window Info Badge */}
        <div className="bg-[#101726] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 font-mono">
          <span>Checked window: <strong>{totalAnalyzed} public items</strong> (last 72 hrs)</span>
          <span className="block text-[11px] text-slate-400 font-sans mt-0.5">Categories are heuristic classifications.</span>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 mb-6">
        
        <button
          onClick={() => handleTabChange('commits')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'commits'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <GitCommit className="w-4 h-4" />
          <span>Default-Branch Commits ({commits.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('merged_prs')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'merged_prs'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <GitMerge className="w-4 h-4 text-purple-300" />
          <span>Merged PRs ({mergedPRs.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('open_prs')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'open_prs'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <GitPullRequest className="w-4 h-4 text-emerald-400" />
          <span>Open Proposals ({pulls.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('docs')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'docs'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <FileText className="w-4 h-4 text-blue-300" />
          <span>Documentation Revisions ({docChanges.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('releases')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'releases'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Tag className="w-4 h-4 text-amber-400" />
          <span>Releases (0)</span>
        </button>

      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search commits, PRs, authors, or topics..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-sans"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Area:
          </span>
          {[
            { id: 'all', label: 'All Areas' },
            { id: 'graphics', label: 'Graphics & Shaders' },
            { id: 'runtime', label: 'Runtime & Loader' },
            { id: 'assets', label: 'Assets & Audio' },
            { id: 'testing', label: 'Tests' },
            { id: 'documentation', label: 'Docs' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => { setCategoryFilter(cat.id); setCurrentPage(1); }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-slate-800 text-white border border-slate-600'
                  : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Releases Empty State */}
      {activeTab === 'releases' && (
        <div className="bg-[#0e1524] border border-slate-800 rounded-2xl p-12 text-center my-6">
          <Tag className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No Official Releases Published Yet</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            The Leonida repository is in active development on the <code>main</code> branch. The developers have not published any standalone versioned binary releases (e.g. v1.0.0). Users build the tools directly from source.
          </p>
          <a
            href="https://github.com/ItsNotRexed/Leonida/releases"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 font-mono"
          >
            <span>Verify on GitHub Releases</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Empty State for Search */}
      {activeTab !== 'releases' && paginatedItems.length === 0 && (
        <div className="bg-[#0e1524] border border-slate-800 rounded-2xl p-10 text-center my-6">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No items match your filter</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search query or switching the category filter to "All Areas".
          </p>
          <button
            onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }}
            className="mt-4 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-cyan-400 hover:bg-slate-700"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Items List */}
      {activeTab !== 'releases' && paginatedItems.length > 0 && (
        <div className="space-y-3.5">
          {paginatedItems.map((item, idx) => {
            const isPR = Boolean(item.number);
            const title = item.message?.split('\n')[0] || item.title || 'Untitled update';
            const body = item.body || item.message || '';
            const author = item.author || item.user || 'Developer';
            const dateStr = item.date || item.created_at;
            const formattedDate = dateStr ? new Date(dateStr).toLocaleString([], {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : 'Recently';
            
            const category = categorizeItem(title);
            const itemId = isPR ? `pr-${item.number}` : item.sha || `commit-${idx}`;
            const isExpanded = expandedItems[itemId];
            const explanation = explainChange(title, body, author, isPR, item.state);

            return (
              <div 
                key={itemId}
                className="bg-[#0d1422] border border-[#1d273a] rounded-xl p-4 hover:border-slate-700 transition-all shadow-sm"
              >
                {/* Item Top: Meta badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    
                    {/* Identifier */}
                    <a
                      href={item.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300 hover:border-cyan-700 flex items-center gap-1 transition-colors"
                    >
                      {isPR ? `#${item.number}` : item.short_sha || item.sha?.substring(0, 7)}
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>

                    {/* Category Badge */}
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${category.color}`}>
                      {category.label}
                    </span>

                    {/* Evidence Level Badge */}
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${explanation.evidenceClass}`}>
                      {explanation.evidenceLevel}
                    </span>

                  </div>

                  {/* Author and Date */}
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-slate-300 font-sans">
                      <User className="w-3 h-3 text-slate-400" /> {author}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3 h-3 text-slate-400" /> {formattedDate}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white mt-1 leading-snug">
                  {title}
                </h3>

                {/* Quick Summary Preview */}
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  <strong className="text-cyan-400 font-semibold">Plain English:</strong> {explanation.simpleMeaning}
                </p>

                {/* Expand / Collapse Button */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(itemId)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{isExpanded ? 'Hide Detailed Analysis' : 'What Changed & What It Means'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <a
                    href={item.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-slate-400 hover:text-slate-200 font-mono flex items-center gap-1"
                  >
                    <span>Inspect GitHub Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Expanded Detailed Plain-English Breakdown */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-800/60 bg-slate-900/60 -mx-4 -mb-4 p-4 rounded-b-xl space-y-2.5 text-xs text-slate-300 animate-fadeIn">
                    
                    {/* Why It Matters */}
                    <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-900/30">
                      <strong className="text-cyan-300 block mb-0.5 font-semibold">Why this change could matter:</strong>
                      <p className="leading-relaxed">{explanation.whyItMatters}</p>
                    </div>

                    {/* What It Does NOT Prove */}
                    <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30">
                      <strong className="text-rose-400 block mb-0.5 font-semibold flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> What this change DOES NOT prove:
                      </strong>
                      <p className="leading-relaxed">{explanation.whatItDoesNotProve}</p>
                    </div>

                    {/* Closer to Booting? */}
                    <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Boot / Gameplay Impact:</span>
                      <span className="text-slate-200 font-semibold font-mono text-[11px]">{explanation.closerToBooting}</span>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4 text-xs">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 font-semibold transition-colors"
          >
            Previous Page
          </button>

          <span className="text-slate-400 font-mono">
            Page {currentPage} of {totalPages} ({filteredItems.length} items)
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 font-semibold transition-colors"
          >
            Next Page
          </button>
        </div>
      )}

    </section>
  );
}
