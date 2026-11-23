/**
 * Tracked Project Milestones for Leonida
 * 
 * ACCURACY NOTICE:
 * These milestones are directly sourced from the official Leonida repository documentation
 * (README.md, docs/design.md, docs/d3d12_vulkan.md, docs/testing.md).
 * 
 * Status categories:
 * - 'working': Documented as working or verified by reproducible tests
 * - 'in_progress': Actively developed, partial implementation, or passing only synthetic stand-in tests
 * - 'not_achieved': Confirmed by the developers as NOT yet working or not started
 * - 'unknown': Status cannot be definitively determined from public records
 */

export const MILESTONE_STATUSES = {
  working: {
    id: 'working',
    label: 'Documented Working / Test Passed',
    shortLabel: 'Working / Passed',
    color: '#10b981', // emerald
    bgLight: 'rgba(16, 185, 129, 0.12)',
    borderLight: 'rgba(16, 185, 129, 0.3)',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: 'CheckCircle2'
  },
  in_progress: {
    id: 'in_progress',
    label: 'In Progress / Partial / Synthetic Only',
    shortLabel: 'In Progress / Partial',
    color: '#f59e0b', // amber
    bgLight: 'rgba(245, 158, 11, 0.12)',
    borderLight: 'rgba(245, 158, 11, 0.3)',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    icon: 'Clock'
  },
  not_achieved: {
    id: 'not_achieved',
    label: 'Not Yet Achieved',
    shortLabel: 'Not Achieved',
    color: '#f43f5e', // rose/crimson
    bgLight: 'rgba(244, 63, 94, 0.12)',
    borderLight: 'rgba(244, 63, 94, 0.3)',
    badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    icon: 'XCircle'
  },
  unknown: {
    id: 'unknown',
    label: 'Unknown / Not Verified',
    shortLabel: 'Unknown',
    color: '#94a3b8', // slate
    bgLight: 'rgba(148, 163, 184, 0.12)',
    borderLight: 'rgba(148, 163, 184, 0.3)',
    badgeClass: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    icon: 'HelpCircle'
  }
};

export const MILESTONES = [
  {
    id: 'game_boot',
    name: 'Game Booting / Startup',
    category: 'Core Boot & Gameplay',
    status: 'not_achieved',
    statusDisplay: '❌ No (Does Not Boot)',
    plainSummary: 'Starting the actual retail game code and reaching an initial execution state.',
    demonstrated: 'The repository project status explicitly states: "Early. The game does not boot yet." Infrastructure is prepared for when executable binaries can be loaded.',
    notEstablished: 'The real game executable has not been booted. No game loops have run.',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida#project-status',
    sourceName: 'Official README.md (#project-status)',
    evidenceType: 'Developer Confirmed Fact',
    lastChecked: '2026-11-23'
  },
  {
    id: 'first_frame',
    name: 'First Frame Rendered',
    category: 'Core Boot & Gameplay',
    status: 'not_achieved',
    statusDisplay: '❌ No (No Frame Presented)',
    plainSummary: 'Having the game graphics engine output a single visible visual image to the screen.',
    demonstrated: 'No graphics frames from the actual game have been presented or rendered to a window or swapchain.',
    notEstablished: 'No visual graphics from the game exist yet. Any graphical tests conducted so far are small synthetic standalone test shaders only.',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida#project-status',
    sourceName: 'Official README.md (#project-status)',
    evidenceType: 'Developer Confirmed Fact',
    lastChecked: '2026-11-23'
  },
  {
    id: 'gameplay_playable',
    name: 'Story Mode / Playability',
    category: 'Core Boot & Gameplay',
    status: 'not_achieved',
    statusDisplay: '❌ No (Nothing Playable)',
    plainSummary: 'Interacting with the game world, player movement, physics, mission scripts, or menus.',
    demonstrated: 'README states: "Booting, story mode, anything playable: ❌ No".',
    notEstablished: 'No gameplay mechanics, missions, cutscenes, or physics interactions are functional.',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida#project-status',
    sourceName: 'Official README.md (#project-status)',
    evidenceType: 'Developer Confirmed Fact',
    lastChecked: '2026-11-23'
  },
  {
    id: 'pe_loader_runtime',
    name: 'PE Loader & Import Shims',
    category: 'Runtime & Platform',
    status: 'in_progress',
    statusDisplay: '⚠️ Stand-in Exe Runs Only',
    plainSummary: 'The system loader that maps executable code into memory, handles threads, and connects game calls to Windows/GDK shims.',
    demonstrated: 'Runs a synthetic stand-in test executable end-to-end (`gta6rt --run`: CRT startup, statics, heap, files, threads, GDK imports through shims, exit code back). Trace logging (`--trace-d3d12`) implemented for future boot.',
    notEstablished: 'Untested against the real retail game executable.',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida#project-status',
    sourceName: 'Official README.md & docs/gameinput.md',
    evidenceType: 'Automated Test on Stand-in Exe',
    lastChecked: '2026-11-23'
  },
  {
    id: 'shader_carve_disasm',
    name: 'Shader Extraction & Disassembly',
    category: 'Shaders & Vulkan',
    status: 'working',
    statusDisplay: '✅ All 26,503 Carved & Disassembled',
    plainSummary: 'Extracting compiled GPU programs from the game archives without encryption keys and turning machine code into assembly.',
    demonstrated: 'Carves DXBC containers from `shaders.rpf`, unpacks `XBCH` → `FSSM` native RDNA2 programs, and disassembles all 26,503 shaders with LLVM gfx1013 target.',
    notEstablished: 'None: this extraction and disassembly step is 100% complete across the entire corpus.',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida#project-status',
    sourceName: 'Official README.md & tools/shader_carve.py',
    evidenceType: 'Corpus Measurement',
    lastChecked: '2026-11-23'
  },
  {
    id: 'shader_translation',
    name: 'Shader Translation (RDNA2 → SPIR-V)',
    category: 'Shaders & Vulkan',
    status: 'working',
    statusDisplay: '✅ 26,503 / 26,503 Translated (Wave64 Nuance)',
    plainSummary: 'Translating Xbox RDNA2 console shader code into Vulkan SPIR-V format so PC graphics cards can understand them.',
    demonstrated: 'All 26,503 shaders translated (2,236 Vertex, 12,101 Pixel, 2,689 Compute, 9,282 Mesh, 195 Geometry) with per-shader metadata index. Verified on both LLVM Linux and Windows reruns.',
    notEstablished: '23,841 shaders use Wave64 instructions. Native on AMD (64-wide), but on 32-wide GPUs (NVIDIA/Intel), vertex/pixel/geometry cross-half wave ops remain approximate.',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida/issues/644#issuecomment-7074299915',
    sourceName: 'Issue #644 & README.md',
    evidenceType: 'Corpus Re-run & Pull Requests',
    lastChecked: '2026-11-23'
  },
  {
    id: 'shader_validation',
    name: 'SPIR-V Validation (`spirv-val`)',
    category: 'Shaders & Vulkan',
    status: 'working',
    statusDisplay: '✅ 26,503 / 26,503 Passed Validation',
    plainSummary: 'Running official Khronos Vulkan validation tools to guarantee the translated shaders are structurally and syntactically valid.',
    demonstrated: '100% (26,503 / 26,503) passed `spirv-val` in full-corpus rerun after commit `dcd8ecf` fixed SPIR-V ID-bound errors.',
    notEstablished: 'Passing validation proves syntactic and structural correctness only; it does NOT prove the shaders produce the visually correct image in the game.',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida/issues/881#issuecomment-7075507328',
    sourceName: 'Issue #881 & README.md',
    evidenceType: 'Official Tool Validation (`spirv-val`)',
    lastChecked: '2026-11-23'
  },
  {
    id: 'shader_gpu_harness',
    name: 'Hardware GPU Shader Tests',
    category: 'Shaders & Vulkan',
    status: 'in_progress',
    statusDisplay: '⚠️ Synthetic GPU Tests Passed on 30+ GPUs',
    plainSummary: 'Executing compiled test shaders on physical graphics hardware to see if instructions compute math and memory accurately.',
    demonstrated: 'Hand-written unit test shaders (vertex fetch, texture sampling, ALU, barycentrics, barriers) verified across 30+ GPU/driver combinations (NVIDIA Turing/Ampere/Ada/Blackwell, AMD RDNA1-4, Intel Gen9, Apple M1).',
    notEstablished: 'These are small synthetic test shaders, not the actual game shaders running in a game graphics pipeline.',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida/issues/166',
    sourceName: 'Issue #166 & docs/testing.md',
    evidenceType: 'Multi-Hardware Matrix Test',
    lastChecked: '2026-11-23'
  },
  {
    id: 'models_export',
    name: '3D Models & Geometry Export',
    category: 'Assets & Audio',
    status: 'working',
    statusDisplay: '✅ 382,781 Models Recovered',
    plainSummary: 'Extracting 3D meshes, UV maps, materials, and level geometry into standard OBJ 3D formats.',
    demonstrated: 'Ten-archive scan at decoder pin `e293917` recovered 382,781 models with zero readback decode failures, including 343,327 models from `levels.rpf`.',
    notEstablished: '71 unrecovered fragment candidates in `levels.rpf` remain under investigation. Full bulk OBJ export of entire archive is pending.',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida/blob/main/docs/models.md',
    sourceName: 'docs/models.md & README.md',
    evidenceType: 'Corpus Scan Report',
    lastChecked: '2026-11-23'
  },
  {
    id: 'textures_export',
    name: 'Texture Decoding (DDS & BCPack)',
    category: 'Assets & Audio',
    status: 'working',
    statusDisplay: '✅ BC1-BC5 Working / BC6H-BC7 Limited',
    plainSummary: 'Extracting textures, surface materials, and UI images from custom compressed console formats.',
    demonstrated: 'Decodes BC1, BC3, BC4, BC5 texture chunks into standard DDS textures through clean-room decoder `tools/bcpack.py`.',
    notEstablished: 'Most BC6H and BC7 texture chunks require a local history decompression table which the repo cannot ship due to copyright rules.',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida/blob/main/docs/textures.md',
    sourceName: 'docs/textures.md & README.md',
    evidenceType: 'Code & Documentation Notes',
    lastChecked: '2026-11-23'
  },
  {
    id: 'audio_banks',
    name: 'Audio Bank Extraction (AWC)',
    category: 'Assets & Audio',
    status: 'working',
    statusDisplay: '✅ Lossless Opus & PCM WAV Export',
    plainSummary: 'Unpacking sound effects, dialogue, and audio streams from console AWC containers.',
    demonstrated: 'Opus repackaged losslessly into standard Ogg Opus; PCM streams exported as WAV; XMA2 decoded via ffmpeg. 1,589 audio config records measured.',
    notEstablished: 'Per-track start offsets for music/radio tracks are not yet fully indexed.',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida/blob/main/docs/audio.md',
    sourceName: 'docs/audio.md & docs/audio_config.md',
    evidenceType: 'Format Decoder Implementation',
    lastChecked: '2026-11-23'
  },
  {
    id: 'd3d12_vulkan',
    name: 'Xbox D3D12 → Vulkan Translation Layer',
    category: 'Shaders & Vulkan',
    status: 'in_progress',
    statusDisplay: '⚠️ Core Emulation Working / Surface Untested',
    plainSummary: 'Translating Xbox-specific DirectX 12 graphics commands into cross-platform Vulkan API calls on your PC graphics card.',
    demonstrated: 'Vulkan-backed proxy creates command queues, fences, descriptor heaps, render targets, depth views, samplers, pipelines, and handles barriers/clears/queries.',
    notEstablished: 'Console list tail, descriptor-table record model, mesh-shader draws, indirect draws, and stream output remain open. Not tested against real game exe.',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida/blob/main/docs/d3d12_vulkan.md',
    sourceName: 'docs/d3d12_vulkan.md & Issue #313',
    evidenceType: 'Implementation & Spec Analysis',
    lastChecked: '2026-11-23'
  },
  {
    id: 'ray_tracing_bvh',
    name: 'Ray Tracing Acceleration (BVH)',
    category: 'Shaders & Vulkan',
    status: 'in_progress',
    statusDisplay: '⚠️ GPU BVH4 Builder Works on Synthetic Scenes',
    plainSummary: 'Building and traversing 3D bounding volume hierarchies for hardware ray-traced reflections, shadows, and lighting.',
    demonstrated: 'GPU builder generates BLAS/TLAS in console XDXR BVH4 layout; translated shaders walk triangle nodes via `image_bvh_intersect_ray`. Compaction and refits pass synthetic tests.',
    notEstablished: 'Whether the retail game rehydrates offline pre-built packs or rebuilds them dynamically at runtime is unresolved (#313). Serialization not completed.',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida/blob/main/docs/bvh.md',
    sourceName: 'docs/bvh.md & docs/xdxr.md',
    evidenceType: 'Synthetic Benchmark & Format Reverse Engineering',
    lastChecked: '2026-11-23'
  },
  {
    id: 'controller_input',
    name: 'Game Controller Input (GameInput / SDL3)',
    category: 'Runtime & Platform',
    status: 'working',
    statusDisplay: '✅ Verified on SDL3 GameInput Shim',
    plainSummary: 'Translating console gamepad controls, rumble vibration, and triggers to PC input devices.',
    demonstrated: 'GameInput shim implemented on SDL3: supports any SDL gamepad, haptic rumble, DualSense adaptive triggers, and lightbar effects.',
    notEstablished: 'Console-specific system UI overlays (Xbox guide menus) are not implemented.',
    sourceUrl: 'https://github.com/ItsNotRexed/Leonida/blob/main/docs/gameinput.md',
    sourceName: 'docs/gameinput.md & README.md',
    evidenceType: 'Implemented Shim Code',
    lastChecked: '2026-11-23'
  }
];
