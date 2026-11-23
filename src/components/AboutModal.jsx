import React from 'react';
import { X, ShieldAlert, Cpu, CheckCircle2, AlertTriangle, ExternalLink, Key, Zap, Layers } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0e1524] border border-[#223049] rounded-2xl w-full max-w-3xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">About Leonida Watch & Data Accuracy</h2>
              <p className="text-xs text-slate-400">Verification standards, API limits, and architecture explanation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 flex-1 leading-relaxed">
          
          {/* Rule 1: No Invented Progress Numbers */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              1. Why We Never Invent an Overall Completion Percentage
            </h3>
            <p>
              In software reverse engineering, counting commits, lines of code, or translated shaders does <strong>NOT</strong> correlate linearly to game completion. A project can translate 100% of shaders and extract 100% of textures, yet still be months or years away from a stable boot due to missing microkernel behavior, memory management bugs, or unhandled graphics synchronization.
            </p>
            <p className="mt-2 text-slate-400">
              Leonida Watch tracks the exact evidence-backed status of documented milestones rather than making up an inaccurate percentage.
            </p>
          </div>

          {/* Rule 2: Zero Game Files Boundary */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              2. Strict Zero Copyright & No Game Files Policy
            </h3>
            <p>
              Neither the Leonida repository nor this dashboard hosts, distributes, downloads, decrypts, or scans proprietary GTA VI game assets, executables, or encryption keys. The build tools are designed for users to compile their own legally purchased copy of the Xbox Series package on their local PC.
            </p>
          </div>

          {/* Rule 3: GitHub API Rate Limits & Fallback Snapshot */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              3. GitHub API Limits & Bundled Snapshot
            </h3>
            <p>
              GitHub limits unauthenticated API requests to <strong>60 requests per hour per IP address</strong>. When that limit is reached or when your internet connection is unavailable, Leonida Watch gracefully falls back to a verified offline snapshot of the project so the dashboard is always functional and never crashes.
            </p>
          </div>

          {/* Rule 4: Google AI Pro vs Gemini API Clarification */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              4. Gemini API & Google AI Pro Clarification
            </h3>
            <p>
              <strong>Important note on Google AI Pro:</strong> A consumer Google AI Pro subscription provides access to web interfaces (like Gemini Advanced), but does <em>not</em> grant programmatic API credits for custom external web servers.
            </p>
            <p className="mt-2">
              Programmatic Gemini API keys are issued separately through <strong>Google AI Studio</strong> (which provides a generous free tier for developers with rate limits, requiring no credit card). To protect you from unexpected cloud bills:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
              <li><strong>Phase 1 (Active):</strong> Fully functional live dashboard using deterministic analysis without requiring any API key or billing.</li>
              <li><strong>Phase 2 (Optional):</strong> Optional backend proxy script (<code>server/gemini_proxy.js</code>) if you choose to plug in your own free Google AI Studio key later.</li>
              <li><strong>Phase 3 (Optional):</strong> Configurable GitHub Actions periodic check without paid cloud runners.</li>
            </ul>
          </div>

          {/* Rule 5: Distinguishing Syntactic Passes from Real Visuals */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              5. Syntactic Validation vs Visual Accuracy
            </h3>
            <p>
              Passing Khronos <code>spirv-val</code> proves that translated shaders conform to the official Vulkan binary specification. It does <em>not</em> guarantee that the shader produces the correct visual output in the game. Real game rendering requires hardware graphics execution, descriptor synchronization, and correct render targets.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Leonida Watch — Open Source & Evidence-First</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
}
