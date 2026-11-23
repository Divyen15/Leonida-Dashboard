import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import HeroStatus from './components/HeroStatus';
import ProgressWheel from './components/ProgressWheel';
import ActivityFeed from './components/ActivityFeed';
import TimelineSection from './components/TimelineSection';
import Footer from './components/Footer';
import GlossaryModal from './components/GlossaryModal';
import AboutModal from './components/AboutModal';
import { fetchGitHubData } from './services/github';
import { MILESTONES } from './data/milestones';
import snapshotData from './data/snapshot.json';

export default function App() {
  const [data, setData] = useState({
    isLive: false,
    rateLimit: null,
    lastChecked: new Date(),
    repo: snapshotData.repo,
    commits: snapshotData.commits,
    pulls: snapshotData.pulls,
    closedPulls: snapshotData.closed_pulls,
    error: null,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Load data function
  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await fetchGitHubData();
      setData({
        isLive: result.isLive,
        rateLimit: result.rateLimit,
        lastChecked: result.lastChecked,
        repo: result.repo || snapshotData.repo,
        commits: result.commits?.length ? result.commits : snapshotData.commits,
        pulls: result.pulls?.length ? result.pulls : snapshotData.pulls,
        closedPulls: result.closedPulls?.length ? result.closedPulls : snapshotData.closed_pulls,
        error: result.error,
      });
    } catch (err) {
      setData(prev => ({
        ...prev,
        error: `Could not refresh: ${err.message}. Using offline snapshot.`
      }));
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Copy status brief to clipboard
  const copyStatusBrief = () => {
    const workingCount = MILESTONES.filter(m => m.status === 'working').length;
    const progressCount = MILESTONES.filter(m => m.status === 'in_progress').length;
    const notAchievedCount = MILESTONES.filter(m => m.status === 'not_achieved').length;
    const latest = data.commits[0];

    const brief = `=== Leonida Watch — Evidence-Backed Status Brief ===
Checked: ${new Date().toLocaleString()}
Data Source: ${data.isLive ? 'Live GitHub API' : 'Verified Offline Snapshot'}

CORE STATUS:
• Can the Game Boot? -> ❌ No (Does not boot yet)
• First Frame Rendered? -> ❌ No (No visual frames presented)
• Is Anything Playable? -> ❌ No (Zero playable gameplay)

TRACKED MILESTONES (Total: ${MILESTONES.length}):
• Documented Working / Passed: ${workingCount}
• In Progress / Synthetic Only: ${progressCount}
• Not Yet Achieved: ${notAchievedCount}
(Note: Measures tracked milestone labels, NOT game completion %)

LATEST DEFAULT BRANCH COMMIT:
"${latest?.message?.split('\n')[0]}"
By ${latest?.author} (${latest?.short_sha || latest?.sha?.substring(0, 7)})
Link: ${latest?.html_url}

OFFICIAL REFERENCES:
• Repository: https://github.com/ItsNotRexed/Leonida
• Documentation Status: https://github.com/ItsNotRexed/Leonida#project-status
• D3D12/Vulkan Layer: https://github.com/ItsNotRexed/Leonida/blob/main/docs/d3d12_vulkan.md
• GPU Hardware Tests: https://github.com/ItsNotRexed/Leonida/issues/166
====================================================`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(brief);
    }
    setToastMessage('Copied evidence-backed status brief to clipboard!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const latestCommit = data.commits?.[0];

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-950 border border-cyan-500 text-cyan-200 px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        lastChecked={data.lastChecked}
        onRefresh={loadData}
        isRefreshing={isRefreshing}
        isLive={data.isLive}
        rateLimit={data.rateLimit}
        error={data.error}
        onOpenGlossary={() => setGlossaryOpen(true)}
        onOpenAbout={() => setAboutOpen(true)}
        onCopyBrief={copyStatusBrief}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with 3 Core Verifiable Questions */}
        <HeroStatus
          repo={data.repo}
          latestCommit={latestCommit}
          lastChecked={data.lastChecked}
        />

        {/* Interactive Progress Wheel inspired by Team Panel */}
        <ProgressWheel />

        {/* Filterable Activity Feed with Plain English "What Changed" */}
        <ActivityFeed
          commits={data.commits}
          pulls={data.pulls}
          closedPulls={data.closedPulls}
        />

        {/* Evidence-Backed Timeline */}
        <TimelineSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAbout={() => setAboutOpen(true)}
        onOpenGlossary={() => setGlossaryOpen(true)}
      />

      {/* Modals */}
      <GlossaryModal
        isOpen={glossaryOpen}
        onClose={() => setGlossaryOpen(false)}
      />

      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />

    </div>
  );
}
