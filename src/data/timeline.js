/**
 * Milestone Timeline: Factual, evidence-backed milestones with exact dates and links
 */

export const TIMELINE_EVENTS = [
  {
    date: '2026-11-20',
    title: 'Public Repository Launch & Architecture Release',
    summary: 'The Leonida project was opened to the public, establishing the static recompilation strategy, zero-copyright policy, and build pipeline.',
    status: 'Completed',
    badge: 'Launch',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida/commit/e293917',
    sourceLabel: 'Initial Public Commits'
  },
  {
    date: '2026-11-21',
    title: 'All 26,503 Shaders Carved & Disassembled',
    summary: 'Extraction tools successfully unpacked and disassembled the full corpus of 26,503 native RDNA2 shaders using LLVM gfx1013 target.',
    status: 'Completed',
    badge: 'Shaders',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida#project-status',
    sourceLabel: 'README Status Table'
  },
  {
    date: '2026-11-22',
    title: '100% SPIR-V Translation & Validation Passed',
    summary: 'Achieved complete 26,503 / 26,503 translation to Vulkan SPIR-V, and resolved the final SPIR-V ID-bound error (commit dcd8ecf) to pass 100% spirv-val checks.',
    status: 'Completed',
    badge: 'Validation',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida/issues/881#issuecomment-7075507328',
    sourceLabel: 'Issue #881 & Full Corpus Rerun'
  },
  {
    date: '2026-11-22',
    title: '382,781 3D Models Recovered Across 10 Archives',
    summary: 'The model decoder reached 382,781 recovered 3D models with 0 readback decode failures, including 343,327 models inside levels.rpf.',
    status: 'Completed',
    badge: 'Assets',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida/blob/main/docs/models.md',
    sourceLabel: 'docs/models.md'
  },
  {
    date: '2026-11-23',
    title: 'Stand-in Executable Execution & Controller Shims',
    summary: 'Verified end-to-end execution of a stand-in test program (`gta6rt --run`), GameInput controller support on SDL3 with DualSense triggers, and synthetic GPU BVH4 ray-tracing builder tests.',
    status: 'Completed',
    badge: 'Runtime',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida/blob/main/docs/gameinput.md',
    sourceLabel: 'docs/gameinput.md & README'
  },
  {
    date: 'Upcoming / In Development',
    title: 'Real Game Binary Startup & First Execution',
    summary: 'Connecting the loader and D3D12->Vulkan proxy to real retail game binaries once developers test with legally supplied game files.',
    status: 'Pending',
    badge: 'Milestone Goal',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida#want-to-help',
    sourceLabel: 'Future Milestone'
  }
];
