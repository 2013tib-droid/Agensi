---
name: canvas-ui
description: Add Canvas UI (canvasui.dev) GPU effects that render over a live, interactive page, such as liquid, glass, fire, frost, glitch/VHS, particles, and 3D object effects, for React, Vue, Svelte, Solid, Preact, or vanilla JS. Use when a landing page or hero needs a striking shader/canvas effect wrapped around real DOM content.
---

# Canvas UI

The source code is NOT vendored in this repo (MIT + Commons Clause). Components are installed into the target project via the shadcn registry.

## Install

```bash
npx shadcn@latest init          # if the project has no components.json yet
npx shadcn@latest add @canvas-ui/liquid-react
npx shadcn@latest add @canvas-ui/liquid-react-webgpu   # WebGPU build
```

- The pattern is `@canvas-ui/<slug>-<framework>[-webgpu]`, where framework is one of `react`, `solid`, `preact`, `vue`, `svelte`, or `vanilla`.
- Source lands in `components/canvasui/`. Usage:
  ```tsx
  import { Liquid } from "@/components/canvasui/Liquid";
  <Liquid><YourEntirePage /></Liquid>
  ```
- Default to the WebGL build. WebGPU needs Chrome/Edge 113+, Safari 26+, or Firefox 141+.
- Most effects use the experimental HTML-in-canvas API (Chrome flag/origin trial) and fall back to a GPU overlay elsewhere. The 3D object effects work everywhere. Always check the page still looks right with the fallback.

## Rules of taste

- Use one effect per view, wrapped around the hero or a single feature section, not the whole app.
- Honour `prefers-reduced-motion`, and test on a mid-range phone.

## Catalog (slugs)

- `liquid`: Pointer-driven fluid simulation
- `ripple`: Water ripples from every click
- `cloth`: Fabric rippling in the wind
- `droplets`: Rain running down the screen
- `bubble`: Metaball droplet trailing the cursor
- `displacement`: Grid that ripples away from the cursor
- `blaze`: Sparks, smoke, and heat distortion
- `flame-wrap`: Border of fire around any element
- `force-field`: Energy shield with click shockwaves
- `laser`: Beam that reveals content on scroll
- `glass`: Crystal-ball lens that follows the cursor
- `frost`: Ice that melts under the cursor and refreezes
- `magnify`: Sci-fi scanner lens with a HUD reticle
- `bend`: Folds the page like the face of a cube
- `peel`: Peels back to reveal a second layer
- `clouds`: Mist parted by cursor wind
- `vhs`: Worn tape wave, chroma bleed, and grain
- `glitch`: Broadcast tearing with RGB splits
- `retro-dither`: Dither lens that pixelates the page
- `asciify`: ASCII lens that follows the cursor
- `decrypt-reveal`: Cipher text decrypting at the cursor
- `glyph-rain`: Falling glyphs that light up the page
- `particle-reveal`: Particles merging into crisp UI
- `particle-scroll`: Sand that reassembles on scroll
- `shatter`: 3D glass shards that lift and refract
- `grid`: 3D tiles rippling around the cursor
- `hex-float`: Floating hex tiles with cursor lift
- `canvas`: Woven canvas you drag wet paint across
- `ascii-object`: Redrawn as shape-matched ASCII
- `glass-object`: Liquid glass with real dispersion
- `particle-object`: Particles that scatter and spring back
- `dithered-object`: Rendered through a 1-bit dither
- `liquid-object`: Dragged through swirling liquid

Docs and playground: https://canvasui.dev/components
