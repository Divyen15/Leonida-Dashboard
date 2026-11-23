/**
 * Explains technical commits and PRs in plain English for high school students
 * and reverse-engineering beginners.
 * 
 * Strict accuracy rules:
 * - Never claim something is running if it's only a test or stub
 * - Explicitly state what a change DOES NOT prove
 * - Tag evidence level accurately
 */

export function categorizeItem(text) {
  const lower = (text || '').toLowerCase();
  
  if (lower.includes('shader') || lower.includes('spirv') || lower.includes('rdna') || lower.includes('vulkan') || lower.includes('d3d12') || lower.includes('bvh') || lower.includes('raytracing') || lower.includes('xdxr') || lower.includes('wave64')) {
    return { id: 'graphics', label: 'Graphics & Shaders', color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800' };
  }
  if (lower.includes('runtime') || lower.includes('gta6rt') || lower.includes('loader') || lower.includes('xmem') || lower.includes('pe') || lower.includes('gdk') || lower.includes('shim') || lower.includes('wine') || lower.includes('proton') || lower.includes('tls')) {
    return { id: 'runtime', label: 'Runtime & Loader', color: 'text-indigo-400 bg-indigo-950/60 border-indigo-800' };
  }
  if (lower.includes('model') || lower.includes('texture') || lower.includes('bcpack') || lower.includes('rpf') || lower.includes('audio') || lower.includes('awc') || lower.includes('opus') || lower.includes('wav') || lower.includes('glb')) {
    return { id: 'assets', label: 'Assets & Audio', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800' };
  }
  if (lower.includes('test') || lower.includes('ci') || lower.includes('workflow') || lower.includes('check') || lower.includes('harness')) {
    return { id: 'testing', label: 'Tests & Verification', color: 'text-amber-400 bg-amber-950/60 border-amber-800' };
  }
  if (lower.includes('doc') || lower.includes('readme') || lower.includes('guide') || lower.includes('comment') || lower.includes('typo') || lower.includes('license')) {
    return { id: 'documentation', label: 'Documentation', color: 'text-slate-300 bg-slate-900/60 border-slate-700' };
  }
  return { id: 'other', label: 'Tooling & Build Scripts', color: 'text-purple-400 bg-purple-950/60 border-purple-800' };
}

export function explainChange(title, body = '', author = '', isPR = false, prState = '') {
  const t = (title || '').toLowerCase();
  const b = (body || '').toLowerCase();
  const full = `${t} ${b}`;

  let whatChanged = title;
  let simpleMeaning = '';
  let whyItMatters = '';
  let whatItDoesNotProve = '';
  let closerToBooting = 'Indirect infrastructure preparation';

  if (full.includes('wave64') || full.includes('subgroup')) {
    simpleMeaning = 'Refining how 64-thread shader instructions from the Xbox GPU are handled on PC graphics cards.';
    whyItMatters = 'Xbox graphics cards process shaders in 64-thread bundles. NVIDIA and Intel cards process in 32-thread bundles. Getting this logic right prevents visual artifacts on NVIDIA and Intel PC graphics cards.';
    whatItDoesNotProve = 'This does NOT mean the game is rendering graphics or that shaders have been tested inside the actual running game.';
    closerToBooting = 'Prevents shader rendering crashes once the game graphics pipeline begins drawing.';
  } else if (full.includes('bvh') || full.includes('raytracing') || full.includes('xdxr')) {
    simpleMeaning = 'Improving the data structures (BVH) that the graphics card uses to calculate ray-traced lighting and reflections.';
    whyItMatters = 'Ray tracing needs quick geometric bounding boxes to check where light rays bounce off cars, water, and buildings. Validating header offsets and packing keeps the ray-tracing engine stable.';
    whatItDoesNotProve = 'This does NOT mean real-time ray-traced gameplay has been seen or tested on an active game frame.';
    closerToBooting = 'Ensures the ray tracing subsystem will not crash when requested by the game engine.';
  } else if (full.includes('xmem') || full.includes('pagewritecombine') || full.includes('nocache') || full.includes('wine') || full.includes('proton')) {
    simpleMeaning = 'Adjusting memory allocation flags so the runtime works smoothly under Linux compatibility layers (Wine / Steam Proton).';
    whyItMatters = 'Linux and Wine can be strict about special memory caching flags (`PAGE_WRITECOMBINE`). Cleaning these up prevents crashes when booting test programs on Linux and Steam Deck.';
    whatItDoesNotProve = 'This is an improvement for compatibility testing on Linux, but the real retail game is still not booting yet.';
    closerToBooting = 'Helps the loader initialize memory correctly without being rejected by the operating system kernel.';
  } else if (full.includes('awc') || full.includes('audio') || full.includes('opus') || full.includes('wav')) {
    simpleMeaning = 'Improving how audio banks and sound clips are extracted or scanned from game archives.';
    whyItMatters = 'Allows sound effects, dialogue, and radio stations to be extracted cleanly without missing files or silent audio playback.';
    whatItDoesNotProve = 'Extracting sound files from archives does NOT mean the game audio engine is running or triggering sounds during gameplay.';
    closerToBooting = 'Ensures game assets are ready when the audio subsystem starts up.';
  } else if (full.includes('glb') || full.includes('model') || full.includes('levels.rpf')) {
    simpleMeaning = 'Enhancing the 3D model exporter and validation reports for vehicles, buildings, and character meshes.';
    whyItMatters = 'Making inspection reports atomic and accurate ensures broken 3D models are quickly caught and fixed.';
    whatItDoesNotProve = 'Exporting models to 3D files (like GLB or OBJ) does NOT mean the game world is loaded in real-time.';
    closerToBooting = 'Asset preparation: guarantees geometry is decoded correctly from disk.';
  } else if (full.includes('merge') || full.includes('squash') || full.includes('script')) {
    simpleMeaning = 'Improving development tools, merge automation, or helper scripts for project contributors.';
    whyItMatters = 'Helps the project maintainers organize pull requests cleanly and prevent duplicate code changes.';
    whatItDoesNotProve = 'This is an internal repository management tool; it does not change game code or runtime behavior.';
    closerToBooting = 'Developer tooling only; no direct effect on booting.';
  } else if (full.includes('doc') || full.includes('readme') || full.includes('guide')) {
    simpleMeaning = 'Updating documentation, instructions, or project notes to explain technical details clearly.';
    whyItMatters = 'Keeps developers and researchers aligned on how the tools and translation layers function.';
    whatItDoesNotProve = 'Documentation updates describe what exists or is planned, but do not change the program binary.';
    closerToBooting = 'Informational only.';
  } else {
    simpleMeaning = 'Modifying project code or build tools to address bugs or improve compatibility.';
    whyItMatters = 'Ongoing reverse-engineering and code refinement across the project repository.';
    whatItDoesNotProve = 'Code changes do not imply the game is booting or playable unless explicitly verified in testing.';
    closerToBooting = 'Incremental codebase progress.';
  }

  // Evidence level
  let evidenceLevel = 'Inferred Analysis';
  let evidenceClass = 'text-slate-400 bg-slate-900/60 border-slate-700';

  if (isPR) {
    if (prState === 'closed') {
      evidenceLevel = 'Merged Pull Request (Peer Reviewed)';
      evidenceClass = 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
    } else {
      evidenceLevel = 'Open Community Proposal (Unmerged)';
      evidenceClass = 'text-amber-400 bg-amber-950/60 border-amber-800';
    }
  } else {
    evidenceLevel = 'Direct Developer Commit (main branch)';
    evidenceClass = 'text-cyan-400 bg-cyan-950/60 border-cyan-800';
  }

  return {
    whatChanged,
    simpleMeaning,
    whyItMatters,
    whatItDoesNotProve,
    closerToBooting,
    evidenceLevel,
    evidenceClass
  };
}
