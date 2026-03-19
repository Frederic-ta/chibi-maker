/**
 * decorations.js — SVG decoration/sticker definitions for freely-placeable overlay items.
 * Each decoration is centered at (0,0) and sized ~20-30 units.
 */

const DECORATIONS = [
  {
    id: 'deco-star',
    name: 'Étoile',
    svg: `<polygon points="0,-14 3.5,-5 13,-5 5.5,1.5 8,11 0,5.5 -8,11 -5.5,1.5 -13,-5 -3.5,-5" fill="#000" stroke="#000" stroke-width="0.5"/>`,
  },
  {
    id: 'deco-sparkle',
    name: 'Étincelle',
    svg: `<path d="M0,-14 C1,-4 4,-1 14,0 C4,1 1,4 0,14 C-1,4 -4,1 -14,0 C-4,-1 -1,-4 0,-14Z" fill="#000" stroke="#000" stroke-width="0.5"/>`,
  },
  {
    id: 'deco-sparkle-small',
    name: 'Sparkle',
    svg: `<g>
      <path d="M0,-10 C0.5,-3 3,-0.5 10,0 C3,0.5 0.5,3 0,10 C-0.5,3 -3,0.5 -10,0 C-3,-0.5 -0.5,-3 0,-10Z" fill="#000"/>
      <circle cx="8" cy="-8" r="1.5" fill="#000"/>
      <circle cx="-6" cy="9" r="1" fill="#000"/>
    </g>`,
  },
  {
    id: 'deco-flower-simple',
    name: 'Fleur',
    svg: `<g>
      <ellipse cx="0" cy="-8" rx="5" ry="8" fill="#fff" stroke="#000" stroke-width="1.5" transform="rotate(0)"/>
      <ellipse cx="0" cy="-8" rx="5" ry="8" fill="#fff" stroke="#000" stroke-width="1.5" transform="rotate(72)"/>
      <ellipse cx="0" cy="-8" rx="5" ry="8" fill="#fff" stroke="#000" stroke-width="1.5" transform="rotate(144)"/>
      <ellipse cx="0" cy="-8" rx="5" ry="8" fill="#fff" stroke="#000" stroke-width="1.5" transform="rotate(216)"/>
      <ellipse cx="0" cy="-8" rx="5" ry="8" fill="#fff" stroke="#000" stroke-width="1.5" transform="rotate(288)"/>
      <circle cx="0" cy="0" r="4" fill="#000"/>
    </g>`,
  },
  {
    id: 'deco-flower-cherry',
    name: 'Sakura',
    svg: `<g>
      <path d="M0,-11 Q-3,-6 0,-2 Q3,-6 0,-11Z" fill="#fff" stroke="#000" stroke-width="1" transform="rotate(0)"/>
      <path d="M0,-11 Q-3,-6 0,-2 Q3,-6 0,-11Z" fill="#fff" stroke="#000" stroke-width="1" transform="rotate(72)"/>
      <path d="M0,-11 Q-3,-6 0,-2 Q3,-6 0,-11Z" fill="#fff" stroke="#000" stroke-width="1" transform="rotate(144)"/>
      <path d="M0,-11 Q-3,-6 0,-2 Q3,-6 0,-11Z" fill="#fff" stroke="#000" stroke-width="1" transform="rotate(216)"/>
      <path d="M0,-11 Q-3,-6 0,-2 Q3,-6 0,-11Z" fill="#fff" stroke="#000" stroke-width="1" transform="rotate(288)"/>
      <circle cx="0" cy="0" r="2.5" fill="#000"/>
    </g>`,
  },
  {
    id: 'deco-flower-daisy',
    name: 'Marguerite',
    svg: `<g>
      <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#fff" stroke="#000" stroke-width="1" transform="rotate(0)"/>
      <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#fff" stroke="#000" stroke-width="1" transform="rotate(45)"/>
      <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#fff" stroke="#000" stroke-width="1" transform="rotate(90)"/>
      <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#fff" stroke="#000" stroke-width="1" transform="rotate(135)"/>
      <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#fff" stroke="#000" stroke-width="1" transform="rotate(180)"/>
      <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#fff" stroke="#000" stroke-width="1" transform="rotate(225)"/>
      <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#fff" stroke="#000" stroke-width="1" transform="rotate(270)"/>
      <ellipse cx="0" cy="-9" rx="3" ry="7" fill="#fff" stroke="#000" stroke-width="1" transform="rotate(315)"/>
      <circle cx="0" cy="0" r="4" fill="#000"/>
    </g>`,
  },
  {
    id: 'deco-heart',
    name: 'Coeur',
    svg: `<path d="M0,10 C-2,6 -12,-2 -7,-8 C-3,-13 0,-8 0,-5 C0,-8 3,-13 7,-8 C12,-2 2,6 0,10Z" fill="#000" stroke="#000" stroke-width="0.5"/>`,
  },
  {
    id: 'deco-heart-double',
    name: 'Double Coeur',
    svg: `<g>
      <path d="M-5,8 C-7,4 -15,-2 -11,-7 C-8,-11 -5,-7 -5,-5 C-5,-7 -2,-11 1,-7 C5,-2 -3,4 -5,8Z" fill="#000" stroke="#000" stroke-width="0.5"/>
      <path d="M5,12 C3,8 -5,2 -1,-3 C2,-7 5,-3 5,-1 C5,-3 8,-7 11,-3 C15,2 7,8 5,12Z" fill="#fff" stroke="#000" stroke-width="1.5"/>
    </g>`,
  },
  {
    id: 'deco-note-single',
    name: 'Note',
    svg: `<g>
      <ellipse cx="-2" cy="8" rx="5" ry="4" fill="#000" transform="rotate(-20,-2,8)"/>
      <line x1="3" y1="6" x2="3" y2="-12" stroke="#000" stroke-width="2"/>
      <path d="M3,-12 Q8,-14 8,-8 Q8,-4 3,-6" fill="#000"/>
    </g>`,
  },
  {
    id: 'deco-note-double',
    name: 'Notes',
    svg: `<g>
      <ellipse cx="-6" cy="8" rx="4.5" ry="3.5" fill="#000" transform="rotate(-20,-6,8)"/>
      <ellipse cx="8" cy="5" rx="4.5" ry="3.5" fill="#000" transform="rotate(-20,8,5)"/>
      <line x1="-1" y1="6" x2="-1" y2="-10" stroke="#000" stroke-width="2"/>
      <line x1="13" y1="3" x2="13" y2="-13" stroke="#000" stroke-width="2"/>
      <path d="M-1,-10 L13,-13 L13,-8 L-1,-5Z" fill="#000"/>
    </g>`,
  },
  {
    id: 'deco-bubbles',
    name: 'Bulles',
    svg: `<g>
      <circle cx="-4" cy="-4" r="8" fill="#fff" stroke="#000" stroke-width="1.5"/>
      <circle cx="8" cy="4" r="5" fill="#fff" stroke="#000" stroke-width="1.5"/>
      <circle cx="-8" cy="8" r="3" fill="#fff" stroke="#000" stroke-width="1.5"/>
      <circle cx="-7" cy="-7" r="2" fill="#fff" stroke="none" opacity="0.8"/>
      <circle cx="6" cy="1" r="1.5" fill="#fff" stroke="none" opacity="0.8"/>
    </g>`,
  },
  {
    id: 'deco-lightning',
    name: 'Éclair',
    svg: `<path d="M2,-14 L-4,-2 L2,-2 L-2,14 L8,0 L2,0Z" fill="#000" stroke="#000" stroke-width="0.5"/>`,
  },
  {
    id: 'deco-crown',
    name: 'Couronne',
    svg: `<g>
      <path d="M-12,6 L-12,-6 L-6,0 L0,-10 L6,0 L12,-6 L12,6Z" fill="#fff" stroke="#000" stroke-width="1.5"/>
      <rect x="-12" y="4" width="24" height="5" rx="1" fill="#fff" stroke="#000" stroke-width="1.5"/>
      <circle cx="-6" cy="-1" r="1.5" fill="#000"/>
      <circle cx="0" cy="-5" r="1.5" fill="#000"/>
      <circle cx="6" cy="-1" r="1.5" fill="#000"/>
    </g>`,
  },
  {
    id: 'deco-ribbon',
    name: 'Ruban',
    svg: `<g>
      <path d="M0,0 Q-10,-8 -13,-2 Q-16,4 -8,4 Q-4,4 0,0Z" fill="#fff" stroke="#000" stroke-width="1.5"/>
      <path d="M0,0 Q10,-8 13,-2 Q16,4 8,4 Q4,4 0,0Z" fill="#fff" stroke="#000" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="3" fill="#fff" stroke="#000" stroke-width="1.5"/>
      <path d="M-2,3 Q-4,10 -6,14" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M2,3 Q4,10 6,14" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
    </g>`,
  },
  {
    id: 'deco-paw',
    name: 'Patte',
    svg: `<g>
      <ellipse cx="0" cy="4" rx="8" ry="7" fill="#000"/>
      <ellipse cx="-8" cy="-5" rx="4" ry="4.5" fill="#000"/>
      <ellipse cx="0" cy="-8" rx="3.5" ry="4" fill="#000"/>
      <ellipse cx="8" cy="-5" rx="4" ry="4.5" fill="#000"/>
    </g>`,
  },
  {
    id: 'deco-cloud',
    name: 'Nuage',
    svg: `<g>
      <ellipse cx="-6" cy="2" rx="9" ry="7" fill="#fff" stroke="#000" stroke-width="1.5"/>
      <ellipse cx="6" cy="2" rx="9" ry="7" fill="#fff" stroke="#000" stroke-width="1.5"/>
      <ellipse cx="0" cy="-4" rx="8" ry="7" fill="#fff" stroke="#000" stroke-width="1.5"/>
      <rect x="-14" y="2" width="28" height="7" fill="#fff"/>
      <line x1="-14" y1="9" x2="14" y2="9" stroke="#000" stroke-width="1.5"/>
    </g>`,
  },
  {
    id: 'deco-moon',
    name: 'Lune',
    svg: `<path d="M6,-12 A12,12 0 1,0 6,12 A8,8 0 1,1 6,-12Z" fill="#000" stroke="#000" stroke-width="0.5"/>`,
  },
  {
    id: 'deco-wings',
    name: 'Ailes',
    svg: `<g>
      <path d="M-2,0 Q-8,-4 -16,-2 Q-20,0 -16,4 Q-12,2 -8,4 Q-12,6 -14,10 Q-10,8 -6,6 Q-4,4 -2,2Z" fill="#fff" stroke="#000" stroke-width="1.2"/>
      <path d="M2,0 Q8,-4 16,-2 Q20,0 16,4 Q12,2 8,4 Q12,6 14,10 Q10,8 6,6 Q4,4 2,2Z" fill="#fff" stroke="#000" stroke-width="1.2"/>
    </g>`,
  },
];

window.DECORATIONS = DECORATIONS;
