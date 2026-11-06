---
name: react-bits
description: Add animated React components from React Bits (reactbits.dev): text animations, cursor and hover effects, carousels, galleries, menus, micro-interactions, and WebGL backgrounds. Use when a React/Next.js UI needs a hero background, an animated headline, a playful interaction, or "wow" motion, and the user is fine with installing components via the shadcn CLI.
---

# React Bits

The source code is NOT vendored in this repo. React Bits is MIT + Commons Clause, so components are installed into the target project with the shadcn CLI.

## Install a component

The registry name is `<ComponentName>-<JS|TS>-<CSS|TW>`:

```bash
npx shadcn@latest add @react-bits/SplitText-TS-TW
# or without registry config:
npx jsrepo@latest add https://reactbits.dev/r/SplitText-TS-TW
```

- Pick `TS` or `JS` to match the project's language, and `TW` (Tailwind) or `CSS` to match its styling.
- To use the `@react-bits/...` shorthand, add this to `components.json`:
  ```json
  { "registries": { "@react-bits": "https://reactbits.dev/r/{name}.json" } }
  ```
- Read the installed file before using it: check its props and any peer deps it added (e.g. `gsap`, `motion`, `three`, `ogl`).

## Rules of taste

- Use **one or two** showpiece effects per page, typically a hero background plus an animated headline. Do not stack effects in every section.
- Respect `prefers-reduced-motion`: disable or simplify heavy effects.
- Lazy-load WebGL backgrounds (dynamic import, `ssr: false` in Next.js) so they don't block the first paint.
- Colors and fonts come from the project's DESIGN.md / theme tokens, not the demo defaults.

## Catalog (registry names)

- **TextAnimations**: ASCIIText, BlurText, CircularText, CountUp, CurvedLoop, DecryptedText, DepthText, EchoText, FallingText, FoldText, FuzzyText, GlitchText, GradientText, MaskedHeading, ParticleText, RotatingText, ScrambledText, ScrollFloat, ScrollReveal, ScrollVelocity, ShinyText, Shuffle, SplitFlapText, SplitText, StrokeText, TechText, TextCursor, TextLoop, TextPressure, TextType, TrueFocus, VariableProximity, WarpText
- **Animations**: AnimatedContent, BlobCursor, ClickSpark, Crosshair, CrystalizedBall, Cubes, CursorGrid, DitherVeil, ElasticMesh, ElectricBorder, ElectricLogo, FadeContent, GhostCursor, GlareHover, GlowCursor, GradualBlur, HalftoneReveal, ImageTrail, LaserFlow, LogoLoop, Magnet, MetaBalls, MetallicPaint, Noise, OrbitImages, PixelSwap, PixelTrail, PixelTransition, Ribbons, RippleDistortion, ScrollExpand, ShapeBlur, SplashCursor, StarBorder, StickerPeel, Strands, SwarmCursor, TargetCursor
- **Components**: AccordionGallery, AnimatedList, BorderGlow, BounceCards, BubbleMenu, CardNav, CardSwap, Carousel, ChromaGrid, CircularCarousel, CircularGallery, Counter, CurvedInput, DecayCard, DepthCarousel, Dock, DomeGallery, DriftWall, ElasticSlider, FlexCarousel, FlowingMenu, FluidGlass, FlyingPosters, Folder, GlassIcons, GlassSurface, GooeyNav, HoloCard, InfiniteMenu, InfiniteSpiral, Lanyard, LineSidebar, MagicBento, Masonry, ModelViewer, MorphSlider, OptionWheel, PillNav, PixelCard, ProfileCard, ReflectiveCard, ScrollStack, SpecularButton, SpotlightCard, Stack, StaggeredMenu, Stepper, TiltedCard
- **Micro**: BellToggle, BranchedMenu, CallChip, CodeSlots, CometDial, DodgeField, FlipCard, FlyingButton, FolderFloat, FuseButton, GlideSelect, HoldButton, JellyRadio, LatticeLoader, PaperCrumple, PeekRating, PromptBar, PulseHeart, RefineFrame, RubberSegment, ScrubField, Shredder, SlideCommit, SlingButton, SloshGauge, SpringCheck, SquishSwitch, StatusMark, SwipeRow, SwipeToast, TearTicket, ThoughtLine, VoicePill, WakeSlider, WarmTooltip
- **Backgrounds**: AcidSquares, AeroShards, Antigravity, Aurora, Balatro, Ballpit, Beams, CRTWarp, ColorBends, DarkVeil, Dither, DotField, DotGrid, EvilEye, FaultyTerminal, Ferrofluid, FloatingLines, FluxLines, Galaxy, GhostFibers, GradientASCII, GradientBlinds, GradientWaves, Grainient, GridDistortion, GridMotion, GridScan, Hyperspeed, Iridescence, LetterGlitch, LightPillar, LightRays, LightTunnel, Lightfall, Lightning, LineWaves, LiquidChrome, LiquidEther, MagicRings, MagnetLines, MicroSlats, MoltenMetal, Orb, Particles, PatternWaves, PixelBlast, PixelSnow, Plasma, PlasmaWave, Prism, PrismaticBurst, Radar, RippleGrid, Scanner, ShapeGrid, ShapeWaves, SideRays, Silk, SlicedWaves, SoftAurora, Threads, Topography, Waves, WebThreads

Previews: https://reactbits.dev. Many components also have a paid "Pro" tier, so only use the free registry names above unless the user has Pro.
