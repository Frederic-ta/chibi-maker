# Chibi Maker — MVP Brief

## Concept
Mobile-first web app to create custom chibi characters, export as B&W PNG for thermal printing (Phomemo M02S).
Hosted on GitHub Pages. 100% client-side, no server.

## Core Architecture

### Layer System (z-index bottom to top)
1. **Body/Silhouette** — base body shape
2. **Skin color** — fill color for skin areas (for screen; B&W on export)
3. **Clothes** — top, bottom, accessories
4. **Head/Face shape** — round, square, oval, etc.
5. **Eyes** — various styles (cute, cool, angry, etc.)
6. **Mouth/Expression** — smile, smirk, open, etc.
7. **Hair back** — behind the head (long hair, ponytail, etc.)
8. **Hair front** — bangs, fringe, side hair
9. **Accessories** — hat, glasses, jewelry, etc.

### Anchor System
- Each head/face shape defines anchor points: eyes zone, mouth zone, hat anchor, glasses anchor
- Elements SNAP to their designated anchor — user picks WHICH element, not WHERE
- No drag-and-drop needed — automatic placement
- Different face shapes have different anchor positions

### Assets Format: SVG
- Vector = scalable without quality loss
- Native B&W (perfect for thermal printing)
- Lightweight (few KB each)
- Recolorable via CSS/code (future color support)
- Transparent layers native

### Asset Structure
```
assets/
  bodies/       → body-01.svg, body-02.svg...
  heads/        → head-round.svg, head-square.svg, head-oval.svg...
  eyes/         → eyes-cute.svg, eyes-cool.svg, eyes-happy.svg...
  mouths/       → mouth-smile.svg, mouth-smirk.svg, mouth-open.svg...
  hair-back/    → hair-back-long.svg, hair-back-short.svg...
  hair-front/   → hair-front-bangs.svg, hair-front-side.svg...
  hats/         → hat-cap.svg, hat-beret.svg, hat-crown.svg...
  glasses/      → glasses-round.svg, glasses-square.svg...
  clothes/      → shirt-tee.svg, hoodie.svg, dress.svg...
```

Each SVG has metadata (name, category, anchor points, z-index) defined in a central JS data file.

### MVP Asset Count (generate procedurally in SVG code)
- 3 body types
- 4 head shapes
- 8 eye styles
- 6 mouth expressions
- 6 hair-back styles
- 6 hair-front styles
- 4 hat options (+ "none")
- 3 glasses options (+ "none")
- 6 clothing options
Total: ~46 elements = lots of combinations

### SVG Generation
For MVP, generate ALL SVGs procedurally in JavaScript using SVG path data.
No external files needed. Each part is a JS function returning SVG markup.
This keeps it 100% self-contained.

## UI Design

### Layout (mobile-first)
```
┌─────────────────────────┐
│     CHIBI PREVIEW       │
│    (live, centered)     │
│                         │
│    [character here]     │
│                         │
├─────────────────────────┤
│  Category bar (icons)   │
│  👤|😊|👀|👄|💇|👕|🎩  │
├─────────────────────────┤
│  Options carousel       │
│  [opt1][opt2][opt3]...  │
│  (horizontal scroll)    │
├─────────────────────────┤
│  [🔄 Random] [📥 Export]│
└─────────────────────────┘
```

### Interaction
- Tap category → shows horizontal carousel of options
- Tap option → instant live preview update
- Swipe carousel to browse more options
- Random button → randomize all parts
- Export button → generates PNG (B&W, high res for print)

### Export
- Canvas-based PNG export
- Black outlines on white background (thermal print ready)
- Resolution: 384px wide minimum (Phomemo M02S native width)
- Option to adjust size
- Download as PNG file

## Technical Stack
- HTML/CSS/JS vanilla (no framework)
- SVG for all character parts (inline, generated in JS)
- Canvas API for PNG export
- localStorage for saving favorite chibis
- Mobile-first responsive CSS
- Dark theme UI (consistent with Fred's other apps)

## Style Guidelines
- Chibi proportions: big head (60% of total height), small body
- Kawaii aesthetic: rounded shapes, big eyes, minimal details
- Clean black outlines, solid fills
- Print-friendly: clear contrast, no gradients on B&W export
- French UI

## File Structure
```
index.html
css/style.css
js/
  app.js          — Main app logic, UI routing
  parts.js        — All SVG part definitions + metadata + anchors
  renderer.js     — SVG composition engine (layers, anchors, preview)
  exporter.js     — Canvas-based PNG export
  storage.js      — localStorage for saved chibis
```

## Priority
Build it all in one go. Make it feel polished and fun to use.
The random button should produce surprisingly good results every time.
