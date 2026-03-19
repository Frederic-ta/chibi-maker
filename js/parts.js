/**
 * parts.js — All SVG chibi part definitions, procedurally generated.
 * Each part is a function returning SVG markup (group element content).
 * Anchors are defined per head shape for snapping eyes, mouth, hat, glasses.
 */

const PARTS = {
  // ─── CATEGORIES ─────────────────────────────────────
  categories: [
    { id: 'body',      label: 'Corps',      icon: '👤' },
    { id: 'head',      label: 'Tête',       icon: '🟡' },
    { id: 'eyes',      label: 'Yeux',       icon: '👀' },
    { id: 'mouth',     label: 'Bouche',     icon: '👄' },
    { id: 'hairBack',  label: 'Cheveux ▼',  icon: '💇' },
    { id: 'hairFront', label: 'Cheveux ▲',  icon: '✂️' },
    { id: 'clothes',   label: 'Vêtements',  icon: '👕' },
    { id: 'hat',       label: 'Chapeau',    icon: '🎩' },
    { id: 'glasses',   label: 'Lunettes',   icon: '👓' },
  ],

  // ─── BODIES ─────────────────────────────────────────
  body: [
    {
      id: 'body-small',
      name: 'Petit',
      // Neck connects at y~155, body goes to ~290
      svg: () => `
        <g class="part-body">
          <!-- Neck -->
          <rect x="90" y="155" width="20" height="18" rx="4" fill="#fff" stroke="#000" stroke-width="2"/>
          <!-- Torso -->
          <path d="M72 173 Q72 168 80 168 L120 168 Q128 168 128 173 L132 235 Q132 245 125 248 L75 248 Q68 245 68 235 Z"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <!-- Arms -->
          <path d="M72 178 Q55 182 50 205 Q48 215 55 218 Q62 220 65 210 L68 195"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <path d="M128 178 Q145 182 150 205 Q152 215 145 218 Q138 220 135 210 L132 195"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <!-- Legs -->
          <path d="M80 248 L78 280 Q78 288 85 288 L92 288 Q96 288 96 282 L95 248"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <path d="M105 248 L104 280 Q104 288 108 288 L115 288 Q122 288 122 282 L120 248"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <!-- Feet -->
          <ellipse cx="87" cy="289" rx="12" ry="5" fill="#fff" stroke="#000" stroke-width="2"/>
          <ellipse cx="113" cy="289" rx="12" ry="5" fill="#fff" stroke="#000" stroke-width="2"/>
        </g>`,
      neckY: 155,
    },
    {
      id: 'body-medium',
      name: 'Moyen',
      svg: () => `
        <g class="part-body">
          <rect x="88" y="155" width="24" height="18" rx="5" fill="#fff" stroke="#000" stroke-width="2"/>
          <path d="M68 173 Q68 166 78 166 L122 166 Q132 166 132 173 L136 240 Q136 252 126 254 L74 254 Q64 252 64 240 Z"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <!-- Arms -->
          <path d="M68 180 Q48 186 44 212 Q42 224 50 226 Q58 228 60 216 L64 198"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <path d="M132 180 Q152 186 156 212 Q158 224 150 226 Q142 228 140 216 L136 198"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <!-- Legs -->
          <path d="M78 254 L76 282 Q76 290 83 290 L93 290 Q98 290 97 284 L95 254"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <path d="M105 254 L103 282 Q103 290 107 290 L117 290 Q124 290 123 284 L122 254"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <ellipse cx="87" cy="291" rx="14" ry="5" fill="#fff" stroke="#000" stroke-width="2"/>
          <ellipse cx="113" cy="291" rx="14" ry="5" fill="#fff" stroke="#000" stroke-width="2"/>
        </g>`,
      neckY: 155,
    },
    {
      id: 'body-round',
      name: 'Rond',
      svg: () => `
        <g class="part-body">
          <rect x="88" y="155" width="24" height="15" rx="5" fill="#fff" stroke="#000" stroke-width="2"/>
          <!-- Chubby round torso -->
          <ellipse cx="100" cy="215" rx="42" ry="48" fill="#fff" stroke="#000" stroke-width="2"/>
          <!-- Arms (stubby) -->
          <path d="M58 200 Q40 208 38 225 Q37 234 45 235 Q52 236 54 226 L58 212"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <path d="M142 200 Q160 208 162 225 Q163 234 155 235 Q148 236 146 226 L142 212"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <!-- Stubby legs -->
          <path d="M82 258 L80 280 Q80 288 87 288 L95 288 Q100 288 99 282 L96 258"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <path d="M104 258 L102 280 Q102 288 107 288 L115 288 Q120 288 120 282 L118 258"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <ellipse cx="88" cy="289" rx="13" ry="5" fill="#fff" stroke="#000" stroke-width="2"/>
          <ellipse cx="112" cy="289" rx="13" ry="5" fill="#fff" stroke="#000" stroke-width="2"/>
        </g>`,
      neckY: 155,
    },
  ],

  // ─── HEADS ──────────────────────────────────────────
  head: [
    {
      id: 'head-round',
      name: 'Rond',
      svg: () => `
        <g class="part-head">
          <circle cx="100" cy="90" r="62" fill="#fff" stroke="#000" stroke-width="2.5"/>
          <!-- Ears -->
          <ellipse cx="38" cy="95" rx="8" ry="12" fill="#fff" stroke="#000" stroke-width="2"/>
          <ellipse cx="162" cy="95" rx="8" ry="12" fill="#fff" stroke="#000" stroke-width="2"/>
          <!-- Cheek blush hints -->
          <ellipse cx="60" cy="105" rx="10" ry="6" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.3"/>
          <ellipse cx="140" cy="105" rx="10" ry="6" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.3"/>
        </g>`,
      anchors: { eyeY: 85, mouthY: 115, hatY: 28, glassesY: 82, eyeSpread: 22 },
    },
    {
      id: 'head-square',
      name: 'Carré',
      svg: () => `
        <g class="part-head">
          <rect x="40" y="32" width="120" height="125" rx="18" fill="#fff" stroke="#000" stroke-width="2.5"/>
          <ellipse cx="40" cy="95" rx="7" ry="11" fill="#fff" stroke="#000" stroke-width="2"/>
          <ellipse cx="160" cy="95" rx="7" ry="11" fill="#fff" stroke="#000" stroke-width="2"/>
          <ellipse cx="62" cy="108" rx="10" ry="6" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.3"/>
          <ellipse cx="138" cy="108" rx="10" ry="6" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.3"/>
        </g>`,
      anchors: { eyeY: 88, mouthY: 118, hatY: 30, glassesY: 85, eyeSpread: 24 },
    },
    {
      id: 'head-oval',
      name: 'Ovale',
      svg: () => `
        <g class="part-head">
          <ellipse cx="100" cy="88" rx="55" ry="66" fill="#fff" stroke="#000" stroke-width="2.5"/>
          <ellipse cx="45" cy="92" rx="7" ry="10" fill="#fff" stroke="#000" stroke-width="2"/>
          <ellipse cx="155" cy="92" rx="7" ry="10" fill="#fff" stroke="#000" stroke-width="2"/>
          <ellipse cx="64" cy="104" rx="9" ry="5" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.3"/>
          <ellipse cx="136" cy="104" rx="9" ry="5" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.3"/>
        </g>`,
      anchors: { eyeY: 84, mouthY: 114, hatY: 22, glassesY: 81, eyeSpread: 20 },
    },
    {
      id: 'head-heart',
      name: 'Coeur',
      svg: () => `
        <g class="part-head">
          <path d="M100 155 Q40 140 35 85 Q32 55 60 38 Q78 28 92 42 L100 52 L108 42 Q122 28 140 38 Q168 55 165 85 Q160 140 100 155Z"
                fill="#fff" stroke="#000" stroke-width="2.5"/>
          <ellipse cx="38" cy="88" rx="7" ry="10" fill="#fff" stroke="#000" stroke-width="2"/>
          <ellipse cx="162" cy="88" rx="7" ry="10" fill="#fff" stroke="#000" stroke-width="2"/>
          <ellipse cx="62" cy="102" rx="9" ry="5" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.3"/>
          <ellipse cx="138" cy="102" rx="9" ry="5" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.3"/>
        </g>`,
      anchors: { eyeY: 88, mouthY: 118, hatY: 30, glassesY: 85, eyeSpread: 22 },
    },
  ],

  // ─── EYES ───────────────────────────────────────────
  eyes: [
    {
      id: 'eyes-cute',
      name: 'Mignon',
      svg: (a) => {
        const y = a.eyeY, s = a.eyeSpread;
        return `<g class="part-eyes">
          <!-- Left eye -->
          <ellipse cx="${100-s}" cy="${y}" rx="10" ry="12" fill="#000"/>
          <ellipse cx="${100-s-3}" cy="${y-4}" rx="4" ry="5" fill="#fff"/>
          <ellipse cx="${100-s+3}" cy="${y+2}" rx="2" ry="2.5" fill="#fff"/>
          <!-- Right eye -->
          <ellipse cx="${100+s}" cy="${y}" rx="10" ry="12" fill="#000"/>
          <ellipse cx="${100+s-3}" cy="${y-4}" rx="4" ry="5" fill="#fff"/>
          <ellipse cx="${100+s+3}" cy="${y+2}" rx="2" ry="2.5" fill="#fff"/>
        </g>`;
      }
    },
    {
      id: 'eyes-cool',
      name: 'Cool',
      svg: (a) => {
        const y = a.eyeY, s = a.eyeSpread;
        return `<g class="part-eyes">
          <line x1="${100-s-8}" y1="${y-3}" x2="${100-s+8}" y2="${y-3}" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
          <ellipse cx="${100-s}" cy="${y+2}" rx="8" ry="7" fill="#000"/>
          <ellipse cx="${100-s-2}" cy="${y}" rx="3" ry="3" fill="#fff"/>
          <line x1="${100+s-8}" y1="${y-3}" x2="${100+s+8}" y2="${y-3}" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
          <ellipse cx="${100+s}" cy="${y+2}" rx="8" ry="7" fill="#000"/>
          <ellipse cx="${100+s-2}" cy="${y}" rx="3" ry="3" fill="#fff"/>
        </g>`;
      }
    },
    {
      id: 'eyes-happy',
      name: 'Heureux',
      svg: (a) => {
        const y = a.eyeY, s = a.eyeSpread;
        return `<g class="part-eyes">
          <path d="M${100-s-10} ${y+2} Q${100-s} ${y-12} ${100-s+10} ${y+2}" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M${100+s-10} ${y+2} Q${100+s} ${y-12} ${100+s+10} ${y+2}" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
        </g>`;
      }
    },
    {
      id: 'eyes-wink',
      name: 'Clin d\'oeil',
      svg: (a) => {
        const y = a.eyeY, s = a.eyeSpread;
        return `<g class="part-eyes">
          <ellipse cx="${100-s}" cy="${y}" rx="10" ry="12" fill="#000"/>
          <ellipse cx="${100-s-3}" cy="${y-4}" rx="4" ry="5" fill="#fff"/>
          <ellipse cx="${100-s+3}" cy="${y+2}" rx="2" ry="2.5" fill="#fff"/>
          <path d="M${100+s-10} ${y+2} Q${100+s} ${y-8} ${100+s+10} ${y+2}" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
        </g>`;
      }
    },
    {
      id: 'eyes-surprised',
      name: 'Surpris',
      svg: (a) => {
        const y = a.eyeY, s = a.eyeSpread;
        return `<g class="part-eyes">
          <circle cx="${100-s}" cy="${y}" r="12" fill="#fff" stroke="#000" stroke-width="2"/>
          <circle cx="${100-s}" cy="${y+1}" r="6" fill="#000"/>
          <circle cx="${100-s-2}" cy="${y-2}" r="2.5" fill="#fff"/>
          <circle cx="${100+s}" cy="${y}" r="12" fill="#fff" stroke="#000" stroke-width="2"/>
          <circle cx="${100+s}" cy="${y+1}" r="6" fill="#000"/>
          <circle cx="${100+s-2}" cy="${y-2}" r="2.5" fill="#fff"/>
        </g>`;
      }
    },
    {
      id: 'eyes-angry',
      name: 'Fâché',
      svg: (a) => {
        const y = a.eyeY, s = a.eyeSpread;
        return `<g class="part-eyes">
          <line x1="${100-s-10}" y1="${y-10}" x2="${100-s+6}" y2="${y-5}" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
          <ellipse cx="${100-s}" cy="${y+2}" rx="8" ry="9" fill="#000"/>
          <ellipse cx="${100-s-2}" cy="${y}" rx="3" ry="3.5" fill="#fff"/>
          <line x1="${100+s+10}" y1="${y-10}" x2="${100+s-6}" y2="${y-5}" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
          <ellipse cx="${100+s}" cy="${y+2}" rx="8" ry="9" fill="#000"/>
          <ellipse cx="${100+s-2}" cy="${y}" rx="3" ry="3.5" fill="#fff"/>
        </g>`;
      }
    },
    {
      id: 'eyes-sparkle',
      name: 'Étincelle',
      svg: (a) => {
        const y = a.eyeY, s = a.eyeSpread;
        // Big kawaii sparkle eyes with star highlights
        return `<g class="part-eyes">
          <ellipse cx="${100-s}" cy="${y}" rx="12" ry="14" fill="#000"/>
          <ellipse cx="${100-s-3}" cy="${y-5}" rx="5" ry="6" fill="#fff"/>
          <ellipse cx="${100-s+4}" cy="${y+3}" rx="3" ry="3" fill="#fff"/>
          <circle cx="${100-s+6}" cy="${y-6}" r="1.5" fill="#fff"/>
          <circle cx="${100-s-6}" cy="${y+5}" r="1" fill="#fff"/>
          <ellipse cx="${100+s}" cy="${y}" rx="12" ry="14" fill="#000"/>
          <ellipse cx="${100+s-3}" cy="${y-5}" rx="5" ry="6" fill="#fff"/>
          <ellipse cx="${100+s+4}" cy="${y+3}" rx="3" ry="3" fill="#fff"/>
          <circle cx="${100+s+6}" cy="${y-6}" r="1.5" fill="#fff"/>
          <circle cx="${100+s-6}" cy="${y+5}" r="1" fill="#fff"/>
        </g>`;
      }
    },
    {
      id: 'eyes-sleepy',
      name: 'Endormi',
      svg: (a) => {
        const y = a.eyeY, s = a.eyeSpread;
        return `<g class="part-eyes">
          <path d="M${100-s-9} ${y} Q${100-s} ${y+6} ${100-s+9} ${y}" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M${100+s-9} ${y} Q${100+s} ${y+6} ${100+s+9} ${y}" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Zzz -->
          <text x="${100+s+14}" y="${y-8}" font-size="8" font-weight="bold" fill="#000" font-family="sans-serif">z</text>
          <text x="${100+s+20}" y="${y-16}" font-size="6" font-weight="bold" fill="#000" font-family="sans-serif">z</text>
        </g>`;
      }
    },
  ],

  // ─── MOUTHS ─────────────────────────────────────────
  mouth: [
    {
      id: 'mouth-smile',
      name: 'Sourire',
      svg: (a) => `<g class="part-mouth">
        <path d="M${100-10} ${a.mouthY} Q${100} ${a.mouthY+12} ${100+10} ${a.mouthY}" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round"/>
      </g>`
    },
    {
      id: 'mouth-grin',
      name: 'Grand sourire',
      svg: (a) => `<g class="part-mouth">
        <path d="M${100-14} ${a.mouthY} Q${100} ${a.mouthY+16} ${100+14} ${a.mouthY}" fill="#000" stroke="#000" stroke-width="2"/>
        <path d="M${100-10} ${a.mouthY+8} Q${100} ${a.mouthY+14} ${100+10} ${a.mouthY+8}" fill="#fff" stroke="none"/>
      </g>`
    },
    {
      id: 'mouth-open',
      name: 'Ouvert',
      svg: (a) => `<g class="part-mouth">
        <ellipse cx="100" cy="${a.mouthY+4}" rx="8" ry="10" fill="#000" stroke="#000" stroke-width="1.5"/>
        <ellipse cx="100" cy="${a.mouthY+8}" rx="5" ry="4" fill="#fff" opacity="0.6"/>
      </g>`
    },
    {
      id: 'mouth-cat',
      name: 'Chat',
      svg: (a) => `<g class="part-mouth">
        <path d="M${100-12} ${a.mouthY+2} L${100} ${a.mouthY+8} L${100+12} ${a.mouthY+2}" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="100" y1="${a.mouthY+8}" x2="100" y2="${a.mouthY}" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
      </g>`
    },
    {
      id: 'mouth-pout',
      name: 'Boudeur',
      svg: (a) => `<g class="part-mouth">
        <path d="M${100-8} ${a.mouthY+6} Q${100} ${a.mouthY} ${100+8} ${a.mouthY+6}" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
      </g>`
    },
    {
      id: 'mouth-o',
      name: 'Surpris O',
      svg: (a) => `<g class="part-mouth">
        <ellipse cx="100" cy="${a.mouthY+4}" rx="6" ry="7" fill="#000" stroke="#000" stroke-width="1.5"/>
      </g>`
    },
  ],

  // ─── HAIR BACK ──────────────────────────────────────
  hairBack: [
    {
      id: 'hairback-long',
      name: 'Long',
      svg: () => `<g class="part-hair-back">
        <path d="M38 70 Q25 90 28 170 Q30 220 50 250 Q55 240 52 170 Q50 120 55 80 Z" fill="#000" stroke="#000" stroke-width="1"/>
        <path d="M162 70 Q175 90 172 170 Q170 220 150 250 Q145 240 148 170 Q150 120 145 80 Z" fill="#000" stroke="#000" stroke-width="1"/>
      </g>`
    },
    {
      id: 'hairback-medium',
      name: 'Mi-long',
      svg: () => `<g class="part-hair-back">
        <path d="M40 65 Q30 85 32 140 Q34 170 50 185 Q53 170 48 140 Q45 100 52 72 Z" fill="#000" stroke="#000" stroke-width="1"/>
        <path d="M160 65 Q170 85 168 140 Q166 170 150 185 Q147 170 152 140 Q155 100 148 72 Z" fill="#000" stroke="#000" stroke-width="1"/>
      </g>`
    },
    {
      id: 'hairback-ponytail',
      name: 'Queue',
      svg: () => `<g class="part-hair-back">
        <path d="M130 45 Q160 40 165 65 Q168 85 155 90 Q148 80 140 60 Z" fill="#000" stroke="#000" stroke-width="1"/>
        <path d="M155 85 Q170 100 168 150 Q166 190 155 210 Q150 200 152 150 Q154 110 150 90 Z" fill="#000" stroke="#000" stroke-width="1"/>
      </g>`
    },
    {
      id: 'hairback-twintails',
      name: 'Couettes',
      svg: () => `<g class="part-hair-back">
        <!-- Left twintail -->
        <path d="M50 55 Q30 60 25 80 Q20 100 25 160 Q28 200 40 220 Q45 200 38 160 Q34 110 42 75 Z" fill="#000" stroke="#000" stroke-width="1"/>
        <!-- Right twintail -->
        <path d="M150 55 Q170 60 175 80 Q180 100 175 160 Q172 200 160 220 Q155 200 162 160 Q166 110 158 75 Z" fill="#000" stroke="#000" stroke-width="1"/>
        <!-- Hair ties -->
        <ellipse cx="42" cy="62" rx="6" ry="4" fill="none" stroke="#000" stroke-width="2"/>
        <ellipse cx="158" cy="62" rx="6" ry="4" fill="none" stroke="#000" stroke-width="2"/>
      </g>`
    },
    {
      id: 'hairback-short',
      name: 'Court',
      svg: () => `<g class="part-hair-back">
        <path d="M38 75 Q32 90 36 120 Q38 130 48 135 Q46 115 44 95 Q44 85 48 75 Z" fill="#000" stroke="#000" stroke-width="1"/>
        <path d="M162 75 Q168 90 164 120 Q162 130 152 135 Q154 115 156 95 Q156 85 152 75 Z" fill="#000" stroke="#000" stroke-width="1"/>
      </g>`
    },
    {
      id: 'hairback-bun',
      name: 'Chignon',
      svg: () => `<g class="part-hair-back">
        <circle cx="100" cy="30" r="18" fill="#000" stroke="#000" stroke-width="1"/>
        <ellipse cx="100" cy="32" rx="12" ry="8" fill="#000" stroke="#000" stroke-width="0.5" opacity="0.8"/>
      </g>`
    },
  ],

  // ─── HAIR FRONT ─────────────────────────────────────
  hairFront: [
    {
      id: 'hairfront-bangs',
      name: 'Frange',
      svg: () => `<g class="part-hair-front">
        <path d="M38 50 Q38 28 60 25 Q80 22 100 24 Q120 22 140 25 Q162 28 162 50
                 L162 70 Q155 58 140 55 Q125 52 115 58 Q108 62 100 62 Q92 62 85 58 Q75 52 60 55 Q45 58 38 70 Z"
              fill="#000" stroke="#000" stroke-width="1"/>
        <!-- Bang strands -->
        <path d="M55 55 Q58 38 70 32" fill="none" stroke="#000" stroke-width="1.5"/>
        <path d="M80 58 Q82 40 90 30" fill="none" stroke="#000" stroke-width="1.5"/>
        <path d="M110 58 Q112 40 105 28" fill="none" stroke="#000" stroke-width="1.5"/>
        <path d="M140 55 Q138 38 128 32" fill="none" stroke="#000" stroke-width="1.5"/>
      </g>`
    },
    {
      id: 'hairfront-side',
      name: 'Côté',
      svg: () => `<g class="part-hair-front">
        <path d="M38 50 Q38 28 60 25 Q80 22 100 24 Q120 22 140 25 Q162 28 162 50
                 L162 65 Q155 55 140 52 Q120 50 100 55 Q85 58 70 55 L38 65 Z"
              fill="#000" stroke="#000" stroke-width="1"/>
        <!-- Side sweep -->
        <path d="M38 65 Q30 80 28 100 Q27 110 35 108 Q40 95 38 75 Z"
              fill="#000" stroke="#000" stroke-width="1"/>
      </g>`
    },
    {
      id: 'hairfront-curtain',
      name: 'Rideau',
      svg: () => `<g class="part-hair-front">
        <path d="M38 50 Q38 28 60 25 Q80 22 100 24 Q120 22 140 25 Q162 28 162 50
                 L162 60 Q160 50 150 48 L140 75 Q130 55 120 48 L115 55 Q110 45 100 42
                 Q90 45 85 55 L80 48 Q70 55 60 75 L50 48 Q40 50 38 60 Z"
              fill="#000" stroke="#000" stroke-width="1"/>
      </g>`
    },
    {
      id: 'hairfront-spiky',
      name: 'Piquant',
      svg: () => `<g class="part-hair-front">
        <path d="M38 55 Q38 30 60 25 Q80 20 100 22 Q120 20 140 25 Q162 30 162 55
                 L158 60 L155 40 L145 62 L138 35 L125 58 L115 30 L100 55 L85 30 L75 58 L62 35 L55 62 L45 40 L42 60 Z"
              fill="#000" stroke="#000" stroke-width="1"/>
      </g>`
    },
    {
      id: 'hairfront-none',
      name: 'Aucun',
      svg: () => `<g class="part-hair-front"></g>`
    },
    {
      id: 'hairfront-short',
      name: 'Court',
      svg: () => `<g class="part-hair-front">
        <path d="M42 55 Q42 32 60 28 Q80 24 100 26 Q120 24 140 28 Q158 32 158 55
                 L155 62 Q148 52 135 50 Q120 48 100 50 Q80 48 65 50 Q52 52 45 62 Z"
              fill="#000" stroke="#000" stroke-width="1"/>
      </g>`
    },
  ],

  // ─── HATS ───────────────────────────────────────────
  hat: [
    {
      id: 'hat-none',
      name: 'Aucun',
      svg: () => `<g class="part-hat"></g>`,
      isNone: true,
    },
    {
      id: 'hat-cap',
      name: 'Casquette',
      svg: (a) => {
        const y = a.hatY;
        return `<g class="part-hat">
          <path d="M40 ${y+18} Q40 ${y} 100 ${y-4} Q160 ${y} 160 ${y+18} Z" fill="#000" stroke="#000" stroke-width="2"/>
          <path d="M40 ${y+18} L160 ${y+18}" stroke="#000" stroke-width="2"/>
          <!-- Visor -->
          <path d="M35 ${y+18} Q30 ${y+22} 25 ${y+28} Q40 ${y+32} 80 ${y+28} Q60 ${y+22} 40 ${y+18} Z"
                fill="#000" stroke="#000" stroke-width="1.5"/>
          <!-- Button on top -->
          <circle cx="100" cy="${y-2}" r="3" fill="#fff" stroke="#000" stroke-width="1"/>
        </g>`;
      }
    },
    {
      id: 'hat-beret',
      name: 'Béret',
      svg: (a) => {
        const y = a.hatY;
        return `<g class="part-hat">
          <ellipse cx="100" cy="${y+12}" rx="55" ry="16" fill="#000" stroke="#000" stroke-width="1.5"/>
          <ellipse cx="95" cy="${y+5}" rx="45" ry="20" fill="#000" stroke="#000" stroke-width="1.5"/>
          <!-- Stem -->
          <circle cx="95" cy="${y-10}" r="4" fill="#000" stroke="#000" stroke-width="1"/>
        </g>`;
      }
    },
    {
      id: 'hat-crown',
      name: 'Couronne',
      svg: (a) => {
        const y = a.hatY;
        return `<g class="part-hat">
          <path d="M55 ${y+22} L55 ${y+2} L70 ${y+12} L85 ${y-5} L100 ${y+10} L115 ${y-5} L130 ${y+12} L145 ${y+2} L145 ${y+22} Z"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <!-- Jewels -->
          <circle cx="70" cy="${y+6}" r="2.5" fill="#000"/>
          <circle cx="100" cy="${y+4}" r="3" fill="#000"/>
          <circle cx="130" cy="${y+6}" r="2.5" fill="#000"/>
          <!-- Base band -->
          <rect x="55" y="${y+16}" width="90" height="6" rx="2" fill="#fff" stroke="#000" stroke-width="1.5"/>
        </g>`;
      }
    },
    {
      id: 'hat-bow',
      name: 'Noeud',
      svg: (a) => {
        const y = a.hatY;
        return `<g class="part-hat">
          <!-- Left loop -->
          <path d="M100 ${y+15} Q75 ${y} 65 ${y+10} Q55 ${y+20} 75 ${y+22} Q88 ${y+24} 100 ${y+15} Z"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <!-- Right loop -->
          <path d="M100 ${y+15} Q125 ${y} 135 ${y+10} Q145 ${y+20} 125 ${y+22} Q112 ${y+24} 100 ${y+15} Z"
                fill="#fff" stroke="#000" stroke-width="2"/>
          <!-- Center knot -->
          <circle cx="100" cy="${y+15}" r="5" fill="#fff" stroke="#000" stroke-width="2"/>
          <!-- Ribbons -->
          <path d="M95 ${y+20} Q88 ${y+32} 82 ${y+38}" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M105 ${y+20} Q112 ${y+32} 118 ${y+38}" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
        </g>`;
      }
    },
  ],

  // ─── GLASSES ────────────────────────────────────────
  glasses: [
    {
      id: 'glasses-none',
      name: 'Aucun',
      svg: () => `<g class="part-glasses"></g>`,
      isNone: true,
    },
    {
      id: 'glasses-round',
      name: 'Ronds',
      svg: (a) => {
        const y = a.glassesY, s = a.eyeSpread || 22;
        return `<g class="part-glasses">
          <circle cx="${100-s}" cy="${y+3}" r="14" fill="none" stroke="#000" stroke-width="2"/>
          <circle cx="${100+s}" cy="${y+3}" r="14" fill="none" stroke="#000" stroke-width="2"/>
          <line x1="${100-s+14}" y1="${y+3}" x2="${100+s-14}" y2="${y+3}" stroke="#000" stroke-width="2"/>
          <line x1="${100-s-14}" y1="${y+3}" x2="${100-s-22}" y2="${y}" stroke="#000" stroke-width="1.5"/>
          <line x1="${100+s+14}" y1="${y+3}" x2="${100+s+22}" y2="${y}" stroke="#000" stroke-width="1.5"/>
        </g>`;
      }
    },
    {
      id: 'glasses-square',
      name: 'Carrées',
      svg: (a) => {
        const y = a.glassesY, s = a.eyeSpread || 22;
        return `<g class="part-glasses">
          <rect x="${100-s-13}" y="${y-9}" width="26" height="22" rx="3" fill="none" stroke="#000" stroke-width="2"/>
          <rect x="${100+s-13}" y="${y-9}" width="26" height="22" rx="3" fill="none" stroke="#000" stroke-width="2"/>
          <line x1="${100-s+13}" y1="${y+2}" x2="${100+s-13}" y2="${y+2}" stroke="#000" stroke-width="2"/>
          <line x1="${100-s-13}" y1="${y+2}" x2="${100-s-22}" y2="${y}" stroke="#000" stroke-width="1.5"/>
          <line x1="${100+s+13}" y1="${y+2}" x2="${100+s+22}" y2="${y}" stroke="#000" stroke-width="1.5"/>
        </g>`;
      }
    },
    {
      id: 'glasses-sun',
      name: 'Soleil',
      svg: (a) => {
        const y = a.glassesY, s = a.eyeSpread || 22;
        return `<g class="part-glasses">
          <ellipse cx="${100-s}" cy="${y+2}" rx="16" ry="12" fill="#000" stroke="#000" stroke-width="2"/>
          <ellipse cx="${100+s}" cy="${y+2}" rx="16" ry="12" fill="#000" stroke="#000" stroke-width="2"/>
          <line x1="${100-s+16}" y1="${y+2}" x2="${100+s-16}" y2="${y+2}" stroke="#000" stroke-width="2.5"/>
          <line x1="${100-s-16}" y1="${y+2}" x2="${100-s-24}" y2="${y-2}" stroke="#000" stroke-width="2"/>
          <line x1="${100+s+16}" y1="${y+2}" x2="${100+s+24}" y2="${y-2}" stroke="#000" stroke-width="2"/>
        </g>`;
      }
    },
  ],

  // ─── CLOTHES ────────────────────────────────────────
  clothes: [
    {
      id: 'clothes-tee',
      name: 'T-shirt',
      svg: () => `<g class="part-clothes">
        <!-- Collar -->
        <path d="M88 168 Q100 175 112 168" fill="none" stroke="#000" stroke-width="1.5"/>
        <!-- Sleeves overlay -->
        <path d="M72 178 Q65 180 58 190 Q55 196 60 198 Q66 196 72 190" fill="#fff" stroke="#000" stroke-width="1.5"/>
        <path d="M128 178 Q135 180 142 190 Q145 196 140 198 Q134 196 128 190" fill="#fff" stroke="#000" stroke-width="1.5"/>
        <!-- Shirt line -->
        <line x1="100" y1="175" x2="100" y2="245" stroke="#000" stroke-width="0.5" stroke-dasharray="3,3" opacity="0.3"/>
      </g>`
    },
    {
      id: 'clothes-hoodie',
      name: 'Hoodie',
      svg: () => `<g class="part-clothes">
        <!-- Hood shape behind neck -->
        <path d="M78 158 Q78 148 90 145 L110 145 Q122 148 122 158" fill="#fff" stroke="#000" stroke-width="1.5"/>
        <!-- Pocket -->
        <rect x="80" y="215" width="40" height="18" rx="4" fill="none" stroke="#000" stroke-width="1.5"/>
        <!-- Pocket line -->
        <line x1="100" y1="215" x2="100" y2="233" stroke="#000" stroke-width="1"/>
        <!-- Drawstrings -->
        <line x1="92" y1="170" x2="90" y2="195" stroke="#000" stroke-width="1" stroke-linecap="round"/>
        <line x1="108" y1="170" x2="110" y2="195" stroke="#000" stroke-width="1" stroke-linecap="round"/>
        <circle cx="90" cy="196" r="2" fill="#000"/>
        <circle cx="110" cy="196" r="2" fill="#000"/>
      </g>`
    },
    {
      id: 'clothes-dress',
      name: 'Robe',
      svg: () => `<g class="part-clothes">
        <!-- Dress flare -->
        <path d="M75 168 Q72 168 68 180 L55 248 Q55 255 70 258 L130 258 Q145 255 145 248 L132 180 Q128 168 125 168 Z"
              fill="#fff" stroke="#000" stroke-width="2"/>
        <!-- Waist ribbon -->
        <path d="M72 200 L128 200" stroke="#000" stroke-width="2"/>
        <!-- Bow -->
        <path d="M95 198 Q88 192 85 198 Q88 204 95 198 Z" fill="#000"/>
        <path d="M105 198 Q112 192 115 198 Q112 204 105 198 Z" fill="#000"/>
        <circle cx="100" cy="198" r="2.5" fill="#000"/>
        <!-- Collar -->
        <path d="M85 168 L100 178 L115 168" fill="none" stroke="#000" stroke-width="1.5"/>
      </g>`
    },
    {
      id: 'clothes-suit',
      name: 'Costume',
      svg: () => `<g class="part-clothes">
        <!-- Lapels -->
        <path d="M88 168 L82 190 L92 195 L100 175 L108 195 L118 190 L112 168" fill="none" stroke="#000" stroke-width="1.5"/>
        <!-- Tie -->
        <path d="M97 178 L100 172 L103 178 L101 210 L100 212 L99 210 Z" fill="#000" stroke="#000" stroke-width="0.5"/>
        <!-- Button -->
        <circle cx="100" cy="220" r="2" fill="#000"/>
        <!-- Jacket line -->
        <line x1="100" y1="195" x2="100" y2="245" stroke="#000" stroke-width="1"/>
      </g>`
    },
    {
      id: 'clothes-tank',
      name: 'Débardeur',
      svg: () => `<g class="part-clothes">
        <!-- Straps -->
        <line x1="85" y1="168" x2="82" y2="178" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="115" y1="168" x2="118" y2="178" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Neckline -->
        <path d="M82 178 Q100 185 118 178" fill="none" stroke="#000" stroke-width="1.5"/>
        <!-- Bottom hem -->
        <path d="M72 235 L128 235" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
      </g>`
    },
    {
      id: 'clothes-sweater',
      name: 'Pull',
      svg: () => `<g class="part-clothes">
        <!-- Turtleneck -->
        <rect x="85" y="158" width="30" height="14" rx="5" fill="#fff" stroke="#000" stroke-width="1.5"/>
        <line x1="88" y1="162" x2="88" y2="170" stroke="#000" stroke-width="0.8"/>
        <line x1="93" y1="162" x2="93" y2="170" stroke="#000" stroke-width="0.8"/>
        <line x1="98" y1="162" x2="98" y2="170" stroke="#000" stroke-width="0.8"/>
        <line x1="103" y1="162" x2="103" y2="170" stroke="#000" stroke-width="0.8"/>
        <line x1="108" y1="162" x2="108" y2="170" stroke="#000" stroke-width="0.8"/>
        <line x1="112" y1="162" x2="112" y2="170" stroke="#000" stroke-width="0.8"/>
        <!-- Cable knit pattern -->
        <path d="M80 195 Q90 188 100 195 Q110 202 120 195" fill="none" stroke="#000" stroke-width="1" opacity="0.4"/>
        <path d="M78 210 Q90 203 100 210 Q110 217 122 210" fill="none" stroke="#000" stroke-width="1" opacity="0.4"/>
        <path d="M76 225 Q88 218 100 225 Q112 232 124 225" fill="none" stroke="#000" stroke-width="1" opacity="0.4"/>
      </g>`
    },
  ],
};

// Export for use in other modules
window.PARTS = PARTS;
