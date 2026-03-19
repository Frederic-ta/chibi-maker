/**
 * app.js — Main application logic, UI routing, event handling.
 * v4: Split-screen layout with vertical tabs and options grid.
 */

const App = (() => {
  // Current selection state
  let selection = {
    body: 'body-small',
    head: 'head-round',
    eyes: 'eyes-cute',
    mouth: 'mouth-smile',
    hairBack: 'hairback-long',
    hairFront: 'hairfront-bangs',
    clothes: 'clothes-tee',
    hat: 'hat-none',
    glasses: 'glasses-none',
  };

  let activeCategory = 'body';
  let exportWidth = 384; // default; 626 for 53mm mode

  // Category tab labels (short for vertical tabs)
  const TAB_LABELS = {
    body: 'Corps',
    head: 'Tête',
    eyes: 'Yeux',
    mouth: 'Bouche',
    hairBack: 'Ch.\u25BC',
    hairFront: 'Ch.\u25B2',
    clothes: 'Habits',
    hat: 'Coiffe',
    glasses: 'Lunet.',
    deco: 'Déco',
    texte: 'Texte',
  };

  const ALL_CATEGORIES = [
    ...PARTS.categories.map(c => c.id),
    'deco',
    'texte',
  ];

  // ─── INIT ───────────────────────────────────────────
  function init() {
    // Try to restore last session
    const saved = Storage.loadCurrent();
    if (saved) {
      const s = saved.selection;
      for (const key of Object.keys(selection)) {
        if (s[key] && PARTS[key] && PARTS[key].find(p => p.id === s[key])) {
          selection[key] = s[key];
        }
      }
      if (saved.overlayItems) {
        Overlay.setItems(saved.overlayItems);
      }
    }

    buildCategoryTabs();
    selectCategory('body');
    render();

    // Init drag system on SVG
    const svg = document.getElementById('chibi-svg');
    Overlay.initDrag(svg, () => {
      render();
      persistCurrent();
      syncTextPanel();
    });

    // Header buttons
    document.getElementById('btn-random').addEventListener('click', randomize);
    document.getElementById('btn-menu').addEventListener('click', toggleMenu);
    document.getElementById('btn-export').addEventListener('click', () => {
      Exporter.exportPNG(selection, Overlay.getItems(), exportWidth);
    });

    // Dropdown menu actions
    document.getElementById('btn-save').addEventListener('click', () => { hideMenu(); saveCurrentChibi(); });
    document.getElementById('btn-load').addEventListener('click', () => { hideMenu(); showLoadModal(); });
    document.getElementById('btn-canvas-size').addEventListener('click', () => { toggleCanvasSize(); });

    // Modal
    document.getElementById('modal-close').addEventListener('click', hideModal);
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) hideModal();
    });

    // Text panel handlers
    document.getElementById('btn-add-text').addEventListener('click', addOrUpdateText);
    document.getElementById('font-size').addEventListener('input', (e) => {
      document.getElementById('font-size-val').textContent = e.target.value;
    });
    document.getElementById('text-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addOrUpdateText();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const menu = document.getElementById('dropdown-menu');
      const btn = document.getElementById('btn-menu');
      if (!menu.contains(e.target) && e.target !== btn) {
        menu.classList.add('hidden');
      }
    });
  }

  // ─── DROPDOWN MENU ─────────────────────────────────
  function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.classList.toggle('hidden');
  }

  function hideMenu() {
    document.getElementById('dropdown-menu').classList.add('hidden');
  }

  // ─── CATEGORY TABS (vertical) ─────────────────────
  function buildCategoryTabs() {
    const tabs = document.getElementById('category-tabs');
    tabs.innerHTML = '';

    for (const catId of ALL_CATEGORIES) {
      const btn = document.createElement('button');
      btn.className = 'cat-tab';
      btn.dataset.cat = catId;
      btn.textContent = TAB_LABELS[catId] || catId;
      btn.addEventListener('click', () => selectCategory(catId));
      tabs.appendChild(btn);
    }
  }

  function selectCategory(catId) {
    activeCategory = catId;

    // Update active state
    document.querySelectorAll('.cat-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === catId);
    });

    // Scroll active tab into view
    const activeBtn = document.querySelector(`.cat-tab[data-cat="${catId}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    const grid = document.getElementById('options-grid');
    const textPanel = document.getElementById('text-panel');

    if (catId === 'deco') {
      grid.style.display = '';
      textPanel.classList.add('hidden');
      buildDecoGrid();
    } else if (catId === 'texte') {
      grid.style.display = 'none';
      textPanel.classList.remove('hidden');
      syncTextPanel();
    } else {
      grid.style.display = '';
      textPanel.classList.add('hidden');
      buildOptionsGrid(catId);
    }
  }

  // ─── OPTIONS GRID ────────────────────────────────────
  function buildOptionsGrid(catId) {
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';

    const parts = PARTS[catId];
    if (!parts) return;

    for (const part of parts) {
      const item = document.createElement('div');
      item.className = 'option-item';
      if (selection[catId] === part.id) item.classList.add('active');

      if (part.isNone) {
        item.classList.add('none-option');
        item.textContent = 'Aucun';
      } else {
        item.innerHTML = Renderer.renderThumbnail(catId, part.id);
      }

      item.addEventListener('click', () => {
        selection[catId] = part.id;
        persistCurrent();
        render();
        grid.querySelectorAll('.option-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
      });

      grid.appendChild(item);
    }
  }

  // ─── DECORATION GRID ─────────────────────────────────
  function buildDecoGrid() {
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';

    for (const deco of DECORATIONS) {
      const item = document.createElement('div');
      item.className = 'option-item deco-option';
      item.innerHTML = Renderer.renderDecoThumbnail(deco.id);
      item.title = deco.name;

      item.addEventListener('click', () => {
        Overlay.addDecoration(deco.id);
        persistCurrent();
        render();
        item.style.transform = 'scale(0.85)';
        setTimeout(() => { item.style.transform = ''; }, 120);
      });

      grid.appendChild(item);
    }
  }

  // ─── TEXT PANEL ────────────────────────────────────
  function addOrUpdateText() {
    const input = document.getElementById('text-input');
    const font = document.getElementById('font-select').value;
    const size = document.getElementById('font-size').value;
    const text = input.value.trim();

    if (!text) return;

    const selected = Overlay.getSelectedItem();
    if (selected && selected.type === 'text') {
      Overlay.updateText(selected.id, text, font, size);
    } else {
      Overlay.addText(text, font, size);
    }

    input.value = '';
    persistCurrent();
    render();
  }

  function syncTextPanel() {
    if (activeCategory !== 'texte') return;
    const selected = Overlay.getSelectedItem();
    const btn = document.getElementById('btn-add-text');

    if (selected && selected.type === 'text') {
      document.getElementById('text-input').value = selected.text;
      document.getElementById('font-select').value = selected.font;
      document.getElementById('font-size').value = selected.fontSize;
      document.getElementById('font-size-val').textContent = selected.fontSize;
      btn.textContent = 'Modifier';
    } else {
      btn.textContent = 'Ajouter';
    }
  }

  // ─── CANVAS SIZE ──────────────────────────────────
  function toggleCanvasSize() {
    const btn = document.getElementById('btn-canvas-size');
    const label = document.getElementById('canvas-size-label');
    const preview = document.getElementById('chibi-preview');

    if (exportWidth === 384) {
      exportWidth = 626;
      btn.classList.add('active-53mm');
      btn.textContent = '53mm \u2713';
      label.classList.remove('hidden');
      preview.classList.add('mode-53mm');
    } else {
      exportWidth = 384;
      btn.classList.remove('active-53mm');
      btn.textContent = '53mm';
      label.classList.add('hidden');
      preview.classList.remove('mode-53mm');
    }
  }

  // ─── RENDER ────────────────────────────────────────
  function render() {
    const overlayContent = Overlay.toSVGContent(true);
    Renderer.render(selection, overlayContent);
  }

  // ─── PERSIST ──────────────────────────────────────
  function persistCurrent() {
    Storage.saveCurrent(selection, Overlay.getItems());
  }

  // ─── RANDOMIZE ─────────────────────────────────────
  function randomize() {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)].id;

    selection.body = pick(PARTS.body);
    selection.head = pick(PARTS.head);
    selection.eyes = pick(PARTS.eyes);
    selection.mouth = pick(PARTS.mouth);
    selection.hairBack = pick(PARTS.hairBack);
    selection.hairFront = pick(PARTS.hairFront);
    selection.clothes = pick(PARTS.clothes);

    // Hats and glasses: 50% chance of "none"
    selection.hat = Math.random() > 0.5 ? pick(PARTS.hat) : 'hat-none';
    selection.glasses = Math.random() > 0.7 ? pick(PARTS.glasses) : 'glasses-none';

    // Some combos: match hair
    if (selection.hairFront === 'hairfront-none' && Math.random() > 0.3) {
      const backOptions = PARTS.hairBack.filter(h => h.id !== 'hairback-short');
      selection.hairBack = backOptions[Math.floor(Math.random() * backOptions.length)].id;
    }

    persistCurrent();
    render();

    if (['body', 'head', 'eyes', 'mouth', 'hairBack', 'hairFront', 'clothes', 'hat', 'glasses'].includes(activeCategory)) {
      buildOptionsGrid(activeCategory);
    }

    // Fun animation
    const preview = document.getElementById('chibi-preview');
    preview.style.transform = 'scale(0.96)';
    setTimeout(() => { preview.style.transform = ''; }, 150);
  }

  // ─── SAVE / LOAD ──────────────────────────────────
  function saveCurrentChibi() {
    Storage.save(selection, Overlay.getItems());
    const btn = document.getElementById('btn-save');
    const originalText = btn.textContent;
    btn.textContent = 'Sauvegardé !';
    setTimeout(() => { btn.textContent = originalText; }, 1000);
  }

  function showLoadModal() {
    const saves = Storage.getSaves();
    const body = document.getElementById('modal-body');

    if (saves.length === 0) {
      body.innerHTML = '<div class="empty-state">Aucun chibi sauvegardé</div>';
    } else {
      body.innerHTML = '';
      for (const entry of saves) {
        const div = document.createElement('div');
        div.className = 'saved-chibi';

        div.innerHTML = Renderer.toSVGString(entry.selection);

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = '\u00d7';
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          Storage.deleteSave(entry.id);
          showLoadModal();
        });
        div.appendChild(delBtn);

        div.addEventListener('click', () => {
          selection = { ...entry.selection };
          Overlay.setItems(entry.overlayItems || []);
          persistCurrent();
          render();
          if (['body', 'head', 'eyes', 'mouth', 'hairBack', 'hairFront', 'clothes', 'hat', 'glasses'].includes(activeCategory)) {
            buildOptionsGrid(activeCategory);
          }
          hideModal();
        });

        body.appendChild(div);
      }
    }

    document.getElementById('modal-overlay').classList.remove('hidden');
  }

  function hideModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
  }

  // ─── START ─────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', init);

  return { selection, randomize };
})();
