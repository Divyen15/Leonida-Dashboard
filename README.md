# Leonida Watch 🎮🔍

> A polished, evidence-backed tracker and plain-English development explainer for the public **[Leonida](https://github.com/ItsNotRexed/Leonida)** project.

---

## 📖 What is Leonida?

**Leonida** is an open-source static recompilation project aimed at porting the **Xbox Series X|S version of Grand Theft Auto VI** to run natively on Windows PCs (and Linux via Wine/Proton). 

Because the Xbox Series console uses an x86-64 CPU and an AMD RDNA2 GPU—architectures very similar to standard gaming PCs—Leonida translates console code and shaders ahead of time instead of simulating an entire console in real-time with a heavy emulator.

> **CRITICAL ZERO-COPYRIGHT POLICY:**  
> Neither Leonida nor Leonida Watch hosts, decrypts, downloads, or distributes proprietary game executables, decryption keys, or copyrighted assets. Leonida's build tools compile from a user's own legally purchased game files on their local PC.

---

## ⚡ Quick Start: Running the Dashboard Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or newer (tested on Node v24).

### Step 1: Install Dependencies
Open a terminal in this project folder and run:
```bash
npm install
```

### Step 2: Start the Development Server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

*(Alternatively, to run the optimized production preview: `npm run build && npm run preview` and open `http://localhost:4173/`)*.

---

## 🧭 Dashboard Architecture & Core Features

### 1. Hero & Core Status Cards
Directly answers the three fundamental questions using verified repository documentation:
- **Can the game boot?** ❌ **No.** (*"Early. The game does not boot yet."* Only a synthetic stand-in executable `gta6rt` runs to test loader stubs; real game binaries have not booted).
- **Is there a first frame?** ❌ **No.** (No visual game graphics or swapchain frames have been presented).
- **Is anything playable?** ❌ **No.** (Zero missions, movement, physics, or story mode).

### 2. Interactive Milestone Wheel
Inspired by the circular visualization in Team Panel, but strictly adheres to reverse-engineering accuracy:
- **Measures tracked milestone labels, NOT game completion percentage.**
- Categorizes milestones into 4 evidence-backed states:
  1. 🟢 **Documented Working / Test Passed** (e.g. all 26,503 shaders carved, disassembled, and validated with `spirv-val`; 382,781 3D models recovered; lossless Opus/WAV audio export; SDL3 controller shims).
  2. 🟡 **In Progress / Partial / Synthetic Only** (e.g. standalone GPU test shaders on 30+ GPUs; D3D12→Vulkan command lists; ray tracing BVH4 builder on synthetic scenes; PE loader stand-in exe).
  3. 🔴 **Not Yet Achieved** (e.g. real game boot, first frame, playable gameplay).
  4. ⚪ **Unknown / Not Verified** (items where evidence is contradictory or inconclusive).
- Clicking any segment of the wheel or legend filters the milestone cards below to inspect what was demonstrated, what has NOT been established, and the direct GitHub citation.

### 3. Activity Feed & "What Changed?" Plain-English Explanations
- Filterable feed tracking real public GitHub commits, merged pull requests, open community proposals, and documentation updates.
- Expandable **"What Changed?"** drawers written for students:
  - **What changed:** Technical summary in plain English.
  - **Why it matters:** Impact on the recompilation pipeline.
  - **What it does NOT prove:** Clear boundary preventing false hype (e.g., explaining that exporting 3D models or validating shaders does not mean the game is running).
  - **Evidence level:** Clearly distinguishes direct developer commits from unmerged community pull requests.

### 4. Interactive Glossary
Explains reverse-engineering terms in simple language:
*Shaders, Vulkan, SPIR-V, Runtime, Executable (.exe), Imports & Shims, Assets, Booting, First Frame, Playability, Wave64 vs Wave32, BVH (Ray Tracing), and RPF9 Archives.*

### 5. Factual Milestone Timeline
Chronological record of verified project milestones with exact dates and links to public commits.

---

## 🔒 Accuracy Rules: How Data is Verified

1. **No Invented Numbers:** Commit counts, lines of code, and stars are never treated as a percentage of game completion.
2. **Syntactic Validation ≠ Visual Correctness:** Passing Khronos `spirv-val` proves shaders are structurally valid, but does not prove they draw the right visual image on screen.
3. **Stand-in Programs ≠ Game Boot:** Running `gta6rt` verifies the loader harness on mock code; it is not the real game executing.
4. **Rate Limit Handling:** Unauthenticated GitHub API calls are limited to 60 requests/hour per IP. Leonida Watch bundles an offline snapshot of verified data so the dashboard never breaks or displays blank screens.

---

## 🤖 AI Summaries & Unattended Updates (Phases 1, 2, 3)

### Phase 1 — Free & Local (Active by Default)
- **Status:** Fully functional right now.
- **Cost:** $0.00. No API key, no account, and no payment required.
- Uses deterministic, rule-based classification and verified documentation tables.

### Phase 2 — Optional Server-Side Gemini API
- **Important Note on Google AI Pro:** A Google AI Pro consumer subscription covers consumer apps (like Gemini Advanced), but does *not* provide programmatic API credits for custom websites.
- **How to use free Gemini API:** Google AI Studio offers a free-tier API key with rate limits and no credit card required at [aistudio.google.com](https://aistudio.google.com/).
- **How to activate:**
  1. Copy `.env.example` to `.env`.
  2. Set `GEMINI_API_KEY=your_key_here`.
  3. Run `npm run server` to start the Node.js security proxy (`server/gemini_proxy.js`).
  - *The API key is strictly kept server-side and is never sent to the browser.*

### Phase 3 — Unattended Monitoring (GitHub Actions)
- A ready-to-use workflow is provided at `.github/workflows/tracker.yml`.
- Can run on a scheduled cron (e.g. every 6 hours) inside your own dashboard repository.
- Does not run continuous AI agent loops and uses GitHub Actions' free public repository minutes ($0).

---

## 🚀 How to Publish the Dashboard for Free

Because Leonida Watch builds into a standard static site, you can host it for free on any modern web host:

### Option A: GitHub Pages ($0)
1. Push this folder to a new repository on your GitHub account (e.g., `leonida-watch`).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** (or deploy the `dist/` folder).
4. Because `vite.config.js` uses `base: './'`, all paths work out-of-the-box on GitHub Pages subpaths.

### Option B: Vercel or Netlify ($0 Free Tier)
1. Connect your repository to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Deploy!

---

## ⚠️ Current Limitations & Uncertainties

- **Real Executable Untested:** All loader and D3D12→Vulkan results currently reflect stand-in test executables and synthetic shaders. No tests have been conducted against the retail game binary.
- **Wave64 on 32-wide GPUs:** Cross-half wave operations in vertex/pixel shaders on NVIDIA and Intel GPUs are currently approximate.
- **BC6H/BC7 Textures:** High-dynamic-range and compressed texture decoding for certain archives requires a local history table that cannot be distributed due to copyright rules.
- **GitHub API Rate Limits:** Without a personal access token, client-side browsers share a 60 request/hour limit. The app falls back to the verified bundled snapshot when limited.

---

## 📄 License

Leonida Watch is released under the **GNU General Public License v3.0 (GPLv3)** in alignment with the Leonida project license.
