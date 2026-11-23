/**
 * Plain-English glossary of reverse engineering and programming terms for Leonida Watch
 * Formatted for students and newcomers.
 */

export const GLOSSARY_TERMS = [
  {
    term: 'Static Recompilation',
    short: 'Translating code ahead of time rather than running a heavy emulator.',
    details: 'Traditional console emulators (like RPCS3 or PCSX2) have to simulate the entire console CPU and GPU cycle-by-cycle while the game is running, which takes huge processing power. Because the Xbox Series X already uses an x86-64 processor just like your gaming PC, Leonida translates console binaries and shaders ahead of time into native PC code so it runs at near-native PC speeds without a heavy virtual console.',
    category: 'Architecture'
  },
  {
    term: 'Shader',
    short: 'A mini-program that runs millions of times per second on the graphics card.',
    details: 'Shaders calculate the exact color of every pixel (Pixel Shader), the positions of 3D polygon corners (Vertex Shader), complex lighting and physics math (Compute Shader), or high-detail geometry (Mesh Shader). Leonida has to extract all 26,503 shaders from the console format and translate them to work on PC graphics cards.',
    category: 'Graphics'
  },
  {
    term: 'SPIR-V',
    short: 'The universal language for graphics shaders used by Vulkan.',
    details: 'SPIR-V is a standardized intermediate binary code format created by Khronos. When Leonida translates the Xbox RDNA2 machine code into SPIR-V, your PC graphics driver (NVIDIA, AMD, or Intel) can turn it into instructions your specific graphics card understands.',
    category: 'Graphics'
  },
  {
    term: 'Vulkan',
    short: 'A modern, high-performance graphics engine language (API).',
    details: 'Vulkan gives programmers direct control over the GPU with minimal overhead. Leonida maps the Xbox version of DirectX 12 onto Vulkan so the game can run efficiently across Windows, Linux (via Wine/Proton), and other platforms.',
    category: 'Graphics'
  },
  {
    term: 'Booting',
    short: 'The program starts executing its main loop without crashing immediately.',
    details: 'Booting is Milestone #1 in game porting. It means the executable can load into RAM, initialize its basic variables, set up memory allocators, and begin running its engine loops. Passing a test on a test runner is NOT booting the real game.',
    category: 'Milestones'
  },
  {
    term: 'First Frame',
    short: 'The very first picture or graphics frame rendered to the monitor.',
    details: 'After a game boots, it has to set up its 3D graphics pipeline, load initial textures and shaders, clear the screen, and present an image to the swapchain. Reaching the first frame is a major milestone in reverse engineering, even if it is just a black screen with a loading icon.',
    category: 'Milestones'
  },
  {
    term: 'Playable',
    short: 'The player can move, control a character, and play missions without game-breaking bugs.',
    details: 'A game can boot and display graphics but still be completely unplayable due to physics glitches, missing collision detection, crashing audio, or broken game logic. Playability is the final phase of game porting.',
    category: 'Milestones'
  },
  {
    term: 'Executable (.exe) & PE',
    short: 'The main compiled application file containing machine code instructions.',
    details: 'PE stands for Portable Executable, the standard file format for Windows and Xbox executable files. The PE loader in Leonida reads this file, lays out sections in virtual memory, and connects internal functions to external libraries.',
    category: 'Architecture'
  },
  {
    term: 'Imports, Exports & Shims',
    short: 'Bridge code that translates console system calls into PC system calls.',
    details: 'When a game calls a console-exclusive function (like Xbox memory allocation `XMem` or Xbox controller calls `GameInput`), a "shim" intercepts that call and translates it into an equivalent Windows or SDL3 function so the game gets the response it expects without crashing.',
    category: 'Architecture'
  },
  {
    term: 'Wave64 vs Wave32',
    short: 'How many threads a graphics card bundles together to execute at the exact same moment.',
    details: 'AMD RDNA2 GPUs (in the Xbox Series and RX 6000 graphics cards) often group calculations into "waves" of 64 parallel threads. NVIDIA and Intel GPUs group calculations in waves of 32 threads. Leonida includes special "Wave64 emulation" so games written expecting 64-wide hardware can run correctly on 32-wide PC graphics cards.',
    category: 'Hardware'
  },
  {
    term: 'BVH (Bounding Volume Hierarchy)',
    short: 'Tree structures in 3D space used for hardware ray tracing.',
    details: 'To figure out whether a ray of light hits a car, a building, or a raindrop, graphics cards organize all 3D triangles into nested bounding boxes (BVH). Leonida reconstructs the console XDXR BVH4 structures so the translated shaders can cast ray-traced reflections and lighting.',
    category: 'Graphics'
  },
  {
    term: 'RPF9 Archives',
    short: 'The custom package file format used by Rockstar Games to store assets.',
    details: 'Just like a .zip or .rar file, RPF archives bundle thousands of textures, audio files, 3D models, and animations together. Leonida uses a clean-room extractor (`rpf9dump`) to read these archives from your legally owned game copy.',
    category: 'Assets'
  }
];
